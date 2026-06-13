// holds it all for now
let game = {}

const doTheCheats = true

// runs on page load
function setupInitialState() {
    linkFunctionsToHTML() // link all the functions

    game = deepCopy(INITIAL_RECOVERY_STATE) // copy default state from constants.js
    initCostsAndGains() // fill the recovery state with default costs and gains from cost-gain.js

    game.unlocks = deepCopy(UNLOCKS) // copy default unlocks from unlocks.js
    initUnlocks() // make sure the fields are there

    game.costExponents = {
        "energy": 1.5,
        "robots": 1.0,
        "drones": 1.0,
        "wood": 1.2,
        "scrap": 1.2,
        "plates": 1.1,
        "links": 1.075,
        "memory": 1.025
    }

    // ayy
    if (doTheCheats)
        runAlotOfCheatyCommandsToGiveUsABetterTimeDeveloping()

    // calls the ui functions for the gamestate
    // these can probably be reused somewhat safely to update the DOM when needed
    updateResourceAmounts()
    updateResourceVisibility()
    updateRecoveryButtonVisibility()
    updateJobVisibility()
    updateFactoryButtonVisibility()
    updateMechButtonVisibility()

    // starts the gameLoop
    requestAnimationFrame(gameLoop);
}

// the gameLoop which calls requestAnimationFrame for good shit
let lastTime = performance.now();
let lastHTMLTime = performance.now();
function gameLoop(currentTime = performance.now()) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    lastHTMLTime += deltaTime

    tick(deltaTime);

    if (lastHTMLTime >= UI_UPDATE_INTERVAL) { // only does em every 500ms, does not need to account for drift etc
        lastHTMLTime = 0
        checkAllUnlockThings()
        checkAllButtonCostsAffordable()
    }

    requestAnimationFrame(gameLoop);
}

// gets called by the gameLoop with deltaTime
function tick(dt) {
    processAllIdleGains(dt)
}

// calls the stuff for calculating idle gains with deltaTime
function processAllIdleGains(dt) {
    processRecoveryIdleGains(dt)
    processJobIdleGains(dt)
    updateResourceAmounts() // update HTML
}

// calculates the recovery button idle gains
function processRecoveryIdleGains(dt) {
    for (let key in game.recoveryButtons) {
        let button = game.recoveryButtons[key]
        if (button.gainsPerSecond.length !== 0 && button.current > 0) { // only process buttons that have a gain
            let buttonAmount = button.current
            if (button.settings) {
                if (button.settings.active > 0)
                    buttonAmount = button.settings.active
            }
            let canAfford = checkCosts(button.costsPerSecond, dt * buttonAmount)
            if (canAfford) {
                subtractAllCostsFromResources(button.costsPerSecond, dt * buttonAmount)
                addAllGainsToResources(button.gainsPerSecond, dt * buttonAmount)
            }
        }
    }
}

// calculates the jobs idle gains
function processJobIdleGains(dt) {
    for (let key in game.jobs) {
        let job = game.jobs[key]
        if (job.gainsPerSecond.length !== 0 && job.current > 0) { // only process jobs that have a gain
            let jobAmount = job.current
            let canAfford = checkCosts(job.costsPerSecond, dt * jobAmount)
            if (canAfford) {
                subtractAllCostsFromResources(job.costsPerSecond, dt * jobAmount)
                addAllGainsToResources(job.gainsPerSecond, dt * jobAmount)
            }
        }
    }
}

// call this when we add a new robot (or later, drones??) to calculate the new idle robot count
function updateIdleRobotCount() {
    let totalRobots = game.resource["robots"].current
    let workingRobots = 0
    for (let jobID in game.jobs) {
        if (jobID != "idle-robot")
            workingRobots += game.jobs[jobID].current
    }
    let newIdleRobots = totalRobots - workingRobots
    game.jobs["idle-robot"].current = newIdleRobots
    updateAllJobNumbers()
}

// job assignment button function
function jobAssignmentButtonPressed(jobID, value) {
    if (value > 0) { // add value to jobID
        if (game.jobs["idle-robot"].current >= value) {
            game.jobs["idle-robot"].current -= value
            game.jobs[jobID].current += value
        }
    } else if (value < 0) {
        if (game.jobs[jobID].current >= Math.abs(value)) {
            game.jobs[jobID].current -= Math.abs(value)
            game.jobs["idle-robot"].current += Math.abs(value)
        }
    }
    checkAllButtonCostsAffordable()
    updateAllJobNumbers() // update HTML
}

// handles the buttons in the recovery tab
function buttonPressed(buttonID, type) {
    let button = game[type][buttonID]
    let costMultipliers = resolveMultStack(button.costMultipliers)
    let gainMultipliers = resolveMultStack(button.gainMultipliers)
    // check for costs
    let canAfford = checkCosts(button.costs, costMultipliers)
    let hasSpace = checkResourceCapacities(button.gains, gainMultipliers)
    let canBuy = (button.max !== -1 ? (button.current < button.max) : true)
    // duh
    if (canAfford && hasSpace && canBuy) {
        // remove the resources
        subtractAllCostsFromResources(button.costs, costMultipliers)
        // add the gains
        addAllGainsToResources(button.gains, gainMultipliers)
        button.current++ // increment the button.current for logic and conditions and stuff
        incrementCostsForButton(buttonID, type)
        let tooltipTypeStringReplace = type.replace("B", "-b").substring(0, type.length)
        updateTooltipTextContent({ id: buttonID, type: tooltipTypeStringReplace })
        updateResourceAmounts() // update HTML
        checkAllButtonCostsAffordable()
        updateIndicatorsForButton(buttonID, type) // what it says
        checkAllUnlockThings() // same
    }
}

function incrementCostsForButton(buttonID, type) {
    let button = game[type][buttonID]
    if (button.costScaling === true) {
        for (let key in button.costs) {
            let cost = button.costs[key]
            cost.amount = cost.amount * game.costExponents[cost.resource]
        }
    }
}

function updateIndicatorsForButton(buttonID, type) {
    let button = game[type][buttonID]
    let indicators = button.indicators || []
    for (let i = 0; i < indicators.length; i++) {
        let indicator = indicators[i]
        switch (indicator.location) {
            case "top-left":
            case "top-right":
            case "bottom-left":
            case "bottom-right":
                // grab indicator element from HTML
                let indicatorElement = getOrMakeIndicatorElement(buttonID, type, indicator)
                if (indicator.resource) {
                    let value = game.resource[indicator.resource].current
                    indicatorElement.style.opacity = (value > 0 ? 1 : 0)
                    indicatorElement.style.color = 'white'
                    indicatorElement.style.cursor = 'default'
                    indicatorElement.innerHTML = value
                } else if (indicator.special) {
                    let value = game.special[indicator.special]
                    indicatorElement.style.opacity = (value > 0 ? 1 : 0)
                    indicatorElement.style.color = 'gold'
                    indicatorElement.style.cursor = 'default'
                    indicatorElement.innerHTML = value
                } else if (indicator.assignment) {
                    if (button.current > 0) { indicatorElement.style.opacity = 1 }
                    let value = 0
                    if (indicator.assignment === "on") {
                        indicatorElement.style.color = 'green'
                        value = button.settings.active
                        indicatorElement.onclick = (e) => {
                            e.stopPropagation();
                            button.settings.active = Math.min(button.settings.active + 1, button.current)
                            updateIndicatorsForButton(buttonID, type)
                        }
                    } else if (indicator.assignment === "off") {
                        indicatorElement.style.color = 'red'
                        value = button.current - button.settings.active
                        indicatorElement.onclick = (e) => {
                            e.stopPropagation();
                            button.settings.active = Math.max(button.settings.active - 1, 0)
                            updateIndicatorsForButton(buttonID, type)
                        }
                    }
                    indicatorElement.style.cursor = 'pointer'
                    indicatorElement.innerHTML = value
                } else if (indicator.current) { // NEEDS indicator.type
                    let value = game[indicator.type][indicator.current].current
                    indicatorElement.style.opacity = (value > 0 ? 1 : 0)
                    indicatorElement.style.color = 'white'
                    indicatorElement.style.cursor = 'default'
                    indicatorElement.innerHTML = value
                } else if (indicator.settings) { // NEEDS indicator.type
                    if (button.current > 0) {
                        indicatorElement.style.opacity = 1
                        indicatorElement.style.color = 'white'
                        indicatorElement.style.cursor = 'pointer'
                        indicatorElement.innerHTML = '<img src="./svg/settings.svg" alt="~">'
                        indicatorElement.onclick = (e) => {
                            e.stopPropagation();
                            openButtonConfigModal(type, buttonID, "button-config-modal", indicator.type) // just one thing on one building but technically reusable?
                        }
                    }
                }
                break;
            default:
                console.trace("Invalid type in switch case")
                break;
        }
    }
}

function openButtonConfigModal(buttonType, buttonID, modalID, modalType) {
    updateModalTextContent(buttonType, buttonID, modalID, modalType)
    showModal(modalID)
}

function calculateGainsForResource(resourceID) {
    let netGainForResource = 0
    // go over game.recoveryButtons and see if resourceID is in costsPerSecond OR gainsPerSecond
    for (let key1 in game.recoveryButtons) {
        let button = game.recoveryButtons[key1]
        let count = button.current
        if (count > 0) {
            if (button.settings) { // only count active buildings
                count = button.settings.active
            }
            if (button.gainsPerSecond.length > 0) {
                for (let key2 in button.gainsPerSecond) {
                    let gain = button.gainsPerSecond[key2]
                    let gainMultipliers = resolveMultStack(button.gainMultipliers)
                    if (gain.resource === resourceID) { netGainForResource += (gain.amount * count * gainMultipliers) }
                }
            }
            if (button.costsPerSecond.length > 0) {
                for (let key2 in button.costsPerSecond) {
                    let cost = button.costsPerSecond[key2]
                    let costMultipliers = resolveMultStack(button.costMultipliers)
                    if (cost.resource === resourceID) { netGainForResource -= (cost.amount * count * costMultipliers) }
                }
            }
        }
    }

    // go over game.jobs and see if resourceID is in costsPerSecond OR gainsPerSecond
    for (let key1 in game.jobs) {
        let job = game.jobs[key1]
        let count = job.current
        if (count > 0) {
            if (job.gainsPerSecond.length > 0) {
                for (let key2 in job.gainsPerSecond) {
                    let gain = job.gainsPerSecond[key2]
                    let gainMultipliers = resolveMultStack(job.gainMultipliers)
                    if (gain.resource === resourceID) { netGainForResource += (gain.amount * count * gainMultipliers) }
                }
            }
            if (job.costsPerSecond.length > 0) {
                for (let key2 in job.costsPerSecond) {
                    let cost = job.costsPerSecond[key2]
                    let costMultipliers = resolveMultStack(job.costMultipliers)
                    if (cost.resource === resourceID) { netGainForResource -= (cost.amount * count * costMultipliers) }
                }
            }
        }
    }

    return netGainForResource
}

function resolveMultStack(multStack) {
    let value = 1
    for (let i = 0; i < multStack.length; i++) {
        value = value * multStack[i]
    }
    return value
}

// resource function that returns true if the player can afford the costs provided
// dt used for idle processing, defaults to 1, essentially a mult
function checkCosts(costs, dt = 1) {
    if (costs === undefined) { return true }

    for (let i = 0; i < costs.length; i++) {
        let cost = costs[i]
        let dtAmount = cost.amount * dt
        if (cost.resource) {
            let resourceID = cost.resource
            if (game.resource[resourceID].current < dtAmount) {
                return false; // stop the function
            }
        }

        if (cost.special) {
            let specialID = cost.special
            if (game.special[specialID] < dtAmount) {
                return false; // stop the function
            }
        }
    }
    return true;
}

// resource function that returns true if the gained resource has the capacity to hold the gains
// dt used for idle processing, defaults to 1, essentially a mult
function checkResourceCapacities(gains, dt = 1) {
    for (let i = 0; i < gains.length; i++) {
        let gain = gains[i]
        let dtAmount = gain.amount * dt

        // we dont even check for gain.resourceCapacity because it defaults to true if everything else passes

        // we also dont check for gain.special because they dont have a cap (at the moment, intended?)

        if (gain.resource) {
            let resourceID = gain.resource
            if ((game.resource[resourceID].current === game.resource[resourceID].capacity)) {
                return false; // only returns false once any resource is fully capped
            }

            /*
            if ((game.resource[resourceID].current + dtAmount) > game.resource[resourceID].capacity) {
                return false // returns false once any resource cant hold the gains you would get
            }
            */
        }
    }
    return true;
}

// resource functions, very specific about the way the json is shaped but its simple enough
// adds a single gain to the appropriate resource
// dt used for idle processing, defaults to 1, essentially a mult
function addGainToResource(gain, dt = 1) {
    let dtGain = gain.amount * dt
    if (gain.resource) {
        let gameResource = game.resource[gain.resource]
        if (gameResource.capacity < 0) { // no cap
            gameResource.current += dtGain
        } else { // VOIDS excess
            gameResource.current = Math.min((gameResource.capacity * gameResource.capacityMultiplier), gameResource.current + dtGain)
        }
    }

    if (gain.resourceCapacity) {
        let gameResource = game.resource[gain.resourceCapacity]
        gameResource.capacity += dtGain
    }

    if (gain.special) { // the hidden things, no capacity, not always instantiated
        if (game.special[gain.special] === undefined) { game.special[gain.special] = 0 } // instantiate to 0 if it doesnt exist
        game.special[gain.special] += dtGain
    }

    if (gain.gainMultiplier) { // adding a mult to the multiplier stack for specific button
        let targetButton = game[gain.buttonType][gain.buttonID]
        let value = gain.gainMultiplier
        targetButton.gainMultipliers.push(value)
    }

    if (gain.costMultiplier) { // adding a mult to the multiplier stack for specific button
        let targetButton = game[gain.buttonType][gain.buttonID]
        let value = gain.costMultiplier
        targetButton.costMultipliers.push(value)
    }
}

// adds a whole array of gains to the appropriate resources
// dt used for idle processing, defaults to 1, essentially a mult
function addAllGainsToResources(gains, dt = 1) {
    if (gains === undefined) { return }

    for (let i = 0; i < gains.length; i++) {
        let gain = gains[i]
        addGainToResource(gain, dt)
    }
}

// subtracts a single cost from the appropriate resource
// dt used for idle processing, defaults to 1, essentially a mult
function subtractCostFromResource(cost, dt = 1) {
    let dtCost = cost.amount * dt
    if (cost.resource) {
        assert(game.resource[cost.resource].current >= dtCost, "not enough resources to subtract " + dtCost + " from " + game.resource[cost.resource].name)
        game.resource[cost.resource].current -= dtCost
    }

    if (cost.special) {
        assert(game.special[cost.special] >= dtCost, "not enough (special) resources to subtract " + dtCost + " from " + Object.keys(game.special)[0])
        game.special[cost.special] -= dtCost
    }
}

// subtracts a whole array of costs from the appropriate resources
// dt used for idle processing, defaults to 1, essentially a mult
function subtractAllCostsFromResources(costs, dt = 1) {
    if (costs === undefined) { return }

    for (let i = 0; i < costs.length; i++) {
        let cost = costs[i]
        subtractCostFromResource(cost, dt)
    }
}

function linkFunctionsToHTML() {
    // binds the left sidebar buttons to the left sidebar function
    let left_menu_buttons = document.getElementsByClassName("top-menu-left-button")
    for (let i = 0; i < left_menu_buttons.length; i++) {
        let button = left_menu_buttons[i]
        button.onclick = () => {
            console.log(button);

            button.classList.toggle("open")
            let gridID = button.dataset.originGrid
            let gridElement = document.getElementById(gridID)
            let gridLeftSidebar = gridElement.querySelector(".main-left")
            console.log(button, gridElement, gridLeftSidebar);

            gridLeftSidebar.classList.toggle("visible")
        }
    }

    let right_menu_buttons = document.getElementsByClassName("top-menu-right-button")
    for (let i = 0; i < right_menu_buttons.length; i++) {
        let button = right_menu_buttons[i]
        button.onclick = () => {
            console.log(button);

            button.classList.toggle("open")
            let originGrid = button.dataset.originGrid
            console.log(originGrid, document.getElementById(originGrid));

            let originID = document.getElementById(originGrid)
            console.log(originMainRight);

            originMainRight.classList.toggle("visible")
        }
    }

    // binds the center tab buttons to the switchCenterTab function
    document.getElementById("center-recovery-button").onclick = () => { switchCenterTab("recovery") }
    document.getElementById("center-jobs-button").onclick = () => { switchCenterTab("jobs") }
    document.getElementById("center-mech-workshop-button").onclick = () => { switchCenterTab("mech-workshop") }
    document.getElementById("center-parts-factory-button").onclick = () => { switchCenterTab("parts-factory") }

    // link gather buttons
    document.getElementById("salvage-old-mech-button").onclick = () => { buttonPressed("salvage-old-mech", "recoveryButtons") }
    document.getElementById("gather-wood-button").onclick = () => { buttonPressed("gather-wood", "recoveryButtons") }
    document.getElementById("collect-scrap-button").onclick = () => { buttonPressed("collect-scrap", "recoveryButtons") }

    // link action buttons
    document.getElementById("burn-wood-button").onclick = () => { buttonPressed("burn-wood", "recoveryButtons") }
    document.getElementById("salvage-scrap-button").onclick = () => { buttonPressed("salvage-scrap", "recoveryButtons") }
    document.getElementById("create-robot-button").onclick = () => { buttonPressed("create-robot", "recoveryButtons") }
    document.getElementById("create-drone-button").onclick = () => { buttonPressed("create-drone", "recoveryButtons") }

    // link building buttons
    document.getElementById("wood-burner-button").onclick = () => { buttonPressed("wood-burner", "recoveryButtons") }
    document.getElementById("energy-storage-button").onclick = () => { buttonPressed("energy-storage", "recoveryButtons") }
    document.getElementById("robot-housing-button").onclick = () => { buttonPressed("robot-housing", "recoveryButtons") }
    document.getElementById("resource-storage-button").onclick = () => { buttonPressed("resource-storage", "recoveryButtons") }
    document.getElementById("windmill-button").onclick = () => { buttonPressed("windmill", "recoveryButtons") }
    document.getElementById("shape-factory-button").onclick = () => { buttonPressed("shape-factory", "recoveryButtons") }
    document.getElementById("solar-panel-button").onclick = () => { buttonPressed("solar-panel", "recoveryButtons") }
    document.getElementById("mech-workshop-button").onclick = () => { buttonPressed("mech-workshop", "recoveryButtons") }
    document.getElementById("drone-dock-button").onclick = () => { buttonPressed("drone-dock", "recoveryButtons") }

    document.getElementById("parts-factory-button").onclick = () => { buttonPressed("parts-factory", "recoveryButtons") }
    document.getElementById("construction-bay-button").onclick = () => { buttonPressed("construction-bay", "recoveryButtons") }

    // link factory buttons
    document.getElementById("part-small-battery-button").onclick = () => { buttonPressed("part-small-battery", "factoryButtons") }
    document.getElementById("part-compressed-cube-button").onclick = () => { buttonPressed("part-compressed-cube", "factoryButtons") }

    // link mech buttons
    document.getElementById("mech-frame-button").onclick = () => { buttonPressed("mech-frame", "mechButtons") }
    document.getElementById("mech-armor-button").onclick = () => { buttonPressed("mech-armor", "mechButtons") }
    document.getElementById("mech-recovery-button").onclick = () => { buttonPressed("mech-recovery", "mechButtons") }
    document.getElementById("mech-joints-button").onclick = () => { buttonPressed("mech-joints", "mechButtons") }
    document.getElementById("mech-vision-button").onclick = () => { buttonPressed("mech-vision", "mechButtons") }
    document.getElementById("mech-weapons-button").onclick = () => { buttonPressed("mech-weapons", "mechButtons") }

    document.getElementById("mech-module-chainsaw-button").onclick = () => { buttonPressed("mech-module-chainsaw", "mechButtons") }
    document.getElementById("mech-module-energy-barrier-button").onclick = () => { buttonPressed("mech-module-energy-barrier", "mechButtons") }

    // link job assignment buttons
    document.getElementById("job-woodcutter-minus").onclick = () => { jobAssignmentButtonPressed("woodcutter", -1) }
    document.getElementById("job-woodcutter-plus").onclick = () => { jobAssignmentButtonPressed("woodcutter", 1) }
    document.getElementById("job-scrap-collector-minus").onclick = () => { jobAssignmentButtonPressed("scrap-collector", -1) }
    document.getElementById("job-scrap-collector-plus").onclick = () => { jobAssignmentButtonPressed("scrap-collector", 1) }
    document.getElementById("job-factory-bot-minus").onclick = () => { jobAssignmentButtonPressed("factory-bot", -1) }
    document.getElementById("job-factory-bot-plus").onclick = () => { jobAssignmentButtonPressed("factory-bot", 1) }

    // link research buttons
    for (let i = 0; i < RESEARCHES.length; i++) {
        document.getElementById("research-" + i).querySelector(".button-research").onclick = () => { unlockResearch(i) }
    }
}

function runAlotOfCheatyCommandsToGiveUsABetterTimeDeveloping() {
    addAllGainsToResources([
        { resourceCapacity: "energy", amount: 1000 },
        { resourceCapacity: "robots", amount: 10 },
        { resourceCapacity: "drones", amount: 10 },
        { resourceCapacity: "wood", amount: 100000 },
        { resourceCapacity: "scrap", amount: 100000 },
        { resourceCapacity: "plates", amount: 100 },
        { resourceCapacity: "links", amount: 100 },
        { resourceCapacity: "memory", amount: 100 },
        { resource: "energy", amount: 1e308 },
        { resource: "robots", amount: 1e308 },
        { resource: "drones", amount: 1e308 },
        { resource: "wood", amount: 1e308 },
        { resource: "scrap", amount: 1e308 },
        { resource: "plates", amount: 1e308 },
        { resource: "links", amount: 1e308 },
        { resource: "memory", amount: 1e308 },
    ])
}

// when html is done loading
document.addEventListener("DOMContentLoaded", function () { setupInitialState() });

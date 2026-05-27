// holds it all for now
let game = {}

// runs on page load
function setupInitialState() {
    linkFunctionsToHTML() // link all the functions

    game = deepCopy(INITIAL_RECOVERY_STATE) // copy default state from constants.js
    initCostsAndGains() // fill the recovery state with default costs and gains from cost-gain.js

    game.unlocks = deepCopy(UNLOCKS) // copy default unlocks from unlocks.js
    initUnlocks() // make sure the fields are there

    // calls the ui functions for the gamestate
    // these can probably be reused somewhat safely to update the DOM when needed
    updateResourceAmounts()
    updateResourceVisibility()
    updateRecoveryButtonVisibility()
    updateJobVisibility()
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
}

// calculates the recovery button idle gains
function processRecoveryIdleGains(dt) {
    for (let key in game.recoveryButtons) {
        let button = game.recoveryButtons[key]
        if (button.gainsPerSecond.length !== 0 && button.current > 0) { // only process buttons that have a gain
            let buttonAmount = button.current
            let canAfford = checkCosts(button.costsPerSecond, dt * buttonAmount)
            if (canAfford) {
                subtractAllCostsFromResources(button.costsPerSecond, dt * buttonAmount)
                addAllGainsToResources(button.gainsPerSecond, dt * buttonAmount)
            }
        }
    }
    updateResourceAmounts() // update HTML
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
    updateResourceAmounts() // update HTML
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
    updateAllJobNumbers() // update HTML
}

// handles the buttons in the recovery tab
function buttonPressed(buttonID, type) {
    let button = game[type][buttonID]
    // check for costs
    let canAfford = checkCosts(button.costs)
    // duh
    if (canAfford) {
        // remove the resources
        subtractAllCostsFromResources(button.costs)
        // add the gains
        addAllGainsToResources(button.gains)
        button.current++ // increment the button.current for logic and conditions and stuff
        updateResourceAmounts() // update HTML
        updateIndicatorsForButton(buttonID, type) // what it says
        updateIdleRobotCount() // not the best place to call this, but it covers alot of cases for the moment
        checkAllUnlockThings() // same
    }
}

// handles the buttons in the recovery tab
function mechButtonPressed(buttonID) {
    let button = game.mechButtons[buttonID]
    // check for costs
    let canAfford = checkCosts(button.costs)
    // duh
    if (canAfford) {
        // remove the resources
        subtractAllCostsFromResources(button.costs)
        // add the gains
        addAllGainsToResources(button.gains)
        button.current++ // increment the button.current for logic and conditions and stuff
        updateResourceAmounts() // update HTML
        updateIndicatorsForButton(buttonID, "mechButtons") // what it says
        updateIdleRobotCount() // not the best place to call this, but it covers alot of cases for the moment
        checkAllUnlockThings() // same
    }
}

function updateIndicatorsForButton(buttonID, type) {
    let button = game[type][buttonID]
    let indicators = button.indicators
    for (let i = 0; i < indicators.length; i++) {
        let indicator = indicators[i]
        switch (indicator.location) {
            case "top-left":
            case "top-right":
            case "bottom-left":
            case "bottom-right":
                let indicatorElement = document.getElementById(button.id).querySelector(".button-" + indicator.location + "-indicator")
                if (indicator.resource) {
                    let value = game.resource[indicator.resource].current
                    indicatorElement.style.opacity = 1
                    indicatorElement.innerHTML = value
                } else if (indicator.special) {
                    let value = game.special[indicator.special]
                    indicatorElement.style.opacity = 1
                    indicatorElement.innerHTML = value
                } else if (indicator.current) { // NEEDS indicator.type
                    let value = game[indicator.type][indicator.current].current
                    indicatorElement.style.opacity = 1
                    indicatorElement.innerHTML = value
                }
                break;
            default:
                console.error("Invalid type in switch case")
                break;
        }
    }
}

// resource function that returns true if the play can afford the costs provided
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

    if (gain.special) { // we can just expand this once we need it, just one thing at the moment
        game.special[gain.special] += dtGain
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
    // binds the left sidebar button to the left sidebar function
    document.getElementById("top-menu-left-button").onclick = () => {
        document.getElementById("top-menu-left-button").classList.toggle("open")
        document.getElementById("main-left").classList.toggle("visible")
    }

    // binds the right sidebar button to the right sidebar function
    document.getElementById("top-menu-right-button").onclick = () => {
        document.getElementById("top-menu-right-button").classList.toggle("open")
        document.getElementById("main-right").classList.toggle("visible")
    }

    // binds the center tab buttons to the switchCenterTab function
    document.getElementById("center-recovery-button").onclick = () => { switchCenterTab("recovery") }
    document.getElementById("center-jobs-button").onclick = () => { switchCenterTab("jobs") }
    document.getElementById("center-mech-workshop-button").onclick = () => { switchCenterTab("mech-workshop") }

    // link gather buttons
    document.getElementById("salvage-old-mech-button").onclick = () => { buttonPressed("salvage-old-mech", "recoveryButtons") }
    document.getElementById("gather-wood-button").onclick = () => { buttonPressed("gather-wood", "recoveryButtons") }
    document.getElementById("collect-scrap-button").onclick = () => { buttonPressed("collect-scrap", "recoveryButtons") }

    // link action buttons
    document.getElementById("burn-wood-button").onclick = () => { buttonPressed("burn-wood", "recoveryButtons") }
    document.getElementById("salvage-scrap-button").onclick = () => { buttonPressed("salvage-scrap", "recoveryButtons") }
    document.getElementById("create-robot-button").onclick = () => { buttonPressed("create-robot", "recoveryButtons") }
    document.getElementById("compress-cube-button").onclick = () => { buttonPressed("compress-cube", "recoveryButtons") }
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

    // link mech buttons
    document.getElementById("mech-frame-button").onclick = () => { buttonPressed("mech-frame", "mechButtons") }
    document.getElementById("mech-armor-button").onclick = () => { buttonPressed("mech-armor", "mechButtons") }
    document.getElementById("mech-recovery-button").onclick = () => { buttonPressed("mech-recovery", "mechButtons") }
    document.getElementById("mech-joints-button").onclick = () => { buttonPressed("mech-joints", "mechButtons") }
    document.getElementById("mech-vision-button").onclick = () => { buttonPressed("mech-vision", "mechButtons") }
    document.getElementById("mech-weapons-button").onclick = () => { buttonPressed("mech-weapons", "mechButtons") }

    // link job assignment buttons
    document.getElementById("job-woodcutter-minus").onclick = () => { jobAssignmentButtonPressed("woodcutter", -1) }
    document.getElementById("job-woodcutter-plus").onclick = () => { jobAssignmentButtonPressed("woodcutter", 1) }
    document.getElementById("job-scrap-collector-minus").onclick = () => { jobAssignmentButtonPressed("scrap-collector", -1) }
    document.getElementById("job-scrap-collector-plus").onclick = () => { jobAssignmentButtonPressed("scrap-collector", 1) }
    document.getElementById("job-factory-bot-minus").onclick = () => { jobAssignmentButtonPressed("factory-bot", -1) }
    document.getElementById("job-factory-bot-plus").onclick = () => { jobAssignmentButtonPressed("factory-bot", 1) }
}

// when html is done loading
document.addEventListener("DOMContentLoaded", function () { setupInitialState() });
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
function gameLoop(currentTime = performance.now()) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    tick(deltaTime);

    requestAnimationFrame(gameLoop);
}

// gets called by the gameLoop with deltaTime
function tick(dt) {

}

// handles the buttons in the recovery tab
function recoveryButtonPressed(buttonID) {
    let button = game.recoveryButtons[buttonID]
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
        checkAllUnlockThings()
    }
}

function checkCosts(costs) {
    for (let i = 0; i < costs.length; i++) {
        let cost = costs[i]
        if (cost.resource) {
            let resourceID = cost.resource
            let amount = cost.amount
            if (game.resource[resourceID].current < amount) {
                return false; // stop the function
            }
        }

        if (cost.special) {
            let specialID = cost.special
            let amount = cost.amount
            if (game.special[specialID] < amount) {
                return false; // stop the function
            }
        }
    }
    return true;
}

// resource functions, very specific about the way the json is shaped but its simple enough
// adds a single gain to the appropriate resource
function addGainToResource(gain) {
    if (gain.resource) {
        let gameResource = game.resource[gain.resource]
        if (gameResource.capacity < 0) { // no cap
            gameResource.current += gain.amount
        } else { // VOIDS excess
            gameResource.current = Math.min((gameResource.capacity * gameResource.capacityMultiplier), gameResource.current + gain.amount)
        }
    }

    if (gain.resourceCapacity) {
        let gameResource = game.resource[gain.resourceCapacity]
        gameResource.capacity += gain.amount
    }

    if (gain.special) { // we can just expand this once we need it, just one thing at the moment
        game.special[gain.special] += gain.amount
    }
}

// adds a whole array of gains to the appropriate resources
function addAllGainsToResources(gains) {
    for (let i = 0; i < gains.length; i++) {
        let gain = gains[i]
        addGainToResource(gain)
    }
}

// subtracts a single cost from the appropriate resource
function subtractCostFromResource(cost) {
    if (cost.resource) {
        assert(game.resource[cost.resource].current >= cost.amount, "not enough resources to subtract " + cost.amount + " from " + game.resource[cost.resource].name)
        game.resource[cost.resource].current -= cost.amount
    }

    if (cost.special) {
        assert(game.special[cost.special] >= cost.amount, "not enough (special) resources to subtract " + cost.amount + " from " + Object.keys(game.special)[0])
        game.special[cost.special] -= cost.amount
    }
}

// subtracts a whole array of costs from the appropriate resources
function subtractAllCostsFromResources(costs) {
    for (let i = 0; i < costs.length; i++) {
        let cost = costs[i]
        subtractCostFromResource(cost)
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
    document.getElementById("salvage-old-mech-button").onclick = () => { recoveryButtonPressed("salvage-old-mech") }
    document.getElementById("gather-wood-button").onclick = () => { recoveryButtonPressed("gather-wood") }
    document.getElementById("collect-scrap-button").onclick = () => { recoveryButtonPressed("collect-scrap") }

    // link action buttons
    document.getElementById("burn-wood-button").onclick = () => { recoveryButtonPressed("burn-wood") }
    document.getElementById("salvage-scrap-button").onclick = () => { recoveryButtonPressed("salvage-scrap") }
    document.getElementById("create-robot-button").onclick = () => { recoveryButtonPressed("create-robot") }
    document.getElementById("create-drone-button").onclick = () => { recoveryButtonPressed("create-drone") }

    // link building buttons
    document.getElementById("wood-burner-button").onclick = () => { recoveryButtonPressed("wood-burner") }
    document.getElementById("robot-housing-button").onclick = () => { recoveryButtonPressed("robot-housing") }
    document.getElementById("windmill-button").onclick = () => { recoveryButtonPressed("windmill") }
    document.getElementById("solar-panel-button").onclick = () => { recoveryButtonPressed("solar-panel") }
    document.getElementById("mech-workshop-button").onclick = () => { recoveryButtonPressed("mech-workshop") }
    document.getElementById("drone-dock-button").onclick = () => { recoveryButtonPressed("drone-dock") }
}

// when html is done loading
document.addEventListener("DOMContentLoaded", function () { setupInitialState() });
// holds it all for now
let game = {}

// runs on page load
function setupInitialState() {
    game = deepCopy(INITIAL_RECOVERY_STATE) // copy default state from constants.js
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

// runs the startup function
setupInitialState()

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
        // unlock conditions and logic
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
        game.resource[gain.resource].current += gain.amount
    }

    if (gain.special) {
        game.special[gain.special].current += gain.amount
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
        game.resource[cost.resource].current -= cost.amount
    }

    if (cost.special) {
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
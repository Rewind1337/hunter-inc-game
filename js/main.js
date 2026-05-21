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

// handles the "gather" buttons in the recovery tab
function recoveryGatherButtonPressed(buttonID) {
    let button = game.recoveryButtons[buttonID]
    // check for costs
    let canAfford = true
    for (let i = 0; i < button.costs.length; i++) {
        let cost = button.costs[i]
        if (cost.resource) {
            let resourceID = cost.resource
            let amount = cost.amount
            if (game.resource[resourceID].current < amount) {
                canAfford = false
                return; // stop the function
            }
        }

        if (cost.special) {
            let specialID = cost.special
            let amount = cost.amount
            if (game.special[specialID] < amount) {
                canAfford = false
                return; // stop the function
            }
        }
    }
    // just in case, check anyway
    if (canAfford) {
        // remove the resources
        for (let i = 0; i < button.costs.length; i++) {
            let cost = button.costs[i]
            if (cost.resource) { game.resource[cost.resource].current -= cost.amount }
            if (cost.special) { game.special[cost.special] -= cost.amount }
        }
        // add the gains
        for (let i = 0; i < button.gains.length; i++) {
            let gain = button.gains[i]
            let resourceID = gain.resource
            let amount = gain.amount
            game.resource[resourceID].current += amount
            updateResourceAmounts() // update HTML
        }
    }
}

document.getElementById("salvage-old-mech-button").onclick = () => { recoveryGatherButtonPressed("salvage-old-mech") }
document.getElementById("gather-wood-button").onclick = () => { recoveryGatherButtonPressed("gather-wood") }
document.getElementById("collect-scrap-button").onclick = () => { recoveryGatherButtonPressed("collect-scrap") }
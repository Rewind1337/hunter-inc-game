// holds it all for now
let game = {}

// runs on page load
function setupInitialState() {
    game = deepCopy(INITIAL_RECOVERY_STATE) // copy default state from constants.js

    // calls the ui functions for the gamestate
    // these can probably be reused somewhat safely to update the DOM when needed
    updateResourceAmounts()
    updateResourceVisibility()
    updateRecoveryButtonVisibility()
    updateJobVisibility()
    updateMechButtonVisibility()

    requestAnimationFrame(gameLoop);
}

function tick(dt) {

}

let lastTime = performance.now();

function gameLoop(currentTime = performance.now()) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    tick(deltaTime);

    requestAnimationFrame(gameLoop);
}

setupInitialState()
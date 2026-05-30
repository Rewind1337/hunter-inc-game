function setupInitialState() {
    linkFunctionsToHTML() // link all the functions

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
        // update hunter html stuff
    }

    requestAnimationFrame(gameLoop);
}

// gets called by the gameLoop with deltaTime
function tick(dt) {

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
}

// when html is done loading
document.addEventListener("DOMContentLoaded", function () { setupInitialState() });
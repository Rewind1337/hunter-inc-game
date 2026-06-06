let HUNTER_CTX = null;
let GEO_FONT = null;
let BLACK_BAR_PERCENTAGE = 10
let BLACK_BAR_HEIGHT = 10
let USABLE_HEIGHT = 0

function preload() {
    // GEO_FONT = loadFont('./assets/Geo-Regular.ttf'); // CORS issues at the moment (localhost stuff)
}

function setup() {
    HUNTER_CTX = createOrResizeCanvas();
    colorMode(RGBA)
}

function draw() {
    // funny text
    push()
    translate(0, (BLACK_BAR_HEIGHT))
    textSize(USABLE_HEIGHT)
    textAlign(LEFT, TOP)
    fill(200, 200, 200, 255)
    stroke(255, 255, 255, 255)
    strokeWeight(USABLE_HEIGHT / 60)
    text("If you can read this full sentence, you probably have the widest monitor in existence, or its literally in an unplayable resolution. good job man, thats ridiculous..", 0, 0)
    pop()



    // black bars at top and bottom
    fill(0, 0, 0, 255)
    stroke(0, 0, 0, 255)
    rect(0, 0, width, (BLACK_BAR_HEIGHT))
    rect(0, height - (BLACK_BAR_HEIGHT), width, (BLACK_BAR_HEIGHT))
}

function createOrResizeCanvas() {
    let newCanvasHeight = windowHeight - (136 + 32)
    BLACK_BAR_HEIGHT = (windowHeight / 100) * BLACK_BAR_PERCENTAGE
    USABLE_HEIGHT = windowHeight - (136 + 32 + BLACK_BAR_HEIGHT * 2)
    if (HUNTER_CTX === null) {
        HUNTER_CTX = createCanvas(windowWidth, newCanvasHeight, P2D)
        HUNTER_CTX.parent("canvas-parent-element")
    } else {
        resizeCanvas(windowWidth, newCanvasHeight);
    }
    return HUNTER_CTX
}

function windowResized() {
    HUNTER_CTX = createOrResizeCanvas();
}
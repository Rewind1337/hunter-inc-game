let CONTENT = document.getElementById("infinity-content")
let CONTENT_WIDTH = CONTENT.getBoundingClientRect().width
let CONTENT_HEIGHT = CONTENT.getBoundingClientRect().height
let MAX_SAFE_HEIGHT = CONTENT_HEIGHT - window.innerHeight
let MAX_SAFE_WIDTH = CONTENT_WIDTH - window.innerWidth

let CONTAINER = document.getElementById("infinity-container")
let CONTAINER_OFFSET = { x: MAX_SAFE_WIDTH / 2, y: MAX_SAFE_HEIGHT / 2 }
let DRAG_START = { x: 0, y: 0 }
let MOUSE_POSITION = { x: 0, y: 0 }
let DRAGGING = false

CONTAINER.onmousedown = (e) => {
    startDragging()
    DRAG_START.x = e.clientX
    DRAG_START.y = e.clientY
}

CONTAINER.onmouseup = (e) => {
    CONTAINER_OFFSET.x += DRAG_START.x - MOUSE_POSITION.x
    CONTAINER_OFFSET.y += DRAG_START.y - MOUSE_POSITION.y
    stopDragging()
}

CONTAINER.onmousemove = (e) => {
    if (DRAGGING) {
        MOUSE_POSITION.x = e.clientX
        MOUSE_POSITION.y = e.clientY

        let NEW_X = CONTAINER_OFFSET.x + (DRAG_START.x - MOUSE_POSITION.x)
        let NEW_Y = CONTAINER_OFFSET.y + (DRAG_START.y - MOUSE_POSITION.y)

        CONTAINER.scrollLeft = NEW_X
        CONTAINER.scrollTop = NEW_Y
    }
}

function startDragging() {
    DRAGGING = true
}

function stopDragging() {
    DRAGGING = false
}

CONTAINER.scrollLeft = CONTAINER_OFFSET.x
CONTAINER.scrollTop = CONTAINER_OFFSET.y
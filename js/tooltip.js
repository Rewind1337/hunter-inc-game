let TOOLTIP_VISIBLE = false // not really used, but may come in handy later
let TOOLTIP_ELEMENT = document.getElementById("tooltip")
let TOOLTIP_HEIGHT = 300

// binds the tooltip functions on to EVERY button with the class 'tooltip-button'
// reads the 'data-tooltip' attribute for the contentID for linking later
function bindTooltip() {
    let allTooltipSources = document.getElementsByClassName("has-tooltip")
    for (let element = 0; element < allTooltipSources.length; element++) {
        let tooltipData = {
            id: allTooltipSources[element].getAttribute("data-tooltip-id"),
            type: allTooltipSources[element].getAttribute("data-tooltip-type")
        }
        allTooltipSources[element].onmouseenter = (mouseEvent) => {
            updateTooltipTextContent(tooltipData)
            updateTooltipPosition(mouseEvent)
            showTooltip()
        }
        allTooltipSources[element].onmousemove = (mouseEvent) => {
            updateTooltipPosition(mouseEvent)
        }
        allTooltipSources[element].onmouseleave = () => {
            hideTooltip()
        }
    }
}

let TOOLTIP_HEADER_ELEMENT = document.getElementById("tooltip-header")
let TOOLTIP_CONTENT_ELEMENT = document.getElementById("tooltip-content")
let TOOLTIP_BOTTOM_ELEMENT = document.getElementById("tooltip-bottom")

// updates the tooltip text according to the ID provided (still needs to grab data and generate costs and stuff)
function updateTooltipTextContent(tooltipData) {
    // only one of the available types
    assert(tooltipData.type === "recovery-button" || tooltipData.type === "mech-button" || tooltipData.type === "resource" || tooltipData.type === "other-button", "data-tooltip-type not correct")

    switch (tooltipData.type) {
        case "recovery-button":
            let tooltipReference = game.recoveryButtons[tooltipData.id]
            TOOLTIP_HEADER_ELEMENT.innerHTML = "(id: " + tooltipData.id + ") " + tooltipReference.name

            // TOOLTIP_CONTENT_ELEMENT.innerHTML = ""

            // TOOLTIP_BOTTOM_ELEMENT.innerHTML = ""
            break;

        default:
            TOOLTIP_HEADER_ELEMENT.innerHTML = "ERROR Tooltip"
            TOOLTIP_CONTENT_ELEMENT.innerHTML = "data-tooltip-type or data-tooltip-id not correct in HTML or missing in the database"
            TOOLTIP_BOTTOM_ELEMENT.innerHTML = "you shouldn't see this"
            break;
    }
    // other things
}

// simply shows the tooltip
function showTooltip() {
    TOOLTIP_VISIBLE = true;
    TOOLTIP_ELEMENT.style.display = "block"
}

// simply hides the tooltip
function hideTooltip() {
    TOOLTIP_VISIBLE = false;
    TOOLTIP_ELEMENT.style.display = "none"
}

// updates the tooltips css position to be properly positioned right below the curser
// gets clamped to inside the screen (hopefully, seems good though)
function updateTooltipPosition(mouseEvent) {
    if (TOOLTIP_ELEMENT.getBoundingClientRect().height !== 0) {
        TOOLTIP_HEIGHT = TOOLTIP_ELEMENT.getBoundingClientRect().height + 32 // small additional gap
    }
    let yThreshold = window.innerHeight - TOOLTIP_HEIGHT
    let tooltipX = Math.max(196, Math.min(mouseEvent.clientX, window.innerWidth - 196))
    let tooltipY = mouseEvent.clientY

    if (tooltipY > yThreshold) {
        TOOLTIP_ELEMENT.style.transform = "translate(-50%, calc(-100% - 8px))"
    } else {
        TOOLTIP_ELEMENT.style.transform = "translate(-50%, 8px)"
    }

    TOOLTIP_ELEMENT.style.left = tooltipX + "px"
    TOOLTIP_ELEMENT.style.top = tooltipY + "px"
}

// unbinds the tooltip functions from EVERY button with the class 'tooltip-button'
// not necessary at the moment
function unbindTooltip() {
    let allTooltipSources = document.getElementsByClassName("tooltip-button")
    for (let element = 0; element < allTooltipSources.length; element++) {
        let tooltipData = allTooltipSources[element].getAttribute("data-tooltip")
        allTooltipSources[element].onmouseenter = null
        allTooltipSources[element].onmousemove = null
        allTooltipSources[element].onmouseleave = null
    }
}

// runs the function once, may be necessary to call again later
bindTooltip()

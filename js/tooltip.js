let TOOLTIP_VISIBLE = false // not really used, but may come in handy later
let TOOLTIP_ELEMENT = document.getElementById("tooltip")
let TOOLTIP_HEIGHT = 300
let TOOLTIP_UPDATE_INTERVAL = null

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
            TOOLTIP_UPDATE_INTERVAL = setInterval(() => {
                updateTooltipTextContent(tooltipData)
            }, 333)
        }
        allTooltipSources[element].onmousemove = (mouseEvent) => {
            updateTooltipPosition(mouseEvent)
        }
        allTooltipSources[element].onmouseleave = () => {
            hideTooltip()
            clearInterval(TOOLTIP_UPDATE_INTERVAL)
        }
    }
}

let TOOLTIP_HEADER_ELEMENT = document.getElementById("tooltip-header")
let TOOLTIP_CONTENT_ELEMENT = document.getElementById("tooltip-content")
let TOOLTIP_BOTTOM_ELEMENT = document.getElementById("tooltip-bottom")

// updates the tooltip text according to the ID provided (still needs to grab data and generate costs and stuff)
function updateTooltipTextContent(tooltipData) {
    // only one of the available types
    assert(tooltipData.type === "recovery-button"
        || tooltipData.type === "factory-button"
        || tooltipData.type === "mech-button"
        || tooltipData.type === "resource"
        || tooltipData.type === "job"
        || tooltipData.type === "other-button", "data-tooltip-type not correct")

    let tooltipReference = null
    switch (tooltipData.type) { // this is dumb but im not sure how to fix it yet, gets called from multiple places, etc
        case "recovery-button":
            tooltipReference = game.recoveryButtons[tooltipData.id]
            TOOLTIP_ELEMENT.style.backgroundColor = 'rgba(0,0,0,0.95)'
            break;
        case "factory-button":
            tooltipReference = game.factoryButtons[tooltipData.id]
            TOOLTIP_ELEMENT.style.backgroundColor = 'rgba(12, 12, 0, 0.95)'
            break;
        case "mech-button":
            tooltipReference = game.mechButtons[tooltipData.id]
            break;
        case "resource":
            tooltipReference = game.resource[tooltipData.id]
            break;
        case "job":
            tooltipReference = game.jobs[tooltipData.id]
            break;
        default:
            break;
    }

    if (tooltipReference === null) {
        TOOLTIP_HEADER_ELEMENT.innerHTML = "ERROR Tooltip"
        TOOLTIP_CONTENT_ELEMENT.innerHTML = "data-tooltip-type or data-tooltip-id not correct in HTML or missing in the database"
        TOOLTIP_BOTTOM_ELEMENT.innerHTML = "you shouldn't see this"
        return;
    }

    // same header for everything
    TOOLTIP_HEADER_ELEMENT.innerHTML = '<div class="header">' + tooltipReference.name + '</div>'
    if (tooltipReference.max >= 1) {
        TOOLTIP_HEADER_ELEMENT.innerHTML += '<div class="header header-small">Limited to ' + tooltipReference.max + '</div>'
    }

    // setup string
    let finalContentString = ''
    finalContentString += '<div class="flex-col no-gaps">'

    if (tooltipData.type === "resource") { // resource specific tooltip
        // TODO generate idle costs & gains to display RESOURCE SPECIFIC
        TOOLTIP_CONTENT_ELEMENT.innerHTML = finalContentString

        let finalBottomString = ''
        finalBottomString += '<div class="flex-row justify-around align-center">'
        finalBottomString += '<div>funky magic</div>'
        finalBottomString += '<div>full in ??:??:??</div>'
        finalBottomString += '</div>'

        TOOLTIP_BOTTOM_ELEMENT.innerHTML = finalBottomString

    } else if (tooltipData.type === "job") { // job specific tooltip
        // TODO generate idle costs & gains to display JOB SPECIFIC
        TOOLTIP_CONTENT_ELEMENT.innerHTML = finalContentString

        let finalBottomString = ''
        finalBottomString += '<div class="flex-row justify-around align-center">'
        finalBottomString += '<div>funky magic</div>'
        finalBottomString += '<div>full in ??:??:??</div>'
        finalBottomString += '</div>'

        TOOLTIP_BOTTOM_ELEMENT.innerHTML = finalBottomString

    } else { // recovery and mech buttons work very similarly so this works
        if (tooltipReference.current !== tooltipReference.max) {
            // generate one-time costs as html and append
            if (tooltipReference.costs) {
                if (tooltipReference.costs.length !== 0) {
                    finalContentString += '<div class="header">costs</div>'
                    finalContentString += '<div class="tooltip-costs flex-row flex-wrap align-center justify-center">'
                    for (let i = 0; i < tooltipReference.costs.length; i++) {
                        let cost = tooltipReference.costs[i]
                        if (cost.resource) {
                            finalContentString += '<div class="tooltip-pill"><div>' + replaceNameWithSVG(cost.resource) + '</div><div>' + format(cost.amount, ".", 1) + '</div></div>'
                        }
                        if (cost.special) {
                            finalContentString += '<div class="tooltip-pill"><div>' + replaceNameWithSVG(cost.special) + '</div><div>' + format(cost.amount, ".", 1) + '</div></div>'
                        }
                    }
                    finalContentString += '</div>'
                }
            }

            // generate idle costs as html and append
            if (tooltipReference.costsPerSecond) {
                if (tooltipReference.costsPerSecond.length !== 0) {
                    finalContentString += '<div class="header">upkeep</div>'
                    finalContentString += '<div class="tooltip-upkeep flex-row flex-wrap align-center justify-center">'
                    for (let i = 0; i < tooltipReference.costsPerSecond.length; i++) {
                        let cost = tooltipReference.costsPerSecond[i]
                        if (cost.resource) {
                            finalContentString += '<div class="tooltip-pill"><div>' + replaceNameWithSVG(cost.resource) + '</div><div>' + format(cost.amount, ".", 1) + ' / s</div></div>'
                        }
                        if (cost.special) {
                            finalContentString += '<div class="tooltip-pill"><div>' + replaceNameWithSVG(cost.special) + '</div><div>' + format(cost.amount, ".", 1) + ' / s</div></div>'
                        }
                    }
                    finalContentString += '</div>'
                }
            }

            // generate one-time gains as html and append
            if (tooltipReference.gains) {
                if (tooltipReference.gains.length !== 0) {
                    finalContentString += '<div class="header">gains</div>'
                    finalContentString += '<div class="tooltip-gains flex-row flex-wrap align-center justify-center">'
                    for (let i = 0; i < tooltipReference.gains.length; i++) {
                        let gain = tooltipReference.gains[i]
                        if (gain.resource) {
                            finalContentString += '<div class="tooltip-pill"><div>' + replaceNameWithSVG(gain.resource) + '</div><div>' + format(gain.amount, ".", 1) + '</div></div>'
                        }
                        if (gain.resourceCapacity) {
                            finalContentString += '<div class="tooltip-pill"><div>' + replaceNameWithSVG(gain.resourceCapacity) + ' Cap.</div><div>' + format(gain.amount, ".", 1) + '</div></div>'
                        }
                        if (gain.special) {
                            finalContentString += '<div class="tooltip-pill"><div>' + replaceNameWithSVG(gain.special) + '</div><div>' + format(gain.amount, ".", 1) + '</div></div>'
                        }
                    }
                    finalContentString += '</div>'
                }
            }

            // generate idle gains as html and append
            if (tooltipReference.gainsPerSecond) {
                if (tooltipReference.gainsPerSecond.length !== 0) {
                    finalContentString += '<div class="header">effect</div>'
                    finalContentString += '<div class="tooltip-effect flex-row flex-wrap align-center justify-center">'
                    for (let i = 0; i < tooltipReference.gainsPerSecond.length; i++) {
                        let gain = tooltipReference.gainsPerSecond[i]
                        if (gain.resource) {
                            finalContentString += '<div class="tooltip-pill"><div>' + replaceNameWithSVG(gain.resource) + '</div><div>' + format(gain.amount, ".", 1) + ' / s</div></div>'
                        }
                        if (gain.resourceCapacity) {
                            finalContentString += '<div class="tooltip-pill"><div>' + replaceNameWithSVG(gain.resourceCapacity) + ' Cap.</div><div>' + format(gain.amount, ".", 1) + '</div></div>'
                        }
                        if (gain.special) {
                            finalContentString += '<div class="tooltip-pill"><div>' + replaceNameWithSVG(gain.special) + '</div><div>' + format(gain.amount, ".", 1) + ' / s</div></div>'
                        }
                    }
                    finalContentString += '</div>'
                }
            }
        }
        finalContentString += '</div>'

        TOOLTIP_CONTENT_ELEMENT.innerHTML = finalContentString

        let finalBottomString = ''
        finalBottomString += '<div class="flex-row justify-around align-center">'
        finalBottomString += '<div>funky magic</div>'
        finalBottomString += '<div>affordable in ??:??:??</div>'
        finalBottomString += '</div>'

        TOOLTIP_BOTTOM_ELEMENT.innerHTML = finalBottomString
    }
}

const resourceNameToImg = {
    "wood": "tree",
    "scrap": "borg",
    "energy": "battery_7",
    "robots": "robot",
    "drones": "drone",
    "squares": "box",
    "circles": "circle",
    "triangles": "triangle",
    "cubes": "cube",
    "salvage-old-mech-left": "mech"
}

// a function that takes in a name and spits out an svg in an <img>
function replaceNameWithSVG(name) {
    if (resourceNameToImg[name] !== undefined) {
        return '<img src="./svg/' + resourceNameToImg[name] + '.svg" alt="' + name + '">'
    }
    return name
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
        TOOLTIP_ELEMENT.style.transform = "translate(-50%, calc(-100% - 32px))"
    } else {
        TOOLTIP_ELEMENT.style.transform = "translate(-50%, 32px)"
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

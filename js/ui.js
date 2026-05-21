// binds the left sidebar button to the left sidebar function
let LEFT_SIDEBAR_TOGGLE_BUTTON = document.getElementById("top-menu-left-button")
let LEFT_SIDEBAR_ELEMENT = document.getElementById("main-left")
LEFT_SIDEBAR_TOGGLE_BUTTON.onclick = () => {
    LEFT_SIDEBAR_TOGGLE_BUTTON.classList.toggle("open")
    LEFT_SIDEBAR_ELEMENT.classList.toggle("visible")
}

// binds the right sidebar button to the right sidebar function
let RIGHT_SIDEBAR_TOGGLE_BUTTON = document.getElementById("top-menu-right-button")
let RIGHT_SIDEBAR_ELEMENT = document.getElementById("main-right")
RIGHT_SIDEBAR_TOGGLE_BUTTON.onclick = () => {
    RIGHT_SIDEBAR_TOGGLE_BUTTON.classList.toggle("open")
    RIGHT_SIDEBAR_ELEMENT.classList.toggle("visible")
}

// used for accessing the tab you just switched off, check switchCenterTab
let ACTIVE_TAB = "recovery"

// switches the display of the center tabs
function switchCenterTab(tabID) {
    document.getElementById("center-" + ACTIVE_TAB + "-button").classList.remove("active")

    let allTabs = document.getElementsByClassName("main-center-tab")
    for (let i = 0; i < allTabs.length; i++) {
        if (allTabs[i] !== null) {
            allTabs[i].style.display = "none"
        }
    }
    ACTIVE_TAB = tabID
    document.getElementById("center-" + tabID + "-button").classList.add("active")
    document.getElementById("main-section-" + tabID).style.display = "flex"
}

// binds the center tab buttons to the switchCenterTab function
document.getElementById("center-recovery-button").onclick = () => { switchCenterTab("recovery") }
document.getElementById("center-jobs-button").onclick = () => { switchCenterTab("jobs") }
document.getElementById("center-mech-workshop-button").onclick = () => { switchCenterTab("mech-workshop") }

// forces the center button with buttonID display to flex
function makeTabButtonVisible(buttonID) {
    document.getElementById("center-" + buttonID + "-button").style.display = "flex"
}

// updates all resources on the DOM
function updateResourceAmounts() {
    let resourceArray = Object.values(game.resource)
    for (let i = 0; i < resourceArray.length; i++) {
        let resource = resourceArray[i]
        let resourceElement = document.getElementById(resource.id)
        let resourceValueElement = resourceElement.querySelector(".resource-amount")
        if (resource.max == -1) {
            resourceValueElement.innerHTML = resource.current
        } else {
            resourceValueElement.innerHTML = resource.current + " / " + resource.max
            let fillPercentage = (resource.current / resource.max) * 100
            resourceElement.style.background = 'linear-gradient(90deg,var(--black-norm) ' + fillPercentage + '%, #00000000 0%)'
        }
    }
}

// forces the appropriate display
// (resource.unlocked needs to be true)
function updateResourceVisibility() {
    let resourceArray = Object.values(game.resource)
    for (let i = 0; i < resourceArray.length; i++) {
        let resource = resourceArray[i]
        let resourceElement = document.getElementById(resource.id)
        resourceElement.style.display = (resource.unlocked ? "flex" : "none")
    }
}

// forces the appropriate display of all recovery buttons
// (game.recoveryButtons[n].unlocked needs to be true)
function updateRecoveryButtonVisibility() {
    let buttonsArray = Object.values(game.recoveryButtons)
    for (let i = 0; i < buttonsArray.length; i++) {
        let button = buttonsArray[i]
        let buttonElement = document.getElementById(button.id)
        buttonElement.style.display = (button.unlocked ? "flex" : "none")
        let sectionID = buttonsArray[i].section
        let sectionElement = document.getElementById(sectionID)
        sectionElement.style.display = (button.unlocked ? "flex" : "none")
    }
}

// forces the appropriate display of all job assignments
// (game.jobs[n].unlocked needs to be true)
function updateJobVisibility() {
    let jobsArray = Object.values(game.jobs)
    for (let i = 0; i < jobsArray.length; i++) {
        let job = jobsArray[i]
        let jobElement = document.getElementById(job.id)
        jobElement.style.display = (job.unlocked ? "flex" : "none")
    }
}

// forces the appropriate display of all mech buttons
// (game.mechButtons[n].unlocked needs to be true)
function updateMechButtonVisibility() {
    let buttonArray = Object.values(game.mechButtons)
    for (let i = 0; i < buttonArray.length; i++) {
        let button = buttonArray[i]
        let buttonElement = document.getElementById(button.id)
        buttonElement.style.display = (button.unlocked ? "flex" : "none")
    }
}
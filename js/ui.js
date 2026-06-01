// used for accessing the tab you just switched off, check switchCenterTab
let ACTIVE_TAB = "recovery"
const UI_UPDATE_INTERVAL = 0.5 // 500ms

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

// forces the center button with buttonID display to flex
function makeTabButtonVisible(buttonID) {
    document.getElementById("center-" + buttonID + "-button").style.display = "flex"
}

// runs through every recoveryButton and mechButton and checks if you can afford it
function checkAllButtonCostsAffordable() {
    let buttonsToCheck = [game.recoveryButtons, game.mechButtons, game.factoryButtons]
    for (let i = 0; i < buttonsToCheck.length; i++) {
        for (let key in buttonsToCheck[i]) {
            let button = buttonsToCheck[i][key]
            let canAfford = checkCosts(button.costs)
            if (canAfford) {
                let nothingChangedCheck = document.getElementById(button.id).classList.contains("can-afford")
                if (!nothingChangedCheck)
                    document.getElementById(button.id).classList.add("can-afford")
            } else {
                let nothingChangedCheck = !document.getElementById(button.id).classList.contains("can-afford")
                if (!nothingChangedCheck)
                    document.getElementById(button.id).classList.remove("can-afford")
            }
        }
    }
}

// updates all resources on the DOM
function updateResourceAmounts() {
    let resourceArray = Object.values(game.resource)
    for (let i = 0; i < resourceArray.length; i++) {
        let resource = resourceArray[i]
        let resourceElement = document.getElementById(resource.id)
        let resourceValueElement = resourceElement.querySelector(".resource-amount")
        if (resource.max == -1) {
            resourceValueElement.innerHTML = niceFormat(resource.current)
        } else {
            resourceValueElement.innerHTML = niceFormat(resource.current) + " / " + niceFormat(resource.capacity * resource.capacityMultiplier)
            let fillPercentage = (resource.current / resource.capacity * resource.capacityMultiplier) * 100
            resourceElement.style.background = 'linear-gradient(90deg,var(--black-norm) ' + fillPercentage + '%, #00000000 0%)'
        }
    }
    updateIdleRobotCount() // not the best place to call this, but it covers alot of cases for the moment
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
        updateIndicatorsForButton(Object.keys(game.recoveryButtons)[i], "recoveryButtons")
    }
}

// sets all the numbers in the HTMl to the current values, does not update values at all
function updateAllJobNumbers() {
    for (let jobID in game.jobs) {
        document.getElementById(game.jobs[jobID].id).querySelector(".job-amount").innerHTML = game.jobs[jobID].current
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

// forces the appropriate display of all factory buttons
// (game.factoryButtons[n].unlocked needs to be true)
function updateFactoryButtonVisibility() {
    let buttonArray = Object.values(game.factoryButtons)
    for (let i = 0; i < buttonArray.length; i++) {
        let button = buttonArray[i]
        let buttonElement = document.getElementById(button.id)
        buttonElement.style.display = (button.unlocked ? "flex" : "none")
        updateIndicatorsForButton(Object.keys(game.factoryButtons)[i], "factoryButtons")
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
        updateIndicatorsForButton(Object.keys(game.mechButtons)[i], "mechButtons")
    }
}
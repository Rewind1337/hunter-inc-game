// holds all the unlocks, their conditions and what they unlock, and a bool to circumvent the check if its done already
// if for whatever reason we need to add unlocks that are skipped from the start, we just add the skip thing here
// damn hard to read from time to time, maybe some other way?
const UNLOCKS = [
    // wood and scrap start unlocked

    // unlocks burn-wood as button and energy as resource
    { conditions: [{ resource: "wood", amount: 1 }], targets: [{ recoveryButton: "burn-wood" }, { resource: "energy" }] },

    // unlocks salvage-scrap as button
    { conditions: [{ resource: "scrap", amount: 1 }], targets: [{ recoveryButton: "salvage-scrap" }] },

    // unlocks resource after amount
    { conditions: [{ resource: "squares", amount: 0.1 }], targets: [{ resource: "squares" }] },
    { conditions: [{ resource: "circles", amount: 0.1 }], targets: [{ resource: "circles" }] },
    { conditions: [{ resource: "triangles", amount: 0.1 }], targets: [{ resource: "triangles" }] },
    { conditions: [{ resource: "cubes", amount: 1 }], targets: [{ resource: "cubes" }] },

    // unlocks wood-burner as button
    { conditions: COSTS_GAINS.recoveryButtons["wood-burner"].costs, targets: [{ recoveryButton: "wood-burner" }] },

    // unlocks energy-storage as button
    { conditions: COSTS_GAINS.recoveryButtons["energy-storage"].costs, targets: [{ recoveryButton: "energy-storage" }] },

    // unlocks robot-housing as button
    { conditions: COSTS_GAINS.recoveryButtons["robot-housing"].costs, targets: [{ recoveryButton: "robot-housing" }] },
    // unlocks create-robot as button and robots as resource
    { conditions: [{ recoveryButton: "robot-housing", amount: 1 }], targets: [{ recoveryButton: "create-robot" }, { resource: "robots" }] },
    // unlocks robots as resource (fallback)
    { conditions: [{ resource: "robots", amount: 1 }], targets: [{ resource: "robots" }] },

    // unlocks scrap-collector, woodcutter and idle-robot as job/s
    { conditions: [{ resource: "robots", amount: 1 }], targets: [{ job: "scrap-collector" }, { job: "woodcutter" }, { job: "idle-robot" }, { tabButton: "jobs" }] },

    // unlocks resource-storage as button
    { conditions: COSTS_GAINS.recoveryButtons["resource-storage"].costs, targets: [{ recoveryButton: "resource-storage" }] },

    // unlocks windmill as button
    { conditions: COSTS_GAINS.recoveryButtons["windmill"].costs, targets: [{ recoveryButton: "windmill" }] },

    // unlocks shape-factory as button
    { conditions: COSTS_GAINS.recoveryButtons["shape-factory"].costs, targets: [{ recoveryButton: "shape-factory" }] },

    // unlocks solar-panel as button
    { conditions: COSTS_GAINS.recoveryButtons["solar-panel"].costs, targets: [{ recoveryButton: "solar-panel" }] },

    // unlocks mech-workshop as button
    { conditions: COSTS_GAINS.recoveryButtons["mech-workshop"].costs, targets: [{ recoveryButton: "mech-workshop" }] },
    // unlocks the mech-workshop tab as well as first 6 mech-buttons
    { conditions: [{ recoveryButton: "mech-workshop", amount: 1 }], targets: [{ tabButton: "mech-workshop" }, { mechButton: "mech-frame" }, { mechButton: "mech-armor" }, { mechButton: "mech-recovery" }, { mechButton: "mech-joints" }, { mechButton: "mech-vision" }, { mechButton: "mech-weapons" }] },

    // unlocks drone-dock as button
    { conditions: COSTS_GAINS.recoveryButtons["drone-dock"].costs, targets: [{ recoveryButton: "drone-dock" }] },
    // unlocks create-drone as button and drones as resource
    { conditions: [{ recoveryButton: "drone-dock", amount: 1 }], targets: [{ recoveryButton: "create-drone" }, { resource: "drones" }] },
    // unlocks drones as resource (fallback)
    { conditions: [{ resource: "drones", amount: 1 }], targets: [{ resource: "drones" }] },

    // unlocks construction-bay as button
    { conditions: COSTS_GAINS.recoveryButtons["construction-bay"].costs, targets: [{ recoveryButton: "construction-bay" }] },

    // unlocks parts-factory-bay as button
    { conditions: COSTS_GAINS.recoveryButtons["parts-factory"].costs, targets: [{ recoveryButton: "parts-factory" }] },
    // unlocks the parts-factory tab as well as first 2 factory-buttons
    { conditions: [{ recoveryButton: "parts-factory", amount: 1 }], targets: [{ tabButton: "parts-factory" }, { factoryButton: "part-small-battery" }, { factoryButton: "part-compressed-cube" }] },
]

// gets run once on page load at the moment
function initUnlocks() {
    for (let i = 0; i < game.unlocks.length; i++) {
        // adds the skip field to EVERY entry where its not predefined
        // so we can just leave it out when writing the conditions etc
        if (game.unlocks[i].SKIP === undefined) {
            game.unlocks[i].SKIP = false
        }

        // halves (or less, changeable) every RESOURCE cost (not buildings, not special, etc) on EVERY entry,
        // so we can reuse the cost-gain.js data & just modify it here
        for (let j = 0; j < game.unlocks[i].conditions.length; j++) {
            let cost = game.unlocks[i].conditions[j]
            if (cost.resource) {
                cost.amount = cost.amount / 2
            }
        }

        // generates an id to use for some reason maybe?
        let finalID = "unlock"
        let unlockTargets = game.unlocks[i].targets
        for (let j = 0; j < unlockTargets.length; j++) {
            let tar = unlockTargets[j]
            for (let key in tar) {
                finalID += "-" + tar[key]
            }
        }
        game.unlocks[i].id = finalID
    }
}

// run this every so often
function checkAllUnlockThings() {
    for (let i = 0; i < game.unlocks.length; i++) {
        if (!game.unlocks[i].SKIP) {
            let unlock = game.unlocks[i]
            let unlockConditions = unlock.conditions
            let unlockTargets = unlock.targets
            let conditionsFailed = false
            for (let j = 0; j < unlockConditions.length; j++) {
                let con = unlockConditions[j] // current condition entry
                if (con.resource) { // if it has a key named resource, check for resource stuff
                    if (game.resource[con.resource].current < con.amount) {
                        conditionsFailed = true
                        break; // stop checking conditions for this entry
                    }
                } else if (con.recoveryButton) {
                    if (game.recoveryButtons[con.recoveryButton].current < con.amount) {
                        conditionsFailed = true
                        break; // stop checking conditions for this entry
                    }
                } else if (con.job) {
                    if (game.jobs[con.job].current < con.amount) {
                        conditionsFailed = true
                        break; // stop checking conditions for this entry
                    }
                } else if (con.mechButton) {
                    if (game.mechButtons[con.mechButton].current < con.amount) {
                        conditionsFailed = true
                        break; // stop checking conditions for this entry
                    }
                } else if (con.factoryButton) {
                    if (game.factoryButtons[con.factoryButton].current < con.amount) {
                        conditionsFailed = true
                        break; // stop checking conditions for this entry
                    }
                } // other conditions chained i guess
            }

            if (!conditionsFailed) {
                // all conditions passed for the unlock
                for (let j = 0; j < unlockTargets.length; j++) {
                    let tar = unlockTargets[j] // current target entry
                    if (tar.resource) { unlockResource(tar.resource) }
                    else if (tar.recoveryButton) { unlockRecoveryButton(tar.recoveryButton) }
                    else if (tar.job) { unlockJob(tar.job) }
                    else if (tar.mechButton) { unlockMechButton(tar.mechButton) }
                    else if (tar.factoryButton) { unlockFactoryButton(tar.factoryButton) }
                    else if (tar.tabButton) { makeTabButtonVisible(tar.tabButton) }
                }
            }
        }
    }
}

// unlocks the resource and forces the resource with resourceID display to flex
function unlockResource(resourceID) {
    game.resource[resourceID].unlocked = true
    let resourceElement = document.getElementById("resource-" + resourceID)
    resourceElement.style.display = "flex"
}

// unlocks the button and forces the recovery button with buttonID display to flex
function unlockRecoveryButton(buttonID) {
    game.recoveryButtons[buttonID].unlocked = true
    let buttonElement = document.getElementById(buttonID + "-button")
    buttonElement.style.display = "flex"

    let buttonParent = setParentElementDisplay(buttonElement, "flex")
    if (buttonParent) { setParentElementDisplay(buttonParent, "flex") }
}

// unlocks the job and forces the job-assignment with jobID display to flex
function unlockJob(jobID) {
    game.jobs[jobID].unlocked = true
    let jobElement = document.getElementById("job-" + jobID)
    jobElement.style.display = "flex"

    let buttonParent = setParentElementDisplay(jobElement, "flex")
    if (buttonParent) { setParentElementDisplay(buttonParent, "flex") }
}

// unlocks the button and forces the mech workshop button with buttonID display to flex
function unlockMechButton(buttonID) {
    game.mechButtons[buttonID].unlocked = true
    let buttonElement = document.getElementById(buttonID + "-button")
    buttonElement.style.display = "flex"

    let buttonParent = setParentElementDisplay(buttonElement, "flex")
    if (buttonParent) { setParentElementDisplay(buttonParent, "flex") }
}

// unlocks the button and forces the parts factory button with buttonID display to flex
function unlockFactoryButton(buttonID) {
    game.factoryButtons[buttonID].unlocked = true
    let buttonElement = document.getElementById(buttonID + "-button")
    buttonElement.style.display = "flex"

    let buttonParent = setParentElementDisplay(buttonElement, "flex")
    if (buttonParent) { setParentElementDisplay(buttonParent, "flex") }
}

function setParentElementDisplay(rootElement, displayType) {
    let parentElement = rootElement.parentElement
    if (parentElement) {
        parentElement.style.display = "flex"
    }
    return parentElement
}
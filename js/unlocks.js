// holds all the unlocks, their conditions and what they unlock, and a bool to circumvent the check if its done already
// if for whatever reason we need to add unlocks that are skipped from the start, we just add the skip thing here
// damn hard to read from time to time, maybe some other way?
const UNLOCKS = [
    { conditions: [{ resource: "wood", amount: 1 }], targets: [{ recoveryButton: "burn-wood" }, { resource: "energy" }] },
    { conditions: [{ resource: "scrap", amount: 1 }], targets: [{ recoveryButton: "salvage-scrap" }] },
    { conditions: [{ recoveryButton: "robot-housing", amount: 1 }], targets: [{ recoveryButton: "create-robot" }, { resource: "robots" }] },
    { conditions: [{ recoveryButton: "drone-dock", amount: 1 }], targets: [{ recoveryButton: "create-drone" }, { resource: "drones" }] },
    { conditions: [{ recoveryButton: "salvage-scrap", amount: 1 }], targets: [{ resource: "squares" }, { resource: "circles" }, { resource: "triangles" }] },

    { conditions: COSTS_GAINS.recoveryButtons["wood-burner"].costs, targets: [{ recoveryButton: "wood-burner" }] },
    { conditions: COSTS_GAINS.recoveryButtons["robot-housing"].costs, targets: [{ recoveryButton: "robot-housing" }] },
    { conditions: COSTS_GAINS.recoveryButtons["windmill"].costs, targets: [{ recoveryButton: "windmill" }] },
    { conditions: COSTS_GAINS.recoveryButtons["solar-panel"].costs, targets: [{ recoveryButton: "solar-panel" }] },
    { conditions: COSTS_GAINS.recoveryButtons["mech-workshop"].costs, targets: [{ recoveryButton: "mech-workshop" }] },
    { conditions: COSTS_GAINS.recoveryButtons["drone-dock"].costs, targets: [{ recoveryButton: "drone-dock" }] },

    { conditions: [{ resource: "squares", amount: 100 }, { resource: "circles", amount: 100 }, { resource: "triangles", amount: 100 }], targets: [{ resource: "cubes" }] },

    { conditions: [{ resource: "robots", amount: 1 }], targets: [{ job: "scrap-collector" }, { job: "woodcutter" }, { job: "idle-robot" }, { tabButton: "jobs" }] },
    { conditions: [{ recoveryButton: "mech-workshop", amount: 1 }], targets: [{ tabButton: "mech-workshop" }, { job: "factory-bot" }, { mechButton: "mech-frame" }, { mechButton: "mech-armor" }, { mechButton: "mech-recovery" }, { mechButton: "mech-joints" }, { mechButton: "mech-vision" }, { mechButton: "mech-weapons" }] },
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
    let sectionID = game.recoveryButtons[buttonID].section
    let sectionElement = document.getElementById(sectionID)
    sectionElement.style.display = "flex"
}

// unlocks the job and forces the job-assignment with jobID display to flex
function unlockJob(jobID) {
    game.jobs[jobID].unlocked = true
    let jobElement = document.getElementById("job-" + jobID)
    jobElement.style.display = "flex"
    let sectionElement = document.getElementById("jobs-section-job-assignment")
    sectionElement.style.display = "flex"
}

// unlocks the button and forces the mech workshop button with buttonID display to flex
function unlockMechButton(buttonID) {
    game.mechButtons[buttonID].unlocked = true
    let buttonElement = document.getElementById(buttonID + "-button")
    buttonElement.style.display = "flex"
    let sectionElement = document.getElementById("mech-workshop-section-build-a-mech")
    sectionElement.style.display = "flex"
}
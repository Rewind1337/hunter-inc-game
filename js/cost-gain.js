const COSTS_GAINS = {
    jobs: { // job data
        "idle-robot": {
            costs: [],
            costsPerSecond: [],
            gains: [],
            gainsPerSecond: [],
        },
        "woodcutter": {
            costs: [],
            costsPerSecond: [{ resource: "energy", amount: 0.1 }],
            gains: [],
            gainsPerSecond: [{ resource: "wood", amount: 1 }],
        },
        "scrap-collector": {
            costs: [],
            costsPerSecond: [{ resource: "energy", amount: 0.1 }],
            gains: [],
            gainsPerSecond: [{ resource: "scrap", amount: 1 }],
        },
        "factory-bot": {
            costs: [],
            costsPerSecond: [{ resource: "energy", amount: 0.1 }],
            gains: [],
            gainsPerSecond: [],
        },
    },
    recoveryButtons: { // recovery tab data
        // gather buttons
        "salvage-old-mech": {
            costs: [{ special: "salvage-old-mech-left", amount: 1 }],
            costsPerSecond: [],
            gains: [{ resource: "wood", amount: 2 }, { resource: "scrap", amount: 3 }],
            gainsPerSecond: [],
        },
        "gather-wood": {
            costs: [],
            costsPerSecond: [],
            gains: [{ resource: "wood", amount: 1 }],
            gainsPerSecond: [],
        },
        "collect-scrap": {
            costs: [],
            costsPerSecond: [],
            gains: [{ resource: "scrap", amount: 1 }],
            gainsPerSecond: [],
        },

        // action buttons
        "burn-wood": {
            costs: [{ resource: "wood", amount: 2.5 }],
            costsPerSecond: [],
            gains: [{ resource: "energy", amount: 1 }],
            gainsPerSecond: [],
        },
        "salvage-scrap": {
            costs: [{ resource: "scrap", amount: 1 }],
            costsPerSecond: [],
            gains: [{ resource: "squares", amount: 0.6 }, { resource: "circles", amount: 0.3 }, { resource: "triangles", amount: 0.1 }],
            gainsPerSecond: [],
        },
        "create-robot": {
            costs: [{ resource: "wood", amount: 50 }, { resource: "scrap", amount: 25 }],
            costsPerSecond: [], // these dont cost anything per second, cos we will calculate that from the resource itself
            gains: [{ resource: "robots", amount: 1 }],
            gainsPerSecond: [], // same thing but with jobs
        },
        "create-drone": {
            costs: [{ resource: "scrap", amount: 200 }],
            costsPerSecond: [], // these dont cost anything per second, cos we will calculate that from the resource itself
            gains: [{ resource: "drones", amount: 1 }],
            gainsPerSecond: [], // same thing but with jobs
        },

        // building buttons
        "wood-burner": {
            costs: [{ resource: "wood", amount: 25 }, { resource: "scrap", amount: 25 }],
            costsPerSecond: [{ resource: "wood", amount: 1 }],
            gains: [{ resourceCapacity: "energy", amount: 50 }],
            gainsPerSecond: [{ resource: "energy", amount: 0.5 }],
        },
        "energy-storage": {
            costs: [{ resource: "wood", amount: 10 }, { resource: "scrap", amount: 50 }],
            costsPerSecond: [],
            gains: [{ resourceCapacity: "energy", amount: 200 }],
            gainsPerSecond: [],
        },
        "robot-housing": {
            costs: [{ resource: "wood", amount: 50 }, { resource: "scrap", amount: 100 }],
            costsPerSecond: [],
            gains: [{ resourceCapacity: "robots", amount: 1 }],
            gainsPerSecond: [],
        },
        "resource-storage": {
            costs: [{ resource: "wood", amount: 80 }, { resource: "scrap", amount: 80 }],
            costsPerSecond: [],
            gains: [{ resourceCapacity: "wood", amount: 200 }, { resourceCapacity: "scrap", amount: 200 }, { resourceCapacity: "squares", amount: 50 }, { resourceCapacity: "circles", amount: 50 }, { resourceCapacity: "triangles", amount: 50 }],
            gainsPerSecond: [],
        },
        "windmill": {
            costs: [{ resource: "wood", amount: 200 }, { resource: "scrap", amount: 200 }],
            costsPerSecond: [],
            gains: [{ resourceCapacity: "energy", amount: 50 }],
            gainsPerSecond: [{ resource: "energy", amount: 0.2 }],
        },
        "shape-factory": {
            costs: [{ resource: "wood", amount: 150 }, { resource: "scrap", amount: 600 }],
            costsPerSecond: [],
            gains: [{ resourceCapacity: "squares", amount: 50 }, { resourceCapacity: "circles", amount: 50 }, { resourceCapacity: "triangles", amount: 50 }],
            gainsPerSecond: [],
        },
        "solar-panel": {
            costs: [{ resource: "wood", amount: 250 }, { resource: "scrap", amount: 500 }],
            costsPerSecond: [],
            gains: [{ resourceCapacity: "energy", amount: 100 }],
            gainsPerSecond: [{ resource: "energy", amount: 0.5 }],
        },
        "mech-workshop": {
            costs: [{ resource: "wood", amount: 1000 }, { resource: "scrap", amount: 1250 }],
            costsPerSecond: [],
            gains: [],
            gainsPerSecond: [],
        },
        "drone-dock": {
            costs: [{ resource: "wood", amount: 500 }, { resource: "scrap", amount: 2250 }],
            costsPerSecond: [],
            gains: [{ resourceCapacity: "drones", amount: 2 }],
            gainsPerSecond: [],
        },
    },
    mechButtons: { // mech tab data
        "mech-frame": { // health
            costs: [],
            gains: [],
        },
        "mech-armor": { // armor
            costs: [],
            gains: [],
        },
        "mech-recovery": { // regen
            costs: [],
            gains: [],
        },
        "mech-joints": { // attackspeed and or speed
            costs: [],
            gains: [],
        },
        "mech-vision": { // dodge and or crit
            costs: [],
            gains: [],
        },
        "mech-weapons": { // damage
            costs: [],
            gains: [],
        },
    },
}

// appends the stuff from this file onto your main game state object
function initCostsAndGains() {
    for (let key in game.jobs) {
        let job = game.jobs[key]
        job.costs = COSTS_GAINS.jobs[key].costs
        job.costsPerSecond = COSTS_GAINS.jobs[key].costsPerSecond
        job.gains = COSTS_GAINS.jobs[key].gains
        job.gainsPerSecond = COSTS_GAINS.jobs[key].gainsPerSecond
    }

    for (let key in game.recoveryButtons) {
        let button = game.recoveryButtons[key]
        button.costs = COSTS_GAINS.recoveryButtons[key].costs
        button.costsPerSecond = COSTS_GAINS.recoveryButtons[key].costsPerSecond
        button.gains = COSTS_GAINS.recoveryButtons[key].gains
        button.gainsPerSecond = COSTS_GAINS.recoveryButtons[key].gainsPerSecond
    }

    for (let key in game.mechButtons) {
        let button = game.mechButtons[key]
        button.costs = COSTS_GAINS.mechButtons[key].costs
        button.costsPerSecond = COSTS_GAINS.mechButtons[key].costsPerSecond
        button.gains = COSTS_GAINS.mechButtons[key].gains
        button.gainsPerSecond = COSTS_GAINS.mechButtons[key].gainsPerSecond
    }
}
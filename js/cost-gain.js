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
        "compress-cube": {
            costs: [{ resource: "squares", amount: 100 }, { resource: "circles", amount: 100 }, { resource: "triangles", amount: 100 }],
            costsPerSecond: [], // these dont cost anything per second, cos we will calculate that from the resource itself
            gains: [{ resource: "cubes", amount: 1 }],
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
            costs: [{ resource: "wood", amount: 50 }, { resource: "scrap", amount: 100 }, { resource: "squares", amount: 5 }],
            costsPerSecond: [],
            gains: [{ resourceCapacity: "robots", amount: 1 }],
            gainsPerSecond: [],
        },
        "resource-storage": {
            costs: [{ resource: "wood", amount: 80 }, { resource: "scrap", amount: 80 }],
            costsPerSecond: [],
            gains: [{ resourceCapacity: "wood", amount: 200 }, { resourceCapacity: "scrap", amount: 200 }, { resourceCapacity: "squares", amount: 15 }, { resourceCapacity: "circles", amount: 7.5 }, { resourceCapacity: "triangles", amount: 2.5 }, { resourceCapacity: "cubes", amount: 2.5 }],
            gainsPerSecond: [],
        },
        "windmill": {
            costs: [{ resource: "wood", amount: 200 }, { resource: "scrap", amount: 200 }],
            costsPerSecond: [],
            gains: [{ resourceCapacity: "energy", amount: 50 }],
            gainsPerSecond: [{ resource: "energy", amount: 0.2 }],
        },
        "shape-factory": {
            costs: [{ resource: "wood", amount: 150 }, { resource: "scrap", amount: 600 }, { resource: "cubes", amount: 1 }],
            costsPerSecond: [],
            gains: [{ resourceCapacity: "squares", amount: 60 }, { resourceCapacity: "circles", amount: 30 }, { resourceCapacity: "triangles", amount: 10 }, { resourceCapacity: "cubes", amount: 10 }],
            gainsPerSecond: [],
        },
        "solar-panel": {
            costs: [{ resource: "wood", amount: 250 }, { resource: "scrap", amount: 500 }, { resource: "circles", amount: 5 }],
            costsPerSecond: [],
            gains: [{ resourceCapacity: "energy", amount: 100 }],
            gainsPerSecond: [{ resource: "energy", amount: 0.5 }],
        },
        "mech-workshop": {
            costs: [{ resource: "wood", amount: 1000 }, { resource: "scrap", amount: 1250 }, { resource: "cubes", amount: 1 }],
            costsPerSecond: [],
            gains: [],
            gainsPerSecond: [],
        },
        "drone-dock": {
            costs: [{ resource: "wood", amount: 500 }, { resource: "scrap", amount: 2250 }, { resource: "squares", amount: 20 }],
            costsPerSecond: [],
            gains: [{ resourceCapacity: "drones", amount: 2 }],
            gainsPerSecond: [],
        },
    },
    mechButtons: { // mech tab data
        "mech-frame": { // health
            costs: [{ resource: "scrap", amount: 1000 }, { resource: "triangles", amount: 5 }, { resource: "cubes", amount: 5 }],
            gains: [{ special: "mech-health", amount: 2 }],
        },
        "mech-armor": { // armor
            costs: [{ resource: "scrap", amount: 1000 }, { resource: "squares", amount: 50 }, { resource: "cubes", amount: 5 }],
            gains: [{ special: "mech-armor", amount: 1 }],
        },
        "mech-recovery": { // regen
            costs: [{ resource: "scrap", amount: 1000 }, { resource: "circles", amount: 25 }, { resource: "cubes", amount: 5 }],
            gains: [{ special: "mech-regen", amount: 0.2 }],
        },
        "mech-joints": { // speed
            costs: [{ resource: "scrap", amount: 1000 }, { resource: "triangles", amount: 10 }, { resource: "cubes", amount: 5 }],
            gains: [{ special: "mech-speed", amount: 0.1 }],
        },
        "mech-vision": { // crit
            costs: [{ resource: "scrap", amount: 1000 }, { resource: "squares", amount: 50 }, { resource: "cubes", amount: 5 }],
            gains: [{ special: "mech-crit", amount: 1 }],
        },
        "mech-weapons": { // damage
            costs: [{ resource: "scrap", amount: 1000 }, { resource: "circles", amount: 10 }, { resource: "cubes", amount: 5 }],
            gains: [{ special: "mech-damage", amount: 0.5 }],
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
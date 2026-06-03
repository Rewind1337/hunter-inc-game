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
            costScaling: true,
        },
        "create-drone": {
            costs: [{ resource: "scrap", amount: 200 }],
            costsPerSecond: [], // these dont cost anything per second, cos we will calculate that from the resource itself
            gains: [{ resource: "drones", amount: 1 }],
            gainsPerSecond: [], // same thing but with jobs
            costScaling: true,
        },

        // building buttons
        "wood-burner": {
            costs: [{ resource: "wood", amount: 50 }, { resource: "scrap", amount: 50 }],
            costsPerSecond: [{ resource: "wood", amount: 1 }],
            gains: [],
            gainsPerSecond: [{ resource: "energy", amount: 0.5 }],
            costScaling: true,
        },
        "energy-storage": {
            costs: [{ resource: "wood", amount: 30 }, { resource: "scrap", amount: 90 }],
            costsPerSecond: [],
            gains: [{ resourceCapacity: "energy", amount: 50 }],
            gainsPerSecond: [],
            costScaling: true,
        },
        "robot-housing": {
            costs: [{ resource: "wood", amount: 30 }, { resource: "scrap", amount: 60 }, { resource: "squares", amount: 5 }],
            costsPerSecond: [],
            gains: [{ resourceCapacity: "robots", amount: 1 }],
            gainsPerSecond: [],
            costScaling: true,
        },
        "resource-storage": {
            costs: [{ resource: "wood", amount: 80 }, { resource: "scrap", amount: 80 }],
            costsPerSecond: [],
            gains: [{ resourceCapacity: "wood", amount: 200 }, { resourceCapacity: "scrap", amount: 200 }, { resourceCapacity: "squares", amount: 15 }, { resourceCapacity: "circles", amount: 7.5 }, { resourceCapacity: "triangles", amount: 2.5 }, { resourceCapacity: "cubes", amount: 2.5 }],
            gainsPerSecond: [],
            costScaling: true,
        },
        "windmill": {
            costs: [{ resource: "wood", amount: 200 }, { resource: "scrap", amount: 200 }],
            costsPerSecond: [],
            gains: [],
            gainsPerSecond: [{ resource: "energy", amount: 0.2 }],
            costScaling: true,
        },
        "shape-factory": {
            costs: [{ resource: "wood", amount: 150 }, { resource: "scrap", amount: 600 }, { resource: "cubes", amount: 1 }],
            costsPerSecond: [],
            gains: [{ resourceCapacity: "squares", amount: 60 }, { resourceCapacity: "circles", amount: 30 }, { resourceCapacity: "triangles", amount: 10 }, { resourceCapacity: "cubes", amount: 10 }],
            gainsPerSecond: [],
            costScaling: true,
        },
        "solar-panel": {
            costs: [{ resource: "wood", amount: 250 }, { resource: "scrap", amount: 500 }, { resource: "circles", amount: 5 }],
            costsPerSecond: [],
            gains: [],
            gainsPerSecond: [{ resource: "energy", amount: 0.5 }],
            costScaling: true,
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
            costScaling: true,
        },
        "construction-bay": {
            costs: [{ resource: "wood", amount: 50000 }, { resource: "scrap", amount: 50000 }], // todo
            costsPerSecond: [],
            gains: [],
            gainsPerSecond: [],
            costScaling: true,
        },
        "parts-factory": {
            costs: [{ resource: "wood", amount: 50000 }, { resource: "scrap", amount: 50000 }], // todo
            costsPerSecond: [],
            gains: [],
            gainsPerSecond: [],
        },
    },
    factoryButtons: { // factory tab data
        "small-battery": {
            costs: [{ resource: "scrap", amount: 300 }],
            gains: [{ special: "small-battery", amount: 1 }],
        },
        "compressed-cube": {
            costs: [{ resource: "squares", amount: 100 }, { resource: "circles", amount: 100 }, { resource: "triangles", amount: 100 }],
            gains: [{ special: "compressed-cube", amount: 1 }],
        },
    },
    mechButtons: { // mech tab data
        "mech-frame": { // health
            costs: [{ resource: "scrap", amount: 1000 }, { resource: "triangles", amount: 5 }, { resource: "cubes", amount: 5 }],
            gains: [{ special: "mech-health", amount: 2 }],
            costScaling: true,
        },
        "mech-armor": { // armor
            costs: [{ resource: "scrap", amount: 1000 }, { resource: "squares", amount: 50 }, { resource: "cubes", amount: 5 }],
            gains: [{ special: "mech-armor", amount: 1 }],
            costScaling: true,
        },
        "mech-recovery": { // regen
            costs: [{ resource: "scrap", amount: 1000 }, { resource: "circles", amount: 25 }, { resource: "cubes", amount: 5 }],
            gains: [{ special: "mech-regen", amount: 0.2 }],
            costScaling: true,
        },
        "mech-joints": { // speed
            costs: [{ resource: "scrap", amount: 1000 }, { resource: "triangles", amount: 10 }, { resource: "cubes", amount: 5 }],
            gains: [{ special: "mech-speed", amount: 0.1 }],
            costScaling: true,
        },
        "mech-vision": { // crit
            costs: [{ resource: "scrap", amount: 1000 }, { resource: "squares", amount: 50 }, { resource: "cubes", amount: 5 }],
            gains: [{ special: "mech-crit", amount: 1 }],
            costScaling: true,
        },
        "mech-weapons": { // damage
            costs: [{ resource: "scrap", amount: 1000 }, { resource: "circles", amount: 10 }, { resource: "cubes", amount: 5 }],
            gains: [{ special: "mech-damage", amount: 0.5 }],
            costScaling: true,
        },
    },
}

// appends the stuff from this file onto your main game state object
function initCostsAndGains() {
    for (let key in game.jobs) {
        let job = game.jobs[key]
        let ref = COSTS_GAINS.jobs[key]
        job.costs = ref.costs
        job.costsPerSecond = ref.costsPerSecond
        job.gains = ref.gains
        job.gainsPerSecond = ref.gainsPerSecond
    }

    for (let key in game.recoveryButtons) {
        let button = game.recoveryButtons[key]
        let ref = COSTS_GAINS.recoveryButtons[key]

        button.costs = (ref.costs === undefined ? [] : ref.costs)
        button.costsPerSecond = (ref.costsPerSecond === undefined ? [] : ref.costsPerSecond)
        button.gains = (ref.gains === undefined ? [] : ref.gains)
        button.gainsPerSecond = (ref.gainsPerSecond === undefined ? [] : ref.gainsPerSecond)
        button.costScaling = (ref.costScaling === undefined ? false : ref.costScaling)
    }

    for (let key in game.factoryButtons) {
        let button = game.factoryButtons[key]
        let ref = COSTS_GAINS.factoryButtons[key]

        button.costs = (ref.costs === undefined ? [] : ref.costs)
        button.costsPerSecond = (ref.costsPerSecond === undefined ? [] : ref.costsPerSecond)
        button.gains = (ref.gains === undefined ? [] : ref.gains)
        button.gainsPerSecond = (ref.gainsPerSecond === undefined ? [] : ref.gainsPerSecond)
        button.costScaling = (ref.costScaling === undefined ? false : ref.costScaling)
    }

    for (let key in game.mechButtons) {
        let button = game.mechButtons[key]
        let ref = COSTS_GAINS.mechButtons[key]

        button.costs = (ref.costs === undefined ? [] : ref.costs)
        button.costsPerSecond = (ref.costsPerSecond === undefined ? [] : ref.costsPerSecond)
        button.gains = (ref.gains === undefined ? [] : ref.gains)
        button.gainsPerSecond = (ref.gainsPerSecond === undefined ? [] : ref.gainsPerSecond)
        button.costScaling = (ref.costScaling === undefined ? false : ref.costScaling)
    }
}
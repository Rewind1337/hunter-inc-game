const COSTS_GAINS = {
    jobs: { // job data
        "idle-robot": {},
        "woodcutter": {
            costsPerSecond: [{ resource: "energy", amount: 0.1 }],
            gainsPerSecond: [{ resource: "wood", amount: 1 }],
        },
        "scrap-collector": {
            costsPerSecond: [{ resource: "energy", amount: 0.1 }],
            gainsPerSecond: [{ resource: "scrap", amount: 1 }],
        },
        "factory-bot": {},
    },
    recoveryButtons: { // recovery tab data
        // gather buttons
        "salvage-old-mech": {
            costs: [{ special: "salvage-old-mech-left", amount: 1 }],
            gains: [{ resource: "wood", amount: 2 }, { resource: "scrap", amount: 3 }],
        },
        "gather-wood": {
            gains: [{ resource: "wood", amount: 1 }],
        },
        "collect-scrap": {
            gains: [{ resource: "scrap", amount: 1e17 }],
        },

        // action buttons
        "burn-wood": {
            costs: [{ resource: "wood", amount: 2.5 }],
            gains: [{ resource: "energy", amount: 1 }],
        },
        "salvage-scrap": {
            costs: [{ resource: "scrap", amount: 1 }],
            gains: [{ resource: "squares", amount: 0.6 }, { resource: "circles", amount: 0.3 }, { resource: "triangles", amount: 0.1 }],
        },
        "create-robot": { // these dont cost anything per second, cos we will calculate that from the resource itself
            costs: [{ resource: "wood", amount: 50 }, { resource: "scrap", amount: 25 }],
            gains: [{ resource: "robots", amount: 1 }],
            costScaling: true,
        },
        "create-drone": { // these dont cost anything per second, cos we will calculate that from the resource itself
            costs: [{ resource: "scrap", amount: 200 }],
            gains: [{ resource: "drones", amount: 1 }],
            costScaling: true,
        },

        // building buttons
        "wood-burner": {
            costs: [{ resource: "wood", amount: 50 }, { resource: "scrap", amount: 50 }],
            costsPerSecond: [{ resource: "wood", amount: 1 }],
            gainsPerSecond: [{ resource: "energy", amount: 0.5 }],
            costScaling: true,
        },
        "energy-storage": {
            costs: [{ resource: "wood", amount: 30 }, { resource: "scrap", amount: 90 }],
            gains: [{ resourceCapacity: "energy", amount: 50 }],
            costScaling: true,
        },
        "robot-housing": {
            costs: [{ resource: "wood", amount: 30 }, { resource: "scrap", amount: 60 }, { resource: "squares", amount: 5 }],
            gains: [{ resourceCapacity: "robots", amount: 1 }],
            costScaling: true,
        },
        "resource-storage": {
            costs: [{ resource: "wood", amount: 80 }, { resource: "scrap", amount: 80 }],
            gains: [{ resourceCapacity: "wood", amount: 200 }, { resourceCapacity: "scrap", amount: 200 }, { resourceCapacity: "squares", amount: 15 }, { resourceCapacity: "circles", amount: 7.5 }, { resourceCapacity: "triangles", amount: 2.5 }, { resourceCapacity: "cubes", amount: 2.5 }],
            costScaling: true,
        },
        "windmill": {
            costs: [{ resource: "wood", amount: 200 }, { resource: "scrap", amount: 200 }],
            gainsPerSecond: [{ resource: "energy", amount: 0.2 }],
            costScaling: true,
        },
        "shape-factory": {
            costs: [{ resource: "wood", amount: 150 }, { resource: "scrap", amount: 600 }, { resource: "cubes", amount: 1 }],
            gains: [{ resourceCapacity: "squares", amount: 60 }, { resourceCapacity: "circles", amount: 30 }, { resourceCapacity: "triangles", amount: 10 }, { resourceCapacity: "cubes", amount: 10 }],
            costScaling: true,
        },
        "solar-panel": {
            costs: [{ resource: "wood", amount: 250 }, { resource: "scrap", amount: 500 }, { resource: "circles", amount: 5 }],
            gainsPerSecond: [{ resource: "energy", amount: 0.5 }],
            costScaling: true,
        },
        "mech-workshop": {
            costs: [{ resource: "wood", amount: 1000 }, { resource: "scrap", amount: 1250 }, { resource: "cubes", amount: 1 }],
        },
        "drone-dock": {
            costs: [{ resource: "wood", amount: 500 }, { resource: "scrap", amount: 2250 }, { resource: "squares", amount: 20 }],
            gains: [{ resourceCapacity: "drones", amount: 2 }],
            costScaling: true,
        },
        "construction-bay": {
            costs: [{ resource: "wood", amount: 50000 }, { resource: "scrap", amount: 50000 }],
            gains: [], // TODO
            costScaling: true,
        },
        "parts-factory": {
            costs: [{ resource: "wood", amount: 50000 }, { resource: "scrap", amount: 50000 }], // todo
        },
    },
    factoryButtons: { // factory tab data
        "part-small-battery": {
            costs: [{ resource: "scrap", amount: 300 }],
            gains: [{ special: "part-small-battery", amount: 1 }],
        },
        "part-compressed-cube": {
            costs: [{ resource: "squares", amount: 100 }, { resource: "circles", amount: 100 }, { resource: "triangles", amount: 100 }],
            gains: [{ special: "part-compressed-cube", amount: 1 }],
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
    let targetGroups = ["jobs", "recoveryButtons", "factoryButtons", "mechButtons"]

    for (let i = 0; i < targetGroups.length; i++) {
        let buttonGroup = game[targetGroups[i]]
        let refGroup = COSTS_GAINS[targetGroups[i]]
        for (let key in buttonGroup) {
            let button = buttonGroup[key]
            let ref = refGroup[key]

            button.costs = (ref.costs === undefined ? [] : ref.costs)
            button.costsPerSecond = (ref.costsPerSecond === undefined ? [] : ref.costsPerSecond)
            button.costMultipliers = (ref.costMultipliers === undefined ? [] : ref.costMultipliers)
            button.gains = (ref.gains === undefined ? [] : ref.gains)
            button.gainsPerSecond = (ref.gainsPerSecond === undefined ? [] : ref.gainsPerSecond)
            button.gainMultipliers = (ref.gainMultipliers === undefined ? [] : ref.gainMultipliers)
            button.costScaling = (ref.costScaling === undefined ? false : ref.costScaling)
        }
    }
}
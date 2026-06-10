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
            gains: [{ resource: "scrap", amount: 1 }],
        },

        // action buttons
        "burn-wood": {
            costs: [{ resource: "wood", amount: 2.5 }],
            gains: [{ resource: "energy", amount: 1 }],
        },
        "salvage-scrap": {
            costs: [{ resource: "scrap", amount: 1 }],
            gains: [{ resource: "plates", amount: 0.6 }, { resource: "links", amount: 0.3 }, { resource: "memory", amount: 0.1 }],
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
            costs: [{ resource: "wood", amount: 30 }, { resource: "scrap", amount: 60 }, { resource: "plates", amount: 5 }],
            gains: [{ resourceCapacity: "robots", amount: 1 }],
            costScaling: true,
        },
        "resource-storage": {
            costs: [{ resource: "wood", amount: 80 }, { resource: "scrap", amount: 80 }],
            gains: [{ resourceCapacity: "wood", amount: 200 }, { resourceCapacity: "scrap", amount: 200 }, { resourceCapacity: "plates", amount: 15 }, { resourceCapacity: "links", amount: 7.5 }, { resourceCapacity: "memory", amount: 2.5 }],
            costScaling: true,
        },
        "windmill": {
            costs: [{ resource: "wood", amount: 200 }, { resource: "scrap", amount: 200 }],
            gainsPerSecond: [{ resource: "energy", amount: 0.2 }],
            costScaling: true,
        },
        "shape-factory": {
            costs: [{ resource: "wood", amount: 150 }, { resource: "scrap", amount: 600 }],
            gains: [{ resourceCapacity: "plates", amount: 60 }, { resourceCapacity: "links", amount: 30 }, { resourceCapacity: "memory", amount: 10 }],
            costScaling: true,
        },
        "solar-panel": {
            costs: [{ resource: "wood", amount: 250 }, { resource: "scrap", amount: 500 }, { resource: "links", amount: 5 }],
            gainsPerSecond: [{ resource: "energy", amount: 0.5 }],
            costScaling: true,
        },
        "mech-workshop": {
            costs: [{ resource: "wood", amount: 1000 }, { resource: "scrap", amount: 1250 }],
        },
        "drone-dock": {
            costs: [{ resource: "wood", amount: 500 }, { resource: "scrap", amount: 2250 }, { resource: "plates", amount: 20 }],
            gains: [{ resourceCapacity: "drones", amount: 2 }],
            costScaling: true,
        },
        "construction-bay": {
            costs: [{ resource: "wood", amount: 4000 }, { resource: "scrap", amount: 5000 }],
            gains: [{ costMultiplier: 0.95, buttonType: "recoveryButtons", buttonID: "robot-housing" }, { costMultiplier: 0.95, buttonType: "recoveryButtons", buttonID: "drone-dock" }],
            costScaling: true,
        },
        "parts-factory": {
            costs: [{ resource: "wood", amount: 10000 }, { resource: "scrap", amount: 10000 }],
        },
    },
    factoryButtons: { // factory tab data
        "part-small-battery": {
            costs: [{ resource: "scrap", amount: 300 }],
            gains: [{ special: "part-small-battery", amount: 1 }],
        },
        "part-compressed-cube": {
            costs: [{ resource: "plates", amount: 100 }, { resource: "links", amount: 100 }, { resource: "memory", amount: 100 }],
            gains: [{ special: "part-compressed-cube", amount: 1 }],
        },
    },
    mechButtons: { // mech tab data
        "mech-frame": { // health
            costs: [{ resource: "scrap", amount: 1000 }, { resource: "memory", amount: 5 }],
            gains: [{ special: "mech-health", amount: 2 }],
            costScaling: true,
        },
        "mech-armor": { // armor
            costs: [{ resource: "scrap", amount: 1000 }, { resource: "plates", amount: 50 }],
            gains: [{ special: "mech-armor", amount: 1 }],
            costScaling: true,
        },
        "mech-recovery": { // regen
            costs: [{ resource: "scrap", amount: 1000 }, { resource: "links", amount: 25 }],
            gains: [{ special: "mech-regen", amount: 0.2 }],
            costScaling: true,
        },
        "mech-joints": { // speed
            costs: [{ resource: "scrap", amount: 1000 }, { resource: "memory", amount: 10 }],
            gains: [{ special: "mech-speed", amount: 0.1 }],
            costScaling: true,
        },
        "mech-vision": { // crit
            costs: [{ resource: "scrap", amount: 1000 }, { resource: "plates", amount: 50 }],
            gains: [{ special: "mech-crit", amount: 1 }],
            costScaling: true,
        },
        "mech-weapons": { // damage
            costs: [{ resource: "scrap", amount: 1000 }, { resource: "links", amount: 10 }],
            gains: [{ special: "mech-damage", amount: 0.5 }],
            costScaling: true,
        },
        "mech-module-chainsaw": {
            costs: [{ resource: "scrap", amount: 3000 }, { resource: "links", amount: 30 }, { resource: "plates", amount: 30 }, { resource: "memory", amount: 10 }],
            gains: [{ special: "module-chainsaw-lvl", amount: 1 }], // subject to change
        },
        "mech-module-energy-barrier": {
            costs: [{ resource: "scrap", amount: 40000 }, { resource: "energy", amount: 10000 }],
            gains: [{ special: "module-energy-barrier-lvl", amount: 1 }], // subject to change
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
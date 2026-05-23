const COSTS_GAINS = {
    recoveryButtons: { // recovery tab data
        // gather buttons
        "salvage-old-mech": {
            costs: [{ special: "salvage-old-mech-left", amount: 1 }],
            gains: [{ resource: "wood", amount: 2 }, { resource: "scrap", amount: 3 }],
        },
        "gather-wood": {
            costs: [],
            gains: [{ resource: "wood", amount: 1 }],
        },
        "collect-scrap": {
            costs: [],
            gains: [{ resource: "scrap", amount: 1 }],
        },

        // action buttons
        "burn-wood": {
            costs: [{ resource: "wood", amount: 5 }],
            gains: [{ resource: "energy", amount: 1 }],
        },
        "salvage-scrap": {
            costs: [{ resource: "scrap", amount: 1 }],
            gains: [{ resource: "squares", amount: 0.6 }, { resource: "circles", amount: 0.3 }, { resource: "triangles", amount: 0.1 }],
        },
        "create-robot": {
            costs: [{ resource: "wood", amount: 50 }, { resource: "scrap", amount: 25 }],
            gains: [{ resource: "robots", amount: 1 }],
        },
        "create-drone": {
            costs: [{ resource: "scrap", amount: 200 }],
            gains: [{ resource: "drones", amount: 1 }],
        },

        // building buttons
        "wood-burner": {
            costs: [{ resource: "wood", amount: 25 }, { resource: "scrap", amount: 25 }],
            gains: [],
        },
        "robot-housing": {
            costs: [{ resource: "wood", amount: 50 }, { resource: "scrap", amount: 100 }],
            gains: [],
        },
        "windmill": {
            costs: [{ resource: "wood", amount: 200 }, { resource: "scrap", amount: 200 }],
            gains: [],
        },
        "solar-panel": {
            costs: [{ resource: "wood", amount: 250 }, { resource: "scrap", amount: 500 }],
            gains: [],
        },
        "mech-workshop": {
            costs: [{ resource: "wood", amount: 1000 }, { resource: "scrap", amount: 1250 }],
            gains: [],
        },
        "drone-dock": {
            costs: [{ resource: "wood", amount: 500 }, { resource: "scrap", amount: 2250 }],
            gains: [],
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

function initCostsAndGains() {
    for (let key in game.recoveryButtons) {
        let button = game.recoveryButtons[key]
        button.costs = COSTS_GAINS.recoveryButtons[key].costs
        button.gains = COSTS_GAINS.recoveryButtons[key].gains
    }
}
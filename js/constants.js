const INITIAL_RECOVERY_STATE = {
    currentState: "recovery", // may come in handy
    resource: { // resource data
        "energy": { id: "resource-energy", name: "Energy", current: 0, max: 0, unlocked: false },
        "robots": { id: "resource-robots", name: "Robots", current: 0, max: 0, unlocked: false },
        "drones": { id: "resource-drones", name: "Drones", current: 0, max: 0, unlocked: false },
        "wood": { id: "resource-wood", name: "Wood", current: 0, max: 100, unlocked: true },
        "scrap": { id: "resource-scrap", name: "Scrap", current: 0, max: 100, unlocked: true },
        "squares": { id: "resource-squares", name: "Squares", current: 0, max: 50, unlocked: false },
        "circles": { id: "resource-circles", name: "Circles", current: 0, max: 50, unlocked: false },
        "triangles": { id: "resource-triangles", name: "Triangles", current: 0, max: 50, unlocked: false },
        "cubes": { id: "resource-cubes", name: "Cubes", current: 0, max: 50, unlocked: false },
    },
    special: { // hidden data
        "salvage-old-mech-left": 250
    },
    jobs: { // job data
        "idle-robot": { id: "job-idle-robot", name: "Idle Robot", current: 0, max: 0, unlocked: false },
        "woodcutter": { id: "job-woodcutter", name: "Woodcutter", current: 0, max: 0, unlocked: false },
        "scrap-collector": { id: "job-scrap-collector", name: "Scrap Collector", current: 0, max: 0, unlocked: false },
        "factory-bot": { id: "job-factory-bot", name: "Factory Bot", current: 0, max: 0, unlocked: false },
    },
    recoveryButtons: { // recovery tab data
        // gather buttons
        "salvage-old-mech": {
            id: "salvage-old-mech-button", name: "Salvage Old Mech", section: "recovery-section-gather", unlocked: true,
            current: 0, max: -1,
            costs: [{ special: "salvage-old-mech-left", amount: 1 }],
            gains: [{ resource: "wood", amount: 2 }, { resource: "scrap", amount: 3 }],
        },
        "gather-wood": {
            id: "gather-wood-button", name: "Gather Wood", section: "recovery-section-gather", unlocked: true,
            current: 0, max: -1,
            costs: [],
            gains: [{ resource: "wood", amount: 1 }],
        },
        "collect-scrap": {
            id: "collect-scrap-button", name: "Collect Scrap", section: "recovery-section-gather", unlocked: true,
            current: 0, max: -1,
            costs: [],
            gains: [{ resource: "scrap", amount: 1 }],
        },

        // action buttons
        "burn-wood": {
            id: "burn-wood-button", name: "Burn Wood", section: "recovery-section-actions", unlocked: false,
            current: 0, max: -1,
            costs: [{ resource: "wood", amount: 5 }],
            gains: [{ resource: "energy", amount: 1 }],
        },
        "salvage-scrap": {
            id: "salvage-scrap-button", name: "Salvage Scrap", section: "recovery-section-actions", unlocked: false,
            current: 0, max: -1,
            costs: [{ resource: "scrap", amount: 1 }],
            gains: [{ resource: "squares", amount: 0.6 }, { resource: "circles", amount: 0.3 }, { resource: "triangles", amount: 0.1 }],
        },
        "create-robot": {
            id: "create-robot-button", name: "Create Robot", section: "recovery-section-actions", unlocked: false,
            current: 0, max: -1,
            costs: [{ resource: "wood", amount: 50 }, { resource: "scrap", amount: 25 }],
            gains: [{ resource: "robots", amount: 1 }],
        },
        "create-drone": {
            id: "create-drone-button", name: "Create Drone", section: "recovery-section-actions", unlocked: false,
            current: 0, max: -1,
            costs: [{ resource: "scrap", amount: 200 }],
            gains: [{ resource: "drones", amount: 1 }],
        },

        // building buttons
        "wood-burner": {
            id: "wood-burner-button", name: "Wood Burner", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
            costs: [{ resource: "wood", amount: 25 }, { resource: "scrap", amount: 25 }],
            gains: [],
        },
        "robot-housing": {
            id: "robot-housing-button", name: "Robot Housing", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
            costs: [{ resource: "wood", amount: 50 }, { resource: "scrap", amount: 100 }],
            gains: [],
        },
        "windmill": {
            id: "windmill-button", name: "Windmill", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
            costs: [{ resource: "wood", amount: 200 }, { resource: "scrap", amount: 200 }],
            gains: [],
        },
        "solar-panel": {
            id: "solar-panel-button", name: "Solar Panel", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
            costs: [{ resource: "wood", amount: 250 }, { resource: "scrap", amount: 500 }],
            gains: [],
        },
        "mech-workshop": {
            id: "mech-workshop-button", name: "Mech Workshop", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
            costs: [{ resource: "wood", amount: 1000 }, { resource: "scrap", amount: 1250 }],
            gains: [],
        },
        "drone-dock": {
            id: "drone-dock-button", name: "Drone Dock", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
            costs: [{ resource: "wood", amount: 500 }, { resource: "scrap", amount: 2250 }],
            gains: [],
        },
    },
    mechButtons: { // mech tab data
        "mech-frame": {
            id: "mech-frame-button", name: "Mech Frame", section: "mech-workshop-section-build-a-mech", unlocked: false,
            current: 0, max: -1,
            costs: [],
            gains: [],
        }, // health
        "mech-armor": {
            id: "mech-armor-button", name: "Mech Armor", section: "mech-workshop-section-build-a-mech", unlocked: false,
            current: 0, max: -1,
            costs: [],
            gains: [],
        }, // armor
        "mech-recovery": {
            id: "mech-recovery-button", name: "Mech Recovery", section: "mech-workshop-section-build-a-mech", unlocked: false,
            current: 0, max: -1,
            costs: [],
            gains: [],
        }, // regen
        "mech-joints": {
            id: "mech-joints-button", name: "Mech Joints", section: "mech-workshop-section-build-a-mech", unlocked: false,
            current: 0, max: -1,
            costs: [],
            gains: [],
        }, // attackspeed and or speed
        "mech-vision": {
            id: "mech-vision-button", name: "Mech Vision", section: "mech-workshop-section-build-a-mech", unlocked: false,
            current: 0, max: -1,
            costs: [],
            gains: [],
        }, // dodge and or crit
        "mech-weapons": {
            id: "mech-weapons-button", name: "Mech Weapons", section: "mech-workshop-section-build-a-mech", unlocked: false,
            current: 0, max: -1,
            costs: [],
            gains: [],
        }, // damage
    },
}
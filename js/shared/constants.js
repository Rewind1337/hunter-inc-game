const INITIAL_RECOVERY_STATE = {
    currentState: "recovery", // may come in handy
    resource: { // resource data
        "energy": {
            id: "resource-energy", name: "Energy", description: "",
            current: 0, capacity: 100, capacityMultiplier: 1, unlocked: false
        },
        "robots": {
            id: "resource-robots", name: "Robots", description: "",
            current: 0, capacity: 0, capacityMultiplier: 1, unlocked: false
        },
        "drones": {
            id: "resource-drones", name: "Drones", description: "",
            current: 0, capacity: 0, capacityMultiplier: 1, unlocked: false
        },
        "wood": {
            id: "resource-wood", name: "Wood", description: "",
            current: 0, capacity: 100, capacityMultiplier: 1, unlocked: true
        },
        "scrap": {
            id: "resource-scrap", name: "Scrap", description: "",
            current: 0, capacity: 100, capacityMultiplier: 1, unlocked: true
        },
        "plates": {
            id: "resource-plates", name: "Plates", description: "",
            current: 0, capacity: 30, capacityMultiplier: 1, unlocked: false
        },
        "links": {
            id: "resource-links", name: "Links", description: "",
            current: 0, capacity: 15, capacityMultiplier: 1, unlocked: false
        },
        "memory": {
            id: "resource-memory", name: "Memory", description: "",
            current: 0, capacity: 5, capacityMultiplier: 1, unlocked: false
        },
    },
    special: { // hidden data
        "salvage-old-mech-left": 250,
    },
    jobs: { // job data
        "idle-robot": {
            id: "job-idle-robot", name: "Idle Robot", description: "",
            current: 0, max: 0, unlocked: false
        },
        "woodcutter": {
            id: "job-woodcutter", name: "Woodcutter", description: "",
            current: 0, max: 0, unlocked: false
        },
        "scrap-collector": {
            id: "job-scrap-collector", name: "Scrap Collector", description: "",
            current: 0, max: 0, unlocked: false
        },
        "factory-bot": {
            id: "job-factory-bot", name: "Factory Bot", description: "",
            current: 0, max: 0, unlocked: false
        },
    },
    recoveryButtons: { // recovery tab data
        // costs and gains gets appended automatically with data from cost-gain.js
        // gather buttons
        "salvage-old-mech": {
            id: "salvage-old-mech-button", name: "Salvage Old Mech", description: "",
            current: 0, max: -1, unlocked: true,
            indicators: [{ location: "top-right", special: "salvage-old-mech-left" }],
        },
        "gather-wood": {
            id: "gather-wood-button", name: "Gather Wood", description: "",
            current: 0, max: -1, unlocked: true,
            indicators: [],
        },
        "collect-scrap": {
            id: "collect-scrap-button", name: "Collect Scrap", description: "",
            current: 0, max: -1, unlocked: true,
            indicators: [],
        },

        // action buttons
        "burn-wood": {
            id: "burn-wood-button", name: "Burn Wood", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [],
        },
        "salvage-scrap": {
            id: "salvage-scrap-button", name: "Salvage Scrap", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [],
        },
        "create-robot": {
            id: "create-robot-button", name: "Create Robot", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-left", resource: "robots" }],
        },
        "create-drone": {
            id: "create-drone-button", name: "Create Drone", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-left", resource: "drones" }],
        },

        // building buttons
        "wood-burner": {
            id: "wood-burner-button", name: "Wood Burner", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-left", current: "wood-burner", type: "recoveryButtons" }, { location: "top-right", settings: "wood-burner", type: "assignment" }, { location: "bottom-left", assignment: "off" }, { location: "bottom-right", assignment: "on" }],
            settings: { active: 0 },
        },
        "energy-storage": {
            id: "energy-storage-button", name: "Energy Storage", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-left", current: "energy-storage", type: "recoveryButtons" }],
        },
        "robot-housing": {
            id: "robot-housing-button", name: "Robot Housing", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-left", current: "robot-housing", type: "recoveryButtons" }],
        },
        "resource-storage": {
            id: "resource-storage-button", name: "Resource Storage", description: "",
            section: "recovery-section-buildings",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-left", current: "resource-storage", type: "recoveryButtons" }],
        },
        "windmill": {
            id: "windmill-button", name: "Windmill", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-left", current: "windmill", type: "recoveryButtons" }],
        },
        "shape-factory": {
            id: "shape-factory-button", name: "Shape Factory", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-left", current: "shape-factory", type: "recoveryButtons" }],
        },
        "solar-panel": {
            id: "solar-panel-button", name: "Solar Panel", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-left", current: "solar-panel", type: "recoveryButtons" }],
        },
        "mech-workshop": {
            id: "mech-workshop-button", name: "Mech Workshop", description: "",
            current: 0, max: 1, unlocked: false,
            indicators: [{ location: "top-left", current: "mech-workshop", type: "recoveryButtons" }],
        },
        "drone-dock": {
            id: "drone-dock-button", name: "Drone Dock", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-left", current: "drone-dock", type: "recoveryButtons" }],
        },
        // not done fully figuring them out / implementing these
        "construction-bay": { // reduces cost of some things
            id: "construction-bay-button", name: "Construction Bay", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-left", current: "construction-bay", type: "recoveryButtons" }],
        },
        "parts-factory": {
            id: "parts-factory-button", name: "Parts Factory", description: "",
            current: 0, max: 1, unlocked: false,
            indicators: [{ location: "top-left", current: "parts-factory", type: "recoveryButtons" }],
        },
    },
    factoryButtons: { // factory tab data
        "part-small-battery": {
            id: "part-small-battery-button", name: "Small Battery", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-right", special: "part-small-battery" }],
        },
        "part-compressed-cube": {
            id: "part-compressed-cube-button", name: "Compressed Cube", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-right", special: "part-compressed-cube" }],
        },
    },
    mechButtons: { // mech tab data
        "mech-frame": { // health
            id: "mech-frame-button", name: "Mech Frame", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-right", current: "mech-frame", type: "mechButtons" }],
        },
        "mech-armor": { // armor
            id: "mech-armor-button", name: "Mech Armor", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-right", current: "mech-armor", type: "mechButtons" }],
        },
        "mech-recovery": { // regen
            id: "mech-recovery-button", name: "Mech Recovery", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-right", current: "mech-recovery", type: "mechButtons" }],
        },
        "mech-joints": { // attackspeed and or speed
            id: "mech-joints-button", name: "Mech Joints", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-right", current: "mech-joints", type: "mechButtons" }],
        },
        "mech-vision": { // dodge and or crit
            id: "mech-vision-button", name: "Mech Vision", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-right", current: "mech-vision", type: "mechButtons" }],
        },
        "mech-weapons": { // damage
            id: "mech-weapons-button", name: "Mech Weapons", description: "",
            current: 0, max: -1, unlocked: false,
            indicators: [{ location: "top-right", current: "mech-weapons", type: "mechButtons" }],
        },
        "mech-module-chainsaw": { // damage
            id: "mech-module-chainsaw-button", name: "Chainsaw", description: "",
            current: 0, max: 1, unlocked: false,
        },
        "mech-module-energy-barrier": { // damage
            id: "mech-module-energy-barrier-button", name: "Energy Barrier", description: "",
            current: 0, max: 1, unlocked: false,
        },
    },
}
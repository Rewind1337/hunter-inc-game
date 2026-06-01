const INITIAL_RECOVERY_STATE = {
    currentState: "recovery", // may come in handy
    resource: { // resource data
        "energy": { id: "resource-energy", name: "Energy", current: 0, capacity: 100, capacityMultiplier: 1, unlocked: false },
        "robots": { id: "resource-robots", name: "Robots", current: 0, capacity: 0, capacityMultiplier: 1, unlocked: false },
        "drones": { id: "resource-drones", name: "Drones", current: 0, capacity: 0, capacityMultiplier: 1, unlocked: false },
        "wood": { id: "resource-wood", name: "Wood", current: 0, capacity: 100, capacityMultiplier: 1, unlocked: true },
        "scrap": { id: "resource-scrap", name: "Scrap", current: 0, capacity: 100, capacityMultiplier: 1, unlocked: true },
        "squares": { id: "resource-squares", name: "Squares", current: 0, capacity: 30, capacityMultiplier: 1, unlocked: false },
        "circles": { id: "resource-circles", name: "Circles", current: 0, capacity: 15, capacityMultiplier: 1, unlocked: false },
        "triangles": { id: "resource-triangles", name: "Triangles", current: 0, capacity: 5, capacityMultiplier: 1, unlocked: false },
        "cubes": { id: "resource-cubes", name: "Cubes", current: 0, capacity: 5, capacityMultiplier: 1, unlocked: false },
    },
    special: { // hidden data
        "salvage-old-mech-left": 250,
        "mech-health": 10,
        "mech-armor": 10,
        "mech-regen": 1,
        "mech-speed": 4,
        "mech-crit": 5,
        "mech-damage": 2,
    },
    jobs: { // job data
        "idle-robot": { id: "job-idle-robot", name: "Idle Robot", current: 0, max: 0, unlocked: false },
        "woodcutter": { id: "job-woodcutter", name: "Woodcutter", current: 0, max: 0, unlocked: false },
        "scrap-collector": { id: "job-scrap-collector", name: "Scrap Collector", current: 0, max: 0, unlocked: false },
        "factory-bot": { id: "job-factory-bot", name: "Factory Bot", current: 0, max: 0, unlocked: false },
    },
    recoveryButtons: { // recovery tab data
        // costs and gains gets appended automatically with data from cost-gain.js
        // gather buttons
        "salvage-old-mech": {
            id: "salvage-old-mech-button", name: "Salvage Old Mech", section: "recovery-section-gather", unlocked: true,
            current: 0, max: -1,
            indicators: [{ location: "top-right", special: "salvage-old-mech-left" }],
        },
        "gather-wood": {
            id: "gather-wood-button", name: "Gather Wood", section: "recovery-section-gather", unlocked: true,
            current: 0, max: -1,
            indicators: [],
        },
        "collect-scrap": {
            id: "collect-scrap-button", name: "Collect Scrap", section: "recovery-section-gather", unlocked: true,
            current: 0, max: -1,
            indicators: [],
        },

        // action buttons
        "burn-wood": {
            id: "burn-wood-button", name: "Burn Wood", section: "recovery-section-actions", unlocked: false,
            current: 0, max: -1,
            indicators: [],
        },
        "salvage-scrap": {
            id: "salvage-scrap-button", name: "Salvage Scrap", section: "recovery-section-actions", unlocked: false,
            current: 0, max: -1,
            indicators: [],
        },
        "create-robot": {
            id: "create-robot-button", name: "Create Robot", section: "recovery-section-actions", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-left", resource: "robots" }],
        },
        "create-drone": {
            id: "create-drone-button", name: "Create Drone", section: "recovery-section-actions", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-left", resource: "drones" }],
        },

        // building buttons
        "wood-burner": {
            id: "wood-burner-button", name: "Wood Burner", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-left", current: "wood-burner", type: "recoveryButtons" }, { location: "top-right", settings: "wood-burner", type: "assignment" }],
            settings: { current: 0, max: 0 },
        },
        "energy-storage": {
            id: "energy-storage-button", name: "Energy Storage", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-left", current: "energy-storage", type: "recoveryButtons" }],
        },
        "robot-housing": {
            id: "robot-housing-button", name: "Robot Housing", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-left", current: "robot-housing", type: "recoveryButtons" }],
        },
        "resource-storage": {
            id: "resource-storage-button", name: "Resource Storage", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-left", current: "resource-storage", type: "recoveryButtons" }],
        },
        "windmill": {
            id: "windmill-button", name: "Windmill", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-left", current: "windmill", type: "recoveryButtons" }],
        },
        "shape-factory": {
            id: "shape-factory-button", name: "Shape Factory", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-left", current: "shape-factory", type: "recoveryButtons" }],
        },
        "solar-panel": {
            id: "solar-panel-button", name: "Solar Panel", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-left", current: "solar-panel", type: "recoveryButtons" }],
        },
        "mech-workshop": {
            id: "mech-workshop-button", name: "Mech Workshop", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: 1,
            indicators: [{ location: "top-left", current: "mech-workshop", type: "recoveryButtons" }],
        },
        "drone-dock": {
            id: "drone-dock-button", name: "Drone Dock", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-left", current: "drone-dock", type: "recoveryButtons" }],
        },
        // not done fully figuring them out / implementing these
        "construction-bay": { // reduces cost of some things
            id: "construction-bay-button", name: "Construction Bay", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-left", current: "construction-bay", type: "recoveryButtons" }],
        },
        "parts-factory": {
            id: "parts-factory-button", name: "Parts Factory", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: 1,
            indicators: [{ location: "top-left", current: "parts-factory", type: "recoveryButtons" }],
        },
    },
    factoryButtons: { // factory tab data
        "small-battery": {
            id: "small-battery-button", name: "Small Battery", section: "parts-factory-section-parts", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-right", special: "small-battery" }],
        },
        "compressed-cube": {
            id: "compressed-cube-button", name: "Compressed Cube", section: "parts-factory-section-parts", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-right", special: "compressed-cube" }],
        },
    },
    mechButtons: { // mech tab data
        "mech-frame": { // health
            id: "mech-frame-button", name: "Mech Frame", section: "mech-workshop-section-build-a-mech", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-right", current: "mech-frame", type: "mechButtons" }],
        },
        "mech-armor": { // armor
            id: "mech-armor-button", name: "Mech Armor", section: "mech-workshop-section-build-a-mech", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-right", current: "mech-armor", type: "mechButtons" }],
        },
        "mech-recovery": { // regen
            id: "mech-recovery-button", name: "Mech Recovery", section: "mech-workshop-section-build-a-mech", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-right", current: "mech-recovery", type: "mechButtons" }],
        },
        "mech-joints": { // attackspeed and or speed
            id: "mech-joints-button", name: "Mech Joints", section: "mech-workshop-section-build-a-mech", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-right", current: "mech-joints", type: "mechButtons" }],
        },
        "mech-vision": { // dodge and or crit
            id: "mech-vision-button", name: "Mech Vision", section: "mech-workshop-section-build-a-mech", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-right", current: "mech-vision", type: "mechButtons" }],
        },
        "mech-weapons": { // damage
            id: "mech-weapons-button", name: "Mech Weapons", section: "mech-workshop-section-build-a-mech", unlocked: false,
            current: 0, max: -1,
            indicators: [{ location: "top-right", current: "mech-weapons", type: "mechButtons" }],
        },
    },
}
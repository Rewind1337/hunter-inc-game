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
        "salvage-old-mech-left": 5
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
        },
        "gather-wood": {
            id: "gather-wood-button", name: "Gather Wood", section: "recovery-section-gather", unlocked: true,
            current: 0, max: -1,
        },
        "collect-scrap": {
            id: "collect-scrap-button", name: "Collect Scrap", section: "recovery-section-gather", unlocked: true,
            current: 0, max: -1,
        },

        // action buttons
        "burn-wood": {
            id: "burn-wood-button", name: "Burn Wood", section: "recovery-section-actions", unlocked: false,
            current: 0, max: -1,
        },
        "salvage-scrap": {
            id: "salvage-scrap-button", name: "Salvage Scrap", section: "recovery-section-actions", unlocked: false,
            current: 0, max: -1,
        },
        "create-robot": {
            id: "create-robot-button", name: "Create Robot", section: "recovery-section-actions", unlocked: false,
            current: 0, max: -1,
        },
        "create-drone": {
            id: "create-drone-button", name: "Create Drone", section: "recovery-section-actions", unlocked: false,
            current: 0, max: -1,
        },

        // building buttons
        "wood-burner": {
            id: "wood-burner-button", name: "Wood Burner", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
        },
        "robot-housing": {
            id: "robot-housing-button", name: "Robot Housing", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
        },
        "windmill": {
            id: "windmill-button", name: "Windmill", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
        },
        "solar-panel": {
            id: "solar-panel-button", name: "Solar Panel", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
        },
        "mech-workshop": {
            id: "mech-workshop-button", name: "Mech Workshop", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
        },
        "drone-dock": {
            id: "drone-dock-button", name: "Drone Dock", section: "recovery-section-buildings", unlocked: false,
            current: 0, max: -1,
        },
    },
    mechButtons: { // mech tab data
        "mech-frame": { // health
            id: "mech-frame-button", name: "Mech Frame", section: "mech-workshop-section-build-a-mech", unlocked: false,
            current: 0, max: -1,
        },
        "mech-armor": { // armor
            id: "mech-armor-button", name: "Mech Armor", section: "mech-workshop-section-build-a-mech", unlocked: false,
            current: 0, max: -1,
        },
        "mech-recovery": { // regen
            id: "mech-recovery-button", name: "Mech Recovery", section: "mech-workshop-section-build-a-mech", unlocked: false,
            current: 0, max: -1,
        },
        "mech-joints": { // attackspeed and or speed
            id: "mech-joints-button", name: "Mech Joints", section: "mech-workshop-section-build-a-mech", unlocked: false,
            current: 0, max: -1,
        },
        "mech-vision": { // dodge and or crit
            id: "mech-vision-button", name: "Mech Vision", section: "mech-workshop-section-build-a-mech", unlocked: false,
            current: 0, max: -1,
        },
        "mech-weapons": { // damage
            id: "mech-weapons-button", name: "Mech Weapons", section: "mech-workshop-section-build-a-mech", unlocked: false,
            current: 0, max: -1,
        },
    },
}
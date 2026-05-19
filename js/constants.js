const INITIAL_RECOVERY_STATE = {
    currentState: "recovery", // may come in handy
    resource: { // resource data
        "energy": { id: "energy", name: "Energy", current: 0, max: 0, hidden: true },
        "workers": { id: "workers", name: "Workers", current: 0, max: 0, hidden: true },
        "drones": { id: "drones", name: "Drones", current: 0, max: 0, hidden: true },
        "wood": { id: "wood", name: "Wood", current: 0, max: 100, hidden: false },
        "scrap": { id: "scrap", name: "Scrap", current: 0, max: 100, hidden: false },
        "squares": { id: "squares", name: "Squares", current: 0, max: 50, hidden: true },
        "circles": { id: "circles", name: "Circles", current: 0, max: 50, hidden: true },
        "triangles": { id: "triangles", name: "Triangles", current: 0, max: 50, hidden: true },
        "cubes": { id: "cubes", name: "Cubes", current: 0, max: 50, hidden: true },
    },
    special: { // hidden data
        "salvage-mech-left": 250
    },
    jobs: { // job data
        "idle-robot": { id: "idle-robot", name: "Idle Robot", current: 0, max: 0, hidden: true },
        "woodcutter": { id: "woodcutter", name: "Woodcutter", current: 0, max: 0, hidden: true },
        "scrap-collector": { id: "scrap-collector", name: "Scrap Collector", current: 0, max: 0, hidden: true },
        "factory-bot": { id: "factory-bot", name: "Factory Bot", current: 0, max: 0, hidden: true },
    },
    recoveryButtons: { // recovery tab data
        "salvage-mech": { id: "salvage-old-mech", name: "Salvage Old Mech", section: "recovery-section-gather", hidden: false, costs: [{ special: "salvage-mech-left", amount: 1 }] },
        "gather-wood": { id: "gather-wood", name: "Gather Wood", section: "recovery-section-gather", hidden: false, costs: [] },
        "collect-scrap": { id: "collect-scrap", name: "Collect Scrap", section: "recovery-section-gather", hidden: false, costs: [] },

        "burn-wood": { id: "burn-wood", name: "Burn Wood", section: "recovery-section-actions", hidden: true, costs: [{ resource: "wood", amount: 5 }] },
        "salvage-scrap": { id: "salvage-scrap", name: "Salvage Scrap", section: "recovery-section-actions", hidden: true, costs: [{ resource: "scrap", amount: 1 }] },
        "create-robot": { id: "create-robot", name: "Create Robot", section: "recovery-section-actions", hidden: true, costs: [{ resource: "wood", amount: 50 }, { resource: "scrap", amount: 25 }] },
        "create-drone": { id: "create-drone", name: "Create Drone", section: "recovery-section-actions", hidden: true, costs: [{ resource: "scrap", amount: 200 }] },

        "wood-burner": { id: "wood-burner", name: "Wood Burner", section: "recovery-section-buildings", hidden: true, costs: [{ resource: "scrap", amount: 50 }] },
        "robot-housing": { id: "robot-housing", name: "Robot Housing", section: "recovery-section-buildings", hidden: true, costs: [{ resource: "wood", amount: 50 }, { resource: "scrap", amount: 100 }] },
        "windmill": { id: "windmill", name: "Windmill", section: "recovery-section-buildings", hidden: true, costs: [{ resource: "wood", amount: 200 }, { resource: "scrap", amount: 200 }] },
        "solar-panel": { id: "solar-panel", name: "Solar Panel", section: "recovery-section-buildings", hidden: true, costs: [{ resource: "wood", amount: 250 }, { resource: "scrap", amount: 500 }] },
        "mech-workshop": { id: "mech-workshop", name: "Mech Workshop", section: "recovery-section-buildings", hidden: true, costs: [{ resource: "wood", amount: 1000 }, { resource: "scrap", amount: 1000 }] },
        "drone-dock": { id: "drone-dock", name: "Drone Dock", section: "recovery-section-buildings", hidden: true, costs: [{ resource: "wood", amount: 500 }, { resource: "scrap", amount: 1500 }] },
    },
    mechButtons: { // mech tab data
        "mech-frame": { id: "mech-frame", name: "Mech Frame", section: "mech-workshop-section-build-a-mech", hidden: false, costs: [] }, // health
        "mech-armor": { id: "mech-armor", name: "Mech Armor", section: "mech-workshop-section-build-a-mech", hidden: false, costs: [] }, // armor
        "mech-recovery": { id: "mech-recovery", name: "Mech Recovery", section: "mech-workshop-section-build-a-mech", hidden: false, costs: [] }, // regen
        "mech-joints": { id: "mech-joints", name: "Mech Joints", section: "mech-workshop-section-build-a-mech", hidden: false, costs: [] }, // attackspeed and or speed
        "mech-vision": { id: "mech-vision", name: "Mech Vision", section: "mech-workshop-section-build-a-mech", hidden: false, costs: [] }, // dodge and or crit
        "mech-weapons": { id: "mech-weapons", name: "Mech Weapons", section: "mech-workshop-section-build-a-mech", hidden: false, costs: [] }, // damage
    },
}
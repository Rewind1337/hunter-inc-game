let RESEARCHES = [
    {
        id: 0, name: "Gathering+", description: "wood scrap gathering speed x2",
        costs: [{ resource: "wood", amount: 150 }, { resource: "scrap", amount: 150 }],
        gains: [
            { gainMultiplier: 2, buttonType: "recoveryButtons", buttonID: "gather-wood" },
            { gainMultiplier: 2, buttonType: "recoveryButtons", buttonID: "collect-scrap" },
            { gainMultiplier: 2, buttonType: "jobs", buttonID: "woodcutter" },
            { gainMultiplier: 2, buttonType: "jobs", buttonID: "scrap-collector" },
        ],
    }
]

function unlockResearch(id) {
    let research = RESEARCHES[id]
    let canAfford = checkCosts(research.costs)

    if (canAfford) {
        subtractAllCostsFromResources(research.costs)
        addAllGainsToResources(research.gains)
        research.unlocked = true
        updateResourceAmounts()
        hideResearch(id)
        checkAllButtonCostsAffordable()
        checkAllUnlockThings()
    }
}
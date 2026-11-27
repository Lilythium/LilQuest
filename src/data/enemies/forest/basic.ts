import type { EnemyDefinition } from "../types";

export const ForestRat: EnemyDefinition = {
    id: "forest-rat",
    name: "Rat",
    description: "A small rat that scurries through the forest.",
    tier: "basic",
    naming: "fixed",
    baseAttributes: {
        strength: 1,
        dexterity: 2,
        constitution: 1,
        intelligence: 1,
        wisdom: 1,
        charisma: 1
    },
    attributeGrowth: {
        strength: 2,
        dexterity: 2,
        constitution: 2,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
    },
    skillIds: ["bite"],
    rewards: {
        experience: 5,
        gold: 1
    }
};

export const ForestBandit: EnemyDefinition = {
    id: "forest-bandit",
    name: "Bandit",
    description: "A bandit who ambushes travellers in the forest.",
    tier: "basic",
    naming: "generated",
    raceId: "human",
    baseAttributes: {
        strength: 2,
        dexterity: 2,
        constitution: 2,
        intelligence: 1,
        wisdom: 1,
        charisma: 1
    },
    attributeGrowth: {
        strength: 3,
        dexterity: 2,
        constitution: 3,
        intelligence: 0,
        wisdom: 1,
        charisma: 0
    },
    skillIds: ["slash"],
    rewards: {
        experience: 10,
        gold: 6
    }
};

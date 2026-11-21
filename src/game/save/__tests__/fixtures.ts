import type { GameSave } from "../types";

export function createValidGameSave(): GameSave {
    return {
        saveId: "test-save",
        schemaVersion: 1,

        permanentProgress: {
            prestigeCount: 0,
            prestigeCurrency: 0,
            unlockedRaceIds: ["human"],
            unlockedClassIds: [],
            unlockedWorldIds: ["first-world"],
            firstClearedBossIds: []
        },

        currentRun: {
            runId: "test-run",
            runSeed: "test-seed",

            randomStates: {
                character: 0,
                exploration: 0,
                combat: 0,
                loot: 0
            },

            character: {
                id: "test-character",
                name: "Test Character",
                raceId: "human",
                genderId: "neutral",

                level: 1,
                experience: 0,
                gold: 0,

                currentHealth: 25,
                encounterStats: null,

                attributes: {
                    strength: 1,
                    dexterity: 1,
                    constitution: 1,
                    intelligence: 1,
                    wisdom: 1,
                    charisma: 1
                },

                secondaryStats: {
                    luck: 1,
                    healthRegen: 0.1,
                    critChance: 0.05,
                    critMultiplier: 1.5
                },

                inventory: [],

                equipment: {
                    amulet: {
                        id: "test-equipment",
                        definitionId: "test-amulet",
                        rarity: "common",
                        secondaryModifiers: [
                            { stat: "luck", value: 1 }
                        ],
                        level: 1
                    }
                },

                learnedSkillIds: [],
                activeSkillIds: [],
                traitIds: []
            },

            worldProgress: [
                {
                    worldId: "first-world",
                    currentStageId: "first-stage",
                    completedStageIds: []
                }
            ]
        }
    };
}
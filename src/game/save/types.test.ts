import { describe, expect, it } from "vitest";
import {
    deserializeGameSave,
    serializeGameSave,
    type GameSave
} from "./types";
import { validateGameSave } from "./validation";

const validSave: GameSave = {
    saveId: "save-1",
    schemaVersion: 1,
    permanentProgress: {
        prestigeCount: 0,
        prestigeCurrency: 0,
        unlockedRaceIds: ["human"],
        unlockedClassIds: [],
        unlockedWorldIds: ["forest"],
        firstClearedBossIds: []
    },
    currentRun: {
        runId: "run-1",
        runSeed: "seed-1",
        randomStates: {
            character: 10,
            exploration: 20,
            combat: 30,
            loot: 40
        },
        character: {
            id: "character-1",
            name: "Arin",
            raceId: "human",
            genderId: "neutral",
            level: 1,
            experience: 0,
            gold: 0,
            currentHealth: 10,
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
            equipment: {},
            learnedSkillIds: [],
            activeSkillIds: [],
            traitIds: []
        },
        worldProgress: []
    }
};

describe("game save serialization", () => {
    it("round trips a valid save", () => {
        const serialized = serializeGameSave(validSave);

        expect(JSON.parse(serialized)).toEqual(validSave);
        expect(deserializeGameSave(serialized)).toEqual(validSave);
    });

    it("supports a save with no active run", () => {
        const save: GameSave = {
            ...validSave,
            currentRun: null
        };

        expect(deserializeGameSave(serializeGameSave(save))).toEqual(save);
    });

    it("throws a meaningful JSON parsing error", () => {
        expect(() => deserializeGameSave("{"))
            .toThrow(/Invalid serialized GameSave JSON/);
    });

    it("rejects unsupported schema versions", () => {
        expect(() => deserializeGameSave(JSON.stringify({
            ...validSave,
            schemaVersion: 2
        }))).toThrow(/schemaVersion.*1/);
    });

    it("rejects missing nested data", () => {
        expect(() => deserializeGameSave(JSON.stringify({
            ...validSave,
            permanentProgress: {
                ...validSave.permanentProgress,
                unlockedRaceIds: null
            }
        }))).toThrow(/permanentProgress\.unlockedRaceIds.*array/);
    });
});

describe("game save validation", () => {
    it("accepts valid saves and rejects invalid structures and numeric values", () => {
        expect(validateGameSave(validSave)).toBe(true);
        expect(validateGameSave({ ...validSave, saveId: "" })).toBe(false);
        expect(validateGameSave({
            ...validSave,
            currentRun: {
                ...validSave.currentRun!,
                character: {
                    ...validSave.currentRun!.character,
                    level: 0
                }
            }
        })).toBe(false);
        expect(validateGameSave({
            ...validSave,
            currentRun: {
                ...validSave.currentRun!,
                character: {
                    ...validSave.currentRun!.character,
                    experience: -1
                }
            }
        })).toBe(false);
        expect(validateGameSave({
            ...validSave,
            currentRun: {
                ...validSave.currentRun!,
                randomStates: {
                    ...validSave.currentRun!.randomStates,
                    combat: 0x100000000
                }
            }
        })).toBe(false);
        expect(validateGameSave({
            ...validSave,
            currentRun: {
                ...validSave.currentRun!,
                randomStates: {
                    character: validSave.currentRun!.randomStates.character,
                    exploration: validSave.currentRun!.randomStates.exploration,
                    combat: validSave.currentRun!.randomStates.combat
                }
            }
        })).toBe(false);
        expect(validateGameSave({
            ...validSave,
            currentRun: {
                ...validSave.currentRun!,
                character: {
                    ...validSave.currentRun!.character,
                    gold: -1
                }
            }
        })).toBe(false);
    });
});

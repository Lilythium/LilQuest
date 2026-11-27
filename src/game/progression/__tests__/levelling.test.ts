import { describe, expect, it } from "vitest";
import type { Character } from "../../character/types";
import { createValidGameSave } from "../../save/__tests__/fixtures";
import { validateGameSave } from "../../save/validation";
import {
    allocateAttributePoint,
    applyExperience,
    attributePointsAtLevel,
    xpToNextLevel
} from "../levelling";

function createCharacter(overrides: Partial<Character> = {}): Character {
    return {
        id: "level-test-character",
        name: "Level Test",
        raceId: "human",
        genderId: "neutral",
        level: 1,
        experience: 0,
        unspentAttributePoints: 0,
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
        equipment: {},
        learnedSkillIds: [],
        activeSkillIds: [],
        traitIds: [],
        ...overrides
    };
}

describe("attributePointsAtLevel", () => {
    it("gives no points at level 1", () => {
        expect(attributePointsAtLevel(1)).toBe(0);
    });

    it("gives one point per level", () => {
        expect(attributePointsAtLevel(2)).toBe(1);
        expect(attributePointsAtLevel(4)).toBe(3);
    });

    it("adds a 3 point bonus every 5th level", () => {
        expect(attributePointsAtLevel(5)).toBe(4 + 3);
        expect(attributePointsAtLevel(9)).toBe(8 + 3);
        expect(attributePointsAtLevel(10)).toBe(9 + 6);
    });

    it("rejects invalid levels", () => {
        expect(() => attributePointsAtLevel(0)).toThrow();
        expect(() => attributePointsAtLevel(2.5)).toThrow();
    });
});

describe("experience progression", () => {
    it("uses the increasing XP cost curve", () => {
        expect(xpToNextLevel(1)).toBe(10);
        expect(xpToNextLevel(4)).toBe(40);
        expect(xpToNextLevel(10)).toBe(100);
        expect(xpToNextLevel(20)).toBe(300);
        expect(xpToNextLevel(30)).toBe(600);
    });

    it("carries surplus XP, handles multiple levels, and grants level-up points", () => {
        const surplus = applyExperience(
            createCharacter({ experience: 9 }),
            7
        );
        expect(surplus.level).toBe(2);
        expect(surplus.experience).toBe(6);
        expect(surplus.unspentAttributePoints).toBe(1);

        const multiLevel = applyExperience(createCharacter(), 100);
        expect(multiLevel.level).toBe(5);
        expect(multiLevel.experience).toBe(0);

        const levelFive = applyExperience(
            createCharacter({ level: 4 }),
            xpToNextLevel(4)
        );
        expect(levelFive.level).toBe(5);
        expect(levelFive.unspentAttributePoints).toBe(4);

        const levelSix = applyExperience(
            levelFive,
            xpToNextLevel(5)
        );
        expect(levelSix.level).toBe(6);
        expect(levelSix.unspentAttributePoints).toBe(5);
        expect(levelSix.currentHealth).toBe(levelFive.currentHealth);
    });

    it("allocates one unspent point to the selected attribute", () => {
        const character = createCharacter({ unspentAttributePoints: 1 });
        const allocated = allocateAttributePoint(character, "dexterity");

        expect(allocated.attributes.dexterity)
            .toBe(character.attributes.dexterity + 1);
        expect(allocated.attributes.strength).toBe(character.attributes.strength);
        expect(allocated.unspentAttributePoints).toBe(0);
        expect(character.unspentAttributePoints).toBe(1);
        expect(() => allocateAttributePoint(createCharacter(), "strength"))
            .toThrow();
    });
});

describe("progression save validation", () => {
    it("rejects negative or fractional unspent attribute points", () => {
        for (const unspentAttributePoints of [-1, 0.5]) {
            const save = createValidGameSave();
            save.currentRun!.character.unspentAttributePoints =
                unspentAttributePoints;

            expect(validateGameSave(save)).toBe(false);
        }
    });
});
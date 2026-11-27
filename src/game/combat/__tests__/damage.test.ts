import { describe, expect, it } from "vitest";
import { DEFAULT_SECONDARY_STATS, type Attributes } from "../../character/types";
import { calculateDerivedStats } from "../../character/derivedStats";
import { MAX_DAMAGE_REDUCTION } from "../constants";
import { calculateDamage } from "../damage";

const attributes: Attributes = {
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1
};

describe("damage reduction", () => {
    it("applies after armour, ignores true damage, and clamps to the maximum", () => {
        const defender = calculateDerivedStats(
            attributes,
            { ...DEFAULT_SECONDARY_STATS, damageReduction: 0.2 },
            0,
            100
        );

        expect(calculateDamage(100, "blunt", defender)).toBe(40);
        expect(calculateDamage(100, "true", defender)).toBe(100);

        const cappedDefender = calculateDerivedStats(
            attributes,
            { ...DEFAULT_SECONDARY_STATS, damageReduction: 1 },
            0,
            0
        );
        expect(cappedDefender.damageReduction).toBe(MAX_DAMAGE_REDUCTION);
    });
});

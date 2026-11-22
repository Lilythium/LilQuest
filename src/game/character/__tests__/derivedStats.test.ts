import { describe, expect, it } from "vitest";
import { DERIVED_STAT_FORMULAS } from "../derivedStats";
import type { Attributes } from "../types";

const attributes: Attributes = {
    strength: 1,
    dexterity: 10,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1
};

describe("speed derived stat", () => {
    it("scales speed by encumbrance tier", () => {
        expect(DERIVED_STAT_FORMULAS.speed(attributes, "unencumbered")).toBe(10);
        expect(DERIVED_STAT_FORMULAS.speed(attributes, "light")).toBe(9.5);
        expect(DERIVED_STAT_FORMULAS.speed(attributes, "moderate")).toBe(7.5);
        expect(DERIVED_STAT_FORMULAS.speed(attributes, "heavy")).toBe(5);
    });
});

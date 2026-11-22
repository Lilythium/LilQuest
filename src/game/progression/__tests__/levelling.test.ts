import { describe, expect, it } from "vitest";
import { attributePointsAtLevel } from "../levelling";

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
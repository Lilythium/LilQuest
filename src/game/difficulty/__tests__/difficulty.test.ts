import { describe, expect, it } from "vitest";
import {
    enemyLevelRange,
    getEffectiveDifficulty,
    rollEnemyLevel
} from "../difficulty";
import { createRng } from "../../random/rng";
import { FirstWorld } from "../../../data/worlds/firstWorld";
import { FirstWorldStages } from "../../../data/worlds/stages/firstWorld/stages";

function stage(id: string) {
    const found = FirstWorldStages.find(s => s.id === id);
    if (!found) throw new Error(`Missing stage ${id}`);
    return found;
}

describe("getEffectiveDifficulty", () => {
    it("adds the stage offset to the world base", () => {
        expect(getEffectiveDifficulty(FirstWorld, stage("rolling-hills"))).toBe(0);
        expect(getEffectiveDifficulty(FirstWorld, stage("dense-forest"))).toBe(2);
    });

    it("applies run modifiers", () => {
        expect(getEffectiveDifficulty(FirstWorld, stage("forest-edge"), 2)).toBe(3);
    });

    it("never goes below zero", () => {
        expect(getEffectiveDifficulty(FirstWorld, stage("forest-edge"), -10)).toBe(0);
    });
});

describe("enemyLevelRange", () => {
    it("gives only level 1 at difficulty 0", () => {
        expect(enemyLevelRange(0, "basic")).toEqual({ min: 1, max: 1 });
    });

    it("gives a wide low range at difficulty 1", () => {
        expect(enemyLevelRange(1, "basic")).toEqual({ min: 1, max: 4 });
    });

    it("gives a higher range at difficulty 10", () => {
        expect(enemyLevelRange(10, "basic")).toEqual({ min: 8, max: 12 });
    });

    it("widens as difficulty rises", () => {
        const width = (d: number) => {
            const { min, max } = enemyLevelRange(d, "basic");
            return max - min;
        };

        expect(width(0)).toBeLessThan(width(1));
        expect(width(1)).toBeLessThanOrEqual(width(10));
    });

    it("never goes below level 1", () => {
        expect(enemyLevelRange(-5, "basic").min).toBe(1);
    });

    it("shifts by the tier level offset", () => {
        const basic = enemyLevelRange(10, "basic");
        const elite = enemyLevelRange(10, "elite");

        expect(elite.min).toBe(basic.min + 1);
        expect(elite.max).toBe(basic.max + 1);
    });

    it("gives the first world boss a range around level 5", () => {
        const difficulty = getEffectiveDifficulty(FirstWorld, stage("forest-boss"));
        const range = enemyLevelRange(difficulty, "boss");

        expect(range.min).toBeLessThanOrEqual(5);
        expect(range.max).toBeGreaterThanOrEqual(5);
    });
});

describe("rollEnemyLevel", () => {
    it("stays within the range and is deterministic", () => {
        const { min, max } = enemyLevelRange(10, "basic");
        const a = createRng("seed");
        const b = createRng("seed");

        for (let i = 0; i < 50; i++) {
            const level = rollEnemyLevel(10, "basic", a);

            expect(level).toBeGreaterThanOrEqual(min);
            expect(level).toBeLessThanOrEqual(max);
            expect(level).toBe(rollEnemyLevel(10, "basic", b));
        }
    });
});
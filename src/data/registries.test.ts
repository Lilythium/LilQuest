import { describe, expect, it } from "vitest";
import { CLASSES, getClass } from "./classes";
import { ENEMIES, ELITE_MODIFIERS, getEnemy, getEliteModifier } from "./enemies";
import { POOLS, getPool } from "./pools";
import { SKILLS } from "./skills";
import { getStage, STAGES } from "./worlds/stages";
import { getWorld, WORLDS } from "./worlds";

describe("content registries", () => {
    it("registers the first world and all of its stages and pools", () => {
        const world = getWorld("greener-pastures");

        expect(WORLDS[world.id]).toBe(world);
        for (const { stageId } of world.stages) {
            expect(getStage(stageId)).toBe(STAGES[stageId]);
        }

        expect(() => getPool(world.content.basicEnemyPoolId)).not.toThrow();
        expect(() => getPool(world.content.eliteModifierPoolId)).not.toThrow();
        expect(() => getPool(world.content.miniBossPoolId)).not.toThrow();
        expect(() => getPool(world.content.equipmentPoolId)).not.toThrow();
    });

    it("registers all defined classes with an available class skill", () => {
        expect(Object.keys(CLASSES)).toHaveLength(5);

        for (const classId of Object.keys(CLASSES)) {
            const characterClass = getClass(classId);
            expect(SKILLS[characterClass.classSkillId]).toBeDefined();
        }
    });

    it("resolves enemy pool entries and all enemy skills", () => {
        for (const pool of Object.values(POOLS)) {
            if (pool.type === "basic-enemy") {
                for (const entry of pool.entries) {
                    expect(getEnemy(entry.contentId)).toBe(ENEMIES[entry.contentId]);
                }
            } else if (pool.type === "elite-modifier") {
                for (const entry of pool.entries) {
                    expect(getEliteModifier(entry.contentId))
                        .toBe(ELITE_MODIFIERS[entry.contentId]);
                }
            }
        }

        for (const enemy of Object.values(ENEMIES)) {
            for (const skillId of enemy.skillIds) {
                expect(SKILLS[skillId]).toBeDefined();
            }
        }
    });
});

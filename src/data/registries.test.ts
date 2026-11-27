import { describe, expect, it } from "vitest";
import { CLASSES, getClass } from "./classes";
import { getPool } from "./pools";
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
});

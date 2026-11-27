import { describe, expect, it } from "vitest";
import { ENEMIES, ELITE_MODIFIERS } from "../../../data/enemies";
import { attributePointsAtLevel } from "../../progression/levelling";
import { createRng } from "../../random/rng";
import { generateEnemy } from "../generateEnemy";

describe("generateEnemy", () => {
    it("distributes the level point budget and is deterministic for a seed", () => {
        const definition = ENEMIES["forest-rat"];
        const first = generateEnemy(definition, 5, createRng("rat-generation"));
        const second = generateEnemy(definition, 5, createRng("rat-generation"));
        const distributedPoints = (
            first.attributes.strength - definition.baseAttributes.strength
            + first.attributes.dexterity - definition.baseAttributes.dexterity
            + first.attributes.constitution - definition.baseAttributes.constitution
            + first.attributes.intelligence - definition.baseAttributes.intelligence
            + first.attributes.wisdom - definition.baseAttributes.wisdom
            + first.attributes.charisma - definition.baseAttributes.charisma
        );

        expect(distributedPoints).toBe(attributePointsAtLevel(5));
        expect(first).toEqual(second);
    });

    it("uses elite naming and scales rounded rewards", () => {
        const elite = ELITE_MODIFIERS.relentless;
        const fixedEnemy = generateEnemy(
            ENEMIES["forest-rat"],
            1,
            createRng("elite-rat"),
            elite
        );
        const generatedEnemy = generateEnemy(
            ENEMIES["forest-bandit"],
            1,
            createRng("elite-bandit"),
            elite
        );

        expect(fixedEnemy.name).toBe("Relentless Rat");
        expect(generatedEnemy.name).toMatch(/ the Relentless$/);
        expect(generatedEnemy.typeName).toBe("Bandit");
        expect(generatedEnemy.rewards).toEqual({
            experience: 19,
            gold: 11
        });
    });
});

import { describe, expect, it } from "vitest";
import { getSkill, SKILLS } from "./index";

describe("getSkill", () => {
    it("returns a skill by ID", () => {
        expect(getSkill("mend")).toBe(SKILLS.mend);
    });

    it("throws for an unknown skill ID", () => {
        expect(() => getSkill("missing-skill")).toThrow(
            'Skill "missing-skill" does not exist.'
        );
    });
});

describe("Reckless Abandon", () => {
    it("doubles damage with a combat multiplier instead of attribute scaling", () => {
        const skill = getSkill("reckless-abandon");

        expect(skill).toMatchObject({
            type: "composite",
            scaling: [
                {
                    operation: "multiply",
                    stat: {
                        target: "self",
                        scope: "combat",
                        stat: "damageMultiplier"
                    },
                    factor: 2
                }
            ]
        });
    });
});

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

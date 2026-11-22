import type { AnySkill } from "./types";
import { Slash, SimpleShot, Bludgeon } from "./equipmentSkills";
import { Mend, Bulwark, Sidestep, RecklessAbandon, Sap } from "./classSkills";

export const SKILLS: Record<string, AnySkill> = {
    [Slash.id]: Slash,
    [SimpleShot.id]: SimpleShot,
    [Bludgeon.id]: Bludgeon,
    [Mend.id]: Mend,
    [Bulwark.id]: Bulwark,
    [Sidestep.id]: Sidestep,
    [RecklessAbandon.id]: RecklessAbandon,
    [Sap.id]: Sap
};

export function getSkill(skillId: string): AnySkill {
    const skill = SKILLS[skillId];

    if (!skill) {
        throw new Error(`Skill "${skillId}" does not exist.`);
    }

    return skill;
}
import type { AttackSkill, Skill } from "../../game/skills/types";
import { slash, simpleShot, bludgeon } from "./equipmentSkills";
import { mend, bulwark, sidestep, recklessAbandon } from "./classSkills";

export const SKILLS: Record<string, Skill> = {
    [slash.id]: slash,
    [simpleShot.id]: simpleShot,
    [bludgeon.id]: bludgeon,
    [mend.id]: mend,
    [bulwark.id]: bulwark,
    [sidestep.id]: sidestep,
    [recklessAbandon.id]: recklessAbandon
};

export function getSkillById(
    id: string
): Skill | undefined {
    return SKILLS[id];
}
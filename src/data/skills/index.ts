import type { AttackSkill } from "../../game/skills/types";
import { slash, simpleShot, bludgeon } from "./attacks";

export const SKILLS: Record<string, AttackSkill> = {
    [slash.id]: slash,
    [simpleShot.id]: simpleShot,
    [bludgeon.id]: bludgeon
};

export function getSkillById(
    id: string
): AttackSkill | undefined {
    return SKILLS[id];
}
import { getSkill } from "../../data/skills";
import type { CombatAction, Combatant, CombatState } from "./types";

export function chooseAction(
    state: CombatState,
    actor: Combatant
): CombatAction {
    const target = actor.side === "player"
        ? state.enemies.find(enemy => enemy.currentHealth > 0)
        : state.player.currentHealth > 0
            ? state.player
            : undefined;

    if (!target) {
        return { type: "pass" };
    }

    for (const skillId of actor.skillIds) {
        const skill = getSkill(skillId);
        if (
            skill.type === "attack" &&
            skill.staminaCost <= actor.encounter.currentStamina
        ) {
            return {
                type: "skill",
                skillId,
                targetId: target.id
            };
        }
    }

    return { type: "pass" };
}

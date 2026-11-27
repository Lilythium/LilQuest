import type {
    AttackSkill,
    HealingSkill
} from "../../data/skills/types";
import { calculateDamage } from "./damage";
import type { Combatant, CombatEvent } from "./types";
import type { RandomGenerator } from "../random/rng";

export function resolveAttackSkill(
    actor: Combatant,
    target: Combatant,
    skill: AttackSkill,
    rng: RandomGenerator
): CombatEvent {
    let power = (
        skill.baseDamage +
        actor.attributes[skill.scaling.attribute] * skill.scaling.coefficient
    ) * actor.combat.damageMultiplier;
    const crit = rng.next() < actor.secondaryStats.critChance;

    if (crit) {
        power *= actor.secondaryStats.critMultiplier;
    }

    const damage = Math.max(
        1,
        Math.round(calculateDamage(power, skill.damageType, target.derived))
    );
    target.currentHealth = Math.max(0, target.currentHealth - damage);

    return {
        type: "attack",
        actorId: actor.id,
        targetId: target.id,
        skillId: skill.id,
        damage,
        crit,
        targetHealth: target.currentHealth
    };
}

export function resolveHealingSkill(
    actor: Combatant,
    skill: HealingSkill
): CombatEvent {
    const amount = Math.round(
        skill.baseHealing +
        actor.attributes[skill.scaling.attribute] * skill.scaling.coefficient
    );
    actor.currentHealth = Math.min(
        actor.derived.maxHealth,
        actor.currentHealth + amount
    );

    return {
        type: "heal",
        actorId: actor.id,
        skillId: skill.id,
        amount,
        health: actor.currentHealth
    };
}

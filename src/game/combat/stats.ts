import type { SkillStatReference } from "../../data/skills/types";
import { INITIATIVE_CAP } from "./constants";
import type { Combatant } from "./types";

export function getCombatantStat(
    combatant: Combatant,
    reference: SkillStatReference
): number {
    switch (reference.scope) {
        case "attribute":
            return combatant.attributes[reference.stat];
        case "secondary":
            return combatant.secondaryStats[reference.stat] ?? 0;
        case "derived":
            return combatant.derived[reference.stat];
        case "character":
            return combatant.currentHealth;
        case "encounter":
            return combatant.encounter[reference.stat];
        case "combat":
            return combatant.combat[reference.stat];
    }
}

export function setCombatantStat(
    combatant: Combatant,
    reference: SkillStatReference,
    value: number
): void {
    switch (reference.scope) {
        case "attribute":
            combatant.attributes[reference.stat] = value;
            return;
        case "secondary":
            combatant.secondaryStats[reference.stat] = value;
            return;
        case "derived":
            combatant.derived[reference.stat] = value;
            return;
        case "character":
            combatant.currentHealth = Math.max(
                0,
                Math.min(value, combatant.derived.maxHealth)
            );
            return;
        case "encounter":
            if (reference.stat === "currentStamina") {
                combatant.encounter.currentStamina = Math.max(
                    0,
                    Math.min(value, combatant.derived.maxStamina)
                );
            } else {
                combatant.encounter.currentInitiative = Math.max(
                    0,
                    Math.min(value, INITIATIVE_CAP)
                );
            }
            return;
        case "combat":
            combatant.combat[reference.stat] = value;
            return;
    }
}

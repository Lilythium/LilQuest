import { getEquipmentDefinition } from "../../data/equipment";
import { SKILLS } from "../../data/skills";
import type { Character } from "../character/types";
import { calculateDerivedStats } from "../character/derivedStats";
import { getEffectiveStats } from "../character/effectiveStats";
import type { GeneratedEnemy } from "../enemies/generateEnemy";
import type { Combatant } from "./types";

export function createPlayerCombatant(character: Character): Combatant {
    const effectiveStats = getEffectiveStats(character);
    const skillIds: string[] = [];
    const seenSkillIds = new Set<string>();

    function addSkill(skillId: string, source: string): void {
        if (!SKILLS[skillId]) {
            throw new Error(`Unknown skill "${skillId}" from ${source}.`);
        }

        if (!seenSkillIds.has(skillId)) {
            seenSkillIds.add(skillId);
            skillIds.push(skillId);
        }
    }

    for (const instance of Object.values(character.equipment)) {
        if (!instance) {
            continue;
        }

        const definition = getEquipmentDefinition(instance.definitionId);
        if (
            (definition.slotType === "weapon" || definition.slotType === "shield") &&
            "skill" in definition &&
            typeof definition.skill === "string"
        ) {
            addSkill(definition.skill, `equipped item "${definition.id}"`);
        }
    }

    for (const skillId of character.activeSkillIds) {
        addSkill(skillId, `character "${character.id}"`);
    }

    return {
        id: character.id,
        name: character.name,
        side: "player",
        level: character.level,
        attributes: effectiveStats.attributes,
        secondaryStats: effectiveStats.secondaryStats,
        derived: effectiveStats.derived,
        currentHealth: character.currentHealth,
        encounter: {
            currentStamina: effectiveStats.derived.maxStamina,
            currentInitiative: 0
        },
        combat: {
            damageMultiplier: 1
        },
        skillIds,
        traitIds: [...character.traitIds],
        statusEffects: []
    };
}

export function createEnemyCombatant(
    enemy: GeneratedEnemy,
    id: string
): Combatant {
    const derived = calculateDerivedStats(
        enemy.attributes,
        enemy.secondaryStats,
        0,
        enemy.armour
    );

    return {
        id,
        name: enemy.name,
        side: "enemy",
        level: enemy.level,
        attributes: enemy.attributes,
        secondaryStats: enemy.secondaryStats,
        derived,
        currentHealth: derived.maxHealth,
        encounter: {
            currentStamina: derived.maxStamina,
            currentInitiative: 0
        },
        combat: {
            damageMultiplier: 1
        },
        skillIds: [...enemy.skillIds],
        traitIds: [...enemy.traitIds],
        statusEffects: [],
        rewards: { ...enemy.rewards }
    };
}

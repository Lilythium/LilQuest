import type { Attributes, Character, SecondaryStats } from "./types";
import type { DerivedStats } from "./derivedStats";
import { calculateDerivedStats } from "./derivedStats";
import { resolveEquipmentBonuses } from "../equipment/resolveBonuses";

export interface EffectiveStats {
    attributes: Attributes;
    secondaryStats: SecondaryStats;
    derived: DerivedStats;
}

export function getEffectiveStats(character: Character): EffectiveStats {
    const bonuses = resolveEquipmentBonuses(character.equipment);
    const attributes: Attributes = {
        strength: character.attributes.strength + (bonuses.attributes.strength ?? 0),
        dexterity: character.attributes.dexterity + (bonuses.attributes.dexterity ?? 0),
        constitution: character.attributes.constitution + (bonuses.attributes.constitution ?? 0),
        intelligence: character.attributes.intelligence + (bonuses.attributes.intelligence ?? 0),
        wisdom: character.attributes.wisdom + (bonuses.attributes.wisdom ?? 0),
        charisma: character.attributes.charisma + (bonuses.attributes.charisma ?? 0)
    };
    const secondaryStats: SecondaryStats = {
        luck: character.secondaryStats.luck + (bonuses.secondaryStats.luck ?? 0),
        healthRegen: character.secondaryStats.healthRegen + (bonuses.secondaryStats.healthRegen ?? 0),
        critChance: character.secondaryStats.critChance + (bonuses.secondaryStats.critChance ?? 0),
        critMultiplier: character.secondaryStats.critMultiplier + (bonuses.secondaryStats.critMultiplier ?? 0),
        magicResistance:
            (character.secondaryStats.magicResistance ?? 0)
            + (bonuses.secondaryStats.magicResistance ?? 0),
        damageReduction:
            (character.secondaryStats.damageReduction ?? 0)
            + (bonuses.secondaryStats.damageReduction ?? 0)
    };

    return {
        attributes,
        secondaryStats,
        derived: calculateDerivedStats(
            attributes,
            secondaryStats,
            bonuses.weight,
            bonuses.armour
        )
    };
}

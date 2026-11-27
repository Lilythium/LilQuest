import type {
    CharacterEquipment,
    EquipmentDefinition,
    EquipmentStatModifier
} from "../../data/equipment/types";
import { getEquipmentDefinition } from "../../data/equipment";
import type { Attributes, SecondaryStats } from "../character/types";

export interface EquipmentBonuses {
    attributes: Partial<Attributes>;
    secondaryStats: Partial<SecondaryStats>;
    armour: number;
    weight: number;
}

function addModifier(
    modifier: EquipmentStatModifier,
    attributes: Partial<Attributes>,
    secondaryStats: Partial<SecondaryStats>
): number {
    const { stat, value } = modifier;

    switch (stat) {
        case "strength":
        case "dexterity":
        case "constitution":
        case "intelligence":
        case "wisdom":
        case "charisma":
            attributes[stat] = (attributes[stat] ?? 0) + value;
            return 0;
        case "luck":
        case "healthRegen":
        case "critChance":
        case "critMultiplier":
            secondaryStats[stat] = (secondaryStats[stat] ?? 0) + value;
            return 0;
        case "armour":
            return value;
        case "magicResistance":
            secondaryStats.magicResistance =
                (secondaryStats.magicResistance ?? 0) + value;
            return 0;
        case "damageReduction":
            secondaryStats.damageReduction =
                (secondaryStats.damageReduction ?? 0) + value;
            return 0;
        default:
            throw new Error(`Unsupported equipment modifier stat: ${stat}`);
    }
}

export function resolveEquipmentBonuses(
    equipment: CharacterEquipment
): EquipmentBonuses {
    const attributes: Partial<Attributes> = {};
    const secondaryStats: Partial<SecondaryStats> = {};
    const countedInstanceIds = new Set<string>();
    let armour = 0;
    let weight = 0;

    for (const instance of Object.values(equipment)) {
        if (!instance || countedInstanceIds.has(instance.id)) {
            continue;
        }

        countedInstanceIds.add(instance.id);
        const definition: EquipmentDefinition =
            getEquipmentDefinition(instance.definitionId);

        weight += definition.weight;
        armour += addModifier(definition.primaryModifier, attributes, secondaryStats);

        for (const modifier of instance.secondaryModifiers) {
            armour += addModifier(modifier, attributes, secondaryStats);
        }

        if (
            "armourValue" in definition &&
            typeof definition.armourValue === "number"
        ) {
            armour += definition.armourValue;
        }
    }

    return { attributes, secondaryStats, armour, weight };
}

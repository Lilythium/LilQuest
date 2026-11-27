import type {
    EquipmentDefinition,
    EquipmentInstance
} from "../../data/equipment/types";

// Procedural generation and scaling will be added later.
export function createEquipmentInstance(
    definition: EquipmentDefinition,
    id: string,
    level = 1
): EquipmentInstance {
    return {
        id,
        definitionId: definition.id,
        rarity: "common",
        secondaryModifiers: [],
        level
    };
}

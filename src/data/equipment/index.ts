import { IronSet } from "./armour/sets/iron";
import { LeatherSet } from "./armour/sets/leather";
import { AmuletOfFortune } from "./accessories/amulets";
import { OakCudgel, ShortIron, SplitWoodBow } from "./weapons";
import type { EquipmentDefinition } from "./types";

export const EQUIPMENT_DEFINITIONS: Record<string, EquipmentDefinition> = {
    [ShortIron.id]: ShortIron,
    [SplitWoodBow.id]: SplitWoodBow,
    [OakCudgel.id]: OakCudgel,
    [IronSet.helm.id]: IronSet.helm,
    [IronSet.chestplate.id]: IronSet.chestplate,
    [IronSet.greaves.id]: IronSet.greaves,
    [IronSet.boots.id]: IronSet.boots,
    [LeatherSet.helm.id]: LeatherSet.helm,
    [LeatherSet.chestplate.id]: LeatherSet.chestplate,
    [LeatherSet.greaves.id]: LeatherSet.greaves,
    [LeatherSet.boots.id]: LeatherSet.boots,
    [AmuletOfFortune.id]: AmuletOfFortune
};

export function getEquipmentDefinition(id: string): EquipmentDefinition {
    const definition = EQUIPMENT_DEFINITIONS[id];

    if (!definition) {
        throw new Error(`Unknown equipment definition: ${id}`);
    }

    return definition;
}

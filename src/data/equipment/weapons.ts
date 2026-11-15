import type { HandheldEquipmentDefinition } from "../../game/equipment/types";

export const ShortIron: HandheldEquipmentDefinition = {
    id: "short-iron",
    name: "Short Iron",
    description: "A short iron sword.",
    slotType: "weapon",
    primaryAttribute: {
        stat: "strength",
        value: 5
    },
    secondaryModifierPool: ["dexterity", "critChance", "critMultiplier"],
    weight: 2
};

export const SplitWoodBow: HandheldEquipmentDefinition = {
    id: "split-wood-bow",
    name: "Split-Wood Bow",
    description: "A sturdy bow made from split wood.",
    slotType: "weapon",
    handsRequired: 2,
    primaryAttribute: {
        stat: "dexterity",
        value: 5
    },
    secondaryModifierPool: ["strength", "critChance", "critMultiplier"],
    weight: 1.5
};

export const OakCudgel: HandheldEquipmentDefinition = {
    id: "oak-cudgel",
    name: "Oak Cudgel",
    description: "A sturdy cudgel made from oak wood.",
    slotType: "weapon",
    handsRequired: 2,
    primaryAttribute: {
        stat: "strength",
        value: 6
    },
    secondaryModifierPool: ["luck", "critChance", "critMultiplier"],
    weight: 3
};
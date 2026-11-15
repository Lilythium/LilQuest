import type { ArmourSetDefinition } from "../../../../game/equipment/types";

export const ironSet: ArmourSetDefinition = {
    id: "iron-set",
    name: "Iron Set",
    description: "A set of iron armour.",
    helm: {
        id: "iron-helm",
        name: "Iron Helm",
        description: "A simple iron helm.",
        slotType: "helm",
        primaryAttribute: {
            stat: "constitution",
            value: 1
        },
        secondaryModifierPool: ["strength", "dexterity", "intelligence", "wisdom", "charisma"],
        weight: 2,
    },
    chestplate: {
        id: "iron-chestplate",
        name: "Iron Chestplate",
        description: "A sturdy iron chestplate.",
        slotType: "chestplate",
        primaryAttribute: {
            stat: "constitution",
            value: 2
        },
        secondaryModifierPool: ["strength", "dexterity", "intelligence", "wisdom", "charisma"],
        weight: 5,
    },
    greaves: {
        id: "iron-greaves",
        name: "Iron Greaves",
        description: "Protective iron greaves.",
        slotType: "greaves",
        primaryAttribute: {
            stat: "constitution",
            value: 1
        },
        secondaryModifierPool: ["dexterity", "intelligence", "wisdom", "charisma"],
        weight: 3,
    }
};
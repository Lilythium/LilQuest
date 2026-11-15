import type { ArmourSetDefinition } from "../../../../game/equipment/types";

export const leatherSet: ArmourSetDefinition = {
    id: "leather-set",
    name: "Leather Set",
    description: "A set of leather armour.",
    helm: {
        id: "leather-helm",
        name: "Leather Helm",
        description: "A simple leather helm.",
        slotType: "helm",
        primaryAttribute: {
            stat: "dexterity",
            value: 1
        },
        secondaryModifierPool: ["strength", "constitution", "intelligence", "wisdom", "charisma"],
        weight: 2,
    },
    chestplate: {
        id: "leather-chestplate",
        name: "Leather Chestplate",
        description: "A sturdy leather chestplate.",
        slotType: "chestplate",
        primaryAttribute: {
            stat: "constitution",
            value: 2
        },
        secondaryModifierPool: ["strength", "dexterity", "intelligence", "wisdom", "charisma"],
        weight: 3,
    },
    greaves: {
        id: "leather-greaves",
        name: "Leather Greaves",
        description: "Protective leather greaves.",
        slotType: "greaves",
        primaryAttribute: {
            stat: "dexterity",
            value: 1
        },
        secondaryModifierPool: ["strength", "constitution", "intelligence", "wisdom", "charisma"],
        weight: 1,
    }
};
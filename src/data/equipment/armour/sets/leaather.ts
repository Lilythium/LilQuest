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
        primaryModifier: {
            stat: "dexterity",
            value: 1
        },
        secondaryModifierPool: ["strength", "constitution", "intelligence", "wisdom", "charisma"],
        weight: 2,
        armourValue: 1.5
    },
    chestplate: {
        id: "leather-chestplate",
        name: "Leather Chestplate",
        description: "A sturdy leather chestplate.",
        slotType: "chestplate",
        primaryModifier: {
            stat: "constitution",
            value: 2
        },
        secondaryModifierPool: ["strength", "dexterity", "intelligence", "wisdom", "charisma"],
        weight: 3,
        armourValue: 2
    },
    greaves: {
        id: "leather-greaves",
        name: "Leather Greaves",
        description: "Protective leather greaves.",
        slotType: "greaves",
        primaryModifier: {
            stat: "dexterity",
            value: 1
        },
        secondaryModifierPool: ["strength", "constitution", "intelligence", "wisdom", "charisma"],
        weight: 1,
        armourValue: 1
    },
    boots: {
        id: "leather-boots",
        name: "Leather Boots",
        description: "Durable leather boots.",
        slotType: "boots",
        primaryModifier: {
            stat: "dexterity",
            value: 1
        },
        secondaryModifierPool: ["strength", "constitution", "intelligence", "wisdom", "charisma"],
        weight: 1,
        armourValue: 1
    }
};
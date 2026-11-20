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
        primaryModifier: {
            stat: "constitution",
            value: 1
        },
        secondaryModifierPool: ["strength", "dexterity", "intelligence", "wisdom", "charisma"],
        weight: 2,
        armourValue: 2
    },
    chestplate: {
        id: "iron-chestplate",
        name: "Iron Chestplate",
        description: "A sturdy iron chestplate.",
        slotType: "chestplate",
        primaryModifier: {
            stat: "constitution",
            value: 2
        },
        secondaryModifierPool: ["strength", "dexterity", "intelligence", "wisdom", "charisma"],
        weight: 5,
        armourValue: 3
    },
    greaves: {
        id: "iron-greaves",
        name: "Iron Greaves",
        description: "Protective iron greaves.",
        slotType: "greaves",
        primaryModifier: {
            stat: "strength",
            value: 1
        },
        secondaryModifierPool: ["constitution", "intelligence", "wisdom", "charisma"],
        weight: 3,
        armourValue: 2
    },
    boots: {
        id: "iron-boots",
        name: "Iron Boots",
        description: "Durable iron boots.",
        slotType: "boots",
        primaryModifier: {
            stat: "constitution",
            value: 1
        },
        secondaryModifierPool: ["strength", "dexterity", "intelligence", "wisdom", "charisma"],
        weight: 2,
        armourValue: 2
    }
};
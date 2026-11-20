import type { EquipmentDefinition } from "../../../game/equipment/types";

export const amuletOfFortune: EquipmentDefinition = {
    id: "amulet-of-fortune",
    name: "Amulet of Fortune",
    description: "An amulet that brings good luck to its wearer.",
    slotType: "amulet",
    primaryModifier: {
        stat: "luck",
        value: 2
    },
    secondaryModifierPool: ["healthRegen", "damageReduction", "critChance", "critMultiplier"],
    weight: 0.5,
};
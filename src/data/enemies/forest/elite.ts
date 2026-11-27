import type { EliteModifierDefinition } from "../types";

export const Relentless: EliteModifierDefinition = {
    id: "relentless",
    title: "Relentless",
    attributeMultiplier: {
        strength: 1.2,
        dexterity: 1.2,
        constitution: 1.2,
        intelligence: 1,
        wisdom: 1,
        charisma: 1
    },
    rewardMultiplier: {
        experience: 1.25,
        gold: 1.25
    },
    rarityBonus: 0.05
};

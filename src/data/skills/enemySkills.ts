import type { AttackSkill } from "./types";

export const Bite: AttackSkill = {
    type: "attack",
    id: "bite",
    name: "Bite",
    description: "A quick bite at the target.",
    baseDamage: 3,
    staminaCost: 2,
    damageType: "piercing",
    scaling: {
        attribute: "dexterity",
        coefficient: 0.4
    }
};

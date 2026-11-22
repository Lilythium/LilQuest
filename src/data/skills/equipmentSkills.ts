import type { AttackSkill } from "../../game/skills/types";

export const slash: AttackSkill = {
    id: "slash",
    name: "Slash",
    description: "A basic slashing attack with a melee weapon.",
    baseDamage: 8,
    staminaCost: 3,
    cooldown: 100,
    damageType: "slashing",
    scaling: {
        attribute: "strength",
        coefficient: 0.5
    }
};

export const simpleShot: AttackSkill = {
    id: "simple-shot",
    name: "Simple Shot",
    description: "A basic ranged attack with a bow.",
    baseDamage: 6,
    staminaCost: 2,
    cooldown: 60,
    damageType: "piercing",
    scaling: {
        attribute: "dexterity",
        coefficient: 0.4
    }
};

export const bludgeon: AttackSkill = {
    id: "bludgeon",
    name: "Bludgeon",
    description: "A heavy bludgeoning attack with a blunt weapon.",
    baseDamage: 11,
    staminaCost: 5,
    cooldown: 125,
    damageType: "blunt",
    scaling: {
        attribute: "strength",
        coefficient: 0.6
    }
};

import type { Attributes } from "../character/types";

export interface Skill {
    id: string;
    name: string;
    description: string;
}

export interface AttackSkill extends Skill {
    baseDamage: number;
    staminaCost: number;
    cooldown: number;

    scaling: {
        attribute: keyof Attributes;
        coefficient: number;
    };
}
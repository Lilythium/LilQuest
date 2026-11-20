import type { Attributes } from "../character/types";

export type DamageType = 
"blunt" | "piercing" | "slashing" | "magic" | "true"

export interface Skill {
    id: string;
    name: string;
    description: string;
}

export interface AttackSkill extends Skill {
    baseDamage: number;
    staminaCost: number;
    cooldown: number;
    damageType: DamageType;

    scaling: {
        attribute: keyof Attributes;
        coefficient: number;
    };
}
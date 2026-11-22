import type { Attributes } from "../character/types";

export type DamageType = 
"blunt" | "piercing" | "slashing" | "magic" | "true"

export type SkillType =
    | "AttackSkill"
    | "HealingSkill"
    | "EffectSkill"
    | "StatSkill"
    | "CompositeSkill";

export interface Skill {
    id: string;
    name: string;
    description: string;
}

export interface AttackSkill extends Skill {
    type: "attack";
    baseDamage: number;
    staminaCost: number;
    cooldown: number;
    damageType: DamageType;

    scaling: {
        attribute: keyof Attributes;
        coefficient: number;
    };
}

export interface HealingSkill extends Skill {
    type: "healing";
    baseHealing: number;
    staminaCost: number;
    cooldown: number;

    scaling: {
        attribute: keyof Attributes;
        coefficient: number;
    };
}

export interface EffectSkill extends Skill {
    type: "effect";
    effectId: string;
    target: "self" | "enemy";
    staminaCost: number;
    cooldown: number;
    effectStacks: number;
}

export type StatTarget = "self" | "target";

export interface StatReference {
    target: StatTarget;
    stat: string; // ideally keyof Stats
}

// Modifiers change the stat they point at. Negative values reduce it.
export interface FlatModifier {
    id: string;
    type: "flat";
    stat: StatReference;
    amount: number;
}

export interface RatioModifier {
    id: string;
    type: "ratio";
    stat: StatReference;
    percentage: number; // of the stat's current value
}

// Takes what an earlier modifier removed and gives it to the destination.
export interface PreviousTransfer {
    id?: string;
    type: "previous-transfer";
    transferId: string;
    destination: StatReference;
}

export type StatStep = FlatModifier | RatioModifier | PreviousTransfer;

export interface StatSkill extends Skill {
    type: "stat";
    staminaCost: number;
    cooldown: number;
    transfers: StatStep[]; // applied in order
}

export interface CompositeSkill extends Skill {
    type: "composite";
    allowedSkillTypes: SkillType[];
    staminaCost: number;
    cooldown: number;
    scaling?: {
        attribute: keyof Attributes;
        coefficient: number;
    };
    effectIds?: string[];
}
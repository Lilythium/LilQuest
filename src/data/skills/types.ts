import type { Attributes } from "../../game/character/types";

export type DamageType =
    | "blunt"
    | "piercing"
    | "slashing"
    | "magic"
    | "true";

export type SkillType =
    | "attack"
    | "healing"
    | "effect"
    | "stat"
    | "composite";

export interface SkillDefinition {
    id: string;
    name: string;
    description: string;
    staminaCost: number;
    cooldown: number;
}

export interface AttackSkill extends SkillDefinition {
    type: "attack";
    baseDamage: number;
    damageType: DamageType;

    scaling: {
        attribute: keyof Attributes;
        coefficient: number;
    };
}

export interface HealingSkill extends SkillDefinition {
    type: "healing";
    baseHealing: number;

    scaling: {
        attribute: keyof Attributes;
        coefficient: number;
    };
}

export type Target = "self" | "target";

export interface EffectSkill extends SkillDefinition {
    type: "effect";
    effectId: string;
    target: Target;
    effectStacks: number;
}

export type StatTarget = Target;

export interface StatReference {
    target: StatTarget;
    stat: string; // ideally keyof Stats
}

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

export interface StatSkill extends SkillDefinition {
    type: "stat";
    staminaCost: number;
    cooldown: number;
    transfers: StatStep[]; // applied in order
}

export interface CompositeSkill extends SkillDefinition {
    type: "composite";
    allowedSkillTypes: SkillType[];
    scaling?: {
        attribute: keyof Attributes;
        coefficient: number;
    };
    effectIds?: string[];
}

export type AnySkill =
    | AttackSkill
    | HealingSkill
    | EffectSkill
    | StatSkill
    | CompositeSkill;

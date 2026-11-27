import type {
    Attributes,
    Character,
    EncounterState,
    SecondaryStats
} from "../../game/character/types";
import type { DerivedStats } from "../../game/character/derivedStats";

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
}

export interface AttributeScaling {
    attribute: keyof Attributes;
    coefficient: number;
}

export interface CombatStats {
    damageMultiplier: number;
}

export type SkillStatReference =
    | { target: Target; scope: "attribute"; stat: keyof Attributes }
    | { target: Target; scope: "secondary"; stat: keyof SecondaryStats }
    | { target: Target; scope: "derived"; stat: keyof DerivedStats }
    | { target: Target; scope: "character"; stat: keyof Pick<Character, "currentHealth"> }
    | { target: Target; scope: "encounter"; stat: keyof EncounterState }
    | { target: Target; scope: "combat"; stat: keyof CombatStats };

export type SkillScaling =
    | { operation: "add"; stat: SkillStatReference; amount: number }
    | { operation: "multiply"; stat: SkillStatReference; factor: number };

export interface AttackSkill extends SkillDefinition {
    type: "attack";
    baseDamage: number;
    damageType: DamageType;
    scaling: AttributeScaling;
}

export interface HealingSkill extends SkillDefinition {
    type: "healing";
    baseHealing: number;
    scaling: AttributeScaling;
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
    transfers: StatStep[]; // applied in order
}

export interface CompositeSkill extends SkillDefinition {
    type: "composite";
    allowedSkillTypes: SkillType[];
    scaling?: SkillScaling[];
    effectIds?: string[];
}

export type AnySkill =
    | AttackSkill
    | HealingSkill
    | EffectSkill
    | StatSkill
    | CompositeSkill;

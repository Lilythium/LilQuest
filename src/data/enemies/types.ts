import type {
    Attributes,
    SecondaryStats
} from "../../game/character/types";

/**
 * Elite is a tier but not a definition type: an elite enemy is a basic
 * EnemyDefinition combined with an EliteModifierDefinition at generation time.
 */
export type EnemyTier = "basic" | "elite" | "mini-boss" | "boss";

export type EnemyDefinitionTier = Exclude<EnemyTier, "elite">;

export interface EnemyRewards {
    experience: number;
    gold: number;
}

interface EnemyDefinitionBase {
    id: string;

    /**
     * Species or unique name shown to the player (e.g. "Rat", "Bandit",
     * "Forest Guardian"). Always present. For generated names this is the
     * type label shown alongside the personal name.
     */
    name: string;
    description: string;
    tier: EnemyDefinitionTier;

    /** Attributes at level 1, before level points are distributed. */
    baseAttributes: Attributes;

    /** Relative weights used to randomly distribute level points. */
    attributeGrowth: Attributes;

    /** Flat armour before any other combat modifiers. */
    armour?: number;

    secondaryStats?: Partial<SecondaryStats>;

    /** At least one. */
    skillIds: string[];
    traitIds?: string[];

    /** Base values before level and tier scaling. */
    rewards: EnemyRewards;

    /** Falls back to the stage or world equipment pool when omitted. */
    dropPoolId?: string;
}

export type EnemyDefinition = EnemyDefinitionBase & (
    | { naming: "fixed"; raceId?: string }
    | { naming: "generated"; raceId: string }
);

export interface EliteModifierDefinition {
    id: string;

    /** Single word used in the name: "Relentless Rat" / "Bob the Relentless". */
    title: string;

    /** Per-attribute multipliers; 1 leaves that attribute unchanged. */
    attributeMultiplier: Attributes;
    addedSkillIds?: string[];
    addedTraitIds?: string[];

    /** Multiplies experience and gold rewards on top of the elite tier multiplier. */
    rewardMultiplier: {
        experience: number;
        gold: number;
    };

    /** Added to the elite tier's equipment rarity bonus. */
    rarityBonus: number;
}
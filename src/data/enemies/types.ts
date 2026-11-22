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

export interface EnemyDefinition {
    id: string;

    /**
     * Species or unique name shown to the player (e.g. "Rat", "Bandit",
     * "Forest Guardian"). Always present. For generated names this is the
     * type label shown alongside the personal name.
     */
    name: string;
    description: string;
    tier: EnemyDefinitionTier;

    /**
     * "fixed": the enemy is displayed as `name`.
     * "generated": a personal name is generated from the race's naming
     * rules, so `raceId` is required.
     */
    naming: "fixed" | "generated";

    /** Supplies naming rules, required if naming is generated. */
    raceId?: string;

    /** Attributes at level 1, before level points are distributed. */
    baseAttributes: Attributes;

    /** Relative weights used to randomly distribute level points. */
    attributeGrowth: Attributes;

    secondaryStats?: Partial<SecondaryStats>;

    /** At least one. */
    skillIds: string[];
    traitIds?: string[];

    /** Base values before level and tier scaling. */
    rewards: EnemyRewards;

    /** Falls back to the stage or world equipment pool when omitted. */
    dropPoolId?: string;
}

export interface EliteModifierDefinition {
    id: string;

    /** Single word used in the name: "Relentless Rat" / "Bob the Relentless". */
    title: string;
    attributeMultiplier: Attributes;
    addedSkillIds?: string[];
    addedTraitIds?: string[];

    /** Multiplies on top of the elite tier's reward multiplier. */
    rewardMultiplier: {
        experience: number;
        gold: number;
        rarityBonus: number;
    };
}
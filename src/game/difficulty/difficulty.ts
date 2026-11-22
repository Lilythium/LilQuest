import { ENEMY_TIER_CONFIG } from "../../data/enemies/tiers";
import type { EnemyTier } from "../../data/enemies/types";
import type { StageDefinition } from "../../data/worlds/stages/types";
import type { WorldDefinition } from "../../data/worlds/types";
import type { RandomGenerator } from "../random/rng";

/** How far the centre of the level range moves per point of difficulty. */
export const LEVEL_PER_DIFFICULTY = 0.9;

/** The level range widens with difficulty, approaching this half-width. */
export const LEVEL_SPREAD_MAX = 2.6;

/** Difficulty at which the spread reaches half of LEVEL_SPREAD_MAX. */
export const LEVEL_SPREAD_HALF_POINT = 0.5;

export interface LevelRange {
    min: number;
    max: number;
}

/**
 * World base + stage offset + run modifier (decisions, items, interactions).
 * Never negative.
 */
export function getEffectiveDifficulty(
    world: WorldDefinition,
    stage: StageDefinition,
    runModifier = 0
): number {
    return Math.max(
        0,
        world.baseDifficulty +
            stage.difficulty.difficultyOffset +
            runModifier
    );
}

/**
 * Range of levels an enemy of this tier can have at a given difficulty.
 * Difficulty 0 gives level 1 only; roughly 1 gives 1-4 and 10 gives 8-12.
 * The tier's level offset applies after the range is calculated.
 */
export function enemyLevelRange(
    difficulty: number,
    tier: EnemyTier
): LevelRange {
    const d = Math.max(0, difficulty);
    const config = ENEMY_TIER_CONFIG[tier];

    const center = 1 + LEVEL_PER_DIFFICULTY * d;
    const spread =
        LEVEL_SPREAD_MAX * (d / (d + LEVEL_SPREAD_HALF_POINT)) *
        config.levelSpreadMultiplier;

    const min = Math.max(1, Math.round(center - spread));
    const max = Math.max(min, Math.round(center + spread));

    return {
        min: min + config.levelOffset,
        max: max + config.levelOffset
    };
}

export function rollEnemyLevel(
    difficulty: number,
    tier: EnemyTier,
    rng: RandomGenerator
): number {
    const { min, max } = enemyLevelRange(difficulty, tier);

    return rng.int(min, max);
}
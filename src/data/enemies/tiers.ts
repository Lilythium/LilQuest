import type { EnemyTier } from "./types";
import type {EquipmentRarity } from "../equipment/types";

export interface EnemyTierConfig {
    /** Added to the enemy level derived from difficulty. */
    levelOffset: number;

    /** Scales the width of the level range. 0 gives a single fixed level. */
    levelSpreadMultiplier: number;

    /** Multiplies base experience and gold rewards. */
    rewardMultiplier: number;

    /** Added to the equipment rarity roll for drops. Tune later. */
    rarityBonus: number;

    minRarity: EquipmentRarity;
    maxRarity: EquipmentRarity;
}

export const ENEMY_TIER_CONFIG: Record<EnemyTier, EnemyTierConfig> = {
    basic:       { levelSpreadMultiplier: 1,   levelOffset: 0, rewardMultiplier: 1,   rarityBonus: 0,    minRarity: "common",   maxRarity: "legendary" },
    elite:       { levelSpreadMultiplier: 1,   levelOffset: 1, rewardMultiplier: 1.5, rarityBonus: 0.1,  minRarity: "common",   maxRarity: "legendary" },
    "mini-boss": { levelSpreadMultiplier: 0.5, levelOffset: 1, rewardMultiplier: 2.5, rarityBonus: 0.25, minRarity: "uncommon", maxRarity: "unique" },
    boss:        { levelSpreadMultiplier: 0.5, levelOffset: 2, rewardMultiplier: 4,   rarityBonus: 0.5,  minRarity: "rare",     maxRarity: "unique" }
};
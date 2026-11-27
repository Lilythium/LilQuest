import type { EliteModifierDefinition, EnemyRewards, EnemyTier } from "../../data/enemies/types";
import { ENEMY_TIER_CONFIG } from "../../data/enemies/tiers";

export const REWARD_LEVEL_SCALING = 0.1;

export function calculateRewards(
    baseRewards: EnemyRewards,
    tier: EnemyTier,
    level: number,
    elite?: EliteModifierDefinition
): EnemyRewards {
    const levelMultiplier = 1 + REWARD_LEVEL_SCALING * (level - 1);
    const tierMultiplier = ENEMY_TIER_CONFIG[tier].rewardMultiplier;

    return {
        experience: Math.round(
            baseRewards.experience *
            tierMultiplier *
            levelMultiplier *
            (elite?.rewardMultiplier.experience ?? 1)
        ),
        gold: Math.round(
            baseRewards.gold *
            tierMultiplier *
            levelMultiplier *
            (elite?.rewardMultiplier.gold ?? 1)
        )
    };
}

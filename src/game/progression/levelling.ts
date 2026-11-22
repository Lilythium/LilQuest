export const ATTRIBUTE_POINTS_PER_LEVEL = 1;
export const BONUS_ATTRIBUTE_POINTS = 3;
export const BONUS_ATTRIBUTE_LEVEL_INTERVAL = 5;

/**
 * Total attribute points gained by reaching `level` (level 1 gains none).
 * Shared by the player and enemy generation so equal levels have an equal
 * point budget.
 */
export function attributePointsAtLevel(level: number): number {
    if (!Number.isInteger(level) || level < 1) {
        throw new Error(`Invalid level: ${level}.`);
    }

    return (
        (level - 1) * ATTRIBUTE_POINTS_PER_LEVEL +
        Math.floor(level / BONUS_ATTRIBUTE_LEVEL_INTERVAL) *
            BONUS_ATTRIBUTE_POINTS
    );
}
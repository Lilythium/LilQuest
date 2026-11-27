import type { Attributes, Character } from "../character/types";

export const ATTRIBUTE_POINTS_PER_LEVEL = 1;
export const BONUS_ATTRIBUTE_POINTS = 3;
export const BONUS_ATTRIBUTE_LEVEL_INTERVAL = 5;
export const XP_PER_LEVEL = 10;
export const XP_SCALING_START_LEVEL = 10;
export const XP_SCALING_PER_LEVEL = 0.05;

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

export function xpToNextLevel(level: number): number {
    if (!Number.isInteger(level) || level < 1) {
        throw new Error(`Invalid level: ${level}.`);
    }

    return Math.floor(
        XP_PER_LEVEL *
        level *
        (
            1 +
            XP_SCALING_PER_LEVEL *
            Math.max(0, level - XP_SCALING_START_LEVEL)
        )
    );
}

export function pointsGainedAtLevel(level: number): number {
    if (!Number.isInteger(level) || level < 2) {
        throw new Error(`Invalid level: ${level}.`);
    }

    return attributePointsAtLevel(level) - attributePointsAtLevel(level - 1);
}

export function applyExperience(
    character: Character,
    amount: number
): Character {
    if (!Number.isFinite(amount) || amount < 0) {
        throw new Error(`Invalid experience amount: ${amount}.`);
    }

    let level = character.level;
    let experience = character.experience + amount;
    let unspentAttributePoints = character.unspentAttributePoints;

    while (true) {
        const levelCost = xpToNextLevel(level);
        if (experience < levelCost) {
            break;
        }

        experience -= levelCost;
        level++;
        unspentAttributePoints += pointsGainedAtLevel(level);
    }

    return {
        ...character,
        level,
        experience,
        unspentAttributePoints
    };
}

export function allocateAttributePoint(
    character: Character,
    attribute: keyof Attributes
): Character {
    if (character.unspentAttributePoints <= 0) {
        throw new Error("Cannot allocate an attribute point when none are unspent.");
    }

    return {
        ...character,
        attributes: {
            ...character.attributes,
            [attribute]: character.attributes[attribute] + 1
        },
        unspentAttributePoints: character.unspentAttributePoints - 1
    };
}
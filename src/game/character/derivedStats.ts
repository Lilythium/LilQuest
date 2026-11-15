import type { Attributes, SecondaryStats } from "./types";
import {
    calculateEncumbrance,
    ENCUMBRANCE_CONFIG
} from "./encumbrance";

export interface DerivedStats {
    maxHealth: number;
    maxStamina: number;
    staminaRegen: number;
    healthRegen: number;

    carryingCapacity: number;
    initiative: number;
}

export const DERIVED_STAT_FORMULAS = {
    maxHealth: (attributes: Attributes) =>
        20 + attributes.constitution * 5,

    maxStamina: (attributes: Attributes) =>
        10 + attributes.constitution * 2
            + attributes.dexterity * 2,

    staminaRegen: (attributes: Attributes) =>
        1 + attributes.dexterity * 0.2,

    carryingCapacity: (attributes: Attributes) =>
        5 + attributes.strength * 1.5,

    initiative: (attributes: Attributes) =>
        attributes.dexterity
};

export function calculateDerivedStats(
    attributes: Attributes,
    secondaryStats: SecondaryStats,
    equippedWeight: number
): DerivedStats {
    const carryingCapacity =
        DERIVED_STAT_FORMULAS.carryingCapacity(attributes);

    const encumbrance = calculateEncumbrance(
        equippedWeight,
        carryingCapacity
    );

    const encumbranceConfig =
        ENCUMBRANCE_CONFIG[encumbrance.tier];

    return {
        maxHealth: DERIVED_STAT_FORMULAS.maxHealth(attributes),

        maxStamina:
            DERIVED_STAT_FORMULAS.maxStamina(attributes)
            * encumbranceConfig.maxStaminaMultiplier,

        staminaRegen:
            DERIVED_STAT_FORMULAS.staminaRegen(attributes)
            * encumbranceConfig.staminaRegenMultiplier,

        healthRegen: secondaryStats.healthRegen,

        carryingCapacity,

        initiative:
            DERIVED_STAT_FORMULAS.initiative(attributes)
            - encumbranceConfig.initiativePenalty
    };
}
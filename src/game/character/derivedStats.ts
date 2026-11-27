import type { Attributes, SecondaryStats } from "./types";
import {
    calculateEncumbrance,
    ENCUMBRANCE_CONFIG,
    type EncumbranceTier
} from "./encumbrance";
import { DEXTERITY_SPEED_BONUS } from "../combat/constants";

export interface DerivedStats {
    maxHealth: number;
    maxStamina: number;
    staminaRegen: number;
    healthRegen: number;

    carryingCapacity: number;
    speed: number; // initiative gain multiplier (1 = base pace)

    armour: number;
    magicResistance: number;
}

export const DERIVED_STAT_FORMULAS = {
    maxHealth: (attributes: Attributes) =>
        20 + attributes.constitution * 5,

    maxStamina: (attributes: Attributes) =>
        10 + attributes.constitution * 4
            + attributes.dexterity,

    staminaRegen: (attributes: Attributes) =>
        1 + attributes.dexterity * 0.2,

    carryingCapacity: (attributes: Attributes) =>
        5 + attributes.strength * 1.5,

    speed: (attributes: Attributes, encumbrance: EncumbranceTier) =>
        (1 + attributes.dexterity * DEXTERITY_SPEED_BONUS)
            * ENCUMBRANCE_CONFIG[encumbrance].speedMultiplier,

    armour: (equipmentArmour: number) =>
        equipmentArmour,

    magicResistance: (attributes: Attributes, bonus = 0) =>
        attributes.wisdom * 1.5 + bonus
};

export function calculateDerivedStats(
    attributes: Attributes,
    secondaryStats: SecondaryStats,
    equippedWeight: number,
    equipmentArmour: number
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

        speed: DERIVED_STAT_FORMULAS.speed(
            attributes,
            encumbrance.tier
        ),

        armour: DERIVED_STAT_FORMULAS.armour(equipmentArmour),

        magicResistance:
            DERIVED_STAT_FORMULAS.magicResistance(
                attributes,
                secondaryStats.magicResistance ?? 0
            )
    };
}
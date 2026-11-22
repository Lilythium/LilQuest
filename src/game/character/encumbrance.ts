export type EncumbranceTier =
    | "unencumbered"
    | "light"
    | "moderate"
    | "heavy";

export interface EncumbranceConfig {
    maxLoadRatio: number;
    maxStaminaMultiplier: number;
    staminaRegenMultiplier: number;
    speedMultiplier: number;
    initiativePenalty: number;
}

export const ENCUMBRANCE_CONFIG: Record<
    EncumbranceTier,
    EncumbranceConfig
> = {
    unencumbered: {
        maxLoadRatio: 0.7,
        maxStaminaMultiplier: 1,
        staminaRegenMultiplier: 1,
        speedMultiplier: 1,
        initiativePenalty: 0
    },
    light: {
        maxLoadRatio: 1,
        maxStaminaMultiplier: 0.98,
        staminaRegenMultiplier: 0.95,
        speedMultiplier: 0.95,
        initiativePenalty: 1
    },
    moderate: {
        maxLoadRatio: 1.3,
        maxStaminaMultiplier: 0.85,
        staminaRegenMultiplier: 0.75,
        speedMultiplier: 0.75,
        initiativePenalty: 3
    },
    heavy: {
        maxLoadRatio: Infinity,
        maxStaminaMultiplier: 0.65,
        staminaRegenMultiplier: 0.5,
        speedMultiplier: 0.5,
        initiativePenalty: 6
    }
};

export interface EncumbranceResult {
    equippedWeight: number;
    loadRatio: number;
    tier: EncumbranceTier;
}

export function calculateEncumbrance(
    equippedWeight: number,
    carryingCapacity: number
): EncumbranceResult {
    if (equippedWeight < 0 || carryingCapacity <= 0) {
        throw new Error("Invalid encumbrance values.");
    }

    const loadRatio = equippedWeight / carryingCapacity;

    const tiers: EncumbranceTier[] = [
        "unencumbered",
        "light",
        "moderate",
        "heavy"
    ];

    const tier = tiers.find(
        tier => loadRatio < ENCUMBRANCE_CONFIG[tier].maxLoadRatio
    ) ?? "heavy";

    return {
        equippedWeight,
        loadRatio,
        tier
    };
}
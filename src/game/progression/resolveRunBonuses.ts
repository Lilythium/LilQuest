// This file is mostly a placeholder for now until prestige progress is implemented
import type { PermanentProgress } from "./types";

export interface RunBonuses {
    startingGold: number;
    bonusMaxHealth: number;
}

export function resolveRunBonuses(
    progress: PermanentProgress
): RunBonuses {
    return {
        startingGold: 0, // Calculate from upgrade levels.
        bonusMaxHealth: 0 // Calculate from upgrade levels.
    };
}
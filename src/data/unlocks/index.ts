import type { UnlockDefinition } from "./types";

export const UNLOCKS: Record<string, UnlockDefinition> = {};

export function getUnlock(unlockId: string): UnlockDefinition {
    const unlock = UNLOCKS[unlockId];

    if (!unlock) {
        throw new Error(`Unlock "${unlockId}" does not exist.`);
    }

    return unlock;
}
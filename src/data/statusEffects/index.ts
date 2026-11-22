import type { StatusEffectDefinition } from "./types";

export const STATUS_EFFECTS: Record<string, StatusEffectDefinition> = {};

export function getStatusEffect(statusEffectId: string): StatusEffectDefinition {
    const statusEffect = STATUS_EFFECTS[statusEffectId];

    if (!statusEffect) {
        throw new Error(`Status effect "${statusEffectId}" does not exist.`);
    }

    return statusEffect;
}
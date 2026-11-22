import type { StatusEffectDefinition } from "./types";
import * as effects from "./effects";

export const STATUS_EFFECTS: Record<string, StatusEffectDefinition> = {
    [effects.Bulwark.id]: effects.Bulwark,
    [effects.Sidestep.id]: effects.Sidestep,
    [effects.Slowed.id]: effects.Slowed
};

export function getStatusEffect(statusEffectId: string): StatusEffectDefinition {
    const statusEffect = STATUS_EFFECTS[statusEffectId];

    if (!statusEffect) {
        throw new Error(`Status effect "${statusEffectId}" does not exist.`);
    }

    return statusEffect;
}
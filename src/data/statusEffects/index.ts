import type { StatusEffectDefinition } from "./types";
import * as effects from "./effects";

export const STATUS_EFFECTS: Record<string, StatusEffectDefinition> = {
    [effects.bulwark.id]: effects.bulwark,
    [effects.sideStep.id]: effects.sideStep,
    [effects.slowed.id]: effects.slowed
};

export function getStatusEffect(statusEffectId: string): StatusEffectDefinition {
    const statusEffect = STATUS_EFFECTS[statusEffectId];

    if (!statusEffect) {
        throw new Error(`Status effect "${statusEffectId}" does not exist.`);
    }

    return statusEffect;
}
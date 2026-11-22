import type {StatusEffectDefinition} from "./types";

export const Bulwark: StatusEffectDefinition = {
    id: "bulwark",
    name: "Bulwark",
    description: "Reduce incoming damage by 10%.",
    stackingPolicy: "ignore",
};

export const Sidestep: StatusEffectDefinition = {
    id: "sidestep",
    name: "Sidestep",
    description: "Dodge the next attack. If you attack first, receive a crit chance bonus",
    stackingPolicy: "replace",
};

export const Slowed: StatusEffectDefinition = {
    id: "slowed",
    name: "Slowed",
    description: "Accumulate initiative at 75% of normal speed.",
    stackingPolicy: "multiply",
};
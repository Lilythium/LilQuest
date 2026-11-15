import type { Trait } from "../../game/traits/types";

export const humanAdaptability: Trait = {
    id: "human-adaptability",
    name: "Adaptability",
    description: "Gain 10% more experience.",
    effects: [
        {
            type: "modifier",
            trigger: "on-win",
            target: "self",
            effect: "experience-gain",
            operation: "multiply",
            value: 1.1
        }
    ]
};
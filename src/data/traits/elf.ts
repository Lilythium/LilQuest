import type { Trait } from "../../game/traits/types";

export const elfKeenReflexes: Trait = {
    id: "elf-keen-reflexes",
    name: "Keen Reflexes",
    description: "Gain a 5% chance to counter attack on receiving damage.",
    effects: [
        {
            type: "action",
            trigger: "on-hit",
            action: "basic-attack",
            chance: 0.05
        }
    ]
};
import type { Trait } from "../../game/traits/types";

export const elfKeenSenses: Trait = {
    id: "elf-keen-senses",
    name: "Keen Senses",
    description: "Gain a 5% chance to counter attack on recieving damage.",
    effects: [
        {
            type: "action",
            trigger: "on-hit",
            action: "basic-attack",
            chance: 0.05
        }
    ]
};
import type { Trait } from "../../game/traits/types";

export const orcUnyielding: Trait = {
    id: "orc-unyielding",
    name: "Unyielding",
    description: "Immune to flinching from incoming attacks.",
    effects: [
        {
            type: "property",
            property: "flinch-immunity",
            value: true
        }
    ]
};
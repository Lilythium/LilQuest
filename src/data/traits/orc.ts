import type { TraitDefinition } from "./types";

export const OrcUnyielding: TraitDefinition = {
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
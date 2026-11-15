import type { RaceNameRules } from "../../game/character/naming/types";
import type { RaceDefinition } from "./types";

export const orcRace: RaceDefinition = {
    id: "orc",
    name: "Orc",
    description: "Orcs are a strong and resilient race, known for their combat prowess and tribal culture.",
    attributeMultipliers: {
        strength: 1.4,
        dexterity: 1.0,
        constitution: 1.2,
        intelligence: 0.8,
        wisdom: 0.9,
        charisma: 0.8
    },
    startingTraitId: "orc-unyielding",
    startingWeaponId: "oak-cudgel"
};

export const orcNames = {
    genderExempt: true,
    firstName: {
        method: "generated",
        syllables: {
            shared: {
                beginning: {
                    required: true,
                    syllables: ["Gr", "Kr", "Dr", "Th", "Ur", "G", "Br", "Z", "M", "R"]
                },
                middle: {
                    required: true,
                    syllables: ["a", "o", "u", "ak", "og", "ur"]
                },
                ending: {
                    required: true,
                    syllables: ["g", "k", "th", "zug", "gar", "rak", "mok", "sh"]
                }
            }
        }
    }
} as const satisfies RaceNameRules;
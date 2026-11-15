import type { RaceNameRules } from "../../game/character/naming/types";

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
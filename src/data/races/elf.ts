import type { RaceNameRules } from "../../game/character/naming/types";

export const elfNames = {
    genderExempt: false,
    firstName: {
        method: "generated",
        syllables: {
            masculine: {
                beginning: {
                    required: true,
                    syllables: ["Ae", "Cael", "Elar", "Fae", "Ith", "Lae"]
                },
                middle: {
                    required: true,
                    syllables: ["a", "ir", "ion", "ith", "or", "ien"]
                },
                ending: {
                    required: true,
                    syllables: ["ion", "ar", "as", "or", "iel"]
                }
            },
            feminine: {
                beginning: {
                    required: true,
                    syllables: ["Ael", "Ela", "Fae", "Lira", "Nae", "Syla"]
                },
                middle: {
                    required: true,
                    syllables: ["a", "wen", "ith", "iel", "ara", "ia"]
                },
                ending: {
                    required: true,
                    syllables: ["wen", "iel", "ia", "eth", "ara"]
                }
            },
            neutral: {
                beginning: {
                    required: true,
                    syllables: ["Ael", "Cael", "Eli", "Ith", "Lora", "Sae"]
                },
                middle: {
                    required: true,
                    syllables: ["a", "is", "ien", "ith", "or"]
                },
                ending: {
                    required: true,
                    syllables: ["is", "en", "iel", "or", "in"]
                }
            }
        },
    }
} as const satisfies RaceNameRules;
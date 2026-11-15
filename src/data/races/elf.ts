export const elfNames = {
    gendered: true,

    syllables: {
        masculine: {
            beginning: ["Ae", "Cael", "Elar", "Fae", "Ith", "Lae"],
            middle: ["a", "ir", "ion", "ith", "or", "ien"],
            ending: ["ion", "ar", "as", "or", "iel"]
        },

        feminine: {
            beginning: ["Ael", "Ela", "Fae", "Lira", "Nae", "Syla"],
            middle: ["a", "wen", "ith", "iel", "ara", "ia"],
            ending: ["wen", "iel", "ia", "eth", "ara"]
        },

        neutral: {
            beginning: ["Ael", "Cael", "Eli", "Ith", "Lora", "Sae"],
            middle: ["a", "is", "ien", "ith", "or"],
            ending: ["is", "en", "iel", "or", "in"]
        }
    }
} as const;
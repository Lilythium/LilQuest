import type { RaceNameRules } from "../../game/character/naming/types";

export const humanNames = {
    genderExempt: false,
    firstName: {
        method: "fixed",
        pools: {
            masculine: [
                "James", "William", "Oliver", "Henry", "George",
                "Thomas", "Jack", "Daniel", "Edward", "Arthur"
            ],
            feminine: [
                "Charlotte", "Amelia", "Olivia", "Emily", "Sophia",
                "Grace", "Alice", "Eleanor", "Lucy", "Victoria"
            ],
            neutral: [
                "Alex", "Sam", "Charlie", "Jamie", "Morgan",
                "Taylor", "Jordan", "Robin", "Casey", "Riley", "Anomaly"
            ]
        }
    },
    surname: {
        method: "fixed",
        pools: {
            shared: [
                "Smith",
                "Johnson",
                "Brown",
                "Taylor",
                "Wilson",
                "Anderson",
                "Thomas",
                "Jackson",
                "White",
                "Harris"
            ]
        }
    }
} as const satisfies RaceNameRules;
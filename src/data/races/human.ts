import type { RaceNameRules } from "../../game/character/naming/types";
import { humanAdaptability } from "../traits/human";
import type { RaceDefinition } from "./types";

export const humanRace: RaceDefinition = {
    id: "human",
    name: "Human",
    description: "",
    startingTraitId: humanAdaptability.id,
    attributeMultipliers: {
        strength: 1,
        dexterity: 1,
        constitution: 1,
        intelligence: 1,
        wisdom: 1,
        charisma: 1
    }
};

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

export { humanAdaptability };

import type {ClassDefinition} from "./types";

export const brute: ClassDefinition = {
    id: "brute",
    name: "Brute",
    description: "A formidable and relentless combatant, known for their raw strength and durability.",
    classSkillId: "Reckless Abandon", //skill intended to force user to select an attack skill
                                      //selected skill will do 2x damage but will slow the user somehow
    allowedRaceIds: ["human", "orc"],
};
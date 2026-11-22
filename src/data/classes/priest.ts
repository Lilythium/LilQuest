import type { ClassDefinition } from "./types";

export const Priest: ClassDefinition = {
    id: "priest",
    name: "Priest",
    description: "A holy servant of the divine, blessed with the power to heal and protect.",
    classSkillId: "mend",
    allowedRaceIds: ["human", "elf"],
};
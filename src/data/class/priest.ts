import type { ClassDefinition } from "./types";

export const priest: ClassDefinition = {
    id: "priest",
    name: "Priest",
    description: "A holy servant of the divine, blessed with the power to heal and protect.",
    classSkillId: "heal", // TODO: implement skill
    allowedRaceIds: ["human", "elf"],
};
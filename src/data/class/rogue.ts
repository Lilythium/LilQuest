import type { ClassDefinition } from "./types";

export const rogue: ClassDefinition = {
    id: "rogue",
    name: "Rogue",
    description: "A swift and sneaky operative, skilled in stealth and precision strikes.",
    classSkillId: "stealth", // give status effect, lasts till players next turn
                            // if hit before then, consume effect and dodge attack
                            // if not, next hit gets a crit chance bonus
    allowedRaceIds: ["human", "elf"],
};
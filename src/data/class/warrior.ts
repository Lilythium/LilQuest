import type { ClassDefinition } from "./types";

export const warrior: ClassDefinition = {
    id: "warrior",
    name: "Warrior",
    description: "A strong and resilient fighter, excelling in melee combat.",
    classSkillId: "bulwark" // TODO: implement skill, will apply a status effect of the same name
                            //       which will reduce incoming damage for a short duration.
}
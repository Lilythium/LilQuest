import type { ClassDefinition } from "./types";

export const druid: ClassDefinition = {
    id: "druid",
    name: "Druid",
    description: "A mystical guardian of nature, capable of harnessing the forces of the wild.",
    classSkillId: "sap", //short cost/cooldown skill which takes half of targets initiative and
                        // gives it to the user.
    allowedRaceIds: ["elf", "orc"],
};
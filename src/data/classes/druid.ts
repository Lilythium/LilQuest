import type { ClassDefinition } from "./types";

export const Druid: ClassDefinition = {
    id: "druid",
    name: "Druid",
    description: "A mystical guardian of nature, capable of harnessing the forces of the wild.",
    classSkillId: "sap", // Takes half of the target's initiative and gives it to the user.
    allowedRaceIds: ["elf", "orc"],
};
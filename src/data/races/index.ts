import { ElfRace, ElfNames } from "./elf";
import { HumanRace, HumanNames } from "./human";
import { OrcRace, OrcNames } from "./orc";

import type { RaceContent } from "./types";

export const RACES: Record<string, RaceContent> = {
    elf: {
        definition: ElfRace,
        namingRules: ElfNames
    },
    human: {
        definition: HumanRace,
        namingRules: HumanNames
    },
    orc: {
        definition: OrcRace,
        namingRules: OrcNames
    }
};

export function getRace(raceId: string): RaceContent {
    const race = RACES[raceId];

    if (!race) {
        throw new Error(`Unknown race: ${raceId}`);
    }

    return race;
}
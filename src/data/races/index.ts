import { elfRace, elfNames } from "./elf";
import { humanRace, humanNames } from "./human";
import { orcRace, orcNames } from "./orc";

import type { RaceContent } from "./types";

export const RACES: Record<string, RaceContent> = {
    elf: {
        definition: elfRace,
        namingRules: elfNames
    },
    human: {
        definition: humanRace,
        namingRules: humanNames
    },
    orc: {
        definition: orcRace,
        namingRules: orcNames
    }
};

export function getRace(raceId: string): RaceContent {
    const race = RACES[raceId];

    if (!race) {
        throw new Error(`Unknown race: ${raceId}`);
    }

    return race;
}
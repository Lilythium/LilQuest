import { RACES } from "../../data/races";
import type { PermanentProgress } from "./types";

export function getAvailableRaces(
    progress: PermanentProgress
) {
    return Object.values(RACES).filter(race =>
        progress.unlockedRaceIds.includes(race.definition.id)
    );
}
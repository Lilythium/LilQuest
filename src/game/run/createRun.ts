import { createCharacter } from "../character/createCharacter";
import type { CharacterGender } from "../character/naming/types";
import {
    captureRandomStates,
    createRunRandom
} from "../random/runRandom";
import { createRunSeed } from "../random/seed";
import { getRace } from "../../data/races";
import type { CurrentRun } from "./types";

export function createRun(
    raceId: string,
    genderId: CharacterGender
): CurrentRun {
    const runSeed = createRunSeed();
    const runId = crypto.randomUUID();

    const random = createRunRandom(runSeed);
    const race = getRace(raceId);

    const character = createCharacter(
        race,
        genderId,
        random.character
    );

    return {
        runId,
        runSeed,
        randomStates: captureRandomStates(random),
        character,
        worldProgress: []
    };
}
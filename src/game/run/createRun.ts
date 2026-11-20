import { createCharacter } from "../character/createCharacter";
import type { CharacterGender } from "../character/naming/types";
import {
    captureRandomStates,
    createRunRandom
} from "../random/runRandom";
import { createRunSeed } from "../random/seed";
import { getRace } from "../../data/races";
import type {
    CharacterPreview,
    CurrentRun
} from "./types";

export function generateCharacterPreview(
    raceId: string,
    genderId: CharacterGender
): CharacterPreview {
    const runSeed = createRunSeed();
    const random = createRunRandom(runSeed);
    const race = getRace(raceId);

    const character = createCharacter(
        race,
        genderId,
        random.character
    );

    return {
        runSeed,
        randomStates: captureRandomStates(random),
        character
    };
}

export function createRun(
    preview: CharacterPreview
): CurrentRun {
    return {
        runId: crypto.randomUUID(),
        runSeed: preview.runSeed,
        randomStates: preview.randomStates,
        character: preview.character,
        worldProgress: []
    };
}
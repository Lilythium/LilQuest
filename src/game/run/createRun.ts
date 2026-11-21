import { createCharacter } from "../character/createCharacter";
import {
    captureRandomStates,
    createRunRandom
} from "../random/runRandom";
import { createRunSeed } from "../random/seed";
import { getRace } from "../../data/races";
import { isCharacterGender } from "../character/naming/types";
import type { PermanentProgress } from "../progression/types";
import { resolveRunBonuses } from "../progression/resolveRunBonuses";
import type {
    CharacterPreview,
    CurrentRun
} from "./types";

export function generateCharacterPreview(
    raceId: string,
    genderId: unknown,
    permanentProgress: PermanentProgress
): CharacterPreview {
    if (!permanentProgress.unlockedRaceIds.includes(raceId)) {
        throw new Error(`Race "${raceId}" is not unlocked.`);
    }

    if (!isCharacterGender(genderId)) {
        throw new Error(`Invalid character gender: "${String(genderId)}".`);
    }

    const runSeed = createRunSeed();
    const random = createRunRandom(runSeed);
    const race = getRace(raceId);
    const runBonuses = resolveRunBonuses(permanentProgress);

    const character = createCharacter(
        race,
        genderId,
        random.character,
        runBonuses
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
        currentState: "active",
        character: preview.character,
        worldProgress: []
    };
}
import type { Character } from "../character/types";
import type { RandomStream } from "../random/seed";

export type RandomStates = Record<RandomStream, number>;

export type RunState = "active" | "inactive" | "complete";

export interface WorldProgress {
    worldId: string;
    currentStageId: string;
    completedStageIds: string[];
}

export interface CharacterPreview {
    runSeed: string;
    randomStates: RandomStates;
    character: Character;
}

export interface CurrentRun {
    runId: string;
    runSeed: string;
    randomStates: RandomStates;

    currentState: RunState;

    character: Character;
    worldProgress: WorldProgress[];
}
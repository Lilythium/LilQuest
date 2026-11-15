import type { Character } from "../character/types";
import type { RandomStream } from "../random/seed";

export type RandomStates = Record<RandomStream, number>;

export interface WorldProgress {
    worldId: string;
    currentStageId: string;
    completedStageIds: string[];
}

export interface CurrentRun {
    runId: string;
    runSeed: string;
    randomStates: Record<RandomStream, number>;
    character: Character;

    worldProgress: WorldProgress[];
}
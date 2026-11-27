import type { Character } from "../character/types";
import type { RandomStream } from "../random/seed";
import type { StageMap } from "../world/types";

export type RandomStates = Record<RandomStream, number>;

export type RunState = "active" | "inactive" | "complete";

export interface WorldProgress {
    worldId: string;
    currentStageId: string;
    completedStageIds: string[];
    maps: Record<string, StageMap>;
    currentNodeId: string | null;
    completedNodeIds: string[];
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
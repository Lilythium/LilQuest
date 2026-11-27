import type { StageDefinition } from "./types";
import { FirstWorldStages } from "./firstWorld/stages";

export const STAGES: Record<string, StageDefinition> = Object.fromEntries(
    FirstWorldStages.map(stage => [stage.id, stage])
);

export function getStage(stageId: string): StageDefinition {
    const stage = STAGES[stageId];

    if (!stage) {
        throw new Error(`Stage "${stageId}" does not exist.`);
    }

    return stage;
}
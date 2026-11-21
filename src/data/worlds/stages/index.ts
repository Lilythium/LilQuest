import type { StageDefinition } from "./types";

export const STAGES: Record<string, StageDefinition> = {};

export function getStage(stageId: string): StageDefinition {
    const stage = STAGES[stageId];

    if (!stage) {
        throw new Error(`Stage "${stageId}" does not exist.`);
    }

    return stage;
}
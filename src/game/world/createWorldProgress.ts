import type { WorldDefinition } from "../../data/worlds/types";
import { getStage } from "../../data/worlds/stages";
import type { RandomGenerator } from "../random/rng";
import type { WorldProgress } from "../run/types";
import { generateStageMap } from "./generateStageMap";
import type { StageMap } from "./types";

export function createWorldProgress(
    world: WorldDefinition,
    rng: RandomGenerator
): WorldProgress {
    const firstStage = world.stages[0];
    if (!firstStage) {
        throw new Error(`World "${world.id}" must contain at least one stage.`);
    }

    const maps: Record<string, StageMap> = {};
    for (const stageReference of world.stages) {
        const stage = getStage(stageReference.stageId);
        maps[stage.id] = generateStageMap(world, stage, rng);
    }

    return {
        worldId: world.id,
        currentStageId: firstStage.stageId,
        completedStageIds: [],
        maps,
        currentNodeId: null,
        completedNodeIds: []
    };
}

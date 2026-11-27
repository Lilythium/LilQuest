import type { EnemyTier } from "../../data/enemies/types";
import type { StageNodeType } from "../../data/worlds/stages/types";

export interface EncounterSpec {
    enemyId: string;
    tier: EnemyTier;
    eliteModifierId?: string;
    /** A roll in [0, 1); the level is computed when the encounter starts. */
    levelRoll: number;
}

export interface StageMapNode {
    id: string;
    type: StageNodeType;
    contentTag?: string;
    next: string[];
    /** Terminal nodes only. */
    exitId?: string;
    /** Encounter nodes only. */
    encounter?: EncounterSpec;
}

export interface StageMap {
    stageId: string;
    startNodeId: string;
    nodes: Record<string, StageMapNode>;
}

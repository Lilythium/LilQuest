
export type StageReference = {
    stageId: string;
    unlockId?: string;
    optional?: boolean;
};

export interface StageDifficulty {
    difficultyOffset: number;
}

export interface StageContentOverrides {
    basicEnemyPoolId?: string;
    eliteEnemyPoolId?: string;
    miniBossPoolId?: string;
    equipmentPoolId?: string;
}

export interface BaseStageDefinition {
    id: string;
    name: string;
    description: string;
    difficulty: StageDifficulty;
}

export type StageNodeType =
    | "encounter"
    | "interaction"
    | "storefront"
    | "rest"
    | "treasure";

export interface StageNodeRequirement {
    nodeType: StageNodeType;
    contentTag?: string;
}

export interface SequenceSection {
    type: "sequence";
    nodes: StageNodeRequirement[];
}

export interface StagePath {
    id: string;
    label: string;
    nodes: StageNodeRequirement[];
}

export interface BranchSection {
    type: "branch";
    paths: StagePath[];
}

export type StageSection =
    | SequenceSection
    | BranchSection;

export interface StageMapGenerationConfig {
    sections: StageSection[];
    maxOccurrencesPerPath?: Partial<Record<StageNodeType, number>>;
}

export interface MapStageDefinition extends BaseStageDefinition {
    type: "map";
    mapGeneration: StageMapGenerationConfig;
    contentOverrides?: StageContentOverrides;
}

export interface EncounterStageDefinition extends BaseStageDefinition {
    type: "encounter";
    encounterId: string;
}

export type StageDefinition =
    | MapStageDefinition
    | EncounterStageDefinition;

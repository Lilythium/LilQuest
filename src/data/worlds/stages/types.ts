export type StageReference = {
    stageId: string;
    unlockId?: string;
    optional?: boolean;
};

export interface StageDifficulty {
    difficultyOffset: number;
}

export interface StageMapGenerationConfig {
    minDepth: number;
    maxDepth: number;
    minNodes: number;
    maxNodes: number;
    maxBranches: number;
}

export interface StageContentOverrides {
    basicEnemyPoolId?: string;
    eliteEnemyPoolId?: string;
    miniBossPoolId?: string;
    equipmentPoolId?: string;
}

export interface StageDefinition {
    id: string;
    name: string;
    description: string;
    difficulty: StageDifficulty;
    mapGeneration: StageMapGenerationConfig;
    contentOverrides?: StageContentOverrides;
}
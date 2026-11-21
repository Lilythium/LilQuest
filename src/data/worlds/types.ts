import type { StageReference } from "./stages/types";

export interface WorldContentProfile {
    basicEnemyPoolId: string;
    eliteEnemyPoolId: string;
    miniBossPoolId: string;
    bossId: string;
    equipmentPoolId: string;
}

export interface WorldDefinition {
    id: string;
    name: string;
    description: string;
    stages: StageReference[];
    content: WorldContentProfile;
    baseDifficulty: number;
}
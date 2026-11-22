import type { StageReference } from "./stages/types";

export interface WorldContentProfile {
    basicEnemyPoolId: string;
    eliteModifierPoolId: string;
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
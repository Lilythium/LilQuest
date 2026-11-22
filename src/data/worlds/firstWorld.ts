
import type { WorldDefinition, WorldContentProfile } from "./types";

export const FirstWorldContent: WorldContentProfile = {
    basicEnemyPoolId: "forest-basic-enemies",
    eliteEnemyPoolId: "forest-elite-enemies",
    miniBossPoolId: "forest-mini-bosses",
    bossId: "forest-guardian",
    equipmentPoolId: "beginner-equipment"
};

export const FirstWorld: WorldDefinition = {
    id: "greener-pastures",
    name: "Greener Pastures",
    description: "A lush and vibrant world filled with rolling hills, dense forests, and sparkling rivers.",
    stages: [
        { stageId: "rolling-hills" },
        { stageId: "forest-edge" },
        { stageId: "dense-forest" },
        { stageId: "sparkling-river" },
        { stageId: "forest-boss" }
    ],
    content: FirstWorldContent,
    baseDifficulty: 1
};

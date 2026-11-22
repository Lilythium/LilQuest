
import type { WorldDefinition, WorldContentProfile } from "./types";

export const firstWorldContent: WorldContentProfile = {
    basicEnemyPoolId: "forest-basic-enemies",
    eliteEnemyPoolId: "forest-elite-enemies",
    miniBossPoolId: "forest-mini-bosses",
    bossId: "TBD",
    equipmentPoolId: "beginner-equipment"
};

export const firstWorld: WorldDefinition = {
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
    content: firstWorldContent,
    baseDifficulty: 1
};

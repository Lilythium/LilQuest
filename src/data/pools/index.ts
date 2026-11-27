import type { ContentPool } from "./types";
import { ForestBasicEnemies } from "./enemies/basic";
import { ForestEliteModifiers } from "./enemies/elite";
import { ForestMiniBosses } from "./enemies/miniBoss";
import { BeginnerEquipment } from "./equipment/worldEquipment";

export const POOLS: Record<string, ContentPool> = {
    [ForestBasicEnemies.id]: ForestBasicEnemies,
    [ForestEliteModifiers.id]: ForestEliteModifiers,
    [ForestMiniBosses.id]: ForestMiniBosses,
    [BeginnerEquipment.id]: BeginnerEquipment
};

export function getPool(poolId: string): ContentPool {
    const pool = POOLS[poolId];

    if (!pool) {
        throw new Error(`Pool "${poolId}" does not exist.`);
    }

    return pool;
}
import type { ContentPool } from "./types";

export const POOLS: Record<string, ContentPool> = {};

export function getPool(poolId: string): ContentPool {
    const pool = POOLS[poolId];

    if (!pool) {
        throw new Error(`Pool "${poolId}" does not exist.`);
    }

    return pool;
}
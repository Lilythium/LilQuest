import type { WorldDefinition } from "./types";

export const WORLDS: Record<string, WorldDefinition> = {};

export function getWorld(worldId: string): WorldDefinition {
    const world = WORLDS[worldId];

    if (!world) {
        throw new Error(`World "${worldId}" does not exist.`);
    }

    return world;
}
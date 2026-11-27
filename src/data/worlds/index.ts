import type { WorldDefinition } from "./types";
import { FirstWorld } from "./firstWorld";

export const WORLDS: Record<string, WorldDefinition> = {
    [FirstWorld.id]: FirstWorld
};

export function getWorld(worldId: string): WorldDefinition {
    const world = WORLDS[worldId];

    if (!world) {
        throw new Error(`World "${worldId}" does not exist.`);
    }

    return world;
}
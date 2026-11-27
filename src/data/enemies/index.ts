import { ForestBandit, ForestRat } from "./forest/basic";
import { Relentless } from "./forest/elite";
import type { EnemyDefinition, EliteModifierDefinition } from "./types";

export const ENEMIES: Record<string, EnemyDefinition> = {
    [ForestRat.id]: ForestRat,
    [ForestBandit.id]: ForestBandit
};

export const ELITE_MODIFIERS: Record<string, EliteModifierDefinition> = {
    [Relentless.id]: Relentless
};

export function getEnemy(id: string): EnemyDefinition {
    const enemy = ENEMIES[id];

    if (!enemy) {
        throw new Error(`Unknown enemy: ${id}`);
    }

    return enemy;
}

export function getEliteModifier(id: string): EliteModifierDefinition {
    const modifier = ELITE_MODIFIERS[id];

    if (!modifier) {
        throw new Error(`Unknown elite modifier: ${id}`);
    }

    return modifier;
}

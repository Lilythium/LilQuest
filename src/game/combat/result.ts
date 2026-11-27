import type { EnemyRewards } from "../../data/enemies/types";
import type { Character } from "../character/types";
import type { CombatState, CombatStatus } from "./types";

export interface EncounterResult {
    status: CombatStatus;
    winner: "player" | "enemy" | "none";
    elapsedSeconds: number;
    turns: number;
    rewards: EnemyRewards;
    playerHealth: number;
}

export function buildEncounterResult(state: CombatState): EncounterResult {
    const winner = state.status === "won"
        ? "player"
        : state.status === "lost"
            ? "enemy"
            : "none";
    const rewards = state.status === "won"
        ? state.enemies.reduce(
            (total, enemy) => ({
                experience: total.experience + (enemy.rewards?.experience ?? 0),
                gold: total.gold + (enemy.rewards?.gold ?? 0)
            }),
            { experience: 0, gold: 0 }
        )
        : { experience: 0, gold: 0 };

    return {
        status: state.status,
        winner,
        elapsedSeconds: state.clock,
        turns: state.turnCount,
        rewards,
        playerHealth: state.player.currentHealth
    };
}

export function applyEncounterResult(
    character: Character,
    result: EncounterResult
): Character {
    return {
        ...character,
        currentHealth: result.playerHealth,
        experience: character.experience + result.rewards.experience,
        gold: character.gold + result.rewards.gold
    };
}

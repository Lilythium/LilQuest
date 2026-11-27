import type { CombatStats } from "../../data/skills/types";
import type { EnemyRewards } from "../../data/enemies/types";
import type { Attributes, Character, EncounterState, SecondaryStats } from "../character/types";
import type { DerivedStats } from "../character/derivedStats";
import type { ActiveStatusEffect } from "../statusEffects/types";

export type CombatSide = "player" | "enemy";

export interface Combatant {
    id: string;
    name: string;
    side: CombatSide;
    level: number;
    attributes: Attributes;
    secondaryStats: SecondaryStats;
    derived: DerivedStats;
    currentHealth: number;
    encounter: EncounterState;
    combat: CombatStats;
    skillIds: string[];
    traitIds: string[];
    statusEffects: ActiveStatusEffect[];
    rewards?: EnemyRewards;
}

export type CombatStatus = "active" | "won" | "lost" | "stalemate";

export interface CombatState {
    player: Combatant;
    enemies: Combatant[];
    clock: number;
    turnCount: number;
    turnStartedFor: string | null;
    status: CombatStatus;
}

export type CombatAction =
    | { type: "skill"; skillId: string; targetId: string }
    | { type: "pass" };

export type CombatEvent =
    | { type: "turn-start"; actorId: string; clock: number }
    | {
        type: "attack";
        actorId: string;
        targetId: string;
        skillId: string;
        damage: number;
        crit: boolean;
        targetHealth: number;
    }
    | { type: "heal"; actorId: string; skillId: string; amount: number; health: number }
    | { type: "pass"; actorId: string }
    | { type: "defeat"; combatantId: string }
    | { type: "combat-end"; status: CombatStatus };

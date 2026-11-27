import { getSkill } from "../../data/skills";
import type { AnySkill } from "../../data/skills/types";
import {
    BASE_INITIATIVE_PER_SECOND,
    INITIATIVE_ACT_THRESHOLD,
    INITIATIVE_CAP,
    INITIATIVE_EPSILON,
    MAX_COMBAT_TURNS
} from "./constants";
import { resolveAttackSkill, resolveHealingSkill } from "./skillResolution";
import type {
    CombatAction,
    CombatEvent,
    CombatState,
    Combatant
} from "./types";
import type { RandomGenerator } from "../random/rng";

export function createCombat(
    player: Combatant,
    enemies: Combatant[]
): CombatState {
    return {
        player,
        enemies,
        clock: 0,
        turnCount: 0,
        turnStartedFor: null,
        status: "active"
    };
}

function getCombatants(state: CombatState): Combatant[] {
    return [state.player, ...state.enemies];
}

function getLivingCombatants(state: CombatState): Combatant[] {
    return getCombatants(state).filter(combatant => combatant.currentHealth > 0);
}

function selectReadyActor(state: CombatState): Combatant | null {
    const readyCombatants = getLivingCombatants(state).filter(
        combatant =>
            combatant.encounter.currentInitiative >= INITIATIVE_ACT_THRESHOLD
    );

    let selected: Combatant | undefined;
    for (const combatant of readyCombatants) {
        if (
            !selected ||
            combatant.encounter.currentInitiative > selected.encounter.currentInitiative ||
            (
                combatant.encounter.currentInitiative === selected.encounter.currentInitiative &&
                combatant.derived.speed > selected.derived.speed
            ) ||
            (
                combatant.encounter.currentInitiative === selected.encounter.currentInitiative &&
                combatant.derived.speed === selected.derived.speed &&
                combatant.side === "player" &&
                selected.side !== "player"
            )
        ) {
            selected = combatant;
        }
    }

    return selected ?? null;
}

export function advanceToNextActor(state: CombatState): Combatant | null {
    if (state.status !== "active") {
        return null;
    }

    const livingCombatants = getLivingCombatants(state);
    if (livingCombatants.length === 0) {
        throw new Error("Cannot advance combat without a living combatant.");
    }

    const rates = new Map<Combatant, number>();
    for (const combatant of livingCombatants) {
        if (
            !Number.isFinite(combatant.derived.speed) ||
            combatant.derived.speed <= 0
        ) {
            throw new Error(
                `Combatant "${combatant.id}" must have a positive finite speed.`
            );
        }

        rates.set(
            combatant,
            BASE_INITIATIVE_PER_SECOND * combatant.derived.speed
        );
    }

    const readyActor = selectReadyActor(state);
    if (readyActor) {
        return readyActor;
    }

    let secondsUntilActor = Number.POSITIVE_INFINITY;
    for (const combatant of livingCombatants) {
        const rate = rates.get(combatant)!;
        secondsUntilActor = Math.min(
            secondsUntilActor,
            (INITIATIVE_ACT_THRESHOLD - combatant.encounter.currentInitiative) / rate
        );
    }

    state.clock += secondsUntilActor;
    for (const combatant of livingCombatants) {
        const rate = rates.get(combatant)!;
        const initiative = Math.min(
            INITIATIVE_CAP,
            combatant.encounter.currentInitiative + rate * secondsUntilActor
        );

        // Floating point error can leave initiative a hair either side of the
        // threshold. Snap near-threshold values so ties are real ties.
        combatant.encounter.currentInitiative =
            Math.abs(initiative - INITIATIVE_ACT_THRESHOLD) < INITIATIVE_EPSILON
                ? INITIATIVE_ACT_THRESHOLD
                : initiative;
    }

    const actor = selectReadyActor(state);
    if (!actor) {
        throw new Error("Combat initiative advanced without a ready actor.");
    }

    return actor;
}

export function beginTurn(
    state: CombatState,
    actor: Combatant
): CombatEvent[] {
    assertActorTurn(state, actor);

    if (state.turnStartedFor === actor.id) {
        return [];
    }

    state.turnStartedFor = actor.id;
    actor.encounter.currentStamina = Math.min(
        actor.derived.maxStamina,
        actor.encounter.currentStamina + actor.derived.staminaRegen
    );

    return [{
        type: "turn-start",
        actorId: actor.id,
        clock: state.clock
    }];
}

export function getAvailableSkills(actor: Combatant): AnySkill[] {
    return actor.skillIds
        .map(skillId => getSkill(skillId))
        .filter(skill =>
            (skill.type === "attack" || skill.type === "healing") &&
            skill.staminaCost <= actor.encounter.currentStamina
        );
}

function assertActorTurn(state: CombatState, actor: Combatant): void {
    if (
        state.status !== "active" ||
        !getCombatants(state).includes(actor) ||
        actor.currentHealth <= 0 ||
        selectReadyActor(state) !== actor
    ) {
        throw new Error(`Combatant "${actor.id}" is not the active actor's turn.`);
    }
}

function getAttackTarget(
    state: CombatState,
    actor: Combatant,
    targetId: string
): Combatant {
    const opposingCombatants = actor.side === "player"
        ? state.enemies
        : [state.player];
    const target = opposingCombatants.find(
        combatant => combatant.id === targetId
    );

    if (!target || target.currentHealth <= 0 || target.side === actor.side) {
        throw new Error(`Invalid attack target "${targetId}".`);
    }

    return target;
}

function validateSkillAction(
    actor: Combatant,
    action: Extract<CombatAction, { type: "skill" }>
): AnySkill {
    const skill = getSkill(action.skillId);
    if (!actor.skillIds.includes(action.skillId)) {
        throw new Error(`Combatant "${actor.id}" does not know skill "${action.skillId}".`);
    }
    if (skill.type !== "attack" && skill.type !== "healing") {
        throw new Error(`Skill "${action.skillId}" is not an attack or healing skill.`);
    }
    if (skill.staminaCost > actor.encounter.currentStamina) {
        throw new Error(`Combatant "${actor.id}" cannot afford skill "${action.skillId}".`);
    }

    return skill;
}

export function performAction(
    state: CombatState,
    actor: Combatant,
    action: CombatAction,
    rng: RandomGenerator
): CombatEvent[] {
    assertActorTurn(state, actor);

    let skill: AnySkill | undefined;
    let target: Combatant | undefined;

    if (action.type === "skill") {
        skill = validateSkillAction(actor, action);
        if (skill.type === "attack") {
            target = getAttackTarget(state, actor, action.targetId);
        } else if (action.targetId !== actor.id) {
            throw new Error("Healing skills must target the acting combatant.");
        }
    }

    const previousHealth = new Map(
        getCombatants(state).map(combatant => [combatant, combatant.currentHealth])
    );
    const events: CombatEvent[] = [];

    if (action.type === "pass") {
        events.push({ type: "pass", actorId: actor.id });
    } else if (skill?.type === "attack" && target) {
        actor.encounter.currentStamina = Math.max(
            0,
            actor.encounter.currentStamina - skill.staminaCost
        );
        events.push(resolveAttackSkill(actor, target, skill, rng));
    } else if (skill?.type === "healing") {
        actor.encounter.currentStamina = Math.max(
            0,
            actor.encounter.currentStamina - skill.staminaCost
        );
        events.push(resolveHealingSkill(actor, skill));
    }

    actor.encounter.currentInitiative = Math.max(
        0,
        actor.encounter.currentInitiative - INITIATIVE_ACT_THRESHOLD
    );
    state.turnCount++;
    state.turnStartedFor = null;

    for (const combatant of getCombatants(state)) {
        if (
            (previousHealth.get(combatant) ?? 0) > 0 &&
            combatant.currentHealth <= 0
        ) {
            events.push({
                type: "defeat",
                combatantId: combatant.id
            });
        }
    }

    if (state.player.currentHealth <= 0) {
        state.status = "lost";
    } else if (state.enemies.every(enemy => enemy.currentHealth <= 0)) {
        state.status = "won";
    } else if (state.turnCount >= MAX_COMBAT_TURNS) {
        state.status = "stalemate";
    }

    if (state.status !== "active") {
        events.push({
            type: "combat-end",
            status: state.status
        });
    }

    return events;
}

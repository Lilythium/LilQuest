import { chooseAction } from "./ai";
import {
    advanceToNextActor,
    beginTurn,
    performAction
} from "./engine";
import type { CombatEvent, CombatState } from "./types";
import type { RandomGenerator } from "../random/rng";

export function runAutoCombat(
    state: CombatState,
    rng: RandomGenerator
): CombatEvent[] {
    const events: CombatEvent[] = [];

    while (state.status === "active") {
        const actor = advanceToNextActor(state);
        if (!actor) {
            throw new Error("Active combat did not produce an actor.");
        }

        events.push(...beginTurn(state, actor));
        events.push(
            ...performAction(state, actor, chooseAction(state, actor), rng)
        );
    }

    return events;
}

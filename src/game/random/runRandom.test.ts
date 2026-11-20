
import { describe, expect, it } from "vitest";
import {
    captureRandomStates,
    createRunRandom
} from "./runRandom";

describe("runRandom", () => {
    it("produces deterministic sequences from the same run seed", () => {
        const first = createRunRandom("test-run");
        const second = createRunRandom("test-run");

        for (const stream of [
            "character",
            "exploration",
            "combat",
            "loot"
        ] as const) {
            expect(
                Array.from({ length: 10 }, () => first[stream].next())
            ).toEqual(
                Array.from({ length: 10 }, () => second[stream].next())
            );
        }
    });

    it("keeps random streams independent", () => {
        const first = createRunRandom("test-run");
        const second = createRunRandom("test-run");

        // Advance only the character stream.
        for (let i = 0; i < 10; i++) {
            first.character.next();
        }

        // Other streams should still produce identical values.
        for (const stream of [
            "exploration",
            "combat",
            "loot"
        ] as const) {
            expect(first[stream].next()).toBe(second[stream].next());
        }
    });

    it("captures the current state of every stream", () => {
        const random = createRunRandom("test-run");

        random.character.next();
        random.character.next();
        random.exploration.next();
        random.loot.next();

        const states = captureRandomStates(random);

        expect(states.character).toBe(random.character.getState());
        expect(states.exploration).toBe(random.exploration.getState());
        expect(states.combat).toBe(random.combat.getState());
        expect(states.loot).toBe(random.loot.getState());
    });

    it("restores streams to their exact previous state", () => {
        const original = createRunRandom("test-run");

        // Advance each stream by a different amount.
        for (let i = 0; i < 5; i++) {
            original.character.next();
        }

        for (let i = 0; i < 12; i++) {
            original.exploration.next();
        }

        for (let i = 0; i < 3; i++) {
            original.combat.next();
        }

        for (let i = 0; i < 8; i++) {
            original.loot.next();
        }

        const savedStates = captureRandomStates(original);

        // Record what each stream should produce next.
        const expected = {
            character: original.character.next(),
            exploration: original.exploration.next(),
            combat: original.combat.next(),
            loot: original.loot.next()
        };

        const restored = createRunRandom("test-run", savedStates);

        expect(restored.character.next()).toBe(expected.character);
        expect(restored.exploration.next()).toBe(expected.exploration);
        expect(restored.combat.next()).toBe(expected.combat);
        expect(restored.loot.next()).toBe(expected.loot);
    });
});

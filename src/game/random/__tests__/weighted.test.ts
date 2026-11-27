import { describe, expect, it } from "vitest";
import { createRng } from "../rng";
import { weightedPick } from "../weighted";

describe("weightedPick", () => {
    it("ignores zero weights, is deterministic, and rejects all-zero entries", () => {
        const entries = [
            { item: "unselectable", weight: 0 },
            { item: "selected", weight: 4 }
        ];

        expect(weightedPick(createRng("weighted-pick"), entries)).toBe("selected");
        expect(weightedPick(createRng("weighted-pick"), entries)).toBe("selected");
        expect(() => weightedPick(createRng("empty-weights"), [
            { item: "unselectable", weight: 0 }
        ])).toThrow(/positive weight/);
    });
});

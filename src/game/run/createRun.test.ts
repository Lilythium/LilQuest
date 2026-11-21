import { afterEach, describe, expect, it, vi } from "vitest";
import { RANDOM_STREAMS } from "../random/seed";
import {
    createRun,
    generateCharacterPreview
} from "./createRun";

afterEach(() => {
    vi.restoreAllMocks();
});

describe("generateCharacterPreview", () => {
    it("generates the same character and RNG states from the same seed", () => {
        vi.spyOn(crypto, "randomUUID")
            .mockReturnValueOnce("00000000-0000-4000-8000-000000000001")
            .mockReturnValueOnce("00000000-0000-4000-8000-000000000002")
            .mockReturnValueOnce("00000000-0000-4000-8000-000000000001")
            .mockReturnValueOnce("00000000-0000-4000-8000-000000000002");

        const first = generateCharacterPreview("human", "feminine");
        const second = generateCharacterPreview("human", "feminine");

        expect(first).toEqual(second);
        expect(first.runSeed).toBe("00000000-0000-4000-8000-000000000001");
        expect(first.character).toMatchObject({
            id: "00000000-0000-4000-8000-000000000002",
            raceId: "human",
            genderId: "feminine"
        });
        expect(Object.keys(first.randomStates)).toEqual(RANDOM_STREAMS);
    });
});

describe("createRun", () => {
    it("preserves the previewed character, seed, and RNG states", () => {
        const preview = generateCharacterPreview("orc", "neutral");
        const previewedCharacter = structuredClone(preview.character);
        const previewedRandomStates = { ...preview.randomStates };

        const run = createRun(preview);

        expect(run.character).toEqual(previewedCharacter);
        expect(run.runSeed).toBe(preview.runSeed);
        expect(run.randomStates).toEqual(previewedRandomStates);
        expect(run.worldProgress).toEqual([]);
    });
});

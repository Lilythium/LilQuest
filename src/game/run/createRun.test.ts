import { afterEach, describe, expect, it, vi } from "vitest";
import { RANDOM_STREAMS } from "../random/seed";
import {
    createRun,
    generateCharacterPreview
} from "./createRun";
import type { PermanentProgress } from "../progression/types";
import { isCharacterGender } from "../character/naming/types";
import { createCharacter } from "../character/createCharacter";
import { getRace } from "../../data/races";
import { createRunRandom } from "../random/runRandom";

const permanentProgress: PermanentProgress = {
    prestigeCount: 0,
    prestigeCurrency: 0,
    unlockedRaceIds: ["human", "orc"],
    unlockedClassIds: [],
    unlockedWorldIds: [],
    firstClearedBossIds: []
};

afterEach(() => {
    vi.restoreAllMocks();
});

describe("isCharacterGender", () => {
    it("accepts only supported character genders", () => {
        expect(isCharacterGender("masculine")).toBe(true);
        expect(isCharacterGender("feminine")).toBe(true);
        expect(isCharacterGender("neutral")).toBe(true);
        expect(isCharacterGender("other")).toBe(false);
        expect(isCharacterGender(null)).toBe(false);
    });
});

describe("generateCharacterPreview", () => {
    it("generates the same character and RNG states from the same seed", () => {
        vi.spyOn(crypto, "randomUUID")
            .mockReturnValueOnce("00000000-0000-4000-8000-000000000001")
            .mockReturnValueOnce("00000000-0000-4000-8000-000000000002")
            .mockReturnValueOnce("00000000-0000-4000-8000-000000000001")
            .mockReturnValueOnce("00000000-0000-4000-8000-000000000002");

        const first = generateCharacterPreview("human", "feminine", permanentProgress);
        const second = generateCharacterPreview("human", "feminine", permanentProgress);

        expect(first).toEqual(second);
        expect(first.runSeed).toBe("00000000-0000-4000-8000-000000000001");
        expect(first.character).toMatchObject({
            id: "00000000-0000-4000-8000-000000000002",
            raceId: "human",
            genderId: "feminine"
        });
        expect(Object.keys(first.randomStates)).toEqual(RANDOM_STREAMS);
    });

    it("rejects races that are not unlocked", () => {
        expect(() =>
            generateCharacterPreview("elf", "neutral", permanentProgress)
        ).toThrow('Race "elf" is not unlocked.');
    });

    it("rejects invalid character genders", () => {
        expect(() =>
            generateCharacterPreview("human", "other", permanentProgress)
        ).toThrow('Invalid character gender: "other".');
    });

    it("applies resolved starting gold and maximum health bonuses", () => {
        const random = createRunRandom("bonus-test");
        const baseCharacter = createCharacter(
            getRace("human"),
            "neutral",
            random.character,
            { startingGold: 0, bonusMaxHealth: 0 }
        );
        const bonusRandom = createRunRandom("bonus-test");
        const character = createCharacter(
            getRace("human"),
            "neutral",
            bonusRandom.character,
            { startingGold: 25, bonusMaxHealth: 10 }
        );

        expect(character.gold).toBe(25);
        expect(character.currentHealth).toBe(baseCharacter.currentHealth + 10);
    });
});

describe("createRun", () => {
    it("preserves the previewed character, seed, and RNG states", () => {
        const preview = generateCharacterPreview("orc", "neutral", permanentProgress);
        const previewedCharacter = structuredClone(preview.character);
        const previewedRandomStates = { ...preview.randomStates };

        const run = createRun(preview);

        expect(run.character).toEqual(previewedCharacter);
        expect(run.runSeed).toBe(preview.runSeed);
        expect(run.randomStates).toEqual(previewedRandomStates);
        expect(run.worldProgress).toEqual([]);
    });
});

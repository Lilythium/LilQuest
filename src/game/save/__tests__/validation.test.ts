import { describe, expect, it } from "vitest";
import {
    assertValidGameSave,
    validateGameSave
} from "../validation";
import { createValidGameSave } from "./fixtures";

describe("GameSave validation", () => {
    it("accepts a valid save", () => {
        const save = createValidGameSave();

        expect(validateGameSave(save)).toBe(true);
        expect(() => assertValidGameSave(save)).not.toThrow();
    });

    it("accepts a save without an active run", () => {
        const save = createValidGameSave();
        save.currentRun = null;

        expect(validateGameSave(save)).toBe(true);
    });

    it("rejects a non-object save", () => {
        expect(validateGameSave(null)).toBe(false);
        expect(validateGameSave([])).toBe(false);
        expect(validateGameSave("save")).toBe(false);
    });

    it("rejects an empty save ID", () => {
        const save = createValidGameSave();
        save.saveId = "   ";

        expect(validateGameSave(save)).toBe(false);
    });

    it("rejects unsupported schema versions", () => {
        const save = {
            ...createValidGameSave(),
            schemaVersion: 2
        };

        expect(validateGameSave(save)).toBe(false);
    });

    it("rejects missing permanent progression data", () => {
        const save = createValidGameSave();

        delete (save as Partial<typeof save>).permanentProgress;

        expect(validateGameSave(save)).toBe(false);
    });

    it("rejects invalid character attributes", () => {
        const save = createValidGameSave();

        save.currentRun!.character.attributes.strength = NaN;

        expect(validateGameSave(save)).toBe(false);
    });

    it("rejects invalid character gender", () => {
        const save = createValidGameSave();

        (save.currentRun!.character as { genderId: string }).genderId =
            "invalid";

        expect(validateGameSave(save)).toBe(false);
    });

    it("rejects invalid equipment rarity", () => {
        const save = createValidGameSave();

        const item = save.currentRun!.character.equipment.amulet!;
        (item as { rarity: string }).rarity = "mythical";

        expect(validateGameSave(save)).toBe(false);
    });

    it("rejects unknown equipment slots", () => {
        const save = createValidGameSave();

        const equipment = save.currentRun!.character.equipment as Record<
            string,
            unknown
        >;

        equipment.unknownSlot = {};

        expect(validateGameSave(save)).toBe(false);
    });

    it("rejects invalid equipment modifiers", () => {
        const save = createValidGameSave();

        const item = save.currentRun!.character.equipment.amulet!;
        (item.secondaryModifiers[0] as { stat: string }).stat =
            "unknown-stat";

        expect(validateGameSave(save)).toBe(false);
    });

    it("rejects missing RNG streams", () => {
        const save = createValidGameSave();
        const run = save.currentRun!;

        delete (run.randomStates as Partial<typeof run.randomStates>).loot;

        expect(validateGameSave(save)).toBe(false);
    });

    it("rejects invalid RNG states", () => {
        const save = createValidGameSave();
        const run = save.currentRun!;

        run.randomStates.character = 0x100000000;

        expect(validateGameSave(save)).toBe(false);
    });

    it("rejects invalid world progress entries", () => {
        const save = createValidGameSave();
        const run = save.currentRun!;

        run.worldProgress[0].worldId = "";

        expect(validateGameSave(save)).toBe(false);
    });

    it("rejects a stage map with a dangling next node", () => {
        const save = createValidGameSave();
        const node =
            save.currentRun!.worldProgress[0].maps["first-stage"].nodes[
                "first-stage:start"
            ];
        node.next = ["missing-node"];

        expect(validateGameSave(save)).toBe(false);
    });

    it("rejects invalid encounter state", () => {
        const save = createValidGameSave();
        const run = save.currentRun!;

        run.character.encounterStats = {
            currentStamina: NaN,
            currentInitiative: 50
        };

        expect(validateGameSave(save)).toBe(false);
    });

    it("rejects empty IDs in string collections", () => {
        const save = createValidGameSave();
        const run = save.currentRun!;

        run.character.traitIds = [""];

        expect(validateGameSave(save)).toBe(false);
    });
});
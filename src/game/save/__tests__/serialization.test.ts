import { describe, expect, it } from "vitest";
import {
    deserializeGameSave,
    serializeGameSave
} from "../serialization";
import { createValidGameSave } from "./fixtures";

describe("GameSave serialization", () => {
    it("serializes a valid save into JSON", () => {
        const save = createValidGameSave();

        const serialized = serializeGameSave(save);

        expect(typeof serialized).toBe("string");
        expect(JSON.parse(serialized)).toEqual(save);
    });

    it("deserializes a valid save", () => {
        const save = createValidGameSave();

        const result = deserializeGameSave(JSON.stringify(save));

        expect(result).toEqual(save);
    });

    it("preserves save data through a round trip", () => {
        const save = createValidGameSave();

        const result = deserializeGameSave(
            serializeGameSave(save)
        );

        expect(result).toEqual(save);
    });

    it("preserves a save without an active run", () => {
        const save = createValidGameSave();
        save.currentRun = null;

        const result = deserializeGameSave(
            serializeGameSave(save)
        );

        expect(result.currentRun).toBeNull();
    });

    it("rejects malformed JSON", () => {
        expect(() => deserializeGameSave("{invalid json"))
            .toThrow();
    });

    it("rejects valid JSON with an invalid save structure", () => {
        expect(() => deserializeGameSave(
            JSON.stringify({ saveId: "test" })
        )).toThrow();
    });

    it("rejects unsupported schema versions", () => {
        const save = {
            ...createValidGameSave(),
            schemaVersion: 2
        };

        expect(() => deserializeGameSave(
            JSON.stringify(save)
        )).toThrow();
    });

    it("rejects invalid data before serialization", () => {
        const save = createValidGameSave();
        save.saveId = "";

        expect(() => serializeGameSave(save)).toThrow();
    });
});
import type { CurrentRun } from "../run/types";
import type { PermanentProgress } from "../progression/types";
import { assertValidGameSave } from "./validation";

export interface GameSave {
    saveId: string;
    schemaVersion: 1;

    permanentProgress: PermanentProgress;
    currentRun: CurrentRun | null;
}

export function serializeGameSave(save: GameSave): string {
    assertValidGameSave(save);
    return JSON.stringify(save);
}

export function deserializeGameSave(serialized: string): GameSave {
    if (typeof serialized !== "string") {
        throw new Error("Invalid serialized GameSave: input must be a string.");
    }

    let parsed: unknown;
    try {
        parsed = JSON.parse(serialized);
    } catch (error) {
        const detail = error instanceof Error ? error.message : "unknown parsing error";
        throw new Error(`Invalid serialized GameSave JSON: ${detail}`);
    }

    assertValidGameSave(parsed);
    return parsed;
}

import type { CurrentRun } from "../run/types";

export interface GameSave {
	schemaVersion: 1;
	currentRun: CurrentRun | null;
}

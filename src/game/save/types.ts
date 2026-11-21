import type { CurrentRun } from "../run/types";
import type { PermanentProgress } from "../progression/types";


export interface GameSave {
    saveId: string;
    schemaVersion: 1;

    permanentProgress: PermanentProgress;
    currentRun: CurrentRun | null;
}


import type { Character } from "../character/types";

export interface RandomStates {
	character: number;
	exploration: number;
	combat: number;
	loot: number;
}

export interface CurrentRun {
	runId: string;
	runSeed: string;
	randomStates: RandomStates;
	character: Character;
}

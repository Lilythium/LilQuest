import type { Character } from "../character/types";
import type { RandomStream } from "../random/seed";

export type RandomStates = Record<RandomStream, number>;

export interface CurrentRun {
	runId: string;
	runSeed: string;
	randomStates: RandomStates;
	character: Character;
}

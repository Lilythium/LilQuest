import { createRng } from "./rng";
import type { RandomGenerator } from "./rng";
import { deriveSeed, RANDOM_STREAMS } from "./seed";
import type { RandomStream } from "./seed";
import type { RandomStates } from "../run/types";

export type RunRandomStreams =
    Record<RandomStream, RandomGenerator>;

export function createRunRandom(
    runSeed: string,
    savedStates?: RandomStates
): RunRandomStreams {
    if (!runSeed) {
        throw new Error("A run seed is required.");
    }

    const random = {} as RunRandomStreams;

    for (const stream of RANDOM_STREAMS) {
        random[stream] = createRng(
            deriveSeed(runSeed, stream),
            savedStates?.[stream]
        );
    }

    return random;
}

export function captureRandomStates(
    random: RunRandomStreams
): RandomStates {
    const states = {} as RandomStates;

    for (const stream of RANDOM_STREAMS) {
        states[stream] = random[stream].getState();
    }

    return states;
}
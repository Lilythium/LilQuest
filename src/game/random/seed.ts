
/**
 * Random streams used by different game systems.
 */
export const RANDOM_STREAMS = [
    "character",
    "exploration",
    "combat",
    "loot"
] as const;

export type RandomStream = typeof RANDOM_STREAMS[number];

/**
 * Generates a unique seed for a new run.
 */
export function createRunSeed(): string {
    return crypto.randomUUID();
}

/**
 * Derives a deterministic seed for a particular
 * game system from the run seed.
 */
export function deriveSeed(
    runSeed: string,
    stream: RandomStream
): string {
    if (!runSeed) {
        throw new Error("A run seed is required.");
    }

    return `${runSeed}:${stream}`;
}

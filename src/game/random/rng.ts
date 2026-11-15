
export interface RandomGenerator {
    next(): number;
    int(min: number, max: number): number;
    pick<T>(items: readonly T[]): T;
    getState(): number;
}

/**
 * Converts a string seed into a 32-bit integer.
 */
function hashSeed(seed: string): number {
    let hash = 2166136261;

    for (let i = 0; i < seed.length; i++) {
        hash ^= seed.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }

    return hash >>> 0;
}

/**
 * Creates a deterministic random number generator.
 *
 * The same seed and initial state always produce
 * the same sequence of random values.
 */
export function createRng(
    seed: string,
    initialState?: number
): RandomGenerator {
    if (!seed) {
        throw new Error("A non-empty seed is required.");
    }

    if (
        initialState !== undefined &&
        (!Number.isInteger(initialState) ||
            initialState < 0 ||
            initialState > 0xFFFFFFFF)
    ) {
        throw new Error("Invalid RNG state.");
    }

    let state = initialState ?? hashSeed(seed);

    function next(): number {
        state = (state + 0x6D2B79F5) >>> 0;

        let value = state;

        value = Math.imul(
            value ^ (value >>> 15),
            value | 1
        );

        value ^= value + Math.imul(
            value ^ (value >>> 7),
            value | 61
        );

        return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    }

    function int(min: number, max: number): number {
        if (
            !Number.isSafeInteger(min) ||
            !Number.isSafeInteger(max) ||
            min > max
        ) {
            throw new Error("Invalid integer range.");
        }

        return Math.floor(next() * (max - min + 1)) + min;
    }

    function pick<T>(items: readonly T[]): T {
        if (items.length === 0) {
            throw new Error("Cannot select from an empty collection.");
        }

        return items[int(0, items.length - 1)];
    }

    return {
        next,
        int,
        pick,
        getState: () => state
    };
}


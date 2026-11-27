import type { RandomGenerator } from "./rng";

export interface WeightedEntry<T> {
    item: T;
    weight: number;
}

export function weightedPick<T>(
    rng: RandomGenerator,
    entries: readonly WeightedEntry<T>[]
): T {
    const positiveEntries = entries.filter(entry => {
        if (!Number.isFinite(entry.weight) || entry.weight < 0) {
            throw new Error(`Invalid selection weight: ${entry.weight}.`);
        }

        return entry.weight > 0;
    });
    const totalWeight = positiveEntries.reduce(
        (total, entry) => total + entry.weight,
        0
    );

    if (totalWeight <= 0) {
        throw new Error("Cannot select from entries without positive weight.");
    }

    let remainingWeight = rng.next() * totalWeight;
    for (const entry of positiveEntries) {
        remainingWeight -= entry.weight;
        if (remainingWeight < 0) {
            return entry.item;
        }
    }

    return positiveEntries[positiveEntries.length - 1].item;
}

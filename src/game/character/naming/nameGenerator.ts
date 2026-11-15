
import type {
    CharacterGender,
    NameGenerationRules,
    NamePools,
    SyllablePools,
    SyllableRules,
    RaceNameRules
} from "./types";

import type { RandomGenerator } from "../../random/rng";

/**
 * Selects a shared or gender-specific pool.
 * Gender-exempt races must use shared pools.
 */
function selectPool<T>(
    pools: { shared: T } | Record<CharacterGender, T>,
    gender: CharacterGender,
    genderExempt: boolean
): T {
    if ("shared" in pools) {
        return pools.shared;
    }

    if (genderExempt) {
        throw new Error(
            "Gender-exempt races must use shared naming pools."
        );
    }

    return pools[gender];
}

/**
 * Generates a name using fixed collections or syllable assembly.
 */
function generateNamePart(
    rules: NameGenerationRules,
    gender: CharacterGender,
    genderExempt: boolean,
    rng: RandomGenerator
): string {
    if (rules.method === "fixed") {
        const names = selectPool(
            rules.pools as NamePools,
            gender,
            genderExempt
        );

        if (names.length === 0) {
            throw new Error("Cannot generate a name from an empty pool.");
        }

        return rng.pick(names);
    }

    const syllables = selectPool(
        rules.syllables as SyllablePools,
        gender,
        genderExempt
    );

    return generateFromSyllables(syllables, rng);
}

/**
 * Assembles a name from its syllable categories.
 */
function generateFromSyllables(
    rules: SyllableRules,
    rng: RandomGenerator
): string {
    const result: string[] = [];

    const categories = [
        rules.beginning,
        rules.middle,
        rules.ending
    ];

    for (const category of categories) {
        if (category.syllables.length === 0) {
            if (category.required) {
                throw new Error(
                    "A required syllable category cannot be empty."
                );
            }

            continue;
        }

        if (category.required || rng.int(0, 1) === 1) {
            result.push(rng.pick(category.syllables));
        }
    }

    if (result.length === 0) {
        throw new Error("Name generation produced an empty name.");
    }

    return result.join("");
}

/**
 * Generates a complete character name.
 */
export function generateName(
    rules: RaceNameRules,
    gender: CharacterGender,
    rng: RandomGenerator
): string {
    const firstName = generateNamePart(
        rules.firstName,
        gender,
        rules.genderExempt,
        rng
    );

    if (!rules.surname) {
        return firstName;
    }

    const surname = generateNamePart(
        rules.surname,
        gender,
        rules.genderExempt,
        rng
    );

    return `${firstName} ${surname}`;
}

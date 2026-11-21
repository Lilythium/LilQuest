
export type CharacterGender =
    | "masculine"
    | "feminine"
    | "neutral";

export function isCharacterGender(
    value: unknown
): value is CharacterGender {
    return (
        value === "masculine" ||
        value === "feminine" ||
        value === "neutral"
    );
}

/**
 * Name pools can either be shared across genders
 * or separated into gender-specific collections.
 */
export type GenderedNamePools = {
    masculine: readonly string[];
    feminine: readonly string[];
    neutral: readonly string[];
};

export type NamePools =
    | { shared: readonly string[] }
    | GenderedNamePools;

/**
 * Rules for assembling a name from syllables.
 */
export interface SyllableCategory {
    required: boolean;
    syllables: readonly string[];
}

export interface SyllableRules {
    beginning: SyllableCategory;
    middle: SyllableCategory;
    ending: SyllableCategory;
}

/**
 * Syllable rules can either be shared across genders
 * or have separate rules for each gender.
 */
export type GenderedSyllableRules = {
    masculine: SyllableRules;
    feminine: SyllableRules;
    neutral: SyllableRules;
};

export type SyllablePools =
    | { shared: SyllableRules }
    | GenderedSyllableRules;

/**
 * A name can be selected from a fixed collection
 * or assembled procedurally from syllables.
 */
export interface FixedNameRules {
    method: "fixed";
    pools: NamePools;
}

export interface GeneratedNameRules {
    method: "generated";
    syllables: SyllablePools;
}

export type NameGenerationRules =
    | FixedNameRules
    | GeneratedNameRules;

/**
 * Complete naming configuration for a race.
 */
export interface RaceNameRules {
    genderExempt: boolean;

    firstName: NameGenerationRules;

    surname?: NameGenerationRules;
}

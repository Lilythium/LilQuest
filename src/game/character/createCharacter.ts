
import { generateName } from "./naming/nameGenerator";
import type {CharacterGender} from "./naming/types";

import type { RandomGenerator } from "../random/rng";
import {
    DEFAULT_SECONDARY_STATS,
    type Attributes,
    type Character,
    type SecondaryStats
} from "./types";
import { calculateDerivedStats } from "./derivedStats";
import type {RaceContent} from "../../data/races/types";
import type { PermanentProgress } from "../progression/types";

export function createCharacter(
    race: RaceContent,
    genderId: CharacterGender,
    rng: RandomGenerator,
    permanentProgress?: PermanentProgress
): Character {
    if (
        permanentProgress &&
        !permanentProgress.unlockedRaceIds.includes(race.definition.id)
    ) {
        throw new Error(`Race "${race.definition.id}" is not unlocked.`);
    }

    const id = crypto.randomUUID();

    const name = generateName(
        race.namingRules,
        genderId,
        rng
    );

    const attributes = generateStartingAttributes(rng, race.definition.attributeMultipliers);
    const secondaryStats = generateStartingSecondaryStats(race.definition.secondaryStatModifiers);

    return {
        id,
        name,
        raceId: race.definition.id,
        genderId,
        level: 1,
        experience: 0,
        gold: 0,
        attributes: attributes,
        secondaryStats: secondaryStats,
        inventory: [], //TODO weapon generation - generate start weapon here
        equipment: {},
        currentHealth: calculateDerivedStats(attributes, secondaryStats, 0, 0).maxHealth,
        encounterStats: null,
        learnedSkillIds: [],
        activeSkillIds: [],
        traitIds: [race.definition.startingTraitId]
    };
}


function generateStartingAttributes(
    rng: RandomGenerator,
    raceMultipliers: Attributes
): Attributes {
    const attributeNames = [
        "strength",
        "dexterity",
        "constitution",
        "intelligence",
        "wisdom",
        "charisma"
    ] as const satisfies readonly (keyof Attributes)[];

    const totalPoints = Math.ceil(attributeNames.length * 2.5);
    const maxBaseAttribute = 4;

    // Give every attribute one starting point.
    const attributes: Attributes = {
        strength: 1,
        dexterity: 1,
        constitution: 1,
        intelligence: 1,
        wisdom: 1,
        charisma: 1
    };

    let remainingPoints = totalPoints - attributeNames.length;

    while (remainingPoints > 0) {
        // Only attributes that haven't reached the cap can receive points.
        const eligibleAttributes = attributeNames.filter(
            attribute => attributes[attribute] < maxBaseAttribute
        );

        if (eligibleAttributes.length === 0) {
            throw new Error("Unable to distribute remaining attribute points.");
        }

        const selectedAttribute = rng.pick(eligibleAttributes);

        attributes[selectedAttribute]++;
        remainingPoints--;
    }

    // Apply race multipliers after distributing the base points.
    return {
        strength: Math.round(attributes.strength * raceMultipliers.strength),
        dexterity: Math.round(attributes.dexterity * raceMultipliers.dexterity),
        constitution: Math.round(attributes.constitution * raceMultipliers.constitution),
        intelligence: Math.round(attributes.intelligence * raceMultipliers.intelligence),
        wisdom: Math.round(attributes.wisdom * raceMultipliers.wisdom),
        charisma: Math.round(attributes.charisma * raceMultipliers.charisma)
    };
}

function generateStartingSecondaryStats(
    raceModifiers: Partial<SecondaryStats> = {}
): SecondaryStats {
    return {
        luck: DEFAULT_SECONDARY_STATS.luck + (raceModifiers.luck ?? 0),
        healthRegen: DEFAULT_SECONDARY_STATS.healthRegen + (raceModifiers.healthRegen ?? 0),
        critChance: DEFAULT_SECONDARY_STATS.critChance + (raceModifiers.critChance ?? 0),
        critMultiplier: DEFAULT_SECONDARY_STATS.critMultiplier + (raceModifiers.critMultiplier ?? 0)
    };
}
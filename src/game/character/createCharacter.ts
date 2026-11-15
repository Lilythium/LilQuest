
import { generateName } from "./naming/nameGenerator";

import type {
    CharacterGender,
    RaceNameRules
} from "./naming/types";

import type { RandomGenerator } from "../random/rng";
import type { Attributes, Character } from "./types";

export function createCharacter(
    raceId: string,
    genderId: CharacterGender,
    namingRules: RaceNameRules,
    raceMultipliers: Attributes,
    rng: RandomGenerator
): Character {
    const id = crypto.randomUUID();

    const name = generateName(
        namingRules,
        genderId,
        rng
    );

    return {
        id,
        name,
        raceId,
        genderId,
        level: 1,
        experience: 0,
        gold: 0,
        attributes: generateStartingAttributes(rng, raceMultipliers)
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

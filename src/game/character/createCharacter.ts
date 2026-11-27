
import { generateName } from "./naming/nameGenerator";
import type { CharacterGender } from "./naming/types";

import type { RandomGenerator } from "../random/rng";
import type { CharacterEquipment } from "../../data/equipment/types";
import {
    DEFAULT_SECONDARY_STATS,
    type Attributes,
    type Character,
    type SecondaryStats
} from "./types";
import { calculateDerivedStats } from "./derivedStats";
import type { RaceContent } from "../../data/races/types";
import type { RunBonuses } from "../progression/resolveRunBonuses";
import { getEquipmentDefinition } from "../../data/equipment";
import {
    getHandsRequired,
    type HandheldEquipmentDefinition
} from "../../data/equipment/types";
import { createEquipmentInstance } from "../equipment/createInstance";
import { canEquipInCharacterSlot } from "../equipment/slots";

export function createCharacter(
    race: RaceContent,
    genderId: CharacterGender,
    rng: RandomGenerator,
    runBonuses: RunBonuses
): Character {
    const id = crypto.randomUUID();

    const name = generateName(
        race.namingRules,
        genderId,
        rng
    );

    const attributes = generateStartingAttributes(rng, race.definition.attributeMultipliers);
    const secondaryStats = generateStartingSecondaryStats(race.definition.secondaryStatModifiers);
    const startingWeaponDefinition =
        getEquipmentDefinition(race.definition.startingWeaponId);

    if (!isHandheldWeapon(startingWeaponDefinition)) {
        throw new Error(
            `Starting equipment "${race.definition.startingWeaponId}" is not a weapon.`
        );
    }

    const startingWeapon = createEquipmentInstance(
        startingWeaponDefinition,
        `${id}-starting-weapon`
    );
    const equipment: CharacterEquipment = {
        "main-hand": startingWeapon
    };

    if (!canEquipInCharacterSlot(startingWeaponDefinition.slotType, "main-hand")) {
        throw new Error(`Weapon "${startingWeaponDefinition.id}" cannot be equipped in the main hand.`);
    }

    if (getHandsRequired(startingWeaponDefinition) === 2) {
        if (!canEquipInCharacterSlot(startingWeaponDefinition.slotType, "off-hand")) {
            throw new Error(`Two-handed weapon "${startingWeaponDefinition.id}" cannot occupy the off hand.`);
        }

        equipment["off-hand"] = startingWeapon;
    }

    const baseMaxHealth = calculateDerivedStats(
        attributes,
        secondaryStats,
        0,
        0
    ).maxHealth;

    return {
        id,
        name,
        raceId: race.definition.id,
        genderId,
        level: 1,
        experience: 0,
        gold: runBonuses.startingGold,
        attributes: attributes,
        secondaryStats: secondaryStats,
        inventory: [],
        equipment,
        currentHealth: baseMaxHealth + runBonuses.bonusMaxHealth,
        encounterStats: null,
        learnedSkillIds: [],
        activeSkillIds: [],
        traitIds: [race.definition.startingTraitId]
    };
}

function isHandheldWeapon(
    definition: ReturnType<typeof getEquipmentDefinition>
): definition is HandheldEquipmentDefinition {
    return definition.slotType === "weapon"
        && "skill" in definition
        && typeof definition.skill === "string";
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
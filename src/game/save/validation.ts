import { createRng } from "../random/rng";
import { deriveSeed, RANDOM_STREAMS } from "../random/seed";
import { EQUIPMENT_SLOTS, type EquipmentSlot } from "../equipment/slots";
import {
    EQUIPMENT_MODIFIER_STATS,
    EQUIPMENT_RARITIES,
    type EquipmentModifierStat,
    type EquipmentRarity
} from "../equipment/types";
import type { GameSave } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function expectObject(value: unknown, path: string): asserts value is Record<string, unknown> {
    if (!isRecord(value)) {
        throw new Error(`Invalid GameSave: "${path}" must be an object.`);
    }
}

function expectArray(value: unknown, path: string): asserts value is unknown[] {
    if (!Array.isArray(value)) {
        throw new Error(`Invalid GameSave: "${path}" must be an array.`);
    }
}

function expectString(value: unknown, path: string): asserts value is string {
    if (typeof value !== "string") {
        throw new Error(`Invalid GameSave: "${path}" must be a string.`);
    }
}

function expectNonEmptyString(
    value: unknown,
    path: string
): asserts value is string {
    expectString(value, path);

    if (value.trim().length === 0) {
        throw new Error(`Invalid GameSave: "${path}" must not be empty.`);
    }
}

function expectFiniteNumber(value: unknown, path: string): asserts value is number {
    if (typeof value !== "number" || !Number.isFinite(value)) {
        throw new Error(`Invalid GameSave: "${path}" must be a finite number.`);
    }
}

function expectNonNegativeNumber(value: unknown, path: string): asserts value is number {
    expectFiniteNumber(value, path);
    if (value < 0) {
        throw new Error(`Invalid GameSave: "${path}" must not be negative.`);
    }
}

function expectPositiveInteger(value: unknown, path: string): asserts value is number {
    expectFiniteNumber(value, path);
    if (!Number.isInteger(value) || value < 1) {
        throw new Error(`Invalid GameSave: "${path}" must be a positive integer.`);
    }
}

function expectStringArray(
    value: unknown,
    path: string
): asserts value is string[] {
    expectArray(value, path);
    value.forEach((item, index) =>
        expectNonEmptyString(item, `${path}[${index}]`)
    );
}

function expectNumberRecord(value: unknown, path: string): asserts value is Record<string, unknown> {
    expectObject(value, path);
    for (const [key, item] of Object.entries(value)) {
        expectFiniteNumber(item, `${path}.${key}`);
    }
}

function expectRequiredKeys(
    value: Record<string, unknown>,
    keys: string[],
    path: string
): void {
    for (const key of keys) {
        if (!Object.prototype.hasOwnProperty.call(value, key)) {
            throw new Error(`Invalid GameSave: "${path}.${key}" is required.`);
        }
    }
}

function validatePermanentProgress(value: unknown): void {
    expectObject(value, "permanentProgress");
    expectNonNegativeNumber(value.prestigeCount, "permanentProgress.prestigeCount");
    if (!Number.isInteger(value.prestigeCount)) {
        throw new Error(`Invalid GameSave: "permanentProgress.prestigeCount" must be an integer.`);
    }
    expectNonNegativeNumber(value.prestigeCurrency, "permanentProgress.prestigeCurrency");
    expectStringArray(value.unlockedRaceIds, "permanentProgress.unlockedRaceIds");
    expectStringArray(value.unlockedClassIds, "permanentProgress.unlockedClassIds");
    expectStringArray(value.unlockedWorldIds, "permanentProgress.unlockedWorldIds");
    expectStringArray(value.firstClearedBossIds, "permanentProgress.firstClearedBossIds");
}

function validateEquipmentInstance(value: unknown, path: string): void {
    expectObject(value, path);
    expectNonEmptyString(value.id, `${path}.id`);
    expectNonEmptyString(value.definitionId, `${path}.definitionId`);
    if (
        typeof value.rarity !== "string" ||
        !EQUIPMENT_RARITIES.includes(value.rarity as EquipmentRarity)
    ) {
        throw new Error(`Invalid GameSave: "${path}.rarity" is not a valid equipment rarity.`);
    }
    expectPositiveInteger(value.level, `${path}.level`);
    if (value.qualityPrefixId !== undefined) {
        expectNonEmptyString(value.qualityPrefixId, `${path}.qualityPrefixId`);
    }

    expectArray(value.secondaryModifiers, `${path}.secondaryModifiers`);
    value.secondaryModifiers.forEach((modifier, index) => {
        const modifierPath = `${path}.secondaryModifiers[${index}]`;
        expectObject(modifier, modifierPath);
        if (
            typeof modifier.stat !== "string" ||
            !EQUIPMENT_MODIFIER_STATS.includes(modifier.stat as EquipmentModifierStat)
        ) {
            throw new Error(`Invalid GameSave: "${modifierPath}.stat" is not a valid equipment modifier stat.`);
        }
        expectFiniteNumber(modifier.value, `${modifierPath}.value`);
    });
}

function validateCharacter(value: unknown, path: string): void {
    expectObject(value, path);
    expectNonEmptyString(value.id, `${path}.id`);
    expectNonEmptyString(value.name, `${path}.name`);
    expectNonEmptyString(value.raceId, `${path}.raceId`);
    if (
        typeof value.genderId !== "string" ||
        !["masculine", "feminine", "neutral"].includes(value.genderId)
    ) {
        throw new Error(`Invalid GameSave: "${path}.genderId" is not a valid character gender.`);
    }
    if (value.classId !== undefined) {
        expectNonEmptyString(value.classId, `${path}.classId`);
    }

    expectPositiveInteger(value.level, `${path}.level`);
    expectNonNegativeNumber(value.experience, `${path}.experience`);
    expectNonNegativeNumber(value.gold, `${path}.gold`);
    expectNonNegativeNumber(value.currentHealth, `${path}.currentHealth`);

    if (value.encounterStats !== null) {
        expectObject(value.encounterStats, `${path}.encounterStats`);
        expectFiniteNumber(value.encounterStats.currentStamina, `${path}.encounterStats.currentStamina`);
        expectFiniteNumber(value.encounterStats.currentInitiative, `${path}.encounterStats.currentInitiative`);
    }

    expectNumberRecord(value.attributes, `${path}.attributes`);
    expectRequiredKeys(value.attributes, [
        "strength",
        "dexterity",
        "constitution",
        "intelligence",
        "wisdom",
        "charisma"
    ], `${path}.attributes`);
    expectNumberRecord(value.secondaryStats, `${path}.secondaryStats`);
    expectRequiredKeys(value.secondaryStats, [
        "luck",
        "healthRegen",
        "critChance",
        "critMultiplier"
    ], `${path}.secondaryStats`);

    expectArray(value.inventory, `${path}.inventory`);
    value.inventory.forEach((item, index) =>
        validateEquipmentInstance(item, `${path}.inventory[${index}]`)
    );

    expectObject(value.equipment, `${path}.equipment`);
    for (const [slot, item] of Object.entries(value.equipment)) {
        const itemPath = `${path}.equipment.${slot}`;

        if (!EQUIPMENT_SLOTS.includes(slot as EquipmentSlot)) {
            throw new Error(
                `Invalid GameSave: "${path}.equipment" contains unknown slot "${slot}".`
            );
        }
        validateEquipmentInstance(item, itemPath);
    }

    expectStringArray(value.learnedSkillIds, `${path}.learnedSkillIds`);
    expectStringArray(value.activeSkillIds, `${path}.activeSkillIds`);
    expectStringArray(value.traitIds, `${path}.traitIds`);
}

function validateCurrentRun(value: unknown): void {
    expectObject(value, "currentRun");
    expectNonEmptyString(value.runId, "currentRun.runId");
    expectNonEmptyString(value.runSeed, "currentRun.runSeed");

    expectObject(value.randomStates, "currentRun.randomStates");
    for (const stream of RANDOM_STREAMS) {
        if (!Object.prototype.hasOwnProperty.call(value.randomStates, stream)) {
            throw new Error(`Invalid GameSave: "currentRun.randomStates.${stream}" is required.`);
        }
        const state = value.randomStates[stream];
        expectFiniteNumber(state, `currentRun.randomStates.${stream}`);
        createRng(deriveSeed(value.runSeed, stream), state);
    }

    validateCharacter(value.character, "currentRun.character");
    expectArray(value.worldProgress, "currentRun.worldProgress");
    value.worldProgress.forEach((progress, index) => {
        const path = `currentRun.worldProgress[${index}]`;
        expectObject(progress, path);
        expectNonEmptyString(progress.worldId, `${path}.worldId`);
        expectNonEmptyString(progress.currentStageId, `${path}.currentStageId`);
        expectStringArray(progress.completedStageIds, `${path}.completedStageIds`);
    });
}

export function assertValidGameSave(value: unknown): asserts value is GameSave {
    expectObject(value, "save");
    if (typeof value.saveId !== "string" || value.saveId.length === 0) {
        throw new Error(`Invalid GameSave: "saveId" must be a non-empty string.`);
    }
    if (value.schemaVersion !== 1) {
        throw new Error(`Invalid GameSave: "schemaVersion" must be 1.`);
    }
    validatePermanentProgress(value.permanentProgress);

    if (value.currentRun !== null) {
        validateCurrentRun(value.currentRun);
    }
}

export function validateGameSave(value: unknown): value is GameSave {
    try {
        assertValidGameSave(value);
        return true;
    } catch {
        return false;
    }
}

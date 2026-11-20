import type { CharacterEquipment, EquipmentInstance } from "../equipment/types";
import type { CharacterGender } from "./naming/types";

export interface Attributes {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

export interface SecondaryStats {
    luck: number;
    healthRegen: number;
    critChance: number;
    critMultiplier: number;
}

export const DEFAULT_SECONDARY_STATS: SecondaryStats = {
    luck: 1,
    healthRegen: 0.1,
    critChance: 0.05,
    critMultiplier: 1.5
};

export interface EncounterState {
    currentStamina: number;
    currentInitiative: number;
}

export const EMPTY_ENCOUNTER_STATE: EncounterState = {
    currentStamina: 0,
    currentInitiative: 0
};

export interface Character {
    id: string;
    name: string;
    raceId: string;
    genderId: CharacterGender;

    classId?: string; //TODO add class system

    level: number;
    experience: number;
    gold: number;

    currentHealth: number; // Health will persist between encounters for now, may change later
    encounterStats: EncounterState | null;

    attributes: Attributes;
    secondaryStats: SecondaryStats;

    inventory: EquipmentInstance[];
    equipment: CharacterEquipment;

    learnedSkillIds: string[];
    activeSkillIds: string[];
    traitIds: string[];
}
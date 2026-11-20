import type { CharacterGender } from "./naming/types";
import type { Skill } from "../skills/types";
import type { Trait } from "../traits/types";

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

export interface Character {
    id: string;
    name: string;
    raceId: string;
    genderId: CharacterGender;

    classId?: string; //TODO add class system

    level: number;
    experience: number;
    gold: number;

    currentHealth: number;

    attributes: Attributes;
    secondaryStats: SecondaryStats;
    startingWeaponId: string;
    totalSkills: Skill[];
    activeSkills: Skill[];
    traits: Trait[];
}
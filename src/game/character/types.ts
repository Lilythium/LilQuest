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
    damageReduction: number;
    critChance: number;
    critMultiplier: number;
}

export const DEFAULT_SECONDARY_STATS: SecondaryStats = {
    luck: 1,
    healthRegen: 0.1,
    damageReduction: 0,
    critChance: 0.05,
    critMultiplier: 1.5
};

export interface SecondaryAttributes extends SecondaryStats {
    critChance: number;
    critMultiplier: number;
}

export interface Character {
    id: string;
    name: string;
    raceId: string;
    genderId: CharacterGender;

    level: number;
    experience: number;
    gold: number;

    attributes: Attributes;
    secondaryStats: SecondaryAttributes;
    startingWeaponId: string;
}
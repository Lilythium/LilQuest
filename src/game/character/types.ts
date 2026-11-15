export interface Attributes {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

export interface Character {
    id: string;
    name: string;
    raceId: string;
    genderId: string;

    level: number;
    experience: number;
    gold: number;

    attributes: Attributes;
    runSeed: number;
}
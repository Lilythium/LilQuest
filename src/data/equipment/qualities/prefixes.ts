import type { QualityPrefix } from "../../../game/equipment/types";

// ---------- POSITIVE QUALITY PREFIXES ----------

export const shiny: QualityPrefix = {
    id: "shiny",
    name: "Shiny",
    description: "Provides additional charisma.",
    polarity: "positive",
    spawnWeight: 3,
    statModifiers: {
        charisma: 0.5
    }
};

export const sharp: QualityPrefix = {
    id: "sharp",
    name: "Sharp",
    description: "Provides additional Strength.",
    polarity: "positive",
    spawnWeight: 3,
    statModifiers: {
        strength: 0.5
    },
    allowedSlots: ["weapon"]
};

export const sturdy: QualityPrefix = {
    id: "sturdy",
    name: "Sturdy",
    description: "Provides additional constitution.",
    polarity: "positive",
    spawnWeight: 2,
    statModifiers: {
        constitution: 2
    },
    allowedSlots: ["armour"]
};

export const agile: QualityPrefix = {
    id: "agile",
    name: "Agile",
    description: "Provides additional dexterity.",
    polarity: "positive",
    spawnWeight: 2,
    statModifiers: {
        dexterity: 2
    },
    allowedSlots: ["accessory"]
};

export const scholarly: QualityPrefix = {
    id: "scholarly",
    name: "Scholarly",
    description: "Provides additional intelligence.",
    polarity: "positive",
    spawnWeight: 1,
    statModifiers: {
        intelligence: 2
    },
    allowedSlots: ["helm", "accessory"]
};

export const perceptive: QualityPrefix = {
    id: "perceptive",
    name: "Perceptive",
    description: "Provides additional wisdom.",
    polarity: "positive",
    spawnWeight: 2,
    statModifiers: {
        wisdom: 2
    },
    allowedSlots: ["helm", "accessory"]
};

export const commanding: QualityPrefix = {
    id: "commanding",
    name: "Commanding",
    description: "Provides additional charisma.",
    polarity: "positive",
    spawnWeight: 1,
    statModifiers: {
        constitution: 0.5,
        charisma: 2
    },
    allowedSlots: ["helm", "accessory"]
};

export const godly: QualityPrefix = {
    id: "godly",
    name: "Godly",
    description: "All base attributes up",
    polarity: "positive",
    spawnWeight: 0.1,
    statModifiers: {
        strength: 0.33,
        dexterity: 0.33,
        constitution: 0.33,
        intelligence: 0.33,
        wisdom: 0.33,
        charisma: 0.33
    },
};

// ---------- MIXED QUALITY PREFIXES ----------

export const volatile: QualityPrefix = {
    id: "volatile",
    name: "Volatile",
    description: "Provides additional strength but reduces constitution.",
    polarity: "mixed",
    spawnWeight: 2,
    statModifiers: {
        strength: 2,
        constitution: -1
    },
    allowedSlots: ["weapon"]
};

export const nimble: QualityPrefix = {
    id: "nimble",
    name: "Nimble",
    description: "Provides additional dexterity but reduces strength.",
    polarity: "mixed",
    spawnWeight: 2,
    statModifiers: {
        dexterity: 2,
        strength: -1
    },
    allowedSlots: ["accessory", "greaves"]
};

export const arcane: QualityPrefix = {
    id: "arcane",
    name: "Arcane",
    description: "Provides additional intelligence but reduces wisdom.",
    polarity: "mixed",
    spawnWeight: 2,
    statModifiers: {
        intelligence: 2,
        wisdom: -1
    },
    allowedSlots: ["helm", "accessory"]
};

export const godlessArmour: QualityPrefix = {
    id: "godless-armour",
    name: "Godless",
    description: "Constitution up dexterity down",
    polarity: "mixed",
    spawnWeight: 0.1,
    statModifiers: {
        constitution: 4,
        dexterity: -3,
    },
    allowedSlots: ["armour"]
};

export const godlessWeapon: QualityPrefix = {
    id: "godless-weapon",
    name: "Godless",
    description: "Strength up constitution down",
    polarity: "mixed",
    spawnWeight: 0.1,
    statModifiers: {
        strength: 4,
        constitution: -3,
    },
    allowedSlots: ["weapon"]
};

export const godlessAccessory: QualityPrefix = {
    id: "godless-accessory",
    name: "Godless",
    description: "Wisdom and intelligence up, constitution down",
    polarity: "mixed",
    spawnWeight: 0.1,
    statModifiers: {
        wisdom: 4,
        intelligence: 4,
        constitution: -3,
    },
    allowedSlots: ["accessory"]
};

// ---------- NEGATIVE QUALITY PREFIXES ----------

export const brittle: QualityPrefix = {
    id: "brittle",
    name: "Brittle",
    description: "Reduces constitution.",
    polarity: "negative",
    spawnWeight: 2,
    statModifiers: {
        constitution: -2
    },
    allowedSlots: ["armour"]
};

export const brittleWeapon: QualityPrefix = {
    id: "brittle-weapon",
    name: "Brittle",
    description: "Reduces dexterity.",
    polarity: "negative",
    spawnWeight: 2,
    statModifiers: {
        dexterity: -2
    },
    allowedSlots: ["weapon"]
};

export const dull: QualityPrefix = {
    id: "dull",
    name: "Dull",
    description: "Reduces strength.",
    polarity: "negative",
    spawnWeight: 2,
    statModifiers: {
        strength: -1
    },
    allowedSlots: ["weapon"]
};

export const cumbersome: QualityPrefix = {
    id: "cumbersome",
    name: "Cumbersome",
    description: "Reduces dexterity.",
    polarity: "negative",
    spawnWeight: 2,
    statModifiers: {
        dexterity: -2
    },
    allowedSlots: ["armour"]
};

export const cursed: QualityPrefix = {
    id: "cursed",
    name: "Cursed",
    description: "Reduces wisdom.",
    polarity: "negative",
    spawnWeight: 2,
    statModifiers: {
        wisdom: -1
    }
};
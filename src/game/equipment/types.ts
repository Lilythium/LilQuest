import type {
    CharacterEquipmentSlot,
    EquipmentSlotFilter,
    EquipmentSlotType
} from "./slots";

export const EQUIPMENT_RARITIES = [
    "common",
    "uncommon",
    "rare",
    "epic",
    "legendary",
    "unique"
] as const;

export type EquipmentRarity = typeof EQUIPMENT_RARITIES[number];

export const EQUIPMENT_MODIFIER_STATS = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",
    "luck",
    "healthRegen",
    "critChance",
    "critMultiplier",
    "armour",
    "magicResistance",
    "damageReduction"
] as const;

export type EquipmentModifierStat = typeof EQUIPMENT_MODIFIER_STATS[number];

export interface EquipmentDefinition {
    id: string;
    name: string;
    description: string;
    slotType: EquipmentSlotType;

    primaryModifier: EquipmentStatModifier;
    secondaryModifierPool: readonly EquipmentModifierStat[];

    weight: number;
}

export interface ArmourDefinition extends EquipmentDefinition {
    slotType: "helm" | "chestplate" | "greaves" | "boots";
    armourValue: number;
}

export interface HandheldEquipmentDefinition
    extends EquipmentDefinition {
    slotType: "weapon" | "shield";
    skill: string;
    handsRequired?: 1 | 2;
}

export function getHandsRequired(
    definition: HandheldEquipmentDefinition
): 1 | 2 {
    return definition.handsRequired ?? 1;
}

export interface UniqueEquipmentDefinition
    extends EquipmentDefinition {
    rarity: "unique";
    passiveId: string;
}

export interface EquipmentInstance {
    id: string;
    definitionId: string;
    rarity: EquipmentRarity;
    secondaryModifiers: EquipmentStatModifier[];
    qualityPrefixId?: string;
    level: number;
}

export type CharacterEquipment = Partial<
    Record<CharacterEquipmentSlot, EquipmentInstance>
>;

export type QualityPolarity =
    | "positive"
    | "mixed"
    | "negative";

export interface QualityPrefix {
    id: string;
    name: string;
    description: string;
    polarity: QualityPolarity;
    statModifiers: Partial<
        Record<EquipmentModifierStat, number>
    >;
    allowedSlots?: readonly EquipmentSlotFilter[];
    spawnWeight: number;
}
export interface RarityConfig {
    additionalAttributeCount: number;
    dropWeight: number;
}

export const rarityConfig: Record<EquipmentRarity, RarityConfig> = {
    common: {
        additionalAttributeCount: 0,
        dropWeight: 100
    },
    uncommon: {
        additionalAttributeCount: 1,
        dropWeight: 40
    },
    rare: {
        additionalAttributeCount: 2,
        dropWeight: 15
    },
    epic: {
        additionalAttributeCount: 3,
        dropWeight: 5
    },
    legendary: {
        additionalAttributeCount: 4,
        dropWeight: 1
    },
    unique: {
        additionalAttributeCount: 5,
        dropWeight: 0.5
    }
};

export interface StatModifier<T extends string> {
    stat: T;
    value: number;
}

export interface EquipmentStatModifier {
    stat: EquipmentModifierStat;
    value: number;
}

export interface ArmourSetDefinition {
    id: string;
    name: string;
    description: string;

    helm: ArmourDefinition;
    chestplate: ArmourDefinition;
    greaves: ArmourDefinition;
    boots: ArmourDefinition;
}
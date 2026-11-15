import type {
    CharacterEquipmentSlot,
    EquipmentSlotFilter,
    EquipmentSlotType
} from "./slots";
import type { Attributes, SecondaryStats } from "../character/types";
import type { Skill } from "../skills/types";

export interface EquipmentDefinition {
    id: string;
    name: string;
    description: string;
    slotType: EquipmentSlotType;

    primaryAttribute: EquipmentStatModifier;
    secondaryModifierPool: readonly EquipmentStatModifier["stat"][];

    weight: number;
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

export interface QualityPrefix {
    id: string;
    name: string;
    description: string;
    statModifiers: Partial<Record<EquipmentStatModifier["stat"], number>>;
    allowedSlots?: readonly EquipmentSlotFilter[];
}

export type EquipmentRarity =
    | "common"
    | "uncommon"
    | "rare"
    | "epic"
    | "legendary"
    | "unique";

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

export type StatKey =
    | keyof Attributes
    | keyof SecondaryStats;

export interface EquipmentStatModifier {
    stat: StatKey;
    value: number;
}

export interface ArmourSetDefinition {
    id: string;
    name: string;
    description: string;

    helm: EquipmentDefinition;
    chestplate: EquipmentDefinition;
    greaves: EquipmentDefinition;
}
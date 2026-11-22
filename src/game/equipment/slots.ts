
export type EquipmentSlotType =
    | "helm"
    | "chestplate"
    | "greaves"
    | "boots"
    | "amulet"
    | "ring"
    | "weapon"
    | "shield";

export type EquipmentCategory = "weapon" | "armour" | "accessory";
export type EquipmentSlotFilter = EquipmentSlotType | EquipmentCategory;

export const EQUIPMENT_SLOTS = [
    "helm",
    "chestplate",
    "greaves",
    "boots",
    "amulet",
    "main-hand",
    "off-hand",
    "left-ring",
    "right-ring"
] as const;

export type CharacterEquipmentSlot = typeof EQUIPMENT_SLOTS[number];
export type EquipmentSlot = CharacterEquipmentSlot;

type CharacterEquipmentSlotTypes = Record<
    CharacterEquipmentSlot,
    EquipmentSlotType | readonly EquipmentSlotType[]
>;

export const CHARACTER_EQUIPMENT_SLOT_TYPES = {
    helm: "helm",
    chestplate: "chestplate",
    greaves: "greaves",
    boots: "boots",
    amulet: "amulet",
    "main-hand": "weapon",
    "off-hand": ["weapon", "shield"],
    "left-ring": "ring",
    "right-ring": "ring"
} as const satisfies CharacterEquipmentSlotTypes;

export const EQUIPMENT_SLOT_CATEGORIES = {
    helm: "armour",
    chestplate: "armour",
    greaves: "armour",
    boots: "armour",
    amulet: "accessory",
    ring: "accessory",
    weapon: "weapon",
    shield: "armour"
} as const satisfies Record<EquipmentSlotType, EquipmentCategory>;

export function getEquipmentCategory(
    equipmentSlotType: EquipmentSlotType
): EquipmentCategory {
    return EQUIPMENT_SLOT_CATEGORIES[equipmentSlotType];
}

export function equipmentSlotMatchesFilter(
    equipmentSlotType: EquipmentSlotType,
    filter: EquipmentSlotFilter
): boolean {
    return filter === equipmentSlotType || filter === getEquipmentCategory(equipmentSlotType);
}

export function canEquipInCharacterSlot(
    equipmentSlotType: EquipmentSlotType,
    characterSlot: CharacterEquipmentSlot
): boolean {
    const slotTypes = CHARACTER_EQUIPMENT_SLOT_TYPES[characterSlot];
    return Array.isArray(slotTypes)
        ? slotTypes.includes(equipmentSlotType)
        : slotTypes === equipmentSlotType;
}
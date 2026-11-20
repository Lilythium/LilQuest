
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

export type CharacterEquipmentSlot =
    | "helm"
    | "chestplate"
    | "greaves"
    | "amulet"
    | "main-hand"
    | "off-hand"
    | "left-ring"
    | "right-ring";

export type EquipmentSlot = CharacterEquipmentSlot;

export const characterEquipmentSlotTypes = {
    helm: "helm",
    chestplate: "chestplate",
    greaves: "greaves",
    amulet: "amulet",
    "main-hand": "weapon",
    "off-hand": "weapon",
    "left-ring": "ring",
    "right-ring": "ring"
} as const satisfies Record<CharacterEquipmentSlot, EquipmentSlotType>;

export const equipmentSlotCategories = {
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
    return equipmentSlotCategories[equipmentSlotType];
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
    return characterEquipmentSlotTypes[characterSlot] === equipmentSlotType;
}
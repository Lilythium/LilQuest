import type { EquipmentStatModifier } from "../../../game/equipment/types";
import type { EquipmentSlotFilter } from "../../../game/equipment/slots";

export type QualityPolarity =
    | "positive"
    | "mixed"
    | "negative";

export interface QualityPrefix {
    id: string;
    name: string;
    description: string;
    polarity: QualityPolarity;
    spawnWeight: number;
    statModifiers: Partial<Record<EquipmentStatModifier["stat"], number>>;
    allowedSlots?: readonly EquipmentSlotFilter[];
}


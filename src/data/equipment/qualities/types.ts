import type { EquipmentSlotFilter } from "../../../game/equipment/slots";
import type { EquipmentModifierStat } from "../../../game/equipment/types";

export type QualityPolarity =
    | "positive"
    | "mixed"
    | "negative";

export interface QualityPrefix {
    id: string;
    name: string;
    description: string;
    statModifiers: Partial<
        Record<EquipmentModifierStat, number>
    >;
    allowedSlots?: readonly EquipmentSlotFilter[];
}

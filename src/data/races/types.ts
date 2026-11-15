import type { Attributes } from "../../game/character/types";

export interface RaceDefinition {
    id: string;
    name: string;
    description: string;
    attributeMultipliers: Attributes;
}
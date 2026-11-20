import type { RaceNameRules } from "../../game/character/naming/types";
import type { Attributes, SecondaryStats } from "../../game/character/types";

export interface RaceDefinition {
    id: string;
    name: string;
    description: string;
    attributeMultipliers: Attributes;
    startingTraitId: string;
    startingWeaponId: string;
    secondaryStatModifiers?: Partial<SecondaryStats>;
}

export interface RaceContent {
    definition: RaceDefinition;
    namingRules: RaceNameRules;
}
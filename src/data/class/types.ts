import type { UnlockDefinition } from "../unlocks/types";

export interface ClassDefinition {
    id: string;
    name: string;
    description: string;

    /** Omitted means all races are eligible. */
    allowedRaceIds?: string[];

    /** All listed requirements must be satisfied. */
    unlockRequirements?: UnlockDefinition[];

    /** The single skill granted by this class. */
    classSkillId: string;
}
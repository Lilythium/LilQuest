export type UnlockRequirement =
    | {
        type: "world-completed";
        worldId: string;
    }
    | {
        type: "boss-cleared";
        bossId: string;
    }
    | {
        type: "milestone-completed";
        milestoneId: string;
    };

export interface UnlockDefinition {
    id: string;
    description: string;
    requirement: UnlockRequirement;
}
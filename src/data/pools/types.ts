export interface ContentPool {
    id: string;
    type: ContentPoolType;
    entries: ContentPoolEntry[];
}

export interface ContentPoolEntry {
    contentId: string;
    weight: number;
    unlockId?: string;
    // The entry is only eligible within this difficulty range.
    minDifficulty?: number;
    maxDifficulty?: number;
}

export type ContentPoolType =
    | "basic-enemy"
    | "elite-modifier"
    | "mini-boss"
    | "equipment";
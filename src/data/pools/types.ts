export interface ContentPool {
    id: string;
    type: ContentPoolType;
    entries: ContentPoolEntry[];
}

export interface ContentPoolEntry {
    contentId: string;
    weight: number;
    unlockId?: string;
}

export type ContentPoolType =
    | "basic-enemy"
    | "elite-enemy"
    | "mini-boss"
    | "equipment";
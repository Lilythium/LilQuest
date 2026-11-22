import type { ClassDefinition } from "./types";

export const CLASSES: Record<string, ClassDefinition> = {};

export function getClass(classId: string): ClassDefinition {
    const characterClass = CLASSES[classId];

    if (!characterClass) {
        throw new Error(`Class "${classId}" does not exist.`);
    }

    return characterClass;
}
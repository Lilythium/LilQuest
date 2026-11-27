import type { ClassDefinition } from "./types";
import { Brute } from "./brute";
import { Druid } from "./druid";
import { Priest } from "./priest";
import { Rogue } from "./rogue";
import { Warrior } from "./warrior";

export const CLASSES: Record<string, ClassDefinition> = {
    [Brute.id]: Brute,
    [Druid.id]: Druid,
    [Priest.id]: Priest,
    [Rogue.id]: Rogue,
    [Warrior.id]: Warrior
};

export function getClass(classId: string): ClassDefinition {
    const characterClass = CLASSES[classId];

    if (!characterClass) {
        throw new Error(`Class "${classId}" does not exist.`);
    }

    return characterClass;
}
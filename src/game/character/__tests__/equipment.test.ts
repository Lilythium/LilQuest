import { describe, expect, it } from "vitest";
import { getEquipmentDefinition } from "../../../data/equipment";
import { RACES } from "../../../data/races";
import { createEquipmentInstance } from "../../equipment/createInstance";
import { createRng } from "../../random/rng";
import { createCharacter } from "../createCharacter";
import { getEffectiveStats } from "../effectiveStats";

const runBonuses = {
    startingGold: 0,
    bonusMaxHealth: 0
};

describe("character equipment", () => {
    it("adds equipment attribute and secondary bonuses and armour once", () => {
        const character = createCharacter(
            RACES.human,
            "neutral",
            createRng("equipment-test"),
            runBonuses
        );
        const helm = createEquipmentInstance(
            getEquipmentDefinition("iron-helm"),
            "iron-helm-instance"
        );
        helm.secondaryModifiers.push({ stat: "healthRegen", value: 0.3 });
        character.equipment.helm = helm;

        const effectiveStats = getEffectiveStats(character);

        expect(effectiveStats.attributes.constitution)
            .toBe(character.attributes.constitution + 1);
        expect(effectiveStats.secondaryStats.healthRegen)
            .toBeCloseTo(character.secondaryStats.healthRegen + 0.3);
        expect(effectiveStats.derived.armour).toBe(2);
    });

    it("equips each race's starting weapon in its required hand slots", () => {
        const startingWeapons = [
            [RACES.human, "short-iron", false],
            [RACES.elf, "split-wood-bow", true],
            [RACES.orc, "oak-cudgel", true]
        ] as const;

        for (const [race, expectedWeaponId, isTwoHanded] of startingWeapons) {
            const character = createCharacter(
                race,
                "neutral",
                createRng(`starting-weapon-${race.definition.id}`),
                runBonuses
            );
            const mainHand = character.equipment["main-hand"];

            expect(mainHand?.definitionId).toBe(expectedWeaponId);

            if (isTwoHanded) {
                expect(character.equipment["off-hand"]?.id).toBe(mainHand?.id);
            } else {
                expect(character.equipment["off-hand"]).toBeUndefined();
            }
        }
    });
});

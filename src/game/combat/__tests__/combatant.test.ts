import { describe, expect, it } from "vitest";
import { RACES } from "../../../data/races";
import { createCharacter } from "../../character/createCharacter";
import { createRng } from "../../random/rng";
import { INITIATIVE_CAP } from "../constants";
import { createPlayerCombatant } from "../createCombatant";
import { setCombatantStat } from "../stats";

const runBonuses = {
    startingGold: 0,
    bonusMaxHealth: 0
};

describe("player combatants", () => {
    it("uses the starting weapon skill and effective equipment stats", () => {
        const character = createCharacter(
            RACES.human,
            "neutral",
            createRng("combatant-test"),
            runBonuses
        );
        character.activeSkillIds = ["slash", "mend", "slash"];

        const combatant = createPlayerCombatant(character);

        expect(combatant.skillIds).toEqual(["slash", "mend"]);
        expect(combatant.derived.carryingCapacity).toBe(
            5 + (character.attributes.strength + 5) * 1.5
        );
        expect(combatant.encounter.currentStamina)
            .toBe(combatant.derived.maxStamina);
    });

    it("clamps health, stamina, and initiative when setting combatant stats", () => {
        const character = createCharacter(
            RACES.human,
            "neutral",
            createRng("combatant-stats-test"),
            runBonuses
        );
        const combatant = createPlayerCombatant(character);

        setCombatantStat(combatant, {
            target: "self",
            scope: "character",
            stat: "currentHealth"
        }, -1);
        expect(combatant.currentHealth).toBe(0);

        setCombatantStat(combatant, {
            target: "self",
            scope: "character",
            stat: "currentHealth"
        }, combatant.derived.maxHealth + 1);
        expect(combatant.currentHealth).toBe(combatant.derived.maxHealth);

        setCombatantStat(combatant, {
            target: "self",
            scope: "encounter",
            stat: "currentInitiative"
        }, -1);
        expect(combatant.encounter.currentInitiative).toBe(0);

        setCombatantStat(combatant, {
            target: "self",
            scope: "encounter",
            stat: "currentInitiative"
        }, INITIATIVE_CAP + 1);
        expect(combatant.encounter.currentInitiative).toBe(INITIATIVE_CAP);

        setCombatantStat(combatant, {
            target: "self",
            scope: "encounter",
            stat: "currentStamina"
        }, combatant.derived.maxStamina + 1);
        expect(combatant.encounter.currentStamina)
            .toBe(combatant.derived.maxStamina);
    });

    it("clamps character health to the effective maximum", () => {
        const character = createCharacter(
            RACES.human,
            "neutral",
            createRng("combatant-health-clamp-test"),
            runBonuses
        );
        character.currentHealth = 10000;

        const combatant = createPlayerCombatant(character);

        expect(combatant.currentHealth).toBe(combatant.derived.maxHealth);
    });
});

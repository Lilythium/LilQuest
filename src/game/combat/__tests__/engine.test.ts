import { describe, expect, it } from "vitest";
import { DEFAULT_SECONDARY_STATS, type Attributes } from "../../character/types";
import { createRng } from "../../random/rng";
import { runAutoCombat } from "../autoCombat";
import { advanceToNextActor, createCombat } from "../engine";
import type { Combatant, CombatSide } from "../types";

const attributes: Attributes = {
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1
};

function createTestCombatant(
    id: string,
    side: CombatSide,
    speed: number,
    skillIds: string[]
): Combatant {
    return {
        id,
        name: id,
        side,
        level: 1,
        attributes: { ...attributes },
        secondaryStats: { ...DEFAULT_SECONDARY_STATS },
        derived: {
            maxHealth: 30,
            maxStamina: 10,
            staminaRegen: 2,
            healthRegen: DEFAULT_SECONDARY_STATS.healthRegen,
            carryingCapacity: 10,
            speed,
            armour: 0,
            magicResistance: 0
        },
        currentHealth: 30,
        encounter: {
            currentStamina: 10,
            currentInitiative: 0
        },
        combat: {
            damageMultiplier: 1
        },
        skillIds,
        traitIds: [],
        statusEffects: []
    };
}

function createTestCombat(
    playerSpeed = 1,
    enemySpeed = 1,
    skillIds: string[] = []
) {
    return createCombat(
        createTestCombatant("player", "player", playerSpeed, skillIds),
        [createTestCombatant("enemy", "enemy", enemySpeed, skillIds)]
    );
}

describe("combat engine", () => {
    it("produces the same event log from the same seed", () => {
        const firstEvents = runAutoCombat(
            createTestCombat(1, 1, ["bite"]),
            createRng("deterministic-combat")
        );
        const secondEvents = runAutoCombat(
            createTestCombat(1, 1, ["bite"]),
            createRng("deterministic-combat")
        );

        expect(firstEvents).toEqual(secondEvents);
    });

    it("ends a fight with no usable skills as a stalemate", () => {
        const state = createTestCombat();
        const events = runAutoCombat(state, createRng("pass-combat"));

        expect(state.status).toBe("stalemate");
        expect(events[events.length - 1]).toEqual({
            type: "combat-end",
            status: "stalemate"
        });
    });

    it("gives a combatant with twice the speed about twice as many turns", () => {
        const state = createTestCombat(2, 1);
        const events = runAutoCombat(state, createRng("speed-combat"));
        const fasterTurns = events.filter(
            event => event.type === "turn-start" && event.actorId === "player"
        ).length;
        const slowerTurns = events.filter(
            event => event.type === "turn-start" && event.actorId === "enemy"
        ).length;

        expect(fasterTurns / slowerTurns).toBeCloseTo(2, 1);
    });

    it("breaks turn ties by initiative, speed, then player side", () => {
        const higherInitiative = createTestCombat(1, 2);
        higherInitiative.player.encounter.currentInitiative = 110;
        higherInitiative.enemies[0].encounter.currentInitiative = 100;
        expect(advanceToNextActor(higherInitiative)).toBe(higherInitiative.player);

        const higherSpeed = createTestCombat(1, 2);
        higherSpeed.player.encounter.currentInitiative = 100;
        higherSpeed.enemies[0].encounter.currentInitiative = 100;
        expect(advanceToNextActor(higherSpeed)).toBe(higherSpeed.enemies[0]);

        const playerSide = createTestCombat(1, 1);
        playerSide.player.encounter.currentInitiative = 100;
        playerSide.enemies[0].encounter.currentInitiative = 100;
        expect(advanceToNextActor(playerSide)).toBe(playerSide.player);
    });
});

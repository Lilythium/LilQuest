import type { DerivedStats } from "../character/derivedStats";
import type { DamageType } from "../../data/skills/types";

const ARMOUR_EFFECTIVENESS: Record<
    Exclude<DamageType, "true" | "magic">,
    number
> = {
    blunt: 1,
    piercing: 0.5,
    slashing: 0.75
};

const DEFENSE_SCALING = 100;

function calculateReduction(defense: number): number {
    const effectiveDefense = Math.max(0, defense);

    return effectiveDefense /
        (effectiveDefense + DEFENSE_SCALING);
}

export function calculateDamage(
    power: number,
    damageType: DamageType,
    defender: DerivedStats
): number {
    if (damageType === "true") {
        return Math.max(0, power);
    }

    let defense: number;

    switch (damageType) {
        case "blunt":
        case "piercing":
        case "slashing":
            defense =
                defender.armour *
                ARMOUR_EFFECTIVENESS[damageType];
            break;

        case "magic":
            defense =
                defender.magicResistance +
                defender.armour * 0.15;
            break;
    }

    const typeMitigatedDamage = Math.max(
        0,
        power * (1 - calculateReduction(defense))
    );

    // Values are fractions (0.05 = 5%); this is the hook where Bulwark-style effects will later apply.
    return typeMitigatedDamage * (1 - defender.damageReduction);
}
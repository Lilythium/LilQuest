import type {
    EnemyDefinition,
    EnemyRewards,
    EnemyTier,
    EliteModifierDefinition
} from "../../data/enemies/types";
import { DEFAULT_SECONDARY_STATS, type Attributes, type SecondaryStats } from "../character/types";
import { generateName } from "../character/naming/nameGenerator";
import { getRace } from "../../data/races";
import { attributePointsAtLevel } from "../progression/levelling";
import type { RandomGenerator } from "../random/rng";
import { weightedPick } from "../random/weighted";
import { calculateRewards } from "./rewards";

export interface GeneratedEnemy {
    definitionId: string;
    tier: EnemyTier;
    name: string;
    typeName: string;
    level: number;
    attributes: Attributes;
    secondaryStats: SecondaryStats;
    armour: number;
    skillIds: string[];
    traitIds: string[];
    rewards: EnemyRewards;
}

const ATTRIBUTE_NAMES = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma"
] as const satisfies readonly (keyof Attributes)[];

export function generateEnemy(
    definition: EnemyDefinition,
    level: number,
    rng: RandomGenerator,
    elite?: EliteModifierDefinition
): GeneratedEnemy {
    const attributes: Attributes = { ...definition.baseAttributes };
    const points = attributePointsAtLevel(level);
    const growthWeights = ATTRIBUTE_NAMES.map(attribute => ({
        item: attribute,
        weight: definition.attributeGrowth[attribute]
    }));

    for (let point = 0; point < points; point++) {
        const attribute = weightedPick(rng, growthWeights);
        attributes[attribute]++;
    }

    const tier: EnemyTier = elite ? "elite" : definition.tier;
    if (elite) {
        for (const attribute of ATTRIBUTE_NAMES) {
            attributes[attribute] = Math.max(
                1,
                Math.round(
                    attributes[attribute] * elite.attributeMultiplier[attribute]
                )
            );
        }
    }

    let name = definition.name;
    if (definition.naming === "generated") {
        const race = getRace(definition.raceId);
        const gender = rng.pick(["masculine", "feminine"] as const);
        const personalName = generateName(race.namingRules, gender, rng);
        name = elite
            ? `${personalName} the ${elite.title}`
            : personalName;
    } else if (elite) {
        name = `${elite.title} ${definition.name}`;
    }

    const secondaryStats: SecondaryStats = {
        ...DEFAULT_SECONDARY_STATS,
        ...definition.secondaryStats
    };

    return {
        definitionId: definition.id,
        tier,
        name,
        typeName: definition.name,
        level,
        attributes,
        secondaryStats,
        armour: definition.armour ?? 0,
        skillIds: [...new Set([
            ...definition.skillIds,
            ...(elite?.addedSkillIds ?? [])
        ])],
        traitIds: [...new Set([
            ...(definition.traitIds ?? []),
            ...(elite?.addedTraitIds ?? [])
        ])],
        rewards: calculateRewards(definition.rewards, tier, level, elite)
    };
}

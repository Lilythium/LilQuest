import { getEliteModifier, getEnemy } from "../../data/enemies";
import type { ContentPoolEntry, ContentPoolType } from "../../data/pools/types";
import { getPool } from "../../data/pools";
import type { WorldDefinition } from "../../data/worlds/types";
import type {
    MapStageDefinition,
    StageDefinition,
    StageMapGenerationConfig,
    StageNodeRequirement,
    StageNodeType
} from "../../data/worlds/stages/types";
import { getEffectiveDifficulty } from "../difficulty/difficulty";
import type { RandomGenerator } from "../random/rng";
import { weightedPick } from "../random/weighted";
import type { EncounterSpec, StageMap, StageMapNode } from "./types";

interface SectionLinks {
    starts: string[];
    tails: string[];
    terminalExitIds: Map<string, string | undefined>;
}

function pickPoolEntry(
    poolId: string,
    expectedType: ContentPoolType,
    difficulty: number,
    rng: RandomGenerator
): ContentPoolEntry {
    const pool = getPool(poolId);
    if (pool.type !== expectedType) {
        throw new Error(
            `Pool "${poolId}" has type "${pool.type}", expected "${expectedType}".`
        );
    }

    const eligibleEntries = pool.entries.filter(entry => {
        // Unlock evaluation is not available yet, so locked entries are excluded.
        return entry.unlockId === undefined
            && difficulty >= (entry.minDifficulty ?? Number.NEGATIVE_INFINITY)
            && difficulty <= (entry.maxDifficulty ?? Number.POSITIVE_INFINITY);
    });

    if (eligibleEntries.length === 0) {
        throw new Error(
            `Pool "${poolId}" has no eligible entries at difficulty ${difficulty}.`
        );
    }

    return weightedPick(
        rng,
        eligibleEntries.map(entry => ({
            item: entry,
            weight: entry.weight
        }))
    );
}

function generateEncounterSpec(
    world: WorldDefinition,
    stage: MapStageDefinition,
    node: StageNodeRequirement,
    difficulty: number,
    rng: RandomGenerator
): EncounterSpec {
    const basicEnemyPoolId =
        stage.contentOverrides?.basicEnemyPoolId
        ?? world.content.basicEnemyPoolId;
    const enemyEntry = pickPoolEntry(
        basicEnemyPoolId,
        "basic-enemy",
        difficulty,
        rng
    );
    const enemy = getEnemy(enemyEntry.contentId);

    if (node.contentTag === "elite") {
        const eliteModifierPoolId =
            stage.contentOverrides?.eliteModifierPoolId
            ?? world.content.eliteModifierPoolId;
        const modifierEntry = pickPoolEntry(
            eliteModifierPoolId,
            "elite-modifier",
            difficulty,
            rng
        );
        const eliteModifier = getEliteModifier(modifierEntry.contentId);

        return {
            enemyId: enemy.id,
            tier: "elite",
            eliteModifierId: eliteModifier.id,
            levelRoll: rng.next()
        };
    }

    return {
        enemyId: enemy.id,
        tier: "basic",
        levelRoll: rng.next()
    };
}

function createNode(
    id: string,
    requirement: StageNodeRequirement,
    world: WorldDefinition,
    stage: MapStageDefinition,
    difficulty: number,
    rng: RandomGenerator
): StageMapNode {
    const node: StageMapNode = {
        id,
        type: requirement.nodeType,
        next: []
    };

    if (requirement.contentTag !== undefined) {
        node.contentTag = requirement.contentTag;
    }

    if (requirement.nodeType === "encounter") {
        node.encounter = generateEncounterSpec(
            world,
            stage,
            requirement,
            difficulty,
            rng
        );
    }

    return node;
}

function addNode(nodes: Record<string, StageMapNode>, node: StageMapNode): void {
    if (Object.prototype.hasOwnProperty.call(nodes, node.id)) {
        throw new Error(`Generated duplicate stage node id "${node.id}".`);
    }

    nodes[node.id] = node;
}

function validateRouteLimits(
    stageId: string,
    generation: StageMapGenerationConfig,
    map: StageMap
): void {
    const occurrences = new Map<StageNodeType, number>();

    function visit(nodeId: string): void {
        const node = map.nodes[nodeId];
        const count = (occurrences.get(node.type) ?? 0) + 1;
        occurrences.set(node.type, count);

        const limit = generation.maxOccurrencesPerPath?.[node.type];
        if (limit !== undefined && count > limit) {
            throw new Error(
                `Stage "${stageId}" route exceeds the ${node.type} limit of ${limit}.`
            );
        }

        for (const nextId of node.next) {
            visit(nextId);
        }

        occurrences.set(node.type, count - 1);
    }

    visit(map.startNodeId);
}

function generateMapStage(
    world: WorldDefinition,
    stage: MapStageDefinition,
    rng: RandomGenerator
): StageMap {
    const sections = stage.mapGeneration.sections;
    if (sections.length === 0 || sections[0].type !== "sequence") {
        throw new Error(`Stage "${stage.id}" must begin with a sequence section.`);
    }

    const nodes: Record<string, StageMapNode> = {};
    let previousTails: string[] = [];
    let startNodeId = "";
    let finalSectionLinks: SectionLinks | undefined;
    const difficulty = getEffectiveDifficulty(world, stage);

    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
        const section = sections[sectionIndex];
        const links: SectionLinks = {
            starts: [],
            tails: [],
            terminalExitIds: new Map()
        };

        if (section.type === "sequence") {
            if (section.nodes.length === 0) {
                throw new Error(
                    `Stage "${stage.id}" sequence section ${sectionIndex} must contain at least one node.`
                );
            }

            const ids = section.nodes.map((requirement, nodeIndex) => {
                const id = `${stage.id}:s${sectionIndex}-${nodeIndex}`;
                addNode(
                    nodes,
                    createNode(id, requirement, world, stage, difficulty, rng)
                );
                return id;
            });

            for (let index = 0; index < ids.length - 1; index++) {
                nodes[ids[index]].next.push(ids[index + 1]);
            }

            links.starts = [ids[0]];
            links.tails = [ids[ids.length - 1]];
            links.terminalExitIds.set(ids[ids.length - 1], "default");
        } else {
            if (section.paths.length === 0) {
                throw new Error(
                    `Stage "${stage.id}" branch section ${sectionIndex} must contain at least one path.`
                );
            }

            for (const path of section.paths) {
                if (path.nodes.length === 0) {
                    throw new Error(
                        `Stage "${stage.id}" branch path "${path.id}" must contain at least one node.`
                    );
                }

                const ids = path.nodes.map((requirement, nodeIndex) => {
                    const id =
                        `${stage.id}:s${sectionIndex}-${path.id}-${nodeIndex}`;
                    addNode(
                        nodes,
                        createNode(id, requirement, world, stage, difficulty, rng)
                    );
                    return id;
                });

                for (let index = 0; index < ids.length - 1; index++) {
                    nodes[ids[index]].next.push(ids[index + 1]);
                }

                links.starts.push(ids[0]);
                links.tails.push(ids[ids.length - 1]);
                links.terminalExitIds.set(
                    ids[ids.length - 1],
                    path.exitId
                );
            }
        }

        if (sectionIndex === 0) {
            startNodeId = links.starts[0];
        } else {
            for (const tailId of previousTails) {
                nodes[tailId].next.push(...links.starts);
            }
        }

        previousTails = links.tails;
        finalSectionLinks = links;
    }

    if (!finalSectionLinks) {
        throw new Error(`Stage "${stage.id}" has no sections.`);
    }

    for (const tailId of finalSectionLinks.tails) {
        nodes[tailId].exitId =
            finalSectionLinks.terminalExitIds.get(tailId) ?? "default";
    }

    const map: StageMap = {
        stageId: stage.id,
        startNodeId,
        nodes
    };
    validateRouteLimits(stage.id, stage.mapGeneration, map);
    return map;
}

export function generateStageMap(
    world: WorldDefinition,
    stage: StageDefinition,
    rng: RandomGenerator
): StageMap {
    if (stage.type === "encounter") {
        const id = `${stage.id}:boss`;
        return {
            stageId: stage.id,
            startNodeId: id,
            nodes: {
                [id]: {
                    id,
                    type: "encounter",
                    next: [],
                    exitId: "default",
                    encounter: {
                        enemyId: stage.encounterId,
                        tier: "boss",
                        levelRoll: rng.next()
                    }
                }
            }
        };
    }

    return generateMapStage(world, stage, rng);
}

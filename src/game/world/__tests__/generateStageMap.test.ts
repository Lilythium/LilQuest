import { afterEach, describe, expect, it } from "vitest";
import { ENEMIES, ELITE_MODIFIERS } from "../../../data/enemies";
import type { ContentPool } from "../../../data/pools/types";
import { POOLS } from "../../../data/pools";
import { FirstWorld } from "../../../data/worlds/firstWorld";
import { getStage } from "../../../data/worlds/stages";
import type {
    MapStageDefinition,
    StageNodeType
} from "../../../data/worlds/stages/types";
import type { WorldDefinition } from "../../../data/worlds/types";
import { createRng } from "../../random/rng";
import { generateStageMap } from "../generateStageMap";
import type { StageMap } from "../types";

const temporaryPoolId = "test-stage-map-eligibility";

afterEach(() => {
    delete POOLS[temporaryPoolId];
});

function generateWholeWorld(seed: string): Record<string, StageMap> {
    const rng = createRng(seed);
    return Object.fromEntries(
        FirstWorld.stages.map(({ stageId }) => [
            stageId,
            generateStageMap(FirstWorld, getStage(stageId), rng)
        ])
    );
}

function expectRouteLimits(
    map: StageMap,
    stage: MapStageDefinition
): void {
    const limits = stage.mapGeneration.maxOccurrencesPerPath ?? {};

    function visit(
        nodeId: string,
        occurrences: Partial<Record<StageNodeType, number>>
    ): void {
        const node = map.nodes[nodeId];
        const count = (occurrences[node.type] ?? 0) + 1;
        const routeOccurrences = {
            ...occurrences,
            [node.type]: count
        };
        const limit = limits[node.type];

        if (limit !== undefined) {
            expect(count).toBeLessThanOrEqual(limit);
        }

        for (const nextId of node.next) {
            visit(nextId, routeOccurrences);
        }
    }

    visit(map.startNodeId, {});
}

function createMapStage(
    id: string,
    mapGeneration: MapStageDefinition["mapGeneration"]
): MapStageDefinition {
    return {
        id,
        type: "map",
        name: id,
        description: id,
        difficulty: { difficultyOffset: 0 },
        mapGeneration
    };
}

describe("generateStageMap", () => {
    it("generates reachable first-world maps with valid links, exits, and route limits", () => {
        const rng = createRng("first-world-map-validation");

        for (const { stageId } of FirstWorld.stages) {
            const stage = getStage(stageId);
            const map = generateStageMap(FirstWorld, stage, rng);
            const incomingCounts = new Map(
                Object.keys(map.nodes).map(nodeId => [nodeId, 0])
            );

            for (const node of Object.values(map.nodes)) {
                for (const nextId of node.next) {
                    expect(map.nodes[nextId]).toBeDefined();
                    incomingCounts.set(nextId, incomingCounts.get(nextId)! + 1);
                }
            }

            expect(
                [...incomingCounts.values()].filter(count => count === 0)
            ).toHaveLength(1);
            expect(incomingCounts.get(map.startNodeId)).toBe(0);

            const reachable = new Set<string>();
            function visit(nodeId: string): void {
                if (reachable.has(nodeId)) {
                    return;
                }
                reachable.add(nodeId);
                for (const nextId of map.nodes[nodeId].next) {
                    visit(nextId);
                }
            }
            visit(map.startNodeId);
            expect(reachable.size).toBe(Object.keys(map.nodes).length);

            const terminals = Object.values(map.nodes).filter(
                node => node.next.length === 0
            );
            expect(terminals.length).toBeGreaterThan(0);
            expect(terminals.every(node => node.exitId !== undefined)).toBe(true);

            if (stage.type === "map") {
                expectRouteLimits(map, stage);
            }
        }

        const riverTerminals = Object.values(
            generateStageMap(
                FirstWorld,
                getStage("sparkling-river"),
                createRng("river-terminals")
            ).nodes
        ).filter(node => node.next.length === 0);
        expect(riverTerminals).toHaveLength(2);
        expect(riverTerminals.map(node => node.exitId)).toEqual([
            "default",
            "default"
        ]);
    });

    it("generates the whole world deterministically from the same seed", () => {
        expect(generateWholeWorld("whole-world-seed"))
            .toEqual(generateWholeWorld("whole-world-seed"));
    });

    it("marks elite encounters and generates the forest boss node", () => {
        const maps = generateWholeWorld("elite-node-seed");
        let foundElite = false;

        for (const map of Object.values(maps)) {
            for (const node of Object.values(map.nodes)) {
                if (node.type !== "encounter" || !node.encounter) {
                    continue;
                }

                if (node.contentTag === "elite") {
                    foundElite = true;
                    expect(node.encounter.tier).toBe("elite");
                    expect(
                        ELITE_MODIFIERS[node.encounter.eliteModifierId!]
                    ).toBeDefined();
                } else if (node.encounter.tier !== "boss") {
                    expect(node.encounter.tier).toBe("basic");
                    expect(node.encounter.eliteModifierId).toBeUndefined();
                    expect(ENEMIES[node.encounter.enemyId]).toBeDefined();
                }
            }
        }
        expect(foundElite).toBe(true);

        const bossMap = maps["forest-boss"];
        expect(Object.keys(bossMap.nodes)).toEqual(["forest-boss:boss"]);
        expect(bossMap.startNodeId).toBe("forest-boss:boss");
        expect(bossMap.nodes["forest-boss:boss"]).toMatchObject({
            type: "encounter",
            next: [],
            exitId: "default",
            encounter: {
                enemyId: "forest-guardian",
                tier: "boss"
            }
        });
        expect(bossMap.nodes["forest-boss:boss"].encounter?.levelRoll)
            .toBeGreaterThanOrEqual(0);
        expect(bossMap.nodes["forest-boss:boss"].encounter?.levelRoll)
            .toBeLessThan(1);
    });

    it("excludes locked and out-of-range pool entries", () => {
        const temporaryPool: ContentPool = {
            id: temporaryPoolId,
            type: "basic-enemy",
            entries: [
                {
                    contentId: "forest-rat",
                    weight: 100,
                    unlockId: "future-unlock"
                },
                {
                    contentId: "forest-rat",
                    weight: 100,
                    minDifficulty: 2
                },
                {
                    contentId: "forest-rat",
                    weight: 100,
                    maxDifficulty: 0
                },
                {
                    contentId: "forest-bandit",
                    weight: 1
                }
            ]
        };
        POOLS[temporaryPoolId] = temporaryPool;

        const world: WorldDefinition = {
            ...FirstWorld,
            content: {
                ...FirstWorld.content,
                basicEnemyPoolId: temporaryPoolId
            }
        };
        const stage = createMapStage("pool-filter-stage", {
            sections: [{
                type: "sequence",
                nodes: [{ nodeType: "encounter" }]
            }]
        });
        const map = generateStageMap(world, stage, createRng("eligible-pool"));

        expect(map.nodes[map.startNodeId].encounter?.enemyId)
            .toBe("forest-bandit");
    });

    it("rejects a first branch and routes that exceed occurrence limits", () => {
        const branchFirst = createMapStage("branch-first", {
            sections: [{
                type: "branch",
                paths: [{
                    id: "route",
                    label: "Route",
                    nodes: [{ nodeType: "rest" }]
                }]
            }]
        });
        expect(() =>
            generateStageMap(FirstWorld, branchFirst, createRng("branch-first"))
        ).toThrow(/must begin with a sequence/);

        const tooManyRestNodes = createMapStage("too-many-rests", {
            sections: [{
                type: "sequence",
                nodes: [
                    { nodeType: "rest" },
                    { nodeType: "rest" }
                ]
            }],
            maxOccurrencesPerPath: { rest: 1 }
        });
        expect(() =>
            generateStageMap(
                FirstWorld,
                tooManyRestNodes,
                createRng("too-many-rests")
            )
        ).toThrow(/rest limit/);
    });
});

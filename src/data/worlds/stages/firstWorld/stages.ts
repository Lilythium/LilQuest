
import type { StageDefinition } from "../types";

export const firstWorldStages: StageDefinition[] = [
    // ROLLING HILLS
    {
        id: "rolling-hills",
        type: "map",
        name: "Rolling Hills",
        description: "A serene landscape of gently rolling hills, dotted with wildflowers and small streams.",
        difficulty: {
            difficultyOffset: -1
        },
        mapGeneration: {
            sections: [
                {
                    type: "sequence",
                    nodes: [
                        { nodeType: "encounter" },
                        { nodeType: "encounter" }
                    ]
                },
                {
                    type: "branch",
                    paths: [
                        {
                            id: "storefront",
                            label: "Visit the Storefront",
                            nodes: [
                                { nodeType: "storefront" }
                            ]
                        },
                        {
                            id: "exploration",
                            label: "Explore the Hills",
                            nodes: [
                                { nodeType: "interaction", contentTag: "rare-reward" }
                            ]
                        }
                    ]
                },
                {
                    type: "sequence",
                    nodes: [
                        { nodeType: "encounter" },
                        { nodeType: "encounter" }
                    ]
                }
            ]
        }
    },

    // FOREST EDGE
    {
        id: "forest-edge",
        type: "map",
        name: "Forest Edge",
        description: "The edge of the forest, where the trees begin to thicken and the wildlife becomes more abundant.",
        difficulty: {
            difficultyOffset: 0
        },
        mapGeneration: {
            maxOccurrencesPerPath: {
                treasure: 1,
                interaction: 1
            },
            sections: [
                {
                    type: "sequence",
                    nodes: [
                        { nodeType: "encounter" },
                        { nodeType: "encounter" },
                        { nodeType: "encounter" },
                        { nodeType: "storefront" },
                        { nodeType: "rest" }
                    ]
                },
                {
                    type: "branch",
                    paths: [
                        {
                            id: "treasure-route",
                            label: "Explore the Hidden Clearing",
                            nodes: [
                                { nodeType: "treasure" },
                                { nodeType: "encounter" }
                            ]
                        },
                        {
                            id: "shrine-route",
                            label: "Visit the Woodland Shrine",
                            nodes: [
                                { nodeType: "interaction", contentTag: "buff" },
                                { nodeType: "encounter" }
                            ]
                        }
                    ]
                },
                {
                    type: "sequence",
                    nodes: [
                        { nodeType: "encounter", contentTag: "elite" },
                        { nodeType: "encounter" }
                    ]
                }
            ]
        }
    },

    // DENSE FOREST
    {
        id: "dense-forest",
        type: "map",
        name: "Dense Forest",
        description: "A thick and mysterious forest, filled with ancient trees and hidden dangers.",
        difficulty: {
            difficultyOffset: 1
        },
        mapGeneration: {
            sections: [
                {
                    type: "sequence",
                    nodes: [
                        { nodeType: "encounter" },
                        { nodeType: "encounter" }
                    ]
                },
                {
                    type: "branch",
                    paths: [
                        {
                            id: "safe-route",
                            label: "Follow the Forest Path",
                            nodes: [
                                { nodeType: "interaction", contentTag: "discovery" },
                                { nodeType: "rest" },
                                { nodeType: "encounter" }
                            ]
                        },
                        {
                            id: "deep-route",
                            label: "Venture Deeper",
                            nodes: [
                                { nodeType: "encounter" },
                                { nodeType: "encounter" },
                                { nodeType: "encounter", contentTag: "elite" }
                            ]
                        }
                    ]
                },
                {
                    type: "sequence",
                    nodes: [
                        { nodeType: "encounter" }
                    ]
                }
            ]
        }
    },

    // SPARKLING RIVER
    {
        id: "sparkling-river",
        type: "map",
        name: "Sparkling River",
        description: "A crystal-clear river, surrounded by lush vegetation and home to various aquatic creatures.",
        difficulty: {
            difficultyOffset: 0
        },
        mapGeneration: {
            sections: [
                {
                    type: "sequence",
                    nodes: [
                        { nodeType: "encounter" },
                        { nodeType: "interaction", contentTag: "class-selection" }
                    ]
                },
                {
                    type: "branch",
                    paths: [
                        {
                            id: "healing-route",
                            label: "Rest by the River",
                            nodes: [
                                { nodeType: "rest" }
                            ]
                        },
                        {
                            id: "shrine-route",
                            label: "Visit the River Shrine",
                            nodes: [
                                { nodeType: "interaction", contentTag: "buff-shrine" }
                            ]
                        }
                    ]
                }
            ]
        }
    },

    {
        id: "forest-boss",
        type: "encounter",
        name: "The Forest's Guardian",
        description: "He speaks for the trees.",
        difficulty: {
            difficultyOffset: 1
        },
        encounterId: "forest-guardian"
    }
];

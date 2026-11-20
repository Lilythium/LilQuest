import type { QualityPolarity } from "./../../../game/equipment/types";

export const qualityPolarityWeights: Record<QualityPolarity, number> = {
    positive: 60,
    mixed: 30,
    negative: 10
};
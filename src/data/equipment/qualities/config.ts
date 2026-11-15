import type { QualityPolarity } from "./types";

export const qualityPolarityWeights: Record<QualityPolarity, number> = {
    positive: 60,
    mixed: 30,
    negative: 10
};
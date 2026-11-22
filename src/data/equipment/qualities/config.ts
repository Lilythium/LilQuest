import type { QualityPolarity } from "../types";

export const QUALITY_POLARITY_WEIGHTS: Record<QualityPolarity, number> = {
    positive: 60,
    mixed: 30,
    negative: 10
};
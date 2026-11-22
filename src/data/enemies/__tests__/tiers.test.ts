import { describe, expect, it } from "vitest";
import { ENEMY_TIER_CONFIG } from "../tiers";
import { EQUIPMENT_RARITIES } from "../../equipment/types";

describe("ENEMY_TIER_CONFIG", () => {
    it("scales rewards upward by tier", () => {
        const { basic, elite, boss } = ENEMY_TIER_CONFIG;
        const miniBoss = ENEMY_TIER_CONFIG["mini-boss"];

        expect(basic.rewardMultiplier).toBeLessThan(elite.rewardMultiplier);
        expect(elite.rewardMultiplier).toBeLessThan(miniBoss.rewardMultiplier);
        expect(miniBoss.rewardMultiplier).toBeLessThan(boss.rewardMultiplier);
    });

    it("gives basic enemies no level offset or rarity bonus", () => {
        expect(ENEMY_TIER_CONFIG.basic.levelOffset).toBe(0);
        expect(ENEMY_TIER_CONFIG.basic.rarityBonus).toBe(0);
    });

    it("never lets min rarity exceed max rarity", () => {
        for (const config of Object.values(ENEMY_TIER_CONFIG)) {
            expect(EQUIPMENT_RARITIES.indexOf(config.minRarity))
                .toBeLessThanOrEqual(EQUIPMENT_RARITIES.indexOf(config.maxRarity));
        }
    });

    it("keeps unique drops away from basic enemies and commons away from bosses", () => {
        expect(ENEMY_TIER_CONFIG.basic.maxRarity).not.toBe("unique");
        expect(ENEMY_TIER_CONFIG.boss.minRarity).not.toBe("common");
    });
});
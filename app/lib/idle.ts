export interface IdleRates {
  coinsPerHour: number;
  xpPerHour: number;
}

const TIER_RATES: { maxLevel: number; coins: number; xp: number; name: string }[] = [
  { maxLevel: 4, coins: 2, xp: 1, name: "Small Shrine" },
  { maxLevel: 10, coins: 5, xp: 3, name: "Temple" },
  { maxLevel: 16, coins: 12, xp: 7, name: "Grand Shrine" },
  { maxLevel: Infinity, coins: 25, xp: 15, name: "Celestial Palace" },
];

export function getTempleTier(level: number) {
  if (level >= 17) return TIER_RATES[3];
  if (level >= 11) return TIER_RATES[2];
  if (level >= 5) return TIER_RATES[1];
  return TIER_RATES[0];
}

/** Upgrade IDs that grant idle bonuses and their multipliers */
const UPGRADE_BONUSES: Record<string, number> = {
  desk: 0.15,
  immersion: 0.25,
  garden: 0.10,
  library: 0.20,
};

/**
 * Calculate idle rate based on level and owned upgrades.
 * Temple tier follows TempleView logic:
 *   L1-4: Tier 1, L5-10: Tier 2, L11-16: Tier 3, L17+: Tier 4
 */
export function calculateIdleRate(level: number, ownedUpgrades: Set<string>): IdleRates {
  const tier = getTempleTier(level);
  const levelMultiplier = 1 + level * 0.05;

  let upgradeMultiplier = 1;
  for (const [id, bonus] of Object.entries(UPGRADE_BONUSES)) {
    if (ownedUpgrades.has(id)) {
      upgradeMultiplier += bonus;
    }
  }

  return {
    coinsPerHour: Math.round(tier.coins * levelMultiplier * upgradeMultiplier * 100) / 100,
    xpPerHour: Math.round(tier.xp * levelMultiplier * upgradeMultiplier * 100) / 100,
  };
}

/**
 * Calculate earnings since last collection, capped at 24 hours.
 */
export function calculateIdleEarnings(
  rates: IdleRates,
  lastCollectionAt: string, // ISO timestamp
  now: Date = new Date()
): { coins: number; xp: number; hours: number } {
  const lastTime = new Date(lastCollectionAt).getTime();
  const nowTime = now.getTime();

  if (isNaN(lastTime) || lastTime >= nowTime) {
    return { coins: 0, xp: 0, hours: 0 };
  }

  const elapsedMs = nowTime - lastTime;
  const elapsedHours = Math.min(elapsedMs / (1000 * 60 * 60), 24);

  return {
    coins: Math.floor(rates.coinsPerHour * elapsedHours),
    xp: Math.floor(rates.xpPerHour * elapsedHours),
    hours: Math.round(elapsedHours * 10) / 10,
  };
}

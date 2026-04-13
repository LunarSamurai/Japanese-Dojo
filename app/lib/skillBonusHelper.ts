/**
 * Temporary helper to get skill bonuses without importing the full skill tree
 * (avoids circular dependency during build). Will be replaced by skillBonuses.ts
 * once the skill tree agent completes.
 */
import type { AwakeningState } from "../types";

export interface SkillBonuses {
  atkBonus: number;
  defBonus: number;
  hpBonus: number;
  goldMultiplier: number;
  xpMultiplier: number;
  omamoriMultiplier: number;
  equipMultiplier: number;
  lifestealPercent: number;
}

export function freshBonuses(): SkillBonuses {
  return { atkBonus: 0, defBonus: 0, hpBonus: 0, goldMultiplier: 1, xpMultiplier: 1, omamoriMultiplier: 1, equipMultiplier: 0, lifestealPercent: 0 };
}

/**
 * Get bonuses — delegates to skillBonuses.ts if available, otherwise returns fresh.
 * This function is safe to call before the skill tree data is generated.
 */
export function getSkillBonusesSafe(awakening: AwakeningState): SkillBonuses {
  if (!awakening || !awakening.allocatedNodes || awakening.allocatedNodes.length === 0) {
    return freshBonuses();
  }
  // Dynamic import to avoid build-time dependency on skill tree data
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getSkillBonuses } = require("./skillBonuses");
    return getSkillBonuses(awakening.allocatedNodes);
  } catch {
    return freshBonuses();
  }
}

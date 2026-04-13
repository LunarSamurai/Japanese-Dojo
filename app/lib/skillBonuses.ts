import { SKILL_TREE } from "../data/skillTree";

export interface SkillBonuses {
  atkBonus: number;
  defBonus: number;
  hpBonus: number;
  goldMultiplier: number;   // 1.0 = no bonus, 1.15 = +15%
  xpMultiplier: number;
  omamoriMultiplier: number;
  equipMultiplier: number;  // flat bonus to all equipment stats
  lifestealPercent: number; // % of damage dealt that heals temple
}

export function freshBonuses(): SkillBonuses {
  return {
    atkBonus: 0,
    defBonus: 0,
    hpBonus: 0,
    goldMultiplier: 1.0,
    xpMultiplier: 1.0,
    omamoriMultiplier: 1.0,
    equipMultiplier: 0,
    lifestealPercent: 0,
  };
}

// Supremacy cycles through these stats in order
const SUPREME_CYCLE: string[] = ["atk", "def", "hp", "goldMult"];

export function getSkillBonuses(allocatedNodes: string[]): SkillBonuses {
  const bonuses = freshBonuses();

  if (allocatedNodes.length === 0) return bonuses;

  // Build a lookup set for fast membership testing
  const allocated = new Set(allocatedNodes);

  // Accumulate percentage values for multiplier stats
  let goldPct = 0;
  let xpPct = 0;
  let omamoriPct = 0;

  for (const node of SKILL_TREE) {
    if (!allocated.has(node.id)) continue;

    if (node.stat === "mixed") {
      // Supremacy nodes: determine which sub-stat this node maps to
      // Parse the node index from its id to determine cycle position
      const parts = node.id.split("-");
      const tierStr = parts[1]; // "t1", "t2", etc.
      const idxStr = parts[2];  // "0", "1", etc.
      const tier = parseInt(tierStr.replace("t", ""), 10);
      const idx = parseInt(idxStr, 10);

      // Calculate global node index within the supreme category
      const tierOffsets = [0, 20, 45, 75, 100, 115]; // cumulative: 0, 20, 20+25, 45+30, 75+25, 100+15
      const globalIdx = tierOffsets[tier - 1] + idx;
      const cycleStat = SUPREME_CYCLE[globalIdx % SUPREME_CYCLE.length];

      switch (cycleStat) {
        case "atk":
          bonuses.atkBonus += node.value;
          break;
        case "def":
          bonuses.defBonus += node.value;
          break;
        case "hp":
          bonuses.hpBonus += node.value;
          break;
        case "goldMult":
          goldPct += node.value;
          break;
      }
    } else {
      switch (node.stat) {
        case "atk":
          bonuses.atkBonus += node.value;
          break;
        case "def":
          bonuses.defBonus += node.value;
          break;
        case "hp":
          bonuses.hpBonus += node.value;
          break;
        case "goldMult":
          goldPct += node.value;
          break;
        case "xpMult":
          xpPct += node.value;
          break;
        case "omamoriMult":
          omamoriPct += node.value;
          break;
        case "equipBonus":
          bonuses.equipMultiplier += node.value;
          break;
        case "lifesteal":
          bonuses.lifestealPercent += node.value;
          break;
      }
    }
  }

  // Convert accumulated percentages to multipliers
  bonuses.goldMultiplier = 1 + goldPct / 100;
  bonuses.xpMultiplier = 1 + xpPct / 100;
  bonuses.omamoriMultiplier = 1 + omamoriPct / 100;

  return bonuses;
}

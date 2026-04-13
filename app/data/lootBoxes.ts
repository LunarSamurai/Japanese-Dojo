import { HERO_EQUIPMENT } from "./heroEquipment";
import { SET_ITEMS, type SetEquipment } from "./equipmentSets";

// ─── Types ───────────────────────────────────────────────────────────

export interface LootBox {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  cost: number;
  poolType: "weapon" | "armor" | "charm" | "mixed";
  guaranteedFirstDraw: boolean;
  baseChance: number;
  bulkOptions: { count: number; chance: number; totalCost: number }[];
}

export interface LootBoxResult {
  items: SetEquipment[];
  isFirstDraw: boolean;
  consolationGold: number;     // gold earned from non-set pulls
  omamoriRefund: number;       // 15% chance to get 80% omamori back
}

// ─── Pre-computed pools ──────────────────────────────────────────────

const SET_SWORDS = SET_ITEMS.filter((i) => i.slot === "sword");
const SET_ARMORS = SET_ITEMS.filter((i) => i.slot === "armor");
const SET_CHARMS = SET_ITEMS.filter((i) => i.slot === "charm");
const SET_LEGENDARY = SET_ITEMS.filter((i) => i.rarity === "legendary");

const BASE_SWORDS = HERO_EQUIPMENT.filter((i) => i.slot === "sword");
const BASE_ARMORS = HERO_EQUIPMENT.filter((i) => i.slot === "armor");
const BASE_CHARMS = HERO_EQUIPMENT.filter((i) => i.slot === "charm");

// ─── Loot Box Definitions ────────────────────────────────────────────

export const LOOT_BOXES: LootBox[] = [
  {
    id: "blade_box",
    name: "刃の箱",
    nameEn: "Blade Box",
    icon: "⚔️",
    description: "Contains swords from common blades to rare set weapons",
    cost: 15,
    poolType: "weapon",
    guaranteedFirstDraw: true,
    baseChance: 2,
    bulkOptions: [
      { count: 10, chance: 10, totalCost: 15 * 9 },
      { count: 100, chance: 50, totalCost: 15 * 70 },
    ],
  },
  {
    id: "shield_box",
    name: "盾の箱",
    nameEn: "Shield Box",
    icon: "🛡️",
    description: "Contains armors from training garb to legendary plate",
    cost: 15,
    poolType: "armor",
    guaranteedFirstDraw: true,
    baseChance: 2,
    bulkOptions: [
      { count: 10, chance: 10, totalCost: 15 * 9 },
      { count: 100, chance: 50, totalCost: 15 * 70 },
    ],
  },
  {
    id: "spirit_box",
    name: "霊の箱",
    nameEn: "Spirit Box",
    icon: "🔮",
    description: "Contains charms from paper talismans to divine jewels",
    cost: 15,
    poolType: "charm",
    guaranteedFirstDraw: true,
    baseChance: 2,
    bulkOptions: [
      { count: 10, chance: 10, totalCost: 15 * 9 },
      { count: 100, chance: 50, totalCost: 15 * 70 },
    ],
  },
  {
    id: "legendary_box",
    name: "伝説の箱",
    nameEn: "Legendary Box",
    icon: "👑",
    description: "Only legendary set items can drop from this radiant chest",
    cost: 50,
    poolType: "mixed",
    guaranteedFirstDraw: true,
    baseChance: 1,
    bulkOptions: [
      { count: 10, chance: 10, totalCost: 50 * 9 },
      { count: 100, chance: 50, totalCost: 50 * 70 },
    ],
  },
  {
    id: "mixed_box",
    name: "万物の箱",
    nameEn: "Mixed Box",
    icon: "🎁",
    description: "Anything can appear — swords, armors, charms from every collection",
    cost: 10,
    poolType: "mixed",
    guaranteedFirstDraw: true,
    baseChance: 2,
    bulkOptions: [
      { count: 10, chance: 10, totalCost: 10 * 9 },
      { count: 100, chance: 50, totalCost: 10 * 70 },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getSetPool(box: LootBox): SetEquipment[] {
  switch (box.id) {
    case "blade_box":
      return SET_SWORDS;
    case "shield_box":
      return SET_ARMORS;
    case "spirit_box":
      return SET_CHARMS;
    case "legendary_box":
      return SET_LEGENDARY;
    case "mixed_box":
      return SET_ITEMS;
    default:
      return SET_ITEMS;
  }
}

function getBasePool(box: LootBox): SetEquipment[] {
  // Return base (non-set) equipment cast to SetEquipment shape for uniform return type.
  // We add stub setId/rarity so the caller can distinguish them.
  const toStub = (item: (typeof HERO_EQUIPMENT)[number]): SetEquipment => ({
    ...item,
    setId: "",
    rarity: "rare" as const,
  });

  switch (box.poolType) {
    case "weapon":
      return BASE_SWORDS.map(toStub);
    case "armor":
      return BASE_ARMORS.map(toStub);
    case "charm":
      return BASE_CHARMS.map(toStub);
    case "mixed":
      return HERO_EQUIPMENT.map(toStub);
    default:
      return HERO_EQUIPMENT.map(toStub);
  }
}

// ─── Roll Function ───────────────────────────────────────────────────

/**
 * Roll a loot box one or more times.
 *
 * @param box        - The loot box definition to roll.
 * @param count      - How many times to roll (1, 10, or 100).
 * @param owned      - Set of item IDs the player already owns (for info only).
 * @param firstDrawUsed - Set of box IDs whose guaranteed first draw has been consumed.
 * @returns An object with the array of won items and whether this was the first draw.
 */
export function rollLootBox(
  box: LootBox,
  count: number,
  owned: Set<string>,
  firstDrawUsed: Set<string>,
): LootBoxResult {
  const setPool = getSetPool(box);
  const basePool = getBasePool(box);
  const items: SetEquipment[] = [];
  let isFirstDraw = false;
  let nonSetPulls = 0;

  // Determine effective chance based on bulk tier
  let effectiveChance = box.baseChance;
  const bulk = box.bulkOptions.find((b) => b.count === count);
  if (bulk) {
    effectiveChance = bulk.chance;
  }

  for (let i = 0; i < count; i++) {
    // First ever single draw from this box type is guaranteed
    if (i === 0 && !firstDrawUsed.has(box.id) && box.guaranteedFirstDraw) {
      isFirstDraw = true;
      firstDrawUsed.add(box.id);
      items.push(pickRandom(setPool));
      continue;
    }

    // Roll against chance
    const roll = Math.random() * 100;
    if (roll < effectiveChance) {
      items.push(pickRandom(setPool));
    } else {
      items.push(pickRandom(basePool));
      nonSetPulls++;
    }
  }

  // Consolation: 30K gold per failed pull (average lesson reward ~150 gold × 20 = 3K, so 30K is generous)
  const consolationGold = nonSetPulls * 30000;

  // 15% chance to refund 80% of omamori spent
  let totalCost = box.cost;
  if (bulk) totalCost = bulk.totalCost;
  if (count === 1) totalCost = box.cost;
  const omamoriRefund = Math.random() < 0.15 ? Math.round(totalCost * 0.8) : 0;

  return { items, isFirstDraw, consolationGold, omamoriRefund };
}

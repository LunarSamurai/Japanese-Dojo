import type { Upgrade } from "../types";

// Base defense upgrades — one-time purchases from coins
export const DEFENSE_UPGRADES: Upgrade[] = [
  { id: "shrine_bell", name: "神社の鈴", en: "Shrine Bell", desc: "Rings to ward off evil — +5 defense", icon: "🔔", cost: 100, category: "defense", defenseBonus: 5 },
  { id: "sacred_barrier", name: "結界", en: "Sacred Barrier", desc: "Mystical energy barrier — +8 defense", icon: "🛡️", cost: 200, category: "defense", defenseBonus: 8 },
  { id: "sacred_rope", name: "注連縄", en: "Shimenawa", desc: "Sacred rope seals demons — +10 defense", icon: "🪢", cost: 250, category: "defense", defenseBonus: 10 },
  { id: "fox_guardian", name: "狐の守護者", en: "Fox Guardian", desc: "Inari fox protects the shrine — +12 defense", icon: "🦊", cost: 350, category: "defense", defenseBonus: 12 },
  { id: "stone_lion", name: "狛犬", en: "Komainu", desc: "Stone lion guardians — +15 defense", icon: "🦁", cost: 500, category: "defense", defenseBonus: 15 },
  { id: "thunder_drum", name: "雷太鼓", en: "Thunder Drum", desc: "Taiko drum of Raijin — +20 defense", icon: "🥁", cost: 750, category: "defense", defenseBonus: 20 },
  { id: "divine_sword", name: "神剣", en: "Divine Sword", desc: "Kusanagi no Tsurugi — +30 defense", icon: "⚔️", cost: 1200, category: "defense", defenseBonus: 30 },
];

// Repeatable temple upgrades — these can be bought multiple times with coins
// Each purchase increases defense permanently. Cost scales per tier.
export interface TempleUpgradeTier {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  defensePerLevel: number;
  baseCost: number;
  costScale: number; // cost = baseCost + level * costScale
  maxLevel: number;
}

export const TEMPLE_UPGRADE_TIERS: TempleUpgradeTier[] = [
  { id: "wall_reinforcement", name: "壁の強化", nameEn: "Wall Reinforcement", icon: "🧱", description: "Strengthen temple walls", defensePerLevel: 2, baseCost: 50, costScale: 30, maxLevel: 50 },
  { id: "archer_tower", name: "弓矢の塔", nameEn: "Archer Tower", icon: "🏹", description: "Archers fire at approaching demons", defensePerLevel: 3, baseCost: 100, costScale: 50, maxLevel: 50 },
  { id: "moat_depth", name: "堀の深さ", nameEn: "Moat Depth", icon: "🌊", description: "Deepen the protective moat", defensePerLevel: 4, baseCost: 200, costScale: 80, maxLevel: 50 },
  { id: "spirit_ward", name: "霊符", nameEn: "Spirit Ward", icon: "📜", description: "Spiritual wards repel evil", defensePerLevel: 5, baseCost: 300, costScale: 120, maxLevel: 50 },
  { id: "dragon_statue", name: "龍の像", nameEn: "Dragon Statue", icon: "🐉", description: "A dragon guardian watches over the temple", defensePerLevel: 8, baseCost: 500, costScale: 200, maxLevel: 50 },
];

// Get current level of a repeatable upgrade from the owned set
export function getTempleUpgradeLevel(owned: Set<string>, upgradeId: string): number {
  let level = 0;
  for (let i = 1; i <= 50; i++) {
    if (owned.has(`${upgradeId}_${i}`)) level = i;
  }
  return level;
}

// Get cost for the next level
export function getNextUpgradeCost(tier: TempleUpgradeTier, currentLevel: number): number {
  return tier.baseCost + currentLevel * tier.costScale;
}

// Get total defense bonus from all repeatable upgrades
export function getRepeatableDefenseBonus(owned: Set<string>): number {
  let total = 0;
  for (const tier of TEMPLE_UPGRADE_TIERS) {
    const level = getTempleUpgradeLevel(owned, tier.id);
    total += level * tier.defensePerLevel;
  }
  return total;
}

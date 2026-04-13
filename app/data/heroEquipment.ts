import type { HeroEquipment } from "../types";

export const HERO_EQUIPMENT: HeroEquipment[] = [
  // Swords (ATK boost)
  { id: "wooden_bokken", name: "木刀", nameEn: "Wooden Bokken", slot: "sword", stat: "atk", bonus: 3, cost: 2, icon: "🗡️", description: "A training sword" },
  { id: "iron_katana", name: "鉄の刀", nameEn: "Iron Katana", slot: "sword", stat: "atk", bonus: 8, cost: 5, icon: "⚔️", description: "A sturdy iron blade" },
  { id: "steel_katana", name: "鋼の刀", nameEn: "Steel Katana", slot: "sword", stat: "atk", bonus: 15, cost: 12, icon: "🔪", description: "Folded steel edge" },
  { id: "golden_tachi", name: "金の太刀", nameEn: "Golden Tachi", slot: "sword", stat: "atk", bonus: 25, cost: 25, icon: "✨", description: "A legendary golden blade" },
  { id: "kusanagi", name: "草薙の剣", nameEn: "Kusanagi no Tsurugi", slot: "sword", stat: "atk", bonus: 50, cost: 60, icon: "⚡", description: "The divine grass-cutting sword" },

  // Armors (DEF boost)
  { id: "cloth_gi", name: "道着", nameEn: "Training Gi", slot: "armor", stat: "def", bonus: 3, cost: 2, icon: "👘", description: "Basic training clothes" },
  { id: "leather_do", name: "革胴", nameEn: "Leather Do", slot: "armor", stat: "def", bonus: 8, cost: 5, icon: "🛡️", description: "Hardened leather chest piece" },
  { id: "iron_yoroi", name: "鉄鎧", nameEn: "Iron Yoroi", slot: "armor", stat: "def", bonus: 15, cost: 12, icon: "🪖", description: "Iron samurai armor" },
  { id: "dragon_scale", name: "竜鱗鎧", nameEn: "Dragon Scale Armor", slot: "armor", stat: "def", bonus: 25, cost: 25, icon: "🐉", description: "Scales of a fallen dragon" },
  { id: "celestial_armor", name: "天の鎧", nameEn: "Celestial Armor", slot: "armor", stat: "def", bonus: 50, cost: 60, icon: "🌟", description: "Armor blessed by the gods" },

  // Charms (HP boost — adds to maxHp)
  { id: "paper_charm", name: "お札", nameEn: "Paper Charm", slot: "charm", stat: "hp", bonus: 20, cost: 2, icon: "📜", description: "A simple prayer charm" },
  { id: "jade_magatama", name: "翡翠勾玉", nameEn: "Jade Magatama", slot: "charm", stat: "hp", bonus: 50, cost: 5, icon: "💚", description: "Ancient curved jade" },
  { id: "fox_blessing", name: "稲荷の祝福", nameEn: "Fox Blessing", slot: "charm", stat: "hp", bonus: 100, cost: 12, icon: "🦊", description: "Blessed by Inari" },
  { id: "dragon_pearl", name: "龍の珠", nameEn: "Dragon Pearl", slot: "charm", stat: "hp", bonus: 200, cost: 25, icon: "🔮", description: "A mystical dragon pearl" },
  { id: "yasakani", name: "八尺瓊勾玉", nameEn: "Yasakani no Magatama", slot: "charm", stat: "hp", bonus: 500, cost: 60, icon: "💎", description: "The imperial jewel" },
];

import type { HeroEquipment } from "../types";

// Extended types for set equipment
export interface SetEquipment extends HeroEquipment {
  setId: string;
  rarity: "rare" | "epic" | "legendary";
  secondaryStat?: "goldBonus" | "lifesteal" | "xpBonus" | "atkBonus" | "defBonus" | "hpBonus";
  secondaryValue?: number;
}

export interface EquipmentSet {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  items: string[];
  bonusName: string;
  bonusDescription: string;
  bonusType: string;
  bonusValue: number;
}

// ─── 15 Equipment Sets ───────────────────────────────────────────────

export const EQUIPMENT_SETS: EquipmentSet[] = [
  // ── RARE (Sets 1–5) ──
  {
    id: "flame_emperor",
    name: "炎帝",
    nameEn: "Flame Emperor Set",
    description: "Forged in the heart of a dying sun, this set channels the wrath of the Flame Emperor.",
    icon: "🔥",
    items: ["flame_emperor_sword", "flame_emperor_armor", "flame_emperor_charm"],
    bonusName: "Emperor's Inferno",
    bonusDescription: "Every 2nd strike wipes out ALL enemies instantly",
    bonusType: "wipeout",
    bonusValue: 2,
  },
  {
    id: "frost_moon",
    name: "霜月",
    nameEn: "Frost Moon Set",
    description: "Blessed under the eleventh moon, each piece radiates an unyielding chill.",
    icon: "🌙",
    items: ["frost_moon_sword", "frost_moon_armor", "frost_moon_charm"],
    bonusName: "Lunar Permafrost",
    bonusDescription: "+300% DEF bonus",
    bonusType: "defMult",
    bonusValue: 4.0,
  },
  {
    id: "thunder_god",
    name: "雷神",
    nameEn: "Thunder God Set",
    description: "Raijin himself wore this into battle against the sea serpents.",
    icon: "⚡",
    items: ["thunder_god_sword", "thunder_god_armor", "thunder_god_charm"],
    bonusName: "Storm Surge",
    bonusDescription: "50% chance of double strike each tick",
    bonusType: "doubleStrike",
    bonusValue: 50,
  },
  {
    id: "shadow_walker",
    name: "影歩",
    nameEn: "Shadow Walker Set",
    description: "Those who wear it move between the folds of darkness, unseen and unheard.",
    icon: "🌑",
    items: ["shadow_walker_sword", "shadow_walker_armor", "shadow_walker_charm"],
    bonusName: "Phantom Step",
    bonusDescription: "30% chance to stun enemies (skip their attack)",
    bonusType: "stunChance",
    bonusValue: 30,
  },
  {
    id: "dragon_scale_set",
    name: "龍鱗",
    nameEn: "Dragon Scale Set",
    description: "Carved from the ancient dragon Ryujin's shed scales, pulsing with primordial vitality.",
    icon: "🐲",
    items: ["dragon_scale_set_sword", "dragon_scale_set_armor", "dragon_scale_set_charm"],
    bonusName: "Dragon's Vitality",
    bonusDescription: "+500% HP bonus",
    bonusType: "hpMult",
    bonusValue: 6.0,
  },

  // ── EPIC (Sets 6–10) ──
  {
    id: "golden_fortune",
    name: "金運",
    nameEn: "Golden Fortune Set",
    description: "Merchants whisper of a set that turns every battlefield into a gold mine.",
    icon: "💰",
    items: ["golden_fortune_sword", "golden_fortune_armor", "golden_fortune_charm"],
    bonusName: "Midas Touch",
    bonusDescription: "+200% gold earned from all sources",
    bonusType: "goldMult",
    bonusValue: 3.0,
  },
  {
    id: "spirit_healer",
    name: "霊癒",
    nameEn: "Spirit Healer Set",
    description: "Woven by shrine maidens from spectral silk, it mends wounds with every fallen foe.",
    icon: "💚",
    items: ["spirit_healer_sword", "spirit_healer_armor", "spirit_healer_charm"],
    bonusName: "Soul Mend",
    bonusDescription: "Heal 10% temple HP on every kill",
    bonusType: "healOnKill",
    bonusValue: 10,
  },
  {
    id: "berserker",
    name: "狂戦士",
    nameEn: "Berserker Set",
    description: "Blood-soaked relics that awaken a feral rage when death draws near.",
    icon: "🩸",
    items: ["berserker_sword", "berserker_armor", "berserker_charm"],
    bonusName: "Blood Frenzy",
    bonusDescription: "Below 30% HP: deal 5x damage",
    bonusType: "berserker",
    bonusValue: 5.0,
  },
  {
    id: "void",
    name: "虚空",
    nameEn: "Void Set",
    description: "Born from the space between stars, these artifacts channel the emptiness into raw destruction.",
    icon: "🕳️",
    items: ["void_sword", "void_armor", "void_charm"],
    bonusName: "Oblivion Strike",
    bonusDescription: "+400% ATK bonus",
    bonusType: "dmgMult",
    bonusValue: 5.0,
  },
  {
    id: "sacred",
    name: "神聖",
    nameEn: "Sacred Set",
    description: "Consecrated by the head priest of Ise Grand Shrine across seven dawns.",
    icon: "✝️",
    items: ["sacred_sword", "sacred_armor", "sacred_charm"],
    bonusName: "Divine Resurrection",
    bonusDescription: "Auto-revive temple once per wave at full HP",
    bonusType: "revive",
    bonusValue: 1,
  },

  // ── LEGENDARY (Sets 11–15) ──
  {
    id: "phantom",
    name: "幻影",
    nameEn: "Phantom Set",
    description: "Ghostly armaments that drain the life essence of every creature they touch.",
    icon: "👻",
    items: ["phantom_sword", "phantom_armor", "phantom_charm"],
    bonusName: "Soul Drain",
    bonusDescription: "20% lifesteal (heal temple by 20% of damage dealt)",
    bonusType: "lifesteal",
    bonusValue: 20,
  },
  {
    id: "wisdom",
    name: "叡智",
    nameEn: "Wisdom Set",
    description: "Relics of the legendary scholar-monk Kukai, saturated with enlightenment.",
    icon: "📖",
    items: ["wisdom_sword", "wisdom_armor", "wisdom_charm"],
    bonusName: "Enlightened Mind",
    bonusDescription: "+300% XP from all sources",
    bonusType: "xpMult",
    bonusValue: 4.0,
  },
  {
    id: "fortune_charm",
    name: "福徳",
    nameEn: "Fortune Charm Set",
    description: "Seven lucky gods poured their blessings into these radiant treasures.",
    icon: "🎋",
    items: ["fortune_charm_sword", "fortune_charm_armor", "fortune_charm_charm"],
    bonusName: "Divine Prosperity",
    bonusDescription: "+200% omamori earned",
    bonusType: "omamoriMult",
    bonusValue: 3.0,
  },
  {
    id: "iron_fortress",
    name: "鉄壁",
    nameEn: "Iron Fortress Set",
    description: "Unyielding as Osaka Castle itself, this set turns the wearer into a living wall.",
    icon: "🏯",
    items: ["iron_fortress_sword", "iron_fortress_armor", "iron_fortress_charm"],
    bonusName: "Absolute Guard",
    bonusDescription: "Shield: absorb first 50% of damage each wave",
    bonusType: "shield",
    bonusValue: 50,
  },
  {
    id: "celestial",
    name: "天界",
    nameEn: "Celestial Set",
    description: "Descended from the Plain of High Heaven, these artifacts crackle with divine judgment.",
    icon: "🌠",
    items: ["celestial_set_sword", "celestial_set_armor", "celestial_set_charm"],
    bonusName: "Heaven's Wrath",
    bonusDescription: "25% critical hit chance (3x damage)",
    bonusType: "critChance",
    bonusValue: 25,
  },
];

// ─── 45 Set Items ────────────────────────────────────────────────────

export const SET_ITEMS: SetEquipment[] = [
  // ── Set 1: Flame Emperor (rare) ──
  { id: "flame_emperor_sword", name: "炎帝の太刀", nameEn: "Flame Emperor Tachi", slot: "sword", stat: "atk", bonus: 20, cost: 30, icon: "🔥", description: "A blade wreathed in undying flames", setId: "flame_emperor", rarity: "rare" },
  { id: "flame_emperor_armor", name: "炎帝の鎧", nameEn: "Flame Emperor Armor", slot: "armor", stat: "def", bonus: 20, cost: 30, icon: "🔥", description: "Armor forged in volcanic fire", setId: "flame_emperor", rarity: "rare" },
  { id: "flame_emperor_charm", name: "炎帝の勾玉", nameEn: "Flame Emperor Magatama", slot: "charm", stat: "hp", bonus: 100, cost: 30, icon: "🔥", description: "A jewel containing a caged inferno", setId: "flame_emperor", rarity: "rare" },

  // ── Set 2: Frost Moon (rare) ──
  { id: "frost_moon_sword", name: "霜月の太刀", nameEn: "Frost Moon Tachi", slot: "sword", stat: "atk", bonus: 20, cost: 30, icon: "🌙", description: "Its edge freezes the air it cuts", setId: "frost_moon", rarity: "rare" },
  { id: "frost_moon_armor", name: "霜月の鎧", nameEn: "Frost Moon Armor", slot: "armor", stat: "def", bonus: 22, cost: 30, icon: "🌙", description: "Encased in a perpetual frost shell", setId: "frost_moon", rarity: "rare" },
  { id: "frost_moon_charm", name: "霜月の勾玉", nameEn: "Frost Moon Magatama", slot: "charm", stat: "hp", bonus: 110, cost: 30, icon: "🌙", description: "Cold as the eleventh moon's light", setId: "frost_moon", rarity: "rare" },

  // ── Set 3: Thunder God (rare) ──
  { id: "thunder_god_sword", name: "雷神の太刀", nameEn: "Thunder God Tachi", slot: "sword", stat: "atk", bonus: 22, cost: 30, icon: "⚡", description: "Crackles with divine lightning", setId: "thunder_god", rarity: "rare" },
  { id: "thunder_god_armor", name: "雷神の鎧", nameEn: "Thunder God Armor", slot: "armor", stat: "def", bonus: 20, cost: 30, icon: "⚡", description: "Static dances across its surface", setId: "thunder_god", rarity: "rare" },
  { id: "thunder_god_charm", name: "雷神の太鼓", nameEn: "Thunder God Taiko", slot: "charm", stat: "hp", bonus: 100, cost: 30, icon: "⚡", description: "A miniature thunder drum pendant", setId: "thunder_god", rarity: "rare" },

  // ── Set 4: Shadow Walker (rare) ──
  { id: "shadow_walker_sword", name: "影歩の忍刀", nameEn: "Shadow Walker Ninjato", slot: "sword", stat: "atk", bonus: 22, cost: 30, icon: "🌑", description: "A blade that drinks the light", setId: "shadow_walker", rarity: "rare" },
  { id: "shadow_walker_armor", name: "影歩の装束", nameEn: "Shadow Walker Garb", slot: "armor", stat: "def", bonus: 20, cost: 30, icon: "🌑", description: "Woven from living shadow threads", setId: "shadow_walker", rarity: "rare" },
  { id: "shadow_walker_charm", name: "影歩の煙玉", nameEn: "Shadow Walker Smoke Orb", slot: "charm", stat: "hp", bonus: 110, cost: 30, icon: "🌑", description: "Emits a veil of midnight smoke", setId: "shadow_walker", rarity: "rare" },

  // ── Set 5: Dragon Scale Set (rare) ──
  { id: "dragon_scale_set_sword", name: "龍鱗の太刀", nameEn: "Dragon Scale Tachi", slot: "sword", stat: "atk", bonus: 24, cost: 30, icon: "🐲", description: "Edged with razor-sharp dragon scales", setId: "dragon_scale_set", rarity: "rare" },
  { id: "dragon_scale_set_armor", name: "龍鱗の鎧", nameEn: "Dragon Scale Plate", slot: "armor", stat: "def", bonus: 24, cost: 30, icon: "🐲", description: "Impenetrable scales of the elder dragon", setId: "dragon_scale_set", rarity: "rare" },
  { id: "dragon_scale_set_charm", name: "龍鱗の珠", nameEn: "Dragon Scale Pearl", slot: "charm", stat: "hp", bonus: 120, cost: 30, icon: "🐲", description: "A pearl formed within dragon bone", setId: "dragon_scale_set", rarity: "rare" },

  // ── Set 6: Golden Fortune (epic) ──
  { id: "golden_fortune_sword", name: "金運の太刀", nameEn: "Golden Fortune Tachi", slot: "sword", stat: "atk", bonus: 28, cost: 50, icon: "💰", description: "Every swing showers gold sparks", setId: "golden_fortune", rarity: "epic" },
  { id: "golden_fortune_armor", name: "金運の鎧", nameEn: "Golden Fortune Armor", slot: "armor", stat: "def", bonus: 26, cost: 50, icon: "💰", description: "Plated in lucky coins from seven shrines", setId: "golden_fortune", rarity: "epic" },
  { id: "golden_fortune_charm", name: "金運の小判", nameEn: "Golden Fortune Koban", slot: "charm", stat: "hp", bonus: 150, cost: 50, icon: "💰", description: "An enchanted oval gold coin", setId: "golden_fortune", rarity: "epic" },

  // ── Set 7: Spirit Healer (epic) ──
  { id: "spirit_healer_sword", name: "霊癒の太刀", nameEn: "Spirit Healer Tachi", slot: "sword", stat: "atk", bonus: 26, cost: 50, icon: "💚", description: "Heals the wielder as it strikes", setId: "spirit_healer", rarity: "epic" },
  { id: "spirit_healer_armor", name: "霊癒の法衣", nameEn: "Spirit Healer Vestment", slot: "armor", stat: "def", bonus: 28, cost: 50, icon: "💚", description: "Robes infused with healing spirit energy", setId: "spirit_healer", rarity: "epic" },
  { id: "spirit_healer_charm", name: "霊癒の数珠", nameEn: "Spirit Healer Rosary", slot: "charm", stat: "hp", bonus: 160, cost: 50, icon: "💚", description: "Prayer beads that pulse with life force", setId: "spirit_healer", rarity: "epic" },

  // ── Set 8: Berserker (epic) ──
  { id: "berserker_sword", name: "狂戦士の斧剣", nameEn: "Berserker Axe-Blade", slot: "sword", stat: "atk", bonus: 30, cost: 50, icon: "🩸", description: "A jagged blade hungry for blood", setId: "berserker", rarity: "epic" },
  { id: "berserker_armor", name: "狂戦士の戦装束", nameEn: "Berserker War Garb", slot: "armor", stat: "def", bonus: 24, cost: 50, icon: "🩸", description: "Tattered but supernaturally tough", setId: "berserker", rarity: "epic" },
  { id: "berserker_charm", name: "狂戦士の血石", nameEn: "Berserker Bloodstone", slot: "charm", stat: "hp", bonus: 140, cost: 50, icon: "🩸", description: "Throbs faster as wounds deepen", setId: "berserker", rarity: "epic" },

  // ── Set 9: Void (epic) ──
  { id: "void_sword", name: "虚空の太刀", nameEn: "Void Tachi", slot: "sword", stat: "atk", bonus: 32, cost: 50, icon: "🕳️", description: "Cuts through reality itself", setId: "void", rarity: "epic" },
  { id: "void_armor", name: "虚空の鎧", nameEn: "Void Armor", slot: "armor", stat: "def", bonus: 28, cost: 50, icon: "🕳️", description: "Phases in and out of existence", setId: "void", rarity: "epic" },
  { id: "void_charm", name: "虚空の眼", nameEn: "Void Eye", slot: "charm", stat: "hp", bonus: 150, cost: 50, icon: "🕳️", description: "An unblinking eye gazing into nothing", setId: "void", rarity: "epic" },

  // ── Set 10: Sacred (epic) ──
  { id: "sacred_sword", name: "神聖の太刀", nameEn: "Sacred Tachi", slot: "sword", stat: "atk", bonus: 28, cost: 50, icon: "✝️", description: "Glows with purifying holy light", setId: "sacred", rarity: "epic" },
  { id: "sacred_armor", name: "神聖の法衣", nameEn: "Sacred Vestment", slot: "armor", stat: "def", bonus: 30, cost: 50, icon: "✝️", description: "Blessed by a thousand prayers", setId: "sacred", rarity: "epic" },
  { id: "sacred_charm", name: "神聖の御幣", nameEn: "Sacred Gohei", slot: "charm", stat: "hp", bonus: 170, cost: 50, icon: "✝️", description: "A zigzag paper wand radiating divinity", setId: "sacred", rarity: "epic" },

  // ── Set 11: Phantom (legendary) ──
  { id: "phantom_sword", name: "幻影の太刀", nameEn: "Phantom Tachi", slot: "sword", stat: "atk", bonus: 65, cost: 80, icon: "👻", description: "A spectral blade that passes through armor", setId: "phantom", rarity: "legendary", secondaryStat: "lifesteal", secondaryValue: 5 },
  { id: "phantom_armor", name: "幻影の鎧", nameEn: "Phantom Armor", slot: "armor", stat: "def", bonus: 65, cost: 80, icon: "👻", description: "Attacks phase through its ghostly form", setId: "phantom", rarity: "legendary", secondaryStat: "lifesteal", secondaryValue: 5 },
  { id: "phantom_charm", name: "幻影の魂火", nameEn: "Phantom Soulfire", slot: "charm", stat: "hp", bonus: 600, cost: 80, icon: "👻", description: "A will-o-wisp trapped in crystal", setId: "phantom", rarity: "legendary", secondaryStat: "lifesteal", secondaryValue: 5 },

  // ── Set 12: Wisdom (legendary) ──
  { id: "wisdom_sword", name: "叡智の筆刀", nameEn: "Wisdom Brush-Blade", slot: "sword", stat: "atk", bonus: 60, cost: 80, icon: "📖", description: "A calligraphy brush that cuts like a sword", setId: "wisdom", rarity: "legendary", secondaryStat: "xpBonus", secondaryValue: 15 },
  { id: "wisdom_armor", name: "叡智の袈裟", nameEn: "Wisdom Kesa", slot: "armor", stat: "def", bonus: 60, cost: 80, icon: "📖", description: "A monk's robe inscribed with sutras", setId: "wisdom", rarity: "legendary", secondaryStat: "xpBonus", secondaryValue: 15 },
  { id: "wisdom_charm", name: "叡智の巻物", nameEn: "Wisdom Scroll", slot: "charm", stat: "hp", bonus: 580, cost: 80, icon: "📖", description: "An ancient scroll of infinite knowledge", setId: "wisdom", rarity: "legendary", secondaryStat: "xpBonus", secondaryValue: 15 },

  // ── Set 13: Fortune Charm (legendary) ──
  { id: "fortune_charm_sword", name: "福徳の宝剣", nameEn: "Fortune Treasure Blade", slot: "sword", stat: "atk", bonus: 62, cost: 80, icon: "🎋", description: "Tanabata wish-ribbons trail from its hilt", setId: "fortune_charm", rarity: "legendary", secondaryStat: "goldBonus", secondaryValue: 20 },
  { id: "fortune_charm_armor", name: "福徳の千早", nameEn: "Fortune Chihaya", slot: "armor", stat: "def", bonus: 62, cost: 80, icon: "🎋", description: "A sacred robe woven with lucky bamboo fiber", setId: "fortune_charm", rarity: "legendary", secondaryStat: "goldBonus", secondaryValue: 20 },
  { id: "fortune_charm_charm", name: "福徳の打出の小槌", nameEn: "Fortune Uchide Mallet", slot: "charm", stat: "hp", bonus: 620, cost: 80, icon: "🎋", description: "The legendary mallet of Daikokuten", setId: "fortune_charm", rarity: "legendary", secondaryStat: "goldBonus", secondaryValue: 20 },

  // ── Set 14: Iron Fortress (legendary) ──
  { id: "iron_fortress_sword", name: "鉄壁の大太刀", nameEn: "Iron Fortress Odachi", slot: "sword", stat: "atk", bonus: 58, cost: 80, icon: "🏯", description: "A massive blade that doubles as a shield", setId: "iron_fortress", rarity: "legendary", secondaryStat: "defBonus", secondaryValue: 25 },
  { id: "iron_fortress_armor", name: "鉄壁の大鎧", nameEn: "Iron Fortress Grand Armor", slot: "armor", stat: "def", bonus: 70, cost: 80, icon: "🏯", description: "Fortress-grade steel encasing the whole body", setId: "iron_fortress", rarity: "legendary", secondaryStat: "defBonus", secondaryValue: 25 },
  { id: "iron_fortress_charm", name: "鉄壁の城石", nameEn: "Iron Fortress Castle Stone", slot: "charm", stat: "hp", bonus: 650, cost: 80, icon: "🏯", description: "A cornerstone from an invincible castle", setId: "iron_fortress", rarity: "legendary", secondaryStat: "defBonus", secondaryValue: 25 },

  // ── Set 15: Celestial (legendary) ──
  { id: "celestial_set_sword", name: "天界の神剣", nameEn: "Celestial Divine Blade", slot: "sword", stat: "atk", bonus: 75, cost: 80, icon: "🌠", description: "Forged from a fallen star by heavenly smiths", setId: "celestial", rarity: "legendary", secondaryStat: "atkBonus", secondaryValue: 30 },
  { id: "celestial_set_armor", name: "天界の羽衣", nameEn: "Celestial Hagoromo", slot: "armor", stat: "def", bonus: 72, cost: 80, icon: "🌠", description: "A feathered robe of the celestial maidens", setId: "celestial", rarity: "legendary", secondaryStat: "atkBonus", secondaryValue: 30 },
  { id: "celestial_set_charm", name: "天界の星珠", nameEn: "Celestial Star Jewel", slot: "charm", stat: "hp", bonus: 700, cost: 80, icon: "🌠", description: "A jewel containing an entire constellation", setId: "celestial", rarity: "legendary", secondaryStat: "atkBonus", secondaryValue: 30 },
];

// ─── Helper: item ID → set lookup ────────────────────────────────────

const _itemToSet = new Map<string, EquipmentSet>();
for (const set of EQUIPMENT_SETS) {
  for (const itemId of set.items) {
    _itemToSet.set(itemId, set);
  }
}

/**
 * Given three equipped item IDs, returns the active set bonus if all three
 * belong to the same set, otherwise null.
 */
export function getActiveSetBonus(
  equippedSword: string | null,
  equippedArmor: string | null,
  equippedCharm: string | null,
): EquipmentSet | null {
  if (!equippedSword || !equippedArmor || !equippedCharm) return null;

  const swordSet = _itemToSet.get(equippedSword);
  if (!swordSet) return null;

  const armorSet = _itemToSet.get(equippedArmor);
  const charmSet = _itemToSet.get(equippedCharm);

  if (swordSet === armorSet && armorSet === charmSet) return swordSet;
  return null;
}

/**
 * Returns the EquipmentSet an item belongs to, or null if it's not a set item.
 */
export function getItemSet(itemId: string): EquipmentSet | null {
  return _itemToSet.get(itemId) ?? null;
}

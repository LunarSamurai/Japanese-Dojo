import { SkillNode } from "../types";

const CATEGORIES = [
  { id: "atk", name: "\u653B\u6483\u306E\u9053", nameEn: "Path of Attack", icon: "\u2694\uFE0F", stat: "atk" as const },
  { id: "def", name: "\u5B88\u8B77\u306E\u9053", nameEn: "Path of Defense", icon: "\uD83D\uDEE1\uFE0F", stat: "def" as const },
  { id: "hp", name: "\u751F\u547D\u306E\u9053", nameEn: "Path of Life", icon: "\u2764\uFE0F", stat: "hp" as const },
  { id: "gold", name: "\u8CA1\u5B9D\u306E\u9053", nameEn: "Path of Treasure", icon: "\uD83E\uDE99", stat: "goldMult" as const },
  { id: "xp", name: "\u77E5\u6075\u306E\u9053", nameEn: "Path of Wisdom", icon: "\uD83D\uDCD6", stat: "xpMult" as const },
  { id: "omamori", name: "\u970A\u529B\u306E\u9053", nameEn: "Path of Spirit", icon: "\uD83C\uDFEE", stat: "omamoriMult" as const },
  { id: "equip", name: "\u935B\u51B6\u306E\u9053", nameEn: "Path of the Smith", icon: "\uD83D\uDD28", stat: "equipBonus" as const },
  { id: "lifesteal", name: "\u5438\u8840\u306E\u9053", nameEn: "Path of Vitality", icon: "\uD83E\uDE78", stat: "lifesteal" as const },
  { id: "supreme", name: "\u8987\u9053", nameEn: "Path of Supremacy", icon: "\uD83D\uDC51", stat: "mixed" as const },
];

// Name parts per category
const NAME_PARTS: Record<string, string[]> = {
  atk: ["\u659C", "\u6483", "\u7834", "\u7A81", "\u88C2", "\u5203", "\u5263", "\u62F3", "\u96F7", "\u708E", "\u5D50", "\u9F8D", "\u6B66", "\u6226", "\u6BBA", "\u900E", "\u821E", "\u725B", "\u864E", "\u9B3C", "\u795E", "\u4EC7", "\u72C2", "\u88C2", "\u71C3", "\u5B87", "\u5929", "\u5730", "\u706B", "\u6C34"],
  def: ["\u76FE", "\u58C1", "\u93E7", "\u5805", "\u5B88", "\u8B77", "\u7D50", "\u5C01", "\u5CA9", "\u9244", "\u57CE", "\u9632", "\u7F85", "\u5854", "\u91D1", "\u77F3", "\u571F", "\u6728", "\u6839", "\u4E38", "\u9663", "\u5B9D", "\u7384", "\u5FCD", "\u8010", "\u9577", "\u56FA", "\u5B89", "\u6CC9", "\u6CC1"],
  hp: ["\u547D", "\u5FC3", "\u9B42", "\u6C17", "\u8840", "\u6D3B", "\u751F", "\u7652", "\u970A", "\u529B", "\u82B1", "\u6625", "\u5149", "\u671B", "\u6075", "\u798F", "\u5BFF", "\u5B9D", "\u6811", "\u7DD1", "\u6708", "\u661F", "\u7FBD", "\u98A8", "\u6D77", "\u7A7A", "\u96F2", "\u96E8", "\u96EA", "\u5DDD"],
  gold: ["\u8CA1", "\u5B9D", "\u91D1", "\u73E0", "\u7FE0", "\u7389", "\u7389", "\u9280", "\u9285", "\u7ACB", "\u5546", "\u5E02", "\u5BCC", "\u8C4A", "\u798F", "\u7984", "\u7984", "\u5023", "\u904B", "\u53CE", "\u5229", "\u76CA", "\u5FD7", "\u5E78", "\u5B9D", "\u71C8", "\u5149", "\u8F1D", "\u5F69", "\u8C4A"],
  xp: ["\u77E5", "\u6167", "\u5B66", "\u66F8", "\u7B46", "\u58A8", "\u7D19", "\u5377", "\u53E4", "\u53F2", "\u6587", "\u8A00", "\u8A9E", "\u8B80", "\u8A18", "\u8A18", "\u601D", "\u7406", "\u8AD6", "\u8A3C", "\u554F", "\u7B54", "\u9053", "\u7FA9", "\u5FB3", "\u4FE1", "\u793C", "\u6559", "\u5C0E", "\u660E"],
  omamori: ["\u970A", "\u795E", "\u7948", "\u795D", "\u4F5B", "\u5BFA", "\u793E", "\u9580", "\u6BBF", "\u5854", "\u9999", "\u7D50", "\u5370", "\u5449", "\u771F", "\u5143", "\u7D20", "\u6CE2", "\u6D41", "\u52D5", "\u9759", "\u5922", "\u5E7B", "\u5F71", "\u6708", "\u6669", "\u5BB5", "\u66C7", "\u6F84", "\u6DF1"],
  equip: ["\u92FC", "\u786C", "\u5320", "\u934B", "\u7149", "\u6253", "\u5203", "\u91DD", "\u91D8", "\u939A", "\u7089", "\u706B", "\u71B1", "\u51B6", "\u92F3", "\u5263", "\u69CD", "\u5F13", "\u77E2", "\u7D66", "\u623B", "\u7C8B", "\u5BD8", "\u5DE7", "\u6975", "\u7DF4", "\u78E8", "\u7814", "\u938C", "\u65A7"],
  lifesteal: ["\u5438", "\u8840", "\u98F2", "\u98E2", "\u98DF", "\u53CE", "\u596A", "\u63A0", "\u522A", "\u55B0", "\u6E07", "\u9913", "\u9B3C", "\u7259", "\u547D", "\u7CBE", "\u76D7", "\u53D6", "\u596A", "\u63E1", "\u5F15", "\u62BD", "\u62BD", "\u6CE8", "\u6F0F", "\u6D41", "\u6CC1", "\u6CE2", "\u8108", "\u6F6E"],
  supreme: ["\u8987", "\u738B", "\u7687", "\u5E1D", "\u5929", "\u5730", "\u4E7E", "\u5764", "\u9F8D", "\u9CF3", "\u864E", "\u4E80", "\u5143", "\u5B87", "\u5B99", "\u7121", "\u9650", "\u6975", "\u8D85", "\u7D76", "\u795E", "\u8056", "\u4EC1", "\u7FA9", "\u667A", "\u52C7", "\u4FE1", "\u5FCD", "\u7D71", "\u8987"],
};

const EN_PARTS: Record<string, string[][]> = {
  atk: [
    ["Slash", "Strike", "Break", "Pierce", "Rend", "Blade", "Sword", "Fist", "Thunder", "Flame", "Storm", "Dragon", "Martial", "Battle", "Kill", "Chase", "Dance", "Ox", "Tiger", "Demon", "Divine", "Revenge", "Fury", "Tear", "Blaze", "Cosmic", "Heaven", "Earth", "Fire", "Water"],
    ["Force", "Edge", "Art", "Might", "Wave", "Spirit", "Blow", "Rush", "Rage", "Will", "Fang", "Claw", "Wing", "Heart", "Soul", "Mark", "Way", "Path", "Form", "Rise"],
  ],
  def: [
    ["Shield", "Wall", "Armor", "Hard", "Guard", "Protect", "Bind", "Seal", "Rock", "Iron", "Castle", "Ward", "Net", "Tower", "Gold", "Stone", "Earth", "Wood", "Root", "Circle", "Array", "Treasure", "Mystery", "Endure", "Resist", "Long", "Firm", "Peace", "Spring", "Flow"],
    ["Shell", "Stance", "Aura", "Barrier", "Gate", "Hold", "Core", "Pact", "Vow", "Oath", "Bond", "Crest", "Sigil", "Ward", "Ring", "Aegis", "Bulwark", "Bastion", "Haven", "Keep"],
  ],
  hp: [
    ["Life", "Heart", "Soul", "Spirit", "Blood", "Vital", "Birth", "Heal", "Ghost", "Power", "Flower", "Spring", "Light", "Hope", "Grace", "Fortune", "Longevity", "Jewel", "Tree", "Green", "Moon", "Star", "Feather", "Wind", "Sea", "Sky", "Cloud", "Rain", "Snow", "River"],
    ["Pulse", "Beat", "Breath", "Bloom", "Glow", "Charm", "Bless", "Kiss", "Touch", "Wave", "Flow", "Dew", "Mist", "Dawn", "Tide", "Song", "Dream", "Wish", "Gift", "Aura"],
  ],
  gold: [
    ["Wealth", "Treasure", "Gold", "Pearl", "Jade", "Gem", "Jewel", "Silver", "Bronze", "Noble", "Trade", "Market", "Rich", "Bounty", "Fortune", "Bounty", "Profit", "Luck", "Gain", "Yield", "Return", "Bonus", "Will", "Joy", "Prize", "Lamp", "Light", "Shine", "Color", "Plenty"],
    ["Coin", "Purse", "Chest", "Vault", "Hoard", "Cache", "Trove", "Loot", "Spoil", "Boon", "Gift", "Toll", "Mint", "Bank", "Fund", "Stock", "Bond", "Haul", "Pile", "Sum"],
  ],
  xp: [
    ["Know", "Wise", "Learn", "Book", "Pen", "Ink", "Paper", "Scroll", "Ancient", "History", "Script", "Word", "Language", "Read", "Memory", "Record", "Thought", "Reason", "Theory", "Proof", "Question", "Answer", "Path", "Justice", "Virtue", "Faith", "Rite", "Teach", "Guide", "Bright"],
    ["Lore", "Tome", "Mind", "Sage", "Eye", "Gaze", "Wit", "Sense", "Art", "Craft", "Study", "Focus", "Insight", "Depth", "Truth", "Riddle", "Puzzle", "Key", "Code", "Rune"],
  ],
  omamori: [
    ["Spirit", "Divine", "Pray", "Bless", "Buddha", "Temple", "Shrine", "Gate", "Hall", "Spire", "Incense", "Bond", "Seal", "Mantra", "True", "Origin", "Essence", "Wave", "Flow", "Motion", "Calm", "Dream", "Phantom", "Shadow", "Moon", "Night", "Dusk", "Haze", "Clear", "Deep"],
    ["Aura", "Rite", "Chant", "Glyph", "Rune", "Sigil", "Star", "Orb", "Gem", "Bell", "Veil", "Mist", "Echo", "Pulse", "Flame", "Spark", "Wisp", "Shade", "Gleam", "Charm"],
  ],
  equip: [
    ["Steel", "Hard", "Master", "Forge", "Temper", "Strike", "Edge", "Needle", "Nail", "Hammer", "Furnace", "Fire", "Heat", "Smelt", "Cast", "Sword", "Spear", "Bow", "Arrow", "Supply", "Restore", "Pure", "Keen", "Clever", "Peak", "Drill", "Polish", "Grind", "Sickle", "Axe"],
    ["Work", "Craft", "Smith", "Hand", "Art", "Tool", "Make", "Build", "Shape", "Mold", "Hone", "Whet", "File", "Carve", "Join", "Weld", "Bind", "Link", "Rivet", "Alloy"],
  ],
  lifesteal: [
    ["Drain", "Siphon", "Leech", "Absorb", "Devour", "Feed", "Consume", "Harvest", "Reap", "Drink", "Thirst", "Hunger", "Vampire", "Blood", "Vital", "Essence", "Steal", "Take", "Claim", "Grasp", "Pull", "Draw", "Extract", "Channel", "Funnel", "Flow", "Stream", "Surge", "Pulse", "Tide"],
    ["Life", "Force", "Blood", "Vigor", "Vitality", "Health", "Soul", "Aura", "Glow", "Spark", "Touch", "Grip", "Fang", "Bite", "Kiss", "Breath", "Wave", "Mist", "Shadow", "Mark"],
  ],
  supreme: [
    ["Supreme", "King", "Emperor", "Ruler", "Heaven", "Earth", "Yang", "Yin", "Dragon", "Phoenix", "Tiger", "Turtle", "Origin", "Cosmos", "Universe", "Void", "Infinite", "Ultimate", "Beyond", "Absolute", "Divine", "Holy", "Benevolent", "Righteous", "Wise", "Brave", "Faithful", "Enduring", "Unifying", "Dominant"],
    ["Crown", "Throne", "Reign", "Decree", "Will", "Law", "Order", "Fate", "Doom", "Glory", "Power", "Might", "Force", "Blade", "Shield", "Star", "Sun", "Moon", "World", "Age"],
  ],
};

// Tier config: [nodeCount, minAwakening, maxAwakening, cost]
const TIER_CONFIG: [number, number, number, number][] = [
  [20, 1, 2, 1],   // Tier 1
  [25, 3, 5, 1],   // Tier 2
  [30, 6, 9, 1],   // Tier 3 (some cost 2)
  [25, 10, 14, 2],  // Tier 4
  [15, 15, 19, 2],  // Tier 5 (some cost 3)
  [15, 20, 25, 3],  // Tier 6
];

// Value per stat type per tier (1-indexed tier)
const VALUES: Record<string, number[]> = {
  atk:         [0, 15, 15, 15, 15, 15, 15],
  def:         [0, 15, 15, 15, 15, 15, 15],
  hp:          [0, 15, 15, 15, 15, 15, 15],
  goldMult:    [0, 15, 15, 15, 15, 15, 15],
  xpMult:      [0, 15, 15, 15, 15, 15, 15],
  omamoriMult: [0, 15, 15, 15, 15, 15, 15],
  equipBonus:  [0, 15, 15, 15, 15, 15, 15],
  lifesteal:   [0, 15, 15, 15, 15, 15, 15],
};

// Supremacy cycles through these stats
const SUPREME_CYCLE: ("atk" | "def" | "hp" | "goldMult")[] = ["atk", "def", "hp", "goldMult"];

function getStatDescription(stat: string, value: number): string {
  switch (stat) {
    case "atk": return `Attack +${value}`;
    case "def": return `Defense +${value}`;
    case "hp": return `Max HP +${value}`;
    case "goldMult": return `Gold +${value}%`;
    case "xpMult": return `XP +${value}%`;
    case "omamoriMult": return `Omamori +${value}%`;
    case "equipBonus": return `Equipment bonus +${value}`;
    case "lifesteal": return `Lifesteal +${value}%`;
    case "mixed": return `Mixed bonus +${value}`;
    default: return `+${value}`;
  }
}

function generateSkillTree(): SkillNode[] {
  const nodes: SkillNode[] = [];

  for (const cat of CATEGORIES) {
    const jp = NAME_PARTS[cat.id];
    const enFirst = EN_PARTS[cat.id][0];
    const enSecond = EN_PARTS[cat.id][1];
    const jpLen = jp.length;
    const enFirstLen = enFirst.length;
    const enSecondLen = enSecond.length;

    // Pre-generate all unique jp/en name pairs for this category (130 needed)
    // Use sequential grid traversal to avoid collisions
    const jpNames: string[] = [];
    const enNames: string[] = [];
    const usedJp = new Set<string>();
    const usedEn = new Set<string>();

    for (let a = 0; a < jpLen && jpNames.length < 130; a++) {
      for (let b = 0; b < jpLen && jpNames.length < 130; b++) {
        if (a === b) continue; // avoid doubled kanji
        const name = jp[a] + jp[b];
        if (!usedJp.has(name)) {
          usedJp.add(name);
          jpNames.push(name);
        }
      }
    }

    for (let a = 0; a < enFirstLen && enNames.length < 130; a++) {
      for (let b = 0; b < enSecondLen && enNames.length < 130; b++) {
        const name = `${enFirst[a]} ${enSecond[b]}`;
        if (!usedEn.has(name)) {
          usedEn.add(name);
          enNames.push(name);
        }
      }
    }

    let nodeIndex = 0;
    let prevNodeId: string | null = null;

    for (let tierIdx = 0; tierIdx < TIER_CONFIG.length; tierIdx++) {
      const tier = tierIdx + 1;
      const [count, , , baseCost] = TIER_CONFIG[tierIdx];

      for (let i = 0; i < count; i++) {
        const nodeId = `${cat.id}-t${tier}-${i}`;
        const jpName = jpNames[nodeIndex];
        const enName = enNames[nodeIndex];

        // Determine stat and value
        let stat = cat.stat;
        let value: number;

        if (cat.id === "supreme") {
          const cycleStat = SUPREME_CYCLE[(nodeIndex) % SUPREME_CYCLE.length];
          stat = "mixed";
          const baseVal = VALUES[cycleStat][tier];
          value = Math.round(baseVal * 1.5);
        } else {
          value = VALUES[stat][tier];
        }

        // Vary cost slightly for tiers 3 and 5
        let cost = baseCost;
        if (tier === 3 && i >= 20) cost = 2;
        if (tier === 5 && i >= 10) cost = 3;

        // Requires: previous node in chain
        const requires: string[] = [];
        if (prevNodeId) {
          requires.push(prevNodeId);
        }

        // Supremacy cross-references: first node of each tier after tier 1
        // requires a random node from another category
        if (cat.id === "supreme" && i === 0 && tier > 1) {
          const crossCatIdx = (tier - 1) % 7; // skip supreme itself
          const crossCat = CATEGORIES.filter(c => c.id !== "supreme")[crossCatIdx];
          const crossTier = Math.max(1, tier - 1);
          const crossNodeId = `${crossCat.id}-t${crossTier}-0`;
          requires.push(crossNodeId);
        }

        const description = getStatDescription(stat === "mixed" ? SUPREME_CYCLE[nodeIndex % SUPREME_CYCLE.length] : stat, value);

        nodes.push({
          id: nodeId,
          category: cat.id,
          tier,
          name: jpName,
          nameEn: enName,
          description,
          stat,
          value,
          cost,
          requires,
          icon: cat.icon,
        });

        prevNodeId = nodeId;
        nodeIndex++;
      }
    }
  }

  return nodes;
}

export const SKILL_TREE: SkillNode[] = generateSkillTree();
export const SKILL_CATEGORIES = CATEGORIES;

export function getRequiredAwakening(tier: number): number {
  const minAwakenings = [0, 1, 3, 6, 10, 15, 20];
  return minAwakenings[tier] ?? 20;
}

export function isNodeUnlocked(
  node: SkillNode,
  awakeningCount: number,
  allocatedNodes: string[]
): boolean {
  // Check awakening requirement
  if (awakeningCount < getRequiredAwakening(node.tier)) {
    return false;
  }
  // Check all prerequisite nodes are allocated
  for (const reqId of node.requires) {
    if (!allocatedNodes.includes(reqId)) {
      return false;
    }
  }
  return true;
}

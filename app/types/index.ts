export interface VocabItem {
  j: string;
  r: string;
  e: string;
}

export interface PhraseItem {
  jp: string;
  tr: string;
}

export interface GrammarExample {
  jp?: string;
  japanese?: string;
  tr?: string;
  english?: string;
}

export interface GrammarItem {
  p?: string;
  pattern?: string;
  ex?: string;
  tr?: string;
  note?: string;
  explanation?: string;
  examples?: GrammarExample[];
}

export interface QuizItem {
  q: string;
  opts: string[];
  a: number;
}

export interface KanjiItem {
  char: string;
  on: string;
  kun: string;
  meaning: string;
  examples?: { word: string; reading: string; meaning: string }[];
}

export interface ReadingPassage {
  title: string;
  titleEn: string;
  text: string;
  translation: string;
  notes?: string[];
}

export interface Lesson {
  id: string;
  lesson?: number;
  title: string;
  jp: string;
  book?: string;
  category?: string;
  xp: number;
  coins: number;
  vocab?: VocabItem[];
  phrases?: PhraseItem[];
  grammar?: GrammarItem[];
  dialogue?: PhraseItem[];
  tips?: string[];
  quiz?: QuizItem[];
  situation?: string;
  kanji?: KanjiItem[];
  reading?: ReadingPassage[];
}

export interface Upgrade {
  id: string;
  name: string;
  en: string;
  desc: string;
  icon: string;
  cost: number;
  category?: "study" | "defense";
  defenseBonus?: number;
}

export interface DemonType {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  baseHp: number;
  baseDmg: number;
  speed: number;
  description: string;
}

export interface WaveConfig {
  waveNumber: number;
  demons: { demonId: string; count: number }[];
  bonusCoins: number;
  bonusXp: number;
}

export interface TempleState {
  hp: number;
  maxHp: number;
  waveNumber: number;
  demonsDefeated: number;
  wavesCleared: number;
  lastTickAt: string;
  totalGoldEarned: number;
  totalKills: number;
}

export interface HeroState {
  atk: number;
  def: number;
  hp: number;
  maxHp: number;
  sword: string | null;       // base equipment slot
  armor: string | null;
  charm: string | null;
  legendarySword: string | null;  // legendary set equipment slot (stacks with base)
  legendaryArmor: string | null;
  legendaryCharm: string | null;
}

export interface HeroEquipment {
  id: string;
  name: string;
  nameEn: string;
  slot: "sword" | "armor" | "charm";
  stat: "atk" | "def" | "hp";
  bonus: number;
  cost: number; // omamori cost
  icon: string;
  description: string;
}

export interface BossTier {
  tier: number;
  name: string;
  emoji: string;
  hpMultiplier: number;
  omamoriReward: number;
  waveInterval: number; // boss appears every N waves
}

export interface SRSCard {
  id: string;
  lessonId: string;
  type: "vocab" | "grammar";
  front: string;
  back: string;
  reading?: string;
  context?: string;
  interval: number;
  repetitions: number;
  easeFactor: number;
  dueDate: string;
  lastReview?: string;
}

export type SRSRating = 0 | 1 | 2 | 3; // Again / Hard / Good / Easy

export interface AwakeningState {
  count: number;
  skillPoints: number;
  allocatedNodes: string[];
  lifetimeCoins: number;
  lifetimeKills: number;
  lifetimeWaves: number;
}

export interface SkillNode {
  id: string;
  category: string;
  tier: number;
  name: string;
  nameEn: string;
  description: string;
  stat: "atk" | "def" | "hp" | "goldMult" | "xpMult" | "omamoriMult" | "equipBonus" | "lifesteal" | "mixed";
  value: number;
  cost: number;
  requires: string[];
  icon: string;
}

export interface GameState {
  xp: number;
  coins: number;
  omamori: number;
  streak: number;
  completed: Set<string>;
  owned: Set<string>;
  lastActiveDate: string;
  srsCards: Record<string, SRSCard>;
  reviewsToday: number;
  lastReviewDate: string;
  temple: TempleState;
  hero: HeroState;
  awakening: AwakeningState;
}

export interface QuizState {
  q: number;
  answers: boolean[];
  selected: number | null;
  done: boolean;
  hint: boolean;
}

export interface Toast {
  msg: string;
  type: string;
}

export type View = "dashboard" | "lessons" | "lesson" | "shop" | "profile" | "review" | "course" | "temple" | "hero" | "skilltree" | "social";

export interface UserProfile {
  id: string;
  display_name: string;
  bio: string;
  avatar_url: string | null;
  country: string;
  region: string;
  social_links: Record<string, string>;
  privacy: {
    profile_public: boolean;
    show_stats: boolean;
    show_guild: boolean;
  };
}

export interface Post {
  id: string;
  author_id: string;
  content: string;
  image_url: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  author?: UserProfile;
  liked_by_me?: boolean;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
  author?: UserProfile;
}

export interface Guild {
  id: string;
  name: string;
  description: string;
  banner_url: string | null;
  captain_id: string;
  level: number;
  total_xp: number;
  member_count: number;
  max_members: number;
  created_at: string;
}

export interface GuildMember {
  guild_id: string;
  user_id: string;
  role: "captain" | "council" | "member";
  joined_at: string;
  xp_contributed: number;
  profile?: UserProfile;
}

export interface GuildWar {
  id: string;
  attacker_guild_id: string;
  defender_guild_id: string;
  status: "active" | "attacker_won" | "defender_won" | "draw";
  attacker_damage: number;
  defender_damage: number;
  started_at: string;
  ends_at: string;
  attacker_guild?: Guild;
  defender_guild?: Guild;
}

export interface RaidBoss {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  baseHp: number;
  timerHours: number;
  rewardCoins: number;
  rewardXp: number;
}

export interface GuildRaid {
  id: string;
  guild_id: string;
  boss_name: string;
  boss_emoji: string;
  boss_hp: number;
  boss_max_hp: number;
  status: "active" | "victory" | "failed";
  started_at: string;
  ends_at: string;
  reward_coins: number;
  reward_xp: number;
}

export type BookId = "genki1" | "genki2" | "conv" | "quartet1" | "quartet2" | "tobira" | "advanced";

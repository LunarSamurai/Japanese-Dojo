import { createClient } from "./supabase/client";
import type { GameState, TempleState, HeroState, AwakeningState, SRSCard } from "../types";

const STORAGE_KEY = "nihongo-dojo-state";
const SYNC_DEBOUNCE = 2000;

interface SerializedState {
  xp: number;
  coins: number;
  omamori?: number;
  streak: number;
  completed: string[];
  owned: string[];
  lastActiveDate: string;
  srsCards?: Record<string, SRSCard>;
  reviewsToday?: number;
  lastReviewDate?: string;
  temple?: TempleState;
  hero?: HeroState;
  awakening?: AwakeningState;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function freshTemple(): TempleState {
  return { hp: 100, maxHp: 100, waveNumber: 0, demonsDefeated: 0, wavesCleared: 0, lastTickAt: new Date().toISOString(), totalGoldEarned: 0, totalKills: 0 };
}

function freshHero(): HeroState {
  return { atk: 10, def: 10, hp: 100, maxHp: 100, sword: null, armor: null, charm: null, legendarySword: null, legendaryArmor: null, legendaryCharm: null };
}

function freshAwakening(): AwakeningState {
  return { count: 0, skillPoints: 0, allocatedNodes: [], lifetimeCoins: 0, lifetimeKills: 0, lifetimeWaves: 0 };
}

export function freshState(): GameState {
  return {
    xp: 0, coins: 0, omamori: 0, streak: 0,
    completed: new Set<string>(),
    owned: new Set<string>(),
    lastActiveDate: today(),
    srsCards: {},
    reviewsToday: 0,
    lastReviewDate: today(),
    temple: freshTemple(),
    hero: freshHero(),
    awakening: freshAwakening(),
  };
}

// ── Local storage read/write (immediate, offline-first) ──

export function loadFromLocalStorage(): GameState {
  if (typeof window === "undefined") return freshState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshState();
    const s: SerializedState = JSON.parse(raw);
    return deserialize(s);
  } catch {
    return freshState();
  }
}

export function saveToLocalStorage(gs: GameState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serialize(gs)));
}

// ── Serialization helpers ──

function serialize(gs: GameState): SerializedState {
  return {
    xp: gs.xp,
    coins: gs.coins,
    omamori: gs.omamori,
    streak: gs.streak,
    completed: [...gs.completed],
    owned: [...gs.owned],
    lastActiveDate: gs.lastActiveDate,
    srsCards: gs.srsCards,
    reviewsToday: gs.reviewsToday,
    lastReviewDate: gs.lastReviewDate,
    temple: gs.temple,
    hero: gs.hero,
    awakening: gs.awakening,
  };
}

function deserialize(s: SerializedState): GameState {
  const todayStr = today();
  let streak = s.streak || 0;
  const lastDate = s.lastActiveDate || "";

  if (lastDate && lastDate !== todayStr) {
    const last = new Date(lastDate);
    const now = new Date(todayStr);
    const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > 1) streak = 0;
  }

  const reviewsToday = s.lastReviewDate === todayStr ? (s.reviewsToday || 0) : 0;

  return {
    xp: s.xp || 0,
    coins: s.coins || 0,
    omamori: s.omamori || 0,
    streak,
    completed: new Set(s.completed || []),
    owned: new Set(s.owned || []),
    lastActiveDate: todayStr,
    srsCards: s.srsCards || {},
    reviewsToday,
    lastReviewDate: s.lastReviewDate || todayStr,
    temple: { ...freshTemple(), ...(s.temple || {}) },
    hero: s.hero || freshHero(),
    awakening: s.awakening || freshAwakening(),
  };
}

// ── Supabase sync ──

export async function loadFromSupabase(userId: string): Promise<GameState | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("game_state")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data) return null;

  return deserialize({
    xp: data.xp,
    coins: data.coins,
    omamori: data.omamori || 0,
    streak: data.streak,
    completed: data.completed || [],
    owned: data.owned || [],
    lastActiveDate: data.last_active_date,
    srsCards: data.srs_cards || {},
    reviewsToday: data.reviews_today,
    lastReviewDate: data.last_review_date,
    temple: data.temple || undefined,
    hero: data.hero || undefined,
    awakening: data.awakening || undefined,
  });
}

export async function saveToSupabase(userId: string, gs: GameState) {
  const supabase = createClient();
  const s = serialize(gs);

  // Try full upsert first, fallback to core-only if new columns don't exist yet
  const fullPayload = {
    user_id: userId,
    xp: s.xp,
    coins: s.coins,
    omamori: s.omamori || 0,
    streak: s.streak,
    completed: s.completed,
    owned: s.owned,
    last_active_date: s.lastActiveDate,
    srs_cards: s.srsCards,
    reviews_today: s.reviewsToday,
    last_review_date: s.lastReviewDate,
    temple: s.temple,
    hero: s.hero,
    awakening: s.awakening,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("game_state").upsert(fullPayload);

  if (error) {
    console.warn("Supabase sync (full) failed, trying core-only:", error.message || error.code || JSON.stringify(error));
    // Fallback: only send columns from the original schema
    const { error: fallbackError } = await supabase.from("game_state").upsert({
      user_id: userId,
      xp: s.xp,
      coins: s.coins,
      streak: s.streak,
      completed: s.completed,
      owned: s.owned,
      last_active_date: s.lastActiveDate,
      srs_cards: s.srsCards,
      reviews_today: s.reviewsToday,
      last_review_date: s.lastReviewDate,
      temple: s.temple,
      updated_at: new Date().toISOString(),
    });
    if (fallbackError) console.error("Supabase sync (fallback) failed:", fallbackError.message || fallbackError.code);
  }
}

// ── Merge strategy: union sets, max numerics ──

export function mergeStates(local: GameState, remote: GameState): GameState {
  return {
    xp: Math.max(local.xp, remote.xp),
    coins: Math.max(local.coins, remote.coins),
    omamori: Math.max(local.omamori, remote.omamori),
    streak: Math.max(local.streak, remote.streak),
    completed: new Set([...local.completed, ...remote.completed]),
    owned: new Set([...local.owned, ...remote.owned]),
    lastActiveDate: local.lastActiveDate > remote.lastActiveDate ? local.lastActiveDate : remote.lastActiveDate,
    srsCards: (() => {
      // Merge SRS cards: keep the version with more reviews for each card
      const merged = { ...remote.srsCards };
      for (const [id, localCard] of Object.entries(local.srsCards)) {
        const remoteCard = merged[id];
        if (!remoteCard || localCard.repetitions > remoteCard.repetitions) {
          merged[id] = localCard;
        }
      }
      return merged;
    })(),
    reviewsToday: Math.max(local.reviewsToday, remote.reviewsToday),
    lastReviewDate: local.lastReviewDate > remote.lastReviewDate ? local.lastReviewDate : remote.lastReviewDate,
    temple: {
      hp: Math.max(local.temple.hp, remote.temple.hp),
      maxHp: Math.max(local.temple.maxHp, remote.temple.maxHp),
      waveNumber: Math.max(local.temple.waveNumber, remote.temple.waveNumber),
      demonsDefeated: Math.max(local.temple.demonsDefeated, remote.temple.demonsDefeated),
      wavesCleared: Math.max(local.temple.wavesCleared, remote.temple.wavesCleared),
      lastTickAt: local.temple.lastTickAt > remote.temple.lastTickAt ? local.temple.lastTickAt : remote.temple.lastTickAt,
      totalGoldEarned: Math.max(local.temple.totalGoldEarned, remote.temple.totalGoldEarned),
      totalKills: Math.max(local.temple.totalKills, remote.temple.totalKills),
    },
    hero: {
      atk: Math.max(local.hero.atk, remote.hero.atk),
      def: Math.max(local.hero.def, remote.hero.def),
      hp: Math.max(local.hero.hp, remote.hero.hp),
      maxHp: Math.max(local.hero.maxHp, remote.hero.maxHp),
      sword: local.hero.sword || remote.hero.sword,
      armor: local.hero.armor || remote.hero.armor,
      charm: local.hero.charm || remote.hero.charm,
      legendarySword: local.hero.legendarySword || remote.hero.legendarySword,
      legendaryArmor: local.hero.legendaryArmor || remote.hero.legendaryArmor,
      legendaryCharm: local.hero.legendaryCharm || remote.hero.legendaryCharm,
    },
    awakening: {
      count: Math.max(local.awakening.count, remote.awakening.count),
      skillPoints: Math.max(local.awakening.skillPoints, remote.awakening.skillPoints),
      allocatedNodes: [...new Set([...local.awakening.allocatedNodes, ...remote.awakening.allocatedNodes])],
      lifetimeCoins: Math.max(local.awakening.lifetimeCoins, remote.awakening.lifetimeCoins),
      lifetimeKills: Math.max(local.awakening.lifetimeKills, remote.awakening.lifetimeKills),
      lifetimeWaves: Math.max(local.awakening.lifetimeWaves, remote.awakening.lifetimeWaves),
    },
  };
}

// ── Debounced sync manager ──

let syncTimeout: ReturnType<typeof setTimeout> | null = null;

export function debouncedSyncToSupabase(userId: string | null, gs: GameState) {
  // Always save locally immediately
  saveToLocalStorage(gs);

  // Debounce Supabase write
  if (!userId) return;
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(() => {
    saveToSupabase(userId, gs);
  }, SYNC_DEBOUNCE);
}

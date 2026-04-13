"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import type { GameState } from "../types";
import {
  freshState,
  loadFromLocalStorage,
  loadFromSupabase,
  debouncedSyncToSupabase,
  clearGlobalStorage,
} from "../lib/sync";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Per-user game state hook.
 * Supabase is AUTHORITATIVE. localStorage is only a per-user offline cache.
 * No cross-user merging ever happens.
 */
export function useGameState(userId: string | null) {
  const [gs, setGsRaw] = useState<GameState>(freshState);
  const [loaded, setLoaded] = useState(false);
  const userIdRef = useRef<string | null>(userId);

  useEffect(() => {
    userIdRef.current = userId;
  }, [userId]);

  // Load state when userId becomes available
  useEffect(() => {
    if (!userId) {
      setGsRaw(freshState());
      setLoaded(true);
      return;
    }

    const uid = userId;
    async function init() {
      // Clean up old shared global key
      clearGlobalStorage();

      // Step 1: Try Supabase (authoritative source of truth)
      const remote = await loadFromSupabase(uid);

      if (remote) {
        // Supabase has data — USE IT DIRECTLY (no merge with localStorage)
        console.log(`[GameState] Loaded from Supabase for user ${uid.slice(0, 8)}...`);
        setGsRaw(remote);
        // Also cache to per-user localStorage for offline use
        debouncedSyncToSupabase(uid, remote);
      } else {
        // No Supabase record — check per-user localStorage (offline cache)
        const local = loadFromLocalStorage(uid);
        if (local.xp > 0 || local.completed.size > 0) {
          console.log(`[GameState] Using per-user localStorage cache for ${uid.slice(0, 8)}...`);
          setGsRaw(local);
          // Push local cache to Supabase
          debouncedSyncToSupabase(uid, local);
        } else {
          // Truly fresh user — start clean
          console.log(`[GameState] Fresh state for new user ${uid.slice(0, 8)}...`);
          setGsRaw(freshState());
        }
      }
      setLoaded(true);
    }

    setLoaded(false);
    init();
  }, [userId]);

  // Sync on every state change
  useEffect(() => {
    if (loaded && userIdRef.current) {
      debouncedSyncToSupabase(userIdRef.current, gs);
    }
  }, [gs, loaded]);

  const setGs = useCallback(
    (updater: GameState | ((prev: GameState) => GameState)) => {
      setGsRaw((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        return { ...next, lastActiveDate: today() };
      });
    },
    []
  );

  const bumpStreak = useCallback(() => {
    setGs((prev) => {
      if (prev.lastActiveDate === today() && prev.streak > 0) return prev;
      return { ...prev, streak: prev.streak + 1 };
    });
  }, [setGs]);

  return { gs, setGs, loaded, bumpStreak };
}

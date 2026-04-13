"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import type { GameState } from "../types";
import {
  freshState,
  loadFromLocalStorage,
  loadFromSupabase,
  mergeStates,
  debouncedSyncToSupabase,
  clearGlobalStorage,
} from "../lib/sync";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Per-user game state hook.
 * @param userId - The authenticated user's ID. null = not logged in yet.
 * State only loads once userId is provided. Each user gets isolated localStorage + Supabase data.
 */
export function useGameState(userId: string | null) {
  const [gs, setGsRaw] = useState<GameState>(freshState);
  const [loaded, setLoaded] = useState(false);
  const userIdRef = useRef<string | null>(userId);

  // Keep ref in sync
  useEffect(() => {
    userIdRef.current = userId;
  }, [userId]);

  // Load state when userId becomes available (auth resolved)
  useEffect(() => {
    if (!userId) {
      // Not logged in — show fresh state, don't load anything
      setGsRaw(freshState());
      setLoaded(true);
      return;
    }

    const uid = userId; // capture for async closure (TypeScript narrowing)
    async function init() {
      // Clean up old global key if it exists (migration)
      clearGlobalStorage();

      // Load per-user localStorage
      const local = loadFromLocalStorage(uid);

      // Load from Supabase (authoritative)
      const remote = await loadFromSupabase(uid);

      if (remote) {
        // Merge per-user local cache with Supabase (handles offline changes)
        const merged = mergeStates(local, remote);
        setGsRaw(merged);
      } else {
        // First login for this user — check if local has real data (migrated from old global key)
        if (local.xp > 0 || local.completed.size > 0) {
          // Migration case: local has data from old global key
          setGsRaw(local);
          debouncedSyncToSupabase(uid, local);
        } else {
          // Truly fresh user
          setGsRaw(freshState());
        }
      }
      setLoaded(true);
    }

    setLoaded(false);
    init();
  }, [userId]);

  // Sync to per-user localStorage + Supabase on state changes
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

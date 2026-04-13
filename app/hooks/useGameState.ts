"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import type { GameState } from "../types";
import {
  freshState,
  loadFromLocalStorage,
  loadFromSupabase,
  mergeStates,
  debouncedSyncToSupabase,
} from "../lib/sync";
import { createClient } from "../lib/supabase/client";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function useGameState() {
  const [gs, setGsRaw] = useState<GameState>(freshState);
  const [loaded, setLoaded] = useState(false);
  const userIdRef = useRef<string | null>(null);

  // Load state: try Supabase first, merge with localStorage, fallback to localStorage
  useEffect(() => {
    async function init() {
      const local = loadFromLocalStorage();
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        userIdRef.current = session.user.id;
        const remote = await loadFromSupabase(session.user.id);
        if (remote) {
          // Merge local + remote (handles offline changes)
          const merged = mergeStates(local, remote);
          setGsRaw(merged);
        } else {
          // First login — use local data (migration from localStorage)
          setGsRaw(local);
          // Save local data to Supabase
          debouncedSyncToSupabase(session.user.id, local);
        }
      } else {
        // Not authenticated — use localStorage only
        setGsRaw(local);
      }
      setLoaded(true);
    }
    init();
  }, []);

  // Sync to both localStorage and Supabase on state changes
  useEffect(() => {
    if (loaded) {
      debouncedSyncToSupabase(userIdRef.current, gs);
    }
  }, [gs, loaded]);

  // Listen for auth changes to update userId
  useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      userIdRef.current = session?.user?.id ?? null;
    });
    return () => subscription.unsubscribe();
  }, []);

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

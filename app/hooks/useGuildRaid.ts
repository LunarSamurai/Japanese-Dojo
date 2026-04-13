"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "../lib/supabase/client";
import type { GuildRaid } from "../types";

export function useGuildRaid(guildId: string | null) {
  const [activeRaid, setActiveRaid] = useState<GuildRaid | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchActiveRaid = useCallback(async () => {
    if (!guildId) { setLoading(false); return; }
    const { data } = await supabase
      .from("guild_raids")
      .select("*")
      .eq("guild_id", guildId)
      .eq("status", "active")
      .order("started_at", { ascending: false })
      .limit(1)
      .single();
    setActiveRaid(data as GuildRaid | null);
    setLoading(false);
  }, [guildId, supabase]);

  useEffect(() => { fetchActiveRaid(); }, [fetchActiveRaid]);

  // Subscribe to realtime HP changes
  useEffect(() => {
    if (!activeRaid) return;
    const channel = supabase
      .channel(`raid-${activeRaid.id}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "guild_raids", filter: `id=eq.${activeRaid.id}` }, (payload) => {
        setActiveRaid(payload.new as GuildRaid);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRaid?.id]);

  const startRaid = useCallback(async (bossName: string, bossEmoji: string, bossHp: number, timerHours: number, rewardCoins: number, rewardXp: number) => {
    if (!guildId) return;
    const endsAt = new Date(Date.now() + timerHours * 60 * 60 * 1000).toISOString();
    const { data, error } = await supabase
      .from("guild_raids")
      .insert({ guild_id: guildId, boss_name: bossName, boss_emoji: bossEmoji, boss_hp: bossHp, boss_max_hp: bossHp, ends_at: endsAt, reward_coins: rewardCoins, reward_xp: rewardXp })
      .select()
      .single();
    if (error) throw error;
    setActiveRaid(data as GuildRaid);
  }, [guildId, supabase]);

  const attackBoss = useCallback(async (raidId: string, userId: string, damage: number) => {
    // Record contribution
    const { data: existing } = await supabase
      .from("raid_contributions")
      .select("damage")
      .eq("raid_id", raidId)
      .eq("user_id", userId)
      .single();

    if (existing) {
      await supabase.from("raid_contributions")
        .update({ damage: existing.damage + damage })
        .eq("raid_id", raidId)
        .eq("user_id", userId);
    } else {
      await supabase.from("raid_contributions")
        .insert({ raid_id: raidId, user_id: userId, damage });
    }

    // Decrement boss HP
    if (activeRaid) {
      const newHp = Math.max(0, activeRaid.boss_hp - damage);
      const updates: Record<string, unknown> = { boss_hp: newHp };
      if (newHp <= 0) updates.status = "victory";
      await supabase.from("guild_raids").update(updates).eq("id", raidId);
    }

    await fetchActiveRaid();
  }, [activeRaid, supabase, fetchActiveRaid]);

  return { activeRaid, loading, startRaid, attackBoss, refresh: fetchActiveRaid };
}

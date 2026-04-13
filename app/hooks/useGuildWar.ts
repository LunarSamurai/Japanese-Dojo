"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "../lib/supabase/client";
import type { GuildWar, Guild, HeroState } from "../types";

export interface DuelResult {
  id: string;
  war_id: string;
  attacker_id: string;
  defender_id: string;
  attacker_name: string;
  defender_name: string;
  attacker_power: number;
  defender_power: number;
  winner_id: string;
  winner_guild_id: string;
  created_at: string;
}

export interface GuildLeaderboardEntry {
  id: string;
  name: string;
  war_points: number;
  member_count: number;
  level: number;
}

function calculateTotalPower(hero: HeroState): number {
  return hero.atk + hero.def + hero.hp / 10;
}

function resolveWinner(
  attackerPower: number,
  defenderPower: number
): "attacker" | "defender" {
  const attackerRoll = attackerPower * (0.85 + Math.random() * 0.3);
  const defenderRoll = defenderPower * (0.85 + Math.random() * 0.3);
  return attackerRoll >= defenderRoll ? "attacker" : "defender";
}

export function useGuildWar(guildId: string | null) {
  const [activeWar, setActiveWar] = useState<GuildWar | null>(null);
  const [duels, setDuels] = useState<DuelResult[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchActiveWar = useCallback(async () => {
    if (!guildId) {
      setLoading(false);
      return;
    }
    try {
      // Check for expired wars first and finalize them
      const now = new Date().toISOString();
      const { data: expiredWars } = await supabase
        .from("guild_wars")
        .select("*")
        .or(`attacker_guild_id.eq.${guildId},defender_guild_id.eq.${guildId}`)
        .eq("status", "active")
        .lt("ends_at", now);

      if (expiredWars && expiredWars.length > 0) {
        for (const war of expiredWars) {
          let status: string;
          if (war.attacker_damage > war.defender_damage) {
            status = "attacker_won";
          } else if (war.defender_damage > war.attacker_damage) {
            status = "defender_won";
          } else {
            status = "draw";
          }
          await supabase
            .from("guild_wars")
            .update({ status })
            .eq("id", war.id);
        }
      }

      // Now fetch active war
      const { data } = await supabase
        .from("guild_wars")
        .select(
          "*, attacker_guild:guilds!attacker_guild_id(*), defender_guild:guilds!defender_guild_id(*)"
        )
        .or(`attacker_guild_id.eq.${guildId},defender_guild_id.eq.${guildId}`)
        .eq("status", "active")
        .order("started_at", { ascending: false })
        .limit(1)
        .single();

      setActiveWar(data as GuildWar | null);
    } catch {
      setActiveWar(null);
    }
    setLoading(false);
  }, [guildId, supabase]);

  useEffect(() => {
    fetchActiveWar();
  }, [fetchActiveWar]);

  const declareWar = useCallback(
    async (targetGuildId: string) => {
      if (!guildId) return;
      const endsAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
      const { data, error } = await supabase
        .from("guild_wars")
        .insert({
          attacker_guild_id: guildId,
          defender_guild_id: targetGuildId,
          ends_at: endsAt,
        })
        .select(
          "*, attacker_guild:guilds!attacker_guild_id(*), defender_guild:guilds!defender_guild_id(*)"
        )
        .single();
      if (error) throw error;
      setActiveWar(data as GuildWar);
    },
    [guildId, supabase]
  );

  const startDuel = useCallback(
    async (
      warId: string,
      attackerId: string,
      attackerName: string,
      attackerHero: HeroState,
      defenderId: string,
      defenderName: string,
      defenderHero: HeroState
    ): Promise<DuelResult> => {
      if (!guildId) throw new Error("No guild");

      const attackerPower = calculateTotalPower(attackerHero);
      const defenderPower = calculateTotalPower(defenderHero);
      const winner = resolveWinner(attackerPower, defenderPower);

      const winnerId = winner === "attacker" ? attackerId : defenderId;
      const winnerGuildId =
        winner === "attacker"
          ? activeWar?.attacker_guild_id
          : activeWar?.defender_guild_id;

      const { data, error } = await supabase
        .from("duel_results")
        .insert({
          war_id: warId,
          attacker_id: attackerId,
          defender_id: defenderId,
          attacker_name: attackerName,
          defender_name: defenderName,
          attacker_power: Math.round(attackerPower),
          defender_power: Math.round(defenderPower),
          winner_id: winnerId,
          winner_guild_id: winnerGuildId,
        })
        .select()
        .single();

      if (error) throw error;

      // Award point to winner's guild
      const isAttackerGuildWin =
        winnerGuildId === activeWar?.attacker_guild_id;
      const field = isAttackerGuildWin
        ? "attacker_damage"
        : "defender_damage";

      try {
        await supabase.rpc("increment_war_damage", {
          war_id_param: warId,
          field_name: field,
          amount: 1,
        });
      } catch {
        const currentDmg = isAttackerGuildWin
          ? (activeWar?.attacker_damage || 0)
          : (activeWar?.defender_damage || 0);
        await supabase
          .from("guild_wars")
          .update({ [field]: currentDmg + 1 })
          .eq("id", warId);
      }

      // Also increment guild war_points
      if (winnerGuildId) {
        try {
          await supabase.rpc("increment_guild_war_points", {
            guild_id_param: winnerGuildId,
            amount: 1,
          });
        } catch {
          // Fallback: read and update
          const { data: guild } = await supabase
            .from("guilds")
            .select("war_points")
            .eq("id", winnerGuildId)
            .single();
          if (guild) {
            await supabase
              .from("guilds")
              .update({ war_points: (guild.war_points || 0) + 1 })
              .eq("id", winnerGuildId);
          }
        }
      }

      const result = data as DuelResult;
      setDuels((prev) => [result, ...prev]);
      await fetchActiveWar();
      return result;
    },
    [guildId, activeWar, supabase, fetchActiveWar]
  );

  const fetchWarDuels = useCallback(
    async (warId: string) => {
      const { data } = await supabase
        .from("duel_results")
        .select("*")
        .eq("war_id", warId)
        .order("created_at", { ascending: false });

      const results = (data || []) as DuelResult[];
      setDuels(results);
      return results;
    },
    [supabase]
  );

  const fetchGuildLeaderboard = useCallback(async (): Promise<
    GuildLeaderboardEntry[]
  > => {
    const { data } = await supabase
      .from("guilds")
      .select("id, name, war_points, member_count, level")
      .order("war_points", { ascending: false })
      .limit(20);

    return (data || []) as GuildLeaderboardEntry[];
  }, [supabase]);

  const fetchWarHistory = useCallback(
    async (limit = 5): Promise<GuildWar[]> => {
      if (!guildId) return [];
      const { data } = await supabase
        .from("guild_wars")
        .select(
          "*, attacker_guild:guilds!attacker_guild_id(*), defender_guild:guilds!defender_guild_id(*)"
        )
        .or(`attacker_guild_id.eq.${guildId},defender_guild_id.eq.${guildId}`)
        .neq("status", "active")
        .order("started_at", { ascending: false })
        .limit(limit);

      return (data || []) as GuildWar[];
    },
    [guildId, supabase]
  );

  const fetchEnemyMembers = useCallback(
    async (enemyGuildId: string) => {
      const { data } = await supabase
        .from("guild_members")
        .select("user_id, profile:profiles(id, display_name)")
        .eq("guild_id", enemyGuildId);

      return (data || []).map((m: Record<string, unknown>) => ({
        user_id: m.user_id as string,
        display_name:
          (m.profile as Record<string, unknown>)?.display_name as string ||
          "Unknown",
      }));
    },
    [supabase]
  );

  return {
    activeWar,
    duels,
    loading,
    declareWar,
    startDuel,
    fetchWarDuels,
    fetchGuildLeaderboard,
    fetchWarHistory,
    fetchEnemyMembers,
    refresh: fetchActiveWar,
  };
}

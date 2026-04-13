"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "../lib/supabase/client";
import type { Guild, GuildMember, UserProfile } from "../types";

interface GuildState {
  guild: Guild | null;
  members: (GuildMember & { profile?: UserProfile })[];
  myRole: "captain" | "council" | "member" | null;
  loading: boolean;
}

export function useGuild(userId: string | null) {
  const [state, setState] = useState<GuildState>({ guild: null, members: [], myRole: null, loading: true });
  const supabase = createClient();

  const loadMyGuild = useCallback(async () => {
    if (!userId) { setState((s) => ({ ...s, loading: false })); return; }
    const { data: membership } = await supabase
      .from("guild_members")
      .select("guild_id, role")
      .eq("user_id", userId)
      .single();

    if (!membership) {
      setState({ guild: null, members: [], myRole: null, loading: false });
      return;
    }

    const { data: guild } = await supabase
      .from("guilds")
      .select("*")
      .eq("id", membership.guild_id)
      .single();

    const { data: memberRows } = await supabase
      .from("guild_members")
      .select("*")
      .eq("guild_id", membership.guild_id)
      .order("xp_contributed", { ascending: false });

    // Fetch profiles for all members separately (avoids FK join issues)
    const memberList = memberRows || [];
    const userIds = memberList.map((m: { user_id: string }) => m.user_id);
    let profileMap: Record<string, UserProfile> = {};
    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .in("id", userIds);
      if (profiles) {
        profileMap = Object.fromEntries(profiles.map((p: UserProfile) => [p.id, p]));
      }
    }

    const membersWithProfiles = memberList.map((m: GuildMember) => ({
      ...m,
      profile: profileMap[m.user_id] || undefined,
    }));

    setState({
      guild: guild as Guild | null,
      members: membersWithProfiles as (GuildMember & { profile?: UserProfile })[],
      myRole: membership.role as "captain" | "council" | "member",
      loading: false,
    });
  }, [userId, supabase]);

  useEffect(() => { loadMyGuild(); }, [loadMyGuild]);

  const searchGuilds = useCallback(async (query: string): Promise<Guild[]> => {
    const { data } = await supabase
      .from("guilds")
      .select("*")
      .ilike("name", `%${query}%`)
      .order("member_count", { ascending: false })
      .limit(20);
    return (data || []) as Guild[];
  }, [supabase]);

  const browseGuilds = useCallback(async (): Promise<Guild[]> => {
    const { data } = await supabase
      .from("guilds")
      .select("*")
      .order("member_count", { ascending: false })
      .limit(30);
    return (data || []) as Guild[];
  }, [supabase]);

  const createGuild = useCallback(async (name: string, description: string) => {
    if (!userId) return;
    const { data: guild, error } = await supabase
      .from("guilds")
      .insert({ name, description, captain_id: userId })
      .select()
      .single();
    if (error) throw error;
    await supabase.from("guild_members").insert({ guild_id: guild.id, user_id: userId, role: "captain" });
    await loadMyGuild();
  }, [userId, supabase, loadMyGuild]);

  const joinGuild = useCallback(async (guildId: string) => {
    if (!userId) return;
    await supabase.from("guild_members").insert({ guild_id: guildId, user_id: userId, role: "member" });
    await loadMyGuild();
  }, [userId, supabase, loadMyGuild]);

  const leaveGuild = useCallback(async () => {
    if (!userId || !state.guild) return;
    await supabase.from("guild_members").delete().eq("guild_id", state.guild.id).eq("user_id", userId);
    setState({ guild: null, members: [], myRole: null, loading: false });
  }, [userId, state.guild, supabase]);

  const kickMember = useCallback(async (targetUserId: string) => {
    if (!state.guild) return;
    await supabase.from("guild_members").delete().eq("guild_id", state.guild.id).eq("user_id", targetUserId);
    await loadMyGuild();
  }, [state.guild, supabase, loadMyGuild]);

  const promoteMember = useCallback(async (targetUserId: string, role: "council" | "member") => {
    if (!state.guild) return;
    await supabase.from("guild_members").update({ role }).eq("guild_id", state.guild.id).eq("user_id", targetUserId);
    await loadMyGuild();
  }, [state.guild, supabase, loadMyGuild]);

  const sendMessage = useCallback(async (content: string) => {
    if (!userId || !state.guild) return;
    await supabase.from("guild_messages").insert({ guild_id: state.guild.id, author_id: userId, content });
  }, [userId, state.guild, supabase]);

  return {
    ...state,
    searchGuilds,
    browseGuilds,
    createGuild,
    joinGuild,
    leaveGuild,
    kickMember,
    promoteMember,
    sendMessage,
    refresh: loadMyGuild,
  };
}

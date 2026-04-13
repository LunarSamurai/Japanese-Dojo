"use client";
import { useState } from "react";
import { Feed } from "./Feed";
import { PublicProfile } from "./PublicProfile";
import { GuildFinder } from "../guild/GuildFinder";
import { GuildDashboard } from "../guild/GuildDashboard";
import { CreateGuild } from "../guild/CreateGuild";
import { useGuild } from "../../hooks/useGuild";

interface SocialViewProps {
  userId: string | null;
  gs: import("../../types").GameState;
}

export function SocialView({ userId, gs }: SocialViewProps) {
  const [tab, setTab] = useState<"feed" | "guild" | "profile">("feed");
  const [guildSubView, setGuildSubView] = useState<"browse" | "create">("browse");
  const guildState = useGuild(userId);

  return (
    <div>
      <div
        style={{
          color: "#1a1523",
          fontWeight: 900,
          fontSize: 22,
          fontFamily: "serif",
          marginBottom: 4,
        }}
      >
        🏯 Guild Hall
      </div>
      <div style={{ color: "#564a5e", fontSize: 13, marginBottom: 16 }}>
        Your guild, social feed, and community
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(
          [
            ["feed", "📰 Feed"],
            ["guild", "⚔️ Guild"],
            ["profile", "👤 Profile"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              background:
                tab === id
                  ? "linear-gradient(135deg,#c2255c,#9b59b6)"
                  : "white",
              color: tab === id ? "white" : "#564a5e",
              border: `1.5px solid ${tab === id ? "transparent" : "#e8e0e4"}`,
              borderRadius: 10,
              padding: "10px 20px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "feed" && <Feed userId={userId} />}
      {tab === "guild" && (
        guildState.loading ? (
          <div style={{ color: "#8a7e92", fontSize: 13, textAlign: "center", padding: 40 }}>Loading guild...</div>
        ) : guildState.guild ? (
          <GuildDashboard
            guild={guildState.guild}
            members={guildState.members}
            myRole={guildState.myRole!}
            userId={userId}
            sendMessage={guildState.sendMessage}
            kickMember={guildState.kickMember}
            promoteMember={guildState.promoteMember}
            leaveGuild={guildState.leaveGuild}
            refresh={guildState.refresh}
            gs={gs}
          />
        ) : guildSubView === "create" ? (
          <CreateGuild createGuild={guildState.createGuild} onBack={() => setGuildSubView("browse")} />
        ) : (
          <GuildFinder
            searchGuilds={guildState.searchGuilds}
            browseGuilds={guildState.browseGuilds}
            joinGuild={guildState.joinGuild}
            onCreate={() => setGuildSubView("create")}
          />
        )
      )}
      {tab === "profile" && <PublicProfile userId={userId} />}
    </div>
  );
}

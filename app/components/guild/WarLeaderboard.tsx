"use client";
import { useState, useEffect, useCallback } from "react";
import { useGuildWar, type GuildLeaderboardEntry } from "../../hooks/useGuildWar";

interface WarLeaderboardProps {
  currentGuildId: string | null;
}

const MEDAL_EMOJIS = ["\uD83E\uDD47", "\uD83E\uDD48", "\uD83E\uDD49"];

export default function WarLeaderboard({ currentGuildId }: WarLeaderboardProps) {
  const { fetchGuildLeaderboard } = useGuildWar(currentGuildId);
  const [guilds, setGuilds] = useState<GuildLeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchGuildLeaderboard();
      setGuilds(data);
    } catch {
      // silent
    }
    setLoading(false);
  }, [fetchGuildLeaderboard]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div
      style={{
        fontFamily: "inherit",
        color: "#fff",
        padding: 20,
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
          War Leaderboard
        </div>
        <div style={{ fontSize: 13, opacity: 0.5 }}>
          Global guild rankings by war victories
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", opacity: 0.5, padding: 40 }}>
          Loading rankings...
        </div>
      ) : guilds.length === 0 ? (
        <div style={{ textAlign: "center", opacity: 0.5, padding: 40 }}>
          No guilds have earned war points yet.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {guilds.map((guild, idx) => {
            const rank = idx + 1;
            const isCurrentGuild = guild.id === currentGuildId;
            const isTop3 = rank <= 3;

            return (
              <div
                key={guild.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  background: isCurrentGuild
                    ? "rgba(255,215,0,0.1)"
                    : "rgba(255,255,255,0.05)",
                  borderRadius: 10,
                  border: isCurrentGuild
                    ? "1px solid rgba(255,215,0,0.3)"
                    : "1px solid rgba(255,255,255,0.06)",
                  transition: "background 0.2s",
                }}
              >
                {/* Rank */}
                <div
                  style={{
                    width: 36,
                    textAlign: "center",
                    fontSize: isTop3 ? 22 : 16,
                    fontWeight: 700,
                    color: isTop3
                      ? rank === 1
                        ? "#ffd700"
                        : rank === 2
                        ? "#c0c0c0"
                        : "#cd7f32"
                      : "rgba(255,255,255,0.4)",
                  }}
                >
                  {isTop3 ? MEDAL_EMOJIS[rank - 1] : `#${rank}`}
                </div>

                {/* Guild info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      color: isCurrentGuild ? "#ffd54f" : "#fff",
                    }}
                  >
                    {guild.name}
                    {isCurrentGuild && (
                      <span
                        style={{
                          fontSize: 10,
                          marginLeft: 6,
                          opacity: 0.6,
                          fontWeight: 400,
                        }}
                      >
                        (Your Guild)
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      opacity: 0.5,
                      marginTop: 2,
                    }}
                  >
                    Lv.{guild.level} &middot; {guild.member_count} members
                  </div>
                </div>

                {/* War points */}
                <div
                  style={{
                    textAlign: "right",
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: isTop3 ? "#ffd54f" : "#fff",
                    }}
                  >
                    {guild.war_points}
                  </div>
                  <div style={{ fontSize: 10, opacity: 0.4 }}>points</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Refresh button */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button
          onClick={load}
          disabled={loading}
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8,
            padding: "8px 20px",
            color: "#fff",
            fontSize: 13,
            fontFamily: "inherit",
            cursor: loading ? "default" : "pointer",
            opacity: loading ? 0.5 : 1,
            transition: "all 0.2s",
          }}
        >
          {loading ? "Refreshing..." : "Refresh Rankings"}
        </button>
      </div>
    </div>
  );
}

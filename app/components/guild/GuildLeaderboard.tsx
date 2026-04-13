"use client";
import type { GuildMember, UserProfile } from "../../types";
import { Avatar } from "../Avatar";

interface Props {
  members: (GuildMember & { profile?: UserProfile })[];
}

export function GuildLeaderboard({ members }: Props) {
  const sorted = [...members].sort((a, b) => b.xp_contributed - a.xp_contributed);
  const medals = ["🥇", "🥈", "🥉"];

  if (sorted.length === 0) {
    return (
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textAlign: "center", padding: 40 }}>
        No members yet.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {sorted.map((m, i) => (
        <div key={m.user_id} style={{
          background: i < 3 ? "rgba(251,191,36,0.06)" : "rgba(255,255,255,0.04)",
          borderRadius: 12, padding: "12px 16px",
          display: "flex", alignItems: "center", gap: 12,
          border: `1px solid ${i < 3 ? "rgba(251,191,36,0.12)" : "rgba(255,255,255,0.05)"}`,
        }}>
          <div style={{ width: 28, textAlign: "center", fontSize: i < 3 ? 18 : 12, color: "rgba(255,255,255,0.4)", fontWeight: 800 }}>
            {i < 3 ? medals[i] : `#${i + 1}`}
          </div>
          <Avatar url={m.profile?.avatar_url} name={m.profile?.display_name} size={32} />
          <div style={{ flex: 1 }}>
            <div style={{ color: "white", fontSize: 12, fontWeight: 700 }}>{m.profile?.display_name || "Unknown"}</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>
              {m.role === "captain" ? "👑 " : m.role === "council" ? "🎖️ " : ""}{m.role}
            </div>
          </div>
          <div style={{ color: "#fbbf24", fontSize: 14, fontWeight: 800, fontFamily: "serif" }}>
            {m.xp_contributed.toLocaleString()} XP
          </div>
        </div>
      ))}
    </div>
  );
}

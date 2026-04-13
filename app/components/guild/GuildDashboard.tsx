"use client";
import { useState } from "react";
import type { Guild, GuildMember, UserProfile } from "../../types";
import { GuildChat } from "./GuildChat";
import { GuildSettings } from "./GuildSettings";
import { GuildLeaderboard } from "./GuildLeaderboard";

interface GuildDashboardProps {
  guild: Guild;
  members: (GuildMember & { profile?: UserProfile })[];
  myRole: "captain" | "council" | "member";
  userId: string | null;
  sendMessage: (content: string) => Promise<void>;
  kickMember: (userId: string) => Promise<void>;
  promoteMember: (userId: string, role: "council" | "member") => Promise<void>;
  leaveGuild: () => Promise<void>;
  refresh: () => Promise<void>;
}

type SubView = "overview" | "members" | "chat" | "leaderboard" | "wars" | "settings";

// ── Osaka Castle CSS Art ──
function CastleArt({ level }: { level: number }) {
  const tier = level >= 10 ? 3 : level >= 5 ? 2 : 1;
  const goldAccent = tier >= 3 ? "#fbbf24" : tier >= 2 ? "#d4a44a" : "#b8956a";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Top spire / shachi */}
      {tier >= 2 && (
        <div style={{ fontSize: 16, marginBottom: 2 }}>🏯</div>
      )}
      {/* Top roof tier */}
      <div style={{ width: 0, height: 0, borderLeft: "28px solid transparent", borderRight: "28px solid transparent", borderBottom: `14px solid ${goldAccent}` }} />
      <div style={{ width: 52, height: 4, background: goldAccent, marginBottom: 1 }} />
      <div style={{ width: 38, height: 12, background: "#f5f0e8", border: `1px solid ${goldAccent}` }} />

      {/* Second tier */}
      <div style={{ width: 0, height: 0, borderLeft: "38px solid transparent", borderRight: "38px solid transparent", borderBottom: `12px solid ${goldAccent}` }} />
      <div style={{ width: 72, height: 4, background: goldAccent }} />
      <div style={{ width: 55, height: 16, background: "#f5f0e8", border: `1px solid ${goldAccent}`, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: 8, height: 10, background: "#3d2020", borderRadius: "2px 2px 0 0" }} />
      </div>

      {/* Third tier (base) */}
      <div style={{ width: 0, height: 0, borderLeft: "50px solid transparent", borderRight: "50px solid transparent", borderBottom: `14px solid ${goldAccent}` }} />
      <div style={{ width: 96, height: 5, background: goldAccent }} />
      <div style={{ width: 80, height: 22, background: "#f5f0e8", border: `1px solid ${goldAccent}`, display: "flex", justifyContent: "center", alignItems: "center", gap: 6 }}>
        <div style={{ width: 6, height: 12, background: "#3d2020", borderRadius: "1px 1px 0 0" }} />
        <div style={{ width: 12, height: 16, background: "#2d1515", borderRadius: "3px 3px 0 0" }} />
        <div style={{ width: 6, height: 12, background: "#3d2020", borderRadius: "1px 1px 0 0" }} />
      </div>

      {/* Stone base / mountain */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
        <div style={{ width: 110, height: 8, background: "linear-gradient(180deg, #6b7280, #4b5563)", borderRadius: "0 0 2px 2px" }} />
        <div style={{ width: 130, height: 10, background: "linear-gradient(180deg, #4b5563, #374151)", borderRadius: "0 0 4px 4px" }} />
        <div style={{ width: 160, height: 14, background: "linear-gradient(180deg, #374151, #1f2937)", borderRadius: "0 0 8px 8px" }} />
      </div>
    </div>
  );
}

// ── Cloud Navigation Button ──
function CloudButton({ label, icon, active, onClick, x, y }: { label: string; icon: string; active: boolean; onClick: () => void; x: number; y: number }) {
  return (
    <button
      onClick={onClick}
      className="btn-glow"
      style={{
        position: "absolute", left: `${x}%`, top: `${y}%`,
        transform: "translate(-50%, -50%)",
        background: active
          ? "linear-gradient(135deg, rgba(194,37,92,0.9), rgba(126,55,148,0.9))"
          : "rgba(255,255,255,0.12)",
        backdropFilter: "blur(8px)",
        border: `1px solid ${active ? "rgba(194,37,92,0.4)" : "rgba(255,255,255,0.15)"}`,
        borderRadius: 16, padding: "12px 18px",
        color: active ? "white" : "rgba(255,255,255,0.7)",
        fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
        boxShadow: active ? "0 4px 20px rgba(194,37,92,0.3)" : "0 4px 16px rgba(0,0,0,0.2)",
        transition: "all 0.2s",
        minWidth: 80,
      }}
    >
      <span style={{ fontSize: 20 }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export function GuildDashboard({ guild, members, myRole, userId, sendMessage, kickMember, promoteMember, leaveGuild, refresh }: GuildDashboardProps) {
  const [subView, setSubView] = useState<SubView>("overview");
  const isLeader = myRole === "captain" || myRole === "council";

  // Cloud nav positions (radial around center castle)
  const navItems: { id: SubView; label: string; icon: string; x: number; y: number }[] = [
    { id: "overview", label: "Overview", icon: "🏯", x: 50, y: 15 },
    { id: "members", label: "Members", icon: "👥", x: 18, y: 35 },
    { id: "chat", label: "Chat", icon: "💬", x: 82, y: 35 },
    { id: "leaderboard", label: "Ranks", icon: "🏆", x: 15, y: 65 },
    { id: "wars", label: "Wars", icon: "⚔️", x: 85, y: 65 },
    ...(isLeader ? [{ id: "settings" as SubView, label: "Settings", icon: "⚙️", x: 50, y: 88 }] : []),
  ];

  // Overview sub-view (default — shows castle + stats)
  if (subView === "overview") {
    return (
      <div style={{
        background: "radial-gradient(ellipse at 50% 35%, #1e293b 0%, #0f172a 50%, #020617 100%)",
        borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column",
        minHeight: 650, position: "relative",
        border: "1px solid rgba(255,255,255,0.08)",
      }}>
        {/* Cloud particles */}
        {[20, 40, 60, 75, 90].map((left, i) => (
          <div key={i} style={{
            position: "absolute", left: `${left}%`, top: `${55 + (i % 3) * 10}%`,
            width: 80 + i * 20, height: 20 + i * 4, borderRadius: 999,
            background: `rgba(255,255,255,${0.03 + i * 0.01})`,
            filter: "blur(8px)", pointerEvents: "none",
          }} />
        ))}

        {/* Guild name header */}
        <div style={{ textAlign: "center", padding: "28px 20px 0", position: "relative", zIndex: 5 }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", marginBottom: 4 }}>Guild Castle</div>
          <div style={{ color: "white", fontSize: 26, fontWeight: 900, fontFamily: "serif" }}>{guild.name}</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 }}>Level {guild.level} · {guild.member_count}/{guild.max_members} members</div>
        </div>

        {/* Castle + cloud nav area */}
        <div style={{ position: "relative", flex: 1, marginTop: 10 }}>
          {/* Castle centered */}
          <div style={{ position: "absolute", left: "50%", top: "42%", transform: "translate(-50%, -50%)", zIndex: 3 }}>
            <CastleArt level={guild.level} />
          </div>

          {/* Cloud nav buttons arranged radially */}
          {navItems.map((item) => (
            <CloudButton
              key={item.id}
              label={item.label}
              icon={item.icon}
              active={false}
              onClick={() => setSubView(item.id)}
              x={item.x}
              y={item.y}
            />
          ))}
        </div>

        {/* Stats bar at bottom */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8,
          padding: "0 20px 20px", position: "relative", zIndex: 5,
        }}>
          {[
            { label: "Total XP", value: guild.total_xp.toLocaleString(), icon: "⚡", color: "#c2255c" },
            { label: "Members", value: `${guild.member_count}/${guild.max_members}`, icon: "👥", color: "#3b82f6" },
            { label: "Level", value: guild.level, icon: "🏯", color: "#fbbf24" },
            { label: "Your Role", value: myRole, icon: "🎖️", color: "#10b981" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "12px 8px",
              textAlign: "center", border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ fontSize: 16, marginBottom: 2 }}>{s.icon}</div>
              <div style={{ color: s.color, fontSize: 16, fontWeight: 800, fontFamily: "serif" }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Back button + content wrapper for sub-views
  const backBtn = (
    <button onClick={() => setSubView("overview")} style={{
      background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
      color: "rgba(255,255,255,0.6)", padding: "8px 18px", borderRadius: 8,
      fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 16,
    }}>
      ← Back to Castle
    </button>
  );

  const darkWrap = (title: string, icon: string, children: React.ReactNode) => (
    <div style={{
      background: "radial-gradient(ellipse at 50% 20%, #1e293b 0%, #0f172a 60%, #020617 100%)",
      borderRadius: 20, padding: 24, minHeight: 500,
      border: "1px solid rgba(255,255,255,0.08)",
    }}>
      {backBtn}
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>{icon} {title}</div>
      {children}
    </div>
  );

  if (subView === "members") {
    return darkWrap("Members", "👥", (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {members.map((m) => (
          <div key={m.user_id} style={{
            background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "12px 16px",
            display: "flex", alignItems: "center", gap: 12, border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg,#c2255c,#7e3794)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: 14, fontWeight: 800,
            }}>
              {(m.profile?.display_name || "?")[0].toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "white", fontSize: 13, fontWeight: 700 }}>{m.profile?.display_name || "Unknown"}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>
                {m.role === "captain" ? "👑 Captain" : m.role === "council" ? "🎖️ Council" : "Member"} · {m.xp_contributed.toLocaleString()} XP
              </div>
            </div>
            {isLeader && m.user_id !== userId && m.role !== "captain" && (
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => promoteMember(m.user_id, m.role === "council" ? "member" : "council")} style={{
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.6)", padding: "4px 10px", borderRadius: 6,
                  fontSize: 10, cursor: "pointer", fontFamily: "inherit",
                }}>
                  {m.role === "council" ? "Demote" : "Promote"}
                </button>
                <button onClick={() => kickMember(m.user_id)} style={{
                  background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.2)",
                  color: "#ef4444", padding: "4px 10px", borderRadius: 6,
                  fontSize: 10, cursor: "pointer", fontFamily: "inherit",
                }}>
                  Kick
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    ));
  }

  if (subView === "chat") {
    return darkWrap("Guild Chat", "💬", (
      <GuildChat guildId={guild.id} userId={userId} sendMessage={sendMessage} />
    ));
  }

  if (subView === "leaderboard") {
    return darkWrap("Leaderboard", "🏆", (
      <GuildLeaderboard members={members} />
    ));
  }

  if (subView === "wars") {
    return darkWrap("Guild Wars", "⚔️", (
      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textAlign: "center", padding: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>⚔️</div>
        <div style={{ color: "white", fontSize: 18, fontWeight: 800, fontFamily: "serif", marginBottom: 8 }}>Guild Wars</div>
        <div>Declare war on rival guilds to test your combined strength!</div>
        {isLeader && (
          <button className="btn-glow" style={{
            background: "linear-gradient(135deg,#ef4444,#dc2626)", color: "white",
            border: "none", padding: "12px 28px", borderRadius: 10,
            fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
            marginTop: 20, boxShadow: "0 4px 16px rgba(239,68,68,0.3)",
          }}>
            Declare War
          </button>
        )}
      </div>
    ));
  }

  if (subView === "settings") {
    return darkWrap("Guild Settings", "⚙️", (
      <GuildSettings guild={guild} myRole={myRole} leaveGuild={leaveGuild} refresh={refresh} />
    ));
  }

  return null;
}

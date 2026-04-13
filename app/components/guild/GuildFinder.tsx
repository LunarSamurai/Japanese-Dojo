"use client";
import { useState, useEffect } from "react";
import type { Guild } from "../../types";

interface Props {
  searchGuilds: (query: string) => Promise<Guild[]>;
  browseGuilds: () => Promise<Guild[]>;
  joinGuild: (guildId: string) => Promise<void>;
  onCreate: () => void;
}

export function GuildFinder({ searchGuilds, browseGuilds, joinGuild, onCreate }: Props) {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState<string | null>(null);

  useEffect(() => {
    browseGuilds().then((g) => { setGuilds(g); setLoading(false); });
  }, [browseGuilds]);

  const handleSearch = async () => {
    setLoading(true);
    const results = search.trim() ? await searchGuilds(search) : await browseGuilds();
    setGuilds(results);
    setLoading(false);
  };

  const handleJoin = async (guildId: string) => {
    setJoining(guildId);
    await joinGuild(guildId);
    setJoining(null);
  };

  return (
    <div style={{
      background: "radial-gradient(ellipse at 50% 30%, #1e293b 0%, #0f172a 60%, #020617 100%)",
      borderRadius: 20, padding: 28, minHeight: 500,
      border: "1px solid rgba(255,255,255,0.08)",
    }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🏯</div>
        <div style={{ color: "white", fontSize: 24, fontWeight: 900, fontFamily: "serif", marginBottom: 6 }}>Find a Guild</div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>Join a guild to unlock wars, raids, and guild chat</div>
      </div>

      {/* Search + Create */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search guilds..."
          style={{
            flex: 1, padding: "12px 16px", borderRadius: 10,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "white", fontSize: 13, fontFamily: "inherit", outline: "none",
          }}
        />
        <button onClick={handleSearch} style={{
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
          color: "white", padding: "12px 18px", borderRadius: 10,
          fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
        }}>
          Search
        </button>
        <button onClick={onCreate} className="btn-glow" style={{
          background: "linear-gradient(135deg,#c2255c,#7e3794)", color: "white",
          border: "none", padding: "12px 18px", borderRadius: 10,
          fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
        }}>
          Create Guild
        </button>
      </div>

      {/* Guild list */}
      {loading ? (
        <div style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", padding: 40, fontSize: 13 }}>Loading guilds...</div>
      ) : guilds.length === 0 ? (
        <div style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", padding: 40, fontSize: 13 }}>No guilds found. Be the first to create one!</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {guilds.map((g) => (
            <div key={g.id} style={{
              background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "16px 20px",
              display: "flex", alignItems: "center", gap: 16,
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ fontSize: 32 }}>🏯</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "white", fontSize: 15, fontWeight: 800, fontFamily: "serif" }}>{g.name}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 2 }}>
                  {g.description || "No description"} · Level {g.level}
                </div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, marginTop: 4 }}>
                  👥 {g.member_count}/{g.max_members} · ⚡ {g.total_xp.toLocaleString()} XP
                </div>
              </div>
              <button
                onClick={() => handleJoin(g.id)}
                disabled={joining === g.id || g.member_count >= g.max_members}
                className="btn-glow"
                style={{
                  background: g.member_count >= g.max_members ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg,#c2255c,#7e3794)",
                  color: "white", border: "none", padding: "10px 20px", borderRadius: 10,
                  fontSize: 12, fontWeight: 700, cursor: g.member_count >= g.max_members ? "not-allowed" : "pointer",
                  fontFamily: "inherit", opacity: joining === g.id ? 0.5 : 1,
                }}
              >
                {g.member_count >= g.max_members ? "Full" : joining === g.id ? "..." : "Join"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

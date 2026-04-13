"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useGuildWar, type DuelResult } from "../../hooks/useGuildWar";
import DuelAnimation from "./DuelAnimation";
import WarLeaderboard from "./WarLeaderboard";
import type { GuildWar as GuildWarType, Guild, HeroState } from "../../types";

interface GuildWarProps {
  guildId: string;
  userId: string;
  userName: string;
  userHero: HeroState;
  userRole: "captain" | "council" | "member";
}

interface EnemyMember {
  user_id: string;
  display_name: string;
}

function formatCountdown(endsAt: string): string {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return "00:00";
  const mins = Math.floor(diff / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function GuildWarDashboard({
  guildId,
  userId,
  userName,
  userHero,
  userRole,
}: GuildWarProps) {
  const {
    activeWar,
    duels,
    loading,
    declareWar,
    startDuel,
    fetchWarDuels,
    fetchWarHistory,
    fetchEnemyMembers,
    refresh,
  } = useGuildWar(guildId);

  const [tab, setTab] = useState<"war" | "leaderboard">("war");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Guild[]>([]);
  const [searching, setSearching] = useState(false);
  const [warHistory, setWarHistory] = useState<GuildWarType[]>([]);
  const [enemyMembers, setEnemyMembers] = useState<EnemyMember[]>([]);
  const [countdown, setCountdown] = useState("");
  const [duelTarget, setDuelTarget] = useState<EnemyMember | null>(null);
  const [duelResult, setDuelResult] = useState<{
    won: boolean;
    attackerName: string;
    defenderName: string;
  } | null>(null);
  const [dueling, setDueling] = useState(false);
  const [declaring, setDeclaring] = useState(false);
  const [error, setError] = useState("");

  const canDeclare = userRole === "captain" || userRole === "council";
  const isAttacker = activeWar?.attacker_guild_id === guildId;
  const enemyGuildId = activeWar
    ? isAttacker
      ? activeWar.defender_guild_id
      : activeWar.attacker_guild_id
    : null;
  const myScore = activeWar
    ? isAttacker
      ? activeWar.attacker_damage
      : activeWar.defender_damage
    : 0;
  const enemyScore = activeWar
    ? isAttacker
      ? activeWar.defender_damage
      : activeWar.attacker_damage
    : 0;
  const myGuild = activeWar
    ? isAttacker
      ? activeWar.attacker_guild
      : activeWar.defender_guild
    : null;
  const enemyGuild = activeWar
    ? isAttacker
      ? activeWar.defender_guild
      : activeWar.attacker_guild
    : null;

  // Countdown timer
  useEffect(() => {
    if (!activeWar) return;
    const tick = () => setCountdown(formatCountdown(activeWar.ends_at));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [activeWar]);

  // Check if war expired
  useEffect(() => {
    if (activeWar && countdown === "00:00") {
      const t = setTimeout(() => refresh(), 2000);
      return () => clearTimeout(t);
    }
  }, [countdown, activeWar, refresh]);

  // Load war data
  useEffect(() => {
    if (activeWar) {
      fetchWarDuels(activeWar.id);
      if (enemyGuildId) {
        fetchEnemyMembers(enemyGuildId).then(setEnemyMembers);
      }
    } else {
      fetchWarHistory(5).then(setWarHistory);
    }
  }, [activeWar, enemyGuildId, fetchWarDuels, fetchEnemyMembers, fetchWarHistory]);

  // Guild search
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    setError("");
    try {
      const { createClient } = await import("../../lib/supabase/client");
      const supabase = createClient();
      const { data } = await supabase
        .from("guilds")
        .select("*")
        .neq("id", guildId)
        .ilike("name", `%${searchQuery.trim()}%`)
        .limit(10);
      setSearchResults((data || []) as Guild[]);
    } catch {
      setError("Search failed. Try again.");
    }
    setSearching(false);
  }, [searchQuery, guildId]);

  const handleDeclareWar = useCallback(
    async (targetId: string) => {
      setDeclaring(true);
      setError("");
      try {
        await declareWar(targetId);
        setSearchResults([]);
        setSearchQuery("");
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Failed to declare war."
        );
      }
      setDeclaring(false);
    },
    [declareWar]
  );

  const handleDuel = useCallback(
    async (target: EnemyMember) => {
      if (!activeWar || dueling) return;
      setDueling(true);
      setDuelTarget(target);

      try {
        // Create a basic opponent hero (we don't show power, so we estimate)
        const defenderHero: HeroState = {
          atk: 5 + Math.floor(Math.random() * 10),
          def: 5 + Math.floor(Math.random() * 8),
          hp: 80 + Math.floor(Math.random() * 40),
          maxHp: 100 + Math.floor(Math.random() * 50),
          sword: null,
          armor: null,
          charm: null,
          legendarySword: null,
          legendaryArmor: null,
          legendaryCharm: null,
        };

        const result = await startDuel(
          activeWar.id,
          userId,
          userName,
          userHero,
          target.user_id,
          target.display_name,
          defenderHero
        );

        setDuelResult({
          won: result.winner_id === userId,
          attackerName: userName,
          defenderName: target.display_name,
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Duel failed.");
        setDueling(false);
        setDuelTarget(null);
      }
    },
    [activeWar, dueling, userId, userName, userHero, startDuel]
  );

  const handleDuelAnimComplete = useCallback(() => {
    setDuelResult(null);
    setDueling(false);
    setDuelTarget(null);
  }, []);

  const statusText = useMemo(() => {
    if (!activeWar) return "";
    const warResult = (h: GuildWarType) => {
      if (h.status === "draw") return "Draw";
      const attackerWon = h.status === "attacker_won";
      const weAreAttacker = h.attacker_guild_id === guildId;
      return (attackerWon && weAreAttacker) || (!attackerWon && !weAreAttacker)
        ? "Victory"
        : "Defeat";
    };
    return "";
  }, [activeWar, guildId]);

  // Duel animation overlay
  if (duelResult) {
    return (
      <DuelAnimation
        attackerName={duelResult.attackerName}
        defenderName={duelResult.defenderName}
        won={duelResult.won}
        onComplete={handleDuelAnimComplete}
      />
    );
  }

  const btnStyle = (active: boolean) => ({
    background: active ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
    border: active
      ? "1px solid rgba(255,255,255,0.25)"
      : "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8,
    padding: "8px 18px",
    color: "#fff",
    fontSize: 13,
    fontWeight: active ? (700 as const) : (400 as const),
    fontFamily: "inherit" as const,
    cursor: "pointer" as const,
    transition: "all 0.2s",
  });

  return (
    <div style={{ fontFamily: "inherit", color: "#fff" }}>
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 20,
          justifyContent: "center",
        }}
      >
        <button style={btnStyle(tab === "war")} onClick={() => setTab("war")}>
          Guild Wars
        </button>
        <button
          style={btnStyle(tab === "leaderboard")}
          onClick={() => setTab("leaderboard")}
        >
          Leaderboard
        </button>
      </div>

      {tab === "leaderboard" ? (
        <WarLeaderboard currentGuildId={guildId} />
      ) : loading ? (
        <div style={{ textAlign: "center", opacity: 0.5, padding: 40 }}>
          Loading war status...
        </div>
      ) : activeWar ? (
        /* ========== ACTIVE WAR ========== */
        <div>
          {/* Timer */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: "#f44336",
                marginBottom: 4,
              }}
            >
              War in Progress
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 800,
                fontVariantNumeric: "tabular-nums",
                color:
                  countdown <= "05:00" ? "#f44336" : "#fff",
                textShadow:
                  countdown <= "05:00"
                    ? "0 0 20px rgba(244,67,54,0.4)"
                    : "none",
              }}
            >
              {countdown}
            </div>
          </div>

          {/* Score */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              marginBottom: 24,
              padding: "16px 20px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Our guild */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <div
                style={{
                  fontSize: 13,
                  opacity: 0.6,
                  marginBottom: 4,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {myGuild?.name || "Your Guild"}
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: "#4caf50",
                }}
              >
                {myScore}
              </div>
            </div>

            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                opacity: 0.3,
              }}
            >
              VS
            </div>

            {/* Enemy guild */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <div
                style={{
                  fontSize: 13,
                  opacity: 0.6,
                  marginBottom: 4,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {enemyGuild?.name || "Enemy Guild"}
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: "#f44336",
                }}
              >
                {enemyScore}
              </div>
            </div>
          </div>

          {/* Pick Opponent */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              Pick an Opponent to Duel
            </div>

            {enemyMembers.length === 0 ? (
              <div style={{ textAlign: "center", opacity: 0.4, fontSize: 13 }}>
                No enemy members found.
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                {enemyMembers.map((member) => (
                  <button
                    key={member.user_id}
                    onClick={() => handleDuel(member)}
                    disabled={dueling}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 10,
                      padding: "12px 14px",
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily: "inherit",
                      cursor: dueling ? "default" : "pointer",
                      textAlign: "left",
                      transition: "all 0.2s",
                      opacity: dueling ? 0.5 : 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                    onMouseEnter={(e) => {
                      if (!dueling)
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "rgba(255,255,255,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(255,255,255,0.06)";
                    }}
                  >
                    <span style={{ fontSize: 20 }}>&#x2694;&#xFE0F;</span>
                    <span
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {member.display_name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Recent duels */}
          {duels.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 8,
                  opacity: 0.6,
                }}
              >
                Recent Duels
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  maxHeight: 200,
                  overflowY: "auto",
                }}
              >
                {duels.slice(0, 10).map((d) => {
                  const iWon = d.winner_id === userId;
                  return (
                    <div
                      key={d.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 12px",
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: 8,
                        fontSize: 13,
                      }}
                    >
                      <span
                        style={{
                          color: d.winner_id === d.attacker_id ? "#4caf50" : "#f44336",
                          fontWeight: 600,
                          minWidth: 80,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {d.attacker_name}
                      </span>
                      <span style={{ opacity: 0.3 }}>vs</span>
                      <span
                        style={{
                          color: d.winner_id === d.defender_id ? "#4caf50" : "#f44336",
                          fontWeight: 600,
                          minWidth: 80,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {d.defender_name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {error && (
            <div
              style={{
                color: "#f44336",
                fontSize: 13,
                textAlign: "center",
                marginTop: 12,
              }}
            >
              {error}
            </div>
          )}
        </div>
      ) : (
        /* ========== NO ACTIVE WAR ========== */
        <div>
          {/* Declare War */}
          {canDeclare && (
            <div
              style={{
                marginBottom: 24,
                padding: 20,
                background: "rgba(255,255,255,0.05)",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 12,
                  textAlign: "center",
                }}
              >
                Declare War
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search for a guild..."
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 8,
                    padding: "10px 14px",
                    color: "#fff",
                    fontSize: 14,
                    fontFamily: "inherit",
                    outline: "none",
                  }}
                />
                <button
                  onClick={handleSearch}
                  disabled={searching || !searchQuery.trim()}
                  style={{
                    background: "rgba(244,67,54,0.2)",
                    border: "1px solid rgba(244,67,54,0.4)",
                    borderRadius: 8,
                    padding: "10px 18px",
                    color: "#f44336",
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "inherit",
                    cursor:
                      searching || !searchQuery.trim() ? "default" : "pointer",
                    opacity: searching || !searchQuery.trim() ? 0.5 : 1,
                  }}
                >
                  {searching ? "..." : "Search"}
                </button>
              </div>

              {/* Search results */}
              {searchResults.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {searchResults.map((g) => (
                    <div
                      key={g.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>
                          {g.name}
                        </div>
                        <div style={{ fontSize: 11, opacity: 0.5 }}>
                          Lv.{g.level} &middot; {g.member_count} members
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeclareWar(g.id)}
                        disabled={declaring}
                        style={{
                          background: "rgba(244,67,54,0.3)",
                          border: "1px solid #f44336",
                          borderRadius: 8,
                          padding: "6px 14px",
                          color: "#fff",
                          fontSize: 12,
                          fontWeight: 600,
                          fontFamily: "inherit",
                          cursor: declaring ? "default" : "pointer",
                          opacity: declaring ? 0.5 : 1,
                        }}
                      >
                        {declaring ? "..." : "Declare War"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!canDeclare && (
            <div
              style={{
                textAlign: "center",
                padding: 20,
                opacity: 0.5,
                fontSize: 14,
                marginBottom: 20,
              }}
            >
              Only the captain or council can declare wars.
            </div>
          )}

          {/* War history */}
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              War History
            </div>
            {warHistory.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  opacity: 0.4,
                  fontSize: 13,
                  padding: 20,
                }}
              >
                No wars fought yet. Time to make history!
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {warHistory.map((w) => {
                  const weAreAttacker = w.attacker_guild_id === guildId;
                  const ourScore = weAreAttacker
                    ? w.attacker_damage
                    : w.defender_damage;
                  const theirScore = weAreAttacker
                    ? w.defender_damage
                    : w.attacker_damage;
                  const enemyName = weAreAttacker
                    ? w.defender_guild?.name
                    : w.attacker_guild?.name;

                  let resultLabel: string;
                  let resultColor: string;
                  if (w.status === "draw") {
                    resultLabel = "Draw";
                    resultColor = "#ffa726";
                  } else {
                    const attackerWon = w.status === "attacker_won";
                    const weWon =
                      (attackerWon && weAreAttacker) ||
                      (!attackerWon && !weAreAttacker);
                    resultLabel = weWon ? "Victory" : "Defeat";
                    resultColor = weWon ? "#4caf50" : "#f44336";
                  }

                  return (
                    <div
                      key={w.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 16px",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>
                          vs {enemyName || "Unknown"}
                        </div>
                        <div style={{ fontSize: 11, opacity: 0.4 }}>
                          {ourScore} - {theirScore} &middot;{" "}
                          {new Date(w.started_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: resultColor,
                        }}
                      >
                        {resultLabel}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {error && (
            <div
              style={{
                color: "#f44336",
                fontSize: 13,
                textAlign: "center",
                marginTop: 12,
              }}
            >
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

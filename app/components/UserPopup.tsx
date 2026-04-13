"use client";
import { useState, useEffect } from "react";
import { createClient } from "../lib/supabase/client";
import { Avatar } from "./Avatar";
import type { UserProfile, HeroState } from "../types";

interface UserPopupProps {
  targetUserId: string;
  currentUserId: string | null;
  onClose: () => void;
}

export function UserPopup({ targetUserId, currentUserId, onClose }: UserPopupProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [hero, setHero] = useState<HeroState | null>(null);
  const [gameStats, setGameStats] = useState<{ xp: number; completed: number; wavesCleared: number; demonsDefeated: number } | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      // Load profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", targetUserId)
        .single();
      if (profileData) setProfile(profileData as UserProfile);

      // Load game state (hero + stats)
      const { data: gsData } = await supabase
        .from("game_state")
        .select("xp, completed, hero, temple")
        .eq("user_id", targetUserId)
        .single();
      if (gsData) {
        setHero(gsData.hero as HeroState || null);
        setGameStats({
          xp: gsData.xp || 0,
          completed: Array.isArray(gsData.completed) ? gsData.completed.length : 0,
          wavesCleared: (gsData.temple as Record<string, number>)?.wavesCleared || 0,
          demonsDefeated: (gsData.temple as Record<string, number>)?.demonsDefeated || 0,
        });
      }

      // Check follow status
      if (currentUserId && currentUserId !== targetUserId) {
        const { data: followData } = await supabase
          .from("follows")
          .select("follower_id")
          .eq("follower_id", currentUserId)
          .eq("following_id", targetUserId)
          .single();
        setIsFollowing(!!followData);
      }

      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetUserId, currentUserId]);

  const toggleFollow = async () => {
    if (!currentUserId || currentUserId === targetUserId) return;
    if (isFollowing) {
      await supabase.from("follows").delete().eq("follower_id", currentUserId).eq("following_id", targetUserId);
      setIsFollowing(false);
    } else {
      await supabase.from("follows").insert({ follower_id: currentUserId, following_id: targetUserId });
      setIsFollowing(true);
    }
  };

  const level = gameStats ? Math.floor(gameStats.xp / 350) + 1 : 1;
  const isSelf = currentUserId === targetUserId;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9998,
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white", borderRadius: 20, padding: 28,
          width: 360, maxHeight: "80vh", overflowY: "auto",
          border: "1px solid #e8e0e4",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: 40, color: "#8a7e92", fontSize: 13 }}>Loading...</div>
        ) : !profile ? (
          <div style={{ textAlign: "center", padding: 40, color: "#8a7e92", fontSize: 13 }}>User not found</div>
        ) : (
          <>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <Avatar url={profile.avatar_url} name={profile.display_name} size={56} />
              <div style={{ flex: 1 }}>
                <div style={{ color: "#1a1523", fontSize: 18, fontWeight: 900, fontFamily: "serif" }}>
                  {profile.display_name || "Anonymous"}
                </div>
                {profile.country && (
                  <div style={{ color: "#8a7e92", fontSize: 11, marginTop: 2 }}>{profile.country}</div>
                )}
                <div style={{ color: "#c2255c", fontSize: 11, fontWeight: 700, marginTop: 2 }}>
                  Level {level} · {gameStats?.xp || 0} XP
                </div>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <div style={{ color: "#564a5e", fontSize: 12, marginBottom: 16, lineHeight: 1.5, padding: "10px 12px", background: "#f8f5f3", borderRadius: 10 }}>
                {profile.bio}
              </div>
            )}

            {/* Hero Stats */}
            {hero && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: "#8a7e92", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Hero Stats</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  <div style={{ textAlign: "center", background: "#f8f5f3", borderRadius: 10, padding: "10px 6px" }}>
                    <div style={{ color: "#ef4444", fontSize: 18, fontWeight: 900 }}>⚔️ {hero.atk}</div>
                    <div style={{ color: "#8a7e92", fontSize: 9, marginTop: 2 }}>ATK</div>
                  </div>
                  <div style={{ textAlign: "center", background: "#f8f5f3", borderRadius: 10, padding: "10px 6px" }}>
                    <div style={{ color: "#3b82f6", fontSize: 18, fontWeight: 900 }}>🛡️ {hero.def}</div>
                    <div style={{ color: "#8a7e92", fontSize: 9, marginTop: 2 }}>DEF</div>
                  </div>
                  <div style={{ textAlign: "center", background: "#f8f5f3", borderRadius: 10, padding: "10px 6px" }}>
                    <div style={{ color: "#22c55e", fontSize: 18, fontWeight: 900 }}>❤️ {hero.hp}</div>
                    <div style={{ color: "#8a7e92", fontSize: 9, marginTop: 2 }}>HP</div>
                  </div>
                </div>
                <div style={{ textAlign: "center", marginTop: 8 }}>
                  <span style={{ color: "#c2255c", fontSize: 12, fontWeight: 800 }}>
                    Total Power: {hero.atk + hero.def + Math.round(hero.hp / 10)}
                  </span>
                </div>
              </div>
            )}

            {/* Game Stats */}
            {gameStats && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: "#8a7e92", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Progress</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    { label: "Lessons", value: gameStats.completed, color: "#c2255c" },
                    { label: "Waves Cleared", value: gameStats.wavesCleared, color: "#2b79d6" },
                    { label: "Demons Slain", value: gameStats.demonsDefeated, color: "#ef4444" },
                    { label: "Level", value: level, color: "#7c3aed" },
                  ].map((s) => (
                    <div key={s.label} style={{ textAlign: "center", background: "#f8f5f3", borderRadius: 8, padding: "8px 4px" }}>
                      <div style={{ color: s.color, fontSize: 16, fontWeight: 800 }}>{s.value}</div>
                      <div style={{ color: "#8a7e92", fontSize: 9, marginTop: 1 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: 10 }}>
              {!isSelf && currentUserId && (
                <button
                  onClick={toggleFollow}
                  className="btn-glow"
                  style={{
                    flex: 1, padding: "10px 0", borderRadius: 10,
                    background: isFollowing ? "white" : "linear-gradient(135deg,#c2255c,#7e3794)",
                    color: isFollowing ? "#c2255c" : "white",
                    border: isFollowing ? "1.5px solid #c2255c" : "none",
                    fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
                  } as React.CSSProperties}
                >
                  {isFollowing ? "Following ✓" : "Follow"}
                </button>
              )}
              <button
                onClick={onClose}
                style={{
                  flex: isSelf ? 1 : 0, padding: "10px 20px", borderRadius: 10,
                  background: "#f8f5f3", border: "1px solid #e8e0e4",
                  color: "#564a5e", fontSize: 13, fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit",
                }}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Clickable username that opens UserPopup
 */
export function ClickableUsername({ userId, name, currentUserId, style }: {
  userId: string;
  name: string;
  currentUserId: string | null;
  style?: React.CSSProperties;
}) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <span
        onClick={(e) => { e.stopPropagation(); setShowPopup(true); }}
        style={{
          cursor: "pointer", fontWeight: 700,
          transition: "color 0.15s",
          ...style,
        }}
        onMouseEnter={(e) => { (e.target as HTMLElement).style.textDecoration = "underline"; }}
        onMouseLeave={(e) => { (e.target as HTMLElement).style.textDecoration = "none"; }}
      >
        {name}
      </span>
      {showPopup && (
        <UserPopup targetUserId={userId} currentUserId={currentUserId} onClose={() => setShowPopup(false)} />
      )}
    </>
  );
}

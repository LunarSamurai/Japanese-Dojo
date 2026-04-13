"use client";
import { useState, useEffect } from "react";
import { useProfile } from "../../hooks/useProfile";
import { useSocial } from "../../hooks/useSocial";
import { createClient } from "../../lib/supabase/client";

interface PublicProfileProps {
  userId: string | null;
}

export function PublicProfile({ userId }: PublicProfileProps) {
  const { profile, loading } = useProfile(userId);
  const { fetchFollowCounts } = useSocial(userId);
  const [counts, setCounts] = useState({ followers: 0, following: 0 });
  const [stats, setStats] = useState<{
    xp: number;
    level: number;
    rank: string;
    lessonsCompleted: number;
  } | null>(null);

  useEffect(() => {
    if (!userId) return;

    fetchFollowCounts(userId).then(setCounts).catch(() => {});

    // Load game stats from game_state table
    const supabase = createClient();
    (async () => {
      try {
        const { data } = await supabase
          .from("game_state")
          .select("xp, completed")
          .eq("user_id", userId)
          .single();
        if (data) {
          const xp = data.xp ?? 0;
          const level = Math.floor(xp / 350) + 1;
          const completedCount = Array.isArray(data.completed) ? data.completed.length : 0;
          setStats({ xp, level, rank: `Level ${level}`, lessonsCompleted: completedCount });
        }
      } catch { /* ignore */ }
    })();
  }, [userId, fetchFollowCounts]);

  if (loading) {
    return (
      <div style={{ color: "#8a7e92", fontSize: 13, padding: 20, textAlign: "center" }}>
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e8e0e4",
          borderRadius: 16,
          padding: 32,
          textAlign: "center",
          color: "#8a7e92",
          fontSize: 14,
        }}
      >
        Sign in to view your profile
      </div>
    );
  }

  const initial = (profile.display_name || "?").charAt(0).toUpperCase();

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e8e0e4",
        borderRadius: 16,
        padding: 24,
      }}
    >
      {/* Avatar + name */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile.display_name}
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #e8e0e4",
            }}
          />
        ) : (
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#c2255c,#7e3794)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 900,
              fontSize: 28,
              border: "3px solid #e8e0e4",
            }}
          >
            {initial}
          </div>
        )}

        <div
          style={{
            color: "#1a1523",
            fontWeight: 900,
            fontSize: 20,
            marginTop: 12,
          }}
        >
          {profile.display_name || "Unknown"}
        </div>

        {profile.bio && (
          <div
            style={{
              color: "#564a5e",
              fontSize: 13,
              marginTop: 4,
              textAlign: "center",
              maxWidth: 320,
              lineHeight: 1.5,
            }}
          >
            {profile.bio}
          </div>
        )}

        {profile.country && (
          <div
            style={{
              color: "#8a7e92",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            {profile.country}
            {profile.region ? `, ${profile.region}` : ""}
          </div>
        )}
      </div>

      {/* Follower/following counts */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 32,
          marginBottom: 20,
          paddingBottom: 20,
          borderBottom: "1px solid #e8e0e4",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#1a1523", fontWeight: 900, fontSize: 18 }}>
            {counts.followers}
          </div>
          <div style={{ color: "#8a7e92", fontSize: 11, fontWeight: 600 }}>
            Followers
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#1a1523", fontWeight: 900, fontSize: 18 }}>
            {counts.following}
          </div>
          <div style={{ color: "#8a7e92", fontSize: 11, fontWeight: 600 }}>
            Following
          </div>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div>
          <div
            style={{
              color: "#564a5e",
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 12,
            }}
          >
            Stats
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            {[
              { label: "XP", value: stats.xp.toLocaleString(), icon: "✨" },
              { label: "Level", value: stats.level, icon: "📊" },
              { label: "Rank", value: stats.rank, icon: "🏅" },
              {
                label: "Lessons",
                value: stats.lessonsCompleted,
                icon: "📚",
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "#faf7f5",
                  border: "1px solid #e8e0e4",
                  borderRadius: 12,
                  padding: 14,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                <div
                  style={{
                    color: "#1a1523",
                    fontWeight: 800,
                    fontSize: 16,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    color: "#8a7e92",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

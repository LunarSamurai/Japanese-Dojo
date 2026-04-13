"use client";
import { useRef, useState, useEffect } from "react";
import type { GameState, BookId } from "../types";
import { getLevel, getRank, BOOK_META } from "../theme";
import { useProfile } from "../hooks/useProfile";
import { getAvatarUrl } from "../lib/storage";
import { GENKI1, GENKI2, CONV, QUARTET1, QUARTET2, TOBIRA, ADVANCED, UPGRADES } from "../data";
import { createClient } from "../lib/supabase/client";

interface ProfileProps {
  gs: GameState;
  userId: string | null;
  onSignOut: () => void;
}

const BOOK_MAP: Record<BookId, { lessons: { id: string }[]; label: string; color: string }> = {
  genki1: { lessons: GENKI1, ...BOOK_META.genki1 },
  genki2: { lessons: GENKI2, ...BOOK_META.genki2 },
  conv: { lessons: CONV, label: "Convo Lab", color: "#059669" },
  quartet1: { lessons: QUARTET1, ...BOOK_META.quartet1 },
  quartet2: { lessons: QUARTET2, ...BOOK_META.quartet2 },
  tobira: { lessons: TOBIRA, ...BOOK_META.tobira },
  advanced: { lessons: ADVANCED, ...BOOK_META.advanced },
};

const COUNTRIES = [
  "", "United States", "Japan", "United Kingdom", "Canada", "Australia",
  "Germany", "France", "Brazil", "South Korea", "Mexico", "India", "China",
  "Spain", "Italy", "Netherlands", "Sweden", "Norway", "Finland", "Denmark",
  "Poland", "Russia", "Turkey", "Indonesia", "Philippines", "Thailand",
  "Vietnam", "Malaysia", "Singapore", "Argentina", "Colombia", "Chile",
  "Peru", "South Africa", "Nigeria", "Egypt", "Kenya", "New Zealand",
  "Ireland", "Portugal", "Belgium", "Switzerland", "Austria", "Czech Republic",
  "Romania", "Hungary", "Ukraine", "Greece", "Israel", "Saudi Arabia",
  "UAE", "Taiwan", "Hong Kong", "Other",
];

const cardStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #e8e0e4",
  borderRadius: 16,
  padding: 24,
  marginBottom: 16,
};

const labelStyle: React.CSSProperties = {
  color: "#8a7e92",
  fontSize: 12,
  fontWeight: 600,
  marginBottom: 6,
  display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #e8e0e4",
  borderRadius: 10,
  fontSize: 14,
  color: "#1a1523",
  background: "#faf7f5",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const sectionTitle: React.CSSProperties = {
  color: "#1a1523",
  fontWeight: 800,
  fontSize: 16,
  marginBottom: 16,
};

export function Profile({ gs, userId, onSignOut }: ProfileProps) {
  const { profile, loading, error, updateProfile, uploadAvatar } = useProfile(userId);
  const fileRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [editName, setEditName] = useState<string | null>(null);
  const [editBio, setEditBio] = useState<string | null>(null);
  const [editCountry, setEditCountry] = useState<string | null>(null);
  const [editSocial, setEditSocial] = useState<Record<string, string> | null>(null);
  const [editPrivacy, setEditPrivacy] = useState<Record<string, boolean> | null>(null);
  const [saveMsg, setSaveMsg] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");

  const level = getLevel(gs.xp);
  const rank = getRank(level);
  const totalLessons = (Object.keys(BOOK_MAP) as BookId[]).reduce(
    (sum, id) => sum + BOOK_MAP[id].lessons.filter((l) => gs.completed.has(l.id)).length,
    0
  );

  // Derived edit values
  const displayName = editName ?? profile?.display_name ?? "";
  const bio = editBio ?? profile?.bio ?? "";
  const country = editCountry ?? profile?.country ?? "";
  const social = editSocial ?? profile?.social_links ?? {};
  const privacy = editPrivacy ?? profile?.privacy ?? {
    profile_public: true,
    show_stats: true,
    show_guild: true,
  };

  const avatarSrc = getAvatarUrl(profile?.avatar_url ?? null);

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setSaving(true);
      await uploadAvatar(file);
      setSaveMsg("Avatar updated!");
      setTimeout(() => setSaveMsg(""), 2500);
    } catch {
      setSaveMsg("Failed to upload avatar");
    } finally {
      setSaving(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setSaveMsg("");
    try {
      await updateProfile({
        display_name: displayName,
        bio,
        country,
        social_links: social,
        privacy: privacy as { profile_public: boolean; show_stats: boolean; show_guild: boolean },
      });
      setEditName(null);
      setEditBio(null);
      setEditCountry(null);
      setEditSocial(null);
      setEditPrivacy(null);
      setSaveMsg("Profile saved!");
      setTimeout(() => setSaveMsg(""), 2500);
    } catch {
      setSaveMsg("Failed to save profile");
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword() {
    setChangingPassword(true);
    setPasswordMsg("");
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) throw new Error("No email found");
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(user.email);
      if (resetError) throw resetError;
      setPasswordMsg("Password reset email sent! Check your inbox.");
    } catch {
      setPasswordMsg("Failed to send password reset email.");
    } finally {
      setChangingPassword(false);
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 60, color: "#8a7e92" }}>
        Loading profile...
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div style={{ textAlign: "center", padding: 60, color: "#c2255c" }}>
        {error}
      </div>
    );
  }

  return (
    <div>
      <div style={{ color: "#1a1523", fontWeight: 900, fontSize: 22, fontFamily: "serif", marginBottom: 16 }}>
        Profile &amp; Account
      </div>

      {/* Header: Avatar + Name + Bio + Country */}
      <div style={cardStyle}>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Avatar */}
          <div
            onClick={() => fileRef.current?.click()}
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: avatarSrc
                ? `url(${avatarSrc}) center/cover no-repeat`
                : "linear-gradient(135deg,#c2255c,#7e3794)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              border: "3px solid #e8e0e4",
              position: "relative",
            }}
            title="Click to upload avatar"
          >
            {!avatarSrc && (
              <span style={{ color: "#fff", fontSize: 36, fontWeight: 700 }}>
                {displayName ? displayName[0].toUpperCase() : "?"}
              </span>
            )}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#fff",
                border: "2px solid #e8e0e4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
              }}
            >
              +
            </div>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            style={{ display: "none" }}
          />

          {/* Name + Bio + Country */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={labelStyle}>Display Name</label>
            <input
              style={{ ...inputStyle, marginBottom: 12 }}
              value={displayName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Your display name"
              maxLength={40}
            />

            <label style={labelStyle}>Bio</label>
            <textarea
              style={{
                ...inputStyle,
                minHeight: 70,
                resize: "vertical",
                marginBottom: 12,
              }}
              value={bio}
              onChange={(e) => setEditBio(e.target.value)}
              placeholder="Tell others about yourself..."
              maxLength={300}
            />

            <label style={labelStyle}>Country</label>
            <select
              style={{ ...inputStyle, cursor: "pointer" }}
              value={country}
              onChange={(e) => setEditCountry(e.target.value)}
            >
              <option value="">Select country</option>
              {COUNTRIES.filter(Boolean).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div style={cardStyle}>
        <div style={sectionTitle}>Stats Summary</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {[
            { label: "Level", value: String(level), color: "#7c3aed" },
            { label: "XP", value: String(gs.xp), color: "#c2255c" },
            { label: "Rank", value: rank, color: "#0d9488" },
            { label: "Lessons Done", value: String(totalLessons), color: "#2563eb" },
            { label: "Streak", value: `${gs.streak}d`, color: "#dc2626" },
            { label: "Coins", value: String(gs.coins), color: "#d97706" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: "#faf7f5",
                border: "1px solid #e8e0e4",
                borderRadius: 10,
                padding: "14px 0",
                textAlign: "center",
              }}
            >
              <div style={{ color: s.color, fontWeight: 800, fontSize: 18 }}>{s.value}</div>
              <div style={{ color: "#8a7e92", fontSize: 11 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div style={cardStyle}>
        <div style={sectionTitle}>Social Links</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { key: "twitter", label: "Twitter / X", placeholder: "@username" },
            { key: "discord", label: "Discord", placeholder: "username#1234" },
            { key: "youtube", label: "YouTube", placeholder: "Channel URL" },
          ].map((s) => (
            <div key={s.key}>
              <label style={labelStyle}>{s.label}</label>
              <input
                style={inputStyle}
                value={social[s.key] ?? ""}
                onChange={(e) =>
                  setEditSocial({ ...social, [s.key]: e.target.value })
                }
                placeholder={s.placeholder}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div style={cardStyle}>
        <div style={sectionTitle}>Privacy Settings</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { key: "profile_public", label: "Public Profile", desc: "Others can view your profile" },
            { key: "show_stats", label: "Show Stats", desc: "Display your level and XP publicly" },
            { key: "show_guild", label: "Show Guild", desc: "Display your guild membership" },
          ].map((p) => (
            <div
              key={p.key}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ color: "#1a1523", fontSize: 14, fontWeight: 600 }}>{p.label}</div>
                <div style={{ color: "#8a7e92", fontSize: 12 }}>{p.desc}</div>
              </div>
              <div
                onClick={() =>
                  setEditPrivacy({
                    ...privacy,
                    [p.key]: !(privacy as Record<string, boolean>)[p.key],
                  })
                }
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 12,
                  background: (privacy as Record<string, boolean>)[p.key]
                    ? "#c2255c"
                    : "#d4c8ce",
                  cursor: "pointer",
                  position: "relative",
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#fff",
                    position: "absolute",
                    top: 2,
                    left: (privacy as Record<string, boolean>)[p.key] ? 22 : 2,
                    transition: "left 0.2s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div style={{ marginBottom: 16, textAlign: "center" }}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            background: "linear-gradient(135deg,#c2255c,#7e3794)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "12px 48px",
            fontSize: 15,
            fontWeight: 700,
            cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.7 : 1,
            fontFamily: "inherit",
          }}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
        {saveMsg && (
          <div
            style={{
              marginTop: 10,
              fontSize: 13,
              color: saveMsg.includes("Failed") ? "#dc2626" : "#059669",
              fontWeight: 600,
            }}
          >
            {saveMsg}
          </div>
        )}
      </div>

      {/* Account */}
      <div style={cardStyle}>
        <div style={sectionTitle}>Account</div>
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Email</label>
          <EmailDisplay userId={userId} />
        </div>
        <button
          onClick={handleChangePassword}
          disabled={changingPassword}
          style={{
            background: "#faf7f5",
            border: "1px solid #e8e0e4",
            borderRadius: 10,
            padding: "10px 20px",
            fontSize: 13,
            fontWeight: 600,
            color: "#564a5e",
            cursor: changingPassword ? "not-allowed" : "pointer",
            fontFamily: "inherit",
          }}
        >
          {changingPassword ? "Sending..." : "Change Password"}
        </button>
        {passwordMsg && (
          <div
            style={{
              marginTop: 10,
              fontSize: 13,
              color: passwordMsg.includes("Failed") ? "#dc2626" : "#059669",
              fontWeight: 600,
            }}
          >
            {passwordMsg}
          </div>
        )}
      </div>

      {/* Sign Out */}
      <div style={{ textAlign: "center", marginTop: 8, marginBottom: 32 }}>
        <button
          onClick={onSignOut}
          style={{
            background: "transparent",
            border: "1px solid #e8e0e4",
            borderRadius: 12,
            padding: "12px 36px",
            fontSize: 14,
            fontWeight: 600,
            color: "#c2255c",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

/* Small sub-component to async-load the user email */
function EmailDisplay({ userId }: { userId: string | null }) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
  }, [userId]);

  return (
    <div
      style={{
        ...inputStyle,
        background: "#f0eced",
        color: email ? "#564a5e" : "#8a7e92",
        cursor: "not-allowed",
      }}
    >
      {email ?? "Loading..."}
    </div>
  );
}

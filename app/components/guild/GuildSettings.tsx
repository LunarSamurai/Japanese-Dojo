"use client";
import { useState } from "react";
import type { Guild } from "../../types";
import { createClient } from "../../lib/supabase/client";

interface Props {
  guild: Guild;
  myRole: "captain" | "council" | "member";
  leaveGuild: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function GuildSettings({ guild, myRole, leaveGuild, refresh }: Props) {
  const [name, setName] = useState(guild.name);
  const [description, setDescription] = useState(guild.description);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const handleSave = async () => {
    setSaving(true);
    await supabase.from("guilds").update({ name, description, updated_at: new Date().toISOString() }).eq("id", guild.id);
    await refresh();
    setSaving(false);
  };

  const inputStyle = {
    width: "100%", padding: "12px 14px", borderRadius: 10,
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
    color: "white", fontSize: 13, fontFamily: "inherit", outline: "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {myRole === "captain" && (
        <>
          <div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Guild Name</div>
            <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Description</div>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
          </div>
          <button onClick={handleSave} disabled={saving} className="btn-glow" style={{
            background: "linear-gradient(135deg,#c2255c,#7e3794)", color: "white",
            border: "none", padding: "12px 24px", borderRadius: 10,
            fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
            opacity: saving ? 0.5 : 1,
          }}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </>
      )}

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16, marginTop: 8 }}>
        <div style={{ color: "#ef4444", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Danger Zone</div>
        <button onClick={leaveGuild} style={{
          background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.2)",
          color: "#ef4444", padding: "10px 20px", borderRadius: 10,
          fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
        }}>
          Leave Guild
        </button>
      </div>
    </div>
  );
}

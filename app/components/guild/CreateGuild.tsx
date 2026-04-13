"use client";
import { useState } from "react";

interface Props {
  createGuild: (name: string, description: string) => Promise<void>;
  onBack: () => void;
}

export function CreateGuild({ createGuild, onBack }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) { setError("Guild name is required"); return; }
    setCreating(true);
    setError("");
    try {
      await createGuild(name.trim(), description.trim());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to create guild");
      setCreating(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", borderRadius: 10,
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
    color: "white", fontSize: 14, fontFamily: "inherit", outline: "none",
  };

  return (
    <div style={{
      background: "radial-gradient(ellipse at 50% 30%, #1e293b 0%, #0f172a 60%, #020617 100%)",
      borderRadius: 20, padding: 32, minHeight: "calc(100vh - 80px)",
      border: "1px solid rgba(255,255,255,0.08)",
    }}>
      <button onClick={onBack} style={{
        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.6)", padding: "8px 16px", borderRadius: 8,
        fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 20,
      }}>
        ← Back
      </button>

      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🏯</div>
        <div style={{ color: "white", fontSize: 24, fontWeight: 900, fontFamily: "serif" }}>Create Your Guild</div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 }}>Build a castle and lead your members</div>
      </div>

      <div style={{ maxWidth: 400, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Guild Name</div>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sakura Knights" style={inputStyle} />
        </div>
        <div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Description</div>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is your guild about?" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        {error && <div style={{ color: "#ef4444", fontSize: 12, textAlign: "center" }}>{error}</div>}

        <button onClick={handleCreate} disabled={creating || !name.trim()} className="btn-glow" style={{
          background: creating ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg,#c2255c,#7e3794)",
          color: "white", border: "none", padding: "14px", borderRadius: 12,
          fontSize: 15, fontWeight: 800, cursor: creating ? "not-allowed" : "pointer",
          fontFamily: "inherit", boxShadow: "0 6px 24px rgba(194,37,92,0.35)",
        }}>
          {creating ? "Creating..." : "Create Guild"}
        </button>
      </div>
    </div>
  );
}

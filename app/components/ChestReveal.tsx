"use client";
import { useState, useEffect } from "react";

interface ChestRevealProps {
  items: { icon: string; name: string; nameEn: string; rarity: string }[];
  setName: string;
  onComplete: () => void;
}

const RARITY_COLORS: Record<string, string> = {
  rare: "#3b82f6",
  epic: "#8b5cf6",
  legendary: "#fbbf24",
};

export function ChestReveal({ items, setName, onComplete }: ChestRevealProps) {
  const [phase, setPhase] = useState<"chest" | "opening" | "glow" | "items" | "done">("chest");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("opening"), 800);
    const t2 = setTimeout(() => setPhase("glow"), 1800);
    const t3 = setTimeout(() => setPhase("items"), 2600);
    const t4 = setTimeout(() => setPhase("done"), 5500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10000,
      background: "rgba(0,0,0,0.95)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "inherit", color: "white",
    }}>
      <style>{`
        @keyframes chest-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          15% { transform: translateY(-8px) scale(1.02); }
          30% { transform: translateY(0) scale(1); }
          45% { transform: translateY(-5px) scale(1.01); }
          60% { transform: translateY(0); }
        }
        @keyframes chest-shake {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(-3deg); }
          20% { transform: rotate(3deg); }
          30% { transform: rotate(-2deg); }
          40% { transform: rotate(2deg); }
          50% { transform: rotate(-1deg); }
          60% { transform: rotate(1deg); }
          70% { transform: rotate(0deg); }
        }
        @keyframes chest-explode {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.8; }
          100% { transform: scale(0.5); opacity: 0; }
        }
        @keyframes golden-burst {
          0% { transform: scale(0); opacity: 0; }
          40% { transform: scale(1.5); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes item-reveal {
          0% { transform: translateY(40px) scale(0.5); opacity: 0; }
          60% { transform: translateY(-10px) scale(1.1); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes shimmer {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.4); }
        }
        @keyframes rays {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Background rays */}
      {(phase === "glow" || phase === "items" || phase === "done") && (
        <div style={{
          position: "absolute", width: 500, height: 500,
          background: "conic-gradient(from 0deg, transparent, rgba(251,191,36,0.05), transparent, rgba(251,191,36,0.05), transparent, rgba(251,191,36,0.05), transparent, rgba(251,191,36,0.05), transparent)",
          borderRadius: "50%", animation: "rays 8s linear infinite",
        }} />
      )}

      {/* Chest */}
      {(phase === "chest" || phase === "opening") && (
        <div style={{
          fontSize: 120, lineHeight: 1,
          animation: phase === "chest" ? "chest-bounce 1.5s ease-in-out infinite" : "chest-shake 0.5s ease-in-out infinite",
        }}>
          🎁
        </div>
      )}

      {/* Golden burst */}
      {phase === "glow" && (
        <>
          <div style={{
            position: "absolute", width: 200, height: 200, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,191,36,0.6) 0%, rgba(251,191,36,0) 70%)",
            animation: "golden-burst 1s ease-out forwards",
          }} />
          <div style={{
            fontSize: 120, lineHeight: 1,
            animation: "chest-explode 0.8s ease-out forwards",
          }}>
            🎁
          </div>
        </>
      )}

      {/* Revealed items */}
      {(phase === "items" || phase === "done") && (
        <div style={{ textAlign: "center", position: "relative", zIndex: 5 }}>
          <div style={{
            color: "#fbbf24", fontSize: 14, fontWeight: 800, letterSpacing: 4,
            textTransform: "uppercase", marginBottom: 12,
            textShadow: "0 0 20px rgba(251,191,36,0.5)",
          }}>
            Legendary Set Unlocked
          </div>
          <div style={{
            color: "white", fontSize: 28, fontWeight: 900, fontFamily: "serif",
            marginBottom: 24, textShadow: "0 0 30px rgba(251,191,36,0.3)",
          }}>
            {setName}
          </div>

          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            {items.map((item, i) => {
              const color = RARITY_COLORS[item.rarity] || "#fbbf24";
              return (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `2px solid ${color}`,
                  borderRadius: 16, padding: "20px 16px", textAlign: "center",
                  minWidth: 120,
                  animation: `item-reveal 0.6s ease-out ${i * 0.2}s both, shimmer 2s ease-in-out ${1 + i * 0.3}s infinite`,
                  boxShadow: `0 0 20px ${color}44, 0 0 40px ${color}22`,
                }}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ color, fontSize: 12, fontWeight: 800 }}>{item.name}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, marginTop: 2 }}>{item.nameEn}</div>
                  <div style={{
                    marginTop: 8, fontSize: 9, fontWeight: 800, textTransform: "uppercase",
                    letterSpacing: 1, color, opacity: 0.8,
                  }}>
                    {item.rarity}
                  </div>
                </div>
              );
            })}
          </div>

          {phase === "done" && (
            <button onClick={onComplete} className="btn-glow" style={{
              marginTop: 32,
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              color: "#1a1523", border: "none", padding: "14px 36px", borderRadius: 12,
              fontSize: 15, fontWeight: 900, cursor: "pointer", fontFamily: "inherit",
              boxShadow: "0 6px 24px rgba(251,191,36,0.4)",
            }}>
              Claim Rewards
            </button>
          )}
        </div>
      )}
    </div>
  );
}

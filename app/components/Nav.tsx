"use client";
import type { GameState, View } from "../types";
import { getLevel, getLPct, getRank } from "../theme";
import { formatNumber } from "../lib/formatNumber";

interface NavProps {
  gs: GameState;
  view: View;
  setView: (v: View) => void;
  dueCount: number;
}

const NAV_ITEMS: { id: View; icon: string; l: string }[] = [
  { id: "dashboard", icon: "\u26E9\uFE0F", l: "Dashboard" },
  { id: "course", icon: "\uD83C\uDF93", l: "Course" },
  { id: "lessons", icon: "\uD83D\uDCD6", l: "Study Hall" },
  { id: "review", icon: "\uD83D\uDCDD", l: "Review" },
  { id: "temple", icon: "\u26E9\uFE0F", l: "Temple" },
  { id: "hero", icon: "\u2694\uFE0F", l: "Hero" },
  { id: "social", icon: "\uD83C\uDFEF", l: "Guild" },
  { id: "shop", icon: "\uD83C\uDFEA", l: "Shop" },
  { id: "profile", icon: "\uD83C\uDF8C", l: "Profile" },
];

export function Nav({ gs, view, setView, dueCount }: NavProps) {
  const level = getLevel(gs.xp);
  const pct = getLPct(gs.xp);
  const rank = getRank(level);

  return (
    <div style={{
      width: 220, minHeight: "100vh", background: "white",
      borderRight: "1px solid #e8e0e4", display: "flex", flexDirection: "column",
      padding: "24px 14px", position: "fixed", left: 0, top: 0, zIndex: 10,
      boxShadow: "2px 0 20px rgba(214,51,108,0.05)",
    }}>
      <div style={{ paddingLeft: 6, marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ color: "#c2255c", fontSize: 19, fontWeight: 900, letterSpacing: 0.5, fontFamily: "serif" }}>
            日本語道場
          </div>
          {gs.awakening && gs.awakening.count > 0 && (
            <span style={{
              background: "linear-gradient(135deg,#fbbf24,#f59e0b)", color: "#1a1523",
              fontSize: 9, fontWeight: 900, padding: "2px 6px", borderRadius: 6,
              letterSpacing: 0.5,
            }}>
              ✦{gs.awakening.count}
            </span>
          )}
        </div>
        <div style={{ color: "#b0a6b8", fontSize: 9, letterSpacing: 4, marginTop: 4, textTransform: "uppercase" }}>
          Nihongo Dojo
        </div>
      </div>

      <div style={{
        background: "linear-gradient(135deg,#f5f0f2,#f5eeff)", borderRadius: 14,
        padding: 14, marginBottom: 22, border: "1px solid #e8e0e4",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ color: "#c2255c", fontSize: 12, fontWeight: 800 }}>{rank}</span>
          <span style={{
            background: "#e8e0e4", color: "#c2255c", fontSize: 10,
            fontWeight: 700, padding: "2px 8px", borderRadius: 999,
          }}>
            Lv {level}
          </span>
        </div>
        <div style={{ background: "#e8e0e4", borderRadius: 999, height: 6, marginBottom: 6 }}>
          <div style={{
            width: `${pct}%`, background: "linear-gradient(90deg,#d6366c,#9b59b6)",
            borderRadius: 999, height: "100%", transition: "width 0.6s",
            boxShadow: "0 0 8px rgba(233,30,140,0.3)",
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#b0a6b8", fontSize: 10 }}>{Math.round(pct)}%</span>
          <span style={{ color: "#b0a6b8", fontSize: 10 }}>Lv {level + 1}</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
        {NAV_ITEMS.map((n) => (
          <button
            key={n.id}
            onClick={() => setView(n.id)}
            className="nav-btn"
            style={{
              background: view === n.id ? "rgba(214,51,108,0.08)" : "transparent",
              border: `1px solid ${view === n.id ? "rgba(214,51,108,0.18)" : "transparent"}`,
              borderRadius: 10, color: view === n.id ? "#c2255c" : "#8a7e92",
              textAlign: "left", display: "flex", alignItems: "center", gap: 10,
              padding: "10px 12px", width: "100%", cursor: "pointer",
              fontSize: 13, fontWeight: view === n.id ? 700 : 500,
              fontFamily: "inherit", transition: "all 0.15s",
            }}
          >
            <span style={{ fontSize: 16 }}>{n.icon}</span>
            <span style={{ flex: 1 }}>{n.l}</span>
            {n.id === "review" && dueCount > 0 && (
              <span style={{
                background: "#c2255c", color: "white", fontSize: 9,
                fontWeight: 800, padding: "1px 6px", borderRadius: 999,
                minWidth: 18, textAlign: "center",
              }}>
                {dueCount > 99 ? "99+" : dueCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div style={{ borderTop: "1px solid #e8e0e4", paddingTop: 14, marginTop: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 4 }}>
          {[
            { i: "\uD83D\uDD25", v: `${gs.streak}d`, l: "Streak" },
            { i: "\uD83E\uDE99", v: formatNumber(gs.coins), l: "Coins" },
            { i: "\uD83C\uDFEE", v: formatNumber(gs.omamori), l: "Omamori" },
            { i: "\u2705", v: formatNumber(gs.completed.size), l: "Done" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "8px 4px", background: "#f8f5f3", borderRadius: 8 }}>
              <div style={{ fontSize: 14 }}>{s.i}</div>
              <div style={{ color: "#1a1523", fontSize: 11, fontWeight: 700, marginTop: 2 }}>{s.v}</div>
              <div style={{ color: "#b0a6b8", fontSize: 9, marginTop: 1 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

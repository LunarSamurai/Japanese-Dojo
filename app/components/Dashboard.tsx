"use client";
import { useMemo } from "react";
import type { GameState, Lesson, BookId, View } from "../types";
import { getLevel, getLPct, getRank, CAT_COLOR, BOOK_META } from "../theme";
import { GENKI1, GENKI2, CONV, QUARTET1, QUARTET2, TOBIRA, ADVANCED } from "../data";
import { getTempleTier } from "../lib/idle";

interface DashboardProps {
  gs: GameState;
  startLesson: (l: Lesson) => void;
  setView: (v: View) => void;
  srsStats: { due: number; learning: number; mature: number; total: number };
}

function bookProgress(bookId: BookId, gs: GameState) {
  const map: Record<BookId, Lesson[]> = {
    genki1: GENKI1, genki2: GENKI2, conv: CONV,
    quartet1: QUARTET1, quartet2: QUARTET2, tobira: TOBIRA, advanced: ADVANCED,
  };
  const ls = map[bookId];
  const done = ls.filter((l) => gs.completed.has(l.id)).length;
  return { done, total: ls.length, pct: ls.length ? (done / ls.length) * 100 : 0 };
}

const ALL_LESSONS = [...GENKI1, ...GENKI2, ...CONV, ...QUARTET1, ...QUARTET2, ...TOBIRA, ...ADVANCED];

const JOURNEY_STAGES = [
  { label: "Beginner", books: ["genki1", "genki2", "conv"] as BookId[], color: "#c2255c" },
  { label: "Intermediate", books: ["quartet1", "quartet2"] as BookId[], color: "#2563eb" },
  { label: "Upper-Inter", books: ["tobira"] as BookId[], color: "#0891b2" },
  { label: "Advanced", books: ["advanced"] as BookId[], color: "#be185d" },
];

export function Dashboard({ gs, startLesson, setView, srsStats }: DashboardProps) {
  const level = getLevel(gs.xp);
  const rank = getRank(level);
  const nextLesson = ALL_LESSONS.find((l) => !gs.completed.has(l.id));

  const tier = useMemo(() => getTempleTier(level), [level]);
  // Temple battle stats for idle earnings display
  const goldPerWave = 5 + gs.temple.waveNumber * 2;
  const goldPerKill = 1 + Math.floor(gs.temple.waveNumber / 3);
  const wavesPerHour = 1800 / 2; // ~900 ticks/hr at 2s/tick, roughly 1 wave per few ticks
  const estimatedGoldPerHour = Math.round(goldPerWave * 30 + goldPerKill * 60); // rough estimate

  const tracks: { id: BookId; label: string; color: string }[] = [
    { id: "genki1", ...BOOK_META.genki1 },
    { id: "genki2", ...BOOK_META.genki2 },
    { id: "conv", label: "Convo Lab", color: "#059669" },
    { id: "quartet1", ...BOOK_META.quartet1 },
    { id: "quartet2", ...BOOK_META.quartet2 },
    { id: "tobira", ...BOOK_META.tobira },
    { id: "advanced", ...BOOK_META.advanced },
  ];

  return (
    <div>
      {/* Hero banner */}
      <div style={{
        background: "linear-gradient(135deg,#f5f0f2 0%,#f5eeff 60%,#fff5fb 100%)",
        borderRadius: 20, padding: "28px 28px 24px", marginBottom: 20,
        position: "relative", overflow: "hidden",
        boxShadow: "0 4px 32px rgba(214,51,108,0.10)",
      }}>
        <div style={{ position: "absolute", top: -15, right: 5, fontSize: 150, opacity: 0.04, color: "#c2255c", fontFamily: "serif", pointerEvents: "none", lineHeight: 1, userSelect: "none" }}>桜</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(214,51,108,0.07)", borderRadius: 999, padding: "4px 14px", marginBottom: 14, border: "1px solid rgba(214,51,108,0.12)" }}>
          <span style={{ fontSize: 11 }}>🌸</span>
          <span style={{ color: "#c2255c", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Language Journey</span>
        </div>
        <div style={{ color: "#1a1523", fontSize: 32, fontWeight: 900, fontFamily: "serif", lineHeight: 1.1, marginBottom: 4 }}>{rank}</div>
        <div style={{ color: "#8a7e92", fontSize: 14, marginBottom: 22 }}>
          Level {level} · {gs.completed.size} of {ALL_LESSONS.length} lessons complete
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          {[
            { l: "XP", v: gs.xp, c: "#c2255c", bg: "rgba(214,51,108,0.07)", i: "⚡" },
            { l: "Streak", v: `${gs.streak}d`, c: "#dc2626", bg: "rgba(220,38,38,0.06)", i: "🔥" },
            { l: "Coins", v: gs.coins, c: "#d97706", bg: "rgba(217,119,6,0.07)", i: "🪙" },
            { l: "Upgrades", v: gs.owned.size, c: "#7c3aed", bg: "rgba(124,58,237,0.07)", i: "🏪" },
          ].map((s, i) => (
            <div key={i} style={{ background: s.bg, borderRadius: 12, padding: "12px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{s.i}</div>
              <div style={{ color: s.c, fontWeight: 800, fontSize: 20, lineHeight: 1 }}>{s.v}</div>
              <div style={{ color: "#b0a6b8", fontSize: 9, marginTop: 3, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Journey stages */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 14 }}>
        {JOURNEY_STAGES.map((stage) => {
          const totalLessons = stage.books.reduce((sum, b) => sum + bookProgress(b, gs).total, 0);
          const doneLessons = stage.books.reduce((sum, b) => sum + bookProgress(b, gs).done, 0);
          const pct = totalLessons ? (doneLessons / totalLessons) * 100 : 0;
          return (
            <div key={stage.label} className="card-hover" style={{
              background: "white", border: "1px solid #e8e0e4", borderRadius: 14,
              padding: "16px 18px", boxShadow: "0 2px 12px rgba(214,51,108,0.04)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ color: stage.color, fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>{stage.label}</span>
                <span style={{ color: "#7a6e84", fontSize: 11 }}>{doneLessons}/{totalLessons}</span>
              </div>
              <div style={{ background: "#e8e0e4", borderRadius: 999, height: 6 }}>
                <div style={{ width: `${pct}%`, background: stage.color, borderRadius: 999, height: "100%", opacity: 0.8, transition: "width 0.6s" }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Temple mini-card */}
      <div
        onClick={() => setView("temple")}
        className="card-hover"
        style={{
          background: "linear-gradient(135deg,#1a0a12,#1a1523)", borderRadius: 16,
          padding: 20, marginBottom: 14, cursor: "pointer", display: "flex",
          alignItems: "center", justifyContent: "space-between", gap: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)", position: "relative", overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(214,51,108,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 36 }}>⛩️</div>
          <div>
            <div style={{ color: "#c4a8b8", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 2 }}>Your Temple</div>
            <div style={{ color: "white", fontSize: 18, fontWeight: 900, fontFamily: "serif" }}>
              {getLevel(gs.xp) >= 17 ? "Celestial Palace" : getLevel(gs.xp) >= 11 ? "Grand Shrine" : getLevel(gs.xp) >= 5 ? "Temple" : "Small Shrine"}
            </div>
            <div style={{ color: "#8a7e92", fontSize: 11, marginTop: 2 }}>
              Wave {gs.temple.waveNumber + 1} · {gs.temple.wavesCleared} cleared · {gs.temple.demonsDefeated} demons defeated
            </div>
          </div>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            background: "linear-gradient(135deg,#c2255c,#9b59b6)", color: "white",
            padding: "10px 18px", borderRadius: 10, fontSize: 12, fontWeight: 800,
          }}>
            Defend →
          </div>
        </div>
      </div>

      {/* Temple Battle Stats card */}
      <div className="card-hover" style={{
        background: "white", border: "1px solid #e8e0e4", borderRadius: 16,
        padding: 20, marginBottom: 14,
        boxShadow: "0 2px 16px rgba(214,51,108,0.04)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ color: "#1a1523", fontWeight: 700, fontSize: 14 }}>⛩️ Temple Battle</div>
          <span style={{
            background: "rgba(124,58,237,0.08)", color: "#7c3aed",
            fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999,
            border: "1px solid rgba(124,58,237,0.15)",
          }}>
            {tier.name} · Wave {gs.temple.waveNumber}
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
          <div style={{ textAlign: "center", background: "#f8f5f3", borderRadius: 10, padding: "12px 8px" }}>
            <div style={{ color: "#d97706", fontWeight: 800, fontSize: 18 }}>
              {gs.temple.totalGoldEarned}
            </div>
            <div style={{ color: "#b0a6b8", fontSize: 9, marginTop: 2, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Gold Earned
            </div>
          </div>
          <div style={{ textAlign: "center", background: "#f8f5f3", borderRadius: 10, padding: "12px 8px" }}>
            <div style={{ color: "#ef4444", fontWeight: 800, fontSize: 18 }}>
              {gs.temple.totalKills}
            </div>
            <div style={{ color: "#b0a6b8", fontSize: 9, marginTop: 2, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Demons Slain
            </div>
          </div>
          <div style={{ textAlign: "center", background: "#f8f5f3", borderRadius: 10, padding: "12px 8px" }}>
            <div style={{ color: "#c2255c", fontWeight: 800, fontSize: 18 }}>
              ~{estimatedGoldPerHour}
            </div>
            <div style={{ color: "#b0a6b8", fontSize: 9, marginTop: 2, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Gold / hr
            </div>
          </div>
          <div style={{ textAlign: "center", background: "#f8f5f3", borderRadius: 10, padding: "12px 8px" }}>
            <div style={{ color: "#7c3aed", fontWeight: 800, fontSize: 18 }}>
              {gs.omamori}
            </div>
            <div style={{ color: "#b0a6b8", fontSize: 9, marginTop: 2, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Omamori
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14, marginBottom: 14 }}>
        {/* Track progress */}
        <div className="card-hover" style={{
          background: "white", border: "1px solid #e8e0e4", borderRadius: 16,
          padding: 20, boxShadow: "0 2px 16px rgba(214,51,108,0.04)",
        }}>
          <div style={{ color: "#1a1523", fontWeight: 700, marginBottom: 14, fontSize: 14 }}>📚 Track Progress</div>
          {tracks.map((t) => {
            const bp = bookProgress(t.id, gs);
            return (
              <div key={t.id} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ color: t.color, fontSize: 12, fontWeight: 700 }}>{t.label}</span>
                  <span style={{ color: "#7a6e84", fontSize: 11 }}>{bp.done}/{bp.total}</span>
                </div>
                <div style={{ background: "#e8e0e4", borderRadius: 999, height: 7 }}>
                  <div style={{ width: `${bp.pct}%`, background: t.color, borderRadius: 999, height: "100%", opacity: 0.8, transition: "width 0.6s" }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Up Next */}
        <div className="card-hover" style={{
          background: "white", border: "1px solid #e8e0e4", borderRadius: 16,
          padding: 20, display: "flex", flexDirection: "column",
          boxShadow: "0 2px 16px rgba(214,51,108,0.04)",
        }}>
          <div style={{ color: "#1a1523", fontWeight: 700, marginBottom: 12, fontSize: 14 }}>⚡ Up Next</div>
          {nextLesson ? (
            <>
              <div style={{
                background: "linear-gradient(135deg,#f5f0f2,#f5eeff)",
                borderRadius: 12, padding: 14, flex: 1, marginBottom: 12, border: "1px solid #e8e0e4",
              }}>
                <div style={{
                  color: CAT_COLOR[nextLesson.book || nextLesson.category || ""] || "#c2255c",
                  fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 4,
                }}>
                  {nextLesson.book || nextLesson.category}
                </div>
                <div style={{ color: "#1a1523", fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{nextLesson.title}</div>
                <div style={{ color: "#6e6378", fontSize: 12 }}>{nextLesson.jp}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <span style={{ color: "#c2255c", fontSize: 11 }}>⚡{nextLesson.xp}</span>
                  <span style={{ color: "#d97706", fontSize: 11 }}>🪙{nextLesson.coins}</span>
                </div>
              </div>
              <button
                onClick={() => startLesson(nextLesson)}
                className="btn-glow"
                style={{
                  background: "linear-gradient(135deg,#d6366c,#7c3aed)",
                  color: "white", border: "none", borderRadius: 10,
                  padding: "12px 0", fontWeight: 800, cursor: "pointer",
                  fontFamily: "inherit", fontSize: 14,
                  boxShadow: "0 4px 16px rgba(233,30,140,0.28)",
                }}
              >
                ▶ Start Now
              </button>
            </>
          ) : (
            <div style={{ color: "#7a6e84", fontSize: 13 }}>All lessons complete! 🎉</div>
          )}
        </div>
      </div>

      {/* SRS Review Section */}
      {srsStats.total > 0 && (
        <div className="card-hover" style={{
          background: "white", border: "1px solid #e8e0e4", borderRadius: 16,
          padding: 20, boxShadow: "0 2px 16px rgba(214,51,108,0.04)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ color: "#1a1523", fontWeight: 700, fontSize: 14 }}>📝 Spaced Repetition</div>
            {srsStats.due > 0 && (
              <span style={{
                background: "#c2255c", color: "white", fontSize: 10,
                fontWeight: 700, padding: "2px 10px", borderRadius: 999,
              }}>
                {srsStats.due} due
              </span>
            )}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
            {[
              { l: "Due", v: srsStats.due, c: "#c2255c" },
              { l: "Learning", v: srsStats.learning, c: "#ea580c" },
              { l: "Mature", v: srsStats.mature, c: "#059669" },
              { l: "Total", v: srsStats.total, c: "#7c3aed" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", background: "#f8f5f3", borderRadius: 8, padding: "10px 4px" }}>
                <div style={{ color: s.c, fontWeight: 800, fontSize: 18 }}>{s.v}</div>
                <div style={{ color: "#b0a6b8", fontSize: 9, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
          {srsStats.due > 0 && (
            <button
              onClick={() => setView("review")}
              className="btn-glow"
              style={{
                width: "100%", background: "linear-gradient(135deg,#d6366c,#7c3aed)",
                color: "white", border: "none", borderRadius: 10,
                padding: "12px 0", fontWeight: 800, cursor: "pointer",
                fontFamily: "inherit", fontSize: 14,
                boxShadow: "0 4px 16px rgba(233,30,140,0.28)",
              }}
            >
              📝 Start Review ({srsStats.due} cards)
            </button>
          )}
        </div>
      )}
    </div>
  );
}

"use client";
import type { GameState, Lesson, BookId } from "../types";
import { CAT_COLOR, BOOK_META } from "../theme";
import { GENKI1, GENKI2, CONV, QUARTET1, QUARTET2, TOBIRA, ADVANCED } from "../data";

interface StudyHallProps {
  gs: GameState;
  activeBook: BookId;
  setActiveBook: (b: BookId) => void;
  startLesson: (l: Lesson) => void;
}

const BOOK_MAP: Record<BookId, Lesson[]> = {
  genki1: GENKI1, genki2: GENKI2, conv: CONV,
  quartet1: QUARTET1, quartet2: QUARTET2, tobira: TOBIRA, advanced: ADVANCED,
};

const TABS: { id: BookId; label: string; color: string }[] = [
  { id: "genki1", label: "Genki I", color: "#c2255c" },
  { id: "genki2", label: "Genki II", color: "#7c3aed" },
  { id: "conv", label: "Convo Lab", color: "#059669" },
  { id: "quartet1", label: "Quartet I", color: "#2563eb" },
  { id: "quartet2", label: "Quartet II", color: "#7c3aed" },
  { id: "tobira", label: "Tobira", color: "#0891b2" },
  { id: "advanced", label: "Advanced", color: "#be185d" },
];

export function StudyHall({ gs, activeBook, setActiveBook, startLesson }: StudyHallProps) {
  const lessons = BOOK_MAP[activeBook];

  const getBookProgress = (bookId: BookId) => {
    const ls = BOOK_MAP[bookId];
    const done = ls.filter((l) => gs.completed.has(l.id)).length;
    return { done, total: ls.length };
  };

  return (
    <div>
      <div style={{ color: "#1a1523", fontWeight: 900, fontSize: 22, fontFamily: "serif", marginBottom: 16 }}>
        Study Hall
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {TABS.map((b) => {
          const bp = getBookProgress(b.id);
          return (
            <button
              key={b.id}
              onClick={() => setActiveBook(b.id)}
              style={{
                background: activeBook === b.id ? b.color : "#ffffff",
                color: activeBook === b.id ? "#faf7f5" : b.color,
                border: `1px solid ${b.color}`,
                borderRadius: 8, padding: "7px 14px",
                fontWeight: 800, cursor: "pointer",
                fontFamily: "inherit", fontSize: 12,
                transition: "all 0.15s",
              }}
            >
              {b.label}{" "}
              <span style={{ opacity: 0.7, fontWeight: 400 }}>
                ({bp.done}/{bp.total})
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
        {lessons.map((l, i) => {
          const done = gs.completed.has(l.id);
          const cat = l.book || l.category || "";
          const cc = CAT_COLOR[cat] || "#c2255c";
          const contentCount = [l.vocab?.length || 0, l.grammar?.length || 0, l.kanji?.length || 0, l.reading?.length || 0].filter(Boolean).length;
          return (
            <div
              key={l.id}
              className="card-hover"
              onClick={() => startLesson(l)}
              style={{
                background: done ? `linear-gradient(135deg, #ffffff, ${cc}08)` : "#ffffff",
                border: `1.5px solid ${done ? cc + "44" : "#d4c8ce"}`,
                borderRadius: 12, padding: "14px 14px 12px",
                position: "relative", overflow: "hidden",
                transition: "all 0.2s",
                display: "flex", flexDirection: "column",
                aspectRatio: "1 / 1",
                cursor: "pointer",
              }}
            >
              <div style={{
                position: "absolute", top: 4, right: 8, fontSize: 44,
                opacity: 0.04, color: cc, fontFamily: "serif", lineHeight: 1,
              }}>
                {l.lesson || i + 1}
              </div>
              {done && (
                <div style={{
                  position: "absolute", top: 8, right: 8, width: 20, height: 20,
                  borderRadius: "50%", background: "#059669",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 11, fontWeight: 800,
                }}>✓</div>
              )}
              <div style={{
                color: cc, fontSize: 9, fontWeight: 700,
                letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6,
              }}>
                L{l.lesson || i + 1}
              </div>
              <div style={{
                color: "#1a1523", fontWeight: 800, fontSize: 22,
                fontFamily: "serif", marginBottom: 2, lineHeight: 1.1,
              }}>
                {l.jp}
              </div>
              <div style={{ color: "#564a5e", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
                {l.title}
              </div>
              <div style={{ flex: 1 }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                {(l.vocab?.length || 0) > 0 && (
                  <span style={{ background: `${cc}10`, color: cc, borderRadius: 4, padding: "1px 6px", fontSize: 9, fontWeight: 600 }}>
                    {l.vocab!.length} words
                  </span>
                )}
                {(l.kanji?.length || 0) > 0 && (
                  <span style={{ background: "rgba(124,58,237,0.08)", color: "#7c3aed", borderRadius: 4, padding: "1px 6px", fontSize: 9, fontWeight: 600 }}>
                    {l.kanji!.length} kanji
                  </span>
                )}
                {(l.grammar?.length || 0) > 0 && (
                  <span style={{ background: "rgba(37,99,235,0.08)", color: "#2563eb", borderRadius: 4, padding: "1px 6px", fontSize: 9, fontWeight: 600 }}>
                    {l.grammar!.length} grammar
                  </span>
                )}
                {(l.reading?.length || 0) > 0 && (
                  <span style={{ background: "rgba(5,150,105,0.08)", color: "#059669", borderRadius: 4, padding: "1px 6px", fontSize: 9, fontWeight: 600 }}>
                    📖 reading
                  </span>
                )}
              </div>
              <div style={{ display: "flex", gap: 6, fontSize: 10 }}>
                <span style={{ color: "#c2255c", fontWeight: 600 }}>⚡{l.xp}</span>
                <span style={{ color: "#d97706", fontWeight: 600 }}>🪙{l.coins}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

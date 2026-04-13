"use client";
import { useEffect, useState } from "react";
import type { GameState, Lesson, BookId } from "../types";
import { GENKI1, GENKI2, CONV, QUARTET1, QUARTET2, TOBIRA, ADVANCED } from "../data";
import { PlacementTest } from "./PlacementTest";

interface CourseProps {
  gs: GameState;
  startLesson: (l: Lesson) => void;
}

const PLACEMENT_KEY = "nihongo-dojo-placement";

interface Unit {
  id: BookId;
  title: string;
  jp: string;
  subtitle: string;
  level: string;
  color: string;
  lessons: Lesson[];
}

const UNITS: Unit[] = [
  { id: "genki1", title: "Unit 1 · Genki I", jp: "初級前期", subtitle: "Beginner foundations — greetings, basic grammar, hiragana/katakana", level: "N5", color: "#2dbf7c", lessons: GENKI1 },
  { id: "genki2", title: "Unit 2 · Genki II", jp: "初級後期", subtitle: "Expanding beginner — te-form, conditionals, honorifics", level: "N5→N4", color: "#14a864", lessons: GENKI2 },
  { id: "conv", title: "Unit 3 · Conversation Lab", jp: "会話練習", subtitle: "Practical spoken Japanese for real situations", level: "N4", color: "#e8751a", lessons: CONV },
  { id: "quartet1", title: "Unit 4 · Quartet I", jp: "中級前期", subtitle: "Pre-intermediate — four skills integrated", level: "N3", color: "#2b79d6", lessons: QUARTET1 },
  { id: "quartet2", title: "Unit 5 · Quartet II", jp: "中級後期", subtitle: "Upper intermediate — complex grammar & discourse", level: "N3→N2", color: "#1860b0", lessons: QUARTET2 },
  { id: "tobira", title: "Unit 6 · Tobira", jp: "上級への扉", subtitle: "Gateway to advanced — authentic texts, culture, history", level: "N2", color: "#7c3aed", lessons: TOBIRA },
  { id: "advanced", title: "Unit 7 · Advanced Mastery", jp: "上級", subtitle: "JLPT N1 level — advanced grammar & vocabulary", level: "N1", color: "#b91c5c", lessons: ADVANCED },
];

export function Course({ gs, startLesson }: CourseProps) {
  const [placement, setPlacement] = useState<BookId | null>(null);
  const [showTest, setShowTest] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(PLACEMENT_KEY) : null;
    if (stored) {
      setPlacement(stored as BookId);
    } else {
      setShowTest(true);
    }
  }, []);

  const finishTest = (book: BookId) => {
    localStorage.setItem(PLACEMENT_KEY, book);
    setPlacement(book);
    setShowTest(false);
  };

  const skipTest = () => {
    localStorage.setItem(PLACEMENT_KEY, "genki1");
    setPlacement("genki1");
    setShowTest(false);
  };

  if (showTest) {
    return <PlacementTest onFinish={finishTest} onSkip={skipTest} />;
  }

  const allLessons = UNITS.flatMap((u) => u.lessons);
  const totalDone = allLessons.filter((l) => gs.completed.has(l.id)).length;
  const overallPct = allLessons.length ? (totalDone / allLessons.length) * 100 : 0;

  // Find the first incomplete lesson starting from the placement unit
  const placementUnitIdx = placement ? UNITS.findIndex((u) => u.id === placement) : 0;
  const lessonsFromPlacement = UNITS.slice(Math.max(0, placementUnitIdx)).flatMap((u) => u.lessons);
  const nextFromPlacement = lessonsFromPlacement.find((l) => !gs.completed.has(l.id));
  const nextLessonId = nextFromPlacement?.id ?? allLessons.find((l) => !gs.completed.has(l.id))?.id ?? null;

  return (
    <div>
      <div style={{
        background: "linear-gradient(135deg,#f5f0f2,#f5eeff)",
        borderRadius: 20, padding: 32, marginBottom: 28,
        border: "1px solid #e8e0e4",
      }}>
        <div style={{ color: "#8a7e92", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
          Guided Curriculum
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div style={{ color: "#1a1523", fontSize: 32, fontWeight: 900, fontFamily: "serif", marginBottom: 4 }}>
            The Complete Course
          </div>
          <button onClick={() => setShowTest(true)} style={{ background: "white", border: "1.5px solid #e8e0e4", color: "#c2255c", padding: "8px 14px", borderRadius: 10, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>
            🎯 Retake Placement
          </button>
        </div>
        {placement && placement !== "genki1" && (
          <div style={{ background: "white", borderRadius: 10, padding: "10px 14px", marginBottom: 14, border: "1px solid #e8e0e4", fontSize: 12, color: "#564a5e" }}>
            <span style={{ color: "#c2255c", fontWeight: 800 }}>Placed at: </span>
            {placement === "genki2" && "Genki II"}
            {placement === "conv" && "Conversation Lab"}
            {placement === "quartet1" && "Quartet I"}
            {placement === "quartet2" && "Quartet II"}
            {placement === "tobira" && "Tobira"}
            {placement === "advanced" && "Advanced Mastery"}
            <span style={{ color: "#8a7e92" }}> — scroll to your recommended unit below</span>
          </div>
        )}
        <div style={{ color: "#564a5e", fontSize: 14, marginBottom: 20, maxWidth: 680 }}>
          A structured path from zero to JLPT N1. Work through each unit in order — every lesson
          unlocks the next. Genki I & II → Conversation → Quartet I & II → Tobira → Advanced.
        </div>
        <div style={{ background: "white", borderRadius: 14, padding: 16, border: "1px solid #e8e0e4" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ color: "#1a1523", fontSize: 13, fontWeight: 800 }}>Overall Progress</span>
            <span style={{ color: "#c2255c", fontSize: 13, fontWeight: 800 }}>
              {totalDone} / {allLessons.length} lessons · {Math.round(overallPct)}%
            </span>
          </div>
          <div style={{ background: "#e8e0e4", borderRadius: 999, height: 10 }}>
            <div style={{
              width: `${overallPct}%`, height: "100%", borderRadius: 999,
              background: "linear-gradient(90deg,#2dbf7c,#e8751a,#2b79d6,#7c3aed,#b91c5c)",
              transition: "width 0.6s",
            }} />
          </div>
        </div>
      </div>

      {(() => {
        const placementIdx = placement ? UNITS.findIndex((u) => u.id === placement) : 0;
        return UNITS.map((unit, uIdx) => {
        // Unit unlocks if: it's the first unit, OR placement put user here or earlier, OR prior unit is fully done
        const priorLessons = UNITS.slice(0, uIdx).flatMap((u) => u.lessons);
        const priorDone = priorLessons.every((l) => gs.completed.has(l.id));
        const unitUnlocked = uIdx === 0 || uIdx <= placementIdx || priorDone;

        const done = unit.lessons.filter((l) => gs.completed.has(l.id)).length;
        const pct = unit.lessons.length ? (done / unit.lessons.length) * 100 : 0;

        return (
          <div key={unit.id} style={{
            background: "white", borderRadius: 18, padding: 24, marginBottom: 20,
            border: `2px solid ${unitUnlocked ? unit.color + "33" : "#f0e0ea"}`,
            opacity: unitUnlocked ? 1 : 0.55,
            boxShadow: unitUnlocked ? `0 4px 24px ${unit.color}10` : "none",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18, gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{
                    background: unit.color, color: "white", fontSize: 10, fontWeight: 800,
                    padding: "3px 9px", borderRadius: 999, letterSpacing: 0.5,
                  }}>
                    {unit.level}
                  </span>
                  <span style={{ color: unit.color, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>
                    {unit.jp}
                  </span>
                  {!unitUnlocked && (
                    <span style={{ color: "#8a7e92", fontSize: 11, fontWeight: 600 }}>🔒 Locked</span>
                  )}
                  {placement === unit.id && (
                    <span style={{ background: "linear-gradient(135deg,#d6366c,#9b59b6)", color: "white", fontSize: 9, fontWeight: 800, padding: "3px 9px", borderRadius: 999, letterSpacing: 0.5 }}>
                      ⭐ YOUR START
                    </span>
                  )}
                </div>
                <div style={{ color: "#1a1523", fontSize: 22, fontWeight: 900, fontFamily: "serif", marginBottom: 4 }}>
                  {unit.title}
                </div>
                <div style={{ color: "#564a5e", fontSize: 13 }}>{unit.subtitle}</div>
              </div>
              <div style={{ textAlign: "right", minWidth: 120 }}>
                <div style={{ color: unit.color, fontSize: 24, fontWeight: 900, fontFamily: "serif" }}>
                  {Math.round(pct)}%
                </div>
                <div style={{ color: "#8a7e92", fontSize: 11 }}>{done}/{unit.lessons.length} done</div>
              </div>
            </div>

            <div style={{ background: "#f8f5f3", borderRadius: 999, height: 6, marginBottom: 18 }}>
              <div style={{
                width: `${pct}%`, height: "100%", borderRadius: 999,
                background: unit.color, transition: "width 0.6s",
              }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 10 }}>
              {unit.lessons.map((l, i) => {
                const isDone = gs.completed.has(l.id);
                // A lesson is unlocked if unit is unlocked AND all prior lessons in unit are done (or it's the first)
                const priorInUnit = unit.lessons.slice(0, i).every((pl) => gs.completed.has(pl.id));
                const lessonUnlocked = unitUnlocked && (i === 0 || priorInUnit || isDone);
                const isNext = l.id === nextLessonId;

                return (
                  <button
                    key={l.id}
                    onClick={() => lessonUnlocked && startLesson(l)}
                    disabled={!lessonUnlocked}
                    className={lessonUnlocked ? "card-hover" : ""}
                    style={{
                      background: isDone ? "#f0fdf4" : isNext ? `${unit.color}10` : "white",
                      border: `1.5px solid ${isDone ? "#86efac" : isNext ? unit.color : "#e8e0e4"}`,
                      borderRadius: 12, padding: "12px 14px", textAlign: "left",
                      cursor: lessonUnlocked ? "pointer" : "not-allowed",
                      fontFamily: "inherit", display: "flex", alignItems: "center", gap: 12,
                      opacity: lessonUnlocked ? 1 : 0.5,
                    }}
                  >
                    <div style={{
                      width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                      background: isDone ? "#16a34a" : isNext ? unit.color : "#e8e0e4",
                      color: isDone || isNext ? "white" : "#c2255c",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 800,
                    }}>
                      {isDone ? "✓" : lessonUnlocked ? i + 1 : "🔒"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        color: "#1a1523", fontSize: 12, fontWeight: 800,
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>
                        {l.title}
                      </div>
                      <div style={{ color: "#8a7e92", fontSize: 10, marginTop: 2 }}>
                        {l.jp} · +{l.xp}xp
                      </div>
                    </div>
                    {isNext && (
                      <span style={{
                        background: unit.color, color: "white", fontSize: 9,
                        fontWeight: 800, padding: "2px 7px", borderRadius: 999,
                      }}>
                        NEXT
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      });
      })()}
    </div>
  );
}

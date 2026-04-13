"use client";
import React, { useState } from "react";
import type { GameState, Lesson, QuizState, View, PhraseItem, KanjiItem, ReadingPassage } from "../types";
import { CAT_COLOR } from "../theme";
import { GENKI1, GENKI2, CONV, QUARTET1, QUARTET2, TOBIRA, ADVANCED } from "../data";
import { getSkillBonusesSafe } from "../lib/skillBonusHelper";

const BOOK_LESSONS: Record<string, Lesson[]> = {
  "Genki I": GENKI1, "Genki II": GENKI2, "Real Life": CONV, "Conversational": CONV,
  "Quartet I": QUARTET1, "Quartet II": QUARTET2, "Tobira": TOBIRA,
  "JLPT N2": ADVANCED, "JLPT N1": ADVANCED, "Business": ADVANCED, "Academic": ADVANCED, "Advanced": ADVANCED,
};

const BOOK_COMPLETION_BONUS = { coins: 1000, omamori: 50 };

interface LessonViewProps {
  lesson: Lesson;
  gs: GameState;
  quiz: QuizState;
  setQuiz: React.Dispatch<React.SetStateAction<QuizState>>;
  setGs: (updater: GameState | ((prev: GameState) => GameState)) => void;
  setView: (v: View) => void;
  showToast: (msg: string, type?: string) => void;
  unlockCards: (lesson: Lesson) => void;
}

const PHASE_LABELS: Record<string, { icon: string; label: string }> = {
  vocab: { icon: "📝", label: "Vocab" },
  kanji: { icon: "漢", label: "Kanji" },
  grammar: { icon: "📐", label: "Grammar" },
  reading: { icon: "📖", label: "Reading" },
  dialogue: { icon: "🎭", label: "Dialogue" },
  tips: { icon: "💡", label: "Tips" },
  quiz: { icon: "🎯", label: "Quiz" },
};

export function LessonView({ lesson, gs, quiz, setQuiz, setGs, setView, showToast, unlockCards }: LessonViewProps) {
  const vocab = lesson.vocab || [];
  const phrases = lesson.phrases || [];
  const grammar = lesson.grammar || [];
  const dialogue = lesson.dialogue || [];
  const tips = lesson.tips || [];
  const quizData = lesson.quiz || [];
  const kanji = lesson.kanji || [];
  const reading = lesson.reading || [];
  const isConv = !!lesson.category;
  const cc = CAT_COLOR[lesson.book || lesson.category || ""] || "#c2255c";
  const curQ = quizData[quiz.q];
  const displayItems = isConv ? phrases : vocab;

  const phases = [
    "vocab",
    kanji.length ? "kanji" : null,
    grammar.length ? "grammar" : null,
    reading.length ? "reading" : null,
    dialogue.length ? "dialogue" : null,
    tips.length ? "tips" : null,
    "quiz",
  ].filter(Boolean) as string[];

  const [phase, setPhase] = useState(phases[0] || "vocab");
  const [kanjiFlipped, setKanjiFlipped] = useState<Set<number>>(new Set());
  const [readingShowTrans, setReadingShowTrans] = useState<Set<number>>(new Set());

  const nextPhase = () => {
    const idx = phases.indexOf(phase);
    if (idx < phases.length - 1) setPhase(phases[idx + 1]);
  };

  const selectAnswer = (i: number) => {
    if (quiz.selected !== null) return;
    setQuiz((q) => ({ ...q, selected: i }));
  };

  const nextQ = () => {
    const qs = quizData;
    const correct = quiz.selected === qs[quiz.q].a;
    const newAns = [...quiz.answers, correct];
    if (quiz.q + 1 >= qs.length) {
      const score = newAns.filter(Boolean).length;
      const total = newAns.length;
      const skillBonuses = getSkillBonusesSafe(gs.awakening);
      let xpMult = skillBonuses.xpMultiplier; // start with skill tree XP mult
      if (gs.owned.has("immersion")) xpMult *= 1.5;
      else if (gs.owned.has("desk")) xpMult *= 1.2;
      if ((lesson.category === "Real Life" || lesson.category === "Conversational") && gs.owned.has("partner")) xpMult *= 1.4;
      if ((lesson.id.includes("g2-l20") || lesson.id.includes("g2-l21") || lesson.id.startsWith("cv")) && gs.owned.has("girlfriend")) xpMult *= 1.3;
      const xpEarned = Math.round((lesson.xp * (score / total)) * xpMult);
      // Lesson quiz gold is the PRIMARY gold source — much higher than wave gold
      const baseGold = lesson.coins * 5; // 5x multiplier over data value
      const goldMult = skillBonuses.goldMultiplier;
      let coinsEarned = Math.round((score === total ? baseGold : Math.floor(baseGold * (score / total))) * goldMult);
      if (score === total && gs.owned.has("anki")) coinsEarned += 50;
      if (score === total && gs.owned.has("dojo2")) coinsEarned *= 2;
      // Omamori from quizzes: 2 for passing (>50%), 5 for great (>80%), 10 for perfect
      const pct = score / total;
      const baseOmamori = pct >= 1 ? 10 : pct >= 0.8 ? 5 : pct > 0.5 ? 2 : 0;
      const omamoriEarned = Math.round(baseOmamori * skillBonuses.omamoriMultiplier);
      // Perfect score: +5% temple rebuild buff (stacks permanently)
      const perfectBonus = score === total;
      // Check if this completes an entire book
      const bookKey = lesson.book || lesson.category || "";
      const bookLessons = BOOK_LESSONS[bookKey];
      const newCompleted = new Set([...gs.completed, lesson.id]);
      const bookComplete = bookLessons && bookLessons.length > 0 && bookLessons.every((l) => newCompleted.has(l.id));
      const bookBonusCoins = bookComplete ? BOOK_COMPLETION_BONUS.coins : 0;
      const bookBonusOmamori = bookComplete ? BOOK_COMPLETION_BONUS.omamori : 0;

      setGs((g) => ({
        ...g,
        xp: g.xp + xpEarned,
        coins: g.coins + coinsEarned + bookBonusCoins,
        omamori: g.omamori + omamoriEarned + bookBonusOmamori,
        completed: newCompleted,
        temple: perfectBonus ? {
          ...g.temple,
          hp: Math.min(g.temple.maxHp, g.temple.hp + Math.round(g.temple.maxHp * 0.05)),
        } : g.temple,
      }));
      setQuiz((q) => ({ ...q, answers: newAns, done: true }));
      unlockCards(lesson);
      const omamoriText = omamoriEarned > 0 ? `  +${omamoriEarned} 🏮` : "";
      const rebuildText = perfectBonus ? "  ⛩️+5% HP" : "";
      showToast(`+${xpEarned} XP  +${coinsEarned} 🪙${omamoriText}${rebuildText}`, score === total ? "perfect" : "xp");
      if (bookComplete) {
        setTimeout(() => showToast(`📚 Book Complete! +${bookBonusCoins} 🪙 +${bookBonusOmamori} 🏮`, "perfect"), 1500);
      }
    } else {
      setQuiz((q) => ({ ...q, q: q.q + 1, answers: newAns, selected: null, hint: false }));
    }
  };

  return (
    <div>
      <button onClick={() => setView("lessons")} style={{ color: cc, background: "none", border: "none", cursor: "pointer", marginBottom: 14, fontSize: 12, fontFamily: "inherit", fontWeight: 600 }}>
        ← Back to Study Hall
      </button>

      <div className="card-hover" style={{ background: "#ffffff", border: `1px solid ${cc}22`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ color: cc, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
          {lesson.book || lesson.category}{lesson.lesson ? ` · Lesson ${lesson.lesson}` : ""}
        </div>
        <div style={{ color: "#1a1523", fontWeight: 900, fontSize: 20, fontFamily: "serif", marginTop: 4, marginBottom: 2 }}>{lesson.title}</div>
        <div style={{ color: "#564a5e", fontSize: 13 }}>{lesson.jp}</div>
        {lesson.situation && (
          <div style={{ marginTop: 10, color: "#6e6378", fontSize: 12, borderLeft: `2px solid ${cc}44`, paddingLeft: 10, fontStyle: "italic" }}>{lesson.situation}</div>
        )}
        <div style={{ display: "flex", gap: 8, marginTop: 12, fontSize: 11 }}>
          {vocab.length > 0 && <span style={{ color: "#7a6e84" }}>📝 {vocab.length} words</span>}
          {kanji.length > 0 && <span style={{ color: "#7a6e84" }}>漢 {kanji.length} kanji</span>}
          {grammar.length > 0 && <span style={{ color: "#7a6e84" }}>📐 {grammar.length} patterns</span>}
          {reading.length > 0 && <span style={{ color: "#7a6e84" }}>📖 {reading.length} passage{reading.length > 1 ? "s" : ""}</span>}
        </div>
      </div>

      {/* Phase tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, flexWrap: "wrap" }}>
        {phases.map((p) => {
          const pl = PHASE_LABELS[p];
          return (
            <button
              key={p}
              onClick={() => !quiz.done && setPhase(p)}
              style={{
                background: phase === p ? cc : "#ffffff",
                color: phase === p ? "#faf7f5" : cc,
                border: `1px solid ${phase === p ? cc : cc + "33"}`,
                borderRadius: 7, padding: "6px 12px",
                fontWeight: 700, cursor: "pointer",
                fontFamily: "inherit", fontSize: 11,
                transition: "all 0.15s",
              }}
            >
              {pl?.icon} {pl?.label}
            </button>
          );
        })}
      </div>

      {/* VOCAB PHASE */}
      {phase === "vocab" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 8 }}>
            {displayItems.map((v, i) => (
              <div key={i} className="card-hover" style={{ background: "#ffffff", border: "1px solid #d4c8ce", borderRadius: 9, padding: "10px 14px" }}>
                {"j" in v ? (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ minWidth: 80 }}>
                      <div style={{ color: "#1a1523", fontSize: 15, fontFamily: "serif" }}>{v.j}</div>
                      {"r" in v && v.r !== v.j && <div style={{ color: "#7a6e84", fontSize: 10, marginTop: 1 }}>{v.r}</div>}
                    </div>
                    <div style={{ width: 1, height: 24, background: "#d4c8ce", flexShrink: 0 }} />
                    <div style={{ color: "#6e6378", fontSize: 12 }}>{"e" in v ? v.e : ""}</div>
                  </div>
                ) : (
                  <div>
                    <div style={{ color: "#1a1523", fontFamily: "serif", fontSize: 14, marginBottom: 3 }}>{(v as PhraseItem).jp}</div>
                    <div style={{ color: "#564a5e", fontSize: 11 }}>{(v as PhraseItem).tr}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button onClick={nextPhase} style={{ width: "100%", marginTop: 14, background: `linear-gradient(135deg,${cc},${cc}aa)`, color: "#faf7f5", border: "none", borderRadius: 9, padding: "12px 0", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>
            Next →
          </button>
        </div>
      )}

      {/* KANJI PHASE */}
      {phase === "kanji" && kanji.length > 0 && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
            {kanji.map((k, i) => {
              const flipped = kanjiFlipped.has(i);
              return (
                <div
                  key={i}
                  className="card-hover"
                  onClick={() => {
                    const s = new Set(kanjiFlipped);
                    flipped ? s.delete(i) : s.add(i);
                    setKanjiFlipped(s);
                  }}
                  style={{
                    background: flipped ? `${cc}08` : "#ffffff",
                    border: `1.5px solid ${flipped ? cc + "44" : "#d4c8ce"}`,
                    borderRadius: 12, padding: 16,
                    cursor: "pointer", transition: "all 0.2s",
                    textAlign: "center", minHeight: 130,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                  }}
                >
                  <div style={{ fontSize: 40, fontFamily: "serif", color: "#1a1523", marginBottom: 6, lineHeight: 1 }}>
                    {k.char}
                  </div>
                  {flipped ? (
                    <>
                      <div style={{ color: cc, fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{k.meaning}</div>
                      <div style={{ color: "#564a5e", fontSize: 11 }}>
                        <span style={{ opacity: 0.6 }}>音</span> {k.on} &nbsp; <span style={{ opacity: 0.6 }}>訓</span> {k.kun}
                      </div>
                      {k.examples && k.examples.length > 0 && (
                        <div style={{ marginTop: 8, borderTop: "1px solid #d4c8ce", paddingTop: 8, width: "100%" }}>
                          {k.examples.map((ex, j) => (
                            <div key={j} style={{ fontSize: 11, color: "#564a5e", marginBottom: 2 }}>
                              <span style={{ fontFamily: "serif" }}>{ex.word}</span>
                              <span style={{ opacity: 0.6 }}> ({ex.reading})</span> — {ex.meaning}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div style={{ color: "#c4a0b8", fontSize: 11, marginTop: 4 }}>tap to reveal</div>
                  )}
                </div>
              );
            })}
          </div>
          <button onClick={nextPhase} style={{ width: "100%", marginTop: 14, background: `linear-gradient(135deg,${cc},${cc}aa)`, color: "#faf7f5", border: "none", borderRadius: 9, padding: "12px 0", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>
            Next →
          </button>
        </div>
      )}

      {/* GRAMMAR PHASE */}
      {phase === "grammar" && grammar.length > 0 && (
        <div>
          {grammar.map((g, i) => (
            <div key={i} className="card-hover" style={{ background: "#ffffff", border: "1px solid #d4c8ce", borderRadius: 12, padding: 18, marginBottom: 12 }}>
              <div style={{ color: cc, fontWeight: 800, fontSize: 16, fontFamily: "serif", marginBottom: 6 }}>{g.p || g.pattern}</div>
              <div style={{ color: "#6e6378", fontSize: 13, marginBottom: 12, lineHeight: 1.6 }}>{g.note || g.explanation}</div>
              <div style={{ borderTop: "1px solid #d4c8ce", paddingTop: 12 }}>
                {(g.ex ? [{ jp: g.ex, tr: g.tr || "" }] : (g.examples || []).map((e) => ({ jp: e.jp || e.japanese || "", tr: e.tr || e.english || "" }))).map((ex, j) => (
                  <div key={j} style={{ marginBottom: 8 }}>
                    <div style={{ color: "#1a1523", fontFamily: "serif", fontSize: 14 }}>{ex.jp}</div>
                    <div style={{ color: "#7a6e84", fontSize: 12 }}>{ex.tr}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button onClick={nextPhase} style={{ width: "100%", background: `linear-gradient(135deg,${cc},${cc}aa)`, color: "#faf7f5", border: "none", borderRadius: 9, padding: "12px 0", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Next →
          </button>
        </div>
      )}

      {/* READING PHASE */}
      {phase === "reading" && reading.length > 0 && (
        <div>
          {reading.map((r, i) => {
            const showTrans = readingShowTrans.has(i);
            return (
              <div key={i} className="card-hover" style={{ background: "#ffffff", border: "1px solid #d4c8ce", borderRadius: 12, padding: 20, marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div style={{ color: cc, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Reading Passage {reading.length > 1 ? i + 1 : ""}</div>
                    <div style={{ color: "#1a1523", fontWeight: 800, fontSize: 16, fontFamily: "serif", marginTop: 2 }}>{r.title}</div>
                    <div style={{ color: "#7a6e84", fontSize: 12 }}>{r.titleEn}</div>
                  </div>
                  <button
                    onClick={() => {
                      const s = new Set(readingShowTrans);
                      showTrans ? s.delete(i) : s.add(i);
                      setReadingShowTrans(s);
                    }}
                    style={{
                      background: showTrans ? `${cc}15` : "#f8f5f3",
                      color: cc, border: `1px solid ${cc}33`,
                      borderRadius: 6, padding: "4px 10px", fontSize: 10,
                      fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                      flexShrink: 0,
                    }}
                  >
                    {showTrans ? "Hide EN" : "Show EN"}
                  </button>
                </div>
                <div style={{
                  background: "#f8f5f3", borderRadius: 10, padding: 16,
                  fontFamily: "serif", fontSize: 15, color: "#1a1523",
                  lineHeight: 2, letterSpacing: 0.3, marginBottom: 10,
                  whiteSpace: "pre-wrap",
                }}>
                  {r.text}
                </div>
                {showTrans && (
                  <div style={{
                    background: "#f8f0ff", borderRadius: 10, padding: 16,
                    fontSize: 13, color: "#5a3670", lineHeight: 1.8,
                    borderLeft: `3px solid ${cc}44`, whiteSpace: "pre-wrap",
                  }}>
                    {r.translation}
                  </div>
                )}
                {r.notes && r.notes.length > 0 && (
                  <div style={{ marginTop: 12 }}>
                    {r.notes.map((n, j) => (
                      <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 4 }}>
                        <span style={{ color: cc, fontSize: 10, flexShrink: 0, marginTop: 2 }}>📌</span>
                        <span style={{ color: "#564a5e", fontSize: 12 }}>{n}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <button onClick={nextPhase} style={{ width: "100%", background: `linear-gradient(135deg,${cc},${cc}aa)`, color: "#faf7f5", border: "none", borderRadius: 9, padding: "12px 0", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Next →
          </button>
        </div>
      )}

      {/* DIALOGUE PHASE */}
      {phase === "dialogue" && dialogue.length > 0 && (
        <div>
          <div style={{ background: "#f8f5f3", border: "1px solid #d4c8ce", borderRadius: 12, padding: 18, marginBottom: 16 }}>
            {dialogue.map((d, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: i % 2 === 0 ? `${cc}22` : "#f5e6ff", border: `1px solid ${i % 2 === 0 ? cc + "44" : "#1e1a50"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0, marginTop: 2 }}>
                  {i % 2 === 0 ? "🙋" : "👤"}
                </div>
                <div>
                  <div style={{ color: "#1a1523", fontFamily: "serif", fontSize: 14, marginBottom: 3 }}>{d.jp}</div>
                  <div style={{ color: "#7a6e84", fontSize: 12 }}>{d.tr}</div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={nextPhase} style={{ width: "100%", background: `linear-gradient(135deg,${cc},${cc}aa)`, color: "#faf7f5", border: "none", borderRadius: 9, padding: "12px 0", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Next →
          </button>
        </div>
      )}

      {/* TIPS PHASE */}
      {phase === "tips" && tips.length > 0 && (
        <div>
          {tips.map((t, i) => (
            <div key={i} className="card-hover" style={{ background: "#ffffff", border: "1px solid #d4c8ce", borderRadius: 9, padding: "12px 16px", marginBottom: 8, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color: cc, fontSize: 16, flexShrink: 0 }}>💡</span>
              <span style={{ color: "#564a5e", fontSize: 13 }}>{t}</span>
            </div>
          ))}
          <button onClick={nextPhase} style={{ width: "100%", marginTop: 12, background: `linear-gradient(135deg,${cc},${cc}aa)`, color: "#faf7f5", border: "none", borderRadius: 9, padding: "12px 0", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Start Quiz →
          </button>
        </div>
      )}

      {/* QUIZ PHASE */}
      {phase === "quiz" && !quiz.done && curQ && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ color: "#7a6e84", fontSize: 12 }}>{quiz.q + 1} / {quizData.length}</span>
            <div style={{ display: "flex", gap: 3 }}>
              {quizData.map((_, i) => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: i < quiz.q ? "#059669" : i === quiz.q ? cc : "#d4c8ce" }} />
              ))}
            </div>
            {gs.owned.has("dict") && quiz.selected === null && !quiz.hint && (
              <button onClick={() => setQuiz((q) => ({ ...q, hint: true }))} style={{ color: cc, background: "none", border: `1px solid ${cc}44`, borderRadius: 5, padding: "3px 10px", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                💡 Hint
              </button>
            )}
          </div>
          <div style={{ background: "#ffffff", border: "1px solid #d4c8ce", borderRadius: 12, padding: 20, marginBottom: 14 }}>
            <div style={{ color: "#1a1523", fontWeight: 700, fontSize: 16 }}>{curQ.q}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {curQ.opts.map((opt, i) => {
              let bg = "#ffffff", border = "#d4c8ce", col = "#564a5e";
              if (quiz.selected !== null) {
                if (i === curQ.a) { bg = `${cc}15`; border = cc; col = cc; }
                else if (i === quiz.selected && i !== curQ.a) { bg = "rgba(232,90,90,0.08)"; border = "#e85a5a"; col = "#e85a5a"; }
              }
              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  className="card-hover"
                  style={{
                    background: bg, border: `1px solid ${border}`,
                    borderRadius: 9, padding: "13px 16px", textAlign: "left",
                    color: col, cursor: quiz.selected !== null ? "default" : "pointer",
                    fontSize: 14, fontFamily: "inherit", transition: "all 0.15s",
                  }}
                >
                  <span style={{ marginRight: 10, opacity: 0.4, fontWeight: 700 }}>{"ABCD"[i]}.</span>{opt}
                </button>
              );
            })}
          </div>
          {quiz.selected !== null && (
            <button onClick={nextQ} className="btn-glow" style={{ width: "100%", background: `linear-gradient(135deg,${cc},${cc}bb)`, color: "#faf7f5", border: "none", borderRadius: 9, padding: "13px 0", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>
              {quiz.q + 1 >= quizData.length ? "🎉 Finish" : "Next →"}
            </button>
          )}
        </div>
      )}

      {phase === "quiz" && quiz.done && (
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <div style={{ fontSize: 60, marginBottom: 12 }}>
            {quiz.answers.filter(Boolean).length === quiz.answers.length ? "🏆" : quiz.answers.filter(Boolean).length >= quiz.answers.length / 2 ? "⭐" : "📖"}
          </div>
          <div style={{ color: "#1a1523", fontSize: 28, fontWeight: 900, marginBottom: 6 }}>
            {quiz.answers.filter(Boolean).length}/{quiz.answers.length}
          </div>
          <div style={{ color: "#6e6378", fontSize: 14, marginBottom: 12 }}>
            {quiz.answers.filter(Boolean).length === quiz.answers.length ? "Perfect! 完璧！" : quiz.answers.filter(Boolean).length >= quiz.answers.length / 2 ? "Good work! Keep going." : "Review the lesson and try again."}
          </div>
          {quiz.answers.filter(Boolean).length === quiz.answers.length && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg, rgba(194,37,92,0.08), rgba(126,55,148,0.08))",
              border: "1px solid rgba(194,37,92,0.2)", borderRadius: 10,
              padding: "8px 16px", marginBottom: 16,
            }}>
              <span style={{ fontSize: 18 }}>⛩️</span>
              <span style={{ color: "#c2255c", fontSize: 13, fontWeight: 800 }}>Temple +5% HP restored!</span>
            </div>
          )}
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={() => { setQuiz({ q: 0, answers: [], selected: null, done: false, hint: false }); setPhase(phases[0] || "vocab"); }} style={{ background: "#ffffff", color: "#1a1523", border: "1px solid #c4a8b8", borderRadius: 8, padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              🔁 Retry
            </button>
            <button onClick={() => setView("lessons")} style={{ background: `linear-gradient(135deg,${cc},${cc}bb)`, color: "#faf7f5", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Back to Hall
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

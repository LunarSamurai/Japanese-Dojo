"use client";
import { useState } from "react";
import type { BookId } from "../types";

interface PlacementTestProps {
  onFinish: (startBook: BookId) => void;
  onSkip: () => void;
}

interface PQ {
  q: string;
  opts: string[];
  a: number;
  level: number; // 0=G1, 1=G2, 2=Conv, 3=Q1, 4=Q2, 5=Tobira, 6=Advanced
}

const QUESTIONS: PQ[] = [
  // Level 0 — Genki I (very basic)
  { q: "How do you say \"I am a student\"?", opts: ["私は学生です", "私は先生です", "あなたは学生です", "これは学生です"], a: 0, level: 0 },
  { q: "What does 「ありがとう」 mean?", opts: ["Hello", "Goodbye", "Thank you", "Sorry"], a: 2, level: 0 },
  { q: "Which particle marks the topic of a sentence?", opts: ["を", "は", "に", "で"], a: 1, level: 0 },

  // Level 1 — Genki II (te-form, intermediate basics)
  { q: "Choose the correct te-form of 「食べる」", opts: ["食べて", "食べって", "食べた", "食べり"], a: 0, level: 1 },
  { q: "「〜たことがあります」 expresses what?", opts: ["Future plan", "Past experience", "Ongoing action", "Obligation"], a: 1, level: 1 },
  { q: "「窓が開いています」 means:", opts: ["I opened the window", "The window is open (state)", "Open the window", "Please open the window"], a: 1, level: 1 },

  // Level 2 — Conversation / upper beginner
  { q: "The most natural way to politely decline food at a party:", opts: ["いらない", "けっこうです", "だめ", "食べない"], a: 1, level: 2 },
  { q: "「お世話になっております」 is used when:", opts: ["Apologizing", "Greeting a business contact", "Saying goodbye to family", "Thanking a friend"], a: 1, level: 2 },

  // Level 3 — Quartet I (N3)
  { q: "Choose the correct: 「日本に来てから、もう3年___。」", opts: ["います", "になります", "です", "あります"], a: 1, level: 3 },
  { q: "「〜によると」 means:", opts: ["Because of", "According to", "In order to", "Instead of"], a: 1, level: 3 },
  { q: "「勉強すればするほど___。」 — best completion:", opts: ["つかれます", "楽しくなります", "食べます", "行きます"], a: 1, level: 3 },

  // Level 4 — Quartet II (N3→N2)
  { q: "「彼は疲れているにもかかわらず、働き続けた。」 means:", opts: ["Because he was tired, he kept working", "Despite being tired, he kept working", "When tired, he worked", "If tired, he worked"], a: 1, level: 4 },
  { q: "Choose the correct usage of 「〜どころか」:", opts: ["勉強どころか、遊んでばかりいる", "勉強どころか行きます", "勉強どころかです", "勉強どころかない"], a: 0, level: 4 },

  // Level 5 — Tobira (N2)
  { q: "「〜を通じて」 most naturally means:", opts: ["In spite of", "Through / by means of", "Instead of", "As soon as"], a: 1, level: 5 },
  { q: "「経済の発展に伴って、環境問題も深刻になってきた。」 — 「〜に伴って」 means:", opts: ["In addition to", "Along with / as", "Before", "Without"], a: 1, level: 5 },

  // Level 6 — Advanced (N1)
  { q: "「〜を余儀なくされる」 expresses:", opts: ["Voluntary action", "Being forced / compelled", "Possibility", "Prohibition"], a: 1, level: 6 },
  { q: "「彼の努力なくしては成功はあり得なかった。」 — 「〜なくしては」 means:", opts: ["Without ~", "Because of ~", "Instead of ~", "In spite of ~"], a: 0, level: 6 },
];

const BOOK_FOR_LEVEL: BookId[] = ["genki1", "genki2", "conv", "quartet1", "quartet2", "tobira", "advanced"];
const BOOK_NAMES: Record<BookId, string> = {
  genki1: "Genki I", genki2: "Genki II", conv: "Conversation Lab",
  quartet1: "Quartet I", quartet2: "Quartet II", tobira: "Tobira", advanced: "Advanced Mastery",
};

export function PlacementTest({ onFinish, onSkip }: PlacementTestProps) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[idx];
  const progress = ((idx + (done ? 1 : 0)) / QUESTIONS.length) * 100;

  const submit = () => {
    if (selected === null) return;
    const correct = selected === q.a;
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);
    setSelected(null);
    if (idx + 1 >= QUESTIONS.length) {
      setDone(true);
    } else {
      setIdx(idx + 1);
    }
  };

  // Calculate highest level where the user got both/all questions right
  const computeStart = (): { book: BookId; level: number; score: number } => {
    const byLevel: Record<number, { correct: number; total: number }> = {};
    QUESTIONS.forEach((question, i) => {
      if (!byLevel[question.level]) byLevel[question.level] = { correct: 0, total: 0 };
      byLevel[question.level].total++;
      if (answers[i]) byLevel[question.level].correct++;
    });
    // Start at the lowest level where they missed something (or didn't get majority)
    let startLevel = 0;
    for (let lv = 0; lv <= 6; lv++) {
      const s = byLevel[lv];
      if (!s) continue;
      const rate = s.correct / s.total;
      if (rate >= 0.67) {
        startLevel = lv + 1; // they passed this level, try next
      } else {
        break;
      }
    }
    if (startLevel > 6) startLevel = 6;
    const score = Math.round((answers.filter(Boolean).length / answers.length) * 100);
    return { book: BOOK_FOR_LEVEL[startLevel], level: startLevel, score };
  };

  if (done) {
    const { book, level, score } = computeStart();
    const levelLabels = ["N5 Beginner", "N5 Late Beginner", "N4 Upper Beginner", "N3 Pre-Intermediate", "N3/N2 Intermediate", "N2 Upper Intermediate", "N1 Advanced"];
    return (
      <div style={{ maxWidth: 640, margin: "40px auto", background: "white", borderRadius: 20, padding: 40, border: "1px solid #e8e0e4", boxShadow: "0 10px 40px rgba(214,51,108,0.08)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>🎌</div>
          <div style={{ color: "#8a7e92", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Placement Complete</div>
          <div style={{ color: "#1a1523", fontSize: 30, fontWeight: 900, fontFamily: "serif", marginBottom: 6 }}>Your Starting Point</div>
          <div style={{ color: "#564a5e", fontSize: 13, marginBottom: 24 }}>Score: {score}% · {answers.filter(Boolean).length} / {QUESTIONS.length} correct</div>
          <div style={{ background: "linear-gradient(135deg,#f5f0f2,#f5eeff)", borderRadius: 14, padding: 24, marginBottom: 24, border: "1px solid #e8e0e4" }}>
            <div style={{ color: "#8a7e92", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Recommended Start</div>
            <div style={{ color: "#c2255c", fontSize: 26, fontWeight: 900, fontFamily: "serif" }}>{BOOK_NAMES[book]}</div>
            <div style={{ color: "#564a5e", fontSize: 13, marginTop: 4 }}>{levelLabels[level]}</div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button onClick={() => onFinish(book)} className="btn-glow" style={{ background: "linear-gradient(135deg,#d6366c,#9b59b6)", color: "white", border: "none", padding: "14px 28px", borderRadius: 12, fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
              Start at {BOOK_NAMES[book]} →
            </button>
            <button onClick={() => onFinish("genki1")} style={{ background: "white", color: "#564a5e", border: "1.5px solid #e8e0e4", padding: "14px 22px", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Start from the beginning
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 680, margin: "40px auto", background: "white", borderRadius: 20, padding: 36, border: "1px solid #e8e0e4", boxShadow: "0 10px 40px rgba(214,51,108,0.08)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ color: "#8a7e92", fontSize: 11, letterSpacing: 3, textTransform: "uppercase" }}>Placement Test</div>
        <button onClick={onSkip} style={{ background: "transparent", border: "none", color: "#8a7e92", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Skip →</button>
      </div>
      <div style={{ color: "#1a1523", fontSize: 22, fontWeight: 900, fontFamily: "serif", marginBottom: 4 }}>Find Your Starting Point</div>
      <div style={{ color: "#564a5e", fontSize: 13, marginBottom: 20 }}>Answer {QUESTIONS.length} questions — difficulty ramps from N5 to N1. It&apos;s fine to guess or skip.</div>

      <div style={{ background: "#e8e0e4", borderRadius: 999, height: 6, marginBottom: 24 }}>
        <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg,#d6366c,#9b59b6)", borderRadius: 999, transition: "width 0.4s" }} />
      </div>

      <div style={{ color: "#8a7e92", fontSize: 11, marginBottom: 8 }}>Question {idx + 1} of {QUESTIONS.length}</div>
      <div style={{ color: "#1a1523", fontSize: 18, fontWeight: 700, marginBottom: 20, fontFamily: "serif", lineHeight: 1.5 }}>{q.q}</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {q.opts.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            style={{
              background: selected === i ? "#f5f0f2" : "white",
              border: `2px solid ${selected === i ? "#c2255c" : "#e8e0e4"}`,
              borderRadius: 12, padding: "14px 18px", textAlign: "left",
              color: "#1a1523", fontSize: 14, fontWeight: 600, cursor: "pointer",
              fontFamily: "inherit", transition: "all 0.15s",
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        onClick={submit}
        disabled={selected === null}
        style={{
          width: "100%", padding: "14px", borderRadius: 12, border: "none",
          background: selected === null ? "#f0e0ea" : "linear-gradient(135deg,#d6366c,#9b59b6)",
          color: "white", fontSize: 14, fontWeight: 800,
          cursor: selected === null ? "not-allowed" : "pointer", fontFamily: "inherit",
        }}
      >
        {idx + 1 >= QUESTIONS.length ? "See Results" : "Next Question"}
      </button>
    </div>
  );
}

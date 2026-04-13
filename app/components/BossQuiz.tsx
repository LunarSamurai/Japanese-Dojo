"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import type { GameState, SRSCard } from "../types";

interface BossQuizProps {
  waveNumber: number;
  gs: GameState;
  templeHp: number;
  templeMaxHp: number;
  onComplete: (result: {
    won: boolean;
    omamoriEarned: number;
    templeHpRemaining: number;
  }) => void;
}

interface BossTierConfig {
  tier: number;
  name: string;
  emoji: string;
  hp: number;
  reward: number;
}

interface QuizQuestion {
  front: string;
  correctAnswer: string;
  options: string[];
}

const FALLBACK_HIRAGANA: { front: string; back: string }[] = [
  { front: "あ", back: "a" },
  { front: "い", back: "i" },
  { front: "う", back: "u" },
  { front: "え", back: "e" },
  { front: "お", back: "o" },
  { front: "か", back: "ka" },
  { front: "き", back: "ki" },
  { front: "く", back: "ku" },
  { front: "け", back: "ke" },
  { front: "こ", back: "ko" },
  { front: "さ", back: "sa" },
  { front: "し", back: "shi" },
  { front: "す", back: "su" },
  { front: "せ", back: "se" },
  { front: "そ", back: "so" },
  { front: "た", back: "ta" },
  { front: "ち", back: "chi" },
  { front: "つ", back: "tsu" },
  { front: "て", back: "te" },
  { front: "と", back: "to" },
  { front: "な", back: "na" },
  { front: "に", back: "ni" },
  { front: "ぬ", back: "nu" },
  { front: "ね", back: "ne" },
  { front: "の", back: "no" },
  { front: "は", back: "ha" },
  { front: "ひ", back: "hi" },
  { front: "ふ", back: "fu" },
  { front: "へ", back: "he" },
  { front: "ほ", back: "ho" },
  { front: "ま", back: "ma" },
  { front: "み", back: "mi" },
  { front: "む", back: "mu" },
  { front: "め", back: "me" },
  { front: "も", back: "mo" },
];

function getBossTier(waveNumber: number): BossTierConfig {
  if (waveNumber >= 200) {
    return { tier: 5, name: "Celestial Serpent", emoji: "🐉", hp: 600, reward: 25 };
  }
  if (waveNumber >= 100) {
    return { tier: 4, name: "Dragon Lord", emoji: "🐉", hp: 500, reward: 15 };
  }
  if (waveNumber >= 50) {
    return { tier: 3, name: "Thunder God", emoji: "⚡", hp: 400, reward: 10 };
  }
  if (waveNumber >= 20) {
    return { tier: 2, name: "Tengu General", emoji: "👺", hp: 300, reward: 5 };
  }
  return { tier: 1, name: "Oni Captain", emoji: "👹", hp: 100, reward: 3 };
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestions(
  srsCards: Record<string, SRSCard>,
  count: number
): QuizQuestion[] {
  const reviewed = Object.values(srsCards).filter((c) => c.repetitions > 0);
  const allCards = Object.values(srsCards);

  // Use reviewed cards if enough, otherwise use all SRS cards
  let pool = reviewed.length >= count ? reviewed : allCards;

  // Fallback to hiragana if not enough SRS cards
  if (pool.length < 4) {
    const hiraganaPool = shuffle(FALLBACK_HIRAGANA);
    const questions: QuizQuestion[] = [];
    for (let i = 0; i < count && i < hiraganaPool.length; i++) {
      const correct = hiraganaPool[i];
      const wrongs = shuffle(
        hiraganaPool.filter((h) => h.front !== correct.front)
      )
        .slice(0, 3)
        .map((h) => h.back);
      questions.push({
        front: correct.front,
        correctAnswer: correct.back,
        options: shuffle([correct.back, ...wrongs]),
      });
    }
    return questions;
  }

  const picked = shuffle(pool).slice(0, count);
  return picked.map((card) => {
    const wrongPool = pool.filter((c) => c.id !== card.id);
    const wrongs = shuffle(wrongPool)
      .slice(0, 3)
      .map((c) => c.back);
    // Ensure no duplicates in options
    const uniqueOptions = new Set([card.back, ...wrongs]);
    while (uniqueOptions.size < 4 && wrongPool.length > 0) {
      const extra = wrongPool[Math.floor(Math.random() * wrongPool.length)];
      uniqueOptions.add(extra.back);
    }
    // If still not enough, pad with hiragana fallbacks
    let idx = 0;
    while (uniqueOptions.size < 4 && idx < FALLBACK_HIRAGANA.length) {
      uniqueOptions.add(FALLBACK_HIRAGANA[idx].back);
      idx++;
    }
    const opts = Array.from(uniqueOptions);
    return {
      front: card.front,
      correctAnswer: card.back,
      options: shuffle(opts.slice(0, 4)),
    };
  });
}

export default function BossQuiz({
  waveNumber,
  gs,
  templeHp,
  templeMaxHp,
  onComplete,
}: BossQuizProps) {
  const boss = useMemo(() => getBossTier(waveNumber), [waveNumber]);
  const questions = useMemo(
    () => generateQuestions(gs.srsCards, 8),
    [gs.srsCards]
  );

  const [introPhase, setIntroPhase] = useState<"dark" | "text" | "approach" | "ready" | "done">("dark");
  const [currentQ, setCurrentQ] = useState(0);
  const [bossHp, setBossHp] = useState(boss.hp);
  const [currentTempleHp, setCurrentTempleHp] = useState(templeHp);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [shakeScreen, setShakeScreen] = useState(false);
  const [bossDamageFlash, setBossDamageFlash] = useState(false);
  const [finished, setFinished] = useState(false);
  const [resultMsg, setResultMsg] = useState("");

  // Boss intro animation timeline
  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase("text"), 400);
    const t2 = setTimeout(() => setIntroPhase("approach"), 1800);
    const t3 = setTimeout(() => setIntroPhase("ready"), 3500);
    const t4 = setTimeout(() => setIntroPhase("done"), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const bossMaxHp = boss.hp;
  const bossHpPct = Math.max(0, (bossHp / bossMaxHp) * 100);
  const templeHpPct = Math.max(0, (currentTempleHp / templeMaxHp) * 100);

  const handleAnswer = useCallback(
    (optionIdx: number) => {
      if (selected !== null || finished) return;
      setSelected(optionIdx);

      const question = questions[currentQ];
      if (!question) return;

      const isCorrect = question.options[optionIdx] === question.correctAnswer;

      if (isCorrect) {
        setFeedback("correct");
        setBossDamageFlash(true);
        const damage = Math.ceil(bossMaxHp * 0.25);
        const newBossHp = Math.max(0, bossHp - damage);
        setBossHp(newBossHp);

        setTimeout(() => setBossDamageFlash(false), 400);

        if (newBossHp <= 0) {
          // Boss defeated
          setTimeout(() => {
            setFinished(true);
            setResultMsg("Boss Defeated!");
            setTimeout(() => {
              onComplete({
                won: true,
                omamoriEarned: boss.reward,
                templeHpRemaining: currentTempleHp,
              });
            }, 1500);
          }, 800);
          return;
        }
      } else {
        setFeedback("wrong");
        setShakeScreen(true);
        const damage = Math.ceil(templeMaxHp * 0.15);
        const newTempleHp = Math.max(0, currentTempleHp - damage);
        setCurrentTempleHp(newTempleHp);

        setTimeout(() => setShakeScreen(false), 500);

        if (newTempleHp <= 0) {
          // Temple destroyed
          setTimeout(() => {
            setFinished(true);
            setResultMsg("Boss Escaped!");
            setTimeout(() => {
              onComplete({
                won: false,
                omamoriEarned: 0,
                templeHpRemaining: templeMaxHp,
              });
            }, 1500);
          }, 800);
          return;
        }
      }

      // Move to next question
      setTimeout(() => {
        setSelected(null);
        setFeedback(null);
        if (currentQ + 1 < questions.length) {
          setCurrentQ(currentQ + 1);
        } else {
          // Ran out of questions but boss still alive
          setFinished(true);
          setResultMsg("Boss Escaped!");
          setTimeout(() => {
            onComplete({
              won: false,
              omamoriEarned: 0,
              templeHpRemaining: currentTempleHp,
            });
          }, 1500);
        }
      }, 1200);
    },
    [
      selected,
      finished,
      questions,
      currentQ,
      bossHp,
      bossMaxHp,
      currentTempleHp,
      templeMaxHp,
      boss.reward,
      onComplete,
    ]
  );

  const question = questions[currentQ];

  // ── BOSS INTRO CINEMATIC ──
  if (introPhase !== "done") {
    return (
      <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "radial-gradient(ellipse at 50% 40%, #1a0515 0%, #0a0208 60%, #000 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        fontFamily: "inherit", color: "#fff", overflow: "hidden",
      }}>
        <style>{`
          @keyframes boss-intro-text {
            0% { opacity: 0; letter-spacing: 20px; transform: scale(0.8); }
            40% { opacity: 1; letter-spacing: 8px; transform: scale(1.05); }
            100% { opacity: 1; letter-spacing: 4px; transform: scale(1); }
          }
          @keyframes boss-intro-sub {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 0.7; transform: translateY(0); }
          }
          @keyframes boss-approach {
            0% { transform: translateY(60vh) scale(0.3); opacity: 0; }
            60% { transform: translateY(0) scale(1.2); opacity: 1; }
            80% { transform: translateY(-10px) scale(1.05); }
            100% { transform: translateY(0) scale(1); }
          }
          @keyframes boss-aura {
            0%, 100% { box-shadow: 0 0 40px rgba(239,68,68,0.2), 0 0 80px rgba(239,68,68,0.1); }
            50% { box-shadow: 0 0 60px rgba(239,68,68,0.4), 0 0 120px rgba(239,68,68,0.2); }
          }
          @keyframes gate-silhouette {
            0% { opacity: 0; }
            100% { opacity: 0.15; }
          }
          @keyframes screen-flash {
            0% { opacity: 0; }
            50% { opacity: 0.3; }
            100% { opacity: 0; }
          }
        `}</style>

        {/* Torii gate silhouette in background */}
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          animation: "gate-silhouette 1.5s ease-out forwards", opacity: 0,
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 200, height: 12, background: "rgba(194,37,92,0.15)", borderRadius: 4 }} />
            <div style={{ width: 170, height: 6, background: "rgba(194,37,92,0.1)", marginTop: 14 }} />
            <div style={{ display: "flex", gap: 140 }}>
              <div style={{ width: 10, height: 100, background: "rgba(194,37,92,0.1)" }} />
              <div style={{ width: 10, height: 100, background: "rgba(194,37,92,0.1)" }} />
            </div>
          </div>
        </div>

        {/* Red flash on approach */}
        {introPhase === "approach" && (
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 50% 50%, rgba(239,68,68,0.15) 0%, transparent 70%)",
            animation: "screen-flash 0.8s ease-out forwards",
          }} />
        )}

        {/* Warning text */}
        {(introPhase === "text" || introPhase === "approach" || introPhase === "ready") && (
          <div style={{
            textAlign: "center", position: "relative", zIndex: 5,
            marginBottom: introPhase === "approach" || introPhase === "ready" ? 20 : 0,
          }}>
            <div style={{
              color: "#ef4444", fontSize: 14, fontWeight: 800,
              letterSpacing: 6, textTransform: "uppercase",
              animation: "boss-intro-text 1.2s ease-out forwards",
              textShadow: "0 0 30px rgba(239,68,68,0.5)",
              marginBottom: 8,
            }}>
              A Powerful Foe Appears
            </div>
            <div style={{
              animation: "boss-intro-sub 0.8s ease-out 0.5s forwards", opacity: 0,
              color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: 3,
            }}>
              強敵出現
            </div>
          </div>
        )}

        {/* Boss approaching from below through the gate */}
        {(introPhase === "approach" || introPhase === "ready") && (
          <div style={{
            animation: "boss-approach 1.5s cubic-bezier(0.16,1,0.3,1) forwards",
            textAlign: "center", position: "relative", zIndex: 5,
          }}>
            <div style={{
              fontSize: 100, lineHeight: 1,
              animation: introPhase === "ready" ? "boss-aura 1.5s ease-in-out infinite" : "none",
              borderRadius: "50%", padding: 20,
            }}>
              {boss.emoji}
            </div>
            <div style={{
              color: "#ef4444", fontSize: 24, fontWeight: 900, fontFamily: "serif",
              marginTop: 12, textShadow: "0 0 20px rgba(239,68,68,0.4)",
            }}>
              {boss.name}
            </div>
            <div style={{
              color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 6,
            }}>
              Wave {waveNumber} · {boss.hp} HP · Reward: {boss.reward} 🏮
            </div>
          </div>
        )}

        {/* Dramatic red line at bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(90deg, transparent, #ef4444, transparent)",
          opacity: introPhase === "dark" ? 0 : 0.6,
          transition: "opacity 0.5s",
        }} />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.92)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "inherit",
        color: "#fff",
        animation: shakeScreen ? "bq-shake 0.4s ease" : undefined,
      }}
    >
      <style>{`
        @keyframes bq-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @keyframes bq-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes bq-flash {
          0% { filter: brightness(1); }
          50% { filter: brightness(3) saturate(0); }
          100% { filter: brightness(1); }
        }
        @keyframes bq-slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bq-resultIn {
          0% { opacity: 0; transform: scale(0.5); }
          60% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes bq-correctPulse {
          0% { box-shadow: 0 0 0 0 rgba(76,175,80,0.6); }
          70% { box-shadow: 0 0 0 12px rgba(76,175,80,0); }
          100% { box-shadow: 0 0 0 0 rgba(76,175,80,0); }
        }
        @keyframes bq-wrongShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
      `}</style>

      {/* Temple HP bar (top) */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          right: 20,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 20 }}>&#x26E9;&#xFE0F;</span>
        <div
          style={{
            flex: 1,
            height: 12,
            background: "rgba(255,255,255,0.1)",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${templeHpPct}%`,
              height: "100%",
              background:
                templeHpPct > 50
                  ? "linear-gradient(90deg, #4caf50, #66bb6a)"
                  : templeHpPct > 25
                  ? "linear-gradient(90deg, #ff9800, #ffb74d)"
                  : "linear-gradient(90deg, #f44336, #ef5350)",
              borderRadius: 6,
              transition: "width 0.5s ease",
            }}
          />
        </div>
        <span style={{ fontSize: 12, opacity: 0.7 }}>
          {currentTempleHp}/{templeMaxHp}
        </span>
      </div>

      {/* Boss section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        {/* Boss tier label */}
        <div
          style={{
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: 2,
            color: boss.tier === 3 ? "#ff6b6b" : boss.tier === 2 ? "#ffa726" : "#ab47bc",
            marginBottom: 8,
          }}
        >
          Tier {boss.tier} Boss - Wave {waveNumber}
        </div>

        {/* Boss emoji */}
        <div
          style={{
            fontSize: 88,
            lineHeight: 1,
            animation: bossDamageFlash
              ? "bq-flash 0.4s ease"
              : "bq-pulse 2s ease-in-out infinite",
            marginBottom: 8,
          }}
        >
          {boss.emoji}
        </div>

        {/* Boss name */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 12,
            textShadow: "0 0 20px rgba(255,100,100,0.4)",
          }}
        >
          {boss.name}
        </div>

        {/* Boss HP bar */}
        <div style={{ width: 280, marginBottom: 4 }}>
          <div
            style={{
              height: 16,
              background: "rgba(255,255,255,0.08)",
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <div
              style={{
                width: `${bossHpPct}%`,
                height: "100%",
                background:
                  bossHpPct > 50
                    ? "linear-gradient(90deg, #e53935, #ef5350)"
                    : bossHpPct > 25
                    ? "linear-gradient(90deg, #ff6f00, #ffa000)"
                    : "linear-gradient(90deg, #d50000, #ff1744)",
                borderRadius: 8,
                transition: "width 0.5s ease",
                boxShadow:
                  bossHpPct > 0 ? "0 0 8px rgba(255,50,50,0.5)" : "none",
              }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: 11,
              opacity: 0.6,
              marginTop: 3,
            }}
          >
            {bossHp}/{bossMaxHp} HP
          </div>
        </div>
      </div>

      {/* Result overlay */}
      {finished && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.8)",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              animation: "bq-resultIn 0.6s ease",
              color: resultMsg === "Boss Defeated!" ? "#4caf50" : "#f44336",
              textShadow:
                resultMsg === "Boss Defeated!"
                  ? "0 0 30px rgba(76,175,80,0.6)"
                  : "0 0 30px rgba(244,67,54,0.6)",
            }}
          >
            {resultMsg}
          </div>
          {resultMsg === "Boss Defeated!" && (
            <div
              style={{
                fontSize: 18,
                marginTop: 12,
                color: "#ffd54f",
                animation: "bq-slideUp 0.5s ease 0.3s both",
              }}
            >
              +{boss.reward} Omamori earned!
            </div>
          )}
        </div>
      )}

      {/* Question card */}
      {!finished && question && (
        <div
          style={{
            animation: "bq-slideUp 0.3s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: 480,
            padding: "0 20px",
          }}
        >
          {/* Feedback banner */}
          {feedback && (
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 12,
                color: feedback === "correct" ? "#4caf50" : "#f44336",
                animation:
                  feedback === "correct"
                    ? "bq-pulse 0.4s ease"
                    : "bq-wrongShake 0.3s ease",
              }}
            >
              {feedback === "correct" ? "Correct! Boss takes damage!" : "Wrong! Temple takes damage!"}
            </div>
          )}

          {/* Question number */}
          <div
            style={{
              fontSize: 12,
              opacity: 0.5,
              marginBottom: 8,
            }}
          >
            Question {currentQ + 1} / {questions.length}
          </div>

          {/* Front (Japanese) */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              marginBottom: 24,
              padding: "16px 32px",
              background: "rgba(255,255,255,0.06)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)",
              textAlign: "center",
              minWidth: 200,
            }}
          >
            {question.front}
          </div>

          {/* 2x2 answer grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              width: "100%",
            }}
          >
            {question.options.map((opt, idx) => {
              const isSelected = selected === idx;
              const isCorrect = opt === question.correctAnswer;
              let bg = "rgba(255,255,255,0.08)";
              let border = "1px solid rgba(255,255,255,0.15)";

              if (selected !== null) {
                if (isCorrect) {
                  bg = "rgba(76,175,80,0.3)";
                  border = "1px solid #4caf50";
                } else if (isSelected && !isCorrect) {
                  bg = "rgba(244,67,54,0.3)";
                  border = "1px solid #f44336";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={selected !== null}
                  style={{
                    background: bg,
                    border,
                    borderRadius: 10,
                    padding: "14px 10px",
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 500,
                    fontFamily: "inherit",
                    cursor: selected !== null ? "default" : "pointer",
                    transition: "all 0.2s ease",
                    opacity: selected !== null && !isCorrect && !isSelected ? 0.4 : 1,
                    animation:
                      isSelected && isCorrect
                        ? "bq-correctPulse 0.6s ease"
                        : isSelected && !isCorrect
                        ? "bq-wrongShake 0.3s ease"
                        : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (selected === null) {
                      (e.target as HTMLButtonElement).style.background =
                        "rgba(255,255,255,0.15)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selected === null) {
                      (e.target as HTMLButtonElement).style.background = bg;
                    }
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

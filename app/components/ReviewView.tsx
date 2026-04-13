"use client";
import { useState, useMemo } from "react";
import type { GameState, SRSCard, SRSRating } from "../types";
import { CAT_COLOR } from "../theme";

interface ReviewViewProps {
  gs: GameState;
  dueCards: SRSCard[];
  reviewCard: (cardId: string, rating: SRSRating) => void;
  nextInterval: (card: SRSCard, rating: SRSRating) => string;
}

const RATING_CONFIG: { rating: SRSRating; label: string; color: string; bg: string }[] = [
  { rating: 0, label: "Again", color: "#dc2626", bg: "rgba(220,38,38,0.08)" },
  { rating: 1, label: "Hard", color: "#ea580c", bg: "rgba(234,88,12,0.08)" },
  { rating: 2, label: "Good", color: "#059669", bg: "rgba(5,150,105,0.08)" },
  { rating: 3, label: "Easy", color: "#2563eb", bg: "rgba(37,99,235,0.08)" },
];

export function ReviewView({ gs, dueCards, reviewCard, nextInterval }: ReviewViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionReviewed, setSessionReviewed] = useState(0);
  const [sessionRatings, setSessionRatings] = useState<SRSRating[]>([]);

  const totalDue = dueCards.length;
  const card = dueCards[currentIndex] as SRSCard | undefined;
  const done = currentIndex >= totalDue;

  const sessionStats = useMemo(() => {
    const again = sessionRatings.filter((r) => r === 0).length;
    const hard = sessionRatings.filter((r) => r === 1).length;
    const good = sessionRatings.filter((r) => r === 2).length;
    const easy = sessionRatings.filter((r) => r === 3).length;
    return { again, hard, good, easy };
  }, [sessionRatings]);

  const handleRate = (rating: SRSRating) => {
    if (!card) return;
    reviewCard(card.id, rating);
    setSessionRatings((prev) => [...prev, rating]);
    setSessionReviewed((prev) => prev + 1);
    setFlipped(false);
    setCurrentIndex((prev) => prev + 1);
  };

  // Empty state - no cards due
  if (totalDue === 0 && !done) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <div style={{ color: "#1a1523", fontSize: 24, fontWeight: 900, fontFamily: "serif", marginBottom: 8 }}>
          All caught up!
        </div>
        <div style={{ color: "#564a5e", fontSize: 14, marginBottom: 24 }}>
          No cards due for review right now. Complete more lessons to add cards to your deck.
        </div>
        <div style={{
          background: "white", border: "1px solid #e8e0e4", borderRadius: 14,
          padding: 20, display: "inline-block",
        }}>
          <div style={{ color: "#7a6e84", fontSize: 12, marginBottom: 8 }}>Your SRS Deck</div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#1a1523", fontSize: 20, fontWeight: 800 }}>{Object.keys(gs.srsCards).length}</div>
              <div style={{ color: "#b0a6b8", fontSize: 10 }}>Total Cards</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#059669", fontSize: 20, fontWeight: 800 }}>
                {Object.values(gs.srsCards).filter((c) => c.repetitions >= 3).length}
              </div>
              <div style={{ color: "#b0a6b8", fontSize: 10 }}>Mature</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#c2255c", fontSize: 20, fontWeight: 800 }}>{gs.reviewsToday}</div>
              <div style={{ color: "#b0a6b8", fontSize: 10 }}>Reviewed Today</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Session complete
  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🏆</div>
        <div style={{ color: "#1a1523", fontSize: 24, fontWeight: 900, fontFamily: "serif", marginBottom: 8 }}>
          Review Complete!
        </div>
        <div style={{ color: "#564a5e", fontSize: 14, marginBottom: 24 }}>
          You reviewed {sessionReviewed} card{sessionReviewed !== 1 ? "s" : ""} this session
        </div>
        <div style={{
          background: "white", border: "1px solid #e8e0e4", borderRadius: 14,
          padding: 24, maxWidth: 360, margin: "0 auto 24px",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
            {RATING_CONFIG.map((r) => (
              <div key={r.rating} style={{ textAlign: "center" }}>
                <div style={{ color: r.color, fontSize: 22, fontWeight: 800 }}>
                  {r.rating === 0 ? sessionStats.again : r.rating === 1 ? sessionStats.hard : r.rating === 2 ? sessionStats.good : sessionStats.easy}
                </div>
                <div style={{ color: "#7a6e84", fontSize: 10 }}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setSessionReviewed(0);
            setSessionRatings([]);
            setFlipped(false);
          }}
          style={{
            background: "linear-gradient(135deg,#d6366c,#7c3aed)",
            color: "white", border: "none", borderRadius: 10,
            padding: "12px 32px", fontWeight: 800, cursor: "pointer",
            fontFamily: "inherit", fontSize: 14,
          }}
        >
          Review Again
        </button>
      </div>
    );
  }

  // Active review
  return (
    <div>
      <div style={{ color: "#1a1523", fontWeight: 900, fontSize: 22, fontFamily: "serif", marginBottom: 4 }}>
        📝 Review
      </div>
      <div style={{ color: "#564a5e", fontSize: 13, marginBottom: 20 }}>
        {currentIndex + 1} of {totalDue} cards due ·{" "}
        <span style={{ color: "#c2255c" }}>{sessionReviewed} reviewed</span>
      </div>

      {/* Progress bar */}
      <div style={{ background: "#e8e0e4", borderRadius: 999, height: 6, marginBottom: 24 }}>
        <div style={{
          width: `${totalDue ? (currentIndex / totalDue) * 100 : 0}%`,
          background: "linear-gradient(90deg,#d6366c,#059669)",
          borderRadius: 999, height: "100%", transition: "width 0.4s",
        }} />
      </div>

      {card && (
        <>
          {/* Card */}
          <div
            onClick={() => !flipped && setFlipped(true)}
            className="card-hover"
            style={{
              background: "white", border: "1px solid #d4c8ce",
              borderRadius: 16, padding: 32, minHeight: 240,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              cursor: flipped ? "default" : "pointer",
              marginBottom: 20, textAlign: "center",
              boxShadow: "0 4px 24px rgba(214,51,108,0.08)",
            }}
          >
            {/* Card type badge */}
            <div style={{
              position: "absolute" as const, top: 16, left: 20,
              background: card.type === "vocab" ? "rgba(214,51,108,0.08)" : "rgba(37,99,235,0.08)",
              color: card.type === "vocab" ? "#c2255c" : "#2563eb",
              fontSize: 10, fontWeight: 700, padding: "2px 10px",
              borderRadius: 999, textTransform: "uppercase", letterSpacing: 1,
            }}>
              {card.type}
            </div>

            {/* Interval info */}
            <div style={{
              position: "absolute" as const, top: 16, right: 20,
              color: "#b0a6b8", fontSize: 10,
            }}>
              {card.repetitions === 0 ? "New" : `${card.interval}d interval`}
            </div>

            {/* Front */}
            <div style={{
              color: "#1a1523", fontSize: 28, fontWeight: 900,
              fontFamily: "serif", marginBottom: flipped ? 16 : 8,
            }}>
              {card.front}
            </div>

            {!flipped && (
              <div style={{ color: "#b0a6b8", fontSize: 12, marginTop: 8 }}>
                Tap to reveal answer
              </div>
            )}

            {flipped && (
              <>
                <div style={{ width: 60, height: 1, background: "#d4c8ce", marginBottom: 16 }} />
                {card.reading && card.reading !== card.front && (
                  <div style={{ color: "#7a6e84", fontSize: 14, marginBottom: 8 }}>
                    {card.reading}
                  </div>
                )}
                <div style={{ color: "#1a1523", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                  {card.back}
                </div>
                {card.context && (
                  <div style={{
                    color: "#564a5e", fontSize: 13, fontStyle: "italic",
                    marginTop: 8, padding: "8px 16px",
                    background: "#f8f5f3", borderRadius: 8,
                  }}>
                    {card.context}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Rating buttons */}
          {flipped && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
              {RATING_CONFIG.map((r) => (
                <button
                  key={r.rating}
                  onClick={() => handleRate(r.rating)}
                  style={{
                    background: r.bg, border: `1.5px solid ${r.color}33`,
                    borderRadius: 10, padding: "14px 8px",
                    cursor: "pointer", fontFamily: "inherit",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", gap: 4,
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ color: r.color, fontWeight: 800, fontSize: 13 }}>
                    {r.label}
                  </span>
                  <span style={{ color: r.color, fontSize: 10, opacity: 0.7 }}>
                    {nextInterval(card, r.rating)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

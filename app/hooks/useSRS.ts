"use client";
import { useCallback, useMemo } from "react";
import type { GameState, SRSCard, SRSRating, Lesson } from "../types";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(date: string, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + Math.round(days));
  return d.toISOString().slice(0, 10);
}

/**
 * SM-2 algorithm implementation.
 * Rating: 0=Again, 1=Hard, 2=Good, 3=Easy
 */
function sm2(card: SRSCard, rating: SRSRating): SRSCard {
  const now = today();
  let { interval, repetitions, easeFactor } = card;

  if (rating === 0) {
    // Again: reset
    interval = 1;
    repetitions = 0;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  } else if (rating === 1) {
    // Hard
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 4;
    } else {
      interval = Math.round(interval * 1.2);
    }
    repetitions += 1;
    easeFactor = Math.max(1.3, easeFactor - 0.15);
  } else if (rating === 2) {
    // Good
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Easy
    if (repetitions === 0) {
      interval = 4;
    } else if (repetitions === 1) {
      interval = 8;
    } else {
      interval = Math.round(interval * easeFactor * 1.3);
    }
    repetitions += 1;
    easeFactor = easeFactor + 0.15;
  }

  return {
    ...card,
    interval,
    repetitions,
    easeFactor,
    dueDate: addDays(now, interval),
    lastReview: now,
  };
}

function generateCardsForLesson(lesson: Lesson): SRSCard[] {
  const cards: SRSCard[] = [];
  const now = today(); // Cards are due immediately so users can review right away

  if (lesson.vocab) {
    lesson.vocab.forEach((v, i) => {
      cards.push({
        id: `${lesson.id}-v-${i}`,
        lessonId: lesson.id,
        type: "vocab",
        front: v.r !== v.j ? `${v.j}（${v.r}）` : v.j,
        back: v.e,
        reading: v.j,
        context: undefined,
        interval: 0,
        repetitions: 0,
        easeFactor: 2.5,
        dueDate: now,
      });
    });
  }

  if (lesson.grammar) {
    lesson.grammar.forEach((g, i) => {
      const pattern = g.p || g.pattern || "";
      const explanation = g.note || g.explanation || "";
      const exSentence = g.ex || (g.examples?.[0]?.jp || g.examples?.[0]?.japanese) || "";
      cards.push({
        id: `${lesson.id}-g-${i}`,
        lessonId: lesson.id,
        type: "grammar",
        front: pattern,
        back: explanation,
        context: exSentence,
        interval: 0,
        repetitions: 0,
        easeFactor: 2.5,
        dueDate: now,
      });
    });
  }

  // Also add phrases for conversation lessons
  if (lesson.phrases) {
    lesson.phrases.forEach((p, i) => {
      cards.push({
        id: `${lesson.id}-p-${i}`,
        lessonId: lesson.id,
        type: "vocab",
        front: p.jp,
        back: p.tr,
        interval: 0,
        repetitions: 0,
        easeFactor: 2.5,
        dueDate: now,
      });
    });
  }

  return cards;
}

export function useSRS(
  gs: GameState,
  setGs: (updater: GameState | ((prev: GameState) => GameState)) => void
) {
  const dueCards = useMemo(() => {
    const now = today();
    return Object.values(gs.srsCards)
      .filter((c) => c.dueDate <= now)
      .sort((a, b) => {
        // Most overdue first, then by ease (harder cards first)
        if (a.dueDate !== b.dueDate) return a.dueDate < b.dueDate ? -1 : 1;
        return a.easeFactor - b.easeFactor;
      });
  }, [gs.srsCards]);

  const reviewCard = useCallback(
    (cardId: string, rating: SRSRating) => {
      setGs((prev) => {
        const card = prev.srsCards[cardId];
        if (!card) return prev;
        const updated = sm2(card, rating);
        const todayStr = today();
        return {
          ...prev,
          srsCards: { ...prev.srsCards, [cardId]: updated },
          reviewsToday:
            prev.lastReviewDate === todayStr
              ? prev.reviewsToday + 1
              : 1,
          lastReviewDate: todayStr,
        };
      });
    },
    [setGs]
  );

  const unlockCards = useCallback(
    (lesson: Lesson) => {
      setGs((prev) => {
        const newCards = generateCardsForLesson(lesson);
        const updated = { ...prev.srsCards };
        for (const card of newCards) {
          if (!updated[card.id]) {
            updated[card.id] = card;
          }
        }
        return { ...prev, srsCards: updated };
      });
    },
    [setGs]
  );

  const stats = useMemo(() => {
    const all = Object.values(gs.srsCards);
    const now = today();
    const due = all.filter((c) => c.dueDate <= now).length;
    const learning = all.filter((c) => c.repetitions < 3).length;
    const mature = all.filter((c) => c.repetitions >= 3).length;
    return { due, learning, mature, total: all.length };
  }, [gs.srsCards]);

  const nextInterval = useCallback((card: SRSCard, rating: SRSRating): string => {
    const preview = sm2(card, rating);
    if (preview.interval < 1) return "<1d";
    if (preview.interval === 1) return "1d";
    if (preview.interval < 30) return `${preview.interval}d`;
    if (preview.interval < 365) return `${Math.round(preview.interval / 30)}mo`;
    return `${(preview.interval / 365).toFixed(1)}y`;
  }, []);

  return { dueCards, reviewCard, unlockCards, stats, nextInterval };
}

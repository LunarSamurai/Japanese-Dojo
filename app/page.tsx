"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { Lesson, QuizState, View, BookId, Upgrade } from "./types";
import { useGameState } from "./hooks/useGameState";
import { useAuth } from "./hooks/useAuth";
import { useToast } from "./hooks/useToast";
import { useSRS } from "./hooks/useSRS";
import { Nav } from "./components/Nav";
import { Dashboard } from "./components/Dashboard";
import { StudyHall } from "./components/StudyHall";
import { Course } from "./components/Course";
import { LessonView } from "./components/LessonView";
import { Shop } from "./components/Shop";
import { Profile } from "./components/Profile";
import { ReviewView } from "./components/ReviewView";
import { TempleView } from "./components/TempleView";
import { LandingAnimation } from "./components/LandingAnimation";
import { SocialView } from "./components/social/SocialView";
import { HeroView } from "./components/HeroView";
import { SkillTreeView } from "./components/SkillTreeView";
import BossQuiz from "./components/BossQuiz";
import { PlacementTest } from "./components/PlacementTest";
import { ChestReveal } from "./components/ChestReveal";
import { ToastNotification } from "./components/Toast";
import { isBossWave } from "./lib/templeEngine";
import { EQUIPMENT_SETS, SET_ITEMS } from "./data/equipmentSets";

export default function NihongoDojo() {
  const { user, loading: authLoading, signUp, signIn, signOut } = useAuth();
  const { gs, setGs, loaded, bumpStreak } = useGameState(user?.id ?? null);
  const { toast, showToast } = useToast();
  const { dueCards, reviewCard, unlockCards, stats: srsStats, nextInterval } = useSRS(gs, setGs);
  const [view, setView] = useState<View>("dashboard");
  const [activeBook, setActiveBook] = useState<BookId>("genki1");
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [quiz, setQuiz] = useState<QuizState>({ q: 0, answers: [], selected: null, done: false, hint: false });
  const [showIntro, setShowIntro] = useState(() => typeof window !== "undefined" && !sessionStorage.getItem("nihongo-dojo-intro-seen"));
  const [needsPlacement, setNeedsPlacement] = useState(false);
  const [bossWave, setBossWave] = useState<number | null>(null);
  const [chestReveal, setChestReveal] = useState<{ items: { icon: string; name: string; nameEn: string; rarity: string }[]; setName: string } | null>(null);
  const globalTickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Global idle tick: runs gold-earning simulation even when not on temple screen ──
  useEffect(() => {
    if (!loaded || !user || bossWave !== null) return; // pause during boss

    // Check if current wave is a boss — if so, trigger boss encounter
    if (isBossWave(gs.temple.waveNumber) && gs.temple.waveNumber > 0) {
      setBossWave(gs.temple.waveNumber);
      return;
    }

    globalTickRef.current = setInterval(() => {
      setGs((g) => {
        const goldPerKill = 1 + Math.floor(g.temple.waveNumber / 3);
        const waveGold = 5 + g.temple.waveNumber * 2;
        // Simple background sim: earn gold per tick as if killing demons
        const tickGold = goldPerKill * 2; // ~2 kills per tick on average
        return {
          ...g,
          coins: g.coins + tickGold,
          temple: {
            ...g.temple,
            totalGoldEarned: g.temple.totalGoldEarned + tickGold,
            totalKills: g.temple.totalKills + 2,
            demonsDefeated: g.temple.demonsDefeated + 2,
            lastTickAt: new Date().toISOString(),
          },
        };
      });
    }, 5000); // every 5s background tick (lighter than temple's 2s visual tick)

    return () => { if (globalTickRef.current) clearInterval(globalTickRef.current); };
  }, [loaded, user, bossWave, gs.temple.waveNumber, setGs]);

  const startLesson = (l: Lesson) => {
    bumpStreak();
    setLesson(l);
    setQuiz({ q: 0, answers: [], selected: null, done: false, hint: false });
    setView("lesson");
  };

  const buyUpgrade = (u: Upgrade) => {
    if (gs.coins < u.cost || gs.owned.has(u.id)) return;
    setGs((g) => ({ ...g, coins: g.coins - u.cost, owned: new Set([...g.owned, u.id]) }));
    showToast(`${u.icon} ${u.name} unlocked!`, "shop");
  };

  const handleAuthSuccess = useCallback(() => {
    setShowIntro(false);
  }, []);

  // Check if new user needs placement test — ONLY after auth + game state fully loaded
  const placementCheckedRef = useRef(false);
  useEffect(() => {
    if (!loaded || !user || placementCheckedRef.current) return;
    placementCheckedRef.current = true;

    const placementKey = `nihongo-dojo-placement-${user.id}`;
    const hasPlacement = typeof window !== "undefined" && localStorage.getItem(placementKey);

    // Only show placement if: no placement key exists AND no progress (truly new user)
    if (!hasPlacement && gs.xp === 0 && gs.completed.size === 0) {
      setNeedsPlacement(true);
    }
  }, [loaded, user, gs.xp, gs.completed.size]);

  // Show loading screen while auth is checking
  if (authLoading || !loaded) {
    return (
      <div style={{ background: "#0d0509", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#c2255c", fontSize: 24, fontWeight: 800, fontFamily: "serif", opacity: 0.7 }}>日本語道場</div>
      </div>
    );
  }

  // Show cutscene + auth if not logged in OR first visit
  if (!user || showIntro) {
    return (
      <LandingAnimation
        onAuthSuccess={handleAuthSuccess}
        signUp={signUp}
        signIn={signIn}
        isAuthenticated={!!user}
      />
    );
  }

  // Force placement test for new users
  if (needsPlacement) {
    return (
      <div style={{ background: "#faf7f5", minHeight: "100vh", fontFamily: "Georgia,serif", padding: "40px 20px" }}>
        <PlacementTest
          onFinish={(book) => {
            if (typeof window !== "undefined") localStorage.setItem(`nihongo-dojo-placement-${user?.id || "anon"}`, book);
            setNeedsPlacement(false);
          }}
          onSkip={() => {
            if (typeof window !== "undefined") localStorage.setItem(`nihongo-dojo-placement-${user?.id || "anon"}`, "genki1");
            setNeedsPlacement(false);
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ background: "#faf7f5", minHeight: "100vh", display: "flex", fontFamily: "Georgia,serif" }}>
      <Nav gs={gs} view={view} setView={setView} dueCount={srsStats.due} />
      <div style={{ marginLeft: 220, flex: 1, padding: "28px 32px", maxWidth: "calc(100vw - 220px)", overflowY: "auto", minHeight: "100vh" }}>
        {view === "dashboard" && <Dashboard gs={gs} startLesson={startLesson} setView={setView} srsStats={srsStats} />}
        {view === "course" && <Course gs={gs} startLesson={startLesson} userId={user?.id} />}
        {view === "lessons" && <StudyHall gs={gs} activeBook={activeBook} setActiveBook={setActiveBook} startLesson={startLesson} />}
        {view === "lesson" && lesson && (
          <LessonView
            lesson={lesson}
            gs={gs}
            quiz={quiz}
            setQuiz={setQuiz}
            setGs={setGs}
            setView={setView}
            showToast={showToast}
            unlockCards={unlockCards}
          />
        )}
        {view === "review" && (
          <ReviewView
            gs={gs}
            dueCards={dueCards}
            reviewCard={reviewCard}
            nextInterval={nextInterval}
          />
        )}
        {view === "temple" && <TempleView gs={gs} setGs={setGs} showToast={showToast} onBossEncounter={(wave) => setBossWave(wave)} setView={setView} />}
        {view === "hero" && <HeroView gs={gs} setGs={setGs} showToast={showToast} setView={setView} />}
        {view === "skilltree" && <SkillTreeView gs={gs} setGs={setGs} showToast={showToast} setView={setView} />}
        {view === "social" && <SocialView userId={user?.id ?? null} gs={gs} />}
        {view === "shop" && <Shop gs={gs} setGs={setGs} buyUpgrade={buyUpgrade} showToast={showToast} />}
        {view === "profile" && <Profile gs={gs} userId={user?.id ?? null} onSignOut={signOut} />}
      </div>
      <ToastNotification toast={toast} />
      {/* Global Boss Quiz overlay — appears on ANY screen when boss wave is reached */}
      {bossWave !== null && (
        <BossQuiz
          waveNumber={bossWave}
          gs={gs}
          templeHp={gs.temple.hp}
          templeMaxHp={gs.temple.maxHp}
          onComplete={(result) => {
            if (result.won) {
              const completedWave = bossWave;
              setBossWave(null);

              // Check if this is wave 100 boss and reward not claimed
              const isWave100 = completedWave === 100 && !gs.owned.has("wave100_reward_claimed");

              setGs((g) => {
                const newOwned = new Set(g.owned);
                let bonusOmamori = 0;

                if (isWave100) {
                  // Pick random legendary set and add all items
                  const legendarySets = EQUIPMENT_SETS.filter(s => {
                    const items = SET_ITEMS.filter(i => s.items.includes(i.id));
                    return items.length > 0 && items[0].rarity === "legendary";
                  });
                  if (legendarySets.length > 0) {
                    const randomSet = legendarySets[Math.floor(Math.random() * legendarySets.length)];
                    const setItems = SET_ITEMS.filter(i => randomSet.items.includes(i.id));
                    for (const item of setItems) newOwned.add(item.id);
                    newOwned.add("wave100_reward_claimed");

                    // Trigger chest reveal animation
                    setTimeout(() => {
                      setChestReveal({
                        setName: randomSet.nameEn,
                        items: setItems.map(i => ({ icon: i.icon, name: i.name, nameEn: i.nameEn, rarity: i.rarity })),
                      });
                    }, 500);
                  }
                }

                return {
                  ...g,
                  omamori: g.omamori + result.omamoriEarned + bonusOmamori,
                  owned: newOwned,
                  temple: {
                    ...g.temple,
                    hp: result.templeHpRemaining,
                    waveNumber: g.temple.waveNumber + 1,
                    wavesCleared: g.temple.wavesCleared + 1,
                    lastTickAt: new Date().toISOString(),
                  },
                };
              });

              if (!isWave100) {
                showToast(`Boss defeated! +${result.omamoriEarned} 🏮 Omamori`, "xp");
              }
            } else {
              // Boss escaped — stay on same wave, can retry
              setBossWave(null);
              setGs((g) => ({
                ...g,
                temple: {
                  ...g.temple,
                  hp: result.templeHpRemaining,
                  lastTickAt: new Date().toISOString(),
                },
              }));
              showToast("Boss escaped! Retry when ready.", "shop");
            }
          }}
        />
      )}
      {/* Chest reveal overlay — wave 100 legendary set reward */}
      {chestReveal && (
        <ChestReveal
          items={chestReveal.items}
          setName={chestReveal.setName}
          onComplete={() => {
            setChestReveal(null);
            showToast("Legendary set added to your inventory!", "perfect");
          }}
        />
      )}
    </div>
  );
}

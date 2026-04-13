"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import type { GameState } from "../types";
import { getLevel } from "../theme";
import { freshTemple } from "../lib/sync";
import { DEMON_TYPES, generateWave, getHpMultiplier } from "../data/demons";
import { DEFENSE_UPGRADES, TEMPLE_UPGRADE_TIERS, getTempleUpgradeLevel, getNextUpgradeCost } from "../data/defenseUpgrades";
import { UPGRADES } from "../data/upgrades";
import { HERO_EQUIPMENT } from "../data/heroEquipment";
import { SET_ITEMS, EQUIPMENT_SETS } from "../data/equipmentSets";
import {
  getDefensePower,
  isBossWave,
  getBossTier,
  calculateOfflineProgress,
} from "../lib/templeEngine";

interface TempleViewProps {
  gs: GameState;
  setGs: (updater: GameState | ((prev: GameState) => GameState)) => void;
  showToast: (msg: string, type?: string) => void;
  onBossEncounter: (waveNumber: number) => void;
  setView: (v: import("../types").View) => void;
}

interface BattleDemon {
  id: string;
  typeId: string;
  hp: number;
  maxHp: number;
  dmg: number;
}

// ── HP Bar (dark style) ──
function HpBar({ current, max, color, height = 8 }: { current: number; max: number; color: string; height?: number }) {
  const pct = Math.max(0, Math.min(100, (current / max) * 100));
  return (
    <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 999, height, width: "100%" }}>
      <div style={{
        width: `${pct}%`, height: "100%", borderRadius: 999,
        background: pct > 50 ? color : pct > 25 ? "#f59e0b" : "#ef4444",
        transition: "width 0.3s, background 0.3s",
        boxShadow: `0 0 8px ${pct > 50 ? color : pct > 25 ? "#f59e0b" : "#ef4444"}66`,
      }} />
    </div>
  );
}

// ── Torii Gate CSS Art ──
function ToriiGate({ scale = 1, shaking }: { scale?: number; shaking?: boolean }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      transform: `scale(${scale})`,
      animation: shaking ? "temple-shake 0.3s ease-in-out" : "none",
    }}>
      {/* Kasagi */}
      <div style={{ width: 180, height: 13, background: "linear-gradient(180deg,#e63f6e,#c0294f)", borderRadius: "5px 5px 2px 2px", position: "relative", boxShadow: "0 -2px 12px rgba(214,51,108,0.4)" }}>
        <div style={{ position: "absolute", left: -12, right: -12, top: -4, height: 8, background: "linear-gradient(180deg,#d6336c,#b52a50)", borderRadius: "50% 50% 0 0" }} />
      </div>
      {/* Nuki */}
      <div style={{ width: 150, height: 8, background: "linear-gradient(180deg,#d6336c,#a82545)", marginTop: 16 }} />
      {/* Pillars */}
      <div style={{ display: "flex", justifyContent: "space-between", width: 145 }}>
        <div style={{ width: 11, height: 100, background: "linear-gradient(180deg,#c0294f,#6b1830)", borderRadius: "0 0 3px 3px", boxShadow: "2px 0 8px rgba(0,0,0,0.3)" }} />
        <div style={{ width: 11, height: 100, background: "linear-gradient(180deg,#c0294f,#6b1830)", borderRadius: "0 0 3px 3px", boxShadow: "-2px 0 8px rgba(0,0,0,0.3)" }} />
      </div>
      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 4, gap: 2 }}>
        <div style={{ width: 100, height: 5, background: "#3d1828", borderRadius: 1 }} />
        <div style={{ width: 120, height: 5, background: "#30141f", borderRadius: 1 }} />
        <div style={{ width: 140, height: 5, background: "#250f18", borderRadius: 1 }} />
      </div>
    </div>
  );
}

// ── Floating text for damage / gold ──
interface FloatText {
  id: number;
  text: string;
  x: number;
  color: string;
}

function getMaxHp(level: number, heroHp: number, heroCharmBonus: number): number {
  return 100 + level * 20 + heroHp + heroCharmBonus;
}

const BLOSSOMS = Array.from({ length: 10 }, (_, i) => ({
  left: `${3 + i * 10}%`,
  delay: `${i * 0.3}s`,
  duration: `${3 + (i % 3) * 0.8}s`,
  size: 4 + (i % 3) * 2,
  drift: `${(i % 2 === 0 ? 1 : -1) * (15 + i * 6)}px`,
  spin: `${(i % 2 === 0 ? 1 : -1) * (180 + i * 35)}deg`,
  color: i % 3 === 0 ? "rgba(255,182,193,0.6)" : i % 3 === 1 ? "rgba(255,140,160,0.5)" : "rgba(255,200,210,0.4)",
}));

// ── Temple Upgrade Shop (repeatable upgrades) ──
function TempleUpgradeShop({ gs, setGs }: { gs: GameState; setGs: (u: GameState | ((p: GameState) => GameState)) => void }) {
  return (
    <div style={{
      background: "linear-gradient(135deg,rgba(26,10,18,0.8),rgba(45,27,46,0.8))",
      borderRadius: 14, padding: "16px 18px", marginTop: 12,
      border: "1px solid rgba(214,51,108,0.12)",
    }}>
      <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 800, marginBottom: 12, letterSpacing: 2, textTransform: "uppercase" }}>
        Temple Upgrades
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {TEMPLE_UPGRADE_TIERS.map((tier) => {
          const level = getTempleUpgradeLevel(gs.owned, tier.id);
          const discount = Math.min(gs.awakening.count * 0.05, 0.5);
          const cost = Math.round(getNextUpgradeCost(tier, level) * (1 - discount));
          const maxed = level >= tier.maxLevel;
          const canAfford = gs.coins >= cost;
          const buyUpgrade = () => {
            if (maxed || !canAfford) return;
            const nextLevel = level + 1;
            const upgradeKey = `${tier.id}_${nextLevel}`;
            setGs((g) => ({
              ...g,
              coins: g.coins - cost,
              owned: new Set([...g.owned, upgradeKey]),
            }));
          };
          return (
            <div key={tier.id} style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "10px 14px",
              border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{ fontSize: 22, flexShrink: 0 }}>{tier.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 700 }}>
                  {tier.nameEn}
                  <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, marginLeft: 6 }}>Lv {level}/{tier.maxLevel}</span>
                </div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, marginTop: 2 }}>
                  +{tier.defensePerLevel} def/level · {tier.description}
                </div>
                {/* Progress bar */}
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 999, height: 4, marginTop: 4, width: "100%" }}>
                  <div style={{ width: `${(level / tier.maxLevel) * 100}%`, height: "100%", borderRadius: 999, background: "#c2255c", transition: "width 0.3s" }} />
                </div>
              </div>
              <button
                onClick={buyUpgrade}
                disabled={maxed || !canAfford}
                style={{
                  background: maxed ? "rgba(255,255,255,0.05)" : canAfford ? "linear-gradient(135deg,#c2255c,#7e3794)" : "rgba(255,255,255,0.05)",
                  color: maxed ? "rgba(255,255,255,0.3)" : canAfford ? "white" : "rgba(255,255,255,0.3)",
                  border: "none", borderRadius: 8, padding: "6px 12px",
                  fontSize: 10, fontWeight: 800, cursor: maxed || !canAfford ? "not-allowed" : "pointer",
                  fontFamily: "inherit", flexShrink: 0, minWidth: 70, textAlign: "center",
                }}>
                {maxed ? "MAX" : `🪙 ${cost}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Awakening Section ──
function AwakeningSection({ gs, setGs, showToast }: { gs: GameState; setGs: (u: GameState | ((p: GameState) => GameState)) => void; showToast: (msg: string, type?: string) => void }) {
  const [confirmStep, setConfirmStep] = useState(0); // 0=idle, 1=confirm (full), 2=confirm (early)
  const allMaxed = TEMPLE_UPGRADE_TIERS.every(
    (tier) => getTempleUpgradeLevel(gs.owned, tier.id) >= tier.maxLevel
  );
  const canEarlyAwaken = gs.temple.waveNumber >= 100 && !allMaxed;

  if (!allMaxed && !canEarlyAwaken) return null;

  const executeAwakening = (skillPoints: number) => {
    setGs((g) => {
      const newOwned = new Set(
        [...g.owned].filter((id) => {
          return !TEMPLE_UPGRADE_TIERS.some((tier) =>
            id.startsWith(tier.id + "_")
          );
        })
      );
      return {
        ...g,
        coins: 0,
        owned: newOwned,
        temple: {
          ...freshTemple(),
          maxHp: 100 + getLevel(g.xp) * 20,
        },
        awakening: {
          ...g.awakening,
          count: g.awakening.count + 1,
          skillPoints: g.awakening.skillPoints + skillPoints,
          lifetimeCoins: g.awakening.lifetimeCoins + g.coins,
          lifetimeKills: g.awakening.lifetimeKills + g.temple.totalKills,
          lifetimeWaves: g.awakening.lifetimeWaves + g.temple.wavesCleared,
        },
      };
    });
    setConfirmStep(0);
    showToast(`Awakening complete! +${skillPoints} Skill Points`, "xp");
  };

  const handleFullAwaken = () => {
    if (confirmStep !== 1) {
      setConfirmStep(1);
      return;
    }
    executeAwakening(5);
  };

  const handleEarlyAwaken = () => {
    if (confirmStep !== 2) {
      setConfirmStep(2);
      return;
    }
    executeAwakening(3);
  };

  // Shared resets/keeps info cards
  const resetsKeepsGrid = (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          background: "rgba(239,68,68,0.08)",
          borderRadius: 10,
          padding: "10px 12px",
          border: "1px solid rgba(239,68,68,0.15)",
        }}
      >
        <div
          style={{
            color: "#ef4444",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 1,
            marginBottom: 4,
            textTransform: "uppercase",
          }}
        >
          Resets
        </div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, lineHeight: 1.6 }}>
          {"\u2022"} All temple upgrade levels{"\n"}
          {"\u2022"} Wave progress{"\n"}
          {"\u2022"} Gold coins{"\n"}
          {"\u2022"} Temple HP {"&"} stats
        </div>
      </div>
      <div
        style={{
          background: "rgba(74,222,128,0.08)",
          borderRadius: 10,
          padding: "10px 12px",
          border: "1px solid rgba(74,222,128,0.15)",
        }}
      >
        <div
          style={{
            color: "#4ade80",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 1,
            marginBottom: 4,
            textTransform: "uppercase",
          }}
        >
          Keeps
        </div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, lineHeight: 1.6 }}>
          {"\u2022"} Hero {"&"} equipment{"\n"}
          {"\u2022"} Omamori{"\n"}
          {"\u2022"} Skill tree progress{"\n"}
          {"\u2022"} XP {"&"} level
        </div>
      </div>
    </div>
  );

  // ── Full Awakening (all upgrades maxed) ──
  if (allMaxed) {
    return (
      <div
        style={{
          marginTop: 16,
          background: "linear-gradient(135deg,rgba(26,15,8,0.9),rgba(45,30,15,0.9))",
          borderRadius: 14,
          padding: "20px 22px",
          border: "2px solid rgba(251,191,36,0.4)",
          boxShadow: "0 0 24px rgba(251,191,36,0.15), inset 0 0 30px rgba(251,191,36,0.05)",
        }}
      >
        <div
          style={{
            color: "#fbbf24",
            fontSize: 18,
            fontWeight: 900,
            fontFamily: "serif",
            marginBottom: 8,
            textShadow: "0 0 16px rgba(251,191,36,0.4)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 22 }}>{"\u2728"}</span>
          {"\u899A\u9192"} {"\u2014"} Awakening
          {gs.awakening.count > 0 && (
            <span
              style={{
                background: "rgba(251,191,36,0.2)",
                fontSize: 11,
                fontWeight: 800,
                padding: "2px 8px",
                borderRadius: 6,
              }}
            >
              #{gs.awakening.count + 1}
            </span>
          )}
        </div>

        <div
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 12,
            lineHeight: 1.6,
            marginBottom: 14,
          }}
        >
          Reset your temple upgrades and wave progress. Keep your hero, equipment,
          and omamori. Gain <span style={{ color: "#fbbf24", fontWeight: 800 }}>5 skill points</span>.
        </div>

        {resetsKeepsGrid}

        <button
          onClick={handleFullAwaken}
          style={{
            width: "100%",
            background:
              confirmStep === 1
                ? "linear-gradient(135deg,#ef4444,#dc2626)"
                : "linear-gradient(135deg,#fbbf24,#f59e0b)",
            color: confirmStep === 1 ? "white" : "#1a1523",
            border: "none",
            borderRadius: 10,
            padding: "12px 24px",
            fontSize: 14,
            fontWeight: 900,
            cursor: "pointer",
            fontFamily: "inherit",
            letterSpacing: 1,
            boxShadow:
              confirmStep === 1
                ? "0 4px 20px rgba(239,68,68,0.4)"
                : "0 4px 20px rgba(251,191,36,0.3)",
            transition: "all 0.2s",
          }}
        >
          {confirmStep === 1 ? "Are you sure? Click again to Awaken" : "Awaken \u2726"}
        </button>
      </div>
    );
  }

  // ── Early Awakening (wave 100+ but upgrades not maxed) ──
  return (
    <div
      style={{
        marginTop: 16,
        background: "linear-gradient(135deg,rgba(18,10,26,0.85),rgba(35,18,50,0.85))",
        borderRadius: 14,
        padding: "20px 22px",
        border: "2px solid rgba(168,85,247,0.35)",
        boxShadow: "0 0 24px rgba(168,85,247,0.12), inset 0 0 30px rgba(168,85,247,0.04)",
        opacity: 0.95,
      }}
    >
      <div
        style={{
          color: "#c084fc",
          fontSize: 18,
          fontWeight: 900,
          fontFamily: "serif",
          marginBottom: 8,
          textShadow: "0 0 16px rgba(168,85,247,0.4)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 22 }}>{"\u2728"}</span>
        {"\u65E9\u671F\u899A\u9192"} {"\u2014"} Early Awakening
        {gs.awakening.count > 0 && (
          <span
            style={{
              background: "rgba(168,85,247,0.2)",
              fontSize: 11,
              fontWeight: 800,
              padding: "2px 8px",
              borderRadius: 6,
            }}
          >
            #{gs.awakening.count + 1}
          </span>
        )}
      </div>

      <div
        style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: 12,
          lineHeight: 1.6,
          marginBottom: 14,
        }}
      >
        You reached wave 100 but haven{"'"}t maxed all upgrades. You can awaken early for fewer skill points.
      </div>

      {/* Comparison: early vs full */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            background: "rgba(168,85,247,0.1)",
            borderRadius: 10,
            padding: "10px 12px",
            border: "1px solid rgba(168,85,247,0.2)",
          }}
        >
          <div
            style={{
              color: "#c084fc",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 1,
              marginBottom: 4,
              textTransform: "uppercase",
            }}
          >
            Awaken Now
          </div>
          <div style={{ color: "#c084fc", fontSize: 16, fontWeight: 900 }}>+3 skill points</div>
        </div>
        <div
          style={{
            background: "rgba(251,191,36,0.08)",
            borderRadius: 10,
            padding: "10px 12px",
            border: "1px solid rgba(251,191,36,0.15)",
          }}
        >
          <div
            style={{
              color: "#fbbf24",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 1,
              marginBottom: 4,
              textTransform: "uppercase",
            }}
          >
            Full Mastery
          </div>
          <div style={{ color: "#fbbf24", fontSize: 16, fontWeight: 900 }}>+5 skill points</div>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, marginTop: 2 }}>Max all upgrades to Lv 50</div>
        </div>
      </div>

      {/* Lifetime stats preview */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          borderRadius: 10,
          padding: "10px 12px",
          border: "1px solid rgba(255,255,255,0.06)",
          marginBottom: 14,
        }}
      >
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
          Current Run Stats
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ color: "#fbbf24", fontSize: 11, fontWeight: 800 }}>
            {"\uD83E\uDE99"} {gs.coins} gold
          </div>
          <div style={{ color: "#e879f9", fontSize: 11, fontWeight: 800 }}>
            {"\uD83E\uDDFF"} {gs.omamori} omamori
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>
            {"\uD83C\uDF0A"} {gs.temple.wavesCleared} waves
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>
            {"\uD83D\uDC79"} {gs.temple.totalKills} kills
          </div>
        </div>
      </div>

      {resetsKeepsGrid}

      <button
        onClick={handleEarlyAwaken}
        style={{
          width: "100%",
          background:
            confirmStep === 2
              ? "linear-gradient(135deg,#ef4444,#dc2626)"
              : "linear-gradient(135deg,#a855f7,#7c3aed)",
          color: "white",
          border: "none",
          borderRadius: 10,
          padding: "12px 24px",
          fontSize: 14,
          fontWeight: 900,
          cursor: "pointer",
          fontFamily: "inherit",
          letterSpacing: 1,
          boxShadow:
            confirmStep === 2
              ? "0 4px 20px rgba(239,68,68,0.4)"
              : "0 4px 20px rgba(168,85,247,0.3)",
          transition: "all 0.2s",
        }}
      >
        {confirmStep === 2 ? "Are you sure? Click again to Awaken Early" : "Awaken Early \u2726"}
      </button>
    </div>
  );
}

export function TempleView({ gs, setGs, showToast, onBossEncounter, setView }: TempleViewProps) {
  const level = getLevel(gs.xp);
  // Hero charm bonus to temple HP
  const charmBonus = (() => {
    let bonus = 0;
    // Base charm
    if (gs.hero.charm) {
      const charm = HERO_EQUIPMENT.find((e: { id: string }) => e.id === gs.hero.charm);
      if (charm) bonus += charm.bonus;
    }
    // Legendary charm (stacks)
    if (gs.hero.legendaryCharm) {
      const lc = SET_ITEMS.find((e) => e.id === gs.hero.legendaryCharm);
      if (lc) bonus += lc.bonus;
    }
    return bonus;
  })();
  const maxHp = getMaxHp(level, gs.hero.hp, charmBonus);
  const defensePower = getDefensePower(gs.owned, gs.hero, gs.awakening);

  // ── Local battle state ──
  const [demons, setDemons] = useState<BattleDemon[]>([]);
  const [templeHp, setTempleHp] = useState(Math.min(gs.temple.hp, maxHp));
  const [damageFlash, setDamageFlash] = useState<string | null>(null);
  const [templeShake, setTempleShake] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState<FloatText[]>([]);
  const [offlineBanner, setOfflineBanner] = useState<{ gold: number; kills: number; waves: number; omamori: number; time: string } | null>(null);
  const [currentWave, setCurrentWave] = useState(gs.temple.waveNumber);
  const [bossApproaching, setBossApproaching] = useState(false);
  const [bossPaused, setBossPaused] = useState(false);
  const [rebuildMsg, setRebuildMsg] = useState(false);

  const floatId = useRef(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const initializedRef = useRef(false);
  const demonsRef = useRef<BattleDemon[]>([]);

  // Keep ref in sync
  useEffect(() => {
    demonsRef.current = demons;
  }, [demons]);

  const addFloat = useCallback((text: string, x: number, color = "#fbbf24") => {
    const id = ++floatId.current;
    setFloatingTexts((prev) => [...prev, { id, text, x, color }]);
    setTimeout(() => setFloatingTexts((prev) => prev.filter((f) => f.id !== id)), 1200);
  }, []);

  // ── Spawn demons for a wave ──
  const spawnWaveDemonsLocal = useCallback((waveNum: number) => {
    const wave = generateWave(waveNum, gs.completed.size);
    const hpMult = getHpMultiplier(waveNum, gs.completed.size);
    const dmgMult = 1 + waveNum * 0.05;
    const bossTier = isBossWave(waveNum) ? getBossTier(waveNum) : null;

    const spawned: BattleDemon[] = [];
    let idx = 0;
    for (const d of wave.demons) {
      const dt = DEMON_TYPES.find((t) => t.id === d.demonId);
      if (!dt) continue;
      for (let i = 0; i < d.count; i++) {
        let hp = Math.round(dt.baseHp * hpMult);
        if (bossTier) hp = Math.round(hp * bossTier.hpMultiplier);
        spawned.push({
          id: `${dt.id}-${idx++}`,
          typeId: dt.id,
          hp,
          maxHp: hp,
          dmg: Math.round(dt.baseDmg * dmgMult),
        });
      }
    }
    return spawned;
  }, [gs.completed.size]);

  // ── Format time for offline banner ──
  function formatTime(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }

  // ── On mount: calculate offline progress ──
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const offline = calculateOfflineProgress(
      gs.temple.lastTickAt,
      gs.temple.waveNumber,
      gs.temple.hp,
      maxHp,
      defensePower,
      gs.completed.size
    );

    if (offline.ticksSimulated > 0 && (offline.goldEarned > 0 || offline.wavesCleared > 0)) {
      setOfflineBanner({
        gold: offline.goldEarned,
        kills: offline.killCount,
        waves: offline.wavesCleared,
        omamori: offline.omamoriEarned,
        time: formatTime(offline.timeAwaySeconds),
      });

      // Apply offline earnings
      setGs((g) => ({
        ...g,
        coins: g.coins + offline.goldEarned,
        omamori: g.omamori + offline.omamoriEarned,
        temple: {
          ...g.temple,
          waveNumber: offline.newWaveNumber,
          hp: offline.templeHp,
          wavesCleared: g.temple.wavesCleared + offline.wavesCleared,
          demonsDefeated: g.temple.demonsDefeated + offline.killCount,
          totalGoldEarned: g.temple.totalGoldEarned + offline.goldEarned,
          totalKills: g.temple.totalKills + offline.killCount,
          lastTickAt: new Date().toISOString(),
        },
      }));

      setCurrentWave(offline.newWaveNumber);
      setTempleHp(offline.templeHp);

      // Auto-dismiss offline banner after 5s
      setTimeout(() => setOfflineBanner(null), 5000);
    }

    // Spawn initial wave demons
    const waveNum = offline.ticksSimulated > 0 ? offline.newWaveNumber : gs.temple.waveNumber;
    const hp = offline.ticksSimulated > 0 ? offline.templeHp : gs.temple.hp;
    setCurrentWave(waveNum);
    setTempleHp(hp > 0 ? hp : maxHp);

    // If current wave is a boss wave, pause for boss encounter
    if (isBossWave(waveNum)) {
      setBossPaused(true);
      setDemons(spawnWaveDemonsLocal(waveNum));
    } else {
      setDemons(spawnWaveDemonsLocal(waveNum));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Boss approaching indicator ──
  useEffect(() => {
    const nextBossWave = Math.ceil((currentWave + 1) / 10) * 10;
    setBossApproaching(nextBossWave - currentWave === 1 && !isBossWave(currentWave));
  }, [currentWave]);

  // ── Main battle loop (2s tick) ──
  useEffect(() => {
    if (bossPaused) return;

    tickRef.current = setInterval(() => {
      setDemons((prev) => {
        const updated = prev.map((d) => ({ ...d }));
        const alive = updated.filter((d) => d.hp > 0);

        if (alive.length === 0) return updated;

        // Defense attacks front demon
        const frontIdx = updated.findIndex((d) => d.hp > 0);
        if (frontIdx >= 0) {
          updated[frontIdx].hp = Math.max(0, updated[frontIdx].hp - defensePower);
          setDamageFlash(updated[frontIdx].id);
          setTimeout(() => setDamageFlash(null), 200);
          addFloat(`-${defensePower}`, 30 + Math.random() * 40, "#fbbf24");

          if (updated[frontIdx].hp <= 0) {
            const dt = DEMON_TYPES.find((t) => t.id === updated[frontIdx].typeId);
            const killGold = 1 + Math.floor(currentWave / 3);
            addFloat(`${dt?.emoji || ""} +${killGold}g`, 20 + Math.random() * 60, "#4ade80");
            setTimeout(() => {
              setGs((g) => ({
                ...g,
                coins: g.coins + killGold,
                temple: { ...g.temple, totalGoldEarned: g.temple.totalGoldEarned + killGold, totalKills: g.temple.totalKills + 1, demonsDefeated: g.temple.demonsDefeated + 1 },
              }));
            }, 0);
          }
        }

        // Alive demons damage temple
        const stillAlive = updated.filter((d) => d.hp > 0);
        const totalDmg = stillAlive.reduce((sum, d) => sum + d.dmg, 0);

        if (totalDmg > 0) {
          setTempleHp((hp) => {
            const newHp = Math.max(0, hp - totalDmg);
            setTempleShake(true);
            setTimeout(() => setTempleShake(false), 300);
            addFloat(`-${totalDmg}`, 45 + Math.random() * 10, "#ef4444");

            if (newHp <= 0) {
              // Temple destroyed - full rebuild
              const rebuildHp = maxHp;
              const deadCount = updated.filter((d) => d.hp <= 0).length;
              setRebuildMsg(true);
              setTimeout(() => setRebuildMsg(false), 3000);
              setTimeout(() => {
                setGs((g) => ({
                  ...g,
                  temple: {
                    ...g.temple,
                    hp: rebuildHp,
                    demonsDefeated: g.temple.demonsDefeated + deadCount,
                    totalKills: g.temple.totalKills + deadCount,
                    lastTickAt: new Date().toISOString(),
                  },
                }));
              }, 0);
              // Restart same wave
              setTimeout(() => {
                setTempleHp(rebuildHp);
                setDemons((prev) => {
                  const wave = generateWave(currentWave, 0);
                  const hpMult2 = getHpMultiplier(currentWave, 0);
                  const spawned: BattleDemon[] = [];
                  let idx2 = 0;
                  for (const d of wave.demons) {
                    const dt2 = DEMON_TYPES.find((t) => t.id === d.demonId);
                    if (!dt2) continue;
                    for (let i = 0; i < d.count; i++) {
                      const hp2 = Math.round(dt2.baseHp * hpMult2);
                      spawned.push({ id: `${dt2.id}-${idx2++}`, typeId: dt2.id, hp: hp2, maxHp: hp2, dmg: Math.round(dt2.baseDmg * (1 + currentWave * 0.05)) });
                    }
                  }
                  return spawned;
                });
              }, 500);
              return rebuildHp;
            }
            return newHp;
          });
        }

        // Check if wave cleared
        if (updated.every((d) => d.hp <= 0)) {
          const goldEarned = 5 + currentWave * 2;
          const killsThisWave = updated.length;

          addFloat(`+${goldEarned} gold`, 40 + Math.random() * 20, "#fbbf24");
          setTimeout(() => showToast(`Wave ${currentWave} cleared! +${goldEarned} gold`, "xp"), 0);

          // Defer state updates to avoid nested setState during render
          const nextWave = currentWave + 1;
          const nextIsBoss = isBossWave(nextWave);

          // If next wave is boss, pause IMMEDIATELY before any state updates
          // to prevent the battle loop from restarting
          if (nextIsBoss) {
            setBossPaused(true);
          }

          setTimeout(() => {
            setCurrentWave(nextWave);
            setGs((g) => {
              let updated = {
                ...g,
                coins: g.coins + goldEarned,
                temple: {
                  ...g.temple,
                  waveNumber: nextWave,
                  wavesCleared: g.temple.wavesCleared + 1,
                  demonsDefeated: g.temple.demonsDefeated + killsThisWave,
                  totalGoldEarned: g.temple.totalGoldEarned + goldEarned,
                  totalKills: g.temple.totalKills + killsThisWave,
                  lastTickAt: new Date().toISOString(),
                },
              };

              // Wave 100 legendary set reward
              if (nextWave >= 100 && !g.owned.has("wave100_reward_claimed")) {
                const legendarySetIds = EQUIPMENT_SETS.filter(s => {
                  const items = SET_ITEMS.filter(i => s.items.includes(i.id));
                  return items.length > 0 && items[0].rarity === "legendary";
                }).map(s => s.id);
                const randomSetId = legendarySetIds[Math.floor(Math.random() * legendarySetIds.length)];
                const randomSet = EQUIPMENT_SETS.find(s => s.id === randomSetId);
                if (randomSet) {
                  const setItems = SET_ITEMS.filter(i => randomSet.items.includes(i.id));
                  const newOwned = new Set(updated.owned);
                  newOwned.add("wave100_reward_claimed");
                  for (const item of setItems) newOwned.add(item.id);
                  updated = { ...updated, owned: newOwned };
                  setTimeout(() => showToast(`Wave 100! \uD83C\uDF81 ${randomSet.nameEn} legendary set unlocked!`, "perfect"), 100);
                }
              }

              return updated;
            });

            if (nextIsBoss) {
              setDemons(spawnWaveDemonsLocal(nextWave));
              // Don't auto-trigger boss — player clicks "Challenge the Boss" button
            } else {
              setTimeout(() => setDemons(spawnWaveDemonsLocal(nextWave)), 300);
            }
          }, 0);
        }

        return updated;
      });
    }, 2000);

    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [bossPaused, defensePower, maxHp, currentWave, gs.completed.size, setGs, showToast, addFloat, onBossEncounter, spawnWaveDemonsLocal]);

  // ── Persist templeHp on changes ──
  useEffect(() => {
    setGs((g) => ({
      ...g,
      temple: {
        ...g.temple,
        hp: templeHp,
        maxHp,
        lastTickAt: new Date().toISOString(),
      },
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templeHp]);

  // ── Resume after boss is defeated (parent sets bossPaused back) ──
  const resumeAfterBoss = useCallback(() => {
    setBossPaused(false);
    const nextWave = currentWave + 1;
    setCurrentWave(nextWave);
    setDemons(spawnWaveDemonsLocal(nextWave));
    setGs((g) => ({
      ...g,
      temple: {
        ...g.temple,
        waveNumber: nextWave,
        wavesCleared: g.temple.wavesCleared + 1,
        lastTickAt: new Date().toISOString(),
      },
    }));
  }, [currentWave, spawnWaveDemonsLocal, setGs]);

  // Expose resume function to parent via effect on gs changes
  // The parent can call onBossEncounter -> show quiz -> on success -> add omamori and the component detects boss is no longer paused
  useEffect(() => {
    if (bossPaused && !isBossWave(gs.temple.waveNumber)) {
      // Parent has advanced the wave past the boss - resume
      setBossPaused(false);
      setCurrentWave(gs.temple.waveNumber);
      setDemons(spawnWaveDemonsLocal(gs.temple.waveNumber));
    }
  }, [gs.temple.waveNumber, bossPaused, spawnWaveDemonsLocal]);

  // ── Active defenses list ──
  const activeDefenses = [...DEFENSE_UPGRADES, ...UPGRADES].filter(
    (u) => u.defenseBonus && gs.owned.has(u.id)
  );

  const nextBossIn = isBossWave(currentWave)
    ? 0
    : (Math.ceil((currentWave + 1) / 10) * 10) - currentWave;

  return (
    <div style={{
      background: "radial-gradient(ellipse at 50% 40%, #2d1b2e 0%, #1a0a12 55%, #0d0509 100%)",
      borderRadius: 18, padding: "0", minHeight: "100vh",
      position: "relative", overflow: "hidden",
    }}>
      {/* Blossoms */}
      {BLOSSOMS.map((b, i) => (
        <div key={i} style={{
          position: "absolute", top: -10, left: b.left,
          width: b.size, height: b.size, borderRadius: "50%", background: b.color,
          animation: `blossom-fall ${b.duration} ease-in ${b.delay} infinite`,
          "--drift": b.drift, "--spin": b.spin, opacity: 0, pointerEvents: "none",
        } as React.CSSProperties} />
      ))}

      {/* Glow orb */}
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
        width: 350, height: 350, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(214,51,108,0.12) 0%, transparent 70%)",
        animation: "glow-pulse 2.5s ease-in-out infinite", pointerEvents: "none",
      }} />

      {/* Floating texts */}
      {floatingTexts.map((f) => (
        <div key={f.id} style={{
          position: "absolute", left: `${f.x}%`, top: "40%",
          color: f.color, fontSize: 16, fontWeight: 900, zIndex: 20,
          animation: "float-up 1.2s ease-out forwards", pointerEvents: "none",
          textShadow: `0 0 12px ${f.color}88`,
        }}>{f.text}</div>
      ))}

      {/* ═══ OFFLINE EARNINGS BANNER ═══ */}
      {offlineBanner && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 30,
          background: "linear-gradient(135deg, rgba(22,163,74,0.95), rgba(13,148,136,0.95))",
          padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: "2px solid rgba(74,222,128,0.3)",
          animation: "slide-down 0.4s ease-out",
          backdropFilter: "blur(8px)",
        }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
              While you were away ({offlineBanner.time})
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              {offlineBanner.gold > 0 && <span style={{ color: "#fbbf24", fontSize: 16, fontWeight: 900 }}>+{offlineBanner.gold} gold</span>}
              {offlineBanner.omamori > 0 && <span style={{ color: "#e879f9", fontSize: 16, fontWeight: 900 }}>+{offlineBanner.omamori} omamori</span>}
              {offlineBanner.kills > 0 && <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 700 }}>{offlineBanner.kills} demons slain</span>}
              {offlineBanner.waves > 0 && <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>{offlineBanner.waves} waves cleared</span>}
            </div>
          </div>
          <button onClick={() => setOfflineBanner(null)} style={{
            background: "rgba(255,255,255,0.15)", border: "none", color: "white",
            padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 12,
          }}>Dismiss</button>
        </div>
      )}

      {/* ═══ TOP HUD ═══ */}
      <div style={{
        padding: "18px 20px 12px", display: "flex", flexDirection: "column", gap: 10,
        position: "relative", zIndex: 10,
      }}>
        {/* Row 1: Wave + Resources */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              color: isBossWave(currentWave) ? "#e879f9" : "#d6336c",
              fontSize: 14, letterSpacing: 3, textTransform: "uppercase", fontWeight: 900,
              textShadow: isBossWave(currentWave) ? "0 0 20px rgba(232,121,249,0.5)" : "none",
            }}>
              {isBossWave(currentWave) ? `Boss Wave ${currentWave}` : `Wave ${currentWave}`}
            </div>
            {bossApproaching && !isBossWave(currentWave) && (
              <div style={{
                background: "rgba(232,121,249,0.15)", border: "1px solid rgba(232,121,249,0.3)",
                borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 800,
                color: "#e879f9", letterSpacing: 1,
                animation: "pulse-glow 1.5s ease-in-out infinite",
              }}>
                BOSS IN {nextBossIn}
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ color: "#fbbf24", fontSize: 14, fontWeight: 900 }}>
              <span style={{ fontSize: 16, marginRight: 3 }}>&#x1FA99;</span> {gs.coins}
            </div>
            <div style={{ color: "#e879f9", fontSize: 14, fontWeight: 900 }}>
              <span style={{ fontSize: 14, marginRight: 3 }}>&#x1F9FF;</span> {gs.omamori}
            </div>
          </div>
        </div>

        {/* Row 2: Temple HP bar */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ color: "#f0a8c8", fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>TEMPLE HP</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 800 }}>{Math.max(0, Math.round(templeHp))} / {maxHp}</span>
          </div>
          <HpBar current={templeHp} max={maxHp} color="#16a34a" height={10} />
        </div>

        {/* My Hero button */}
        <button
          onClick={() => setView("hero")}
          style={{
            marginTop: 8, background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6,
            color: "#fbbf24", padding: "4px 10px", fontSize: 10, fontWeight: 800,
            cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 4,
            alignSelf: "flex-start",
          }}
        >
          <span style={{ fontSize: 12 }}>⚔️</span> Hero
        </button>
      </div>

      {/* ═══ CENTER: TORII GATE + BATTLE ═══ */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "16px 20px 24px", position: "relative", zIndex: 5,
      }}>
        {/* Torii Gate */}
        <div style={{ marginBottom: 8 }}>
          <ToriiGate scale={0.7} shaking={templeShake} />
        </div>

        {/* Rebuild message — appears under temple when it falls */}
        {rebuildMsg && (
          <div style={{
            color: "#ef4444", fontSize: 13, fontWeight: 800, textAlign: "center",
            marginBottom: 10, letterSpacing: 1,
            textShadow: "0 0 12px rgba(239,68,68,0.5)",
            animation: "title-reveal 0.4s ease-out forwards",
          }}>
            Temple fell! Rebuilding to full HP...
          </div>
        )}

        {/* Battle status label */}
        <div style={{
          color: bossPaused ? "#e879f9" : "#d6336c",
          fontSize: 11, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase",
          marginBottom: 14,
          textShadow: bossPaused ? "0 0 20px rgba(232,121,249,0.4)" : "0 0 20px rgba(214,51,108,0.4)",
        }}>
          {bossPaused ? "Boss Encountered" : "Battle in Progress"}
        </div>

        {/* Demons grid */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", maxWidth: 600 }}>
          {demons.map((d) => {
            const dt = DEMON_TYPES.find((t) => t.id === d.typeId)!;
            const dead = d.hp <= 0;
            const isBoss = isBossWave(currentWave);
            return (
              <div key={d.id} style={{
                background: dead ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${dead ? "rgba(255,255,255,0.03)" : isBoss ? "rgba(232,121,249,0.35)" : "rgba(214,51,108,0.25)"}`,
                borderRadius: 14, padding: "14px 16px", textAlign: "center", opacity: dead ? 0.25 : 1,
                animation: damageFlash === d.id ? "hit-flash 0.2s ease-out" : (dead ? "none" : "demon-approach 0.5s ease-out"),
                transition: "opacity 0.3s",
                boxShadow: dead ? "none" : isBoss ? "0 0 24px rgba(232,121,249,0.15)" : "0 0 24px rgba(214,51,108,0.1)",
                minWidth: 100,
                backdropFilter: "blur(4px)",
              }}>
                <div style={{
                  fontSize: isBoss && !dead ? 44 : 32, marginBottom: 4,
                  filter: dead ? "grayscale(1)" : "none",
                  animation: isBoss && !dead ? "boss-pulse 2s ease-in-out infinite" : "none",
                }}>{dt.emoji}</div>
                <div style={{ color: dead ? "#555" : "rgba(255,255,255,0.9)", fontSize: 11, fontWeight: 800, marginBottom: 2 }}>{dt.name}</div>
                <div style={{ color: dead ? "#444" : "rgba(255,255,255,0.4)", fontSize: 9, marginBottom: 6 }}>{dt.nameEn}</div>
                {!dead && (
                  <div style={{ width: 80, margin: "0 auto" }}>
                    <HpBar current={d.hp} max={d.maxHp} color={isBoss ? "#e879f9" : "#d6336c"} height={5} />
                    <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 8, marginTop: 2 }}>
                      {d.hp}/{d.maxHp}
                    </div>
                  </div>
                )}
                {dead && <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 9, fontWeight: 700 }}>Defeated</div>}
              </div>
            );
          })}
        </div>

        {/* Boss encounter — battle stopped, player must challenge */}
        {bossPaused && (
          <div style={{
            marginTop: 24, textAlign: "center", padding: "28px 32px",
            background: "radial-gradient(ellipse at 50% 50%, rgba(232,121,249,0.12) 0%, rgba(232,121,249,0.03) 70%)",
            borderRadius: 18,
            border: "1px solid rgba(232,121,249,0.25)",
            animation: "boss-pulse 2s ease-in-out infinite",
          }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>
              {currentWave >= 90 ? "🐉" : currentWave >= 45 ? "🐉" : currentWave >= 21 ? "⚡" : currentWave >= 12 ? "👺" : "👹"}
            </div>
            <div style={{ color: "#e879f9", fontSize: 22, fontWeight: 900, fontFamily: "serif", marginBottom: 6, textShadow: "0 0 20px rgba(232,121,249,0.4)" }}>
              Boss Wave {currentWave}
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 20 }}>
              The waves are halted. Defeat the boss to continue!
            </div>
            <button
              onClick={() => onBossEncounter(currentWave)}
              className="btn-glow"
              style={{
                background: "linear-gradient(135deg, #c026d3, #7c3aed)",
                color: "white", border: "none",
                padding: "16px 40px", borderRadius: 14,
                fontSize: 16, fontWeight: 900, cursor: "pointer",
                fontFamily: "inherit", letterSpacing: 1,
                boxShadow: "0 6px 30px rgba(192,38,211,0.4)",
              }}
            >
              Challenge the Boss
            </button>
          </div>
        )}
      </div>

      {/* ═══ BOTTOM STATS ═══ */}
      <div style={{
        padding: "0 20px 20px", position: "relative", zIndex: 10,
      }}>
        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Waves", value: gs.temple.wavesCleared, icon: "🌊", color: "#2b79d6" },
            { label: "Kills", value: gs.temple.totalKills, icon: "👹", color: "#ef4444" },
            { label: "Gold Earned", value: gs.temple.totalGoldEarned, icon: "🪙", color: "#fbbf24" },
            { label: "Power", value: defensePower, icon: "🛡️", color: "#d6336c" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "linear-gradient(135deg,rgba(26,10,18,0.8),rgba(45,27,46,0.8))",
              borderRadius: 12, padding: "12px 8px", textAlign: "center",
              border: "1px solid rgba(214,51,108,0.12)",
            }}>
              <div style={{ fontSize: 18, marginBottom: 2 }}>{s.icon}</div>
              <div style={{ color: s.color, fontSize: 18, fontWeight: 900, fontFamily: "serif", textShadow: `0 0 10px ${s.color}33` }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, marginTop: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Active defenses */}
        {activeDefenses.length > 0 && (
          <div style={{
            background: "linear-gradient(135deg,rgba(26,10,18,0.8),rgba(45,27,46,0.8))",
            borderRadius: 14, padding: "14px 16px",
            border: "1px solid rgba(214,51,108,0.12)",
          }}>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 800, marginBottom: 10, letterSpacing: 2, textTransform: "uppercase" }}>
              Active Defenses
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {activeDefenses.map((u) => (
                <div key={u.id} style={{
                  background: "rgba(214,51,108,0.08)", borderRadius: 8,
                  padding: "5px 10px", display: "flex", alignItems: "center", gap: 6,
                  border: "1px solid rgba(214,51,108,0.12)",
                }}>
                  <span style={{ fontSize: 14 }}>{u.icon}</span>
                  <span style={{ color: "#fbbf24", fontSize: 10, fontWeight: 800 }}>+{u.defenseBonus}</span>
                </div>
              ))}
              {gs.hero.atk > 0 && (
                <div style={{
                  background: "rgba(214,51,108,0.08)", borderRadius: 8,
                  padding: "5px 10px", display: "flex", alignItems: "center", gap: 6,
                  border: "1px solid rgba(214,51,108,0.12)",
                }}>
                  <span style={{ fontSize: 14 }}>&#x2694;&#xFE0F;</span>
                  <span style={{ color: "#fbbf24", fontSize: 10, fontWeight: 800 }}>+{gs.hero.atk} hero</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Temple Upgrades Shop */}
        <TempleUpgradeShop gs={gs} setGs={setGs} />

        {/* ═══ AWAKENING SECTION ═══ */}
        <AwakeningSection gs={gs} setGs={setGs} showToast={showToast} />
      </div>

      {/* ═══ KEYFRAME STYLES ═══ */}
      <style>{`
        @keyframes slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes boss-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
        @keyframes temple-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        @keyframes hit-flash {
          0% { filter: brightness(2); }
          100% { filter: brightness(1); }
        }
        @keyframes demon-approach {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes float-up {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-60px); opacity: 0; }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
        }
        @keyframes blossom-fall {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          100% { transform: translateY(100vh) translateX(var(--drift)) rotate(var(--spin)); opacity: 0; }
        }
        @keyframes sparkle {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.4); }
        }
      `}</style>
    </div>
  );
}

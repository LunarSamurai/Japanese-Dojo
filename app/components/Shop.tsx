"use client";
import { useState, useRef, useCallback } from "react";
import type { GameState, Upgrade } from "../types";
import { UPGRADES } from "../data";
import { LOOT_BOXES, rollLootBox } from "../data/lootBoxes";
import { EQUIPMENT_SETS, SET_ITEMS, type SetEquipment } from "../data/equipmentSets";
import { PREMIUM_PACKS, type PremiumPack } from "../data/premiumPacks";

type ShopTab = "study" | "treasure" | "premium";

interface ShopProps {
  gs: GameState;
  setGs: (updater: GameState | ((prev: GameState) => GameState)) => void;
  buyUpgrade: (u: Upgrade) => void;
  showToast: (msg: string, type?: string) => void;
}

/* ────────────────────────────────────────────────────────────────────────
 *  RARITY HELPERS
 * ──────────────────────────────────────────────────────────────────────── */

const RARITY_COLORS: Record<string, string> = {
  rare: "#3b82f6",
  epic: "#a855f7",
  legendary: "#f59e0b",
};

const RARITY_GLOW: Record<string, string> = {
  rare: "0 0 10px rgba(59,130,246,0.5)",
  epic: "0 0 14px rgba(168,85,247,0.6)",
  legendary: "0 0 18px rgba(245,158,11,0.7)",
};

/* ────────────────────────────────────────────────────────────────────────
 *  MAIN SHOP COMPONENT
 * ──────────────────────────────────────────────────────────────────────── */

export function Shop({ gs, setGs, buyUpgrade, showToast }: ShopProps) {
  const [tab, setTab] = useState<ShopTab>("study");

  return (
    <div>
      {/* ── Tab Bar ── */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["study", "treasure", "premium"] as ShopTab[]).map((t) => {
          const active = tab === t;
          const label = t === "study" ? "Study" : t === "treasure" ? "Treasure" : "Premium";
          const icon = t === "study" ? "📖" : t === "treasure" ? "🎰" : "💎";
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "10px 22px",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 14,
                fontFamily: "inherit",
                cursor: "pointer",
                border: active ? "none" : "1px solid #d4c8ce",
                background: active
                  ? "linear-gradient(135deg, #c2255c, #7c3aed)"
                  : "#fff",
                color: active ? "#fff" : "#564a5e",
                transition: "all 0.2s",
                boxShadow: active ? "0 2px 12px rgba(194,37,92,0.3)" : "none",
              }}
            >
              {icon} {label}
            </button>
          );
        })}
      </div>

      {tab === "study" && <StudyTab gs={gs} buyUpgrade={buyUpgrade} />}
      {tab === "treasure" && <TreasureTab gs={gs} setGs={setGs} showToast={showToast} />}
      {tab === "premium" && <PremiumTab gs={gs} setGs={setGs} showToast={showToast} />}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 *  TAB 1: STUDY  (existing upgrade cards)
 * ════════════════════════════════════════════════════════════════════════ */

function StudyTab({ gs, buyUpgrade }: { gs: GameState; buyUpgrade: (u: Upgrade) => void }) {
  return (
    <div>
      <div style={{ color: "#1a1523", fontWeight: 900, fontSize: 22, fontFamily: "serif", marginBottom: 4 }}>
        Study Upgrades
      </div>
      <div style={{ color: "#564a5e", fontSize: 13, marginBottom: 16 }}>
        Spend coins to power up your studies ·{" "}
        <span style={{ color: "#d97706", fontWeight: 700 }}>🪙 {gs.coins}</span>
        <span style={{ color: "#8a7e92", marginLeft: 8, fontSize: 11 }}>Temple upgrades are in the Temple screen</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {UPGRADES.map((u) => {
          const owned = gs.owned.has(u.id);
          const can = gs.coins >= u.cost;
          return (
            <div
              key={u.id}
              className="card-hover"
              style={{
                background: "#ffffff",
                border: `1px solid ${owned ? "rgba(194,37,92,0.3)" : "#d4c8ce"}`,
                borderRadius: 12,
                padding: 16,
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 8 }}>{u.icon}</div>
              <div style={{ color: "#1a1523", fontWeight: 700, fontSize: 14 }}>{u.name}</div>
              <div style={{ color: "#7a6e84", fontSize: 10, marginBottom: 6 }}>{u.en}</div>
              <div style={{ color: "#6e6378", fontSize: 12, marginBottom: 14 }}>{u.desc}</div>
              <button
                onClick={() => buyUpgrade(u)}
                disabled={owned || !can}
                style={{
                  width: "100%",
                  padding: "8px 0",
                  borderRadius: 7,
                  fontWeight: 700,
                  cursor: owned || !can ? "not-allowed" : "pointer",
                  background: owned
                    ? "rgba(194,37,92,0.08)"
                    : can
                      ? "linear-gradient(135deg,#c2255c,#be185d)"
                      : "#f3f4f6",
                  color: owned ? "#c2255c" : can ? "#faf7f5" : "#c4a8b8",
                  border: `1px solid ${owned ? "rgba(194,37,92,0.25)" : can ? "transparent" : "#d4c8ce"}`,
                  fontFamily: "inherit",
                  fontSize: 13,
                  transition: "all 0.15s",
                }}
              >
                {owned ? "✓ Owned" : `🪙 ${u.cost}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 *  TAB 2: TREASURE  (loot boxes)
 * ════════════════════════════════════════════════════════════════════════ */

interface RevealItem {
  item: SetEquipment;
  setName?: string;
  isNew: boolean;
}

function TreasureTab({
  gs,
  setGs,
  showToast,
}: {
  gs: GameState;
  setGs: (updater: GameState | ((prev: GameState) => GameState)) => void;
  showToast: (msg: string, type?: string) => void;
}) {
  const [revealing, setRevealing] = useState(false);
  const [revealItems, setRevealItems] = useState<RevealItem[]>([]);
  const [animPhase, setAnimPhase] = useState<"flip" | "done">("done");

  const drawBox = useCallback(
    (boxId: string, count: number) => {
      const box = LOOT_BOXES.find((b) => b.id === boxId);
      if (!box) return;

      // Determine cost
      let cost = box.cost;
      const bulk = box.bulkOptions.find((b) => b.count === count);
      if (bulk) cost = bulk.totalCost;
      if (count === 1) cost = box.cost;

      if (gs.omamori < cost) {
        showToast("Not enough Omamori!", "shop");
        return;
      }

      // Build firstDrawUsed set from gs.owned
      const firstDrawUsed = new Set<string>();
      for (const lb of LOOT_BOXES) {
        if (gs.owned.has(`loot_first_${lb.id}`)) {
          firstDrawUsed.add(lb.id);
        }
      }

      const result = rollLootBox(box, count, gs.owned, firstDrawUsed);

      // Build reveal items
      const reveals: RevealItem[] = result.items.map((item) => {
        const set = item.setId
          ? EQUIPMENT_SETS.find((s) => s.id === item.setId)
          : undefined;
        return {
          item,
          setName: set ? set.nameEn : undefined,
          isNew: !gs.owned.has(item.id),
        };
      });

      // Update game state — apply consolation gold + omamori refund
      setGs((g) => {
        const newOwned = new Set(g.owned);
        for (const r of result.items) {
          newOwned.add(r.id);
        }
        if (result.isFirstDraw) {
          newOwned.add(`loot_first_${box.id}`);
        }
        return {
          ...g,
          omamori: g.omamori - cost + result.omamoriRefund,
          coins: g.coins + result.consolationGold,
          owned: newOwned,
        };
      });

      // Show consolation rewards
      if (result.consolationGold > 0) {
        setTimeout(() => showToast(`Consolation: +${result.consolationGold.toLocaleString()} 🪙`, "xp"), 500);
      }
      if (result.omamoriRefund > 0) {
        setTimeout(() => showToast(`Lucky! +${result.omamoriRefund} 🏮 refunded!`, "perfect"), 1000);
      }

      // Trigger reveal animation
      setRevealItems(reveals);
      setAnimPhase("flip");
      setRevealing(true);
      setTimeout(() => setAnimPhase("done"), 800);

      const setItems = result.items.filter((i) => i.setId);
      if (setItems.length > 0) {
        const rarest = setItems.sort((a, b) => {
          const order = { rare: 0, epic: 1, legendary: 2 };
          return order[b.rarity] - order[a.rarity];
        })[0];
        showToast(`${rarest.icon} ${rarest.nameEn} obtained!`, "xp");
      } else {
        showToast(`Opened ${count}x ${box.nameEn}!`, "shop");
      }
    },
    [gs, setGs, showToast],
  );

  return (
    <div>
      {/* Omamori balance */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ color: "#1a1523", fontWeight: 900, fontSize: 22, fontFamily: "serif" }}>
            Treasure Hall
          </div>
          <div style={{ color: "#564a5e", fontSize: 12, marginTop: 2 }}>
            Draw loot boxes with Omamori to find set equipment
          </div>
        </div>
        <div
          style={{
            background: "linear-gradient(135deg, #7c3aed22, #c2255c22)",
            border: "1px solid #7c3aed44",
            borderRadius: 10,
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 20 }}>🏮</span>
          <span style={{ color: "#c2255c", fontWeight: 800, fontSize: 18 }}>{gs.omamori}</span>
          <span style={{ color: "#564a5e", fontSize: 11 }}>Omamori</span>
        </div>
      </div>

      {/* Loot Box Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {LOOT_BOXES.map((box) => {
          const firstDrawAvailable = !gs.owned.has(`loot_first_${box.id}`) && box.guaranteedFirstDraw;
          return (
            <div
              key={box.id}
              style={{
                background: "#ffffff",
                border: "1px solid #d4c8ce",
                borderRadius: 14,
                padding: 18,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {firstDrawAvailable && (
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                    color: "#000",
                    fontSize: 9,
                    fontWeight: 800,
                    padding: "3px 8px",
                    borderRadius: 6,
                    letterSpacing: 0.5,
                  }}
                >
                  GUARANTEED!
                </div>
              )}

              <div style={{ fontSize: 32, marginBottom: 8 }}>{box.icon}</div>
              <div style={{ color: "#1a1523", fontWeight: 700, fontSize: 15 }}>{box.name}</div>
              <div style={{ color: "#7a6e84", fontSize: 10, marginBottom: 2 }}>{box.nameEn}</div>
              <div style={{ color: "#6e6378", fontSize: 11, marginBottom: 14, lineHeight: 1.4 }}>
                {box.description}
              </div>

              {/* Draw buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {/* Draw 1 */}
                <button
                  onClick={() => drawBox(box.id, 1)}
                  disabled={gs.omamori < box.cost}
                  style={{
                    width: "100%",
                    padding: "8px 0",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 12,
                    fontFamily: "inherit",
                    cursor: gs.omamori < box.cost ? "not-allowed" : "pointer",
                    background:
                      gs.omamori >= box.cost
                        ? "linear-gradient(135deg, #c2255c, #7c3aed)"
                        : "#f3f4f6",
                    color: gs.omamori >= box.cost ? "#fff" : "#c4a8b8",
                    border: `1px solid ${gs.omamori >= box.cost ? "transparent" : "#d4c8ce"}`,
                    transition: "all 0.15s",
                  }}
                >
                  Draw 1 · 🏮 {box.cost}
                </button>

                {/* Draw 10 */}
                {box.bulkOptions[0] && (
                  <button
                    onClick={() => drawBox(box.id, box.bulkOptions[0].count)}
                    disabled={gs.omamori < box.bulkOptions[0].totalCost}
                    style={{
                      width: "100%",
                      padding: "8px 0",
                      borderRadius: 8,
                      fontWeight: 700,
                      fontSize: 12,
                      fontFamily: "inherit",
                      cursor: gs.omamori < box.bulkOptions[0].totalCost ? "not-allowed" : "pointer",
                      background:
                        gs.omamori >= box.bulkOptions[0].totalCost
                          ? "linear-gradient(135deg, #c2255c, #be185d)"
                          : "#f3f4f6",
                      color: gs.omamori >= box.bulkOptions[0].totalCost ? "#fff" : "#564a5e",
                      border: `1px solid ${gs.omamori >= box.bulkOptions[0].totalCost ? "#c2255c" : "#d4c8ce"}`,
                      transition: "all 0.15s",
                      position: "relative",
                    }}
                  >
                    Draw {box.bulkOptions[0].count} · 🏮 {box.bulkOptions[0].totalCost}
                    <span
                      style={{
                        marginLeft: 6,
                        background: "#f59e0b33",
                        color: "#f59e0b",
                        fontSize: 9,
                        padding: "1px 5px",
                        borderRadius: 4,
                        fontWeight: 800,
                      }}
                    >
                      {box.bulkOptions[0].chance}% set chance!
                    </span>
                  </button>
                )}

                {/* Draw 100 */}
                {box.bulkOptions[1] && (
                  <button
                    onClick={() => drawBox(box.id, box.bulkOptions[1].count)}
                    disabled={gs.omamori < box.bulkOptions[1].totalCost}
                    style={{
                      width: "100%",
                      padding: "8px 0",
                      borderRadius: 8,
                      fontWeight: 700,
                      fontSize: 12,
                      fontFamily: "inherit",
                      cursor: gs.omamori < box.bulkOptions[1].totalCost ? "not-allowed" : "pointer",
                      background:
                        gs.omamori >= box.bulkOptions[1].totalCost
                          ? "linear-gradient(135deg, #f59e0b, #d97706)"
                          : "#f3f4f6",
                      color: gs.omamori >= box.bulkOptions[1].totalCost ? "#000" : "#564a5e",
                      border: `1px solid ${gs.omamori >= box.bulkOptions[1].totalCost ? "#f59e0b" : "#d4c8ce"}`,
                      transition: "all 0.15s",
                    }}
                  >
                    Draw {box.bulkOptions[1].count} · 🏮 {box.bulkOptions[1].totalCost}
                    <span
                      style={{
                        marginLeft: 6,
                        background: "#f59e0b33",
                        color: "#f59e0b",
                        fontSize: 9,
                        padding: "1px 5px",
                        borderRadius: 4,
                        fontWeight: 800,
                      }}
                    >
                      {box.bulkOptions[1].chance}% set chance!
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Reveal Overlay ── */}
      {revealing && revealItems.length > 0 && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
          onClick={() => {
            if (animPhase === "done") setRevealing(false);
          }}
        >
          <div style={{ color: "#1a1523", fontWeight: 900, fontSize: 22, fontFamily: "serif", marginBottom: 20 }}>
            {revealItems.length === 1 ? "You received:" : `${revealItems.length} items obtained!`}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
              maxWidth: 700,
              maxHeight: "60vh",
              overflowY: "auto",
            }}
          >
            {revealItems.map((r, i) => {
              const glow = RARITY_GLOW[r.item.rarity] ?? "none";
              const color = RARITY_COLORS[r.item.rarity] ?? "#9ca3af";
              return (
                <div
                  key={`${r.item.id}-${i}`}
                  style={{
                    background: "linear-gradient(145deg, #1e1028, #140a1a)",
                    border: `2px solid ${color}`,
                    borderRadius: 12,
                    padding: 14,
                    width: revealItems.length === 1 ? 200 : 130,
                    textAlign: "center",
                    boxShadow: glow,
                    transform: animPhase === "flip" ? "rotateY(180deg) scale(0.8)" : "rotateY(0deg) scale(1)",
                    opacity: animPhase === "flip" ? 0.3 : 1,
                    transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
                    transitionDelay: `${i * 50}ms`,
                  }}
                >
                  <div style={{ fontSize: revealItems.length === 1 ? 36 : 26, marginBottom: 6 }}>
                    {r.item.icon}
                  </div>
                  <div
                    style={{
                      color,
                      fontWeight: 700,
                      fontSize: revealItems.length === 1 ? 14 : 11,
                      textTransform: "capitalize",
                      marginBottom: 2,
                    }}
                  >
                    {r.item.rarity}
                  </div>
                  <div style={{ color: "#1a1523", fontWeight: 700, fontSize: revealItems.length === 1 ? 14 : 11 }}>
                    {r.item.nameEn}
                  </div>
                  {r.isNew && (
                    <div
                      style={{
                        color: "#10b981",
                        fontSize: 9,
                        fontWeight: 800,
                        marginTop: 4,
                        letterSpacing: 0.5,
                      }}
                    >
                      NEW!
                    </div>
                  )}
                  {r.setName && (
                    <div
                      style={{
                        color: "#a78bfa",
                        fontSize: 9,
                        marginTop: 4,
                        fontStyle: "italic",
                      }}
                    >
                      Part of {r.setName}!
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {animPhase === "done" && (
            <div style={{ color: "#8a7e92", fontSize: 12, marginTop: 16 }}>Click anywhere to close</div>
          )}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 *  TAB 3: PREMIUM  (omamori packs — Stripe coming soon)
 * ════════════════════════════════════════════════════════════════════════ */

function PremiumTab({
  gs,
  setGs,
  showToast,
}: {
  gs: GameState;
  setGs: (updater: GameState | ((prev: GameState) => GameState)) => void;
  showToast: (msg: string, type?: string) => void;
}) {
  const pressTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const handlePressStart = (pack: PremiumPack) => {
    pressTimers.current[pack.id] = setTimeout(() => {
      // Dev-mode simulate purchase after 3-second hold
      const bonus = Math.floor(pack.omamoriAmount * (pack.bonusPercent / 100));
      const total = pack.omamoriAmount + bonus;
      setGs((g) => ({
        ...g,
        omamori: g.omamori + total,
      }));
      showToast(`[DEV] +${total} 🏮 Omamori from ${pack.nameEn}!`, "xp");
    }, 3000);
  };

  const handlePressEnd = (packId: string) => {
    if (pressTimers.current[packId]) {
      clearTimeout(pressTimers.current[packId]);
      delete pressTimers.current[packId];
    }
  };

  return (
    <div
      style={{

      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ color: "#1a1523", fontWeight: 900, fontSize: 22, fontFamily: "serif" }}>
            Premium Omamori
          </div>
          <div style={{ color: "#564a5e", fontSize: 12, marginTop: 2 }}>
            Support the dojo and power up your journey
          </div>
        </div>
        <div
          style={{
            background: "linear-gradient(135deg, #f59e0b22, #d9770622)",
            border: "1px solid #f59e0b44",
            borderRadius: 10,
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 20 }}>🏮</span>
          <span style={{ color: "#c2255c", fontWeight: 800, fontSize: 18 }}>{gs.omamori}</span>
        </div>
      </div>

      {/* Pack Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {PREMIUM_PACKS.map((pack) => {
          const bonus = Math.floor(pack.omamoriAmount * (pack.bonusPercent / 100));
          const total = pack.omamoriAmount + bonus;
          return (
            <div
              key={pack.id}
              onMouseDown={() => handlePressStart(pack)}
              onMouseUp={() => handlePressEnd(pack.id)}
              onMouseLeave={() => handlePressEnd(pack.id)}
              onTouchStart={() => handlePressStart(pack)}
              onTouchEnd={() => handlePressEnd(pack.id)}
              style={{
                background: "#ffffff",
                border: `1px solid ${
                  pack.featured ? "rgba(245,158,11,0.4)" : pack.bestValue ? "rgba(16,185,129,0.4)" : "#d4c8ce"
                }`,
                borderRadius: 14,
                padding: 18,
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                userSelect: "none",
              }}
            >
              {/* Badges */}
              {pack.bestValue && (
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "#fff",
                    fontSize: 9,
                    fontWeight: 800,
                    padding: "3px 8px",
                    borderRadius: 6,
                    letterSpacing: 0.5,
                  }}
                >
                  BEST VALUE
                </div>
              )}
              {pack.featured && !pack.bestValue && (
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                    color: "#000",
                    fontSize: 9,
                    fontWeight: 800,
                    padding: "3px 8px",
                    borderRadius: 6,
                    letterSpacing: 0.5,
                  }}
                >
                  FEATURED
                </div>
              )}

              <div style={{ fontSize: 32, marginBottom: 8 }}>{pack.icon}</div>
              <div style={{ color: "#1a1523", fontWeight: 700, fontSize: 15 }}>{pack.name}</div>
              <div style={{ color: "#7a6e84", fontSize: 10, marginBottom: 8 }}>{pack.nameEn}</div>

              {/* Omamori amount */}
              <div style={{ color: "#d4a574", fontSize: 13, marginBottom: 8, fontWeight: 600 }}>
                {bonus > 0 ? (
                  <>
                    {pack.omamoriAmount} + {bonus} bonus = {total} 🏮
                  </>
                ) : (
                  <>
                    {pack.omamoriAmount} 🏮
                  </>
                )}
              </div>

              {/* Bonus percentage */}
              {pack.bonusPercent > 0 && (
                <div style={{ color: "#10b981", fontSize: 10, marginBottom: 10, fontWeight: 700 }}>
                  +{pack.bonusPercent}% bonus Omamori
                </div>
              )}

              {/* Price */}
              <div style={{ color: "#f59e0b", fontWeight: 900, fontSize: 22, marginBottom: 10, fontFamily: "serif" }}>
                ${pack.price.toFixed(2)}
              </div>

              {/* Purchase button — disabled */}
              <button
                disabled
                style={{
                  width: "100%",
                  padding: "10px 0",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 12,
                  fontFamily: "inherit",
                  cursor: "not-allowed",
                  background: "#f3f4f6",
                  color: "#564a5e",
                  border: "1px solid #d4c8ce",
                  transition: "all 0.15s",
                }}
              >
                Coming Soon
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          color: "#564a5e",
          fontSize: 11,
          marginTop: 20,
          paddingTop: 16,
          borderTop: "1px solid #d4c8ce",
        }}
      >
        Payments powered by Stripe · Coming Soon
      </div>
    </div>
  );
}

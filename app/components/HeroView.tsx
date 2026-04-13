"use client";
import { useMemo, useState, useCallback, useRef } from "react";
import type { GameState, HeroEquipment, HeroState } from "../types";
import { HERO_EQUIPMENT } from "../data/heroEquipment";
import { SET_ITEMS, getActiveSetBonus, getItemSet, SetEquipment } from "../data/equipmentSets";

interface HeroViewProps {
  gs: GameState;
  setGs: (updater: GameState | ((prev: GameState) => GameState)) => void;
  showToast: (msg: string, type?: string) => void;
  setView: (v: import("../types").View) => void;
}

const SLOT_LABELS: Record<string, { label: string; jp: string; icon: string }> = {
  sword: { label: "Sword", jp: "刀", icon: "🗡️" },
  armor: { label: "Armor", jp: "鎧", icon: "🛡️" },
  charm: { label: "Charm", jp: "お守り", icon: "📿" },
};

const STAT_META: Record<string, { label: string; jp: string; color: string; icon: string }> = {
  atk: { label: "ATK", jp: "攻撃", color: "#ef4444", icon: "⚔️" },
  def: { label: "DEF", jp: "防御", color: "#3b82f6", icon: "🛡️" },
  hp:  { label: "HP",  jp: "体力", color: "#22c55e", icon: "❤️" },
};

const RARITY_COLORS: Record<string, string> = {
  rare: "#3b82f6",
  epic: "#8b5cf6",
  legendary: "#fbbf24",
};

const SECONDARY_LABELS: Record<string, { label: string; color: string }> = {
  goldBonus: { label: "Gold Bonus", color: "#fbbf24" },
  lifesteal: { label: "Lifesteal", color: "#ef4444" },
  xpBonus: { label: "XP Bonus", color: "#8b5cf6" },
  atkBonus: { label: "ATK Bonus", color: "#ef4444" },
  defBonus: { label: "DEF Bonus", color: "#3b82f6" },
  hpBonus: { label: "HP Bonus", color: "#22c55e" },
};

function getLevelUpCost(statValue: number): number {
  return Math.max(1, Math.floor(statValue / 5));
}

interface SetItemExtended extends HeroEquipment {
  rarity?: string;
  setId?: string;
}

function isSetItem(item: HeroEquipment): item is SetItemExtended {
  return "rarity" in item && "setId" in item;
}

function getItemRarityColor(item: HeroEquipment): string | null {
  if (isSetItem(item) && item.rarity) {
    return RARITY_COLORS[item.rarity] ?? null;
  }
  return null;
}

interface TooltipState {
  item: HeroEquipment;
  x: number;
  y: number;
}

export function HeroView({ gs, setGs, showToast, setView }: HeroViewProps) {
  const { hero } = gs;
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  // Merge regular items with owned set items
  const allItems = useMemo(() => {
    const ownedSetItems = SET_ITEMS.filter((i) => gs.owned.has(i.id));
    return [...HERO_EQUIPMENT, ...ownedSetItems];
  }, [gs.owned]);

  const equippedItems = useMemo(() => {
    const map: Record<string, HeroEquipment | null> = { sword: null, armor: null, charm: null };
    for (const slot of ["sword", "armor", "charm"] as const) {
      const eqId = hero[slot];
      if (eqId) {
        map[slot] = allItems.find((e) => e.id === eqId) ?? null;
      }
    }
    return map;
  }, [hero, allItems]);

  const equippedLegendary = useMemo(() => {
    const map: Record<string, HeroEquipment | null> = { sword: null, armor: null, charm: null };
    const legendarySlotMap: Record<string, "legendarySword" | "legendaryArmor" | "legendaryCharm"> = {
      sword: "legendarySword", armor: "legendaryArmor", charm: "legendaryCharm",
    };
    for (const slot of ["sword", "armor", "charm"] as const) {
      const eqId = hero[legendarySlotMap[slot]];
      if (eqId) {
        map[slot] = allItems.find((e) => e.id === eqId) ?? null;
      }
    }
    return map;
  }, [hero, allItems]);

  const equipmentBonuses = useMemo(() => {
    const bonuses = { atk: 0, def: 0, hp: 0 };
    for (const item of Object.values(equippedItems)) {
      if (item) bonuses[item.stat] += item.bonus;
    }
    for (const item of Object.values(equippedLegendary)) {
      if (item) bonuses[item.stat] += item.bonus;
    }
    return bonuses;
  }, [equippedItems, equippedLegendary]);

  // Check active set bonus
  const activeSetBonus = useMemo(() => {
    return getActiveSetBonus(hero.legendarySword, hero.legendaryArmor, hero.legendaryCharm);
  }, [hero.legendarySword, hero.legendaryArmor, hero.legendaryCharm]);

  // Check partial set progress
  const partialSetInfo = useMemo(() => {
    const equippedIds = [hero.legendarySword, hero.legendaryArmor, hero.legendaryCharm].filter(Boolean) as string[];
    if (equippedIds.length === 0) return null;

    // Check each equipped item to see if it belongs to a set
    for (const eqId of equippedIds) {
      const setInfo = getItemSet(eqId);
      if (setInfo) {
        const setPieceIds = setInfo.items;
        const equippedSetPieces = equippedIds.filter((id) => setPieceIds.includes(id));
        if (equippedSetPieces.length < 3) {
          const missingItems = SET_ITEMS.filter((si) => setInfo.items.includes(si.id) && !equippedIds.includes(si.id));
          const missingSlots = missingItems.map((si) => si.slot);
          return {
            setName: setInfo.name,
            setIcon: setInfo.icon,
            equipped: equippedSetPieces.length,
            total: 3,
            missingSlots,
          };
        }
      }
    }
    return null;
  }, [hero.sword, hero.armor, hero.charm]);

  const totalAtk = hero.atk + equipmentBonuses.atk;
  const totalDef = hero.def + equipmentBonuses.def;
  const totalHp = hero.maxHp + equipmentBonuses.hp;
  const totalPower = totalAtk + totalDef + totalHp;

  const levelUpStat = (stat: "atk" | "def" | "hp") => {
    const baseVal = stat === "hp" ? hero.maxHp : hero[stat];
    const cost = getLevelUpCost(baseVal);
    if (gs.omamori < cost) {
      showToast("Not enough omamori!", "error");
      return;
    }
    setGs((prev) => ({
      ...prev,
      omamori: prev.omamori - cost,
      hero: {
        ...prev.hero,
        ...(stat === "hp"
          ? { maxHp: prev.hero.maxHp + 5, hp: prev.hero.hp + 5 }
          : { [stat]: prev.hero[stat] + 3 }),
      },
    }));
    const statLabel = STAT_META[stat].label;
    showToast(`${statLabel} increased!`, "success");
  };

  // Determine which hero slot to use: set items go to legendary slots, base items to base slots
  const getSlotKey = (item: HeroEquipment): string => {
    if (isSetItem(item) && item.setId) {
      // Set items go to legendary slots
      const slotMap = { sword: "legendarySword", armor: "legendaryArmor", charm: "legendaryCharm" };
      return slotMap[item.slot] || item.slot;
    }
    return item.slot; // base items go to base slots
  };

  const buyAndEquip = (item: HeroEquipment) => {
    if (gs.omamori < item.cost) {
      showToast("Not enough omamori!", "error");
      return;
    }
    const slotKey = getSlotKey(item);
    setGs((prev) => ({
      ...prev,
      omamori: prev.omamori - item.cost,
      owned: new Set([...prev.owned, item.id]),
      hero: { ...prev.hero, [slotKey]: item.id },
    }));
    showToast(`${item.icon} ${item.nameEn} acquired!`, "shop");
  };

  const equipItem = (item: HeroEquipment) => {
    const slotKey = getSlotKey(item);
    setGs((prev) => ({
      ...prev,
      hero: { ...prev.hero, [slotKey]: item.id },
    }));
    showToast(`${item.icon} ${item.nameEn} equipped!`, "success");
  };

  // Hover-for-details handlers
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHover = useCallback((item: HeroEquipment, e: React.MouseEvent) => {
    if (hoverTimerRef.current) { clearTimeout(hoverTimerRef.current); hoverTimerRef.current = null; }
    setTooltip({ item, x: e.clientX, y: e.clientY });
  }, []);

  const handleHoverEnd = useCallback(() => {
    // Delay hiding so user can read the tooltip
    hoverTimerRef.current = setTimeout(() => setTooltip(null), 800);
  }, []);

  const cardBg = "rgba(255,255,255,0.05)";
  const pink = "#c2255c";
  const gold = "#fbbf24";

  // Build a tooltip overlay for hold-for-details
  const renderTooltip = () => {
    if (!tooltip) return null;
    const { item, x, y } = tooltip;
    const rarityColor = getItemRarityColor(item);
    const setInfo = isSetItem(item) && item.setId ? getItemSet(item.id) : null;

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        <div
          onMouseEnter={() => { if (hoverTimerRef.current) { clearTimeout(hoverTimerRef.current); hoverTimerRef.current = null; } }}
          onMouseLeave={handleHoverEnd}
          style={{
            position: "absolute",
            left: Math.min(x, window.innerWidth - 260),
            pointerEvents: "auto",
            top: Math.max(10, y - 220),
            width: 240,
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${rarityColor ?? "rgba(255,255,255,0.15)"}`,
            borderRadius: 14,
            padding: 16,
            color: "white",
            boxShadow: rarityColor
              ? `0 0 20px rgba(${rarityColor}, 0.3), 0 8px 32px rgba(0,0,0,0.5)`
              : "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {/* Rarity badge */}
          {isSetItem(item) && item.rarity && (
            <div style={{
              display: "inline-block",
              padding: "2px 8px",
              borderRadius: 6,
              fontSize: 9,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 8,
              background: `${RARITY_COLORS[item.rarity]}22`,
              color: RARITY_COLORS[item.rarity],
              border: `1px solid ${RARITY_COLORS[item.rarity]}44`,
            }}>
              {item.rarity}
            </div>
          )}

          <div style={{ fontSize: 28, marginBottom: 6 }}>{item.icon}</div>
          <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 2 }}>{item.name}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>{item.nameEn}</div>

          <div style={{
            fontSize: 12,
            color: STAT_META[item.stat].color,
            fontWeight: 700,
            marginBottom: 4,
          }}>
            +{item.bonus} {STAT_META[item.stat].label}
          </div>

          {/* Secondary stat in tooltip */}
          {isSetItem(item) && (item as SetEquipment).secondaryStat && (item as SetEquipment).secondaryValue && (() => {
            const si = item as SetEquipment;
            const secLabel = SECONDARY_LABELS[si.secondaryStat!];
            return secLabel ? (
              <div style={{
                fontSize: 11,
                color: secLabel.color,
                fontWeight: 600,
                marginBottom: 8,
              }}>
                Secondary: +{si.secondaryValue}% {secLabel.label}
              </div>
            ) : null;
          })()}

          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
            {item.description}
          </div>

          {/* Set info */}
          {setInfo && (
            <div style={{
              marginTop: 8,
              paddingTop: 8,
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: gold, marginBottom: 4 }}>
                {setInfo.icon} {setInfo.name}
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
                Set pieces:
              </div>
              {SET_ITEMS.filter((si) => setInfo.items.includes(si.id)).map((p) => (
                <div key={p.id} style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginLeft: 8 }}>
                  {p.icon} {p.nameEn} ({p.slot})
                </div>
              ))}
              <div style={{
                marginTop: 6,
                fontSize: 10,
                color: gold,
                fontWeight: 600,
              }}>
                Set Bonus: {setInfo.bonusDescription}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render an equipment item card
  const renderItemCard = (item: HeroEquipment, slot: "sword" | "armor" | "charm") => {
    const isOwned = gs.owned.has(item.id);
    const legendarySlots: Record<string, "legendarySword" | "legendaryArmor" | "legendaryCharm"> = {
      sword: "legendarySword", armor: "legendaryArmor", charm: "legendaryCharm",
    };
    const isEquipped = hero[slot] === item.id || hero[legendarySlots[slot]] === item.id;
    const canAfford = gs.omamori >= item.cost;
    const rarityColor = getItemRarityColor(item);
    const isSet = isSetItem(item);

    let btnLabel: string;
    let btnDisabled: boolean;
    let btnAction: (() => void) | undefined;
    if (isEquipped) {
      btnLabel = "Equipped \u2713";
      btnDisabled = true;
    } else if (isOwned) {
      btnLabel = "Equip";
      btnDisabled = false;
      btnAction = () => equipItem(item);
    } else {
      btnLabel = `Buy ${item.cost} 🏵️`;
      btnDisabled = !canAfford;
      btnAction = canAfford ? () => buyAndEquip(item) : undefined;
    }

    return (
      <div
        key={item.id}
        onMouseEnter={(e) => handleHover(item, e)}
        onMouseLeave={handleHoverEnd}
        style={{
          minWidth: 130,
          position: "relative",
          background: isEquipped
            ? "rgba(194,37,92,0.12)"
            : rarityColor
              ? `${rarityColor}0a`
              : "rgba(255,255,255,0.03)",
          border: isEquipped
            ? `1px solid ${pink}`
            : rarityColor
              ? `1px solid ${rarityColor}66`
              : "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12,
          padding: 12,
          textAlign: "center",
          flex: "0 0 auto",
          boxShadow: rarityColor
            ? `0 0 12px ${rarityColor}30`
            : "none",
          cursor: "default",
          userSelect: "none",
        }}
      >
        {/* Set icon badge in corner */}
        {isSet && isSetItem(item) && item.setId && (
          <div style={{
            position: "absolute",
            top: 4,
            right: 4,
            width: 18,
            height: 18,
            borderRadius: 5,
            background: `${rarityColor ?? gold}22`,
            border: `1px solid ${rarityColor ?? gold}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
          }}>
            {(() => {
              const si = getItemSet(item.id);
              return si?.icon ?? "✦";
            })()}
          </div>
        )}

        <div style={{ fontSize: 26, marginBottom: 4 }}>{item.icon}</div>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 1 }}>{item.name}</div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>
          {item.nameEn}
        </div>

        {/* "Set" label for set items */}
        {isSet && (
          <div style={{
            fontSize: 8,
            fontWeight: 700,
            letterSpacing: 0.5,
            color: rarityColor ?? gold,
            marginBottom: 2,
            textTransform: "uppercase",
          }}>
            Set
          </div>
        )}

        <div
          style={{
            fontSize: 10,
            color: STAT_META[item.stat].color,
            fontWeight: 700,
            marginBottom: 2,
          }}
        >
          +{item.bonus} {STAT_META[item.stat].label}
        </div>
        {/* Secondary stat on card */}
        {isSet && isSetItem(item) && (item as SetEquipment).secondaryStat && (item as SetEquipment).secondaryValue && (() => {
          const si = item as SetEquipment;
          const secLabel = SECONDARY_LABELS[si.secondaryStat!];
          return secLabel ? (
            <div style={{
              fontSize: 8,
              color: secLabel.color,
              fontWeight: 600,
              marginBottom: 2,
            }}>
              +{si.secondaryValue}% {secLabel.label}
            </div>
          ) : null;
        })()}
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>
          {item.description}
        </div>
        <button
          onClick={btnAction}
          disabled={btnDisabled}
          style={{
            width: "100%",
            padding: "5px 0",
            borderRadius: 7,
            border: "none",
            cursor: btnDisabled ? "default" : "pointer",
            background: isEquipped
              ? "rgba(194,37,92,0.25)"
              : !btnDisabled
                ? `linear-gradient(135deg, ${pink}, #9b59b6)`
                : "rgba(255,255,255,0.06)",
            color: isEquipped
              ? pink
              : !btnDisabled
                ? "white"
                : "rgba(255,255,255,0.25)",
            fontSize: 10,
            fontWeight: 700,
            fontFamily: "inherit",
            transition: "all 0.15s",
          }}
        >
          {btnLabel}
        </button>
      </div>
    );
  };

  return (
    <div
      style={{
        background: "radial-gradient(ellipse at 50% 30%, #1e293b 0%, #0f172a 55%, #020617 100%)",
        borderRadius: 20,
        padding: "32px 28px",
        minHeight: "calc(100vh - 56px)",
        color: "white",
      }}
    >
      {/* Tooltip overlay */}
      {renderTooltip()}

      {/* Header with omamori balance */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, letterSpacing: 0.5 }}>
            <span style={{ color: pink }}>侍</span> Your Samurai
          </h1>
          <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
            Train your hero, equip legendary gear, defend the temple
          </p>
        </div>
        <div
          style={{
            background: "rgba(251,191,36,0.12)",
            border: "1px solid rgba(251,191,36,0.25)",
            borderRadius: 14,
            padding: "10px 18px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 20 }}>🏵️</span>
          <div>
            <div style={{ color: gold, fontSize: 18, fontWeight: 800 }}>{gs.omamori}</div>
            <div style={{ color: "rgba(251,191,36,0.6)", fontSize: 9, letterSpacing: 1 }}>OMAMORI</div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={() => setView("temple")} style={{
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.6)", padding: "8px 16px", borderRadius: 8,
          fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <span style={{ fontSize: 14 }}>⛩️</span> Back to Temple
        </button>
        <button onClick={() => setView("skilltree")} className="btn-glow" style={{
          background: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(251,191,36,0.05))",
          border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24",
          padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6,
        }}>
          <span style={{ fontSize: 14 }}>🌳</span> Skill Tree
          {gs.awakening.skillPoints > 0 && (
            <span style={{
              background: "#fbbf24", color: "#1a1523", fontSize: 9, fontWeight: 900,
              padding: "1px 6px", borderRadius: 999, marginLeft: 2,
            }}>
              {gs.awakening.skillPoints}
            </span>
          )}
        </button>
      </div>

      {/* Hero display */}
      <div
        style={{
          textAlign: "center",
          padding: "28px 0 20px",
          marginBottom: 24,
          background: cardBg,
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ fontSize: 64, lineHeight: 1, marginBottom: 8 }}>⚔️🥷</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: pink }}>武士</div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 2 }}>Samurai Warrior</div>
        <div
          style={{
            marginTop: 14,
            display: "inline-flex",
            gap: 6,
            background: "rgba(255,255,255,0.03)",
            borderRadius: 10,
            padding: "6px 16px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span style={{ color: "#ef4444", fontWeight: 700, fontSize: 12 }}>ATK {totalAtk}</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <span style={{ color: "#3b82f6", fontWeight: 700, fontSize: 12 }}>DEF {totalDef}</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <span style={{ color: "#22c55e", fontWeight: 700, fontSize: 12 }}>HP {totalHp}</span>
        </div>
      </div>

      {/* Stats panel */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 15, fontWeight: 800, marginBottom: 12, color: "rgba(255,255,255,0.7)" }}>
          Base Stats
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {(["atk", "def", "hp"] as const).map((stat) => {
            const meta = STAT_META[stat];
            const baseVal = stat === "hp" ? hero.maxHp : hero[stat];
            const eqBonus = equipmentBonuses[stat];
            const cost = getLevelUpCost(baseVal);
            return (
              <div
                key={stat}
                style={{
                  background: cardBg,
                  borderRadius: 14,
                  padding: 16,
                  border: "1px solid rgba(255,255,255,0.06)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 4 }}>{meta.icon}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: 1, marginBottom: 2 }}>
                  {meta.jp}
                </div>
                <div style={{ color: meta.color, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>
                  {meta.label}
                </div>
                <div style={{ fontSize: 28, fontWeight: 900, color: "white", lineHeight: 1 }}>{baseVal}</div>
                {eqBonus > 0 && (
                  <div style={{ color: gold, fontSize: 11, fontWeight: 600, marginTop: 2 }}>
                    +{eqBonus} equip
                  </div>
                )}
                <button
                  onClick={() => levelUpStat(stat)}
                  disabled={gs.omamori < cost}
                  style={{
                    marginTop: 10,
                    width: "100%",
                    padding: "7px 0",
                    borderRadius: 8,
                    border: "none",
                    cursor: gs.omamori >= cost ? "pointer" : "not-allowed",
                    background: gs.omamori >= cost
                      ? `linear-gradient(135deg, ${pink}, #9b59b6)`
                      : "rgba(255,255,255,0.08)",
                    color: gs.omamori >= cost ? "white" : "rgba(255,255,255,0.3)",
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}
                >
                  Level Up ({cost} 🏵️)
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Equipment section */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 15, fontWeight: 800, marginBottom: 12, color: "rgba(255,255,255,0.7)" }}>
          Equipment
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {(["sword", "armor", "charm"] as const).map((slot) => {
            const slotMeta = SLOT_LABELS[slot];
            const equipped = equippedItems[slot];
            const baseSlotItems = HERO_EQUIPMENT.filter((e) => e.slot === slot);
            const legendarySlotItems = SET_ITEMS.filter((e) => e.slot === slot && gs.owned.has(e.id));
            return (
              <div
                key={slot}
                style={{
                  background: cardBg,
                  borderRadius: 14,
                  padding: 16,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Slot header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                    paddingBottom: 10,
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span style={{ fontSize: 20 }}>{slotMeta.icon}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>
                      {slotMeta.jp} <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{slotMeta.label}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                      {equipped ? (
                        <span>
                          Equipped: <span style={{ color: gold }}>{equipped.icon} {equipped.nameEn}</span>
                          {" "}(+{equipped.bonus} {STAT_META[equipped.stat].label})
                        </span>
                      ) : (
                        <span style={{ color: "rgba(255,255,255,0.25)" }}>Empty slot</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Base equipment items */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    overflowX: "auto",
                    paddingBottom: 4,
                  }}
                >
                  {baseSlotItems.map((item) => renderItemCard(item, slot))}
                </div>

                {/* Legendary divider + items (only if player owns any for this slot) */}
                {legendarySlotItems.length > 0 && (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "12px 0 8px" }}>
                      <div style={{ flex: 1, height: 1, background: "rgba(251,191,36,0.3)" }} />
                      <span style={{ color: "#fbbf24", fontSize: 10, fontWeight: 800, letterSpacing: 2 }}>✦ LEGENDARY</span>
                      <div style={{ flex: 1, height: 1, background: "rgba(251,191,36,0.3)" }} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        overflowX: "auto",
                        paddingBottom: 4,
                      }}
                    >
                      {legendarySlotItems.map((item) => renderItemCard(item, slot))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Set Bonus Panel */}
      {activeSetBonus && (
        <div
          style={{
            marginBottom: 28,
            background: "rgba(251,191,36,0.06)",
            border: "1px solid rgba(251,191,36,0.25)",
            borderRadius: 16,
            padding: "20px 22px",
            boxShadow: "0 0 24px rgba(251,191,36,0.08), inset 0 0 24px rgba(251,191,36,0.03)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 28 }}>{activeSetBonus.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: gold }}>
                {activeSetBonus.name}
              </div>
              <div style={{ fontSize: 10, color: "rgba(251,191,36,0.6)", letterSpacing: 1, fontWeight: 700 }}>
                SET BONUS ACTIVE
              </div>
            </div>
          </div>
          <div style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.5,
            padding: "10px 14px",
            background: "rgba(251,191,36,0.06)",
            borderRadius: 10,
            border: "1px solid rgba(251,191,36,0.12)",
          }}>
            {activeSetBonus.description}
          </div>
        </div>
      )}

      {/* Partial set progress */}
      {!activeSetBonus && partialSetInfo && (
        <div
          style={{
            marginBottom: 28,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: "16px 20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 20 }}>{partialSetInfo.setIcon}</span>
            <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>
              {partialSetInfo.setName}
            </div>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
            {partialSetInfo.equipped}/3 pieces equipped
            {partialSetInfo.missingSlots.length > 0 && (
              <span> — Missing: {partialSetInfo.missingSlots.map((s: string) => SLOT_LABELS[s]?.label ?? s).join(", ")}</span>
            )}
          </div>
        </div>
      )}

      {/* Power summary */}
      <div
        style={{
          background: "rgba(194,37,92,0.08)",
          border: `1px solid rgba(194,37,92,0.2)`,
          borderRadius: 14,
          padding: "18px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: 1, marginBottom: 4 }}>
          TOTAL POWER
        </div>
        <div style={{ fontSize: 36, fontWeight: 900, color: pink, lineHeight: 1 }}>{totalPower}</div>
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginTop: 6 }}>
          This power is used in temple defense and guild wars
        </div>
      </div>
    </div>
  );
}

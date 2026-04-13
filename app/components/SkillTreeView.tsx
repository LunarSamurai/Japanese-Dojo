"use client";
import { useState, useMemo } from "react";
import type { GameState, SkillNode } from "../types";
import {
  SKILL_TREE,
  SKILL_CATEGORIES,
  isNodeUnlocked,
  getRequiredAwakening,
} from "../data/skillTree";

interface SkillTreeViewProps {
  gs: GameState;
  setGs: (u: GameState | ((p: GameState) => GameState)) => void;
  showToast: (msg: string, type?: string) => void;
  setView: (v: import("../types").View) => void;
}

type NodeState = "locked" | "unavailable" | "available" | "allocated";

function getNodeState(
  node: SkillNode,
  awakeningCount: number,
  allocatedNodes: string[],
  skillPoints: number
): NodeState {
  if (allocatedNodes.includes(node.id)) return "allocated";
  const tierUnlocked = awakeningCount >= getRequiredAwakening(node.tier);
  if (!tierUnlocked) return "locked";
  const prereqsMet = node.requires.every((r) => allocatedNodes.includes(r));
  if (!prereqsMet) return "unavailable";
  if (skillPoints >= node.cost) return "available";
  return "unavailable";
}

function getPrereqName(reqId: string): string {
  const node = SKILL_TREE.find((n) => n.id === reqId);
  return node ? node.nameEn : reqId;
}

export function SkillTreeView({ gs, setGs, showToast, setView }: SkillTreeViewProps) {
  const [activeCategory, setActiveCategory] = useState(SKILL_CATEGORIES[0].id);
  const { count: awakeningCount, skillPoints, allocatedNodes } = gs.awakening;

  const categoryNodes = useMemo(
    () => SKILL_TREE.filter((n) => n.category === activeCategory),
    [activeCategory]
  );

  const tiers = useMemo(() => {
    const tierMap = new Map<number, SkillNode[]>();
    for (const node of categoryNodes) {
      if (!tierMap.has(node.tier)) tierMap.set(node.tier, []);
      tierMap.get(node.tier)!.push(node);
    }
    return Array.from(tierMap.entries()).sort((a, b) => a[0] - b[0]);
  }, [categoryNodes]);

  const totalAllocated = allocatedNodes.length;

  const allocateNode = (node: SkillNode) => {
    const state = getNodeState(node, awakeningCount, allocatedNodes, skillPoints);
    if (state !== "available") return;
    setGs((g) => ({
      ...g,
      awakening: {
        ...g.awakening,
        skillPoints: g.awakening.skillPoints - node.cost,
        allocatedNodes: [...g.awakening.allocatedNodes, node.id],
      },
    }));
    showToast(`${node.icon} ${node.nameEn} unlocked! ${node.description}`, "xp");
  };

  return (
    <div
      style={{
        background:
          "radial-gradient(ellipse at 50% 20%, #1e293b 0%, #0f172a 60%, #020617 100%)",
        borderRadius: 20,
        minHeight: "100vh",
        padding: "0 0 40px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ══ TOP BAR ══ */}
      <div
        style={{
          padding: "22px 28px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => setView("hero")} style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.6)", padding: "6px 12px", borderRadius: 8,
            fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>
            ← Hero
          </button>
          <div
            style={{
              color: "rgba(255,255,255,0.92)",
              fontSize: 22,
              fontWeight: 900,
              fontFamily: "serif",
              letterSpacing: 1,
            }}
          >
            Skill Tree
          </div>
          {awakeningCount > 0 && (
            <span
              style={{
                background: "linear-gradient(135deg,#fbbf24,#f59e0b)",
                color: "#1a1523",
                fontSize: 10,
                fontWeight: 900,
                padding: "3px 8px",
                borderRadius: 6,
                letterSpacing: 0.5,
              }}
            >
              Awakening {awakeningCount}
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              color: "#fbbf24",
              fontSize: 15,
              fontWeight: 900,
              textShadow: "0 0 12px rgba(251,191,36,0.4)",
            }}
          >
            {skillPoints} pts
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {totalAllocated} allocated
          </div>
        </div>
      </div>

      {/* ══ CATEGORY TABS ══ */}
      <div
        style={{
          display: "flex",
          gap: 4,
          padding: "14px 20px",
          overflowX: "auto",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {SKILL_CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCategory;
          const catAllocated = allocatedNodes.filter((id) =>
            id.startsWith(cat.id + "-")
          ).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                background: isActive
                  ? "linear-gradient(135deg,rgba(251,191,36,0.2),rgba(245,158,11,0.1))"
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${
                  isActive
                    ? "rgba(251,191,36,0.4)"
                    : "rgba(255,255,255,0.06)"
                }`,
                borderRadius: 10,
                padding: "8px 14px",
                color: isActive ? "#fbbf24" : "rgba(255,255,255,0.5)",
                fontSize: 11,
                fontWeight: isActive ? 800 : 600,
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 6,
                whiteSpace: "nowrap",
                transition: "all 0.15s",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 14 }}>{cat.icon}</span>
              <span>{cat.nameEn}</span>
              {catAllocated > 0 && (
                <span
                  style={{
                    background: isActive
                      ? "rgba(251,191,36,0.3)"
                      : "rgba(255,255,255,0.08)",
                    fontSize: 9,
                    fontWeight: 800,
                    padding: "1px 5px",
                    borderRadius: 999,
                    color: isActive ? "#fbbf24" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {catAllocated}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ══ NODE GRID ══ */}
      <div
        style={{
          padding: "16px 20px",
          maxHeight: "calc(100vh - 220px)",
          overflowY: "auto",
        }}
      >
        {tiers.map(([tier, nodes]) => {
          const reqAwakening = getRequiredAwakening(tier);
          const tierUnlocked = awakeningCount >= reqAwakening;

          return (
            <div key={tier} style={{ marginBottom: 28 }}>
              {/* Tier header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    color: tierUnlocked
                      ? "rgba(255,255,255,0.8)"
                      : "rgba(255,255,255,0.3)",
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: 1,
                  }}
                >
                  {!tierUnlocked && (
                    <span style={{ marginRight: 6, fontSize: 12 }}>
                      &#x1F512;
                    </span>
                  )}
                  Tier {tier}
                </div>
                <div
                  style={{
                    color: tierUnlocked
                      ? "rgba(251,191,36,0.6)"
                      : "rgba(255,255,255,0.2)",
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >
                  Requires Awakening {reqAwakening}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: tierUnlocked
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(255,255,255,0.03)",
                  }}
                />
                <div
                  style={{
                    color: "rgba(255,255,255,0.2)",
                    fontSize: 9,
                    fontWeight: 700,
                  }}
                >
                  {nodes.filter((n) => allocatedNodes.includes(n.id)).length}/
                  {nodes.length}
                </div>
              </div>

              {/* Nodes grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: 8,
                  opacity: tierUnlocked ? 1 : 0.4,
                }}
              >
                {nodes.map((node) => {
                  const state = getNodeState(
                    node,
                    awakeningCount,
                    allocatedNodes,
                    skillPoints
                  );
                  const isAllocated = state === "allocated";
                  const isAvailable = state === "available";
                  const isLocked = state === "locked";

                  return (
                    <div
                      key={node.id}
                      style={{
                        background: isAllocated
                          ? "rgba(251,191,36,0.08)"
                          : "rgba(255,255,255,0.03)",
                        border: `1px solid ${
                          isAllocated
                            ? "rgba(251,191,36,0.4)"
                            : isAvailable
                            ? "rgba(194,37,92,0.5)"
                            : "rgba(255,255,255,0.06)"
                        }`,
                        borderRadius: 12,
                        padding: "12px 14px",
                        position: "relative",
                        transition: "all 0.2s",
                        boxShadow: isAllocated
                          ? "0 0 16px rgba(251,191,36,0.15)"
                          : isAvailable
                          ? "0 0 12px rgba(194,37,92,0.1)"
                          : "none",
                      }}
                    >
                      {/* Top row: icon + names */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 6,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 18,
                            filter: isLocked ? "grayscale(1)" : "none",
                          }}
                        >
                          {isAllocated ? "\u2714" : isLocked ? "\u{1F512}" : node.icon}
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              color: isAllocated
                                ? "#fbbf24"
                                : isAvailable
                                ? "rgba(255,255,255,0.9)"
                                : "rgba(255,255,255,0.4)",
                              fontSize: 11,
                              fontWeight: 800,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {node.name}
                          </div>
                          <div
                            style={{
                              color: isAllocated
                                ? "rgba(251,191,36,0.7)"
                                : "rgba(255,255,255,0.3)",
                              fontSize: 9,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {node.nameEn}
                          </div>
                        </div>
                      </div>

                      {/* Stat bonus */}
                      <div
                        style={{
                          color: isAllocated
                            ? "#fbbf24"
                            : "rgba(255,255,255,0.55)",
                          fontSize: 10,
                          fontWeight: 700,
                          marginBottom: 6,
                        }}
                      >
                        {node.description}
                      </div>

                      {/* Bottom: action or status */}
                      {isLocked && (
                        <div
                          style={{
                            color: "rgba(255,255,255,0.2)",
                            fontSize: 9,
                            fontWeight: 600,
                          }}
                        >
                          Requires Awakening {reqAwakening}
                        </div>
                      )}
                      {state === "unavailable" && !isLocked && (
                        <div
                          style={{
                            color: "rgba(255,255,255,0.25)",
                            fontSize: 9,
                            fontWeight: 600,
                          }}
                        >
                          {node.requires.length > 0 &&
                          !node.requires.every((r) =>
                            allocatedNodes.includes(r)
                          )
                            ? `Needs: ${node.requires
                                .filter((r) => !allocatedNodes.includes(r))
                                .map(getPrereqName)
                                .join(", ")}`
                            : `Need ${node.cost} pts`}
                        </div>
                      )}
                      {isAvailable && (
                        <button
                          onClick={() => allocateNode(node)}
                          style={{
                            background:
                              "linear-gradient(135deg,#c2255c,#7e3794)",
                            color: "white",
                            border: "none",
                            borderRadius: 8,
                            padding: "5px 12px",
                            fontSize: 10,
                            fontWeight: 800,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            width: "100%",
                            transition: "all 0.15s",
                          }}
                        >
                          Allocate ({node.cost} pt{node.cost > 1 ? "s" : ""})
                        </button>
                      )}
                      {isAllocated && (
                        <div
                          style={{
                            color: "#fbbf24",
                            fontSize: 9,
                            fontWeight: 800,
                            letterSpacing: 1,
                            textTransform: "uppercase",
                          }}
                        >
                          Allocated
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";

interface DuelAnimationProps {
  attackerName: string;
  defenderName: string;
  won: boolean;
  onComplete: () => void;
}

export default function DuelAnimation({
  attackerName,
  defenderName,
  won,
  onComplete,
}: DuelAnimationProps) {
  const [phase, setPhase] = useState<
    "enter" | "clash" | "result" | "done"
  >("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("clash"), 1000);
    const t2 = setTimeout(() => setPhase("result"), 2000);
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const winnerName = won ? attackerName : defenderName;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.95)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "inherit",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes duel-slideInLeft {
          from { transform: translateX(-300px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes duel-slideInRight {
          from { transform: translateX(300px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes duel-clashLeft {
          0% { transform: translateX(0); }
          40% { transform: translateX(80px); }
          60% { transform: translateX(80px); }
          100% { transform: translateX(0); }
        }
        @keyframes duel-clashRight {
          0% { transform: translateX(0); }
          40% { transform: translateX(-80px); }
          60% { transform: translateX(-80px); }
          100% { transform: translateX(0); }
        }
        @keyframes duel-flash {
          0% { opacity: 0; transform: scale(0.5); }
          30% { opacity: 1; transform: scale(1.5); }
          100% { opacity: 0; transform: scale(2); }
        }
        @keyframes duel-fallLeft {
          0% { transform: rotate(0deg) translateY(0); opacity: 1; }
          100% { transform: rotate(-90deg) translateY(60px); opacity: 0.2; }
        }
        @keyframes duel-fallRight {
          0% { transform: rotate(0deg) translateY(0); opacity: 1; }
          100% { transform: rotate(90deg) translateY(60px); opacity: 0.2; }
        }
        @keyframes duel-resultIn {
          0% { opacity: 0; transform: scale(0.3) translateY(20px); }
          60% { transform: scale(1.1) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes duel-sunPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      `}</style>

      {/* Background: sun/moon circle */}
      <div
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,200,100,0.3) 0%, rgba(255,150,50,0.1) 50%, transparent 70%)",
          top: "25%",
          left: "50%",
          transform: "translateX(-50%)",
          animation: "duel-sunPulse 3s ease-in-out infinite",
        }}
      />

      {/* Torii gate silhouette */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: 0.15,
        }}
      >
        {/* Top beam */}
        <div
          style={{
            width: 240,
            height: 12,
            background: "#fff",
            borderRadius: 6,
          }}
        />
        {/* Second beam */}
        <div
          style={{
            width: 200,
            height: 8,
            background: "#fff",
            marginTop: 8,
            borderRadius: 4,
          }}
        />
        {/* Pillars */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 180,
            marginTop: 4,
          }}
        >
          <div style={{ width: 10, height: 120, background: "#fff" }} />
          <div style={{ width: 10, height: 120, background: "#fff" }} />
        </div>
      </div>

      {/* Arena */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 100,
          position: "relative",
          marginTop: 40,
        }}
      >
        {/* Attacker samurai (left) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            animation:
              phase === "enter"
                ? "duel-slideInLeft 0.8s ease forwards"
                : phase === "clash"
                ? "duel-clashLeft 0.8s ease"
                : phase === "result" && !won
                ? "duel-fallLeft 0.6s ease forwards"
                : undefined,
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 8,
              color: won ? "#4caf50" : "#999",
              maxWidth: 120,
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {attackerName}
          </div>
          {/* Samurai figure */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Head */}
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #e0c8a0, #d4a574)",
                border: "2px solid #8b7355",
              }}
            />
            {/* Body */}
            <div
              style={{
                width: 32,
                height: 48,
                background: "linear-gradient(180deg, #1a237e, #283593)",
                borderRadius: "4px 4px 0 0",
                marginTop: -2,
                border: "1px solid #3949ab",
              }}
            />
            {/* Sword (right side, pointing right) */}
            <div
              style={{
                position: "absolute",
                right: -28,
                top: 18,
                width: 36,
                height: 3,
                background: "linear-gradient(90deg, #9e9e9e, #e0e0e0)",
                transform: "rotate(-20deg)",
                borderRadius: 1,
                boxShadow: "0 0 6px rgba(255,255,255,0.3)",
              }}
            />
            {/* Legs */}
            <div style={{ display: "flex", gap: 6 }}>
              <div
                style={{
                  width: 10,
                  height: 20,
                  background: "#1a1a2e",
                  borderRadius: "0 0 3px 3px",
                }}
              />
              <div
                style={{
                  width: 10,
                  height: 20,
                  background: "#1a1a2e",
                  borderRadius: "0 0 3px 3px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Clash flash */}
        {phase === "clash" && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 60,
              height: 60,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #fff 0%, #ffd54f 40%, transparent 70%)",
              animation: "duel-flash 0.6s ease forwards",
              zIndex: 5,
            }}
          />
        )}

        {/* Defender samurai (right) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            animation:
              phase === "enter"
                ? "duel-slideInRight 0.8s ease forwards"
                : phase === "clash"
                ? "duel-clashRight 0.8s ease"
                : phase === "result" && won
                ? "duel-fallRight 0.6s ease forwards"
                : undefined,
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 8,
              color: !won ? "#4caf50" : "#999",
              maxWidth: 120,
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {defenderName}
          </div>
          {/* Samurai figure (mirrored) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Head */}
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #e0c8a0, #d4a574)",
                border: "2px solid #8b7355",
              }}
            />
            {/* Body */}
            <div
              style={{
                width: 32,
                height: 48,
                background: "linear-gradient(180deg, #b71c1c, #c62828)",
                borderRadius: "4px 4px 0 0",
                marginTop: -2,
                border: "1px solid #e53935",
              }}
            />
            {/* Sword (left side, pointing left) */}
            <div
              style={{
                position: "absolute",
                left: -28,
                top: 18,
                width: 36,
                height: 3,
                background: "linear-gradient(90deg, #e0e0e0, #9e9e9e)",
                transform: "rotate(20deg)",
                borderRadius: 1,
                boxShadow: "0 0 6px rgba(255,255,255,0.3)",
              }}
            />
            {/* Legs */}
            <div style={{ display: "flex", gap: 6 }}>
              <div
                style={{
                  width: 10,
                  height: 20,
                  background: "#1a1a2e",
                  borderRadius: "0 0 3px 3px",
                }}
              />
              <div
                style={{
                  width: 10,
                  height: 20,
                  background: "#1a1a2e",
                  borderRadius: "0 0 3px 3px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ground line */}
      <div
        style={{
          width: 400,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          marginTop: 0,
        }}
      />

      {/* Result text */}
      {phase === "result" && (
        <div
          style={{
            marginTop: 40,
            textAlign: "center",
            animation: "duel-resultIn 0.5s ease forwards",
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: won ? "#4caf50" : "#f44336",
              textShadow: won
                ? "0 0 30px rgba(76,175,80,0.5)"
                : "0 0 30px rgba(244,67,54,0.5)",
            }}
          >
            {won ? "Victory!" : "Defeat!"}
          </div>
          <div
            style={{
              fontSize: 16,
              marginTop: 8,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {winnerName} wins! +1 point for their guild
          </div>
        </div>
      )}
    </div>
  );
}

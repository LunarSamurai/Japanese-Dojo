"use client";
import { useEffect, useState } from "react";
import { AuthForm } from "./AuthForm";

interface LandingAnimationProps {
  onAuthSuccess: () => void;
  signUp: (email: string, password: string, displayName: string) => Promise<unknown>;
  signIn: (email: string, password: string) => Promise<unknown>;
  isAuthenticated: boolean;
}

const BLOSSOMS = Array.from({ length: 10 }, (_, i) => ({
  left: `${8 + i * 9}%`,
  delay: `${0.3 + i * 0.25}s`,
  duration: `${2.5 + (i % 3) * 0.8}s`,
  size: 6 + (i % 3) * 3,
  drift: `${(i % 2 === 0 ? 1 : -1) * (20 + i * 8)}px`,
  spin: `${(i % 2 === 0 ? 1 : -1) * (180 + i * 40)}deg`,
  color: i % 3 === 0 ? "rgba(255,182,193,0.8)" : i % 3 === 1 ? "rgba(255,160,180,0.7)" : "rgba(255,200,210,0.6)",
}));

export function LandingAnimation({ onAuthSuccess, signUp, signIn, isAuthenticated }: LandingAnimationProps) {
  // phase: "cutscene" → "auth" (or auto-skip to auth done if already logged in)
  const [phase, setPhase] = useState<"cutscene" | "auth">("cutscene");
  const [toriiVisible, setToriiVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    // Cutscene timeline
    const t1 = setTimeout(() => setToriiVisible(true), 300);
    const t2 = setTimeout(() => setTitleVisible(true), 1200);
    const t3 = setTimeout(() => {
      if (typeof window !== "undefined") sessionStorage.setItem("nihongo-dojo-intro-seen", "1");
      // If already authenticated, skip auth form and go straight through
      if (isAuthenticated) {
        onAuthSuccess();
      } else {
        setPhase("auth");
      }
    }, 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isAuthenticated, onAuthSuccess]);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        background: "radial-gradient(ellipse at 50% 40%, #2d1b2e 0%, #1a0a12 55%, #0d0509 100%)",
        overflow: "hidden",
        animation: phase === "cutscene" ? "dawn-glow 2.5s ease-out forwards" : "none",
      }}
    >
      {/* Cherry blossom particles — always running */}
      {BLOSSOMS.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute", top: -20, left: b.left,
            width: b.size, height: b.size, borderRadius: "50%",
            background: b.color,
            animation: phase === "cutscene"
              ? `blossom-fall ${b.duration} ease-in ${b.delay} forwards`
              : `blossom-fall ${b.duration} ease-in ${b.delay} infinite`,
            "--drift": b.drift, "--spin": b.spin,
            opacity: 0,
          } as React.CSSProperties}
        />
      ))}

      {/* Glow ring */}
      <div style={{
        position: "absolute",
        top: phase === "auth" ? "15%" : "35%",
        left: "50%", transform: "translate(-50%, -50%)",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(214,51,108,0.15) 0%, transparent 70%)",
        animation: "glow-pulse 2s ease-in-out infinite",
        pointerEvents: "none",
        transition: "top 0.8s ease",
      }} />

      {/* Torii gate — shrinks and moves up in auth phase */}
      <div style={{
        animation: toriiVisible ? "torii-emerge 1.8s ease-out forwards" : "none",
        opacity: toriiVisible ? undefined : 0,
        display: "flex", flexDirection: "column", alignItems: "center",
        marginBottom: phase === "auth" ? 20 : 40,
        transform: phase === "auth" ? "scale(0.55)" : "scale(1)",
        transition: "transform 0.8s ease, margin 0.8s ease",
      }}>
        {/* Kasagi */}
        <div style={{
          width: 200, height: 14, background: "linear-gradient(180deg, #e63f6e, #c0294f)",
          borderRadius: "6px 6px 2px 2px", marginBottom: -2, position: "relative",
          boxShadow: "0 -2px 12px rgba(214,51,108,0.3)",
        }}>
          <div style={{
            position: "absolute", left: -12, right: -12, top: -4, height: 8,
            background: "linear-gradient(180deg, #d6336c, #b82a50)",
            borderRadius: "50% 50% 0 0",
          }} />
        </div>
        {/* Nuki */}
        <div style={{ width: 170, height: 8, background: "linear-gradient(180deg, #d6336c, #a82545)", marginTop: 18, marginBottom: -2 }} />
        {/* Pillars */}
        <div style={{ display: "flex", justifyContent: "space-between", width: 160 }}>
          <div style={{ width: 12, height: 120, background: "linear-gradient(180deg, #c0294f, #8a1e3a)", borderRadius: "0 0 3px 3px", boxShadow: "2px 0 8px rgba(0,0,0,0.2)" }} />
          <div style={{ width: 12, height: 120, background: "linear-gradient(180deg, #c0294f, #8a1e3a)", borderRadius: "0 0 3px 3px", boxShadow: "-2px 0 8px rgba(0,0,0,0.2)" }} />
        </div>
        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 4, gap: 2 }}>
          <div style={{ width: 100, height: 6, background: "#4a3040", borderRadius: 1 }} />
          <div style={{ width: 120, height: 6, background: "#3d2835", borderRadius: 1 }} />
          <div style={{ width: 140, height: 6, background: "#30202a", borderRadius: 1 }} />
        </div>
      </div>

      {/* Title — always visible once shown, smaller in auth phase */}
      {titleVisible && (
        <div style={{
          animation: "title-reveal 1.5s ease-out forwards",
          opacity: 0, textAlign: "center",
          marginBottom: phase === "auth" ? 8 : 0,
        }}>
          <div style={{
            color: "#c2255c",
            fontSize: phase === "auth" ? 28 : 52,
            fontWeight: 900, fontFamily: "serif",
            textShadow: "0 0 30px rgba(194,37,92,0.5), 0 0 60px rgba(194,37,92,0.2)",
            transition: "font-size 0.8s ease",
          }}>
            日本語道場
          </div>
        </div>
      )}

      {/* Subtitle */}
      {phase === "cutscene" && (
        <div style={{ animation: "subtitle-reveal 1.2s ease-out 2s forwards", opacity: 0, marginTop: 12 }}>
          <div style={{ color: "#f0a8c8", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 20 }}>
            Nihongo Dojo
          </div>
        </div>
      )}

      {/* Auth form — appears after cutscene */}
      {phase === "auth" && (
        <div style={{ marginTop: 16, width: "100%", maxWidth: 400, padding: "0 24px" }}>
          <AuthForm onSuccess={onAuthSuccess} signUp={signUp} signIn={signIn} />
        </div>
      )}
    </div>
  );
}

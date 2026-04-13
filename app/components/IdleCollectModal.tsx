"use client";

interface IdleCollectModalProps {
  coins: number;
  xp: number;
  hours: number;
  onCollect: () => void;
}

export function IdleCollectModal({ coins, xp, hours, onCollect }: IdleCollectModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at 50% 40%, #2d1b2e 0%, #1a0a12 55%, #0d0509 100%)",
      }}
    >
      {/* Cherry blossom particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="blossom-fall"
          style={{
            position: "fixed",
            left: `${8 + (i * 7.5) % 90}%`,
            top: -20,
            fontSize: 14 + (i % 3) * 6,
            opacity: 0.25 + (i % 4) * 0.1,
            animationDelay: `${(i * 0.8) % 6}s`,
            animationDuration: `${6 + (i % 4) * 2}s`,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          🌸
        </span>
      ))}

      {/* Card */}
      <div
        style={{
          background: "linear-gradient(170deg, rgba(45,27,46,0.95), rgba(26,10,18,0.98))",
          border: "1px solid rgba(194,37,92,0.3)",
          borderRadius: 24,
          padding: "40px 48px",
          maxWidth: 400,
          width: "90%",
          textAlign: "center",
          position: "relative",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Decorative glow */}
        <div
          style={{
            position: "absolute",
            top: -1,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(194,37,92,0.6), transparent)",
          }}
        />

        <div style={{ fontSize: 40, marginBottom: 16 }}>⛩️</div>

        <div
          style={{
            color: "#c4a8b8",
            fontSize: 11,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          While you were away...
        </div>

        <div
          style={{
            color: "#8a7e92",
            fontSize: 13,
            marginBottom: 28,
          }}
        >
          Your temple earned rewards for{" "}
          <span style={{ color: "#c4a8b8", fontWeight: 700 }}>
            {hours < 1 ? `${Math.round(hours * 60)}m` : `${hours}h`}
          </span>
        </div>

        {/* Earnings display */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              background: "rgba(217,119,6,0.08)",
              border: "1px solid rgba(217,119,6,0.2)",
              borderRadius: 16,
              padding: "20px 12px",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 4 }}>🪙</div>
            <div
              style={{
                color: "#d97706",
                fontSize: 32,
                fontWeight: 900,
                lineHeight: 1,
                fontFamily: "serif",
              }}
            >
              {coins}
            </div>
            <div
              style={{
                color: "#8a7e92",
                fontSize: 10,
                marginTop: 4,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Coins
            </div>
          </div>

          <div
            style={{
              background: "rgba(194,37,92,0.08)",
              border: "1px solid rgba(194,37,92,0.2)",
              borderRadius: 16,
              padding: "20px 12px",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 4 }}>⚡</div>
            <div
              style={{
                color: "#c2255c",
                fontSize: 32,
                fontWeight: 900,
                lineHeight: 1,
                fontFamily: "serif",
              }}
            >
              {xp}
            </div>
            <div
              style={{
                color: "#8a7e92",
                fontSize: 10,
                marginTop: 4,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              XP
            </div>
          </div>
        </div>

        {/* Collect button */}
        <button
          onClick={onCollect}
          className="btn-glow"
          style={{
            width: "100%",
            background: "linear-gradient(135deg,#c2255c,#7e3794)",
            color: "white",
            border: "none",
            borderRadius: 14,
            padding: "16px 0",
            fontSize: 16,
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "inherit",
            letterSpacing: 0.5,
            boxShadow:
              "0 4px 24px rgba(194,37,92,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.transform = "scale(1)";
          }}
        >
          Collect Rewards
        </button>
      </div>
    </div>
  );
}

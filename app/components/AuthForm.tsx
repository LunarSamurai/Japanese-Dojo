"use client";
import { useState } from "react";

interface AuthFormProps {
  onSuccess: () => void;
  signUp: (email: string, password: string, displayName: string) => Promise<unknown>;
  signIn: (email: string, password: string) => Promise<unknown>;
}

type Mode = "login" | "signup" | "forgot";

export function AuthForm({ onSuccess, signUp, signIn }: AuthFormProps) {
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupDone, setSignupDone] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        if (!displayName.trim()) { setError("Display name is required"); setLoading(false); return; }
        await signUp(email, password, displayName);
        setSignupDone(true);
      } else {
        await signIn(email, password);
        onSuccess();
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
    setLoading(false);
  };

  // After signup, show confirmation message
  if (signupDone) {
    return (
      <div style={{ animation: "title-reveal 0.6s ease-out forwards", opacity: 0, textAlign: "center", maxWidth: 380, margin: "0 auto" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📧</div>
        <div style={{ color: "white", fontSize: 22, fontWeight: 900, fontFamily: "serif", marginBottom: 10 }}>
          Check Your Email
        </div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 24, lineHeight: 1.6, fontFamily: "system-ui, -apple-system, sans-serif" }}>
          We sent a confirmation link to <span style={{ color: "#c2255c", fontWeight: 700 }}>{email}</span>. Click it to activate your account, then come back and log in.
        </div>
        <button
          onClick={() => { setMode("login"); setSignupDone(false); }}
          style={{
            background: "linear-gradient(135deg,#c2255c,#7e3794)", color: "white",
            border: "none", padding: "14px 36px", borderRadius: 12,
            fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 6px 24px rgba(194,37,92,0.4)",
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px", borderRadius: 10,
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
    color: "white", fontSize: 14, fontFamily: "system-ui, -apple-system, sans-serif",
    outline: "none", letterSpacing: "normal",
  };

  return (
    <div style={{ animation: "title-reveal 0.6s ease-out forwards", opacity: 0, maxWidth: 360, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ color: "white", fontSize: 24, fontWeight: 900, fontFamily: "serif", marginBottom: 4 }}>
          {mode === "signup" ? "Join the Dojo" : "Welcome Back"}
        </div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "system-ui, -apple-system, sans-serif" }}>
          {mode === "signup" ? "Create your account to begin" : "Log in to continue your journey"}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            style={inputStyle}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          style={inputStyle}
        />
      </div>

      {error && (
        <div style={{ color: "#ef4444", fontSize: 12, marginBottom: 12, textAlign: "center", fontFamily: "system-ui, -apple-system, sans-serif" }}>{error}</div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || !email || !password}
        className="btn-glow"
        style={{
          width: "100%", padding: "14px", borderRadius: 12, border: "none",
          background: loading ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg,#c2255c,#7e3794)",
          color: "white", fontSize: 15, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "inherit", boxShadow: "0 6px 24px rgba(194,37,92,0.35)",
          marginBottom: 16,
        }}
      >
        {loading ? "..." : mode === "signup" ? "Create Account" : "Log In"}
      </button>

      <div style={{ textAlign: "center", marginTop: -4 }}>
        <button
          onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setError(""); }}
          className="auth-toggle-link"
          style={{
            background: "none", border: "none", color: "rgba(255,255,255,0.45)",
            fontSize: 13, cursor: "pointer",
            fontFamily: "system-ui, -apple-system, sans-serif",
            padding: "8px 12px", borderRadius: 8,
            transition: "color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; e.currentTarget.style.background = "none"; }}
        >
          {mode === "signup" ? "Already have an account? Log in" : "Need an account? Sign up"}
        </button>
      </div>
    </div>
  );
}

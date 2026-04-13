"use client";
import { useState } from "react";

interface AvatarProps {
  url: string | null | undefined;
  name: string | null | undefined;
  size?: number;
  style?: React.CSSProperties;
}

/**
 * Shared avatar component. Shows profile picture if available, falls back to first letter with gradient.
 */
export function Avatar({ url, name, size = 32, style }: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const letter = (name || "?")[0].toUpperCase();
  const showImg = url && !imgError;

  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0, overflow: "hidden",
      background: showImg ? "transparent" : "linear-gradient(135deg,#c2255c,#7e3794)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "white", fontSize: Math.round(size * 0.4), fontWeight: 800,
      ...style,
    }}>
      {showImg ? (
        <img
          src={url}
          alt={name || "avatar"}
          onError={() => setImgError(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        letter
      )}
    </div>
  );
}

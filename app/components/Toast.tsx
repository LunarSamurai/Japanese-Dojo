"use client";
import type { Toast as ToastType } from "../types";

export function ToastNotification({ toast }: { toast: ToastType | null }) {
  if (!toast) return null;
  const borderColor =
    toast.type === "perfect"
      ? "#059669"
      : toast.type === "shop"
        ? "#c2255c"
        : "#c4a8b8";
  return (
    <div className="toast-enter" style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 999,
      background: "#ffffff", border: `1.5px solid ${borderColor}`,
      borderRadius: 12, padding: "14px 22px", color: "#1a1523",
      fontWeight: 700, fontSize: 14,
      boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(214,51,108,0.15)",
    }}>
      {toast.msg}
    </div>
  );
}

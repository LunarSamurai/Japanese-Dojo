export const XPL = 350;
export const getLevel = (xp: number) => Math.floor(xp / XPL) + 1;
export const getLPct = (xp: number) => ((xp % XPL) / XPL) * 100;

export const RANK_NAMES = [
  "見習い",    // Apprentice (Lv 1-2)
  "初心者",    // Beginner (Lv 3-4)
  "学習者",    // Learner (Lv 5-6)
  "練習生",    // Trainee (Lv 7-8)
  "中級者",    // Intermediate (Lv 9-10)
  "熟練者",    // Skilled (Lv 11-12)
  "上級者",    // Advanced (Lv 13-14)
  "達人",      // Master (Lv 15-16)
  "先生",      // Teacher (Lv 17-18)
  "師匠",      // Mentor (Lv 19-20)
  "賢者",      // Sage (Lv 21-22)
  "日本語の神", // God of Japanese (Lv 23+)
];
export const getRank = (lvl: number) =>
  RANK_NAMES[Math.min(Math.floor((lvl - 1) / 2), RANK_NAMES.length - 1)];

export const CAT_COLOR: Record<string, string> = {
  "Genki I": "#c2255c",
  "Genki II": "#7c3aed",
  "Real Life": "#0d9488",
  "Conversational": "#ea580c",
  "Quartet I": "#2563eb",
  "Quartet II": "#7c3aed",
  "Tobira": "#0891b2",
  "JLPT N2": "#dc2626",
  "JLPT N1": "#b91c1c",
  "Business": "#0369a1",
  "Academic": "#4338ca",
  "Advanced": "#be185d",
};

export const BOOK_META: Record<string, { label: string; color: string }> = {
  genki1: { label: "Genki I", color: "#c2255c" },
  genki2: { label: "Genki II", color: "#7c3aed" },
  conv: { label: "Convo Lab", color: "#059669" },
  quartet1: { label: "Quartet I", color: "#2563eb" },
  quartet2: { label: "Quartet II", color: "#7c3aed" },
  tobira: { label: "Tobira", color: "#0891b2" },
  advanced: { label: "Advanced", color: "#be185d" },
};

export const T = {
  bg: "#faf7f5",
  nav: "#ffffff",
  card: "#ffffff",
  cardAlt: "#f8f5f3",
  border: "#d4c8ce",
  borderMid: "#c4a8b8",
  primary: "#c2255c",
  grad: "linear-gradient(135deg,#c2255c,#9b59b6)",
  gradBtn: "linear-gradient(135deg,#d6366c,#c2255c)",
  textDark: "#1a1523",
  textMid: "#564a5e",
  textSoft: "#8a7e92",
  textFade: "#b0a6b8",
  pink: "#c2255c",
  purple: "#7c3aed",
  teal: "#0d9488",
  orange: "#ea580c",
  gold: "#d97706",
  green: "#059669",
  blue: "#2563eb",
  red: "#dc2626",
  xpBar: "linear-gradient(90deg,#d6366c,#9b59b6)",
};

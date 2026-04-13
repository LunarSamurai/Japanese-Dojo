/**
 * Format large numbers with suffixes: K, M, B, T, Q, then AA-ZZ
 */
export function formatNumber(n: number): string {
  if (n < 0) return `-${formatNumber(-n)}`;
  if (n < 1000) return String(Math.floor(n));

  const suffixes = [
    { threshold: 1e15, suffix: "Q" },
    { threshold: 1e12, suffix: "T" },
    { threshold: 1e9, suffix: "B" },
    { threshold: 1e6, suffix: "M" },
    { threshold: 1e3, suffix: "K" },
  ];

  for (const { threshold, suffix } of suffixes) {
    if (n >= threshold) {
      const val = n / threshold;
      return val >= 100 ? `${Math.floor(val)}${suffix}` : `${val.toFixed(1)}${suffix}`;
    }
  }

  // Beyond Q (1e18+) — use AA through ZZ
  if (n >= 1e18) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let exp = Math.floor(Math.log10(n)) - 17; // 0-based from 1e18
    const tier = Math.floor(exp / 3);
    const first = Math.floor(tier / 26);
    const second = tier % 26;
    if (first < 26) {
      const val = n / Math.pow(10, 18 + tier * 3);
      return `${val.toFixed(1)}${alphabet[first]}${alphabet[second]}`;
    }
    return "MAX";
  }

  return String(Math.floor(n));
}

import type { DemonType, WaveConfig } from "../types";

export const DEMON_TYPES: DemonType[] = [
  { id: "oni", name: "鬼", nameEn: "Oni", emoji: "👹", baseHp: 8, baseDmg: 1, speed: 1000, description: "A fearsome red demon" },
  { id: "tengu", name: "天狗", nameEn: "Tengu", emoji: "👺", baseHp: 10, baseDmg: 2, speed: 800, description: "A long-nosed mountain spirit" },
  { id: "kappa", name: "河童", nameEn: "Kappa", emoji: "🐸", baseHp: 5, baseDmg: 1, speed: 1200, description: "A river imp with a water dish" },
  { id: "yurei", name: "幽霊", nameEn: "Yurei", emoji: "👻", baseHp: 4, baseDmg: 3, speed: 600, description: "A vengeful ghost" },
  { id: "jorogumo", name: "絡新婦", nameEn: "Jorogumo", emoji: "🕷️", baseHp: 12, baseDmg: 2, speed: 900, description: "A spider demon in disguise" },
  { id: "nurikabe", name: "ぬりかべ", nameEn: "Nurikabe", emoji: "🧱", baseHp: 20, baseDmg: 1, speed: 2000, description: "An immovable wall yokai" },
  { id: "raijin", name: "雷神", nameEn: "Raijin", emoji: "⚡", baseHp: 15, baseDmg: 4, speed: 700, description: "The thunder god" },
  { id: "yamata", name: "八岐大蛇", nameEn: "Yamata no Orochi", emoji: "🐉", baseHp: 40, baseDmg: 5, speed: 1500, description: "The eight-headed serpent" },
];

export function generateWave(waveNumber: number, lessonsCompleted: number): WaveConfig {
  const isBoss = waveNumber > 0 && waveNumber % 10 === 0;

  let demons: { demonId: string; count: number }[] = [];

  if (isBoss) {
    demons = [
      { demonId: "yamata", count: 1 },
      { demonId: "raijin", count: 2 },
      { demonId: "oni", count: 2 },
    ];
  } else if (waveNumber <= 3) {
    // Early waves: just 1-2 weak enemies
    demons = [
      { demonId: "kappa", count: 1 },
      ...(waveNumber >= 2 ? [{ demonId: "oni", count: 1 }] : []),
    ];
  } else if (waveNumber <= 8) {
    // Ramping up: 2-3 enemies
    demons = [
      { demonId: "oni", count: 1 + Math.floor(waveNumber / 5) },
      { demonId: "kappa", count: 1 },
      ...(waveNumber >= 6 ? [{ demonId: "tengu", count: 1 }] : []),
    ];
  } else if (waveNumber <= 15) {
    // Mid game: 3-4 enemies, tougher types
    demons = [
      { demonId: "oni", count: 2 },
      { demonId: "tengu", count: 1 },
      ...(waveNumber >= 12 ? [{ demonId: "yurei", count: 1 }] : []),
    ];
  } else if (waveNumber <= 30) {
    // Late game: mixed threats
    demons = [
      { demonId: "oni", count: 2 },
      { demonId: "jorogumo", count: 1 },
      { demonId: "tengu", count: 1 },
      { demonId: "yurei", count: 1 },
    ];
  } else {
    // Endgame: full roster
    demons = [
      { demonId: "oni", count: 2 },
      { demonId: "raijin", count: 1 },
      { demonId: "nurikabe", count: 1 },
      { demonId: "jorogumo", count: 1 },
      { demonId: "yurei", count: 1 + Math.min(Math.floor((waveNumber - 30) / 10), 2) },
    ];
  }

  // Apply HP multiplier by adjusting base values in the wave config (applied at battle time)
  const bonusCoins = Math.round(10 + waveNumber * 4 + (isBoss ? 30 : 0));
  const bonusXp = Math.round(20 + waveNumber * 8 + (isBoss ? 60 : 0));

  return { waveNumber, demons, bonusCoins, bonusXp };
}

export function getHpMultiplier(waveNumber: number, lessonsCompleted: number): number {
  // Logarithmic scaling — grows forever but never outpaces upgradeable defense
  // Wave 1: 1.0x, Wave 10: 2.3x, Wave 100: 5.6x, Wave 1000: 10.9x, Wave 1M: 20.7x
  const waveScale = 1 + Math.log10(1 + waveNumber) * 2;
  const lessonBonus = 1 + Math.log10(1 + lessonsCompleted) * 0.3;
  return waveScale * lessonBonus;
}

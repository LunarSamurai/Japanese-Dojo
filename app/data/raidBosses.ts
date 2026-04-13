import type { RaidBoss } from "../types";

export const RAID_BOSSES: RaidBoss[] = [
  { id: "lesser-oni", name: "赤鬼大将", nameEn: "Red Oni General", emoji: "👹", baseHp: 5000, timerHours: 12, rewardCoins: 200, rewardXp: 500 },
  { id: "tengu-lord", name: "天狗の王", nameEn: "Tengu Lord", emoji: "👺", baseHp: 12000, timerHours: 18, rewardCoins: 500, rewardXp: 1200 },
  { id: "ghost-fleet", name: "幽霊艦隊", nameEn: "Ghost Fleet", emoji: "👻", baseHp: 20000, timerHours: 24, rewardCoins: 800, rewardXp: 2000 },
  { id: "spider-queen", name: "蜘蛛女王", nameEn: "Spider Queen", emoji: "🕷️", baseHp: 35000, timerHours: 24, rewardCoins: 1200, rewardXp: 3000 },
  { id: "raijin-avatar", name: "雷神の化身", nameEn: "Avatar of Raijin", emoji: "⚡", baseHp: 50000, timerHours: 36, rewardCoins: 2000, rewardXp: 5000 },
  { id: "yamata-orochi", name: "八岐大蛇", nameEn: "Yamata no Orochi", emoji: "🐉", baseHp: 100000, timerHours: 48, rewardCoins: 5000, rewardXp: 12000 },
];

// Scale boss HP by guild level and member count
export function scaleRaidBoss(boss: RaidBoss, guildLevel: number, memberCount: number): { hp: number; coins: number; xp: number } {
  const levelMult = 1 + (guildLevel - 1) * 0.15;
  const memberMult = 1 + (memberCount - 1) * 0.08;
  return {
    hp: Math.round(boss.baseHp * levelMult * memberMult),
    coins: Math.round(boss.rewardCoins * levelMult),
    xp: Math.round(boss.rewardXp * levelMult),
  };
}

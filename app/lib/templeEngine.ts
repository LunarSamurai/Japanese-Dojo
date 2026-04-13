import { DEMON_TYPES, generateWave, getHpMultiplier } from "../data/demons";
import { DEFENSE_UPGRADES, getRepeatableDefenseBonus } from "../data/defenseUpgrades";
import { UPGRADES } from "../data/upgrades";
import { HERO_EQUIPMENT } from "../data/heroEquipment";
import { getActiveSetBonus, SET_ITEMS as SET_ITEMS_IMPORT } from "../data/equipmentSets";
import type { HeroState, AwakeningState } from "../types";
import { getSkillBonusesSafe } from "./skillBonusHelper";

// ── Types ──

export interface TickResult {
  goldEarned: number;
  killCount: number;
  wavesCleared: number;
  newWaveNumber: number;
  templeHp: number;
  isBossWave: boolean;
  omamoriEarned: number;
}

export interface OfflineResult extends TickResult {
  ticksSimulated: number;
  timeAwaySeconds: number;
}

export interface BossTierInfo {
  tier: number;
  omamoriReward: number;
  hpMultiplier: number;
}

// ── Pure Functions ──

/**
 * Calculate total defense power from owned upgrades + hero ATK.
 * Base defense is 3.
 */
export function getDefensePower(owned: Set<string>, hero: HeroState, awakening?: AwakeningState): number {
  let total = 8; // base defense
  // One-time defense upgrades
  for (const u of [...DEFENSE_UPGRADES, ...UPGRADES]) {
    if (u.defenseBonus && owned.has(u.id)) total += u.defenseBonus;
  }
  // Repeatable temple upgrades
  total += getRepeatableDefenseBonus(owned);
  // Hero base ATK
  total += hero.atk;
  // Hero equipped base sword ATK bonus
  if (hero.sword) {
    const sword = HERO_EQUIPMENT.find((e) => e.id === hero.sword);
    if (sword) total += sword.bonus;
  }
  // Hero equipped base armor DEF bonus
  if (hero.armor) {
    const armor = HERO_EQUIPMENT.find((e) => e.id === hero.armor);
    if (armor) total += armor.bonus;
  }
  // Legendary equipment bonuses (stacks with base)
  if (hero.legendarySword) {
    const ls = [...SET_ITEMS_IMPORT].find((e) => e.id === hero.legendarySword);
    if (ls) total += ls.bonus;
  }
  if (hero.legendaryArmor) {
    const la = [...SET_ITEMS_IMPORT].find((e) => e.id === hero.legendaryArmor);
    if (la) total += la.bonus;
  }
  // Skill tree bonuses
  if (awakening) {
    const bonuses = getSkillBonusesSafe(awakening);
    total += bonuses.atkBonus + bonuses.defBonus;
  }
  // Equipment set bonuses (from legendary slots)
  const setBonus = getActiveSetBonus(hero.legendarySword, hero.legendaryArmor, hero.legendaryCharm);
  if (setBonus) {
    if (setBonus.bonusType === "dmgMult") total = Math.round(total * setBonus.bonusValue);
    if (setBonus.bonusType === "defMult") total = Math.round(total * setBonus.bonusValue);
  }
  return total;
}

/**
 * Get active set bonus info for TempleView to use during battle ticks.
 * Returns set bonus details (name, type, value) or null if no set is active.
 */
export function getActiveSetBonusInfo(hero: HeroState): { name: string; type: string; value: number } | null {
  const setBonus = getActiveSetBonus(hero.legendarySword, hero.legendaryArmor, hero.legendaryCharm);
  if (!setBonus) return null;
  return {
    name: setBonus.name,
    type: setBonus.bonusType,
    value: setBonus.bonusValue,
  };
}

/**
 * Check if a wave number is a boss wave (every 5 waves).
 */
export function isBossWave(waveNumber: number): boolean {
  return waveNumber > 0 && waveNumber % 10 === 0;
}

/**
 * Get boss tier info based on wave number.
 * Waves 5-15: Tier 1, Waves 20-35: Tier 2, Waves 40+: Tier 3
 */
export function getBossTier(waveNumber: number): BossTierInfo {
  if (waveNumber >= 200) {
    return { tier: 5, omamoriReward: 25, hpMultiplier: 6.0 };
  }
  if (waveNumber >= 100) {
    return { tier: 4, omamoriReward: 15, hpMultiplier: 5.0 };
  }
  if (waveNumber >= 50) {
    return { tier: 3, omamoriReward: 10, hpMultiplier: 4.0 };
  }
  if (waveNumber >= 20) {
    return { tier: 2, omamoriReward: 5, hpMultiplier: 2.5 };
  }
  return { tier: 1, omamoriReward: 3, hpMultiplier: 1.5 };
}

/**
 * Gold earned for clearing a wave (bonus on top of per-kill gold).
 */
function goldPerWave(waveNumber: number): number {
  return 5 + waveNumber * 2;
}

/**
 * Gold earned per demon kill.
 */
function goldPerKill(waveNumber: number): number {
  return 1 + Math.floor(waveNumber / 3);
}

/**
 * Spawn a flat array of demons for a given wave, with HP/DMG scaled.
 */
function spawnDemonsForWave(waveNumber: number, lessonsCompleted: number) {
  const wave = generateWave(waveNumber, lessonsCompleted);
  const hpMult = getHpMultiplier(waveNumber, lessonsCompleted);
  const dmgMult = 1 + waveNumber * 0.05;

  const demons: { hp: number; maxHp: number; dmg: number; typeId: string }[] = [];
  for (const d of wave.demons) {
    const dt = DEMON_TYPES.find((t) => t.id === d.demonId);
    if (!dt) continue;
    for (let i = 0; i < d.count; i++) {
      const hp = Math.round(dt.baseHp * hpMult);
      demons.push({
        hp,
        maxHp: hp,
        dmg: Math.round(dt.baseDmg * dmgMult),
        typeId: dt.id,
      });
    }
  }

  // If this is a boss wave, apply boss HP multiplier to all demons
  if (isBossWave(waveNumber)) {
    const bossTier = getBossTier(waveNumber);
    for (const d of demons) {
      d.hp = Math.round(d.hp * bossTier.hpMultiplier);
      d.maxHp = d.hp;
    }
  }

  return demons;
}

/**
 * Simulate N ticks of battle.
 * Each tick: defense damages front demon, alive demons damage temple.
 * When all demons die: wave advances, new wave spawns, gold earned.
 * If a boss wave is reached, simulation pauses (returns isBossWave: true).
 */
export function simulateTicks(
  tickCount: number,
  startWave: number,
  templeHp: number,
  maxHp: number,
  defensePower: number,
  lessonsCompleted: number
): TickResult {
  let goldEarned = 0;
  let killCount = 0;
  let wavesCleared = 0;
  let currentWave = startWave;
  let hp = templeHp;
  let omamoriEarned = 0;

  // Spawn initial wave demons
  let demons = spawnDemonsForWave(currentWave, lessonsCompleted);

  for (let tick = 0; tick < tickCount; tick++) {
    if (hp <= 0) {
      // Temple destroyed: full rebuild
      hp = maxHp;
      // Re-spawn same wave
      demons = spawnDemonsForWave(currentWave, lessonsCompleted);
    }

    // Defense attacks front demon
    const frontIdx = demons.findIndex((d) => d.hp > 0);
    if (frontIdx >= 0) {
      demons[frontIdx].hp -= defensePower;
      if (demons[frontIdx].hp <= 0) {
        killCount++;
        goldEarned += goldPerKill(currentWave);
      }
    }

    // Alive demons damage temple
    const totalDmg = demons
      .filter((d) => d.hp > 0)
      .reduce((sum, d) => sum + d.dmg, 0);
    hp = Math.max(0, hp - totalDmg);

    // Check if wave cleared
    const allDead = demons.every((d) => d.hp <= 0);
    if (allDead) {
      wavesCleared++;
      goldEarned += goldPerWave(currentWave);
      currentWave++;

      // Check if next wave is a boss wave — stop simulation so UI can handle it
      if (isBossWave(currentWave)) {
        const bossTier = getBossTier(currentWave);
        omamoriEarned += bossTier.omamoriReward;
        // For offline: auto-clear boss waves (assume player would have beaten them)
        // Gold still awarded
        goldEarned += goldPerWave(currentWave);
        wavesCleared++;
        killCount += spawnDemonsForWave(currentWave, lessonsCompleted).length;
        currentWave++;
      }

      // Spawn next wave
      demons = spawnDemonsForWave(currentWave, lessonsCompleted);
    }
  }

  return {
    goldEarned,
    killCount,
    wavesCleared,
    newWaveNumber: currentWave,
    templeHp: Math.max(0, hp),
    isBossWave: isBossWave(currentWave),
    omamoriEarned,
  };
}

/**
 * Calculate offline earnings since lastTickAt.
 * Each tick = 2 seconds. Cap at 12 hours (21600 ticks max).
 */
export function calculateOfflineProgress(
  lastTickAt: string,
  startWave: number,
  templeHp: number,
  maxHp: number,
  defensePower: number,
  lessonsCompleted: number
): OfflineResult {
  const now = Date.now();
  const lastTick = new Date(lastTickAt).getTime();
  const elapsedMs = Math.max(0, now - lastTick);
  const elapsedSeconds = Math.floor(elapsedMs / 1000);
  const tickCount = Math.min(Math.floor(elapsedSeconds / 2), 21600); // 2s per tick, cap 12h

  if (tickCount <= 0) {
    return {
      goldEarned: 0,
      killCount: 0,
      wavesCleared: 0,
      newWaveNumber: startWave,
      templeHp,
      isBossWave: isBossWave(startWave),
      omamoriEarned: 0,
      ticksSimulated: 0,
      timeAwaySeconds: elapsedSeconds,
    };
  }

  const result = simulateTicks(
    tickCount,
    startWave,
    templeHp,
    maxHp,
    defensePower,
    lessonsCompleted
  );

  return {
    ...result,
    ticksSimulated: tickCount,
    timeAwaySeconds: elapsedSeconds,
  };
}

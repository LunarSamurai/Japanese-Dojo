<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ECF8E?style=for-the-badge&logo=supabase" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" />
</p>

<h1 align="center">
  <br>
  ⛩️ 日本語道場
  <br>
  <sub>Nihongo Dojo</sub>
</h1>

<p align="center">
  <strong>The Japanese learning platform that plays like a game.</strong>
</p>

<p align="center">
  Master Japanese from absolute zero to JLPT N1 through an immersive RPG experience.<br/>
  Defend your temple. Train your samurai. Conquer the language.
</p>

---

## What is Nihongo Dojo?

Nihongo Dojo is a full-stack Japanese learning web application that fuses structured textbook curriculum with idle RPG game mechanics. Instead of just reading flashcards, you defend a Shinto shrine from waves of yokai demons, upgrade a samurai hero, open legendary loot boxes, join guilds, and wage war against rival clans — all while genuinely learning Japanese.

Every lesson completed makes your temple stronger. Every quiz question answered fuels your defenses. The game never stops — even while you sleep, your temple fights on.

---

## Core Features

### Structured Curriculum — 70+ Lessons, 7 Textbooks
Full coverage of the Japanese learning path from beginner to advanced:

- **Genki I & II** — JLPT N5/N4 foundations (Lessons 1-23)
- **Conversation Lab** — Real-world spoken Japanese
- **Quartet I & II** — Intermediate four-skills integration (JLPT N3/N2)
- **Tobira** — Gateway to advanced Japanese (15 chapters)
- **Advanced Mastery** — JLPT N1 level content

Each lesson includes vocabulary, grammar, kanji, reading passages, dialogues, cultural tips, and quizzes. Placement test on signup recommends your starting point.

### Persistent Temple Defense — Always Running Idle Game
Your Shinto shrine is under constant siege by yokai demons. The battle never stops:

- Waves of enemies attack automatically — oni, tengu, kappa, yurei, and more
- Your temple auto-defends based on your total power (upgrades + hero + skill tree)
- Earn gold passively from every demon killed
- Every 10 waves, a **Boss** appears — answer Japanese quiz questions from your SRS review cards to defeat it and earn **Omamori**
- Temple evolves visually: Small Shrine, Temple, Grand Shrine, Celestial Palace
- 5 repeatable upgrade paths (Wall, Archer Tower, Moat, Spirit Ward, Dragon Statue) with 50 levels each

### Samurai Hero — RPG Stats & Legendary Equipment
Train a samurai warrior that powers your temple defense and fights in guild wars:

- **Base Stats**: ATK, DEF, HP — level up with Omamori
- **6 Equipment Slots**: Base (Sword, Armor, Charm) + Legendary (stacks with base)
- **15 Equipment Sets** with game-changing set bonuses:
  - *Flame Emperor* — Every 2nd strike wipes ALL enemies
  - *Berserker* — Below 30% HP: deal 5x damage
  - *Phantom* — 20% lifesteal
  - *Sacred* — Auto-revive temple once per wave
  - *Celestial* — 25% critical hit chance (3x damage)
  - ...and 10 more

### Loot Box System — Chase Legendary Gear
Spend Omamori to open loot boxes in the Treasure Hall:

- 5 box types: Blade, Shield, Spirit, Legendary, Mixed
- Guaranteed set item on first draw per box type
- Bulk draws: 10x (10% legendary chance), 100x (50% chance)
- Consolation rewards: 30K gold + 15% chance of 80% Omamori refund on non-set pulls
- Wave 100 milestone: free random complete legendary set with chest opening cinematic

### Awakening System — Prestige & Infinite Scaling
When all temple upgrades hit max level (or wave 100+ for early awakening):

- Reset temple upgrades and wave progress
- Keep hero, equipment, Omamori, lessons, and SRS progress
- Gain **Skill Points** (5 for full mastery, 3 for early awakening)
- Each awakening permanently reduces temple upgrade costs (up to 50% discount)

### Skill Tree — 1,000+ Nodes
Spend skill points across 9 category paths with 130 nodes each:

| Path | Bonus |
|------|-------|
| Path of Attack | +15 ATK per node |
| Path of Defense | +15 DEF per node |
| Path of Life | +15 HP per node |
| Path of Treasure | +15% Gold per node |
| Path of Wisdom | +15% XP per node |
| Path of Spirit | +15% Omamori per node |
| Path of the Smith | +15 Equipment bonus per node |
| Path of Vitality | +15% Lifesteal per node |
| Path of Supremacy | Mixed bonuses (1.5x values) |

Tier-gated by awakening count — Tier 6 nodes require 20+ awakenings.

### Spaced Repetition — Smart Review System
SM-2 algorithm tracks every vocabulary word and grammar point:

- Cards generated automatically from completed lessons
- Due immediately after lesson completion
- 4 rating buttons: Again, Hard, Good, Easy
- Interval scaling from 1 day to years
- Boss encounters pull directly from your SRS deck

### Social Features
- **Feed**: Post updates, like, comment, follow other learners
- **Guild System**: Create or join guilds with an Osaka Castle-themed UI
  - Radial cloud navigation around a CSS castle
  - Real-time guild chat (Supabase Realtime)
  - Member management with Captain/Council/Member roles
  - Guild leaderboards
- **Guild Wars**: 30-minute PvP duels with samurai clash animations and hidden power levels
- **Guild Raids**: Co-op boss fights with shared HP bar updated in real-time

### Dual Currency Economy
- **Gold (Coins)**: Earned from lessons, temple battles, and idle play. Spent on study upgrades and temple upgrades.
- **Omamori**: Earned from boss fights, quiz perfects, and book completions. Spent on hero upgrades, equipment, loot boxes, and skill tree.

### Premium (Coming Soon)
10 Omamori pack tiers from $0.99 to $100.99 — Stripe integration planned.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, React Compiler) |
| UI | React 19, Tailwind CSS 4, Inline Styles |
| Backend | Supabase (Auth, PostgreSQL, Realtime, Storage) |
| State | Offline-first localStorage + debounced Supabase sync |
| Language | TypeScript 5 |
| Auth | Email/Password via Supabase Auth |
| Animations | Pure CSS keyframes (no animation libraries) |

---

## Getting Started

```bash
# Clone
git clone https://github.com/LunarSamurai/Japanese-Dojo.git
cd Japanese-Dojo

# Install
npm install

# Set up Supabase
# 1. Create a project at https://supabase.com
# 2. Run supabase/migrations/001_initial_schema.sql in the SQL Editor
# 3. Run supabase/migrations/002_omamori_hero.sql
# 4. Run supabase/migrations/003_awakening.sql
# 5. Create a Storage bucket called "avatars" (public)

# Configure environment
cp .env.local.example .env.local
# Paste your Supabase URL and anon key

# Run
npm run dev
```

---

## Project Structure

```
app/
  page.tsx                    # Main app shell + auth flow
  components/
    LandingAnimation.tsx      # Cinematic torii gate intro + auth
    TempleView.tsx            # Persistent idle battle
    BossQuiz.tsx              # SRS-powered boss encounters
    HeroView.tsx              # Samurai RPG stats + equipment
    SkillTreeView.tsx         # 1,000+ node skill tree
    ChestReveal.tsx           # Loot box opening animation
    Shop.tsx                  # Study / Treasure / Premium tabs
    Course.tsx                # Guided curriculum path
    social/                   # Feed, posts, comments, likes
    guild/                    # Castle UI, chat, wars, raids
  data/
    genki1.ts ... advanced.ts # 70+ lesson data files
    demons.ts                 # Yokai enemy definitions
    heroEquipment.ts          # Base equipment (15 items)
    equipmentSets.ts          # 15 sets (45 legendary items)
    lootBoxes.ts              # Loot box system
    skillTree.ts              # 1,040 procedural skill nodes
    raidBosses.ts             # Guild raid bosses
  hooks/
    useGameState.ts           # Offline-first state + Supabase sync
    useAuth.ts                # Supabase auth
    useSRS.ts                 # SM-2 spaced repetition
    useGuild.ts               # Guild CRUD + realtime chat
  lib/
    templeEngine.ts           # Battle simulation + defense calc
    skillBonuses.ts           # Skill tree bonus aggregation
    formatNumber.ts           # K/M/B/T/Q/AA-ZZ formatting
    sync.ts                   # Offline-first sync engine
supabase/
  migrations/                 # 3 SQL migration files
```

---

<p align="center">
  <strong>⛩️ Learn Japanese. Defend the Temple. Become Legend.</strong>
</p>

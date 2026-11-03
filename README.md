# ⚔️ HabitQuest — A Gamified Habit Tracker Built Like a Pixel RPG

**HabitQuest** transforms real-life habits into an RPG adventure. Users create habits as quests, complete daily objectives, earn XP and gold, level up their character, unlock achievements, and explore their personal progression through a fantasy world.

Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **Zustand**. 100% frontend-only, works completely offline, and includes a built-in Web Audio API 8-bit synthesizer for authentic chiptune sound effects!

---

## 🎮 Game Features & Screens

### 1. 🏰 Adventure Hub (Game Home)
- **Pixel-Art Fantasy Environment**: Layered pixel backdrop with castle keeps, floating clouds, distant mountains, pixel trees, and moon/stars.
- **Animated Pixel Character**: Custom sprite engine featuring 6 RPG classes (*Warrior, Mage, Rogue, Paladin, Druid, Ranger*).
- **Animated Companion Pets**: Trotting beside your hero (*Ember Pixel Fox, Starlight Scholar Owl, Baby Void Drake*).
- **Floating Character Nameplate & HUD**: Real-time Level, Title (*e.g. Apprentice Seeker, Habit Knight*), Gold Purse, and Streak flame.
- **Segmented Retro XP Bar**: Smoothly animates XP gains toward next level requirements.
- **Wooden Notice Board**: RPG tavern-style quest board with pushpins, daily progress counter (*"3 / 5 QUESTS COMPLETED"*), filtering, and instant quest completion.

### 2. 📜 Royal Quest Journal
- **Categories**: Daily Rituals, Weekly Feats, Main Campaigns, Side Bounties, and Completed Archives.
- **Difficulty Tiers**:
  - 🟢 **Easy**: +10 XP, +5 G
  - 🟡 **Medium**: +25 XP, +15 G
  - 🔴 **Hard**: +50 XP, +35 G
  - 🟣 **Epic**: +100 XP, +80 G
- **Alignment Stats**: Link habits to Strength (*Workouts*), Intelligence (*Study*), Vitality (*Sleep/Hydration*), Wisdom (*Meditation*), or Discipline (*General Habits*).
- **Quest Operations**: Create, edit, delete, claim bounty, undo completion, filter by tier, and search.
- **Once-Per-Day Protection**: Prevents duplicate daily claims on the same calendar day.

### 3. 🛡️ Character Profile & RPG Attributes
- **Paperdoll Equipment Preview**: Visually inspect equipped weapon, armor, helmet, pet, and titles.
- **RPG Attribute Meters**:
  - **Strength (STR)**: Cultivated through fitness & physical training.
  - **Intelligence (INT)**: Expanded via reading, coding, and study habits.
  - **Vitality (VIT)**: Nourished by sleep hygiene, hydration, and nutrition.
  - **Wisdom (WIS)**: Strengthened through meditation and journaling.
  - **Discipline (DIS)**: Fortified by unbroken daily consistency.
- **Ascension Roadmap**: Progression from *Novice Adventurer (Lvl 1)* through *Discipline Champion (Lvl 20)* to *Legendary Mythic (Lvl 30)*.

### 4. 🎒 Armory Bazaar & Inventory
- **Equipment Slots**: Weapon, Armor, Helmet, Companion Pet, and Title.
- **14+ RPG Items**:
  - *Iron Broadsword, Runic Focus Staff, Obsidian Moonblade, Excalibur of Will*
  - *Scout Leather Tunic, Knightly Breastplate, Archmage Robes*
  - *Copper Adventurer Cap, Pointed Wizard Hat, Crown of Sovereign Habits*
  - *Ember Pixel Fox, Starlight Scholar Owl, Baby Void Drake*
  - *The Steadfast Seeker, Champion of the Dawn*
- **Rarity Grading**: Common (Grey), Rare (Blue), Epic (Purple), Legendary (Gold).
- **Gold Economy**: Earn gold from habits and spend in the bazaar.

### 5. 🗺️ Expedition World Map
- **Illustrated Pixel Map**:
  - 🌲 **Forest of Focus** (Mindfulness & clarity)
  - 🏔️ **Mountain of Discipline** (Physical fortitude)
  - 🌊 **Lake of Calm** (Restorative peace)
  - 🏰 **Knowledge Castle** (Study & wisdom)
  - ⛩️ **Temple of Consistency** (Sacred streak flame)
  - 🌌 **Legendary Summit** (Pinnacle of self-mastery)
- **Interactive Boss Bounties**: Challenge bosses like *Sloth of Procrastination*, *Sirens of Restlessness*, and *Goliath of Fatigue* for bonus XP and gold.

### 6. 🏆 Hall of Achievements
- 10+ categorized achievements with real-time progress tracking.
- Silhouette icons for locked milestones; glowing gold cards for unlocked honors.
- Celebratory popups & fanfares on unlock.

### 7. 🌳 Branching Skill Trees
- 4 progression trees: **Health**, **Learning**, **Productivity**, and **Mindfulness**.
- Tier 1 to Tier 4 prerequisite chains.
- Spend Skill Points earned upon leveling up to unlock passive XP multipliers, streak safeguards, and bonus loot chances.

### 8. 📊 Mastery Matrix & Statistics
- **28-Day Consistency Heat Grid**: Visual pixel matrix of daily habit execution.
- **Crown Habit**: Best-performing habit by streak.
- **Chief Adversary**: Most challenging quest by difficulty.
- **Campaign Category Breakdown**: Visual progress bars across all habit domains.

### 9. ⚙️ Preferences & Data Management
- **8-Bit Chiptune Synthesizer**: Square & triangle wave audio engine powered by Web Audio API (Zero external MP3 dependencies, toggleable on/off with volume control).
- **Retro CRT Scanlines**: Authentic arcade monitor overlay toggle.
- **Save Backup & Restore**: Export and import full game state as clean JSON.
- **Demo State Reset**: Instant reset button back to Level 3 demo state.

---

## 🛠️ Development & Deployment

### Run Locally
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

### Production Build
```bash
npm run build
```
Outputs static assets into `dist/` ready to deploy to Vercel, Netlify, GitHub Pages, or Cloudflare Pages.

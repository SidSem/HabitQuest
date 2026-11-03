export type Difficulty = 'easy' | 'medium' | 'hard' | 'epic';

export type QuestCategory = 'daily' | 'weekly' | 'main' | 'side';

export type AttributeType = 'strength' | 'intelligence' | 'vitality' | 'wisdom' | 'discipline';

export type CharacterClass = 'warrior' | 'mage' | 'rogue' | 'paladin' | 'druid' | 'ranger';

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: QuestCategory;
  attribute: AttributeType;
  difficulty: Difficulty;
  frequency: 'daily' | 'weekly' | 'custom';
  xpReward: number;
  goldReward: number;
  icon: string;
  completed: boolean;
  completedAt?: string; // ISO date of last completion
  completionHistory: string[]; // List of YYYY-MM-DD dates
  streak: number;
  bestStreak: number;
  createdAt: string;
}

export type ItemRarity = 'common' | 'rare' | 'epic' | 'legendary';

export type ItemSlot = 'weapon' | 'armor' | 'helmet' | 'pet' | 'accessory' | 'title';

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  slot: ItemSlot;
  rarity: ItemRarity;
  cost: number;
  unlocked: boolean;
  equipped: boolean;
  attributeBonus?: {
    attribute: AttributeType;
    value: number;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'quests' | 'streaks' | 'levels' | 'wealth' | 'skills';
  xpReward: number;
  goldReward: number;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'health' | 'learning' | 'productivity' | 'mindfulness' | 'creativity';
  description: string;
  icon: string;
  tier: number; // 1 to 4
  prerequisiteId?: string;
  requiredLevel: number;
  cost: number;
  unlocked: boolean;
  perk: string;
}

export interface WorldLocation {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  requiredLevel: number;
  requiredXP: number;
  coordinates: { x: number; y: number }; // percentage positions
  lore: string;
  relatedAttribute: AttributeType;
  unlocked: boolean;
  boss?: {
    name: string;
    title: string;
    icon: string;
    description: string;
    defeated: boolean;
  };
}

export interface CharacterAttributes {
  strength: number;     // Physical habits (workout, cardio)
  intelligence: number; // Learning habits (study, reading)
  vitality: number;     // Health habits (hydration, sleep, nutrition)
  wisdom: number;       // Mindfulness (meditation, journaling)
  discipline: number;   // General consistency and streaks
}

export interface CharacterProfile {
  name: string;
  title: string;
  avatar: CharacterClass;
  level: number;
  currentXP: number;
  totalXP: number;
  gold: number;
  skillPoints: number;
  currentStreak: number;
  longestStreak: number;
  totalQuestsCompleted: number;
  attributes: CharacterAttributes;
  equippedItems: {
    weapon?: string;
    armor?: string;
    helmet?: string;
    pet?: string;
    accessory?: string;
    title?: string;
  };
  onboardingCompleted: boolean;
}

export interface GameSettings {
  soundEnabled: boolean;
  volume: number;
  scanlines: boolean;
  theme: 'retro-dark' | 'dungeon-purple' | 'forest-green' | 'ember-crimson';
}


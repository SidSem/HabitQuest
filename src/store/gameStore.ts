import { create } from 'zustand';
import { 
  CharacterProfile, 
  Quest, 
  InventoryItem, 
  Achievement, 
  SkillNode, 
  WorldLocation, 
  GameSettings,
  ItemSlot
} from '../types/game';
import { 
  INITIAL_CHARACTER, 
  INITIAL_QUESTS, 
  INITIAL_SHOP_ITEMS, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_SKILL_NODES, 
  INITIAL_WORLD_LOCATIONS, 
  INITIAL_SETTINGS 
} from '../data/initialData';
import { 
  getXPForLevel, 
  getTitleForLevel, 
  getTodayKey, 
  calculateStreak 
} from '../services/gameEngine';
import { soundEngine } from '../services/soundService';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'habitquest_game_save_v1';

interface LevelUpInfo {
  isOpen: boolean;
  oldLevel: number;
  newLevel: number;
  newTitle: string;
  skillPointsEarned: number;
}

interface GameState {
  character: CharacterProfile;
  quests: Quest[];
  shopItems: InventoryItem[];
  achievements: Achievement[];
  skills: SkillNode[];
  worldLocations: WorldLocation[];
  settings: GameSettings;
  levelUpModal: LevelUpInfo | null;
  recentlyUnlockedAchievement: Achievement | null;

  // Quest Actions
  addQuest: (questData: Omit<Quest, 'id' | 'completed' | 'completionHistory' | 'streak' | 'bestStreak' | 'createdAt'>) => void;
  updateQuest: (id: string, updates: Partial<Quest>) => void;
  deleteQuest: (id: string) => void;
  completeQuest: (id: string) => void;
  undoCompleteQuest: (id: string) => void;

  // Shop & Inventory
  buyItem: (itemId: string) => boolean;
  equipItem: (itemId: string) => void;
  unequipItem: (slot: ItemSlot) => void;

  // Skills
  unlockSkill: (skillId: string) => boolean;

  // World & Bosses
  defeatLocationBoss: (locationId: string) => void;

  // Profile & Onboarding
  updateProfile: (updates: Partial<CharacterProfile>) => void;
  completeOnboarding: (name: string, avatar: CharacterProfile['avatar'], selectedQuestIds: string[]) => void;
  resetGame: () => void;
  importSaveData: (json: string) => boolean;
  exportSaveData: () => string;

  // Settings
  updateSettings: (updates: Partial<GameSettings>) => void;

  // Modals & Popups
  closeLevelUpModal: () => void;
  clearAchievementToast: () => void;
}

// Load initial state from LocalStorage or fall back
const loadSavedState = () => {
  if (typeof window === 'undefined') {
    return {
      character: INITIAL_CHARACTER,
      quests: INITIAL_QUESTS,
      shopItems: INITIAL_SHOP_ITEMS,
      achievements: INITIAL_ACHIEVEMENTS,
      skills: INITIAL_SKILL_NODES,
      worldLocations: INITIAL_WORLD_LOCATIONS,
      settings: INITIAL_SETTINGS,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        character: parsed.character || INITIAL_CHARACTER,
        quests: parsed.quests || INITIAL_QUESTS,
        shopItems: parsed.shopItems || INITIAL_SHOP_ITEMS,
        achievements: parsed.achievements || INITIAL_ACHIEVEMENTS,
        skills: parsed.skills || INITIAL_SKILL_NODES,
        worldLocations: parsed.worldLocations || INITIAL_WORLD_LOCATIONS,
        settings: parsed.settings || INITIAL_SETTINGS,
      };
    }
  } catch (e) {
    console.error('Failed to load save from localStorage', e);
  }

  return {
    character: INITIAL_CHARACTER,
    quests: INITIAL_QUESTS,
    shopItems: INITIAL_SHOP_ITEMS,
    achievements: INITIAL_ACHIEVEMENTS,
    skills: INITIAL_SKILL_NODES,
    worldLocations: INITIAL_WORLD_LOCATIONS,
    settings: INITIAL_SETTINGS,
  };
};

const saveToLocalStorage = (state: {
  character: CharacterProfile;
  quests: Quest[];
  shopItems: InventoryItem[];
  achievements: Achievement[];
  skills: SkillNode[];
  worldLocations: WorldLocation[];
  settings: GameSettings;
}) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to persist to localStorage', e);
  }
};

const initialLoaded = loadSavedState();
if (initialLoaded.settings) {
  soundEngine.setSoundEnabled(initialLoaded.settings.soundEnabled);
  soundEngine.setVolume(initialLoaded.settings.volume);
}

export const useGameStore = create<GameState>((set, get) => ({
  character: initialLoaded.character,
  quests: initialLoaded.quests,
  shopItems: initialLoaded.shopItems,
  achievements: initialLoaded.achievements,
  skills: initialLoaded.skills,
  worldLocations: initialLoaded.worldLocations,
  settings: initialLoaded.settings,
  levelUpModal: null,
  recentlyUnlockedAchievement: null,

  // Quest Actions
  addQuest: (questData) => {
    const today = getTodayKey();
    const newQuest: Quest = {
      ...questData,
      id: `quest_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      completed: false,
      completionHistory: [],
      streak: 0,
      bestStreak: 0,
      createdAt: today,
    };

    soundEngine.playClick();

    set((state) => {
      const updatedQuests = [newQuest, ...state.quests];
      saveToLocalStorage({
        character: state.character,
        quests: updatedQuests,
        shopItems: state.shopItems,
        achievements: state.achievements,
        skills: state.skills,
        worldLocations: state.worldLocations,
        settings: state.settings,
      });
      return { quests: updatedQuests };
    });
  },

  updateQuest: (id, updates) => {
    soundEngine.playClick();
    set((state) => {
      const updatedQuests = state.quests.map((q) =>
        q.id === id ? { ...q, ...updates } : q
      );
      saveToLocalStorage({
        character: state.character,
        quests: updatedQuests,
        shopItems: state.shopItems,
        achievements: state.achievements,
        skills: state.skills,
        worldLocations: state.worldLocations,
        settings: state.settings,
      });
      return { quests: updatedQuests };
    });
  },

  deleteQuest: (id) => {
    soundEngine.playCancel();
    set((state) => {
      const updatedQuests = state.quests.filter((q) => q.id !== id);
      saveToLocalStorage({
        character: state.character,
        quests: updatedQuests,
        shopItems: state.shopItems,
        achievements: state.achievements,
        skills: state.skills,
        worldLocations: state.worldLocations,
        settings: state.settings,
      });
      return { quests: updatedQuests };
    });
  },

  completeQuest: (id) => {
    const state = get();
    const quest = state.quests.find((q) => q.id === id);
    if (!quest) return;

    // Prevent double reward on the same day if already completed today
    const today = getTodayKey();
    if (quest.completed && quest.completionHistory.includes(today)) {
      return;
    }

    // Sound and particle celebration
    soundEngine.playQuestComplete();
    soundEngine.playCoin();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f6ad55', '#a855f7', '#34d399', '#fef3c7']
      });
    } catch {
      // Confetti fallback
    }

    const updatedHistory = Array.from(new Set([...quest.completionHistory, today]));
    const { currentStreak, bestStreak } = calculateStreak(updatedHistory);

    const updatedQuest: Quest = {
      ...quest,
      completed: true,
      completedAt: new Date().toISOString(),
      completionHistory: updatedHistory,
      streak: currentStreak,
      bestStreak: Math.max(bestStreak, currentStreak),
    };

    // Calculate XP and Gold gains
    let gainedXP = quest.xpReward;
    let gainedGold = quest.goldReward;

    // Apply skill perks if unlocked
    const hasVitalSpring = state.skills.find(s => s.id === 'skill_health_1')?.unlocked;
    if (hasVitalSpring && quest.attribute === 'vitality') {
      gainedXP = Math.round(gainedXP * 1.2);
    }
    const hasCuriousMind = state.skills.find(s => s.id === 'skill_learn_1')?.unlocked;
    if (hasCuriousMind && quest.attribute === 'intelligence') {
      gainedXP = Math.round(gainedXP * 1.15);
    }
    const hasDeepWork = state.skills.find(s => s.id === 'skill_prod_2')?.unlocked;
    if (hasDeepWork && (quest.category === 'main' || quest.category === 'side')) {
      gainedGold = Math.round(gainedGold * 2);
    }

    // Update attributes
    const attrToBoost = quest.attribute;
    const currentAttrVal = state.character.attributes[attrToBoost] || 10;
    const updatedAttributes = {
      ...state.character.attributes,
      [attrToBoost]: currentAttrVal + 1,
      discipline: state.character.attributes.discipline + 1,
    };

    // Level progression check
    let newLevel = state.character.level;
    let newCurrentXP = state.character.currentXP + gainedXP;
    const newTotalXP = state.character.totalXP + gainedXP;
    let skillPointsEarned = 0;
    let leveledUp = false;

    let xpNeeded = getXPForLevel(newLevel);
    while (newCurrentXP >= xpNeeded) {
      newCurrentXP -= xpNeeded;
      newLevel += 1;
      skillPointsEarned += 1;
      leveledUp = true;
      xpNeeded = getXPForLevel(newLevel);
    }

    const newTitle = getTitleForLevel(newLevel);

    // Calculate total character streak across all daily habits
    const totalQuestsCompleted = state.character.totalQuestsCompleted + 1;
    const newGold = state.character.gold + gainedGold;

    // Trigger Level Up fanfare if leveled up
    let levelUpData: LevelUpInfo | null = null;
    if (leveledUp) {
      soundEngine.playLevelUp();
      try {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#fbbf24', '#c084fc', '#38bdf8', '#f43f5e']
        });
      } catch {
        // Fallback
      }
      levelUpData = {
        isOpen: true,
        oldLevel: state.character.level,
        newLevel,
        newTitle,
        skillPointsEarned,
      };
    }

    // Check achievement progress
    let newUnlockedAchievement: Achievement | null = null;
    const updatedAchievements = state.achievements.map((ach) => {
      let progress = ach.progress;
      let unlocked = ach.unlocked;

      if (!unlocked) {
        if (ach.id === 'ach_first_quest') progress = 1;
        if (ach.id === 'ach_quests_10') progress = totalQuestsCompleted;
        if (ach.id === 'ach_quests_30') progress = totalQuestsCompleted;
        if (ach.id === 'ach_streak_3') progress = Math.max(progress, currentStreak);
        if (ach.id === 'ach_streak_7') progress = Math.max(progress, currentStreak);
        if (ach.id === 'ach_level_5') progress = newLevel;
        if (ach.id === 'ach_gold_200') progress = newGold;
        if (ach.id === 'ach_fitness_master') progress = updatedAttributes.strength;
        if (ach.id === 'ach_scholar_realm') progress = updatedAttributes.intelligence;

        if (progress >= ach.maxProgress) {
          unlocked = true;
          newUnlockedAchievement = { ...ach, unlocked: true, unlockedAt: today };
          soundEngine.playAchievement();
        }
      }

      return {
        ...ach,
        progress: Math.min(progress, ach.maxProgress),
        unlocked,
      };
    });

    // Check world map unlocks based on new level / XP
    const updatedWorldLocations = state.worldLocations.map((loc) => {
      const shouldUnlock = newLevel >= loc.requiredLevel || newTotalXP >= loc.requiredXP;
      return {
        ...loc,
        unlocked: loc.unlocked || shouldUnlock,
      };
    });

    const updatedQuests = state.quests.map((q) => (q.id === id ? updatedQuest : q));

    const updatedCharacter: CharacterProfile = {
      ...state.character,
      level: newLevel,
      title: newTitle,
      currentXP: newCurrentXP,
      totalXP: newTotalXP,
      gold: newGold,
      skillPoints: state.character.skillPoints + skillPointsEarned,
      totalQuestsCompleted,
      currentStreak: Math.max(state.character.currentStreak, currentStreak),
      longestStreak: Math.max(state.character.longestStreak, currentStreak),
      attributes: updatedAttributes,
    };

    set({
      character: updatedCharacter,
      quests: updatedQuests,
      achievements: updatedAchievements,
      worldLocations: updatedWorldLocations,
      levelUpModal: levelUpData,
      recentlyUnlockedAchievement: newUnlockedAchievement,
    });

    saveToLocalStorage({
      character: updatedCharacter,
      quests: updatedQuests,
      shopItems: state.shopItems,
      achievements: updatedAchievements,
      skills: state.skills,
      worldLocations: updatedWorldLocations,
      settings: state.settings,
    });
  },

  undoCompleteQuest: (id) => {
    const state = get();
    const quest = state.quests.find((q) => q.id === id);
    if (!quest || !quest.completed) return;

    soundEngine.playCancel();
    const today = getTodayKey();
    const filteredHistory = quest.completionHistory.filter((d) => d !== today);
    const { currentStreak, bestStreak } = calculateStreak(filteredHistory);

    const updatedQuest: Quest = {
      ...quest,
      completed: false,
      completedAt: undefined,
      completionHistory: filteredHistory,
      streak: currentStreak,
      bestStreak: bestStreak,
    };

    // Revert XP and Gold
    const newTotalXP = Math.max(0, state.character.totalXP - quest.xpReward);
    const newCurrentXP = Math.max(0, state.character.currentXP - quest.xpReward);
    const newGold = Math.max(0, state.character.gold - quest.goldReward);
    const totalQuestsCompleted = Math.max(0, state.character.totalQuestsCompleted - 1);

    const updatedQuests = state.quests.map((q) => (q.id === id ? updatedQuest : q));
    const updatedCharacter: CharacterProfile = {
      ...state.character,
      currentXP: newCurrentXP,
      totalXP: newTotalXP,
      gold: newGold,
      totalQuestsCompleted,
    };

    set({
      character: updatedCharacter,
      quests: updatedQuests,
    });

    saveToLocalStorage({
      character: updatedCharacter,
      quests: updatedQuests,
      shopItems: state.shopItems,
      achievements: state.achievements,
      skills: state.skills,
      worldLocations: state.worldLocations,
      settings: state.settings,
    });
  },

  // Shop & Inventory
  buyItem: (itemId) => {
    const state = get();
    const item = state.shopItems.find((i) => i.id === itemId);
    if (!item || item.unlocked) return false;

    if (state.character.gold < item.cost) {
      soundEngine.playCancel();
      return false;
    }

    soundEngine.playCoin();
    soundEngine.playEquip();

    const newGold = state.character.gold - item.cost;
    const updatedShopItems = state.shopItems.map((i) =>
      i.id === itemId ? { ...i, unlocked: true } : i
    );

    const updatedCharacter: CharacterProfile = {
      ...state.character,
      gold: newGold,
    };

    set({
      character: updatedCharacter,
      shopItems: updatedShopItems,
    });

    saveToLocalStorage({
      character: updatedCharacter,
      quests: state.quests,
      shopItems: updatedShopItems,
      achievements: state.achievements,
      skills: state.skills,
      worldLocations: state.worldLocations,
      settings: state.settings,
    });

    return true;
  },

  equipItem: (itemId) => {
    const state = get();
    const item = state.shopItems.find((i) => i.id === itemId);
    if (!item || !item.unlocked) return;

    soundEngine.playEquip();

    const slot = item.slot;
    const updatedShopItems = state.shopItems.map((i) => {
      if (i.slot === slot) {
        return { ...i, equipped: i.id === itemId };
      }
      return i;
    });

    const updatedEquipped = {
      ...state.character.equippedItems,
      [slot]: itemId,
    };

    // Check full equipment achievement
    const equippedCount = Object.values(updatedEquipped).filter(Boolean).length;
    let newUnlockedAch: Achievement | null = null;
    const updatedAchievements = state.achievements.map((ach) => {
      if (ach.id === 'ach_equip_full' && !ach.unlocked) {
        if (equippedCount >= 5) {
          soundEngine.playAchievement();
          newUnlockedAch = { ...ach, unlocked: true, progress: 5, unlockedAt: getTodayKey() };
          return newUnlockedAch;
        }
        return { ...ach, progress: equippedCount };
      }
      return ach;
    });

    const updatedCharacter: CharacterProfile = {
      ...state.character,
      equippedItems: updatedEquipped,
    };

    set({
      character: updatedCharacter,
      shopItems: updatedShopItems,
      achievements: updatedAchievements,
      recentlyUnlockedAchievement: newUnlockedAch,
    });

    saveToLocalStorage({
      character: updatedCharacter,
      quests: state.quests,
      shopItems: updatedShopItems,
      achievements: updatedAchievements,
      skills: state.skills,
      worldLocations: state.worldLocations,
      settings: state.settings,
    });
  },

  unequipItem: (slot) => {
    const state = get();
    soundEngine.playClick();

    const updatedShopItems = state.shopItems.map((i) =>
      i.slot === slot ? { ...i, equipped: false } : i
    );

    const updatedEquipped = {
      ...state.character.equippedItems,
      [slot]: undefined,
    };

    const updatedCharacter: CharacterProfile = {
      ...state.character,
      equippedItems: updatedEquipped,
    };

    set({
      character: updatedCharacter,
      shopItems: updatedShopItems,
    });

    saveToLocalStorage({
      character: updatedCharacter,
      quests: state.quests,
      shopItems: updatedShopItems,
      achievements: state.achievements,
      skills: state.skills,
      worldLocations: state.worldLocations,
      settings: state.settings,
    });
  },

  // Skills
  unlockSkill: (skillId) => {
    const state = get();
    const skill = state.skills.find((s) => s.id === skillId);
    if (!skill || skill.unlocked) return false;

    if (state.character.skillPoints < skill.cost) {
      soundEngine.playCancel();
      return false;
    }

    if (skill.requiredLevel > state.character.level) {
      soundEngine.playCancel();
      return false;
    }

    soundEngine.playAchievement();
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#60a5fa', '#fbcfe8']
      });
    } catch {
      // Fallback
    }

    const updatedSkills = state.skills.map((s) =>
      s.id === skillId ? { ...s, unlocked: true } : s
    );

    const updatedCharacter: CharacterProfile = {
      ...state.character,
      skillPoints: state.character.skillPoints - skill.cost,
    };

    set({
      character: updatedCharacter,
      skills: updatedSkills,
    });

    saveToLocalStorage({
      character: updatedCharacter,
      quests: state.quests,
      shopItems: state.shopItems,
      achievements: state.achievements,
      skills: updatedSkills,
      worldLocations: state.worldLocations,
      settings: state.settings,
    });

    return true;
  },

  // World & Bosses
  defeatLocationBoss: (locationId) => {
    const state = get();
    const loc = state.worldLocations.find((l) => l.id === locationId);
    if (!loc || !loc.boss || loc.boss.defeated) return;

    soundEngine.playLevelUp();
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#f59e0b', '#ec4899', '#8b5cf6']
      });
    } catch {
      // Fallback
    }

    const updatedLocations = state.worldLocations.map((l) => {
      if (l.id === locationId && l.boss) {
        return {
          ...l,
          boss: { ...l.boss, defeated: true },
        };
      }
      return l;
    });

    // Award boss bounty
    const bountyXP = 75;
    const bountyGold = 50;

    const updatedCharacter: CharacterProfile = {
      ...state.character,
      totalXP: state.character.totalXP + bountyXP,
      currentXP: state.character.currentXP + bountyXP,
      gold: state.character.gold + bountyGold,
    };

    set({
      character: updatedCharacter,
      worldLocations: updatedLocations,
    });

    saveToLocalStorage({
      character: updatedCharacter,
      quests: state.quests,
      shopItems: state.shopItems,
      achievements: state.achievements,
      skills: state.skills,
      worldLocations: updatedLocations,
      settings: state.settings,
    });
  },

  // Profile & Onboarding
  updateProfile: (updates) => {
    soundEngine.playClick();
    set((state) => {
      const updatedCharacter = { ...state.character, ...updates };
      saveToLocalStorage({
        character: updatedCharacter,
        quests: state.quests,
        shopItems: state.shopItems,
        achievements: state.achievements,
        skills: state.skills,
        worldLocations: state.worldLocations,
        settings: state.settings,
      });
      return { character: updatedCharacter };
    });
  },

  completeOnboarding: (name, avatar, selectedQuestIds) => {
    soundEngine.playLevelUp();
    set((state) => {
      const updatedQuests = state.quests.filter((q) => selectedQuestIds.includes(q.id));
      const updatedCharacter: CharacterProfile = {
        ...state.character,
        name: name.trim() || 'Valiant Hero',
        avatar,
        onboardingCompleted: true,
      };

      saveToLocalStorage({
        character: updatedCharacter,
        quests: updatedQuests.length > 0 ? updatedQuests : state.quests,
        shopItems: state.shopItems,
        achievements: state.achievements,
        skills: state.skills,
        worldLocations: state.worldLocations,
        settings: state.settings,
      });

      return {
        character: updatedCharacter,
        quests: updatedQuests.length > 0 ? updatedQuests : state.quests,
      };
    });
  },

  resetGame: () => {
    soundEngine.playCancel();
    localStorage.removeItem(STORAGE_KEY);
    set({
      character: INITIAL_CHARACTER,
      quests: INITIAL_QUESTS,
      shopItems: INITIAL_SHOP_ITEMS,
      achievements: INITIAL_ACHIEVEMENTS,
      skills: INITIAL_SKILL_NODES,
      worldLocations: INITIAL_WORLD_LOCATIONS,
      settings: INITIAL_SETTINGS,
      levelUpModal: null,
      recentlyUnlockedAchievement: null,
    });
  },

  importSaveData: (json) => {
    try {
      const data = JSON.parse(json);
      if (!data.character || !data.quests) return false;

      soundEngine.playAchievement();
      set({
        character: data.character,
        quests: data.quests,
        shopItems: data.shopItems || INITIAL_SHOP_ITEMS,
        achievements: data.achievements || INITIAL_ACHIEVEMENTS,
        skills: data.skills || INITIAL_SKILL_NODES,
        worldLocations: data.worldLocations || INITIAL_WORLD_LOCATIONS,
        settings: data.settings || INITIAL_SETTINGS,
      });
      saveToLocalStorage(data);
      return true;
    } catch {
      return false;
    }
  },

  exportSaveData: () => {
    const state = get();
    const data = {
      character: state.character,
      quests: state.quests,
      shopItems: state.shopItems,
      achievements: state.achievements,
      skills: state.skills,
      worldLocations: state.worldLocations,
      settings: state.settings,
    };
    return JSON.stringify(data, null, 2);
  },

  // Settings
  updateSettings: (updates) => {
    set((state) => {
      const updatedSettings = { ...state.settings, ...updates };
      soundEngine.setSoundEnabled(updatedSettings.soundEnabled);
      soundEngine.setVolume(updatedSettings.volume);
      saveToLocalStorage({
        character: state.character,
        quests: state.quests,
        shopItems: state.shopItems,
        achievements: state.achievements,
        skills: state.skills,
        worldLocations: state.worldLocations,
        settings: updatedSettings,
      });
      return { settings: updatedSettings };
    });
  },

  // Modals & Popups
  closeLevelUpModal: () => set({ levelUpModal: null }),
  clearAchievementToast: () => set({ recentlyUnlockedAchievement: null }),
}));


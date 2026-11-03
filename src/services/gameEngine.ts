import { AttributeType } from '../types/game';

// Level progression curve
// Level N requires XP to reach Level N+1
export const getXPForLevel = (level: number): number => {
  if (level <= 1) return 100;
  if (level === 2) return 150; // Total 250
  if (level === 3) return 200; // Total 450
  if (level === 4) return 250; // Total 700
  if (level === 5) return 300; // Total 1000
  return Math.floor(100 * Math.pow(level, 1.45));
};

// Title associated with character level
export const getTitleForLevel = (level: number): string => {
  if (level < 3) return 'Novice Adventurer';
  if (level < 5) return 'Apprentice Seeker';
  if (level < 8) return 'Quest Explorer';
  if (level < 12) return 'Habit Knight';
  if (level < 16) return 'Valor Guardian';
  if (level < 20) return 'Steadfast Hero';
  if (level < 25) return 'Discipline Champion';
  if (level < 30) return 'Master Ascendant';
  return 'Legendary Mythic';
};

// Difficulty reward scaling defaults
export const DIFFICULTY_REWARDS = {
  easy: { xp: 10, gold: 5 },
  medium: { xp: 25, gold: 15 },
  hard: { xp: 50, gold: 35 },
  epic: { xp: 100, gold: 80 },
};

// Map habit category/attribute to stat increments
export const getAttributeForCategory = (category: string): AttributeType => {
  switch (category) {
    case 'physical':
    case 'fitness':
    case 'workout':
      return 'strength';
    case 'study':
    case 'learning':
    case 'reading':
      return 'intelligence';
    case 'health':
    case 'nutrition':
    case 'sleep':
    case 'hydration':
      return 'vitality';
    case 'mindfulness':
    case 'meditation':
    case 'journaling':
      return 'wisdom';
    default:
      return 'discipline';
  }
};

// Date helper: Format YYYY-MM-DD
export const getTodayKey = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// Check if a date string is today
export const isToday = (dateString?: string): boolean => {
  if (!dateString) return false;
  return dateString.startsWith(getTodayKey());
};

// Calculate streak based on completion history
export const calculateStreak = (completionHistory: string[]): { currentStreak: number; bestStreak: number } => {
  if (!completionHistory || completionHistory.length === 0) {
    return { currentStreak: 0, bestStreak: 0 };
  }

  // Deduplicate and sort descending
  const uniqueDates = Array.from(new Set(completionHistory)).sort().reverse();
  const today = getTodayKey();

  const d = new Date();
  d.setDate(d.getDate() - 1);
  const yesterday = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  let currentStreak = 0;
  let checkDate = new Date();

  // If completed today, start counting from today. If completed yesterday, count from yesterday.
  if (uniqueDates.includes(today)) {
    // start from today
  } else if (uniqueDates.includes(yesterday)) {
    // completed yesterday, streak is still active today pending today's completion
    checkDate.setDate(checkDate.getDate() - 1);
  } else {
    // Broken streak
    currentStreak = 0;
  }

  if (uniqueDates.includes(today) || uniqueDates.includes(yesterday)) {
    for (let i = 0; i < 365; i++) {
      const year = checkDate.getFullYear();
      const month = String(checkDate.getMonth() + 1).padStart(2, '0');
      const day = String(checkDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      if (uniqueDates.includes(dateStr)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  // Calculate longest streak historically
  let longestStreak = 0;
  let tempStreak = 0;
  const sortedAsc = Array.from(new Set(completionHistory)).sort();
  
  if (sortedAsc.length > 0) {
    tempStreak = 1;
    longestStreak = 1;
    for (let i = 1; i < sortedAsc.length; i++) {
      const prevDate = new Date(sortedAsc[i - 1]);
      const currDate = new Date(sortedAsc[i]);
      const diffDays = Math.round((currDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24));
      
      if (diffDays === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else if (diffDays > 1) {
        tempStreak = 1;
      }
    }
  }

  return {
    currentStreak,
    bestStreak: Math.max(currentStreak, longestStreak),
  };
};


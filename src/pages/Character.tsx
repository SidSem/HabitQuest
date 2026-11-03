import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { getXPForLevel, getTitleForLevel } from '../services/gameEngine';
import { 
  CharacterSpriteRenderer, 
  CompanionPetRenderer, 
  PixelCoin, 
  PixelFlame, 
  PixelGem, 
  PixelCrown,
  PixelShield,
  PixelSword,
  RenderPixelIcon
} from '../components/common/PixelIcons';
import { CharacterClass } from '../types/game';
import { Edit2, Check, Shield, Zap, Sparkles } from 'lucide-react';

export const Character: React.FC = () => {
  const { character, updateProfile, shopItems } = useGameStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(character.name);

  const xpNeeded = getXPForLevel(character.level);
  const xpPercent = Math.min(100, Math.round((character.currentXP / xpNeeded) * 100));

  const handleSaveName = () => {
    if (nameInput.trim()) {
      updateProfile({ name: nameInput.trim() });
    }
    setIsEditingName(false);
  };

  const handleClassChange = (newClass: CharacterClass) => {
    updateProfile({ avatar: newClass });
  };

  // Attributes metadata
  const attributesList = [
    {
      key: 'strength' as const,
      name: 'Strength (STR)',
      desc: 'Physical conditioning, workouts, and cardio endurance',
      val: character.attributes.strength,
      color: 'bg-red-500',
      border: 'border-red-500/60',
      icon: PixelSword,
    },
    {
      key: 'intelligence' as const,
      name: 'Intelligence (INT)',
      desc: 'Deep study, daily reading, learning, and algorithmic practice',
      val: character.attributes.intelligence,
      color: 'bg-blue-500',
      border: 'border-blue-500/60',
      icon: PixelGem,
    },
    {
      key: 'vitality' as const,
      name: 'Vitality (VIT)',
      desc: 'Hydration, nutritious food, sleep hygiene, and body recovery',
      val: character.attributes.vitality,
      color: 'bg-emerald-500',
      border: 'border-emerald-500/60',
      icon: Shield,
    },
    {
      key: 'wisdom' as const,
      name: 'Wisdom (WIS)',
      desc: 'Mindful breathing, meditation, gratitude, and journaling',
      val: character.attributes.wisdom,
      color: 'bg-purple-500',
      border: 'border-purple-500/60',
      icon: Sparkles,
    },
    {
      key: 'discipline' as const,
      name: 'Discipline (DIS)',
      desc: 'Overall consistency, unbroken habit streaks, and willpower',
      val: character.attributes.discipline,
      color: 'bg-amber-500',
      border: 'border-amber-500/60',
      icon: Zap,
    },
  ];

  // Equipped gear lookup
  const equippedWeapon = shopItems.find((i) => i.id === character.equippedItems.weapon);
  const equippedArmor = shopItems.find((i) => i.id === character.equippedItems.armor);
  const equippedHelm = shopItems.find((i) => i.id === character.equippedItems.helmet);
  const equippedPet = shopItems.find((i) => i.id === character.equippedItems.pet);
  const equippedTitle = shopItems.find((i) => i.id === character.equippedItems.title);

  const availableClasses: CharacterClass[] = ['warrior', 'mage', 'rogue', 'paladin', 'druid', 'ranger'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="bg-[#121633] border-3 border-amber-500/60 p-5 shadow-pixel mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center shadow-pixel-sm">
            <PixelCrown size={28} />
          </div>
          <div>
            <h1 className="font-pixel text-base sm:text-lg text-amber-200">
              CHARACTER ROSTER & PROFILE
            </h1>
            <p className="text-xs text-indigo-300 font-retro">
              HERO STATS, RPG ATTRIBUTES, AND LEVEL PROGRESSION
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-pixel text-[10px] text-gray-400">CLASS:</span>
          <div className="flex gap-1">
            {availableClasses.map((cls) => (
              <button
                key={cls}
                onClick={() => handleClassChange(cls)}
                title={`Switch to ${cls.toUpperCase()}`}
                className={`px-2 py-1 font-pixel text-[9px] uppercase border transition-all ${
                  character.avatar === cls
                    ? 'border-amber-400 bg-amber-500 text-black font-bold'
                    : 'border-[#303869] bg-[#0c0e20] text-gray-400 hover:text-white'
                }`}
              >
                {cls.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Character Paperdoll & Equipment Display */}
        <div className="lg:col-span-5 space-y-6">
          {/* Character Paperdoll Card */}
          <div className="pixel-frame p-5 text-center relative">
            {/* Inline Name Edit */}
            <div className="flex items-center justify-center gap-2 mb-1">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="bg-[#0b0e22] border-2 border-amber-400 px-2 py-1 font-pixel text-xs text-white outline-none"
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-1 bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    <Check size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="font-pixel text-sm sm:text-base text-amber-300 font-bold">
                    {character.name}
                  </h2>
                  <button
                    onClick={() => {
                      setNameInput(character.name);
                      setIsEditingName(true);
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <Edit2 size={13} />
                  </button>
                </div>
              )}
            </div>

            <div className="font-retro text-xs text-indigo-300 uppercase tracking-widest mb-4">
              ★ {character.title} ★
            </div>

            {/* Sprite Display */}
            <div className="py-4 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-radial from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
              <CharacterSpriteRenderer
                characterClass={character.avatar}
                size={160}
                animate={true}
              />
            </div>

            {/* Level & XP Strip */}
            <div className="bg-[#0c0f24] border-2 border-[#2b3363] p-3 text-left my-2 shadow-pixel-sm">
              <div className="flex justify-between font-pixel text-[10px] text-purple-200 mb-1">
                <span>LEVEL {character.level} {character.avatar.toUpperCase()}</span>
                <span>{character.currentXP} / {xpNeeded} XP</span>
              </div>
              <div className="w-full h-4 bg-black border border-[#444e8d] p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 transition-all duration-300"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>

            {/* Equipped Items Summary */}
            <div className="mt-4 pt-4 border-t border-indigo-900/80">
              <div className="font-pixel text-[10px] text-amber-400 text-left mb-2">
                EQUIPPED ARMAMENT
              </div>
              <div className="grid grid-cols-4 gap-2">
                {/* Weapon */}
                <div className="p-2 pixel-slot flex flex-col items-center justify-center text-center">
                  <span className="font-retro text-[8px] text-gray-400 mb-1">WEAPON</span>
                  {equippedWeapon ? (
                    <RenderPixelIcon name={equippedWeapon.icon} size={22} />
                  ) : (
                    <span className="text-[10px] text-gray-600">-</span>
                  )}
                  <span className="text-[8px] text-gray-300 font-pixel mt-1 truncate w-full">
                    {equippedWeapon?.name || 'Empty'}
                  </span>
                </div>

                {/* Armor */}
                <div className="p-2 pixel-slot flex flex-col items-center justify-center text-center">
                  <span className="font-retro text-[8px] text-gray-400 mb-1">ARMOR</span>
                  {equippedArmor ? (
                    <RenderPixelIcon name={equippedArmor.icon} size={22} />
                  ) : (
                    <span className="text-[10px] text-gray-600">-</span>
                  )}
                  <span className="text-[8px] text-gray-300 font-pixel mt-1 truncate w-full">
                    {equippedArmor?.name || 'Empty'}
                  </span>
                </div>

                {/* Helm */}
                <div className="p-2 pixel-slot flex flex-col items-center justify-center text-center">
                  <span className="font-retro text-[8px] text-gray-400 mb-1">HELMET</span>
                  {equippedHelm ? (
                    <RenderPixelIcon name={equippedHelm.icon} size={22} />
                  ) : (
                    <span className="text-[10px] text-gray-600">-</span>
                  )}
                  <span className="text-[8px] text-gray-300 font-pixel mt-1 truncate w-full">
                    {equippedHelm?.name || 'Empty'}
                  </span>
                </div>

                {/* Pet */}
                <div className="p-2 pixel-slot flex flex-col items-center justify-center text-center">
                  <span className="font-retro text-[8px] text-gray-400 mb-1">PET</span>
                  {equippedPet ? (
                    <CompanionPetRenderer petType={equippedPet.icon} size={24} />
                  ) : (
                    <span className="text-[10px] text-gray-600">-</span>
                  )}
                  <span className="text-[8px] text-gray-300 font-pixel mt-1 truncate w-full">
                    {equippedPet?.name || 'None'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Records & Lifetime Trophies */}
          <div className="pixel-frame p-4 space-y-2.5">
            <h3 className="font-pixel text-xs text-amber-300 pb-2 border-b border-indigo-900">
              HALL OF RECORDS
            </h3>
            <div className="flex justify-between items-center text-xs py-1 border-b border-indigo-950">
              <span className="text-gray-400 font-mono">Total Quests Completed:</span>
              <span className="font-pixel text-emerald-300">{character.totalQuestsCompleted}</span>
            </div>
            <div className="flex justify-between items-center text-xs py-1 border-b border-indigo-950">
              <span className="text-gray-400 font-mono">Current Habit Streak:</span>
              <span className="font-pixel text-amber-300">{character.currentStreak} Days</span>
            </div>
            <div className="flex justify-between items-center text-xs py-1 border-b border-indigo-950">
              <span className="text-gray-400 font-mono">Longest Historical Streak:</span>
              <span className="font-pixel text-amber-300">{character.longestStreak} Days</span>
            </div>
            <div className="flex justify-between items-center text-xs py-1 border-b border-indigo-950">
              <span className="text-gray-400 font-mono">Total Gold Amassed:</span>
              <span className="font-pixel text-amber-400">{character.gold} G</span>
            </div>
            <div className="flex justify-between items-center text-xs py-1">
              <span className="text-gray-400 font-mono">Total Lifetime XP:</span>
              <span className="font-pixel text-purple-300">{character.totalXP} XP</span>
            </div>
          </div>
        </div>

        {/* Right Column: RPG Attributes & Progression System */}
        <div className="lg:col-span-7 space-y-6">
          {/* Attributes Panel */}
          <div className="pixel-frame p-5">
            <div className="flex items-center justify-between pb-3 border-b-2 border-indigo-900 mb-4">
              <div className="flex items-center gap-2">
                <PixelShield size={20} />
                <h3 className="font-pixel text-xs sm:text-sm text-amber-300">
                  RPG CHARACTER ATTRIBUTES
                </h3>
              </div>
              <span className="font-retro text-[10px] text-gray-400">
                SCALED BY HABIT DISCIPLINE
              </span>
            </div>

            <p className="text-xs text-gray-300 mb-4 font-mono leading-relaxed">
              Every completed habit directly cultivates your hero's core RPG statistics. Completing workouts builds Strength, studying raises Intelligence, mindfulness grants Wisdom, and unwavering streaks expand Discipline.
            </p>

            {/* Stat Bars */}
            <div className="space-y-4">
              {attributesList.map((attr) => {
                const Icon = attr.icon;
                const maxVal = 50;
                const percent = Math.min(100, Math.round((attr.val / maxVal) * 100));

                return (
                  <div key={attr.key} className="bg-[#0c0f24] border border-[#2b3363] p-3 shadow-pixel-sm">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="text-amber-400" />
                        <span className="font-pixel text-xs text-white">{attr.name}</span>
                      </div>
                      <span className="font-pixel text-xs text-amber-300">{attr.val} / {maxVal}</span>
                    </div>

                    <p className="text-[11px] text-gray-400 mb-2 font-mono">
                      {attr.desc}
                    </p>

                    {/* Pixel Stat Bar */}
                    <div className="w-full h-3.5 bg-black border border-[#3c4682] p-0.5">
                      <div
                        className={`h-full ${attr.color} transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Level Progression Roadmap */}
          <div className="pixel-frame p-5">
            <h3 className="font-pixel text-xs sm:text-sm text-amber-300 pb-3 border-b-2 border-indigo-900 mb-4">
              ASCENSION ROADMAP & TITLES
            </h3>

            <div className="space-y-3">
              {[
                { lvl: 1, title: 'Novice Adventurer', unlocked: character.level >= 1 },
                { lvl: 3, title: 'Apprentice Seeker', unlocked: character.level >= 3 },
                { lvl: 5, title: 'Quest Explorer', unlocked: character.level >= 5 },
                { lvl: 8, title: 'Habit Knight', unlocked: character.level >= 8 },
                { lvl: 12, title: 'Valor Guardian', unlocked: character.level >= 12 },
                { lvl: 16, title: 'Steadfast Hero', unlocked: character.level >= 16 },
                { lvl: 20, title: 'Discipline Champion', unlocked: character.level >= 20 },
                { lvl: 25, title: 'Master Ascendant', unlocked: character.level >= 25 },
                { lvl: 30, title: 'Legendary Mythic', unlocked: character.level >= 30 },
              ].map((tier) => (
                <div
                  key={tier.lvl}
                  className={`flex items-center justify-between p-2.5 border transition-all ${
                    tier.unlocked
                      ? 'bg-[#141a3d] border-amber-500/60 text-amber-200'
                      : 'bg-[#090b17] border-gray-800/80 text-gray-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-pixel text-xs font-bold w-16">
                      LVL {tier.lvl}
                    </span>
                    <span className="font-pixel text-xs">
                      {tier.title}
                    </span>
                  </div>
                  <span className="font-retro text-[10px]">
                    {tier.unlocked ? '✓ ATTAINED' : 'LOCKED'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


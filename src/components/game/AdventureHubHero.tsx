import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { getXPForLevel } from '../../services/gameEngine';
import { 
  CharacterSpriteRenderer, 
  CompanionPetRenderer, 
  PixelCoin, 
  PixelFlame, 
  PixelGem, 
  PixelCrown,
  PixelSword
} from '../common/PixelIcons';
import { motion } from 'framer-motion';

export const AdventureHubHero: React.FC<{ onScrollToBoard: () => void }> = ({ onScrollToBoard }) => {
  const { character, quests } = useGameStore();

  const xpNeeded = getXPForLevel(character.level);
  const xpPercent = Math.min(100, Math.round((character.currentXP / xpNeeded) * 100));

  // Daily statistics
  const todayQuests = quests.filter((q) => q.category === 'daily');
  const completedToday = todayQuests.filter((q) => q.completed).length;
  const xpToday = quests
    .filter((q) => q.completed && q.completedAt)
    .reduce((sum, q) => sum + q.xpReward, 0);

  return (
    <div className="relative w-full overflow-hidden border-b-4 border-game-border bg-gradient-to-b from-[#060814] via-[#0d102b] to-[#15193b] select-none">
      {/* Pixel Starfield & Sky Layer */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-6 left-12 w-1.5 h-1.5 bg-white pixelated animate-pulse" />
        <div className="absolute top-14 left-1/4 w-1 h-1 bg-amber-200 pixelated animate-pulse" />
        <div className="absolute top-8 left-2/3 w-1.5 h-1.5 bg-cyan-200 pixelated" />
        <div className="absolute top-20 left-3/4 w-1 h-1 bg-purple-200 pixelated animate-pulse" />
        <div className="absolute top-10 right-16 w-2 h-2 bg-yellow-100 pixelated animate-pulse" />
        <div className="absolute top-28 right-1/3 w-1 h-1 bg-pink-200 pixelated" />
      </div>

      {/* Retro Pixel Moon & Clouds */}
      <div className="absolute top-6 right-8 md:right-16 z-0 pointer-events-none">
        {/* Pixel Moon */}
        <div className="relative w-16 h-16 bg-amber-100 border-2 border-amber-300 shadow-[0_0_24px_rgba(251,191,36,0.3)] pixelated">
          <div className="absolute top-3 left-3 w-3 h-3 bg-amber-200" />
          <div className="absolute bottom-4 right-4 w-4 h-3 bg-amber-200" />
        </div>
      </div>

      {/* Pixel Cloud Layers Floating */}
      <div className="absolute top-12 left-6 opacity-30 animate-float pointer-events-none">
        <div className="w-24 h-6 bg-slate-300/40 relative">
          <div className="absolute -top-3 left-4 w-12 h-3 bg-slate-300/40" />
        </div>
      </div>
      <div className="absolute top-24 right-1/3 opacity-25 animate-float pointer-events-none" style={{ animationDelay: '1.5s' }}>
        <div className="w-32 h-7 bg-indigo-200/30 relative">
          <div className="absolute -top-3 left-6 w-16 h-4 bg-indigo-200/30" />
        </div>
      </div>

      {/* Distant Pixel Mountain Silhouette */}
      <div className="absolute bottom-16 inset-x-0 h-32 opacity-25 pointer-events-none flex items-end justify-around">
        <div className="w-0 h-0 border-l-[70px] border-l-transparent border-r-[70px] border-r-transparent border-b-[100px] border-b-indigo-900" />
        <div className="w-0 h-0 border-l-[110px] border-l-transparent border-r-[110px] border-r-transparent border-b-[140px] border-b-purple-950" />
        <div className="w-0 h-0 border-l-[80px] border-l-transparent border-r-[80px] border-r-transparent border-b-[110px] border-b-indigo-900" />
      </div>

      {/* Medieval Pixel Castle & Fortress in Background */}
      <div className="absolute bottom-16 right-4 md:right-24 opacity-40 pointer-events-none hidden sm:block">
        <div className="relative">
          {/* Main keep */}
          <div className="w-28 h-24 bg-[#1e234a] border-t-4 border-[#3c4587] relative">
            {/* Turrets / Battlements */}
            <div className="absolute -top-4 left-0 w-6 h-4 bg-[#1e234a]" />
            <div className="absolute -top-4 left-10 w-8 h-4 bg-[#1e234a]" />
            <div className="absolute -top-4 right-0 w-6 h-4 bg-[#1e234a]" />
            {/* Castle Windows */}
            <div className="absolute top-6 left-6 w-3 h-5 bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            <div className="absolute top-6 right-6 w-3 h-5 bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            {/* Castle Gate */}
            <div className="absolute bottom-0 left-10 w-8 h-10 bg-[#0d0f22] border-t-2 border-[#5a66b2]" />
          </div>
        </div>
      </div>

      {/* Evergreen Pixel Trees */}
      <div className="absolute bottom-16 left-6 md:left-20 opacity-40 pointer-events-none hidden sm:flex space-x-6 items-end">
        {/* Tree 1 */}
        <div className="flex flex-col items-center">
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-emerald-700" />
          <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[24px] border-b-emerald-800 -mt-2" />
          <div className="w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-b-[30px] border-b-emerald-900 -mt-2" />
          <div className="w-3 h-5 bg-[#3e2719]" />
        </div>
        {/* Tree 2 */}
        <div className="flex flex-col items-center">
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[16px] border-b-emerald-600" />
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[20px] border-b-emerald-700 -mt-2" />
          <div className="w-2.5 h-4 bg-[#3e2719]" />
        </div>
      </div>

      {/* Ground Grass / Cobblestone Line */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-[#161c36] border-t-4 border-[#313c6e] z-10">
        <div className="h-2 w-full bg-[#10b981]/30" />
        <div className="p-2 flex justify-between text-[10px] text-indigo-300 font-pixel opacity-40">
          <span>❖ REALM OF DISCIPLINE ❖</span>
          <span>ZONE: LEVEL {character.level} SANCTUARY</span>
        </div>
      </div>

      {/* Main Foreground Container */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 pt-6 pb-20 md:py-10">
        {/* Top Floating Adventure Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          {/* Greeting Banner */}
          <div className="bg-[#121630]/90 border-2 border-indigo-500/40 px-3 py-1.5 shadow-pixel flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 animate-ping rounded-full inline-block" />
            <span className="font-pixel text-[10px] md:text-xs text-amber-300 tracking-wider">
              WELCOME BACK, ADVENTURER
            </span>
          </div>

          {/* Quick Stat Pills: Streak, Gold */}
          <div className="flex items-center gap-2.5">
            {/* Streak Pill */}
            <div className="flex items-center gap-1.5 bg-[#1a1429] border-2 border-rose-500/50 px-3 py-1.5 shadow-pixel">
              <PixelFlame size={18} />
              <div className="flex flex-col">
                <span className="font-pixel text-[9px] text-rose-300 leading-none">STREAK</span>
                <span className="font-pixel text-xs text-white leading-none mt-0.5">{character.currentStreak} DAYS</span>
              </div>
            </div>

            {/* Gold Pill */}
            <div className="flex items-center gap-1.5 bg-[#251d10] border-2 border-amber-500/60 px-3 py-1.5 shadow-pixel">
              <PixelCoin size={18} />
              <div className="flex flex-col">
                <span className="font-pixel text-[9px] text-amber-400 leading-none">GOLD</span>
                <span className="font-pixel text-xs text-amber-200 leading-none mt-0.5">{character.gold}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Central Stage: Character + Companion & Floating HUD */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Hero Stage: Pixel Avatar & Companion */}
          <div className="md:col-span-5 flex flex-col items-center justify-center py-4">
            {/* Floating Character Nameplate */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#10142d] border-2 border-amber-400/80 px-4 py-1.5 shadow-pixel-gold text-center mb-3 relative"
            >
              <div className="font-pixel text-xs md:text-sm text-amber-300 tracking-wide font-bold">
                {character.name}
              </div>
              <div className="font-retro text-[10px] text-indigo-300 uppercase tracking-widest mt-0.5">
                ★ {character.title} ★
              </div>
              {/* Triangle pointer below */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-amber-400" />
            </motion.div>

            {/* Character & Companion Display Ground */}
            <div className="relative flex items-end justify-center gap-2 my-2">
              {/* Animated Main Hero Sprite */}
              <CharacterSpriteRenderer 
                characterClass={character.avatar} 
                size={140}
                animate={true}
              />

              {/* Animated Companion Pet beside hero */}
              {character.equippedItems.pet && (
                <div className="animate-bounce-short" style={{ animationDelay: '0.2s' }}>
                  <CompanionPetRenderer 
                    petType={character.equippedItems.pet} 
                    size={52} 
                  />
                </div>
              )}
            </div>

            {/* Level Badge under hero */}
            <div className="mt-2 flex items-center gap-2 bg-[#0d0f22] border-2 border-indigo-400 px-3 py-1 shadow-pixel">
              <PixelCrown size={14} />
              <span className="font-pixel text-[11px] text-indigo-200">
                LEVEL {character.level} {character.avatar.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Right Adventure Stats Panel */}
          <div className="md:col-span-7 bg-[#111530]/95 border-3 border-[#394279] p-4 sm:p-5 shadow-pixel relative">
            {/* Corner Decorative Rivets */}
            <div className="absolute top-1 left-1 w-2 h-2 bg-[#5d6bb8] border border-black" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-[#5d6bb8] border border-black" />
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-[#5d6bb8] border border-black" />
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-[#5d6bb8] border border-black" />

            <div className="flex items-center justify-between pb-3 border-b-2 border-indigo-900/80 mb-4">
              <div className="flex items-center gap-2">
                <PixelGem size={18} />
                <h2 className="font-pixel text-xs sm:text-sm text-purple-300">
                  HERO'S PROGRESSION
                </h2>
              </div>
              <div className="font-retro text-xs text-indigo-400">
                TOTAL XP: <span className="text-white font-bold">{character.totalXP}</span>
              </div>
            </div>

            {/* XP Bar (Retro Segmented Bar) */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-[10px] font-pixel text-purple-200 mb-1.5">
                <span>XP TO NEXT LEVEL:</span>
                <span>{character.currentXP} / {xpNeeded} XP ({xpPercent}%)</span>
              </div>
              <div className="w-full h-5 bg-[#090b17] border-2 border-[#5d6bb8] p-0.5 shadow-pixel-inset relative">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-400 transition-all duration-500 relative"
                  style={{ width: `${xpPercent}%` }}
                >
                  {/* Segment lines for retro look */}
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_18px,rgba(0,0,0,0.5)_20px)] bg-[length:20px_100%]" />
                </div>
              </div>
            </div>

            {/* Daily Objectives Progress Box */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5 text-center">
              {/* Daily Quests Done */}
              <div className="bg-[#0b0e22] border-2 border-emerald-500/40 p-2.5 shadow-pixel-sm">
                <div className="font-retro text-[10px] text-emerald-400 uppercase">TODAY'S QUESTS</div>
                <div className="font-pixel text-sm sm:text-base text-emerald-200 mt-1">
                  {completedToday} / {todayQuests.length}
                </div>
                <div className="text-[9px] text-gray-400 mt-0.5 font-mono">
                  {todayQuests.length > 0 ? `${Math.round((completedToday / todayQuests.length) * 100)}% COMPLETE` : 'NO QUESTS'}
                </div>
              </div>

              {/* XP Earned Today */}
              <div className="bg-[#0b0e22] border-2 border-purple-500/40 p-2.5 shadow-pixel-sm">
                <div className="font-retro text-[10px] text-purple-400 uppercase">XP GAINED TODAY</div>
                <div className="font-pixel text-sm sm:text-base text-purple-200 mt-1">
                  +{xpToday} XP
                </div>
                <div className="text-[9px] text-gray-400 mt-0.5 font-mono">
                  QUEST EXP
                </div>
              </div>

              {/* Skill Points Available */}
              <div className="col-span-2 sm:col-span-1 bg-[#0b0e22] border-2 border-amber-500/40 p-2.5 shadow-pixel-sm">
                <div className="font-retro text-[10px] text-amber-400 uppercase">SKILL POINTS</div>
                <div className="font-pixel text-sm sm:text-base text-amber-200 mt-1">
                  {character.skillPoints} PTS
                </div>
                <div className="text-[9px] text-gray-400 mt-0.5 font-mono">
                  READY TO SPEND
                </div>
              </div>
            </div>

            {/* Prominent "Continue Adventure" Button */}
            <button
              onClick={onScrollToBoard}
              className="w-full pixel-btn-amber py-3 px-4 flex items-center justify-center gap-3 group"
            >
              <PixelSword size={20} className="group-hover:rotate-12 transition-transform" />
              <span className="font-pixel text-xs sm:text-sm tracking-wider font-bold">
                CONTINUE ADVENTURE (TODAY'S QUESTS)
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


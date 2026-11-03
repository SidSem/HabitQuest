import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { 
  RenderPixelIcon, 
  PixelCrown, 
  PixelGem, 
  PixelCoin 
} from '../components/common/PixelIcons';
import { Trophy, Lock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Achievements: React.FC = () => {
  const { achievements } = useGameStore();
  const [filterCategory, setFilterCategory] = useState<'all' | 'quests' | 'streaks' | 'levels' | 'wealth' | 'skills'>('all');

  const categories = [
    { id: 'all', label: 'ALL TROPHIES' },
    { id: 'quests', label: 'QUESTS' },
    { id: 'streaks', label: 'STREAKS' },
    { id: 'levels', label: 'LEVELS' },
    { id: 'wealth', label: 'WEALTH' },
    { id: 'skills', label: 'SKILLS' },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercent = Math.round((unlockedCount / totalCount) * 100);

  const filtered = achievements.filter((ach) => {
    if (filterCategory !== 'all' && ach.category !== filterCategory) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="bg-[#121633] border-3 border-amber-500/60 p-5 shadow-pixel mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center shadow-pixel-sm">
            <Trophy size={28} className="text-amber-400" />
          </div>
          <div>
            <h1 className="font-pixel text-base sm:text-lg text-amber-200">
              HALL OF LEGENDARY ACHIEVEMENTS
            </h1>
            <p className="text-xs text-indigo-300 font-retro">
              MILESTONES OF SELF-DISCIPLINE, HABIT MASTERY, AND PERSEVERANCE
            </p>
          </div>
        </div>

        {/* Global Trophy Progress */}
        <div className="flex items-center gap-4 bg-[#0a0d24] border-2 border-amber-500/50 px-4 py-2 shadow-pixel self-start md:self-auto">
          <div>
            <div className="font-retro text-[9px] text-amber-300">COMPLETION:</div>
            <div className="font-pixel text-xs text-amber-100">
              {unlockedCount} / {totalCount} ({completionPercent}%)
            </div>
          </div>
          <div className="w-24 h-3 bg-black border border-amber-500/60 p-0.5">
            <div
              className="h-full bg-amber-400 transition-all duration-300"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id as typeof filterCategory)}
            className={`py-1.5 px-3 font-pixel text-[10px] uppercase border transition-all whitespace-nowrap ${
              filterCategory === cat.id
                ? 'border-amber-400 bg-amber-500 text-black font-bold shadow-pixel-sm'
                : 'border-[#2d335c] bg-[#10142d] text-gray-300 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Achievement Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((ach) => {
          const progressPercent = Math.min(100, Math.round((ach.progress / ach.maxProgress) * 100));

          return (
            <motion.div
              key={ach.id}
              layout
              className={`relative p-4 border-2 transition-all flex items-start gap-3.5 ${
                ach.unlocked
                  ? 'bg-[#15193d] border-amber-400/80 shadow-pixel'
                  : 'bg-[#0b0e20] border-[#222849] opacity-70 shadow-pixel'
              }`}
            >
              {/* Icon Frame */}
              <div
                className={`w-14 h-14 shrink-0 flex items-center justify-center ${
                  ach.unlocked
                    ? 'pixel-slot-equipped'
                    : 'pixel-slot filter grayscale brightness-50'
                }`}
              >
                {ach.unlocked ? (
                  <RenderPixelIcon name={ach.icon} size={28} />
                ) : (
                  <Lock size={22} className="text-gray-500" />
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className={`font-pixel text-xs sm:text-sm font-bold truncate ${
                    ach.unlocked ? 'text-amber-200' : 'text-gray-400'
                  }`}>
                    {ach.title}
                  </h3>
                  <span className={`font-retro text-[9px] uppercase px-1.5 py-0.5 border ${
                    ach.unlocked
                      ? 'border-emerald-500 text-emerald-300 bg-emerald-950/60'
                      : 'border-gray-700 text-gray-500'
                  }`}>
                    {ach.unlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>

                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                  {ach.description}
                </p>

                {/* Progress bar */}
                <div className="mt-2.5">
                  <div className="flex justify-between items-center text-[9px] font-pixel text-gray-400 mb-1">
                    <span>PROGRESS:</span>
                    <span>{ach.progress} / {ach.maxProgress}</span>
                  </div>
                  <div className="w-full h-2.5 bg-black border border-[#3b4379] p-0.5">
                    <div
                      className={`h-full transition-all duration-300 ${
                        ach.unlocked ? 'bg-amber-400' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Rewards */}
                <div className="flex items-center gap-3 mt-2 font-pixel text-[9px]">
                  <span className="flex items-center gap-1 text-purple-300">
                    <PixelGem size={12} />
                    +{ach.xpReward} XP
                  </span>
                  <span className="flex items-center gap-1 text-amber-300">
                    <PixelCoin size={12} />
                    +{ach.goldReward} G
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};


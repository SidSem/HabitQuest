import React from 'react';
import { useGameStore } from '../store/gameStore';
import { 
  PixelFlame, 
  PixelGem, 
  PixelCrown, 
  PixelShield, 
  PixelCoin, 
  RenderPixelIcon 
} from '../components/common/PixelIcons';
import { BarChart2, TrendingUp, Calendar, Award, Zap } from 'lucide-react';

export const Statistics: React.FC = () => {
  const { character, quests } = useGameStore();

  // Calculate Best Performing Habit (highest streak)
  const sortedByStreak = [...quests].sort((a, b) => b.streak - a.streak);
  const bestHabit = sortedByStreak[0];

  // Most Challenging Habit (lowest streak among daily/active)
  const sortedByDifficulty = [...quests]
    .filter((q) => q.category === 'daily')
    .sort((a, b) => {
      const diffWeight = { easy: 1, medium: 2, hard: 3, epic: 4 };
      return diffWeight[b.difficulty] - diffWeight[a.difficulty];
    });
  const hardestHabit = sortedByDifficulty[0];

  // Category completion counts
  const categoryCounts: Record<string, { total: number; completed: number }> = {
    daily: { total: 0, completed: 0 },
    weekly: { total: 0, completed: 0 },
    main: { total: 0, completed: 0 },
    side: { total: 0, completed: 0 },
  };

  quests.forEach((q) => {
    if (categoryCounts[q.category]) {
      categoryCounts[q.category].total += 1;
      if (q.completed) categoryCounts[q.category].completed += 1;
    }
  });

  // Generate 28-day retroactive pixel consistency matrix
  const daysArray = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    // Count how many quests were completed on that date
    const count = quests.reduce((acc, q) => acc + (q.completionHistory.includes(key) ? 1 : 0), 0);
    return { date: key, count, day: d.toLocaleDateString('en-US', { weekday: 'short' }) };
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="bg-[#121633] border-3 border-cyan-500/60 p-5 shadow-pixel mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center shadow-pixel-sm">
            <BarChart2 size={28} className="text-cyan-400" />
          </div>
          <div>
            <h1 className="font-pixel text-base sm:text-lg text-cyan-200">
              EXPEDITION STATS & MASTERY MATRIX
            </h1>
            <p className="text-xs text-indigo-300 font-retro">
              RETRO ANALYTICS ON HABIT CONSISTENCY, DISCIPLINE, AND REALM PROGRESS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#091522] border-2 border-cyan-400/50 px-4 py-2 shadow-pixel self-start md:self-auto">
          <TrendingUp size={20} className="text-cyan-300" />
          <span className="font-pixel text-xs text-cyan-200">
            HERO LEVEL {character.level} • {character.totalXP} TOTAL XP
          </span>
        </div>
      </div>

      {/* Top 4 Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="pixel-frame p-4">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="font-retro text-[10px]">CURRENT STREAK</span>
            <PixelFlame size={18} />
          </div>
          <div className="font-pixel text-lg sm:text-xl text-amber-300">{character.currentStreak} DAYS</div>
          <div className="text-[10px] text-gray-400 mt-1 font-mono">Unbroken discipline chain</div>
        </div>

        <div className="pixel-frame p-4">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="font-retro text-[10px]">HISTORICAL RECORD</span>
            <PixelCrown size={18} />
          </div>
          <div className="font-pixel text-lg sm:text-xl text-purple-300">{character.longestStreak} DAYS</div>
          <div className="text-[10px] text-gray-400 mt-1 font-mono">Personal all-time best</div>
        </div>

        <div className="pixel-frame p-4">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="font-retro text-[10px]">TOTAL FEATS WON</span>
            <PixelShield size={18} />
          </div>
          <div className="font-pixel text-lg sm:text-xl text-emerald-300">{character.totalQuestsCompleted}</div>
          <div className="text-[10px] text-gray-400 mt-1 font-mono">Quests conquered to date</div>
        </div>

        <div className="pixel-frame p-4">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="font-retro text-[10px]">TREASURY VAULT</span>
            <PixelCoin size={18} />
          </div>
          <div className="font-pixel text-lg sm:text-xl text-amber-400">{character.gold} G</div>
          <div className="text-[10px] text-gray-400 mt-1 font-mono">Stored royal currency</div>
        </div>
      </div>

      {/* 28-Day Retro Consistency Heat Matrix */}
      <div className="pixel-frame p-5 mb-6">
        <div className="flex items-center justify-between pb-3 border-b-2 border-indigo-900 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-amber-400" />
            <h3 className="font-pixel text-xs sm:text-sm text-amber-300">
              4-WEEK DISCIPLINE MATRIX
            </h3>
          </div>
          <span className="font-retro text-[10px] text-gray-400">
            DAILY HABIT COMPLETIONS
          </span>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-14 md:grid-cols-28 gap-1.5 py-2">
          {daysArray.map((d, idx) => {
            const intensity =
              d.count === 0
                ? 'bg-[#0a0c1a] border-[#1e2346]'
                : d.count === 1
                ? 'bg-emerald-950 border-emerald-700'
                : d.count === 2
                ? 'bg-emerald-800 border-emerald-500'
                : 'bg-emerald-500 border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.5)]';

            return (
              <div
                key={idx}
                title={`${d.date}: ${d.count} quests completed`}
                className={`aspect-square border p-1 flex flex-col items-center justify-center transition-all ${intensity}`}
              >
                <span className="text-[8px] font-pixel text-gray-300 leading-none">
                  {d.count > 0 ? d.count : ''}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-indigo-900/60 text-[10px] font-mono text-gray-400">
          <span>Past 28 Days</span>
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            <div className="w-2.5 h-2.5 bg-[#0a0c1a] border border-[#1e2346]" />
            <div className="w-2.5 h-2.5 bg-emerald-950 border border-emerald-700" />
            <div className="w-2.5 h-2.5 bg-emerald-800 border border-emerald-500" />
            <div className="w-2.5 h-2.5 bg-emerald-500 border border-emerald-300" />
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Best & Hardest Habit Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Champion Habit */}
        <div className="pixel-frame p-4">
          <div className="flex items-center gap-2 pb-2 border-b border-indigo-900 mb-3">
            <Award size={18} className="text-amber-400" />
            <h4 className="font-pixel text-xs text-amber-200">
              CROWN HABIT (STRONGEST STREAK)
            </h4>
          </div>

          {bestHabit ? (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center pixel-slot-equipped shrink-0">
                <RenderPixelIcon name={bestHabit.icon} size={24} />
              </div>
              <div>
                <div className="font-pixel text-xs text-white">{bestHabit.title}</div>
                <div className="text-[11px] text-gray-300 mt-0.5 line-clamp-1">{bestHabit.description}</div>
                <div className="mt-1 flex items-center gap-2 font-pixel text-[10px] text-amber-300">
                  <PixelFlame size={12} />
                  <span>{bestHabit.streak} DAYS UNBROKEN</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-400 font-mono">No habits recorded yet.</div>
          )}
        </div>

        {/* Most Challenging Habit */}
        <div className="pixel-frame p-4">
          <div className="flex items-center gap-2 pb-2 border-b border-indigo-900 mb-3">
            <Zap size={18} className="text-rose-400" />
            <h4 className="font-pixel text-xs text-rose-300">
              CHIEF ADVERSARY (HIGHEST DIFFICULTY)
            </h4>
          </div>

          {hardestHabit ? (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center pixel-slot shrink-0 border-rose-500/50">
                <RenderPixelIcon name={hardestHabit.icon} size={24} />
              </div>
              <div>
                <div className="font-pixel text-xs text-white">{hardestHabit.title}</div>
                <div className="text-[11px] text-gray-300 mt-0.5 line-clamp-1">{hardestHabit.description}</div>
                <div className="mt-1 flex items-center gap-2 font-pixel text-[10px] text-rose-300">
                  <span>TIER: {hardestHabit.difficulty.toUpperCase()} (+{hardestHabit.xpReward} XP)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-400 font-mono">No habits recorded yet.</div>
          )}
        </div>
      </div>

      {/* Category Performance Breakdown */}
      <div className="pixel-frame p-5">
        <h3 className="font-pixel text-xs sm:text-sm text-amber-300 pb-3 border-b-2 border-indigo-900 mb-4">
          CAMPAIGN CATEGORY COMPLETION BREAKDOWN
        </h3>

        <div className="space-y-3">
          {Object.entries(categoryCounts).map(([catKey, data]) => {
            const percent = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
            return (
              <div key={catKey} className="bg-[#0b0e24] border border-[#2b3363] p-3">
                <div className="flex justify-between items-center text-xs font-pixel mb-1.5">
                  <span className="text-white uppercase">{catKey} CAMPAIGNS</span>
                  <span className="text-amber-300">
                    {data.completed} / {data.total} ({percent}%)
                  </span>
                </div>
                <div className="w-full h-3 bg-black border border-[#3b4379] p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-600 to-emerald-400 transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


import React, { useRef } from 'react';
import { AdventureHubHero } from '../components/game/AdventureHubHero';
import { NoticeBoard } from '../components/game/NoticeBoard';
import { useGameStore } from '../store/gameStore';
import { PixelFlame, PixelGem, PixelCrown, PixelShield } from '../components/common/PixelIcons';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const { character, achievements } = useGameStore();
  const boardRef = useRef<HTMLDivElement>(null);

  const scrollToNoticeBoard = () => {
    const el = document.getElementById('quest-notice-board');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const recentAchievements = achievements.filter((a) => a.unlocked).slice(-3);

  return (
    <div className="w-full flex flex-col">
      {/* 1. Main Pixel RPG Adventure Hero Environment */}
      <AdventureHubHero onScrollToBoard={scrollToNoticeBoard} />

      {/* 2. Quick Realm Status Strip */}
      <div className="max-w-6xl mx-auto w-full px-4 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Consistency Streak */}
          <div className="bg-[#11142f] border-2 border-[#2b3363] p-3 shadow-pixel flex items-center gap-3">
            <div className="p-2 bg-rose-950/60 border border-rose-500/50">
              <PixelFlame size={20} />
            </div>
            <div>
              <div className="font-retro text-[9px] text-gray-400">ACTIVE STREAK</div>
              <div className="font-pixel text-xs sm:text-sm text-white">{character.currentStreak} Days</div>
            </div>
          </div>

          {/* Longest Record */}
          <div className="bg-[#11142f] border-2 border-[#2b3363] p-3 shadow-pixel flex items-center gap-3">
            <div className="p-2 bg-amber-950/60 border border-amber-500/50">
              <PixelCrown size={20} />
            </div>
            <div>
              <div className="font-retro text-[9px] text-gray-400">BEST STREAK</div>
              <div className="font-pixel text-xs sm:text-sm text-amber-200">{character.longestStreak} Days</div>
            </div>
          </div>

          {/* Quests Finished */}
          <div className="bg-[#11142f] border-2 border-[#2b3363] p-3 shadow-pixel flex items-center gap-3">
            <div className="p-2 bg-emerald-950/60 border border-emerald-500/50">
              <PixelShield size={20} />
            </div>
            <div>
              <div className="font-retro text-[9px] text-gray-400">TOTAL FINISHED</div>
              <div className="font-pixel text-xs sm:text-sm text-emerald-200">{character.totalQuestsCompleted} Quests</div>
            </div>
          </div>

          {/* Skill Points Ready */}
          <Link 
            to="/skills" 
            className="bg-[#11142f] border-2 border-purple-500/50 hover:border-purple-400 p-3 shadow-pixel flex items-center gap-3 transition-colors group"
          >
            <div className="p-2 bg-purple-950/60 border border-purple-500/50 group-hover:scale-105 transition-transform">
              <PixelGem size={20} />
            </div>
            <div>
              <div className="font-retro text-[9px] text-purple-300">SKILL POINTS</div>
              <div className="font-pixel text-xs sm:text-sm text-purple-200">{character.skillPoints} Ready ➜</div>
            </div>
          </Link>
        </div>
      </div>

      {/* 3. Daily Quests Notice Board */}
      <div ref={boardRef}>
        <NoticeBoard />
      </div>

      {/* 4. Recent Honors & Trophies Section */}
      <div className="max-w-6xl mx-auto w-full px-4 pb-12">
        <div className="pixel-frame p-4 sm:p-5">
          <div className="flex items-center justify-between pb-3 border-b border-indigo-900 mb-4">
            <div className="flex items-center gap-2">
              <PixelCrown size={18} />
              <h3 className="font-pixel text-xs sm:text-sm text-amber-300">
                RECENT HONORS & TROPHIES
              </h3>
            </div>
            <Link 
              to="/achievements" 
              className="font-pixel text-[10px] text-indigo-400 hover:text-amber-300 transition-colors"
            >
              HALL OF ACHIEVEMENTS ➜
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recentAchievements.map((ach) => (
              <div key={ach.id} className="bg-[#0b0e24] border border-[#2b3363] p-3 flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center pixel-slot-equipped">
                  <PixelCrown size={20} />
                </div>
                <div className="min-w-0">
                  <div className="font-pixel text-[11px] text-amber-200 truncate">{ach.title}</div>
                  <div className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{ach.description}</div>
                  <div className="text-[9px] font-mono text-emerald-400 mt-1">UNLOCKED</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


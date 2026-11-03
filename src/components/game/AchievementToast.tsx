import React, { useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { RenderPixelIcon, PixelGem, PixelCoin } from '../common/PixelIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const AchievementToast: React.FC = () => {
  const { recentlyUnlockedAchievement, clearAchievementToast } = useGameStore();

  useEffect(() => {
    if (recentlyUnlockedAchievement) {
      const timer = setTimeout(() => {
        clearAchievementToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [recentlyUnlockedAchievement, clearAchievementToast]);

  if (!recentlyUnlockedAchievement) return null;

  return (
    <AnimatePresence>
      <div className="fixed top-5 right-4 z-50 max-w-sm w-full pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.9 }}
          className="bg-[#15193b] border-3 border-amber-400 p-3.5 shadow-pixel-gold relative"
        >
          {/* Top Banner */}
          <div className="flex items-center justify-between pb-1.5 border-b border-amber-600/50 mb-2">
            <span className="font-pixel text-[9px] text-amber-300 tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-amber-400 animate-ping inline-block" />
              ACHIEVEMENT UNLOCKED!
            </span>
            <button
              onClick={clearAchievementToast}
              className="text-gray-400 hover:text-white"
            >
              <X size={14} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center pixel-slot-equipped shrink-0">
              <RenderPixelIcon name={recentlyUnlockedAchievement.icon} size={26} />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-pixel text-xs text-amber-100 truncate">
                {recentlyUnlockedAchievement.title}
              </h4>
              <p className="text-[11px] text-gray-300 line-clamp-2 mt-0.5">
                {recentlyUnlockedAchievement.description}
              </p>
              <div className="flex items-center gap-3 mt-1.5 font-pixel text-[9px]">
                <span className="flex items-center gap-1 text-purple-300">
                  <PixelGem size={12} />
                  +{recentlyUnlockedAchievement.xpReward} XP
                </span>
                <span className="flex items-center gap-1 text-amber-300">
                  <PixelCoin size={12} />
                  +{recentlyUnlockedAchievement.goldReward} G
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


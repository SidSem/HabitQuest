import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { PixelCrown, PixelGem, PixelSword } from '../common/PixelIcons';
import { motion, AnimatePresence } from 'framer-motion';

export const LevelUpModal: React.FC = () => {
  const { levelUpModal, closeLevelUpModal, character } = useGameStore();

  if (!levelUpModal || !levelUpModal.isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative w-full max-w-md bg-[#131738] border-4 border-amber-400 p-6 text-center shadow-pixel-gold"
        >
          {/* Animated Glow Border */}
          <div className="absolute inset-0 border-2 border-amber-200/50 pointer-events-none animate-pulse" />

          {/* Crown Icon */}
          <div className="mx-auto w-16 h-16 bg-amber-950/80 border-2 border-amber-400 flex items-center justify-center shadow-pixel-sm mb-4">
            <PixelCrown size={36} />
          </div>

          {/* Level Up Announcement */}
          <div className="font-pixel text-[11px] text-amber-300 tracking-widest uppercase">
            ❖ VALIANT TRIUMPH ❖
          </div>

          <h1 className="font-pixel text-xl sm:text-2xl text-white mt-1 mb-2 tracking-wide font-black">
            LEVEL UP!
          </h1>

          {/* Level Transition Pill */}
          <div className="inline-flex items-center gap-3 bg-[#0a0d24] border-2 border-indigo-400 px-5 py-2 my-3 shadow-pixel">
            <span className="font-pixel text-base text-gray-400">LVL {levelUpModal.oldLevel}</span>
            <span className="text-amber-400 font-pixel text-lg">➜</span>
            <span className="font-pixel text-xl text-amber-300 font-bold">LVL {levelUpModal.newLevel}</span>
          </div>

          {/* New Title */}
          <div className="my-3">
            <div className="font-retro text-xs text-indigo-300">TITLE CONFERRED:</div>
            <div className="font-pixel text-sm text-purple-300 mt-1 font-bold">
              ★ {levelUpModal.newTitle} ★
            </div>
          </div>

          {/* Rewards Gained */}
          <div className="bg-[#0b0e22] border border-indigo-900/80 p-3 my-4 space-y-2 text-left">
            <div className="flex items-center gap-2 font-pixel text-xs text-amber-200">
              <PixelCrown size={14} />
              <span>Skill Points Earned: +{levelUpModal.skillPointsEarned} Point</span>
            </div>
            <div className="flex items-center gap-2 font-pixel text-xs text-emerald-200">
              <PixelGem size={14} />
              <span>Attributes Fortified Across All Disciplines</span>
            </div>
            <div className="flex items-center gap-2 font-pixel text-xs text-cyan-200">
              <PixelSword size={14} />
              <span>New World Map Nodes & Shop Rarities Unlocked</span>
            </div>
          </div>

          {/* Claim Button */}
          <button
            onClick={closeLevelUpModal}
            className="w-full pixel-btn-amber py-3 px-6 font-pixel text-xs sm:text-sm font-bold tracking-wider"
          >
            FORWARD TO GLORY!
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


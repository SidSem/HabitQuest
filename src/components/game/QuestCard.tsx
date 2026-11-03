import React from 'react';
import { Quest } from '../../types/game';
import { useGameStore } from '../../store/gameStore';
import { 
  RenderPixelIcon, 
  PixelCoin, 
  PixelGem, 
  PixelFlame 
} from '../common/PixelIcons';
import { Check, Undo2, Trash2, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuestCardProps {
  quest: Quest;
  onEdit?: (quest: Quest) => void;
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest, onEdit }) => {
  const { completeQuest, undoCompleteQuest, deleteQuest } = useGameStore();

  const difficultyColors = {
    easy: 'border-emerald-600/70 text-emerald-300 bg-emerald-950/40',
    medium: 'border-amber-600/70 text-amber-300 bg-amber-950/40',
    hard: 'border-rose-600/70 text-rose-300 bg-rose-950/40',
    epic: 'border-purple-600/70 text-purple-300 bg-purple-950/40',
  };

  const attributeBadges = {
    strength: { label: 'STR', bg: 'bg-red-900/60 text-red-200 border-red-500/50' },
    intelligence: { label: 'INT', bg: 'bg-blue-900/60 text-blue-200 border-blue-500/50' },
    vitality: { label: 'VIT', bg: 'bg-emerald-900/60 text-emerald-200 border-emerald-500/50' },
    wisdom: { label: 'WIS', bg: 'bg-purple-900/60 text-purple-200 border-purple-500/50' },
    discipline: { label: 'DIS', bg: 'bg-amber-900/60 text-amber-200 border-amber-500/50' },
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={`relative p-3.5 sm:p-4 transition-all duration-150 ${
        quest.completed 
          ? 'bg-[#151326]/80 border-2 border-[#2f2b4a] opacity-80' 
          : 'bg-[#181d3d] border-2 border-[#414b8a] hover:border-amber-400/70 shadow-pixel'
      }`}
    >
      {/* Decorative Parchment / Board Pin in Top Center */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-amber-600 border border-black rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.5)] z-10 flex items-center justify-center">
        <div className="w-1 h-1 bg-amber-200 rounded-full" />
      </div>

      <div className="flex items-start gap-3">
        {/* Quest Icon Badge */}
        <div className={`w-11 h-11 shrink-0 flex items-center justify-center pixel-slot ${
          quest.completed ? 'opacity-50' : 'border-[#5864af]'
        }`}>
          <RenderPixelIcon name={quest.icon} size={24} />
        </div>

        {/* Content details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-1.5 mb-1">
            {/* Category / Difficulty Tag */}
            <span className={`font-pixel text-[9px] px-2 py-0.5 border ${difficultyColors[quest.difficulty]}`}>
              {quest.difficulty.toUpperCase()}
            </span>

            {/* Attribute Tag */}
            <span className={`font-pixel text-[9px] px-1.5 py-0.5 border ${attributeBadges[quest.attribute].bg}`}>
              {attributeBadges[quest.attribute].label}
            </span>

            {/* Streak Indicator */}
            {quest.streak > 0 && (
              <span className="flex items-center gap-0.5 font-retro text-[10px] text-orange-400 bg-orange-950/40 px-1.5 py-0.5 border border-orange-800/50">
                <PixelFlame size={12} />
                {quest.streak}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className={`font-pixel text-xs sm:text-sm tracking-wide leading-snug break-words ${
            quest.completed ? 'line-through text-gray-500' : 'text-amber-100'
          }`}>
            {quest.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-300 mt-1 line-clamp-2 leading-relaxed">
            {quest.description}
          </p>

          {/* Rewards preview & action buttons */}
          <div className="flex items-center justify-between flex-wrap gap-2 mt-3 pt-2.5 border-t border-indigo-900/60">
            {/* Reward Badges */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-pixel text-[10px] text-purple-300">
                <PixelGem size={13} />
                +{quest.xpReward} XP
              </span>
              <span className="flex items-center gap-1 font-pixel text-[10px] text-amber-300">
                <PixelCoin size={13} />
                +{quest.goldReward} G
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5">
              {onEdit && !quest.completed && (
                <button
                  onClick={() => onEdit(quest)}
                  title="Edit Quest"
                  className="p-1.5 bg-[#121630] hover:bg-[#202754] text-gray-400 hover:text-white border border-[#3b4379]"
                >
                  <Edit3 size={13} />
                </button>
              )}

              <button
                onClick={() => deleteQuest(quest.id)}
                title="Abandon Quest"
                className="p-1.5 bg-[#121630] hover:bg-rose-950/80 text-gray-400 hover:text-rose-300 border border-[#3b4379]"
              >
                <Trash2 size={13} />
              </button>

              {quest.completed ? (
                <button
                  onClick={() => undoCompleteQuest(quest.id)}
                  title="Undo Completion"
                  className="pixel-btn-neutral py-1 px-2.5 flex items-center gap-1 font-pixel text-[10px]"
                >
                  <Undo2 size={12} />
                  UNDO
                </button>
              ) : (
                <button
                  onClick={() => completeQuest(quest.id)}
                  className="pixel-btn-emerald py-1 px-3 flex items-center gap-1.5 font-pixel text-[11px]"
                >
                  <Check size={14} className="stroke-[3]" />
                  CLAIM
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


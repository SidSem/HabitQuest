import React, { useState, useEffect } from 'react';
import { Quest, QuestCategory, Difficulty, AttributeType } from '../../types/game';
import { useGameStore } from '../../store/gameStore';
import { DIFFICULTY_REWARDS } from '../../services/gameEngine';
import { RenderPixelIcon, PixelGem, PixelCoin } from '../common/PixelIcons';
import { X, Sparkles } from 'lucide-react';

interface QuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingQuest?: Quest | null;
}

const AVAILABLE_ICONS = ['sword', 'shield', 'potion', 'book', 'scroll', 'flame', 'gem', 'crown', 'heart'];

export const QuestModal: React.FC<QuestModalProps> = ({ isOpen, onClose, editingQuest }) => {
  const { addQuest, updateQuest } = useGameStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<QuestCategory>('daily');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [attribute, setAttribute] = useState<AttributeType>('discipline');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'custom'>('daily');
  const [icon, setIcon] = useState('sword');
  const [xpReward, setXpReward] = useState(25);
  const [goldReward, setGoldReward] = useState(15);
  const [customRewards, setCustomRewards] = useState(false);

  useEffect(() => {
    if (editingQuest) {
      setTitle(editingQuest.title);
      setDescription(editingQuest.description);
      setCategory(editingQuest.category);
      setDifficulty(editingQuest.difficulty);
      setAttribute(editingQuest.attribute);
      setFrequency(editingQuest.frequency);
      setIcon(editingQuest.icon);
      setXpReward(editingQuest.xpReward);
      setGoldReward(editingQuest.goldReward);
      setCustomRewards(true);
    } else {
      setTitle('');
      setDescription('');
      setCategory('daily');
      setDifficulty('medium');
      setAttribute('discipline');
      setFrequency('daily');
      setIcon('sword');
      setXpReward(DIFFICULTY_REWARDS.medium.xp);
      setGoldReward(DIFFICULTY_REWARDS.medium.gold);
      setCustomRewards(false);
    }
  }, [editingQuest, isOpen]);

  // Sync rewards with difficulty if not custom
  const handleDifficultyChange = (diff: Difficulty) => {
    setDifficulty(diff);
    if (!customRewards) {
      setXpReward(DIFFICULTY_REWARDS[diff].xp);
      setGoldReward(DIFFICULTY_REWARDS[diff].gold);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingQuest) {
      updateQuest(editingQuest.id, {
        title: title.trim(),
        description: description.trim(),
        category,
        difficulty,
        attribute,
        frequency,
        icon,
        xpReward: Number(xpReward),
        goldReward: Number(goldReward),
      });
    } else {
      addQuest({
        title: title.trim(),
        description: description.trim(),
        category,
        difficulty,
        attribute,
        frequency,
        icon,
        xpReward: Number(xpReward),
        goldReward: Number(goldReward),
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#141836] border-4 border-amber-500/80 shadow-pixel-gold p-5 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-indigo-900">
          <div className="flex items-center gap-2">
            <Sparkles className="text-amber-400" size={18} />
            <h2 className="font-pixel text-xs sm:text-sm text-amber-300">
              {editingQuest ? 'EDIT ADVENTURE QUEST' : 'INSCRIBE NEW QUEST'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 bg-[#10132b] hover:bg-rose-950 border border-gray-600 text-gray-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-pixel text-[10px] text-indigo-300 mb-1">
              QUEST TITLE *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 30 Minutes of Morning Cardio"
              className="w-full bg-[#0a0c1a] border-2 border-[#373e6b] focus:border-amber-400 px-3 py-2 text-sm text-white outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-pixel text-[10px] text-indigo-300 mb-1">
              DESCRIPTION / OBJECTIVE
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Specify the condition for victory..."
              className="w-full bg-[#0a0c1a] border-2 border-[#373e6b] focus:border-amber-400 px-3 py-2 text-sm text-gray-200 outline-none resize-none"
            />
          </div>

          {/* Category & Frequency */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-pixel text-[10px] text-indigo-300 mb-1">
                CATEGORY
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as QuestCategory)}
                className="w-full bg-[#0a0c1a] border-2 border-[#373e6b] focus:border-amber-400 px-2.5 py-1.5 text-xs text-white outline-none"
              >
                <option value="daily">Daily Quest</option>
                <option value="weekly">Weekly Quest</option>
                <option value="main">Main Quest</option>
                <option value="side">Side Quest</option>
              </select>
            </div>

            <div>
              <label className="block font-pixel text-[10px] text-indigo-300 mb-1">
                ALIGNMENT STAT
              </label>
              <select
                value={attribute}
                onChange={(e) => setAttribute(e.target.value as AttributeType)}
                className="w-full bg-[#0a0c1a] border-2 border-[#373e6b] focus:border-amber-400 px-2.5 py-1.5 text-xs text-white outline-none"
              >
                <option value="strength">Strength (Physical)</option>
                <option value="intelligence">Intelligence (Study)</option>
                <option value="vitality">Vitality (Health/Rest)</option>
                <option value="wisdom">Wisdom (Mindfulness)</option>
                <option value="discipline">Discipline (Habits)</option>
              </select>
            </div>
          </div>

          {/* Difficulty Selection */}
          <div>
            <label className="block font-pixel text-[10px] text-indigo-300 mb-1.5">
              DIFFICULTY LEVEL
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['easy', 'medium', 'hard', 'epic'] as Difficulty[]).map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => handleDifficultyChange(d)}
                  className={`py-1.5 font-pixel text-[9px] uppercase border-2 transition-all ${
                    difficulty === d
                      ? 'border-amber-400 bg-amber-950/60 text-amber-200 shadow-pixel-sm'
                      : 'border-[#2d335c] bg-[#0c0e1f] text-gray-400 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Pixel Icon Selector */}
          <div>
            <label className="block font-pixel text-[10px] text-indigo-300 mb-1.5">
              EMBLEM / ICON
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_ICONS.map((iName) => (
                <button
                  type="button"
                  key={iName}
                  onClick={() => setIcon(iName)}
                  className={`w-9 h-9 flex items-center justify-center pixel-slot transition-all ${
                    icon === iName ? 'pixel-slot-equipped' : 'hover:border-gray-400'
                  }`}
                >
                  <RenderPixelIcon name={iName} size={20} />
                </button>
              ))}
            </div>
          </div>

          {/* Rewards (XP & Gold) */}
          <div className="bg-[#0b0d1e] p-3 border border-[#2b315b]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-pixel text-[10px] text-amber-300">BOUNTY REWARDS</span>
              <button
                type="button"
                onClick={() => setCustomRewards(!customRewards)}
                className="text-[10px] text-indigo-400 hover:text-indigo-200 underline font-mono"
              >
                {customRewards ? 'Use Presets' : 'Customize Rewards'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 bg-[#121630] border border-[#3b4379] px-2.5 py-1.5">
                <PixelGem size={16} />
                <div className="flex-1">
                  <div className="text-[9px] font-pixel text-purple-300">XP REWARD</div>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    disabled={!customRewards}
                    value={xpReward}
                    onChange={(e) => setXpReward(Number(e.target.value))}
                    className="w-full bg-transparent text-sm font-bold text-white outline-none disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#121630] border border-[#3b4379] px-2.5 py-1.5">
                <PixelCoin size={16} />
                <div className="flex-1">
                  <div className="text-[9px] font-pixel text-amber-400">GOLD REWARD</div>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    disabled={!customRewards}
                    value={goldReward}
                    onChange={(e) => setGoldReward(Number(e.target.value))}
                    className="w-full bg-transparent text-sm font-bold text-white outline-none disabled:opacity-60"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t-2 border-indigo-900">
            <button
              type="button"
              onClick={onClose}
              className="pixel-btn-neutral py-2 px-4 font-pixel text-xs"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="pixel-btn-amber py-2 px-6 font-pixel text-xs font-bold"
            >
              {editingQuest ? 'UPDATE QUEST' : 'INSCRIBE QUEST'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


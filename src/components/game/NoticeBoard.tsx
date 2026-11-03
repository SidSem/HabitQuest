import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { QuestCard } from './QuestCard';
import { QuestModal } from './QuestModal';
import { Quest } from '../../types/game';
import { PixelSword, PixelScroll } from '../common/PixelIcons';
import { Plus, Filter } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export const NoticeBoard: React.FC = () => {
  const { quests } = useGameStore();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);

  // Daily quests for today's board
  const dailyQuests = quests.filter((q) => q.category === 'daily');
  const completedCount = dailyQuests.filter((q) => q.completed).length;
  const totalDaily = dailyQuests.length;
  const completionPercent = totalDaily > 0 ? Math.round((completedCount / totalDaily) * 100) : 0;

  const filteredQuests = dailyQuests.filter((q) => {
    if (filter === 'active') return !q.completed;
    if (filter === 'completed') return q.completed;
    return true;
  });

  const handleOpenCreate = () => {
    setEditingQuest(null);
    setIsModalOpen(true);
  };

  const handleEdit = (quest: Quest) => {
    setEditingQuest(quest);
    setIsModalOpen(true);
  };

  return (
    <div id="quest-notice-board" className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Wooden Notice Board Frame */}
      <div className="wood-board p-4 sm:p-6 md:p-8 relative">
        {/* Metal Corner Brackets */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-amber-600/70" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-amber-600/70" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-amber-600/70" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-amber-600/70" />

        {/* Board Top Header Banner */}
        <div className="bg-[#24130a] border-2 border-[#542d17] px-4 py-3 mb-6 shadow-pixel flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <PixelScroll size={28} />
            <div>
              <h2 className="font-pixel text-sm sm:text-base text-amber-200 tracking-wider">
                DAILY QUEST BOARD
              </h2>
              <div className="font-retro text-[11px] text-amber-400/80">
                ROYAL BOUNTIES & DAILY RITUALS
              </div>
            </div>
          </div>

          {/* Daily Progress Indicator: "3 / 5 QUESTS COMPLETED" */}
          <div className="flex items-center gap-4 bg-[#140b06] border border-amber-700/60 px-4 py-2">
            <div className="flex flex-col">
              <span className="font-pixel text-[10px] text-amber-300">
                DAILY PROGRESS:
              </span>
              <span className="font-pixel text-xs sm:text-sm text-emerald-400 font-bold">
                {completedCount} / {totalDaily} QUESTS COMPLETED
              </span>
            </div>

            {/* Mini Progress Bar */}
            <div className="w-24 h-3.5 bg-black border border-amber-600/60 p-0.5">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Controls Bar: Filter tabs & Add Quest Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-amber-400 hidden sm:block" />
            {(['all', 'active', 'completed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`py-1.5 px-3 font-pixel text-[10px] uppercase border transition-all ${
                  filter === tab
                    ? 'border-amber-400 bg-amber-500 text-black font-bold shadow-pixel-sm'
                    : 'border-[#542d17] bg-[#1a0e07] text-amber-200/80 hover:bg-[#2c170c]'
                }`}
              >
                {tab === 'all' && `ALL (${dailyQuests.length})`}
                {tab === 'active' && `ACTIVE (${dailyQuests.length - completedCount})`}
                {tab === 'completed' && `DONE (${completedCount})`}
              </button>
            ))}
          </div>

          {/* New Quest Button */}
          <button
            onClick={handleOpenCreate}
            className="pixel-btn-amber py-2 px-4 flex items-center gap-2 font-pixel text-xs font-bold"
          >
            <Plus size={16} className="stroke-[3]" />
            POST NEW QUEST
          </button>
        </div>

        {/* Quests Grid on the Wooden Board */}
        {filteredQuests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {filteredQuests.map((quest) => (
                <QuestCard 
                  key={quest.id} 
                  quest={quest} 
                  onEdit={handleEdit} 
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-[#180e08] border-2 border-dashed border-[#542d17] p-8 text-center my-4">
            <PixelSword size={32} className="mx-auto mb-2 opacity-40" />
            <div className="font-pixel text-xs text-amber-200">NO QUESTS FOUND IN THIS VIEW</div>
            <p className="text-xs text-amber-400/70 mt-1 max-w-sm mx-auto font-mono">
              Inscribe a new habit quest to fill the royal notice board!
            </p>
            <button
              onClick={handleOpenCreate}
              className="mt-4 pixel-btn-amber py-1.5 px-4 font-pixel text-[11px]"
            >
              + INSCRIBE FIRST QUEST
            </button>
          </div>
        )}
      </div>

      {/* Quest Creation / Edit Modal */}
      <QuestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingQuest={editingQuest}
      />
    </div>
  );
};


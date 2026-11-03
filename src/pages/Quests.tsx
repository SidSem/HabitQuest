import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { QuestCard } from '../components/game/QuestCard';
import { QuestModal } from '../components/game/QuestModal';
import { Quest, QuestCategory, Difficulty } from '../types/game';
import { 
  PixelScroll, 
  PixelSword, 
  PixelGem, 
  PixelShield 
} from '../components/common/PixelIcons';
import { Plus, Search, Filter } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export const Quests: React.FC = () => {
  const { quests } = useGameStore();

  const [activeCategory, setActiveCategory] = useState<QuestCategory | 'completed' | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);

  const categories: { id: QuestCategory | 'completed' | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'ALL QUESTS', count: quests.length },
    { id: 'daily', label: 'DAILY RITUALS', count: quests.filter((q) => q.category === 'daily').length },
    { id: 'weekly', label: 'WEEKLY FEATS', count: quests.filter((q) => q.category === 'weekly').length },
    { id: 'main', label: 'MAIN CAMPAIGNS', count: quests.filter((q) => q.category === 'main').length },
    { id: 'side', label: 'SIDE BOUNTIES', count: quests.filter((q) => q.category === 'side').length },
    { id: 'completed', label: 'COMPLETED ARCHIVES', count: quests.filter((q) => q.completed).length },
  ];

  const filteredQuests = quests.filter((quest) => {
    // Category match
    if (activeCategory === 'completed') {
      if (!quest.completed) return false;
    } else if (activeCategory !== 'all') {
      if (quest.category !== activeCategory) return false;
    }

    // Difficulty match
    if (difficultyFilter !== 'all' && quest.difficulty !== difficultyFilter) {
      return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = quest.title.toLowerCase().includes(q);
      const matchDesc = quest.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="bg-[#121633] border-3 border-indigo-500/60 p-5 shadow-pixel-gold mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-500/10 border-2 border-amber-400 flex items-center justify-center shadow-pixel-sm">
            <PixelScroll size={30} />
          </div>
          <div>
            <h1 className="font-pixel text-base sm:text-lg text-amber-200">
              ROYAL QUEST JOURNAL
            </h1>
            <p className="text-xs text-indigo-300 font-retro">
              ALL ACTIVE CAMPAIGNS, DAILY RITUALS, AND RECORDED ACHIEVEMENTS
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenCreate}
          className="pixel-btn-amber py-2.5 px-5 flex items-center justify-center gap-2 font-pixel text-xs font-bold shrink-0"
        >
          <Plus size={16} className="stroke-[3]" />
          NEW QUEST
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-thin">
        {categories.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`py-2 px-3 font-pixel text-[10px] whitespace-nowrap border-2 transition-all shrink-0 ${
              activeCategory === tab.id
                ? 'border-amber-400 bg-amber-500 text-black font-bold shadow-pixel-sm'
                : 'border-[#2d335c] bg-[#10142d] text-gray-300 hover:text-white hover:bg-[#1a214d]'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#10142d] border-2 border-[#2b3363] p-3 shadow-pixel mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search quest by name or keywords..."
            className="w-full bg-[#080a17] border border-[#3b4379] focus:border-amber-400 pl-9 pr-3 py-1.5 text-xs text-white outline-none"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-400 hidden sm:block" />
          <span className="font-pixel text-[9px] text-gray-400">DIFFICULTY:</span>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as Difficulty | 'all')}
            className="bg-[#080a17] border border-[#3b4379] focus:border-amber-400 px-2.5 py-1 text-xs text-white outline-none font-mono"
          >
            <option value="all">All Tiers</option>
            <option value="easy">Easy (10 XP)</option>
            <option value="medium">Medium (25 XP)</option>
            <option value="hard">Hard (50 XP)</option>
            <option value="epic">Epic (100 XP)</option>
          </select>
        </div>
      </div>

      {/* Quests Grid */}
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
        <div className="bg-[#10142d] border-2 border-dashed border-[#353d73] p-12 text-center my-6">
          <PixelSword size={40} className="mx-auto mb-3 opacity-30 text-amber-400" />
          <h3 className="font-pixel text-xs sm:text-sm text-gray-300">
            NO MATCHING QUESTS FOUND
          </h3>
          <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto font-mono">
            {searchQuery
              ? 'Try adjusting your search keywords or active category filters.'
              : 'Your quest journal is waiting for its next great adventure.'}
          </p>
          <button
            onClick={handleOpenCreate}
            className="mt-4 pixel-btn-amber py-2 px-4 font-pixel text-xs"
          >
            + INSCRIBE NEW QUEST
          </button>
        </div>
      )}

      {/* Quest Inscription Modal */}
      <QuestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingQuest={editingQuest}
      />
    </div>
  );
};


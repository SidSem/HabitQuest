import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { SkillNode } from '../types/game';
import { RenderPixelIcon, PixelGem, PixelCrown } from '../components/common/PixelIcons';
import { GitFork, Lock, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const SkillTree: React.FC = () => {
  const { skills, character, unlockSkill } = useGameStore();
  const [selectedCategory, setSelectedCategory] = useState<'health' | 'learning' | 'productivity' | 'mindfulness'>('health');

  const categories = [
    { id: 'health' as const, label: 'HEALTH & VITALITY', icon: 'potion', desc: 'Hydration, sleep, workouts, and physical constitution' },
    { id: 'learning' as const, label: 'LEARNING & SAGE', icon: 'book', desc: 'Reading, knowledge synthesis, research, and intellect' },
    { id: 'productivity' as const, label: 'PRODUCTIVITY', icon: 'sword', desc: 'Time management, focus sessions, and swift execution' },
    { id: 'mindfulness' as const, label: 'MINDFULNESS', icon: 'scroll', desc: 'Meditation, emotional calm, reflection, and inner zen' },
  ];

  const categorySkills = skills.filter((s) => s.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="bg-[#121633] border-3 border-purple-500/60 p-5 shadow-pixel mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center shadow-pixel-sm">
            <GitFork size={28} className="text-purple-400" />
          </div>
          <div>
            <h1 className="font-pixel text-base sm:text-lg text-purple-200">
              BRANCHING RPG SKILL TREES
            </h1>
            <p className="text-xs text-indigo-300 font-retro">
              INVEST SKILL POINTS TO UNLOCK POWERFUL PASSIVE AURAS AND PERKS
            </p>
          </div>
        </div>

        {/* Available Skill Points Indicator */}
        <div className="flex items-center gap-3 bg-[#1e1430] border-2 border-purple-400 px-4 py-2 shadow-pixel-gold self-start md:self-auto">
          <PixelGem size={22} />
          <div>
            <div className="font-retro text-[9px] text-purple-300">AVAILABLE SKILL POINTS:</div>
            <div className="font-pixel text-sm text-purple-100 font-bold">
              {character.skillPoints} POINTS READY
            </div>
          </div>
        </div>
      </div>

      {/* Category Selection Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const unlockedInCat = skills.filter((s) => s.category === cat.id && s.unlocked).length;
          const totalInCat = skills.filter((s) => s.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-3 text-left border-2 transition-all ${
                isActive
                  ? 'border-purple-400 bg-purple-950/60 shadow-pixel'
                  : 'border-[#2d335c] bg-[#10142d] hover:bg-[#181d3d] text-gray-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <RenderPixelIcon name={cat.icon} size={18} />
                <span className="font-pixel text-[9px] text-purple-300">
                  {unlockedInCat} / {totalInCat}
                </span>
              </div>
              <div className={`font-pixel text-[10px] mt-1 ${isActive ? 'text-amber-300 font-bold' : 'text-gray-300'}`}>
                {cat.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Tree Description */}
      <div className="bg-[#0b0e22] border-2 border-[#2b3363] p-3.5 shadow-pixel mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-amber-400 shrink-0" />
          <span className="text-xs text-gray-300 font-mono">
            {categories.find((c) => c.id === selectedCategory)?.desc}
          </span>
        </div>
        <div className="font-retro text-xs text-indigo-400 shrink-0 hidden sm:block">
          TIERED PROGRESSION
        </div>
      </div>

      {/* Branching Nodes Layout */}
      <div className="space-y-4">
        {categorySkills.map((node, index) => {
          const canAfford = character.skillPoints >= node.cost;
          const meetsLevel = character.level >= node.requiredLevel;
          const canUnlock = !node.unlocked && canAfford && meetsLevel;

          return (
            <div key={node.id} className="relative">
              {/* Connector Line between Tiers */}
              {index > 0 && (
                <div className="w-1 h-4 bg-purple-500/50 mx-auto -my-1 relative z-0" />
              )}

              <motion.div
                layout
                className={`relative z-10 p-4 border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                  node.unlocked
                    ? 'bg-[#18122d] border-purple-400 shadow-pixel'
                    : 'bg-[#0d1024] border-[#2b3363] opacity-80 shadow-pixel'
                }`}
              >
                {/* Left: Icon & Info */}
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-14 h-14 shrink-0 flex items-center justify-center ${
                      node.unlocked
                        ? 'pixel-slot-equipped'
                        : 'pixel-slot filter grayscale brightness-60'
                    }`}
                  >
                    <RenderPixelIcon name={node.icon} size={28} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-pixel text-[9px] px-1.5 py-0.5 border border-purple-500 text-purple-300 bg-purple-950">
                        TIER {node.tier}
                      </span>
                      <h3 className="font-pixel text-xs sm:text-sm text-purple-100 font-bold">
                        {node.name}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed font-mono">
                      {node.description}
                    </p>

                    {/* Active Perk Pill */}
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#090b17] border border-amber-500/60 font-pixel text-[9px] text-amber-300">
                      <Sparkles size={11} />
                      PERK: {node.perk}
                    </div>
                  </div>
                </div>

                {/* Right: Requirements & Unlock Action */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-indigo-950">
                  <div className="text-right text-[10px] font-mono text-gray-400">
                    <div>Cost: <span className="text-purple-300 font-pixel">{node.cost} Pt</span></div>
                    <div>Req: <span className={meetsLevel ? 'text-emerald-400' : 'text-rose-400'}>Lvl {node.requiredLevel}</span></div>
                  </div>

                  {node.unlocked ? (
                    <div className="flex items-center gap-1 font-pixel text-[10px] text-emerald-400 bg-emerald-950/60 px-3 py-1.5 border border-emerald-500">
                      <CheckCircle size={14} />
                      UNLOCKED
                    </div>
                  ) : (
                    <button
                      onClick={() => unlockSkill(node.id)}
                      disabled={!canUnlock}
                      className={`py-1.5 px-3 font-pixel text-[10px] transition-all ${
                        canUnlock
                          ? 'pixel-btn-purple font-bold'
                          : 'bg-[#151934] text-gray-500 border border-gray-700 cursor-not-allowed'
                      }`}
                    >
                      {canUnlock ? 'UNLOCK SKILL' : !meetsLevel ? 'LEVEL LOCKED' : 'NEED POINTS'}
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


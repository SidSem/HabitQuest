import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { CharacterClass } from '../types/game';
import { 
  CharacterSpriteRenderer, 
  PixelSword, 
  PixelCrown, 
  PixelGem,
  RenderPixelIcon 
} from '../components/common/PixelIcons';
import { soundEngine } from '../services/soundService';
import { ArrowRight, Check } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { character, quests, completeOnboarding } = useGameStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [heroName, setHeroName] = useState(character.name || 'Rowan Dawnblade');
  const [selectedClass, setSelectedClass] = useState<CharacterClass>(character.avatar || 'warrior');
  const [selectedQuests, setSelectedQuests] = useState<string[]>(
    quests.slice(0, 4).map((q) => q.id)
  );

  const classes: { id: CharacterClass; name: string; desc: string; perk: string }[] = [
    { id: 'warrior', name: 'WARRIOR', desc: 'Master of physical endurance and strength conditioning', perk: '+10% Physical Habit XP' },
    { id: 'mage', name: 'MAGE', desc: 'Devotee of ancient scrolls, deep study, and learning', perk: '+10% Reading & Study XP' },
    { id: 'rogue', name: 'ROGUE', desc: 'Agile practitioner of swift focus and daily punctuality', perk: 'Bonus Gold on Quick Habits' },
    { id: 'paladin', name: 'PALADIN', desc: 'Guardian of unbroken consistency and supreme discipline', perk: 'Enhanced Streak Fortitude' },
    { id: 'druid', name: 'DRUID', desc: 'Harmonious keeper of outdoor walks, hydration, and sleep', perk: '+10% Health & Rest XP' },
    { id: 'ranger', name: 'RANGER', desc: 'Sharp-eyed pursuer of daily target milestones and goals', perk: 'Critical XP Chance' },
  ];

  const handleToggleQuest = (id: string) => {
    soundEngine.playClick();
    setSelectedQuests((prev) =>
      prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    completeOnboarding(heroName, selectedClass, selectedQuests);
    navigate('/');
  };

  const handleSkip = () => {
    soundEngine.playClick();
    completeOnboarding(heroName, selectedClass, quests.map(q => q.id));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#070914] flex flex-col items-center justify-center p-4 selection:bg-amber-500 selection:text-black">
      <div className="w-full max-w-2xl bg-[#121634] border-4 border-amber-400 p-6 md:p-8 shadow-pixel-gold relative">
        {/* Skip Button Top Right */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-xs font-mono text-gray-400 hover:text-amber-300 underline"
        >
          Skip to Demo Experience ➜
        </button>

        {/* Wizard Step Header */}
        <div className="text-center mb-6">
          <div className="inline-block px-3 py-1 bg-[#090b1a] border border-amber-500/60 font-pixel text-[9px] text-amber-300 mb-2">
            CHAPTER I: AWAKENING (STEP {step} OF 3)
          </div>
          <h1 className="font-pixel text-base sm:text-xl text-white">
            {step === 1 && 'CHOOSE YOUR ADVENTURER NAME'}
            {step === 2 && 'SELECT YOUR RPG DISCIPLINE'}
            {step === 3 && 'CHOOSE YOUR STARTER QUESTS'}
          </h1>
          <p className="font-retro text-xs text-indigo-300 mt-1">
            {step === 1 && 'Every legend begins with a name etched into the chronicles.'}
            {step === 2 && 'Select the class that best embodies your aspirational lifestyle.'}
            {step === 3 && 'Pick the daily habits you wish to conquer starting today.'}
          </p>
        </div>

        {/* STEP 1: Name and Title */}
        {step === 1 && (
          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center justify-center">
              <CharacterSpriteRenderer
                characterClass={selectedClass}
                size={140}
                animate={true}
              />
            </div>

            <div className="max-w-md mx-auto">
              <label className="block font-pixel text-[10px] text-amber-300 mb-2 text-center">
                ENTER YOUR CHARACTER NAME:
              </label>
              <input
                type="text"
                autoFocus
                value={heroName}
                onChange={(e) => setHeroName(e.target.value)}
                placeholder="e.g. Rowan Dawnblade"
                className="w-full bg-[#0a0c1a] border-3 border-[#445091] focus:border-amber-400 px-4 py-2.5 text-center font-pixel text-sm text-white outline-none shadow-pixel-sm"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setStep(2);
                }}
                disabled={!heroName.trim()}
                className="pixel-btn-amber py-2.5 px-6 font-pixel text-xs font-bold flex items-center gap-2"
              >
                PROCEED TO CLASS SELECTION
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Class Selection */}
        {step === 2 && (
          <div className="space-y-6 py-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {classes.map((c) => {
                const isSelected = selectedClass === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedClass(c.id);
                    }}
                    className={`p-3 text-left border-2 flex flex-col items-center justify-between transition-all ${
                      isSelected
                        ? 'border-amber-400 bg-[#1e2554] shadow-pixel-gold scale-102'
                        : 'border-[#2d3460] bg-[#0c0e20] hover:bg-[#15193b]'
                    }`}
                  >
                    <CharacterSpriteRenderer
                      characterClass={c.id}
                      size={72}
                      animate={isSelected}
                    />
                    <div className="font-pixel text-[11px] text-amber-200 mt-2 text-center">
                      {c.name}
                    </div>
                    <p className="text-[10px] text-gray-300 font-mono text-center mt-1 line-clamp-2">
                      {c.desc}
                    </p>
                    <div className="mt-2 text-[9px] font-pixel text-emerald-300">
                      {c.perk}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-indigo-900">
              <button
                onClick={() => setStep(1)}
                className="pixel-btn-neutral py-2 px-4 font-pixel text-xs"
              >
                BACK
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setStep(3);
                }}
                className="pixel-btn-amber py-2 px-6 font-pixel text-xs font-bold flex items-center gap-2"
              >
                CHOOSE STARTER QUESTS
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Choose Starter Habits */}
        {step === 3 && (
          <div className="space-y-4 py-2">
            <p className="text-xs text-gray-300 font-mono text-center mb-2">
              Select at least 2 starter habits to begin tracking on your Notice Board:
            </p>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
              {quests.map((q) => {
                const isChecked = selectedQuests.includes(q.id);
                return (
                  <div
                    key={q.id}
                    onClick={() => handleToggleQuest(q.id)}
                    className={`p-3 border-2 flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-[#181f47] border-amber-400 shadow-pixel-sm'
                        : 'bg-[#0c0e22] border-[#252b52] opacity-70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center pixel-slot shrink-0">
                        <RenderPixelIcon name={q.icon} size={22} />
                      </div>
                      <div>
                        <div className="font-pixel text-xs text-amber-100">{q.title}</div>
                        <div className="text-[11px] text-gray-300 line-clamp-1 mt-0.5">{q.description}</div>
                      </div>
                    </div>

                    <div className={`w-6 h-6 border-2 flex items-center justify-center shrink-0 ${
                      isChecked ? 'border-amber-400 bg-amber-500 text-black' : 'border-gray-600'
                    }`}>
                      {isChecked && <Check size={16} className="stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-indigo-900">
              <button
                onClick={() => setStep(2)}
                className="pixel-btn-neutral py-2 px-4 font-pixel text-xs"
              >
                BACK
              </button>
              <button
                onClick={handleFinish}
                disabled={selectedQuests.length === 0}
                className="pixel-btn-amber py-2.5 px-6 font-pixel text-xs font-bold"
              >
                ENTER THE ADVENTURE HUB!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


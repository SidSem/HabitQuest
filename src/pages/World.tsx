import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { WorldLocation } from '../types/game';
import { 
  PixelSword, 
  PixelGem, 
  PixelCoin, 
  PixelCrown, 
  PixelShield 
} from '../components/common/PixelIcons';
import { MapPin, Lock, Unlock, Compass, Skull, Trophy, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const World: React.FC = () => {
  const { worldLocations, character, defeatLocationBoss, quests } = useGameStore();
  const [selectedLocation, setSelectedLocation] = useState<WorldLocation | null>(null);

  const handleSelectLocation = (loc: WorldLocation) => {
    setSelectedLocation(loc);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="bg-[#121633] border-3 border-emerald-500/60 p-5 shadow-pixel mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-pixel-sm">
            <Compass size={28} className="text-emerald-400" />
          </div>
          <div>
            <h1 className="font-pixel text-base sm:text-lg text-emerald-200">
              EXPEDITION WORLD MAP
            </h1>
            <p className="text-xs text-indigo-300 font-retro">
              JOURNEY ACROSS REALMS OF HABIT DISCIPLINE & DEFEAT INNER DEMONS
            </p>
          </div>
        </div>

        {/* Level & Region Stats */}
        <div className="flex items-center gap-2 bg-[#0c1426] border-2 border-emerald-500/50 px-4 py-2 shadow-pixel">
          <span className="font-pixel text-xs text-emerald-300">
            {worldLocations.filter((l) => l.unlocked).length} / {worldLocations.length} REALMS DISCOVERED
          </span>
        </div>
      </div>

      {/* Main Pixel Fantasy Illustrated Map Canvas */}
      <div className="relative w-full aspect-[16/10] min-h-[460px] bg-[#0c1527] border-4 border-[#334674] shadow-pixel-gold overflow-hidden select-none">
        {/* Ocean & Topography Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#1c2d52_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />

        {/* Fantasy Map Island Shapes rendered with SVGs */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Main Continent Landmass */}
          <path
            d="M 120 420 Q 240 460 380 430 Q 560 480 720 420 Q 860 360 880 240 Q 820 120 650 90 Q 420 80 260 140 Q 140 220 120 420 Z"
            fill="#12253c"
            stroke="#2b4872"
            strokeWidth="3"
            strokeDasharray="6,4"
          />
          {/* North Summit Island */}
          <path
            d="M 680 180 Q 780 140 850 120 Q 920 150 880 220 Q 790 240 680 180 Z"
            fill="#18304f"
            stroke="#3a6199"
            strokeWidth="2"
          />
          {/* Sea Wave Lines */}
          <path d="M 60 100 Q 80 90 100 100" stroke="#1f3b61" strokeWidth="2" fill="none" />
          <path d="M 180 60 Q 200 50 220 60" stroke="#1f3b61" strokeWidth="2" fill="none" />
          <path d="M 880 480 Q 900 470 920 480" stroke="#1f3b61" strokeWidth="2" fill="none" />

          {/* Dotted Travel Routes connecting nodes */}
          <line x1="22%" y1="68%" x2="50%" y2="76%" stroke="#4f6e9c" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="50%" y1="76%" x2="74%" y2="48%" stroke="#4f6e9c" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="74%" y1="48%" x2="42%" y2="32%" stroke="#4f6e9c" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="42%" y1="32%" x2="20%" y2="26%" stroke="#4f6e9c" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="42%" y1="32%" x2="78%" y2="18%" stroke="#4f6e9c" strokeWidth="2" strokeDasharray="5,5" />
        </svg>

        {/* Map Legend */}
        <div className="absolute top-3 left-3 bg-[#0a101f]/90 border border-[#2c4069] p-2.5 text-[10px] font-pixel text-gray-300 z-10 hidden sm:block">
          <div className="text-amber-300 mb-1">REALM ATLAS</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-400 rounded-full" /> Unlocked Realm</div>
          <div className="flex items-center gap-1.5 mt-0.5"><span className="w-2 h-2 bg-rose-500 rounded-full" /> Locked Realm</div>
        </div>

        {/* Map Location Pins / Nodes */}
        {worldLocations.map((loc) => {
          const isSelected = selectedLocation?.id === loc.id;
          return (
            <motion.button
              key={loc.id}
              onClick={() => handleSelectLocation(loc)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              style={{
                left: `${loc.coordinates.x}%`,
                top: `${loc.coordinates.y}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group cursor-pointer"
            >
              {/* Pulsing Aura if unlocked */}
              {loc.unlocked && (
                <div className="absolute -inset-2 bg-emerald-500/20 rounded-full animate-ping pointer-events-none" />
              )}

              {/* Pin Icon Box */}
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center border-2 shadow-pixel transition-all ${
                  isSelected
                    ? 'border-amber-300 bg-amber-500 text-black scale-110 shadow-pixel-gold'
                    : loc.unlocked
                    ? 'border-emerald-400 bg-[#0e2722] text-emerald-300 group-hover:border-white'
                    : 'border-gray-600 bg-[#161a29] text-gray-500'
                }`}
              >
                {loc.unlocked ? (
                  <MapPin size={22} className={isSelected ? 'text-black' : 'text-emerald-300'} />
                ) : (
                  <Lock size={18} />
                )}
              </div>

              {/* Floating Name Label */}
              <div
                className={`mt-1.5 px-2 py-0.5 font-pixel text-[8px] sm:text-[9px] uppercase tracking-wider whitespace-nowrap border shadow-pixel-sm ${
                  isSelected
                    ? 'border-amber-400 bg-amber-400 text-black font-bold'
                    : loc.unlocked
                    ? 'border-[#2e4766] bg-[#0c1626]/90 text-amber-200'
                    : 'border-gray-800 bg-black/80 text-gray-500'
                }`}
              >
                {loc.name}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Location Detail Modal / Drawer */}
      <AnimatePresence>
        {selectedLocation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg bg-[#111736] border-4 border-amber-400 p-6 shadow-pixel-gold"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedLocation(null)}
                className="absolute top-3 right-3 p-1.5 bg-[#0a0d24] text-gray-400 hover:text-white border border-gray-600"
              >
                <X size={16} />
              </button>

              {/* Region Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 flex items-center justify-center pixel-slot-equipped">
                  <MapPin size={24} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="font-pixel text-sm sm:text-base text-amber-200">
                    {selectedLocation.name}
                  </h3>
                  <div className="font-retro text-xs text-indigo-300">
                    {selectedLocation.tagline}
                  </div>
                </div>
              </div>

              {/* Description & Lore */}
              <p className="text-xs text-gray-200 mb-3 leading-relaxed">
                {selectedLocation.description}
              </p>

              <div className="bg-[#0b0e24] border border-indigo-900/80 p-3 mb-4">
                <div className="font-pixel text-[10px] text-amber-300 mb-1">
                  ANCIENT REALM LORE:
                </div>
                <p className="text-[11px] text-gray-400 italic font-mono leading-relaxed">
                  "{selectedLocation.lore}"
                </p>
              </div>

              {/* Unlock Requirements Check */}
              <div className="flex items-center justify-between p-2.5 bg-[#0a0c1e] border border-[#2b3363] mb-4 text-xs font-mono">
                <span className="text-gray-400">Unlock Requirement:</span>
                <span className={`font-pixel text-[10px] ${selectedLocation.unlocked ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {selectedLocation.unlocked
                    ? '✓ UNLOCKED & EXPEDITION ACTIVE'
                    : `LOCKED — REQUIRES LEVEL ${selectedLocation.requiredLevel}`}
                </span>
              </div>

              {/* Boss Encounter Section */}
              {selectedLocation.boss && (
                <div className="bg-[#1b1220] border-2 border-rose-500/60 p-3.5 mb-4 shadow-pixel-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-rose-900/60 mb-2">
                    <div className="flex items-center gap-2">
                      <Skull size={18} className="text-rose-400" />
                      <span className="font-pixel text-xs text-rose-300">
                        BOSS: {selectedLocation.boss.name}
                      </span>
                    </div>
                    <span className="font-retro text-[10px] text-rose-400">
                      {selectedLocation.boss.title}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-300 mb-3 font-mono">
                    {selectedLocation.boss.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-pixel text-[10px]">
                      <span className="text-purple-300">+75 XP</span>
                      <span className="text-amber-300">+50 G</span>
                    </div>

                    {selectedLocation.boss.defeated ? (
                      <div className="flex items-center gap-1 font-pixel text-[10px] text-emerald-400 bg-emerald-950/60 px-2.5 py-1 border border-emerald-500">
                        <Trophy size={12} />
                        DEFEATED
                      </div>
                    ) : selectedLocation.unlocked ? (
                      <button
                        onClick={() => defeatLocationBoss(selectedLocation.id)}
                        className="pixel-btn-emerald py-1 px-3 font-pixel text-[10px] font-bold"
                      >
                        CHALLENGE BOSS
                      </button>
                    ) : (
                      <span className="font-retro text-[10px] text-gray-500">
                        REALM LOCKED
                      </span>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedLocation(null)}
                className="w-full pixel-btn-neutral py-2 font-pixel text-xs"
              >
                RETURN TO MAP
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};


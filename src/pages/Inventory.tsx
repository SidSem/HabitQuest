import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { 
  RenderPixelIcon, 
  CompanionPetRenderer, 
  PixelCoin, 
  PixelGem, 
  PixelCrown, 
  PixelSword 
} from '../components/common/PixelIcons';
import { ItemSlot, ItemRarity, InventoryItem } from '../types/game';
import { Package, ShoppingBag, Check, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Inventory: React.FC = () => {
  const { character, shopItems, buyItem, equipItem, unequipItem } = useGameStore();
  const [activeTab, setActiveTab] = useState<'all' | ItemSlot>('all');
  const [viewMode, setViewMode] = useState<'shop' | 'bag'>('shop');

  const rarityColors: Record<ItemRarity, { border: string; bg: string; text: string }> = {
    common: { border: 'border-slate-500', bg: 'bg-slate-900/40', text: 'text-slate-300' },
    rare: { border: 'border-blue-500', bg: 'bg-blue-950/40', text: 'text-blue-300' },
    epic: { border: 'border-purple-500', bg: 'bg-purple-950/40', text: 'text-purple-300' },
    legendary: { border: 'border-amber-400', bg: 'bg-amber-950/40', text: 'text-amber-300' },
  };

  const slotTabs: { id: 'all' | ItemSlot; label: string }[] = [
    { id: 'all', label: 'ALL GEAR' },
    { id: 'weapon', label: 'WEAPONS' },
    { id: 'armor', label: 'ARMOR' },
    { id: 'helmet', label: 'HEADGEAR' },
    { id: 'pet', label: 'PETS' },
    { id: 'title', label: 'TITLES' },
  ];

  const filteredItems = shopItems.filter((item) => {
    if (activeTab !== 'all' && item.slot !== activeTab) return false;
    if (viewMode === 'bag') return item.unlocked;
    return true;
  });

  const unlockedCount = shopItems.filter((i) => i.unlocked).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="bg-[#121633] border-3 border-amber-500/60 p-5 shadow-pixel mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center shadow-pixel-sm">
            <ShoppingBag size={28} className="text-amber-400" />
          </div>
          <div>
            <h1 className="font-pixel text-base sm:text-lg text-amber-200">
              ROYAL ARMORY & REWARD BAZAAR
            </h1>
            <p className="text-xs text-indigo-300 font-retro">
              SPEND HARD-EARNED GOLD ON EPIC EQUIPMENT, PETS, AND COSMETICS
            </p>
          </div>
        </div>

        {/* Current Player Purse */}
        <div className="flex items-center gap-2 bg-[#20170a] border-2 border-amber-400 px-4 py-2 shadow-pixel-gold self-start md:self-auto">
          <PixelCoin size={24} />
          <div>
            <div className="font-retro text-[9px] text-amber-400 leading-none">YOUR GOLD COFFER</div>
            <div className="font-pixel text-base text-amber-200 leading-none mt-1">
              {character.gold} GOLD
            </div>
          </div>
        </div>
      </div>

      {/* Mode Switcher: Armory Shop vs Inventory Bag */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('shop')}
            className={`py-2 px-4 font-pixel text-xs border-2 transition-all ${
              viewMode === 'shop'
                ? 'border-amber-400 bg-amber-500 text-black font-bold shadow-pixel-sm'
                : 'border-[#2d335c] bg-[#10142d] text-gray-300 hover:text-white'
            }`}
          >
            BAZAAR SHOP ({shopItems.length})
          </button>
          <button
            onClick={() => setViewMode('bag')}
            className={`py-2 px-4 font-pixel text-xs border-2 transition-all ${
              viewMode === 'bag'
                ? 'border-amber-400 bg-amber-500 text-black font-bold shadow-pixel-sm'
                : 'border-[#2d335c] bg-[#10142d] text-gray-300 hover:text-white'
            }`}
          >
            INVENTORY SATCHEL ({unlockedCount})
          </button>
        </div>

        {/* Slot Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {slotTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-1.5 px-2.5 font-pixel text-[9px] uppercase border transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-indigo-400 bg-indigo-600 text-white font-bold'
                  : 'border-[#2b3363] bg-[#0c0e22] text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory & Shop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const rarity = rarityColors[item.rarity];
          const canAfford = character.gold >= item.cost;

          return (
            <motion.div
              key={item.id}
              layout
              className={`relative p-4 flex flex-col justify-between border-2 transition-all ${
                item.equipped
                  ? 'pixel-frame-gold'
                  : item.unlocked
                  ? 'bg-[#121634] border-[#39427b] hover:border-gray-300 shadow-pixel'
                  : 'bg-[#0c0e20] border-[#22284c] shadow-pixel'
              }`}
            >
              {/* Item Top Row */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  {/* Icon Slot */}
                  <div className={`w-14 h-14 flex items-center justify-center shrink-0 ${
                    item.equipped ? 'pixel-slot-equipped' : 'pixel-slot'
                  }`}>
                    {item.slot === 'pet' ? (
                      <CompanionPetRenderer petType={item.icon} size={36} />
                    ) : (
                      <RenderPixelIcon name={item.icon} size={30} />
                    )}
                  </div>

                  {/* Badges */}
                  <div className="flex flex-col items-end gap-1">
                    <span className={`font-pixel text-[8px] px-2 py-0.5 border ${rarity.border} ${rarity.bg} ${rarity.text} uppercase`}>
                      {item.rarity}
                    </span>
                    <span className="font-retro text-[9px] text-gray-400 uppercase">
                      {item.slot}
                    </span>
                    {item.equipped && (
                      <span className="font-pixel text-[8px] text-amber-300 bg-amber-950/80 px-1.5 py-0.5 border border-amber-500">
                        EQUIPPED
                      </span>
                    )}
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-pixel text-xs sm:text-sm text-amber-100 font-bold tracking-wide">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Attribute Bonus */}
                {item.attributeBonus && (
                  <div className="mt-2 text-[10px] font-pixel text-emerald-300 flex items-center gap-1">
                    <Sparkles size={12} />
                    +{item.attributeBonus.value} {item.attributeBonus.attribute.toUpperCase()} BONUS
                  </div>
                )}
              </div>

              {/* Bottom Actions Row */}
              <div className="mt-4 pt-3 border-t border-indigo-900/60 flex items-center justify-between gap-2">
                {/* Price or Owned State */}
                {item.unlocked ? (
                  <span className="font-retro text-[10px] text-emerald-400">
                    OWNED IN SATCHEL
                  </span>
                ) : (
                  <div className="flex items-center gap-1 font-pixel text-xs text-amber-300">
                    <PixelCoin size={15} />
                    <span>{item.cost} GOLD</span>
                  </div>
                )}

                {/* Buttons */}
                <div>
                  {item.unlocked ? (
                    item.equipped ? (
                      <button
                        onClick={() => unequipItem(item.slot)}
                        className="pixel-btn-neutral py-1 px-3 font-pixel text-[10px]"
                      >
                        UNEQUIP
                      </button>
                    ) : (
                      <button
                        onClick={() => equipItem(item.id)}
                        className="pixel-btn-emerald py-1 px-3 font-pixel text-[10px] font-bold"
                      >
                        EQUIP
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => buyItem(item.id)}
                      disabled={!canAfford}
                      className={`py-1.5 px-3 font-pixel text-[10px] transition-all ${
                        canAfford
                          ? 'pixel-btn-amber font-bold'
                          : 'bg-[#1b1e36] text-gray-500 border border-gray-700 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'PURCHASE' : 'NEED GOLD'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};


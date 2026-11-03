import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Pixel Gold Coin
export const PixelCoin: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    className={`pixelated ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outline */}
    <rect x="5" y="1" width="6" height="1" fill="#78350f" />
    <rect x="3" y="2" width="2" height="1" fill="#78350f" />
    <rect x="11" y="2" width="2" height="1" fill="#78350f" />
    <rect x="2" y="3" width="1" height="2" fill="#78350f" />
    <rect x="13" y="3" width="1" height="2" fill="#78350f" />
    <rect x="1" y="5" width="1" height="6" fill="#78350f" />
    <rect x="14" y="5" width="1" height="6" fill="#78350f" />
    <rect x="2" y="11" width="1" height="2" fill="#78350f" />
    <rect x="13" y="11" width="1" height="2" fill="#78350f" />
    <rect x="3" y="13" width="2" height="1" fill="#78350f" />
    <rect x="11" y="13" width="2" height="1" fill="#78350f" />
    <rect x="5" y="14" width="6" height="1" fill="#78350f" />
    {/* Body Gold */}
    <rect x="4" y="3" width="8" height="10" fill="#f59e0b" />
    <rect x="2" y="5" width="12" height="6" fill="#f59e0b" />
    <rect x="3" y="4" width="10" height="8" fill="#fbbf24" />
    {/* Highlight */}
    <rect x="4" y="3" width="3" height="2" fill="#fef08a" />
    <rect x="3" y="5" width="2" height="2" fill="#fef08a" />
    {/* Inner Crest */}
    <rect x="7" y="5" width="2" height="6" fill="#b45309" />
    <rect x="6" y="6" width="4" height="1" fill="#b45309" />
    <rect x="6" y="9" width="4" height="1" fill="#b45309" />
  </svg>
);

// 2. Pixel Sword
export const PixelSword: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    className={`pixelated ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Blade tip */}
    <rect x="13" y="1" width="2" height="2" fill="#e2e8f0" />
    <rect x="11" y="2" width="2" height="2" fill="#cbd5e1" />
    <rect x="9" y="4" width="3" height="3" fill="#94a3b8" />
    <rect x="7" y="6" width="3" height="3" fill="#cbd5e1" />
    <rect x="5" y="8" width="3" height="3" fill="#94a3b8" />
    {/* Edge highlight */}
    <rect x="12" y="2" width="1" height="1" fill="#ffffff" />
    <rect x="10" y="4" width="1" height="1" fill="#ffffff" />
    <rect x="8" y="6" width="1" height="1" fill="#ffffff" />
    <rect x="6" y="8" width="1" height="1" fill="#ffffff" />
    {/* Crossguard */}
    <rect x="3" y="9" width="3" height="1" fill="#f59e0b" />
    <rect x="6" y="6" width="1" height="3" fill="#f59e0b" />
    <rect x="4" y="8" width="3" height="3" fill="#d97706" />
    {/* Hilt */}
    <rect x="2" y="11" width="2" height="2" fill="#78350f" />
    <rect x="1" y="12" width="2" height="2" fill="#451a03" />
    {/* Pommel */}
    <rect x="0" y="14" width="2" height="2" fill="#f59e0b" />
  </svg>
);

// 3. Pixel Shield
export const PixelShield: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    className={`pixelated ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer border */}
    <rect x="2" y="2" width="12" height="2" fill="#3b82f6" />
    <rect x="1" y="3" width="2" height="6" fill="#1e3a8a" />
    <rect x="13" y="3" width="2" height="6" fill="#1e3a8a" />
    <rect x="2" y="9" width="2" height="2" fill="#1e3a8a" />
    <rect x="12" y="9" width="2" height="2" fill="#1e3a8a" />
    <rect x="4" y="11" width="2" height="2" fill="#1e3a8a" />
    <rect x="10" y="11" width="2" height="2" fill="#1e3a8a" />
    <rect x="6" y="13" width="4" height="2" fill="#1e3a8a" />
    {/* Face */}
    <rect x="3" y="4" width="10" height="5" fill="#38bdf8" />
    <rect x="4" y="9" width="8" height="2" fill="#0284c7" />
    <rect x="6" y="11" width="4" height="2" fill="#0369a1" />
    {/* Golden Cross in Center */}
    <rect x="7" y="4" width="2" height="7" fill="#fbbf24" />
    <rect x="4" y="6" width="8" height="2" fill="#fbbf24" />
  </svg>
);

// 4. Pixel Potion (Health / Vitality)
export const PixelPotion: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    className={`pixelated ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Cork */}
    <rect x="6" y="1" width="4" height="2" fill="#b45309" />
    <rect x="7" y="1" width="2" height="1" fill="#d97706" />
    {/* Glass Neck */}
    <rect x="6" y="3" width="4" height="2" fill="#e2e8f0" />
    <rect x="7" y="3" width="2" height="2" fill="#cbd5e1" />
    {/* Glass Bottle Body Outline */}
    <rect x="3" y="5" width="10" height="9" fill="#0f172a" />
    <rect x="4" y="6" width="8" height="7" fill="#ef4444" />
    {/* Liquid Red Layers */}
    <rect x="4" y="8" width="8" height="5" fill="#dc2626" />
    <rect x="5" y="10" width="6" height="3" fill="#b91c1c" />
    {/* Shimmer Highlight */}
    <rect x="5" y="6" width="2" height="3" fill="#fca5a5" />
    <rect x="5" y="10" width="1" height="2" fill="#fca5a5" />
  </svg>
);

// 5. Pixel Tome / Book
export const PixelBook: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    className={`pixelated ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Cover */}
    <rect x="2" y="2" width="12" height="12" fill="#6d28d9" />
    <rect x="1" y="3" width="2" height="10" fill="#4c1d95" />
    {/* Page Edges */}
    <rect x="12" y="3" width="2" height="10" fill="#fef3c7" />
    <rect x="12" y="4" width="2" height="8" fill="#fde68a" />
    {/* Gold Emblem / Corner mounts */}
    <rect x="3" y="2" width="2" height="2" fill="#f59e0b" />
    <rect x="3" y="12" width="2" height="2" fill="#f59e0b" />
    <rect x="6" y="6" width="4" height="4" fill="#fbbf24" />
    <rect x="7" y="7" width="2" height="2" fill="#7c3aed" />
  </svg>
);

// 6. Pixel Scroll
export const PixelScroll: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    className={`pixelated ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="2" width="10" height="2" fill="#d97706" />
    <rect x="2" y="3" width="12" height="2" fill="#f59e0b" />
    <rect x="3" y="5" width="10" height="7" fill="#fef3c7" />
    <rect x="4" y="6" width="8" height="1" fill="#78350f" />
    <rect x="4" y="8" width="6" height="1" fill="#78350f" />
    <rect x="4" y="10" width="7" height="1" fill="#78350f" />
    <rect x="2" y="12" width="12" height="2" fill="#f59e0b" />
    <rect x="3" y="13" width="10" height="2" fill="#d97706" />
  </svg>
);

// 7. Pixel Flame (Streak / Passion)
export const PixelFlame: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    className={`pixelated ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer dark ember */}
    <rect x="7" y="1" width="2" height="2" fill="#dc2626" />
    <rect x="6" y="3" width="4" height="2" fill="#ea580c" />
    <rect x="4" y="5" width="8" height="3" fill="#ea580c" />
    <rect x="3" y="8" width="10" height="5" fill="#dc2626" />
    <rect x="4" y="13" width="8" height="2" fill="#991b1b" />
    {/* Core Golden Fire */}
    <rect x="6" y="6" width="4" height="3" fill="#f59e0b" />
    <rect x="5" y="8" width="6" height="4" fill="#fbbf24" />
    {/* Heart White Spark */}
    <rect x="7" y="9" width="2" height="3" fill="#fef08a" />
  </svg>
);

// 8. Pixel Gem (XP / Magic / Epic)
export const PixelGem: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    className={`pixelated ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="5" y="2" width="6" height="2" fill="#c084fc" />
    <rect x="3" y="4" width="10" height="3" fill="#a855f7" />
    <rect x="1" y="7" width="14" height="2" fill="#9333ea" />
    <rect x="3" y="9" width="10" height="3" fill="#7e22ce" />
    <rect x="5" y="12" width="6" height="2" fill="#6b21a8" />
    <rect x="7" y="14" width="2" height="1" fill="#581c87" />
    {/* Highlights */}
    <rect x="5" y="4" width="3" height="3" fill="#e9d5ff" />
    <rect x="4" y="7" width="2" height="2" fill="#f3e8ff" />
  </svg>
);

// 9. Pixel Crown (Royalty / High Level)
export const PixelCrown: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    className={`pixelated ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="3" width="2" height="2" fill="#fbbf24" />
    <rect x="7" y="1" width="2" height="2" fill="#fbbf24" />
    <rect x="12" y="3" width="2" height="2" fill="#fbbf24" />
    {/* Crown Spikes */}
    <rect x="2" y="5" width="2" height="5" fill="#f59e0b" />
    <rect x="7" y="3" width="2" height="7" fill="#f59e0b" />
    <rect x="12" y="5" width="2" height="5" fill="#f59e0b" />
    <rect x="4" y="7" width="3" height="3" fill="#d97706" />
    <rect x="9" y="7" width="3" height="3" fill="#d97706" />
    {/* Base Band */}
    <rect x="1" y="10" width="14" height="4" fill="#b45309" />
    <rect x="2" y="11" width="12" height="2" fill="#f59e0b" />
    {/* Jewels */}
    <rect x="4" y="11" width="2" height="2" fill="#ef4444" />
    <rect x="7" y="11" width="2" height="2" fill="#3b82f6" />
    <rect x="10" y="11" width="2" height="2" fill="#10b981" />
  </svg>
);

// 10. Pixel Heart (Health / Love)
export const PixelHeart: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    className={`pixelated ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="3" width="4" height="2" fill="#ef4444" />
    <rect x="10" y="3" width="4" height="2" fill="#ef4444" />
    <rect x="1" y="5" width="14" height="4" fill="#dc2626" />
    <rect x="2" y="9" width="12" height="2" fill="#b91c1c" />
    <rect x="4" y="11" width="8" height="2" fill="#991b1b" />
    <rect x="6" y="13" width="4" height="2" fill="#7f1d1d" />
    {/* Highlight */}
    <rect x="3" y="4" width="2" height="2" fill="#fecaca" />
    <rect x="2" y="6" width="2" height="1" fill="#fecaca" />
  </svg>
);

// Generic dynamic Pixel Icon renderer matching string icon names
export const RenderPixelIcon: React.FC<{ name: string; size?: number; className?: string }> = ({
  name,
  size = 20,
  className = '',
}) => {
  switch (name) {
    case 'sword':
    case 'legendary_sword':
    case 'dagger':
      return <PixelSword size={size} className={className} />;
    case 'shield':
    case 'plate':
      return <PixelShield size={size} className={className} />;
    case 'potion':
      return <PixelPotion size={size} className={className} />;
    case 'book':
    case 'staff':
      return <PixelBook size={size} className={className} />;
    case 'scroll':
    case 'banner':
      return <PixelScroll size={size} className={className} />;
    case 'flame':
      return <PixelFlame size={size} className={className} />;
    case 'gem':
      return <PixelGem size={size} className={className} />;
    case 'crown':
    case 'helm':
    case 'wizard_hat':
      return <PixelCrown size={size} className={className} />;
    case 'heart':
      return <PixelHeart size={size} className={className} />;
    case 'coin':
      return <PixelCoin size={size} className={className} />;
    default:
      return <PixelSword size={size} className={className} />;
  }
};

// 11. Full Pixel-Art Character Sprites (Warrior, Mage, Rogue, Paladin, Druid, Ranger)
export const CharacterSpriteRenderer: React.FC<{
  characterClass: 'warrior' | 'mage' | 'rogue' | 'paladin' | 'druid' | 'ranger';
  size?: number;
  className?: string;
  animate?: boolean;
}> = ({ characterClass, size = 120, className = '', animate = true }) => {
  // Color themes per RPG class
  const classThemes = {
    warrior: {
      hair: '#854d0e',
      skin: '#fed7aa',
      armor: '#3b82f6',
      armorDark: '#1d4ed8',
      tunic: '#ef4444',
      weapon: '#94a3b8',
      gold: '#f59e0b',
    },
    mage: {
      hair: '#cbd5e1',
      skin: '#ffedd5',
      armor: '#7e22ce',
      armorDark: '#581c87',
      tunic: '#c084fc',
      weapon: '#38bdf8',
      gold: '#fbbf24',
    },
    rogue: {
      hair: '#1e293b',
      skin: '#fed7aa',
      armor: '#334155',
      armorDark: '#0f172a',
      tunic: '#10b981',
      weapon: '#64748b',
      gold: '#f59e0b',
    },
    paladin: {
      hair: '#eab308',
      skin: '#ffedd5',
      armor: '#e2e8f0',
      armorDark: '#94a3b8',
      tunic: '#3b82f6',
      weapon: '#facc15',
      gold: '#f59e0b',
    },
    druid: {
      hair: '#713f12',
      skin: '#fed7aa',
      armor: '#15803d',
      armorDark: '#14532d',
      tunic: '#84cc16',
      weapon: '#a16207',
      gold: '#ca8a04',
    },
    ranger: {
      hair: '#9a3412',
      skin: '#ffedd5',
      armor: '#047857',
      armorDark: '#064e3b',
      tunic: '#b45309',
      weapon: '#78350f',
      gold: '#eab308',
    },
  };

  const theme = classThemes[characterClass] || classThemes.warrior;

  return (
    <div className={`relative inline-block ${animate ? 'animate-bounce-short' : ''} ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        className="pixelated filter drop-shadow-[0_8px_0_rgba(0,0,0,0.4)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <ellipse cx="16" cy="30" rx="9" ry="2" fill="rgba(0,0,0,0.5)" />

        {/* Head / Hair */}
        <rect x="11" y="4" width="10" height="3" fill={theme.hair} />
        <rect x="10" y="5" width="2" height="6" fill={theme.hair} />
        <rect x="20" y="5" width="2" height="6" fill={theme.hair} />
        {/* Face */}
        <rect x="12" y="7" width="8" height="6" fill={theme.skin} />
        {/* Eyes (Retro 8-bit eyes) */}
        <rect x="13" y="9" width="2" height="2" fill="#0f172a" />
        <rect x="17" y="9" width="2" height="2" fill="#0f172a" />
        <rect x="13" y="9" width="1" height="1" fill="#ffffff" />
        <rect x="17" y="9" width="1" height="1" fill="#ffffff" />
        {/* Mouth */}
        <rect x="15" y="12" width="2" height="1" fill="#e11d48" />

        {/* Helmet / Headgear Feature */}
        {characterClass === 'warrior' && (
          <>
            <rect x="10" y="3" width="12" height="3" fill={theme.armor} />
            <rect x="15" y="1" width="2" height="3" fill={theme.tunic} />
            <rect x="9" y="6" width="2" height="4" fill={theme.armorDark} />
            <rect x="21" y="6" width="2" height="4" fill={theme.armorDark} />
          </>
        )}
        {characterClass === 'mage' && (
          <>
            <rect x="9" y="5" width="14" height="2" fill={theme.armorDark} />
            <rect x="12" y="2" width="8" height="3" fill={theme.armor} />
            <rect x="14" y="0" width="4" height="2" fill={theme.armor} />
            <rect x="15" y="1" width="2" height="1" fill={theme.gold} />
          </>
        )}
        {characterClass === 'paladin' && (
          <>
            <rect x="10" y="3" width="12" height="3" fill={theme.armor} />
            <rect x="15" y="2" width="2" height="2" fill={theme.gold} />
          </>
        )}

        {/* Torso & Armor */}
        <rect x="11" y="13" width="10" height="8" fill={theme.armor} />
        <rect x="13" y="14" width="6" height="6" fill={theme.tunic} />
        {/* Belt */}
        <rect x="11" y="20" width="10" height="2" fill="#451a03" />
        <rect x="15" y="20" width="2" height="2" fill={theme.gold} />

        {/* Left Arm & Shield/Item */}
        <rect x="8" y="14" width="3" height="6" fill={theme.skin} />
        <rect x="7" y="16" width="4" height="6" fill={theme.armorDark} />
        <rect x="8" y="17" width="2" height="4" fill={theme.gold} />

        {/* Right Arm & Weapon */}
        <rect x="21" y="14" width="3" height="5" fill={theme.skin} />
        {/* Sword / Staff Held */}
        <rect x="23" y="8" width="2" height="15" fill={theme.weapon} />
        <rect x="22" y="16" width="4" height="2" fill={theme.gold} />
        <rect x="23" y="6" width="2" height="2" fill="#ffffff" />

        {/* Legs & Boots */}
        <rect x="12" y="22" width="3" height="5" fill={theme.armorDark} />
        <rect x="17" y="22" width="3" height="5" fill={theme.armorDark} />
        {/* Boots */}
        <rect x="11" y="27" width="4" height="3" fill="#292524" />
        <rect x="17" y="27" width="4" height="3" fill="#292524" />
      </svg>
    </div>
  );
};

// 12. Pixel Companion Pet (Fox, Owl, Dragon)
export const CompanionPetRenderer: React.FC<{
  petType: 'pet_fox' | 'pet_owl' | 'pet_dragon' | string;
  size?: number;
}> = ({ petType, size = 48 }) => {
  if (petType === 'pet_owl') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className="pixelated filter drop-shadow-[0_4px_0_rgba(0,0,0,0.4)]" fill="none">
        <rect x="7" y="4" width="10" height="12" fill="#475569" />
        <rect x="6" y="6" width="12" height="10" fill="#64748b" />
        {/* Big Owl Eyes */}
        <rect x="8" y="7" width="3" height="3" fill="#fbbf24" />
        <rect x="13" y="7" width="3" height="3" fill="#fbbf24" />
        <rect x="9" y="8" width="1" height="1" fill="#0f172a" />
        <rect x="14" y="8" width="1" height="1" fill="#0f172a" />
        {/* Beak */}
        <rect x="11" y="10" width="2" height="2" fill="#ea580c" />
        {/* Belly */}
        <rect x="8" y="12" width="8" height="4" fill="#cbd5e1" />
        {/* Claws */}
        <rect x="8" y="18" width="2" height="2" fill="#f59e0b" />
        <rect x="14" y="18" width="2" height="2" fill="#f59e0b" />
      </svg>
    );
  }

  if (petType === 'pet_dragon') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className="pixelated filter drop-shadow-[0_4px_0_rgba(0,0,0,0.4)]" fill="none">
        {/* Dragon Horns */}
        <rect x="7" y="3" width="2" height="3" fill="#c084fc" />
        <rect x="15" y="3" width="2" height="3" fill="#c084fc" />
        {/* Dragon Head */}
        <rect x="6" y="6" width="12" height="7" fill="#7e22ce" />
        {/* Glowing Eyes */}
        <rect x="8" y="8" width="2" height="2" fill="#facc15" />
        <rect x="14" y="8" width="2" height="2" fill="#facc15" />
        {/* Wings */}
        <rect x="3" y="8" width="3" height="4" fill="#9333ea" />
        <rect x="18" y="8" width="3" height="4" fill="#9333ea" />
        {/* Body */}
        <rect x="7" y="13" width="10" height="7" fill="#6b21a8" />
        {/* Underbelly */}
        <rect x="9" y="14" width="6" height="5" fill="#e9d5ff" />
        {/* Tail */}
        <rect x="17" y="17" width="4" height="2" fill="#7e22ce" />
        <rect x="20" y="15" width="2" height="2" fill="#c084fc" />
      </svg>
    );
  }

  // Default Ember Fox
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="pixelated filter drop-shadow-[0_4px_0_rgba(0,0,0,0.4)]" fill="none">
      {/* Ears */}
      <rect x="5" y="4" width="3" height="3" fill="#ea580c" />
      <rect x="16" y="4" width="3" height="3" fill="#ea580c" />
      <rect x="6" y="5" width="1" height="1" fill="#fed7aa" />
      <rect x="17" y="5" width="1" height="1" fill="#fed7aa" />
      {/* Head */}
      <rect x="6" y="7" width="12" height="6" fill="#f97316" />
      <rect x="8" y="8" width="2" height="2" fill="#0f172a" />
      <rect x="14" y="8" width="2" height="2" fill="#0f172a" />
      <rect x="11" y="10" width="2" height="2" fill="#0f172a" />
      {/* White Cheeks */}
      <rect x="6" y="11" width="3" height="2" fill="#ffedd5" />
      <rect x="15" y="11" width="3" height="2" fill="#ffedd5" />
      {/* Body */}
      <rect x="8" y="13" width="9" height="7" fill="#ea580c" />
      <rect x="9" y="13" width="6" height="5" fill="#ffedd5" />
      {/* Paws */}
      <rect x="8" y="20" width="2" height="2" fill="#0f172a" />
      <rect x="14" y="20" width="2" height="2" fill="#0f172a" />
      {/* Bushy Tail */}
      <rect x="17" y="14" width="4" height="4" fill="#ea580c" />
      <rect x="19" y="12" width="3" height="3" fill="#f97316" />
      <rect x="20" y="10" width="3" height="3" fill="#ffedd5" />
    </svg>
  );
};


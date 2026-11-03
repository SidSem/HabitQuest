import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGameStore } from '../../store/gameStore';
import { 
  PixelCoin, 
  PixelFlame, 
  PixelSword, 
  PixelCrown 
} from '../common/PixelIcons';
import { 
  Volume2, 
  VolumeX, 
  Compass, 
  Scroll, 
  User, 
  Package, 
  Map as MapIcon, 
  Trophy, 
  GitFork, 
  BarChart2, 
  Settings 
} from 'lucide-react';

export const GameHUD: React.FC = () => {
  const { character, settings, updateSettings } = useGameStore();

  const toggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  };

  const navLinks = [
    { to: '/', label: 'HUB', icon: Compass },
    { to: '/quests', label: 'JOURNAL', icon: Scroll },
    { to: '/character', label: 'HERO', icon: User },
    { to: '/inventory', label: 'BAG & SHOP', icon: Package },
    { to: '/world', label: 'WORLD', icon: MapIcon },
    { to: '/skills', label: 'SKILLS', icon: GitFork },
    { to: '/achievements', label: 'TROPHIES', icon: Trophy },
    { to: '/stats', label: 'STATS', icon: BarChart2 },
    { to: '/settings', label: 'SETTINGS', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d1024]/95 border-b-3 border-[#2c3363] backdrop-blur-md shadow-pixel">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between h-14 md:h-16">
        {/* Brand / Logo */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center shadow-pixel-sm group-hover:scale-105 transition-transform">
            <PixelSword size={20} className="rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="font-pixel text-xs sm:text-sm text-amber-300 tracking-wider">
              HABITQUEST
            </span>
            <span className="font-retro text-[9px] text-indigo-400 leading-none">
              PIXEL RPG TRACKER
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-2.5 py-1.5 font-pixel text-[10px] tracking-wide transition-all ${
                    isActive
                      ? 'bg-amber-500 text-black font-bold border-2 border-amber-300 shadow-pixel-sm'
                      : 'text-gray-300 hover:text-white hover:bg-[#181d3d] border-2 border-transparent'
                  }`
                }
              >
                <Icon size={13} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right Corner Hero Pill & Sound Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Sound Toggle */}
          <button
            onClick={toggleSound}
            title={settings.soundEnabled ? 'Mute 8-bit Sound' : 'Enable 8-bit Sound'}
            className="p-1.5 sm:p-2 bg-[#141838] border-2 border-[#3c457f] hover:border-amber-400 text-amber-300 transition-colors shadow-pixel-sm"
          >
            {settings.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} className="text-gray-400" />}
          </button>

          {/* Player Level & Gold Quick Badges */}
          <div className="flex items-center gap-2 bg-[#121634] border-2 border-[#3c457f] px-2 sm:px-3 py-1 shadow-pixel-sm">
            <div className="flex items-center gap-1 font-pixel text-[10px] text-purple-300">
              <PixelCrown size={13} />
              <span>LVL {character.level}</span>
            </div>
            <span className="text-gray-600">|</span>
            <div className="flex items-center gap-1 font-pixel text-[10px] text-amber-300">
              <PixelCoin size={13} />
              <span>{character.gold}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};


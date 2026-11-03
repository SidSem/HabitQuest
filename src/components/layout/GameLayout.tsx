import React from 'react';
import { Outlet } from 'react-router-dom';
import { GameHUD } from './GameHUD';
import { MobileGameNavigation } from './MobileGameNavigation';
import { LevelUpModal } from '../game/LevelUpModal';
import { AchievementToast } from '../game/AchievementToast';
import { useGameStore } from '../../store/gameStore';

export const GameLayout: React.FC = () => {
  const { settings } = useGameStore();

  return (
    <div className="min-h-screen bg-[#0a0c19] text-gray-100 flex flex-col relative selection:bg-amber-500 selection:text-black">
      {/* Optional Retro CRT Scanlines Overlay */}
      {settings.scanlines && (
        <div className="fixed inset-0 pointer-events-none z-50 scanlines opacity-50" />
      )}

      {/* Top Game Navigation HUD */}
      <GameHUD />

      {/* Main Screen Content with mobile bottom padding */}
      <main className="flex-1 pb-20 lg:pb-8">
        <Outlet />
      </main>

      {/* Handheld RPG Mobile Navigation Dock */}
      <MobileGameNavigation />

      {/* Global Celebratory Overlays */}
      <LevelUpModal />
      <AchievementToast />
    </div>
  );
};


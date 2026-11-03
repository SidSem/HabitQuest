import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Compass, 
  Scroll, 
  User, 
  Package, 
  Map as MapIcon, 
  MoreHorizontal, 
  Trophy, 
  GitFork, 
  BarChart2, 
  Settings,
  X
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const MobileGameNavigation: React.FC = () => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const primaryLinks = [
    { to: '/', label: 'HUB', icon: Compass },
    { to: '/quests', label: 'QUESTS', icon: Scroll },
    { to: '/character', label: 'HERO', icon: User },
    { to: '/inventory', label: 'BAG', icon: Package },
    { to: '/world', label: 'WORLD', icon: MapIcon },
  ];

  const secondaryLinks = [
    { to: '/skills', label: 'SKILL TREE', icon: GitFork },
    { to: '/achievements', label: 'TROPHIES', icon: Trophy },
    { to: '/stats', label: 'STATS & MATRIX', icon: BarChart2 },
    { to: '/settings', label: 'SETTINGS', icon: Settings },
  ];

  return (
    <>
      {/* Handheld RPG Bottom Nav Dock */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0e1124] border-t-3 border-[#353d73] shadow-[0_-4px_12px_rgba(0,0,0,0.6)] px-2 py-1 safe-area-bottom">
        <div className="flex items-center justify-around">
          {primaryLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setShowMoreMenu(false)}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-1 px-2.5 rounded transition-all ${
                    isActive
                      ? 'text-amber-300 font-bold'
                      : 'text-gray-400 hover:text-gray-200'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`p-1 ${isActive ? 'bg-amber-500/20 border border-amber-400/60 shadow-pixel-sm' : ''}`}>
                      <Icon size={18} />
                    </div>
                    <span className="font-pixel text-[8px] tracking-tighter mt-0.5">
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}

          {/* More Menu Toggle */}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 transition-all ${
              showMoreMenu ? 'text-amber-300' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <div className={`p-1 ${showMoreMenu ? 'bg-amber-500/20 border border-amber-400/60' : ''}`}>
              <MoreHorizontal size={18} />
            </div>
            <span className="font-pixel text-[8px] tracking-tighter mt-0.5">
              MORE
            </span>
          </button>
        </div>
      </nav>

      {/* Slide-up "More" Game Menu Modal */}
      <AnimatePresence>
        {showMoreMenu && (
          <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="w-full max-w-md bg-[#131736] border-t-4 border-amber-500/80 p-5 shadow-pixel-gold pb-12"
            >
              <div className="flex items-center justify-between pb-3 border-b-2 border-indigo-900 mb-4">
                <span className="font-pixel text-xs text-amber-300">
                  ❖ MORE ADVENTURE MENUS ❖
                </span>
                <button
                  onClick={() => setShowMoreMenu(false)}
                  className="p-1 bg-[#0b0e22] text-gray-400 hover:text-white border border-gray-700"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {secondaryLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setShowMoreMenu(false)}
                      className="flex items-center gap-2.5 p-3 bg-[#0d1026] border-2 border-[#333b70] hover:border-amber-400 text-gray-200 hover:text-white transition-all shadow-pixel-sm"
                    >
                      <Icon size={18} className="text-amber-400 shrink-0" />
                      <span className="font-pixel text-[9px]">{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};


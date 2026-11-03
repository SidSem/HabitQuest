import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameLayout } from './components/layout/GameLayout';
import { Home } from './pages/Home';
import { Quests } from './pages/Quests';
import { Character } from './pages/Character';
import { Inventory } from './pages/Inventory';
import { World } from './pages/World';
import { Achievements } from './pages/Achievements';
import { SkillTree } from './pages/SkillTree';
import { Statistics } from './pages/Statistics';
import { Settings } from './pages/Settings';
import { Onboarding } from './pages/Onboarding';
import { useGameStore } from './store/gameStore';

export function App() {
  const { character } = useGameStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Onboarding Wizard Route */}
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Main In-Game Layout & Pages */}
        <Route element={<GameLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/quests" element={<Quests />} />
          <Route path="/character" element={<Character />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/world" element={<World />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/skills" element={<SkillTree />} />
          <Route path="/stats" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Catch-all redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

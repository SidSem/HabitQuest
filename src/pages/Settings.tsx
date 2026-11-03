import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { soundEngine } from '../services/soundService';
import { 
  Volume2, 
  VolumeX, 
  Tv, 
  Download, 
  Upload, 
  RotateCcw, 
  Settings as SettingsIcon, 
  Check, 
  AlertTriangle 
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    exportSaveData, 
    importSaveData, 
    resetGame,
    character 
  } = useGameStore();

  const [importJson, setImportJson] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSoundToggle = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  };

  const handleVolumeChange = (vol: number) => {
    updateSettings({ volume: vol });
  };

  const handleScanlinesToggle = () => {
    updateSettings({ scanlines: !settings.scanlines });
  };

  const handleExport = () => {
    const jsonStr = exportSaveData();
    navigator.clipboard.writeText(jsonStr);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const handleDownloadFile = () => {
    const jsonStr = exportSaveData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `habitquest_save_${character.name.toLowerCase().replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importJson.trim()) return;
    const ok = importSaveData(importJson.trim());
    if (ok) {
      setImportStatus('Save game imported successfully!');
      setImportJson('');
    } else {
      setImportStatus('Error: Invalid HabitQuest JSON save data.');
    }
    setTimeout(() => setImportStatus(null), 4000);
  };

  const handleReset = () => {
    if (window.confirm('Reset HabitQuest to default demo state? This will restore Level 3 character, starter quests, and shop inventory.')) {
      resetGame();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="bg-[#121633] border-3 border-gray-500/60 p-5 shadow-pixel mb-6 flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-500/20 border-2 border-gray-400 flex items-center justify-center shadow-pixel-sm">
          <SettingsIcon size={28} className="text-gray-300" />
        </div>
        <div>
          <h1 className="font-pixel text-base sm:text-lg text-gray-200">
            SYSTEM PREFERENCES & ARCHIVES
          </h1>
          <p className="text-xs text-indigo-300 font-retro">
            AUDIO CHIPTUNE TOGGLES, DISPLAY EFFECTS, AND SAVE DATA MANAGEMENT
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Audio & Visuals */}
        <div className="pixel-frame p-5">
          <h2 className="font-pixel text-xs sm:text-sm text-amber-300 pb-3 border-b-2 border-indigo-900 mb-4">
            AUDIO & RETRO CRT VISUALS
          </h2>

          <div className="space-y-4">
            {/* Sound Toggle */}
            <div className="flex items-center justify-between p-3 bg-[#0c0e22] border border-[#2b3363]">
              <div className="flex items-center gap-3">
                {settings.soundEnabled ? <Volume2 size={20} className="text-amber-400" /> : <VolumeX size={20} className="text-gray-500" />}
                <div>
                  <div className="font-pixel text-xs text-white">8-BIT CHIPTUNE SOUNDS</div>
                  <div className="text-[11px] text-gray-400 font-mono">
                    Authentic synthesized coin sounds, victory fanfares, and equip clicks
                  </div>
                </div>
              </div>
              <button
                onClick={handleSoundToggle}
                className={`py-1.5 px-4 font-pixel text-xs transition-all ${
                  settings.soundEnabled ? 'pixel-btn-emerald' : 'pixel-btn-neutral'
                }`}
              >
                {settings.soundEnabled ? 'ENABLED' : 'MUTED'}
              </button>
            </div>

            {/* Volume Slider */}
            {settings.soundEnabled && (
              <div className="p-3 bg-[#0c0e22] border border-[#2b3363]">
                <div className="flex justify-between items-center mb-2 font-pixel text-xs">
                  <span className="text-gray-300">MASTER VOLUME:</span>
                  <span className="text-amber-300">{Math.round(settings.volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={settings.volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-gray-800"
                />
              </div>
            )}

            {/* Scanlines Effect */}
            <div className="flex items-center justify-between p-3 bg-[#0c0e22] border border-[#2b3363]">
              <div className="flex items-center gap-3">
                <Tv size={20} className="text-purple-400" />
                <div>
                  <div className="font-pixel text-xs text-white">CRT SCANLINES OVERLAY</div>
                  <div className="text-[11px] text-gray-400 font-mono">
                    Subtle retro cathode-ray tube monitor scanlines across the screen
                  </div>
                </div>
              </div>
              <button
                onClick={handleScanlinesToggle}
                className={`py-1.5 px-4 font-pixel text-xs transition-all ${
                  settings.scanlines ? 'pixel-btn-purple' : 'pixel-btn-neutral'
                }`}
              >
                {settings.scanlines ? 'ACTIVE' : 'OFF'}
              </button>
            </div>
          </div>
        </div>

        {/* Data Persistence & Save Management */}
        <div className="pixel-frame p-5">
          <h2 className="font-pixel text-xs sm:text-sm text-amber-300 pb-3 border-b-2 border-indigo-900 mb-4">
            SAVE ARCHIVES & LOCAL BACKUP
          </h2>

          <p className="text-xs text-gray-300 font-mono mb-4 leading-relaxed">
            HabitQuest persists 100% locally in your browser storage. You can backup your adventure state as a JSON file or transfer it between devices without needing any server account.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <button
              onClick={handleExport}
              className="pixel-btn-neutral py-2.5 px-4 flex items-center justify-center gap-2 font-pixel text-xs"
            >
              <Download size={14} />
              {copySuccess ? 'COPIED TO CLIPBOARD!' : 'COPY SAVE JSON'}
            </button>

            <button
              onClick={handleDownloadFile}
              className="pixel-btn-amber py-2.5 px-4 flex items-center justify-center gap-2 font-pixel text-xs"
            >
              <Download size={14} />
              DOWNLOAD SAVE FILE
            </button>
          </div>

          {/* Import JSON Form */}
          <div className="bg-[#0b0e22] border border-[#2b3363] p-3.5 space-y-2">
            <label className="block font-pixel text-[10px] text-indigo-300">
              RESTORE / IMPORT SAVE DATA
            </label>
            <textarea
              rows={3}
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
              placeholder="Paste exported HabitQuest JSON save data string here..."
              className="w-full bg-[#080a18] border border-[#373e6b] focus:border-amber-400 p-2 text-xs font-mono text-gray-200 outline-none resize-none"
            />
            <div className="flex items-center justify-between">
              {importStatus && (
                <span className="text-xs font-mono text-amber-300">{importStatus}</span>
              )}
              <button
                onClick={handleImport}
                className="pixel-btn-emerald py-1.5 px-4 font-pixel text-xs ml-auto"
              >
                <Upload size={13} className="inline mr-1" />
                RESTORE SAVE
              </button>
            </div>
          </div>
        </div>

        {/* Demo Reset Box */}
        <div className="pixel-frame-danger p-5">
          <div className="flex items-center gap-2 pb-2 border-b border-rose-900 mb-3">
            <AlertTriangle size={18} className="text-rose-400" />
            <h3 className="font-pixel text-xs sm:text-sm text-rose-300">
              DANGER ZONE: RESET REALM
            </h3>
          </div>

          <p className="text-xs text-rose-200 font-mono mb-4 leading-relaxed">
            Reset all progression, gold, equipment, and streaks back to the default demo state (Level 3 Adventurer with starter habits).
          </p>

          <button
            onClick={handleReset}
            className="py-2.5 px-5 bg-rose-900/80 hover:bg-rose-800 border-2 border-rose-500 font-pixel text-xs text-white shadow-pixel transition-all"
          >
            <RotateCcw size={14} className="inline mr-1.5" />
            RESET GAME TO DEMO STATE
          </button>
        </div>

        {/* Game Lore & Version */}
        <div className="text-center font-retro text-xs text-gray-500 space-y-1 py-4">
          <div>HABITQUEST • VERSION 1.0.0 PIXEL RPG EDITION</div>
          <div>CRAFTED WITH RETRO 8-BIT PASSION FOR DAILY SELF-MASTERY</div>
        </div>
      </div>
    </div>
  );
};

import type { FC } from 'react';
import type { GameMode } from '../types/game';

interface GameModeSelectorProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  disabled?: boolean;
}

export const GameModeSelector: FC<GameModeSelectorProps> = ({
  currentMode,
  onSelectMode,
  disabled = false,
}) => {
  return (
    <div
      className="mode-selector-wrapper"
      role="group"
      aria-label="Game mode selection"
    >
      <button
        type="button"
        className={`mode-btn ${currentMode === 'pvp' ? 'active' : ''}`}
        onClick={() => onSelectMode('pvp')}
        disabled={disabled}
        aria-pressed={currentMode === 'pvp'}
      >
        <svg
          className="mode-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Two players icon */}
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span>Player vs Player</span>
      </button>

      <button
        type="button"
        className={`mode-btn ${currentMode === 'pvc' ? 'active' : ''}`}
        onClick={() => onSelectMode('pvc')}
        disabled={disabled}
        aria-pressed={currentMode === 'pvc'}
      >
        <svg
          className="mode-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Bot / AI Opponent icon */}
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8" y2="16.01" />
          <line x1="16" y1="16" x2="16" y2="16.01" />
        </svg>
        <span>Player vs Computer</span>
      </button>
    </div>
  );
};

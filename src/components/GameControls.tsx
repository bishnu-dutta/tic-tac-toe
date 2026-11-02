import type { FC } from 'react';

interface GameControlsProps {
  onRestart: () => void;
  onOpenResetScores: () => void;
}

export const GameControls: FC<GameControlsProps> = ({
  onRestart,
  onOpenResetScores,
}) => {
  return (
    <div className="game-controls" role="group" aria-label="Game actions">
      <button
        type="button"
        className="control-btn restart-btn"
        onClick={onRestart}
        aria-label="Restart current match"
      >
        <svg
          className="control-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Refresh / Restart icon */}
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
        </svg>
        <span>Restart Match</span>
      </button>

      <button
        type="button"
        className="control-btn reset-scores-btn"
        onClick={onOpenResetScores}
        aria-label="Reset scoreboard scores"
      >
        <svg
          className="control-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Trash / Reset scores icon */}
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
        <span>Reset Scores</span>
      </button>
    </div>
  );
};

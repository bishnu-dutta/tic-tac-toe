import type { FC } from 'react';
import type { GameMode, GameScores } from '../types/game';

interface ScoreBoardProps {
  gameMode: GameMode;
  scores: GameScores;
}

export const ScoreBoard: FC<ScoreBoardProps> = ({ gameMode, scores }) => {
  const currentScores = scores[gameMode];

  const playerOneLabel = gameMode === 'pvc' ? 'Human (X)' : 'Player X';
  const playerTwoLabel = gameMode === 'pvc' ? 'Computer (O)' : 'Player O';

  return (
    <section
      className="scoreboard-container"
      aria-label="Scoreboard"
    >
      <div className="score-card score-x">
        <span className="score-label">{playerOneLabel}</span>
        <span className="score-value" aria-label={`${playerOneLabel} score: ${currentScores.xWins}`}>
          {currentScores.xWins}
        </span>
      </div>

      <div className="score-card score-draw">
        <span className="score-label">Draws</span>
        <span className="score-value" aria-label={`Draws count: ${currentScores.draws}`}>
          {currentScores.draws}
        </span>
      </div>

      <div className="score-card score-o">
        <span className="score-label">{playerTwoLabel}</span>
        <span className="score-value" aria-label={`${playerTwoLabel} score: ${currentScores.oWins}`}>
          {currentScores.oWins}
        </span>
      </div>
    </section>
  );
};

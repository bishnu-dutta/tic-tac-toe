import type { FC } from 'react';
import type { GameMode, GameResult, Player } from '../types/game';

interface GameStatusProps {
  gameMode: GameMode;
  currentTurn: Player;
  result: GameResult;
  isAiThinking: boolean;
}

export const GameStatus: FC<GameStatusProps> = ({
  gameMode,
  currentTurn,
  result,
  isAiThinking,
}) => {
  const { status, winner } = result;

  // Derive status badge and textual message
  const getStatusContent = () => {
    if (status === 'won') {
      if (gameMode === 'pvc') {
        if (winner === 'X') {
          return {
            badge: 'VICTORY',
            message: 'You Won! Outstanding Play!',
            tone: 'winner-x',
          };
        } else {
          return {
            badge: 'DEFEAT',
            message: 'Computer Won! Minimax is Unbeatable.',
            tone: 'winner-o',
          };
        }
      }

      // PvP Mode
      return {
        badge: 'WINNER',
        message: `Player ${winner} Takes the Match!`,
        tone: winner === 'X' ? 'winner-x' : 'winner-o',
      };
    }

    if (status === 'draw') {
      return {
        badge: 'TIE',
        message: "It's a Stalemate! Perfectly Matched.",
        tone: 'draw',
      };
    }

    // Active playing state
    if (gameMode === 'pvc') {
      if (isAiThinking) {
        return {
          badge: 'AI',
          message: 'Computer is thinking',
          tone: 'thinking',
          showDots: true,
        };
      }
      return {
        badge: 'YOUR TURN',
        message: 'Your Turn (Playing as X)',
        tone: 'turn-x',
      };
    }

    // PvP Mode Turn
    return {
      badge: 'CURRENT TURN',
      message: `Player ${currentTurn}'s Turn`,
      tone: currentTurn === 'X' ? 'turn-x' : 'turn-o',
    };
  };

  const { badge, message, tone, showDots } = getStatusContent();

  return (
    <div
      className={`status-card ${tone}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="status-badge">{badge}</div>
      <div className="status-message">
        <span>{message}</span>
        {showDots && (
          <span className="thinking-dots" aria-hidden="true">
            <span className="dot dot-1">.</span>
            <span className="dot dot-2">.</span>
            <span className="dot dot-3">.</span>
          </span>
        )}
      </div>
    </div>
  );
};

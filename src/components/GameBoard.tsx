import type { FC } from 'react';
import type { Board, WinningLine } from '../types/game';
import { GameCell } from './GameCell';

interface GameBoardProps {
  board: Board;
  winningLine: WinningLine | null;
  disabled: boolean;
  isAiThinking: boolean;
  onCellClick: (index: number) => void;
}

export const GameBoard: FC<GameBoardProps> = ({
  board,
  winningLine,
  disabled,
  isAiThinking,
  onCellClick,
}) => {
  const winningSet = new Set<number>(winningLine ?? []);

  return (
    <section
      className="board-container"
      aria-label="Tic-Tac-Toe Game Board"
    >
      <div className="board-grid" role="region" aria-label="3 by 3 game grid">
        {board.map((cellValue, index) => (
          <GameCell
            key={index}
            index={index}
            value={cellValue}
            isWinningCell={winningSet.has(index)}
            disabled={disabled}
            isAiThinking={isAiThinking}
            onClick={onCellClick}
          />
        ))}
      </div>
    </section>
  );
};

import type { FC } from 'react';
import type { CellValue } from '../types/game';
import { getCellCoordinates } from '../utils/gameLogic';

interface GameCellProps {
  index: number;
  value: CellValue;
  isWinningCell: boolean;
  disabled: boolean;
  isAiThinking: boolean;
  onClick: (index: number) => void;
}

export const GameCell: FC<GameCellProps> = ({
  index,
  value,
  isWinningCell,
  disabled,
  isAiThinking,
  onClick,
}) => {
  const { row, col } = getCellCoordinates(index);

  // Compose accessible description
  let accessibilityLabel = `Row ${row}, Column ${col}`;
  if (value === null) {
    accessibilityLabel += ', empty';
  } else {
    accessibilityLabel += `, occupied by ${value}`;
  }
  if (isWinningCell) {
    accessibilityLabel += ', winning cell';
  }

  const isInteractive = !disabled && !isAiThinking && value === null;

  return (
    <button
      type="button"
      className={`game-cell ${value ? `cell-${value.toLowerCase()}` : 'cell-empty'} ${
        isWinningCell ? 'winning' : ''
      }`}
      onClick={() => onClick(index)}
      disabled={!isInteractive}
      aria-label={accessibilityLabel}
      aria-disabled={!isInteractive}
    >
      {value === 'X' && (
        <svg
          className="symbol-svg symbol-x"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <line
            x1="22"
            y1="22"
            x2="78"
            y2="78"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <line
            x1="78"
            y1="22"
            x2="22"
            y2="78"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </svg>
      )}

      {value === 'O' && (
        <svg
          className="symbol-svg symbol-o"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
};

import type { Board, CellValue, GameResult, GameStatus, WinningLine } from '../types/game';

/**
 * All 8 possible winning combinations on a 3x3 board:
 * 3 rows, 3 columns, and 2 diagonals.
 */
export const WINNING_COMBINATIONS: readonly WinningLine[] = [
  [0, 1, 2], // Row 0
  [3, 4, 5], // Row 1
  [6, 7, 8], // Row 2
  [0, 3, 6], // Column 0
  [1, 4, 7], // Column 1
  [2, 5, 8], // Column 2
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
] as const;

/**
 * Creates a brand new empty 9-cell board.
 */
export function createEmptyBoard(): Board {
  return [null, null, null, null, null, null, null, null, null];
}

/**
 * Safely creates an independent copy of a board tuple.
 */
export function cloneBoard(board: Board): Board {
  return [...board] as Board;
}

/**
 * Returns a list of indices (0-8) that are currently unoccupied.
 */
export function getAvailableMoves(board: Board): number[] {
  const moves: number[] = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      moves.push(i);
    }
  }
  return moves;
}

/**
 * Inspects the current board and evaluates whether a player has won,
 * the game is a draw, or the game is still actively in progress.
 */
export function checkGameResult(board: Board): GameResult {
  // Check winning lines first
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    const cellA = board[a];
    const cellB = board[b];
    const cellC = board[c];

    if (cellA !== null && cellA === cellB && cellA === cellC) {
      return {
        status: 'won',
        winner: cellA,
        winningLine: [a, b, c],
      };
    }
  }

  // Check for draw (all 9 cells filled without a winner)
  const isFull = board.every((cell: CellValue) => cell !== null);
  if (isFull) {
    return {
      status: 'draw',
      winner: null,
      winningLine: null,
    };
  }

  // Otherwise, still actively playing
  return {
    status: 'playing',
    winner: null,
    winningLine: null,
  };
}

/**
 * Checks whether the current game state has concluded.
 */
export function isGameOver(status: GameStatus): boolean {
  return status !== 'playing';
}

/**
 * Validates whether a move at the given index is currently permissible.
 */
export function isValidMove(board: Board, index: number, gameOver: boolean): boolean {
  if (gameOver) return false;
  if (index < 0 || index >= board.length) return false;
  return board[index] === null;
}

/**
 * Converts a 0-indexed cell position (0-8) to 1-indexed row and column coordinates
 * for accessible screen-reader labels.
 */
export function getCellCoordinates(index: number): { row: number; col: number } {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;
  return { row, col };
}

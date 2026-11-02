export type Player = 'X' | 'O';

export type CellValue = Player | null;

/**
 * A fixed 9-element tuple representing the 3x3 Tic-Tac-Toe board:
 * 0 | 1 | 2
 * ---------
 * 3 | 4 | 5
 * ---------
 * 6 | 7 | 8
 */
export type Board = [
  CellValue,
  CellValue,
  CellValue,
  CellValue,
  CellValue,
  CellValue,
  CellValue,
  CellValue,
  CellValue,
];

export type WinningLine = readonly [number, number, number];

export type GameMode = 'pvp' | 'pvc';

export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameResult {
  status: GameStatus;
  winner: Player | null;
  winningLine: WinningLine | null;
}

export interface ScoreRecord {
  xWins: number;
  oWins: number;
  draws: number;
}

export interface GameScores {
  pvp: ScoreRecord;
  pvc: ScoreRecord;
}

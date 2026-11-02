import type { GameScores, ScoreRecord } from '../types/game';

const STORAGE_KEY = 'tictactoe_scores_v1';

export const DEFAULT_SCORES: GameScores = {
  pvp: { xWins: 0, oWins: 0, draws: 0 },
  pvc: { xWins: 0, oWins: 0, draws: 0 },
};

/**
 * Type guard to validate whether an unknown object adheres to the ScoreRecord schema.
 */
function isValidScoreRecord(record: unknown): record is ScoreRecord {
  if (!record || typeof record !== 'object') {
    return false;
  }
  const candidate = record as Record<string, unknown>;
  return (
    typeof candidate.xWins === 'number' &&
    Number.isInteger(candidate.xWins) &&
    candidate.xWins >= 0 &&
    typeof candidate.oWins === 'number' &&
    Number.isInteger(candidate.oWins) &&
    candidate.oWins >= 0 &&
    typeof candidate.draws === 'number' &&
    Number.isInteger(candidate.draws) &&
    candidate.draws >= 0
  );
}

/**
 * Validates and retrieves scores from localStorage.
 * If storage is empty, corrupted, or unsupported, returns clean default values.
 */
export function loadScores(): GameScores {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      return { ...DEFAULT_SCORES };
    }

    const parsed: unknown = JSON.parse(rawData);
    if (!parsed || typeof parsed !== 'object') {
      return { ...DEFAULT_SCORES };
    }

    const data = parsed as Record<string, unknown>;

    if (isValidScoreRecord(data.pvp) && isValidScoreRecord(data.pvc)) {
      return {
        pvp: {
          xWins: data.pvp.xWins,
          oWins: data.pvp.oWins,
          draws: data.pvp.draws,
        },
        pvc: {
          xWins: data.pvc.xWins,
          oWins: data.pvc.oWins,
          draws: data.pvc.draws,
        },
      };
    }

    return { ...DEFAULT_SCORES };
  } catch (error) {
    // Catches JSON parse errors or restricted localStorage access
    console.warn('Failed to load scores from localStorage. Resetting to default.', error);
    return { ...DEFAULT_SCORES };
  }
}

/**
 * Persists updated scores to localStorage safely.
 */
export function saveScores(scores: GameScores): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch (error) {
    console.warn('Failed to save scores to localStorage.', error);
  }
}

/**
 * Clears stored scores from localStorage and returns fresh default scores.
 */
export function clearScores(): GameScores {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear scores from localStorage.', error);
  }
  return { ...DEFAULT_SCORES };
}

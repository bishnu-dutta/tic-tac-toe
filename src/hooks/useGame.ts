import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Board, GameMode, GameResult, GameScores, Player } from '../types/game';
import { getBestMove } from '../utils/ai';
import {
  checkGameResult,
  cloneBoard,
  createEmptyBoard,
  isGameOver,
  isValidMove,
} from '../utils/gameLogic';
import { clearScores, loadScores, saveScores } from '../utils/storage';

const AI_THINKING_DELAY_MS = 500;

export function useGame() {
  const [board, setBoard] = useState<Board>(createEmptyBoard);
  const [currentTurn, setCurrentTurn] = useState<Player>('X');
  const [gameMode, setGameMode] = useState<GameMode>('pvp');
  const [scores, setScores] = useState<GameScores>(loadScores);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);

  // Active timer reference to clean up if the match is restarted or mode changed
  const aiTimeoutRef = useRef<number | null>(null);

  // Monotonically increasing match ID to invalidate stale asynchronous AI moves
  const matchIdRef = useRef<number>(1);

  // Game result evaluation (memoized based on board)
  const result: GameResult = useMemo(() => checkGameResult(board), [board]);
  const gameOver = isGameOver(result.status);

  // Clears any pending AI move timers
  const cancelPendingAiMove = useCallback(() => {
    if (aiTimeoutRef.current !== null) {
      window.clearTimeout(aiTimeoutRef.current);
      aiTimeoutRef.current = null;
    }
    setIsAiThinking(false);
  }, []);

  // Records a completed game score and persists to localStorage
  const recordResult = useCallback(
    (mode: GameMode, winner: Player | null, status: 'won' | 'draw') => {
      setScores((prevScores: GameScores) => {
        const modeScores = { ...prevScores[mode] };

        if (status === 'won' && winner === 'X') {
          modeScores.xWins += 1;
        } else if (status === 'won' && winner === 'O') {
          modeScores.oWins += 1;
        } else if (status === 'draw') {
          modeScores.draws += 1;
        }

        const updated: GameScores = {
          ...prevScores,
          [mode]: modeScores,
        };

        saveScores(updated);
        return updated;
      });
    },
    []
  );

  // Restarts the current match
  const restartMatch = useCallback(() => {
    cancelPendingAiMove();
    matchIdRef.current += 1;
    setBoard(createEmptyBoard());
    setCurrentTurn('X');
  }, [cancelPendingAiMove]);

  // Switches the game mode safely
  const changeGameMode = useCallback(
    (newMode: GameMode) => {
      if (newMode === gameMode) return;
      cancelPendingAiMove();
      matchIdRef.current += 1;
      setGameMode(newMode);
      setBoard(createEmptyBoard());
      setCurrentTurn('X');
    },
    [cancelPendingAiMove, gameMode]
  );

  // Applies a move made by a human player
  const makeMove = useCallback(
    (index: number) => {
      // Disallow moves if game is over, cell occupied, or AI is currently thinking
      if (!isValidMove(board, index, gameOver) || isAiThinking) {
        return;
      }

      // In PvC mode, human player can only play as 'X'
      if (gameMode === 'pvc' && currentTurn !== 'X') {
        return;
      }

      const newBoard = cloneBoard(board);
      newBoard[index] = currentTurn;
      const moveResult = checkGameResult(newBoard);

      setBoard(newBoard);

      if (moveResult.status !== 'playing') {
        recordResult(gameMode, moveResult.winner, moveResult.status);
      } else {
        setCurrentTurn(currentTurn === 'X' ? 'O' : 'X');
      }
    },
    [board, currentTurn, gameMode, gameOver, isAiThinking, recordResult]
  );

  // Handles computer turn in PvC mode
  useEffect(() => {
    // Only trigger if in PvC mode, computer's turn ('O'), game not over, and not already thinking
    if (gameMode !== 'pvc' || currentTurn !== 'O' || gameOver) {
      return;
    }

    const currentMatchId = matchIdRef.current;
    setIsAiThinking(true);

    aiTimeoutRef.current = window.setTimeout(() => {
      // Verify match has not been restarted or abandoned while thinking
      if (matchIdRef.current !== currentMatchId) {
        return;
      }

      const bestMoveIndex = getBestMove(board, 'O');
      const newBoard = cloneBoard(board);
      newBoard[bestMoveIndex] = 'O';
      const moveResult = checkGameResult(newBoard);

      setBoard(newBoard);
      setIsAiThinking(false);
      aiTimeoutRef.current = null;

      if (moveResult.status !== 'playing') {
        recordResult('pvc', moveResult.winner, moveResult.status);
      } else {
        setCurrentTurn('X');
      }
    }, AI_THINKING_DELAY_MS);

    return () => {
      if (aiTimeoutRef.current !== null) {
        window.clearTimeout(aiTimeoutRef.current);
        aiTimeoutRef.current = null;
      }
    };
  }, [board, currentTurn, gameMode, gameOver, recordResult]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (aiTimeoutRef.current !== null) {
        window.clearTimeout(aiTimeoutRef.current);
      }
    };
  }, []);

  // Score reset modal handling
  const openResetModal = useCallback(() => {
    setIsResetModalOpen(true);
  }, []);

  const closeResetModal = useCallback(() => {
    setIsResetModalOpen(false);
  }, []);

  const confirmResetScores = useCallback(() => {
    const freshScores = clearScores();
    setScores(freshScores);
    setIsResetModalOpen(false);
  }, []);

  return {
    board,
    currentTurn,
    gameMode,
    scores,
    result,
    gameOver,
    isAiThinking,
    isResetModalOpen,
    makeMove,
    restartMatch,
    changeGameMode,
    openResetModal,
    closeResetModal,
    confirmResetScores,
  };
}

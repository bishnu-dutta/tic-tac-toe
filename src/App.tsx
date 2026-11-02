import type { FC } from 'react';
import { ConfirmModal } from './components/ConfirmModal';
import { GameBoard } from './components/GameBoard';
import { GameControls } from './components/GameControls';
import { GameModeSelector } from './components/GameModeSelector';
import { GameStatus } from './components/GameStatus';
import { ScoreBoard } from './components/ScoreBoard';
import { useGame } from './hooks/useGame';

export const App: FC = () => {
  const {
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
  } = useGame();

  return (
    <div className="app-container">
      <header className="game-header">
        <h1 className="game-title">
          TIC<span className="title-accent">-</span>TAC
          <span className="title-accent">-</span>TOE
        </h1>
        <p className="game-subtitle">
          Master the classic 3×3 grid against an unbeatable AI or a friend
        </p>
      </header>

      <main className="game-main">
        {/* Game Mode Selector */}
        <GameModeSelector
          currentMode={gameMode}
          onSelectMode={changeGameMode}
          disabled={isAiThinking}
        />

        {/* Current Match Status & Indicator */}
        <GameStatus
          gameMode={gameMode}
          currentTurn={currentTurn}
          result={result}
          isAiThinking={isAiThinking}
        />

        {/* 3x3 Game Board */}
        <GameBoard
          board={board}
          winningLine={result.winningLine}
          disabled={gameOver}
          isAiThinking={isAiThinking}
          onCellClick={makeMove}
        />

        {/* Persistent Scoreboard */}
        <ScoreBoard
          gameMode={gameMode}
          scores={scores}
        />

        {/* Action Controls: Restart & Reset Scores */}
        <GameControls
          onRestart={restartMatch}
          onOpenResetScores={openResetModal}
        />
      </main>

      <footer className="game-footer">
        <p>Built with React, TypeScript & Minimax AI Algorithm</p>
      </footer>

      {/* Score Reset Confirmation Dialog */}
      <ConfirmModal
        isOpen={isResetModalOpen}
        title="Reset Scoreboard?"
        message={`Are you sure you want to reset all saved scores for both Player vs Player and Player vs Computer? This action cannot be reversed.`}
        confirmLabel="Yes, Reset Scores"
        cancelLabel="Cancel"
        onConfirm={confirmResetScores}
        onCancel={closeResetModal}
      />
    </div>
  );
};

export default App;

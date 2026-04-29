import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, RoundResult } from '../types';
import { generateRandomColor, calcMiddleColor, calculateScore } from '../utils';
import { ColorDisplay, ColorPicker, ResultsDisplay, GameControls } from './';

export const GameContainer = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const initialColorA = generateRandomColor();
    const initialColorB = generateRandomColor();

    return {
      status: 'idle',
      colorA: initialColorA,
      colorB: initialColorB,
      targetColor: calcMiddleColor(initialColorA, initialColorB),
      guessColor: null,
      currentScore: 0,
      bestScore: 0,
      totalScore: 0,
      history: [],
    };
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const startGame = useCallback(() => {
    const colorA = generateRandomColor();
    const colorB = generateRandomColor();
    const targetColor = calcMiddleColor(colorA, colorB);

    setGameState(prev => ({
      ...prev,
      status: 'playing',
      colorA,
      colorB,
      targetColor,
      guessColor: null,
      currentScore: 0,
    }));
  }, []);

  const handleColorSelect = useCallback((color: RoundResult['guessColor']) => {
    setGameState(prev => ({
      ...prev,
      guessColor: color,
    }));
  }, []);

  const MAX_HISTORY_ENTRIES = 100;

  const submitGuess = useCallback(() => {
    if (!gameState.guessColor) return;

    const score = calculateScore(gameState.guessColor, gameState.targetColor);
    const newBestScore = Math.max(gameState.bestScore, score);
    const newTotalScore = gameState.totalScore + score;

    const roundResult: RoundResult = {
      colorA: gameState.colorA,
      colorB: gameState.colorB,
      targetColor: gameState.targetColor,
      guessColor: gameState.guessColor,
      score,
      timestamp: new Date(),
    };

    setGameState(prev => ({
      ...prev,
      status: 'scored',
      currentScore: score,
      bestScore: newBestScore,
      totalScore: newTotalScore,
      history: [...prev.history, roundResult].slice(-MAX_HISTORY_ENTRIES),
    }));
  }, [gameState.colorA, gameState.colorB, gameState.targetColor, gameState.guessColor, gameState.bestScore, gameState.totalScore]);

  const playAgain = useCallback(() => {
    startGame();
  }, [startGame]);

  const newGame = useCallback(() => {
    const colorA = generateRandomColor();
    const colorB = generateRandomColor();
    const targetColor = calcMiddleColor(colorA, colorB);

    setGameState(prev => ({
      ...prev,
      status: 'playing',
      colorA,
      colorB,
      targetColor,
      guessColor: null,
      currentScore: 0,
    }));
  }, []);

  const clearHistory = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      history: [],
      totalScore: 0,
      bestScore: 0,
    }));
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-screen animated-background">
      {/* Cursor Follower */}
      <div
        className="cursor-follower"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />
      
      <div className="container mx-auto px-4 py-6 h-full flex flex-col relative z-10">
        {/* Header */}
        <div className="text-center mb-4 flex-shrink-0">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-1">
            Color Chain
          </h1>
          <p className="text-gray-600 text-sm">
            Guess perfect middle color between two random colors!
          </p>
        </div>

        {/* Main Content - Fit to screen */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
          {/* Left Column: Game Area */}
          <div className="flex-1 flex flex-col gap-3 min-h-0">
            <ColorDisplay
              colorA={gameState.colorA}
              colorB={gameState.colorB}
              gameState={gameState.status}
              targetColor={gameState.targetColor}
              guessColor={gameState.guessColor || undefined}
            />

            {gameState.status !== 'idle' && (
              <>
                <ColorPicker
                  onColorSelect={handleColorSelect}
                  disabled={gameState.status === 'scored'}
                  initialColor={gameState.guessColor || undefined}
                />
                <GameControls
                  gameState={gameState.status}
                  hasGuess={gameState.guessColor !== null}
                  onPlay={startGame}
                  onSubmit={submitGuess}
                  onPlayAgain={playAgain}
                  onNewGame={newGame}
                />
              </>
            )}

            {gameState.status === 'idle' && (
              <GameControls
                gameState={gameState.status}
                hasGuess={false}
                onPlay={startGame}
                onSubmit={() => {}}
                onPlayAgain={() => {}}
                onNewGame={() => {}}
              />
            )}
          </div>

          {/* Right Column: Results */}
          <div className="lg:w-72 flex-shrink-0 min-h-0">
            <ResultsDisplay
              currentScore={gameState.currentScore}
              bestScore={gameState.bestScore}
              totalScore={gameState.totalScore}
              history={gameState.history}
              onClearHistory={clearHistory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

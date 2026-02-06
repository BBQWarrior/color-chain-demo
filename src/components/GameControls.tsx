import { GameStatus } from '../types';

interface GameControlsProps {
  gameState: GameStatus;
  hasGuess: boolean;
  onPlay: () => void;
  onSubmit: () => void;
  onPlayAgain: () => void;
  onNewGame: () => void;
}

export const GameControls = ({ gameState, hasGuess, onPlay, onSubmit, onPlayAgain, onNewGame }: GameControlsProps) => {
  return (
    <div className="game-controls flex flex-col gap-2 flex-shrink-0">
      {gameState === 'idle' && (
        <button
          onClick={onPlay}
          className="w-full py-2.5 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-base rounded-xl shadow-lg hover:brightness-110 transition-all duration-200"
        >
          Play
        </button>
      )}

      {gameState === 'playing' && (
        <button
          onClick={onSubmit}
          disabled={!hasGuess}
          className={`w-full py-2.5 px-6 font-bold text-base rounded-xl shadow-lg transform transition-all duration-200 ${
            hasGuess
              ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:brightness-110'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
          }`}
        >
          Submit
        </button>
      )}

      {gameState === 'scored' && (
        <div className="flex gap-2">
          <button
            onClick={onPlayAgain}
            className="flex-1 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm rounded-xl shadow-lg hover:brightness-110 transition-all duration-200"
          >
            Play Again
          </button>
          <button
            onClick={onNewGame}
            className="flex-1 py-2.5 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm rounded-xl shadow-lg hover:brightness-110 transition-all duration-200"
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
};

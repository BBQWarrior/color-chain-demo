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
    <div className="game-controls flex flex-col gap-3">
      {gameState === 'idle' && (
        <button
          onClick={onPlay}
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
        >
          Play
        </button>
      )}

      {gameState === 'playing' && (
        <button
          onClick={onSubmit}
          disabled={!hasGuess}
          className={`w-full py-3 px-6 font-bold text-lg rounded-xl shadow-lg transform transition-all duration-200 ${
            hasGuess
              ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700 hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit
        </button>
      )}

      {gameState === 'scored' && (
        <div className="flex gap-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl shadow-lg hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200"
          >
            Play Again
          </button>
          <button
            onClick={onNewGame}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-xl shadow-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200"
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
};

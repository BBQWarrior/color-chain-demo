import { Color, GameStatus } from '../types';
import { rgbToCss } from '../utils';

interface ColorDisplayProps {
  colorA: Color;
  colorB: Color;
  gameState: GameStatus;
  targetColor?: Color;
  guessColor?: Color;
}

export const ColorDisplay = ({ colorA, colorB, gameState, targetColor, guessColor }: ColorDisplayProps) => {
  const showResults = gameState === 'scored';

  return (
    <div className="color-display flex flex-col gap-3 p-4 bg-gray-900 rounded-xl shadow-lg">
      <div className="flex items-center justify-between gap-3">
        {/* Color A */}
        <div className="flex flex-col items-center gap-1">
          <div
            className="w-16 h-16 rounded-lg border-2 border-gray-300 shadow-md"
            style={{ backgroundColor: rgbToCss(colorA) }}
          />
          <span className="text-xs font-medium text-gray-700">A</span>
        </div>

        {/* Gradient Line */}
        <div className="flex-1 h-2 rounded-full" style={{
          background: `linear-gradient(to right, ${rgbToCss(colorA)}, ${rgbToCss(colorB)})`
        }} />

        {/* Color B */}
        <div className="flex flex-col items-center gap-1">
          <div
            className="w-16 h-16 rounded-lg border-2 border-gray-300 shadow-md"
            style={{ backgroundColor: rgbToCss(colorB) }}
          />
          <span className="text-xs font-medium text-gray-700">B</span>
        </div>
      </div>

      {/* Results Section */}
      {showResults && targetColor && guessColor && (
        <div className="flex items-center justify-center gap-4 pt-2 border-t border-gray-200">
          {/* Target Color */}
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-14 h-14 rounded-lg border-2 border-green-500 shadow-md"
              style={{ backgroundColor: rgbToCss(targetColor) }}
            />
            <span className="text-xs font-medium text-green-600">Target</span>
          </div>

          {/* VS */}
          <div className="text-lg font-bold text-gray-400">VS</div>

          {/* Guess Color */}
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-14 h-14 rounded-lg border-2 border-blue-500 shadow-md"
              style={{ backgroundColor: rgbToCss(guessColor) }}
            />
            <span className="text-xs font-medium text-blue-600">Guess</span>
          </div>
        </div>
      )}
    </div>
  );
};

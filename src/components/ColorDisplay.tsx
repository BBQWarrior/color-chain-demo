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
    <div className="color-display flex flex-col gap-6 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between gap-4">
        {/* Color A */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-24 h-24 rounded-lg border-2 border-gray-300 shadow-md"
            style={{ backgroundColor: rgbToCss(colorA) }}
          />
          <span className="text-sm font-medium text-gray-700">Color A</span>
          <span className="text-xs text-gray-500 font-mono">{rgbToCss(colorA)}</span>
        </div>

        {/* Gradient Line */}
        <div className="flex-1 h-2 rounded-full" style={{
          background: `linear-gradient(to right, ${rgbToCss(colorA)}, ${rgbToCss(colorB)})`
        }} />

        {/* Color B */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-24 h-24 rounded-lg border-2 border-gray-300 shadow-md"
            style={{ backgroundColor: rgbToCss(colorB) }}
          />
          <span className="text-sm font-medium text-gray-700">Color B</span>
          <span className="text-xs text-gray-500 font-mono">{rgbToCss(colorB)}</span>
        </div>
      </div>

      {/* Results Section */}
      {showResults && targetColor && guessColor && (
        <div className="flex items-center justify-center gap-8 pt-4 border-t border-gray-200">
          {/* Target Color */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-20 h-20 rounded-lg border-2 border-green-500 shadow-md"
              style={{ backgroundColor: rgbToCss(targetColor) }}
            />
            <span className="text-sm font-medium text-green-600">Target</span>
            <span className="text-xs text-gray-500 font-mono">{rgbToCss(targetColor)}</span>
          </div>

          {/* VS */}
          <div className="text-2xl font-bold text-gray-400">VS</div>

          {/* Guess Color */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-20 h-20 rounded-lg border-2 border-blue-500 shadow-md"
              style={{ backgroundColor: rgbToCss(guessColor) }}
            />
            <span className="text-sm font-medium text-blue-600">Your Guess</span>
            <span className="text-xs text-gray-500 font-mono">{rgbToCss(guessColor)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

import { RoundResult } from '../types';

interface ResultsDisplayProps {
  currentScore: number;
  bestScore: number;
  totalScore: number;
  history: RoundResult[];
  onClearHistory: () => void;
}

export const ResultsDisplay = ({ currentScore, bestScore, totalScore, history, onClearHistory }: ResultsDisplayProps) => {
  return (
    <div className="results-display flex flex-col gap-3 p-4 bg-white rounded-xl shadow-lg h-full overflow-hidden">
      <div className="flex items-center justify-between flex-shrink-0">
        <h2 className="text-lg font-bold text-gray-800">Scores</h2>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-3 gap-2 flex-shrink-0">
        <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg">
          <span className="text-xs text-blue-600 font-medium">Current</span>
          <span className="text-lg font-bold text-blue-800">{currentScore}</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
          <span className="text-xs text-green-600 font-medium">Best</span>
          <span className="text-lg font-bold text-green-800">{bestScore}</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-purple-50 rounded-lg">
          <span className="text-xs text-purple-600 font-medium">Total</span>
          <span className="text-lg font-bold text-purple-800">{totalScore}</span>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          <h3 className="text-xs font-semibold text-gray-700 mb-2 flex-shrink-0">History</h3>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-transparent">
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-1">#</th>
                  <th className="pb-1">Score</th>
                  <th className="pb-1">Time</th>
                </tr>
              </thead>
              <tbody>
                {history.slice().reverse().map((result, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-1 text-gray-500">{history.length - index}</td>
                    <td className="py-1 font-medium">{result.score}</td>
                    <td className="py-1 text-gray-500">
                      {new Date(result.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {history.length === 0 && (
        <div className="text-center py-4 text-gray-400 text-xs flex-shrink-0">
          No rounds played yet
        </div>
      )}
    </div>
  );
};

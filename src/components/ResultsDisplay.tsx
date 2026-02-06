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
    <div className="results-display flex flex-col gap-4 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Scores</h2>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
          >
            Clear History
          </button>
        )}
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
          <span className="text-sm text-blue-600 font-medium">Current</span>
          <span className="text-2xl font-bold text-blue-800">{currentScore}</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
          <span className="text-sm text-green-600 font-medium">Best</span>
          <span className="text-2xl font-bold text-green-800">{bestScore}</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
          <span className="text-sm text-purple-600 font-medium">Total</span>
          <span className="text-2xl font-bold text-purple-800">{totalScore}</span>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">History</h3>
          <div className="max-h-48 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2">#</th>
                  <th className="pb-2">Score</th>
                  <th className="pb-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {history.slice().reverse().map((result, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 text-gray-500">{history.length - index}</td>
                    <td className="py-2 font-medium">{result.score}</td>
                    <td className="py-2 text-gray-500">
                      {new Date(result.timestamp).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {history.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No rounds played yet. Start playing to see your history!
        </div>
      )}
    </div>
  );
};

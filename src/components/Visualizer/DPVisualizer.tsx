import React from 'react';

interface DPVisualizerProps {
  data: any;
  highlighted: number[];
  algorithm?: string;
  currentStep?: number;
  variables?: any;
}

export const DPVisualizer: React.FC<DPVisualizerProps> = ({ 
  data, 
  highlighted, 
  algorithm = 'knapsack',
  currentStep = 0,
  variables = {}
}) => {
  const renderKnapsackTable = () => {
    const dp = variables.dp || [];
    const weights = variables.weights || [];
    const values = variables.values || [];
    const capacity = variables.capacity || 0;
    
    if (!dp.length) return null;
    
    return (
      <div className="overflow-auto">
        <table className="border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr>
              <th className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-800">
                Item/Weight
              </th>
              {Array.from({ length: capacity + 1 }, (_, i) => (
                <th key={i} className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-800 text-xs">
                  {i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dp.map((row: number[], i: number) => (
              <tr key={i}>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-50 dark:bg-gray-900 font-medium">
                  {i === 0 ? '∅' : `${i} (w:${weights[i-1]}, v:${values[i-1]})`}
                </td>
                {row.map((cell: number, j: number) => {
                  const isHighlighted = variables.currentI === i && variables.currentW === j;
                  const isReused = variables.reusedCells && variables.reusedCells.some((c: any) => c.i === i && c.j === j);
                  
                  return (
                    <td
                      key={j}
                      className={`border border-gray-300 dark:border-gray-600 p-2 text-center transition-all duration-300 ${
                        isHighlighted ? 'bg-yellow-300 dark:bg-yellow-700 font-bold' :
                        isReused ? 'bg-green-200 dark:bg-green-800' :
                        cell > 0 ? 'bg-blue-100 dark:bg-blue-900' :
                        'bg-white dark:bg-gray-800'
                      }`}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFibonacciVisualization = () => {
    const memo = variables.memo || {};
    const currentN = variables.currentN || 0;
    
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Fibonacci Memoization Table
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Computing fib({currentN})
          </p>
        </div>
        
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: Math.max(currentN + 1, 10) }, (_, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg border-2 text-center transition-all duration-300 ${
                i === currentN ? 'bg-yellow-200 border-yellow-500 dark:bg-yellow-900/30 dark:border-yellow-400' :
                memo[i] !== undefined ? 'bg-green-200 border-green-500 dark:bg-green-900/30 dark:border-green-400' :
                'bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-600'
              }`}
            >
              <div className="text-xs text-gray-600 dark:text-gray-400">fib({i})</div>
              <div className="font-bold text-lg">
                {memo[i] !== undefined ? memo[i] : '?'}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Algorithm Info */}
      <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">🧠</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {algorithm === 'knapsack' ? '0/1 Knapsack Problem' : 'Dynamic Programming'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Step {currentStep + 1}: {
                algorithm === 'knapsack' ? 'Building optimal solution table' :
                'Using memoization to avoid redundant calculations'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Current Decision */}
      {variables.decision && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-blue-800 dark:text-blue-300 font-medium">
            {variables.decision}
          </p>
        </div>
      )}

      {/* Main Visualization */}
      <div className="flex-1 bg-gradient-to-b from-slate-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 overflow-auto">
        {algorithm === 'knapsack' ? renderKnapsackTable() : renderFibonacciVisualization()}
      </div>
      
      {/* Statistics */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
            {variables.computations || 0}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Computations</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <p className="text-xl font-bold text-green-600 dark:text-green-400">
            {variables.memoHits || 0}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Cache Hits</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {variables.currentValue || 0}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Current Value</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
            {variables.optimalValue || 0}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Optimal Value</p>
        </div>
      </div>
    </div>
  );
};
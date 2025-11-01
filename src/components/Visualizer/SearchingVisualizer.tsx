import React from 'react';

interface SearchingVisualizerProps {
  data: number[];
  highlighted: number[];
  algorithm?: string;
  currentStep?: number;
  variables?: any;
  target?: string;
}

export const SearchingVisualizer: React.FC<SearchingVisualizerProps> = ({ 
  data, 
  highlighted, 
  algorithm = 'linear-search',
  currentStep = 0,
  variables = {},
  target = ''
}) => {
  if (!data || !Array.isArray(data)) return null;

  const maxValue = Math.max(...data);
  const containerHeight = 300;
  const targetValue = target ? parseInt(target) : null;

  const getBarColor = (index: number, value: number) => {
    const isHighlighted = highlighted.includes(index);
    const isTarget = targetValue !== null && value === targetValue;
    const isFound = variables.found && variables.foundIndex === index;
    
    if (isFound) return 'from-green-400 to-green-600 border-green-300 shadow-green-400/50';
    if (isTarget) return 'from-purple-400 to-purple-600 border-purple-300 shadow-purple-400/50';
    if (isHighlighted) return 'from-red-400 to-red-600 border-red-300 shadow-red-400/50';
    return 'from-blue-300 to-blue-500 border-blue-200 shadow-blue-300/30';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Algorithm Info */}
      <div className="mb-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {algorithm === 'linear-search' ? '🔍' : '🎯'}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {algorithm === 'linear-search' ? 'Sequential Search' : 'Binary Search'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Step {currentStep + 1}: {
                algorithm === 'linear-search' ? 'Check each element one by one' :
                'Divide search space in half each time'
              }
              {targetValue !== null && ` (Looking for: ${targetValue})`}
            </p>
          </div>
        </div>
      </div>

      {/* Search Status */}
      {variables && Object.keys(variables).length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Search Status:</h4>
          <div className="flex flex-wrap gap-3 text-xs">
            {Object.entries(variables).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-1">
                <span className="text-gray-500 dark:text-gray-400">{key}:</span>
                <span className="font-mono bg-white dark:bg-gray-700 px-2 py-1 rounded border">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Visualization */}
      <div className="flex-1 flex items-end justify-center space-x-1 p-4 bg-gradient-to-b from-slate-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden">
        {/* Search Range Indicator for Binary Search */}
        {algorithm === 'binary-search' && variables.left !== undefined && variables.right !== undefined && (
          <div className="absolute top-4 left-4 right-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{
                left: `${(variables.left / data.length) * 100}%`,
                width: `${((variables.right - variables.left + 1) / data.length) * 100}%`
              }}
            />
          </div>
        )}

        {data.map((value, index) => {
          const height = (value / maxValue) * containerHeight;
          const barColor = getBarColor(index, value);
          const isHighlighted = highlighted.includes(index);
          const isTarget = targetValue !== null && value === targetValue;
          const isFound = variables.found && variables.foundIndex === index;
          
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-end transition-all duration-500 relative"
              style={{ height: containerHeight }}
            >
              {/* Value label on top */}
              <span className={`text-xs font-bold mb-1 transition-all duration-300 ${
                isFound ? 'text-green-600 scale-125 animate-bounce' :
                isHighlighted ? 'text-red-600 scale-110 animate-pulse' : 
                isTarget ? 'text-purple-600 scale-105' :
                'text-gray-700 dark:text-gray-300'
              }`}>
                {value}
              </span>
              
              {/* Search pointer */}
              {isHighlighted && (
                <div className="mb-1">
                  <div className="animate-bounce text-red-500 text-lg">↓</div>
                </div>
              )}
              
              {/* Found indicator */}
              {isFound && (
                <div className="mb-1">
                  <div className="animate-bounce text-green-500 text-xl">✓</div>
                </div>
              )}
              
              {/* Bar growing from bottom */}
              <div
                className={`w-8 md:w-12 rounded-t-lg transition-all duration-500 shadow-lg border-2 bg-gradient-to-t ${barColor} ${
                  isFound ? 'scale-110 animate-pulse' :
                  isHighlighted ? 'scale-110 animate-pulse' : 
                  isTarget ? 'scale-105' :
                  'hover:scale-105'
                }`}
                style={{ height: `${height}px` }}
              >
                {/* Inner glow effect */}
                <div className="w-full h-full rounded-t-lg bg-gradient-to-t from-white/20 to-transparent"></div>
              </div>
              
              {/* Index label at bottom */}
              <span className={`text-xs mt-1 font-mono transition-colors ${
                isFound ? 'text-green-500 font-bold' :
                isHighlighted ? 'text-red-500 font-bold' : 
                isTarget ? 'text-purple-500 font-bold' :
                'text-gray-500 dark:text-gray-400'
              }`}>
                {index}
              </span>
              
              {/* Target indicator */}
              {isTarget && !isFound && (
                <div className="mt-1">
                  <div className="text-purple-500 text-xs font-bold">TARGET</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex justify-center space-x-6 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gradient-to-t from-red-400 to-red-600 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Currently Checking</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gradient-to-t from-purple-400 to-purple-600 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Target Value</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gradient-to-t from-green-400 to-green-600 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Found</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gradient-to-t from-blue-300 to-blue-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Not Checked</span>
        </div>
      </div>
    </div>
  );
};
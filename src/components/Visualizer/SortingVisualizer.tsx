import React from 'react';

interface SortingVisualizerProps {
  data: number[];
  highlighted: number[];
  algorithm?: string;
  currentStep?: number;
  variables?: any;
}

export const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ 
  data, 
  highlighted, 
  algorithm = 'bubble-sort',
  currentStep = 0,
  variables = {}
}) => {
  if (!data || !Array.isArray(data)) return null;

  const maxValue = Math.max(...data);
  const containerHeight = 350;

  // Enhanced color scheme based on algorithm metaphors
  const getBarColor = (index: number, value: number) => {
    const isHighlighted = highlighted.includes(index);
    const isComparing = highlighted.length === 2 && highlighted.includes(index);
    const isSorted = index < data.length && data.slice(0, index + 1).every((val, i) => i === 0 || val >= data[i - 1]);
    
    if (algorithm === 'bubble-sort') {
      // Bubble metaphor: bubbles rising through water
      if (isHighlighted) return 'from-blue-400 to-blue-600 border-blue-300 shadow-blue-400/50';
      if (isSorted) return 'from-emerald-400 to-emerald-600 border-emerald-300 shadow-emerald-400/50';
      return 'from-cyan-300 to-cyan-500 border-cyan-200 shadow-cyan-300/30';
    } else if (algorithm === 'quick-sort') {
      // Library organization metaphor
      if (isHighlighted) return 'from-amber-400 to-amber-600 border-amber-300 shadow-amber-400/50';
      if (variables.pivot === value) return 'from-red-500 to-red-700 border-red-400 shadow-red-500/50';
      if (isSorted) return 'from-green-400 to-green-600 border-green-300 shadow-green-400/50';
      return 'from-orange-300 to-orange-500 border-orange-200 shadow-orange-300/30';
    } else if (algorithm === 'merge-sort') {
      // Bread slicing metaphor
      if (isHighlighted) return 'from-purple-400 to-purple-600 border-purple-300 shadow-purple-400/50';
      if (isSorted) return 'from-indigo-400 to-indigo-600 border-indigo-300 shadow-indigo-400/50';
      return 'from-violet-300 to-violet-500 border-violet-200 shadow-violet-300/30';
    } else if (algorithm === 'heap-sort') {
      // Log stacking metaphor
      if (isHighlighted) return 'from-yellow-400 to-yellow-600 border-yellow-300 shadow-yellow-400/50';
      if (isSorted) return 'from-teal-400 to-teal-600 border-teal-300 shadow-teal-400/50';
      return 'from-amber-300 to-amber-500 border-amber-200 shadow-amber-300/30';
    }
    
    // Default colors
    if (isHighlighted) return 'from-red-400 to-red-600 border-red-300 shadow-red-400/50';
    if (isSorted) return 'from-green-400 to-green-600 border-green-300 shadow-green-400/50';
    return 'from-blue-300 to-blue-500 border-blue-200 shadow-blue-300/30';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Algorithm Metaphor Header */}
      <div className="mb-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {algorithm === 'bubble-sort' ? '🫧' : 
               algorithm === 'quick-sort' ? '📚' :
               algorithm === 'merge-sort' ? '🍞' :
               algorithm === 'heap-sort' ? '🪵' : '⚡'}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {algorithm === 'bubble-sort' ? 'Bubbles Rising Through Water' :
               algorithm === 'quick-sort' ? 'Organizing Library Books' :
               algorithm === 'merge-sort' ? 'Slicing and Reassembling Bread' :
               algorithm === 'heap-sort' ? 'Stacking Logs by Weight' : 'Algorithm Visualization'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Step {currentStep + 1}: {
                algorithm === 'bubble-sort' ? 'Watch larger bubbles rise to the surface' :
                algorithm === 'quick-sort' ? 'Arrange books around the reference (pivot)' :
                algorithm === 'merge-sort' ? 'Merge sorted slices back together' :
                algorithm === 'heap-sort' ? 'Extract the heaviest log from the pile' : 'Processing elements'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Variables Display */}
      {Object.keys(variables).length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Current State:</h4>
          <div className="flex flex-wrap gap-3 text-xs">
            {Object.entries(variables).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-1">
                <span className="text-gray-500 dark:text-gray-400">{key}:</span>
                <span className="font-mono bg-white dark:bg-gray-700 px-2 py-1 rounded border">
                  {Array.isArray(value) ? `[${value.join(', ')}]` : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Visualization */}
      <div className="flex-1 flex items-end justify-center space-x-1 p-4 bg-gradient-to-b from-slate-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden">
        {/* Background pattern for metaphor */}
        <div className="absolute inset-0 opacity-5">
          {algorithm === 'bubble-sort' && (
            <div className="absolute inset-0 bg-gradient-to-t from-blue-200 to-transparent"></div>
          )}
          {algorithm === 'quick-sort' && (
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-orange-100"></div>
          )}
          {algorithm === 'merge-sort' && (
            <div className="absolute inset-0 bg-gradient-to-b from-purple-100 to-indigo-100"></div>
          )}
          {algorithm === 'heap-sort' && (
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-100 to-amber-100"></div>
          )}
        </div>

      {data.map((value, index) => {
        const height = (value / maxValue) * containerHeight;
        const barColor = getBarColor(index, value);
        const isHighlighted = highlighted.includes(index);
        
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-end transition-all duration-500 relative"
            style={{ height: containerHeight }}
          >
            {/* Value label on top */}
            <span className={`text-xs font-bold mb-1 transition-all duration-300 ${
              isHighlighted ? 'text-red-600 scale-110 animate-pulse' : 
              'text-gray-700 dark:text-gray-300'
            }`}>
              {value}
            </span>
            
            {/* Comparison arrows */}
            {isHighlighted && highlighted.length === 2 && (
              <div className="mb-1">
                <div className="animate-bounce text-red-500">↓</div>
              </div>
            )}
            
            {/* Bar growing from bottom */}
            <div
              className={`w-8 md:w-12 rounded-t-lg transition-all duration-500 shadow-lg border-2 bg-gradient-to-t ${barColor} ${
                isHighlighted ? 'scale-110 animate-pulse' : 'hover:scale-105'
              }`}
              style={{ height: `${height}px` }}
            >
              {/* Inner glow effect */}
              <div className="w-full h-full rounded-t-lg bg-gradient-to-t from-white/20 to-transparent"></div>
            </div>
            
            {/* Index label at bottom */}
            <span className={`text-xs mt-1 font-mono transition-colors ${
              isHighlighted ? 'text-red-500 font-bold' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {index}
            </span>
          </div>
        );
      })}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex justify-center space-x-6 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gradient-to-t from-red-400 to-red-600 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Comparing</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gradient-to-t from-green-400 to-green-600 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Sorted</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gradient-to-t from-blue-300 to-blue-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Unsorted</span>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { VisualizationStep, Algorithm } from '../../types';

interface StepTrackerProps {
  step: VisualizationStep;
  algorithm: Algorithm;
}

export const StepTracker: React.FC<StepTrackerProps> = ({ step, algorithm }) => {
  if (!step) return null;

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Algorithm Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {algorithm.name}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Time:</span>
              <span className="font-mono text-gray-900 dark:text-white">{algorithm.timeComplexity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Space:</span>
              <span className="font-mono text-gray-900 dark:text-white">{algorithm.spaceComplexity}</span>
            </div>
          </div>
        </div>

        {/* Current Step */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            Step {step.step + 1}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {step.description}
          </p>
          
          {/* Code Highlight */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 mb-3">
            <pre className="text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              {step.code}
            </pre>
          </div>
        </div>

        {/* Variables */}
        {step.variables && Object.keys(step.variables).length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Variables
            </h4>
            <div className="space-y-2">
              {Object.entries(step.variables).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-1">
                  <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                    {key}:
                  </span>
                  <span className="text-sm font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {Array.isArray(value) ? `[${value.join(', ')}]` : JSON.stringify(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pseudocode */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            Pseudocode
          </h4>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-xs font-mono space-y-1">
            {getPseudocode(algorithm.id).map((line, index) => (
              <div
                key={index}
                className={`p-1 rounded ${
                  step.step === index 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function getPseudocode(algorithmId: string): string[] {
  const pseudocodes: { [key: string]: string[] } = {
    'bubble-sort': [
      'for i = 0 to n-1:',
      '  for j = 0 to n-i-2:',
      '    if arr[j] > arr[j+1]:',
      '      swap(arr[j], arr[j+1])',
      'return arr',
    ],
    'quick-sort': [
      'if low < high:',
      '  pivot = partition(arr, low, high)',
      '  quickSort(arr, low, pivot-1)',
      '  quickSort(arr, pivot+1, high)',
    ],
    'linear-search': [
      'for i = 0 to n-1:',
      '  if arr[i] == target:',
      '    return i',
      'return -1',
    ],
    'binary-search': [
      'left = 0, right = n-1',
      'while left <= right:',
      '  mid = (left + right) / 2',
      '  if arr[mid] == target: return mid',
      '  if arr[mid] < target: left = mid + 1',
      '  else: right = mid - 1',
      'return -1',
    ],
    'bfs': [
      'queue = [start]',
      'visited = set()',
      'while queue:',
      '  current = queue.pop(0)',
      '  if current not in visited:',
      '    visited.add(current)',
      '    queue.extend(neighbors)',
    ],
  };

  return pseudocodes[algorithmId] || ['Algorithm pseudocode not available'];
}
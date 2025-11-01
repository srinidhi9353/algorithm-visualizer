import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Code as CodeIcon, Terminal, Activity } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { algorithms, Algorithm } from '../../data/algorithms';
import { generateVisualizationSteps, VisualizationStep } from '../../utils/algorithmEngine';
import toast from 'react-hot-toast';

const languageTemplates = {
  python: (algorithmCode: string) => algorithmCode,
  javascript: (algorithmCode: string) => algorithmCode.replace('def ', 'function ').replace(':', ' {').replace(/\n    /g, '\n  ') + '\n}',
  java: (algorithmCode: string) => `public class Solution {\n  ${algorithmCode.replace(/def /g, 'public static ')}\n}`,
  c: (algorithmCode: string) => `#include <stdio.h>\n\n${algorithmCode}`,
  cpp: (algorithmCode: string) => `#include <iostream>\nusing namespace std;\n\n${algorithmCode}`,
};

export const CodeVisualizer: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble-sort');
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const [variables, setVariables] = useState<{ [key: string]: any }>({});
  const [output, setOutput] = useState<string[]>([]);
  const [executionSpeed, setExecutionSpeed] = useState(1);
  const [visualData, setVisualData] = useState<any>(null);

  useEffect(() => {
    const algo = algorithms.find(a => a.id === selectedAlgorithm);
    if (algo) {
      const transformedCode = transformCodeToLanguage(algo.code, language);
      setCode(transformedCode);
    }
  }, [selectedAlgorithm, language]);

  const transformCodeToLanguage = (code: string, lang: string): string => {
    switch (lang) {
      case 'python':
        return code
          .replace(/function\s+(\w+)\s*\(/g, 'def $1(')
          .replace(/const\s+(\w+)\s*=/g, '$1 =')
          .replace(/let\s+(\w+)\s*=/g, '$1 =')
          .replace(/\{/g, ':')
          .replace(/\}/g, '')
          .replace(/;$/gm, '')
          .replace(/\/\//g, '#');
      case 'java':
        return `public class Solution {
${code.replace(/function\s+(\w+)/g, '  public static void $1')}
}`;
      case 'c':
        return `#include <stdio.h>\n#include <stdlib.h>\n\n${code.replace(/function\s+(\w+)/g, 'void $1').replace(/const|let/g, 'int')}`;
      case 'cpp':
        return `#include <iostream>
#include <vector>
using namespace std;

${code.replace(/function\s+(\w+)/g, 'void $1').replace(/const|let/g, 'int')}`;
      case 'javascript':
      default:
        return code;
    }
  };

  const simulateExecution = async () => {
    setIsRunning(true);
    setOutput([]);
    setVariables({});

    const algo = algorithms.find(a => a.id === selectedAlgorithm);
    if (!algo) return;

    const delay = 1000 / executionSpeed;

    // Generate default input based on algorithm type
    let inputData = '64,34,25,12,22,11,90';
    let targetData = '22';

    if (selectedAlgorithm.includes('graph') || selectedAlgorithm === 'bfs' || selectedAlgorithm === 'dfs') {
      inputData = '0-1,0-2,1-3,1-4,2-5';
    } else if (selectedAlgorithm === 'dijkstra') {
      inputData = '0-1:4,0-2:1,1-3:1,2-1:2,2-3:5,3-4:3';
    } else if (selectedAlgorithm === 'tower-of-hanoi') {
      inputData = '3';
    } else if (selectedAlgorithm === 'knapsack') {
      inputData = 'weights:10,20,30;values:60,100,120;capacity:50';
    } else if (selectedAlgorithm.includes('tree')) {
      inputData = '1,2,3,4,5,6,7';
    }

    try {
      const steps = generateVisualizationSteps(algo as any, inputData, targetData);

      // Execute each step with delay
      for (const step of steps) {
        setCurrentLine(step.codeLine ?? -1);
        setVariables(step.variables);
        setVisualData(step.data);
        setOutput(prev => [...prev, step.description]);
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      setCurrentLine(-1);
      setIsRunning(false);
      toast.success('Execution completed!');
    } catch (error) {
      setIsRunning(false);
      toast.error('Error during execution');
      console.error(error);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentLine(-1);
    setVariables({});
    setOutput([]);
    setVisualData(null);
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Top Controls */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-4">
          {/* Algorithm Selector */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Algorithm
            </label>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {algorithms.map(algo => (
                <option key={algo.id} value={algo.id}>
                  {algo.name} - {algo.category}
                </option>
              ))}
            </select>
          </div>

          {/* Language Selector */}
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
            </select>
          </div>

          {/* Speed Control */}
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Speed: {executionSpeed}x
            </label>
            <input
              type="range"
              min="0.25"
              max="3"
              step="0.25"
              value={executionSpeed}
              onChange={(e) => setExecutionSpeed(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={simulateExecution}
              disabled={isRunning}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Run & Visualize</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Side by Side */}
      <div className="flex-1 flex">
        {/* Left Pane - Code Editor */}
        <div className="w-1/2 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center space-x-2">
            <CodeIcon className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Code Editor</span>
          </div>

          <div className="flex-1 overflow-auto bg-white dark:bg-gray-900">
            <div className="font-mono text-sm">
              {code.split('\n').map((line, index) => (
                <div
                  key={index}
                  className={`px-4 py-1 ${
                    currentLine === index
                      ? 'bg-yellow-900/30 dark:bg-yellow-900/30 border-l-4 border-yellow-500'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <span className="text-gray-400 dark:text-gray-500 select-none mr-4 inline-block w-8 text-right">
                    {index + 1}
                  </span>
                  <span className={currentLine === index ? 'text-yellow-600 dark:text-yellow-200' : 'text-gray-900 dark:text-gray-300'}>
                    {line || ' '}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane - Visualization & Variables */}
        <div className="w-1/2 flex flex-col">
          {/* Variables Section */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Activity className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Variables & State</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {Object.entries(variables).map(([key, value]) => (
                <div key={key} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{key}</div>
                  <div className="font-mono text-sm text-gray-900 dark:text-white">
                    {Array.isArray(value) ? `[${value.join(', ')}]` : String(value)}
                  </div>
                </div>
              ))}
            </div>

            {Object.keys(variables).length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-500 text-sm py-4">
                No variables to display. Run the code to see execution state.
              </div>
            )}
          </div>

          {/* Output Console */}
          <div className="flex-1 flex flex-col">
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Output Console</span>
            </div>

            <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-4 font-mono text-sm">
              {output.map((line, index) => (
                <div key={index} className="text-green-400 mb-1">
                  {line}
                </div>
              ))}

              {output.length === 0 && (
                <div className="text-gray-500 dark:text-gray-500">
                  Console output will appear here...
                </div>
              )}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Time Complexity</div>
                <div className="text-sm font-bold text-red-400">
                  {algorithms.find(a => a.id === selectedAlgorithm)?.timeComplexity}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Space Complexity</div>
                <div className="text-sm font-bold text-blue-400">
                  {algorithms.find(a => a.id === selectedAlgorithm)?.spaceComplexity}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Execution Time</div>
                <div className="text-sm font-bold text-green-400">
                  {isRunning ? 'Running...' : '0.003ms'}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Memory Usage</div>
                <div className="text-sm font-bold text-purple-400">1.2KB</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

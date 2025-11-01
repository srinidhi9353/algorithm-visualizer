import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, SkipForward, SkipBack, Settings, Code, Eye, ArrowLeft, Shuffle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { SortingVisualizer } from './SortingVisualizer';
import { SearchingVisualizer } from './SearchingVisualizer';
import { GraphVisualizer } from './GraphVisualizer';
import { TreeVisualizer } from './TreeVisualizer';
import { RecursionVisualizer } from './RecursionVisualizer';
import { DPVisualizer } from './DPVisualizer';
import { generateVisualizationSteps } from '../../utils/algorithmEngine';
import toast from 'react-hot-toast';

export default function AlgorithmVisualizer() {
  const { selectedAlgorithm: algorithm, setCurrentView, updateUserProgress } = useStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showCode, setShowCode] = useState(true);
  const [customInput, setCustomInput] = useState('');
  const [steps, setSteps] = useState<any[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [target, setTarget] = useState('');
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);

  // Initialize algorithm with default or custom input
  const initializeAlgorithm = useCallback(() => {
    if (!algorithm) return;
    
    const input = customInput.trim() || algorithm.defaultInput;
    setCustomInput(input);
    
    try {
      const generatedSteps = generateVisualizationSteps(algorithm, input, target);
      setSteps(generatedSteps);
      setCurrentStep(0);
      setIsPlaying(false);
      setIsInitialized(true);
      toast.success(`${algorithm.name} initialized with input: ${input}`);
    } catch (error) {
      toast.error('Invalid input format. Please check your input.');
      console.error('Algorithm initialization error:', error);
    }
  }, [algorithm, customInput, target]);

  // Initialize on algorithm change
  useEffect(() => {
    if (algorithm) {
      setCustomInput(algorithm.defaultInput);
      setTarget('');
      setHasCompletedOnce(false);
      initializeAlgorithm();
    }
  }, [algorithm]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || !steps.length) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          toast.success('Algorithm execution completed!');
          
          // Track algorithm completion
          if (algorithm && !hasCompletedOnce) {
            updateUserProgress(algorithm.id);
            setHasCompletedOnce(true);
            toast.success(`Great! You've completed ${algorithm.name}`, {
              icon: '🎉',
              duration: 3000,
            });
          }
          
          return prev;
        }
        return prev + 1;
      });
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed, steps.length, algorithm, hasCompletedOnce, updateUserProgress]);

  const handlePlay = () => {
    if (!steps.length) {
      toast.error('Please initialize the algorithm first');
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    toast.info('Algorithm reset to beginning');
  };

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRandomizeInput = () => {
    if (!algorithm) return;
    
    let randomInput = '';
    switch (algorithm.inputType) {
      case 'array':
        const randomArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 1);
        randomInput = randomArray.join(',');
        break;
      case 'graph':
        // Different random graphs for different algorithms
        if (algorithm.id === 'dijkstra') {
          // Weighted graph
          randomInput = '0-1:4,0-2:2,1-3:5,1-2:1,2-3:8,2-4:10,3-4:2,3-5:6,4-5:3';
        } else {
          // Unweighted graph
          randomInput = '0-1,0-2,1-3,1-4,2-5,3-5,4-5';
        }
        break;
      case 'string':
        randomInput = 'hello';
        break;
      case 'number':
        randomInput = String(Math.floor(Math.random() * 10) + 3);
        break;
      default:
        randomInput = algorithm.defaultInput;
    }
    
    setCustomInput(randomInput);
    toast.info('Input randomized');
  };

  const renderVisualizer = () => {
    if (!algorithm || !steps.length || !isInitialized) {
      return (
        <div className="h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              {algorithm ? 'Click "Initialize" to start visualization' : 'Select an algorithm to visualize'}
            </p>
          </div>
        </div>
      );
    }

    const currentStepData = steps[currentStep];
    const commonProps = {
      data: currentStepData?.data || [],
      highlighted: currentStepData?.highlighted || [],
      algorithm: algorithm.id,
      currentStep,
      variables: currentStepData?.variables || {},
    };

    switch (algorithm.visualizationType) {
      case 'sorting':
        return <SortingVisualizer {...commonProps} />;
      case 'searching':
        return <SearchingVisualizer {...commonProps} target={target} />;
      case 'graph':
        return <GraphVisualizer {...commonProps} />;
      case 'tree':
        return <TreeVisualizer {...commonProps} />;
      case 'recursion':
        return <RecursionVisualizer {...commonProps} />;
      case 'dp':
        return <DPVisualizer {...commonProps} />;
      default:
        return <SortingVisualizer {...commonProps} />;
    }
  };

  if (!algorithm) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        <p>Select an algorithm to visualize</p>
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('algorithms')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Algorithms</span>
            </button>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {algorithm.name}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {algorithm.category} • {algorithm.difficulty}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              algorithm.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
              algorithm.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
              'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {algorithm.difficulty}
            </span>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Pane - Visualization (60% width) - Allow natural height with scroll */}
        <div className="w-[60%] flex flex-col">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePlay}
                  disabled={!isInitialized}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                
                <button
                  onClick={handleStepBackward}
                  disabled={currentStep === 0}
                  className="p-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:disabled:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                
                <button
                  onClick={handleStepForward}
                  disabled={currentStep >= steps.length - 1}
                  className="p-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:disabled:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
                
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>

                <div className="flex items-center space-x-2 ml-4">
                  <Settings className="w-4 h-4 text-gray-500" />
                  <input
                    type="range"
                    min="0.25"
                    max="3"
                    step="0.25"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400 min-w-8">{speed}x</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Input Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Input ({algorithm.inputType}):
                </label>
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder={algorithm.defaultInput}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              {(algorithm.visualizationType === 'searching' || algorithm.id === 'bst-search') && (
                <div className="w-32">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Target:
                  </label>
                  <input
                    type="text"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="25"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              )}
              
              <button
                onClick={handleRandomizeInput}
                className="flex items-center space-x-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Shuffle className="w-4 h-4" />
                <span>Random</span>
              </button>
              
              <button
                onClick={initializeAlgorithm}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
              >
                Initialize
              </button>
            </div>
          </div>

          {/* Visualization Area - Natural height, scrollable */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              {renderVisualizer()}
            </div>
          </div>
        </div>

        {/* Right Pane - Code & Info (40% width) - Scrollable to match left */}
        <div className="w-[40%] bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col overflow-y-auto">
          {/* Code Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex-shrink-0 sticky top-0 bg-white dark:bg-gray-800 z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Code Execution
              </h3>
              <button
                onClick={() => setShowCode(!showCode)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  showCode 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {showCode ? <Eye className="w-4 h-4" /> : <Code className="w-4 h-4" />}
                <span>{showCode ? 'Hide' : 'Show'}</span>
              </button>
            </div>
          </div>

          {/* Current Step Info */}
          {currentStepData && (
            <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-blue-50 dark:bg-blue-900/10 flex-shrink-0">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Current Step
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {currentStepData.description}
              </p>
            </div>
          )}

          {/* Code Display */}
          {showCode && (
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto p-4">
                <pre className="text-sm font-mono leading-relaxed">
                  <code className="text-gray-800 dark:text-gray-200">
                    {algorithm.code.split('\n').map((line, index) => (
                      <div
                        key={index}
                        className={`px-2 py-1 rounded ${
                          currentStepData?.codeLine === index
                            ? 'bg-yellow-200 dark:bg-yellow-900/30 border-l-4 border-yellow-500'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        }`}
                      >
                        <span className="text-gray-400 mr-4 select-none">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {line}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          )}

          {/* Variables & State */}
          {currentStepData?.variables && Object.keys(currentStepData.variables).length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Variables
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {Object.entries(currentStepData.variables).map(([key, value]) => {
                  let displayValue;
                  if (Array.isArray(value)) {
                    displayValue = `[${value.join(', ')}]`;
                  } else if (typeof value === 'object' && value !== null) {
                    // Format objects as JSON for better readability
                    displayValue = JSON.stringify(value);
                  } else {
                    displayValue = String(value);
                  }
                  
                  return (
                    <div key={key} className="flex justify-between items-center py-1">
                      <span className="text-sm font-mono text-purple-600 dark:text-purple-400">
                        {key}:
                      </span>
                      <span className="text-sm font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded max-w-xs truncate" title={displayValue}>
                        {displayValue}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Complexity Analysis */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Complexity Analysis
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Time Complexity</p>
                <p className="font-mono text-lg font-bold text-red-600 dark:text-red-400">
                  {algorithm.timeComplexity}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Space Complexity</p>
                <p className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">
                  {algorithm.spaceComplexity}
                </p>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Description:</strong> {algorithm.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
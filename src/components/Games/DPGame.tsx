import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Clock, Package, DollarSign, Award } from 'lucide-react';
import toast from 'react-hot-toast';

interface DPGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface Item {
  id: number;
  name: string;
  weight: number;
  value: number;
}

interface GameResult {
  score: number;
  optimalValue: number;
  userValue: number;
  timeBonus: number;
  accuracy: number;
}

export const DPGame: React.FC<DPGameProps> = ({ onComplete, onBack }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [capacity] = useState(50);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsPlaying(false);
          checkSolution();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const initializeGame = () => {
    // Generate random items for knapsack problem
    const itemNames = ['💎 Diamond', '⚔️ Sword', '🛡️ Shield', '📖 Book', '⚗️ Potion', '🔮 Crystal', '👑 Crown', '🎁 Treasure'];
    const generatedItems: Item[] = itemNames.map((name, i) => ({
      id: i,
      name,
      weight: Math.floor(Math.random() * 15) + 5,
      value: Math.floor(Math.random() * 40) + 10,
    }));

    setItems(generatedItems);
    setSelectedItems([]);
    setTimeLeft(90);
    setIsPlaying(true);
    setGameResult(null);
  };

  // Calculate optimal solution using dynamic programming
  const calculateOptimalSolution = (): { maxValue: number; items: number[] } => {
    const n = items.length;
    const dp: number[][] = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

    // Build DP table
    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        if (items[i - 1].weight <= w) {
          dp[i][w] = Math.max(
            dp[i - 1][w],
            dp[i - 1][w - items[i - 1].weight] + items[i - 1].value
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    // Backtrack to find selected items
    const selectedOptimal: number[] = [];
    let w = capacity;
    for (let i = n; i > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        selectedOptimal.push(i - 1);
        w -= items[i - 1].weight;
      }
    }

    return { maxValue: dp[n][capacity], items: selectedOptimal };
  };

  const handleItemClick = (itemId: number) => {
    if (!isPlaying) return;

    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        const newSelection = [...prev, itemId];
        const totalWeight = newSelection.reduce((sum, id) => 
          sum + items.find(item => item.id === id)!.weight, 0
        );
        
        if (totalWeight > capacity) {
          toast.error('Capacity exceeded!');
          return prev;
        }
        return newSelection;
      }
    });
  };

  const checkSolution = () => {
    const optimal = calculateOptimalSolution();
    const userValue = selectedItems.reduce((sum, id) => 
      sum + items.find(item => item.id === id)!.value, 0
    );

    const accuracy = optimal.maxValue > 0 ? Math.floor((userValue / optimal.maxValue) * 100) : 0;
    const timeBonus = Math.floor((timeLeft / 90) * 30);
    const accuracyPoints = Math.floor(accuracy * 0.6);
    const score = Math.min(100, accuracyPoints + timeBonus + 10);

    const result: GameResult = {
      score,
      optimalValue: optimal.maxValue,
      userValue,
      timeBonus,
      accuracy,
    };

    setGameResult(result);
    setIsPlaying(false);
  };

  const submitSolution = () => {
    if (!isPlaying) return;
    setIsPlaying(false);
    checkSolution();
  };

  const getCurrentWeight = () => {
    return selectedItems.reduce((sum, id) => 
      sum + items.find(item => item.id === id)!.weight, 0
    );
  };

  const getCurrentValue = () => {
    return selectedItems.reduce((sum, id) => 
      sum + items.find(item => item.id === id)!.value, 0
    );
  };

  // Result Modal
  if (gameResult) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Result Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-center">
              <Trophy className="w-20 h-20 text-yellow-300 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Challenge Complete!</h2>
              <p className="text-purple-100">Dynamic Programming Knapsack Puzzle</p>
            </div>

            {/* Score Display */}
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-8 py-4">
                  <p className="text-sm text-gray-900 font-medium mb-1">Your Score</p>
                  <p className="text-5xl font-bold text-gray-900">{gameResult.score}%</p>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Optimal Value:</span>
                    <span className="text-2xl font-bold text-green-400">${gameResult.optimalValue}</span>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Your Value:</span>
                    <span className="text-2xl font-bold text-blue-400">${gameResult.userValue}</span>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Accuracy:</span>
                    <span className="text-2xl font-bold text-purple-400">{gameResult.accuracy}%</span>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Time Bonus:</span>
                    <span className="text-2xl font-bold text-yellow-400">+{gameResult.timeBonus}</span>
                  </div>
                </div>
              </div>

              {/* Performance Message */}
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-center text-gray-900 dark:text-gray-200">
                  {gameResult.accuracy >= 90 && "🎉 Outstanding! Near-optimal solution!"}
                  {gameResult.accuracy >= 70 && gameResult.accuracy < 90 && "🌟 Great job! Very close to optimal!"}
                  {gameResult.accuracy >= 50 && gameResult.accuracy < 70 && "👍 Good effort! Keep practicing DP!"}
                  {gameResult.accuracy < 50 && "💪 Keep learning! DP takes practice!"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    onComplete(gameResult.score);
                    onBack();
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Continue
                </button>
                <button
                  onClick={initializeGame}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Play Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Games</span>
          </button>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dynamic Programming Puzzle</h1>

          <div className="w-32" />
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Time Left</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{timeLeft}s</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Capacity</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{getCurrentWeight()}/{capacity}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Total Value</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">${getCurrentValue()}</p>
              </div>
            </div>
          </div>

          <button
            onClick={submitSolution}
            disabled={!isPlaying || selectedItems.length === 0}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg font-medium transition-colors"
          >
            Submit
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-gray-900 dark:text-white font-semibold mb-2 flex items-center">
            <Award className="w-5 h-5 mr-2 text-purple-400" />
            0/1 Knapsack Challenge:
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Select items to maximize value while staying within the weight capacity of {capacity} units. 
            This is a classic Dynamic Programming problem - choose wisely!
          </p>
        </div>

        {/* Game Board */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Available Items:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                disabled={!isPlaying}
                className={`p-4 rounded-lg border-2 transition-all transform hover:scale-105 ${
                  selectedItems.includes(item.id)
                    ? 'bg-purple-600 border-purple-400 scale-105 shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-purple-400'
                } ${!isPlaying ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="text-3xl mb-2">{item.name.split(' ')[0]}</div>
                <div className="text-gray-900 dark:text-white font-medium text-sm mb-1">
                  {item.name.split(' ')[1]}
                </div>
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
                  <span>⚖️ {item.weight}</span>
                  <span>💰 ${item.value}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Items */}
        {selectedItems.length > 0 && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-3">Selected Items:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedItems.map(id => {
                const item = items.find(i => i.id === id)!;
                return (
                  <div
                    key={id}
                    className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  >
                    {item.name} (W:{item.weight}, V:${item.value})
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Reset Button */}
        <div className="mt-6 text-center">
          <button
            onClick={initializeGame}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
};

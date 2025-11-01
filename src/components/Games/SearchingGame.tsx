import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Clock, Target } from 'lucide-react';
import toast from 'react-hot-toast';

interface SearchingGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const SearchingGame: React.FC<SearchingGameProps> = ({ onComplete, onBack }) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [target, setTarget] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [comparisons, setComparisons] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isPlaying, setIsPlaying] = useState(false);
  const [checkedIndices, setCheckedIndices] = useState<number[]>([]);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsPlaying(false);
          toast.error('Time is up!');
          onComplete(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const initializeGame = () => {
    const sortedArr = Array.from({ length: 15 }, (_, i) => (i + 1) * 5 + Math.floor(Math.random() * 3));
    const targetIndex = Math.floor(Math.random() * sortedArr.length);
    const targetValue = sortedArr[targetIndex];

    setNumbers(sortedArr);
    setTarget(targetValue);
    setSelectedIndex(null);
    setComparisons(0);
    setCheckedIndices([]);
    setTimeLeft(45);
    setIsPlaying(true);
  };

  const handleNumberClick = (index: number) => {
    if (!isPlaying || checkedIndices.includes(index)) return;

    setSelectedIndex(index);
    setComparisons(prev => prev + 1);
    setCheckedIndices(prev => [...prev, index]);

    setTimeout(() => {
      if (numbers[index] === target) {
        setIsPlaying(false);
        calculateScore(true);
      } else {
        toast.error(`${numbers[index]} is not the target!`, { duration: 1000 });
        setSelectedIndex(null);
      }
    }, 500);
  };

  const calculateScore = (completed: boolean) => {
    if (!completed) {
      onComplete(0);
      return;
    }

    const optimalMoves = Math.ceil(Math.log2(numbers.length));
    const timeBonus = Math.floor((timeLeft / 45) * 30);
    const comparisonScore = Math.max(0, 50 - (comparisons - optimalMoves) * 5);
    const score = Math.max(30, Math.min(100, timeBonus + comparisonScore + 20));

    toast.success(`Found it! Score: ${score}% (${comparisons} comparisons, optimal: ${optimalMoves})`);
    onComplete(score);
  };

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

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Binary Search Hunt</h1>

          <div className="w-32" />
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-red-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Target Number</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{target}</p>
              </div>
            </div>
          </div>

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
              <Trophy className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Comparisons</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{comparisons}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-gray-900 dark:text-white font-semibold mb-2">How to Play:</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Find the target number using binary search strategy! The array is sorted. Use minimum comparisons to achieve a higher score.
            Optimal comparisons: {Math.ceil(Math.log2(numbers.length))}
          </p>
        </div>

        {/* Game Board */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 gap-3">
            {numbers.map((num, index) => (
              <button
                key={index}
                onClick={() => handleNumberClick(index)}
                disabled={!isPlaying || checkedIndices.includes(index)}
                className={`aspect-square rounded-lg flex items-center justify-center text-lg font-bold transition-all transform hover:scale-105 ${
                  selectedIndex === index && numbers[index] === target
                    ? 'bg-green-500 text-white scale-110 shadow-lg'
                    : checkedIndices.includes(index)
                    ? 'bg-red-900 text-red-300 opacity-50'
                    : selectedIndex === index
                    ? 'bg-yellow-500 text-gray-900 scale-110'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } ${!isPlaying ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-6 text-center">
          <button
            onClick={initializeGame}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            New Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Clock, Lightbulb } from 'lucide-react';
import toast from 'react-hot-toast';

interface SortingGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const SortingGame: React.FC<SortingGameProps> = ({ onComplete, onBack }) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

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
          calculateScore(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const initializeGame = () => {
    const arr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
    setNumbers(arr);
    setSelectedIndices([]);
    setMoves(0);
    setTimeLeft(60);
    setHintsUsed(0);
    setIsPlaying(true);
  };

  const handleNumberClick = (index: number) => {
    if (!isPlaying) return;

    if (selectedIndices.length === 0) {
      setSelectedIndices([index]);
    } else if (selectedIndices.length === 1) {
      if (selectedIndices[0] === index) {
        setSelectedIndices([]);
        return;
      }

      const newNumbers = [...numbers];
      const temp = newNumbers[selectedIndices[0]];
      newNumbers[selectedIndices[0]] = newNumbers[index];
      newNumbers[index] = temp;

      setNumbers(newNumbers);
      setSelectedIndices([]);
      setMoves(prev => prev + 1);

      if (isSorted(newNumbers)) {
        setIsPlaying(false);
        calculateScore(true);
      }
    }
  };

  const isSorted = (arr: number[]): boolean => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) return false;
    }
    return true;
  };

  const calculateScore = (completed: boolean) => {
    if (!completed) {
      onComplete(0);
      return;
    }

    const timeBonus = Math.floor((timeLeft / 60) * 40);
    const movesPenalty = Math.max(0, 40 - moves * 2);
    const hintPenalty = hintsUsed * 10;
    const score = Math.max(20, Math.min(100, timeBonus + movesPenalty - hintPenalty + 20));

    toast.success(`Congratulations! You scored ${score}%`);
    onComplete(score);
  };

  const useHint = () => {
    if (!isPlaying || hintsUsed >= 3) return;

    for (let i = 0; i < numbers.length - 1; i++) {
      if (numbers[i] > numbers[i + 1]) {
        setSelectedIndices([i]);
        setHintsUsed(prev => prev + 1);
        toast.success(`Hint: Check position ${i + 1}`);
        return;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Games</span>
          </button>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sorting Speed Challenge</h1>

          <div className="w-32" />
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Time</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{timeLeft}s</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Moves</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{moves}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Hints Left</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{3 - hintsUsed}</p>
              </div>
            </div>
          </div>

          <button
            onClick={useHint}
            disabled={hintsUsed >= 3 || !isPlaying}
            className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg font-medium transition-colors"
          >
            Use Hint
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-gray-900 dark:text-white font-semibold mb-2">How to Play:</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Click two numbers to swap them. Sort the array in ascending order as quickly as possible with minimum moves!
          </p>
        </div>

        {/* Game Board */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-8 gap-4">
            {numbers.map((num, index) => (
              <button
                key={index}
                onClick={() => handleNumberClick(index)}
                disabled={!isPlaying}
                className={`aspect-square rounded-lg flex items-center justify-center text-2xl font-bold transition-all transform hover:scale-105 ${
                  selectedIndices.includes(index)
                    ? 'bg-yellow-500 text-gray-900 scale-110 shadow-lg'
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
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

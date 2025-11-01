import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Clock, Navigation } from 'lucide-react';
import toast from 'react-hot-toast';

interface PathfindingGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

type CellType = 'empty' | 'wall' | 'start' | 'end' | 'path' | 'visited';

interface Cell {
  row: number;
  col: number;
  type: CellType;
}

export const PathfindingGame: React.FC<PathfindingGameProps> = ({ onComplete, onBack }) => {
  const ROWS = 10;
  const COLS = 10;

  const [grid, setGrid] = useState<Cell[][]>([]);
  const [playerPath, setPlayerPath] = useState<[number, number][]>([]);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isPlaying, setIsPlaying] = useState(false);
  const [moves, setMoves] = useState(0);
  const [currentPos, setCurrentPos] = useState<[number, number]>([0, 0]);
  const [endPos, setEndPos] = useState<[number, number]>([9, 9]);

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
    const newGrid: Cell[][] = [];
    for (let row = 0; row < ROWS; row++) {
      const currentRow: Cell[] = [];
      for (let col = 0; col < COLS; col++) {
        currentRow.push({
          row,
          col,
          type: 'empty'
        });
      }
      newGrid.push(currentRow);
    }

    // Add random walls
    const wallCount = 20;
    for (let i = 0; i < wallCount; i++) {
      const row = Math.floor(Math.random() * ROWS);
      const col = Math.floor(Math.random() * COLS);
      if ((row !== 0 || col !== 0) && (row !== ROWS - 1 || col !== COLS - 1)) {
        newGrid[row][col].type = 'wall';
      }
    }

    newGrid[0][0].type = 'start';
    newGrid[ROWS - 1][COLS - 1].type = 'end';

    setGrid(newGrid);
    setCurrentPos([0, 0]);
    setEndPos([ROWS - 1, COLS - 1]);
    setPlayerPath([[0, 0]]);
    setMoves(0);
    setTimeLeft(90);
    setIsPlaying(true);
  };

  const handleCellClick = (row: number, col: number) => {
    if (!isPlaying) return;

    const [currentRow, currentCol] = currentPos;

    // Check if the clicked cell is adjacent
    const isAdjacent =
      (Math.abs(row - currentRow) === 1 && col === currentCol) ||
      (Math.abs(col - currentCol) === 1 && row === currentRow);

    if (!isAdjacent) {
      toast.error('You can only move to adjacent cells!', { duration: 1000 });
      return;
    }

    // Check if it's a wall
    if (grid[row][col].type === 'wall') {
      toast.error('Cannot move through walls!', { duration: 1000 });
      return;
    }

    // Update position
    const newGrid = [...grid];
    if (newGrid[currentRow][currentCol].type !== 'start') {
      newGrid[currentRow][currentCol].type = 'visited';
    }

    setCurrentPos([row, col]);
    setPlayerPath(prev => [...prev, [row, col]]);
    setMoves(prev => prev + 1);
    setGrid(newGrid);

    // Check if reached the end
    if (row === endPos[0] && col === endPos[1]) {
      setIsPlaying(false);
      calculateScore(true);
    }
  };

  const calculateScore = (completed: boolean) => {
    if (!completed) {
      onComplete(0);
      return;
    }

    // Calculate optimal path using Manhattan distance
    const optimalMoves = (ROWS - 1) + (COLS - 1);
    const timeBonus = Math.floor((timeLeft / 90) * 30);
    const pathEfficiency = Math.max(0, 50 - (moves - optimalMoves) * 2);
    const score = Math.max(30, Math.min(100, timeBonus + pathEfficiency + 20));

    toast.success(`Goal reached! Score: ${score}% (${moves} moves, optimal: ~${optimalMoves + 8})`);
    onComplete(score);
  };

  const getCellStyle = (cell: Cell): string => {
    const [currentRow, currentCol] = currentPos;
    const isCurrent = cell.row === currentRow && cell.col === currentCol;

    if (isCurrent && cell.type !== 'end') {
      return 'bg-yellow-500 border-yellow-600 animate-pulse';
    }

    switch (cell.type) {
      case 'start':
        return 'bg-green-500 border-green-600';
      case 'end':
        return isCurrent ? 'bg-purple-500 border-purple-600 animate-pulse' : 'bg-red-500 border-red-600';
      case 'wall':
        return 'bg-gray-700 border-gray-800';
      case 'visited':
        return 'bg-blue-400 border-blue-500';
      case 'path':
        return 'bg-blue-300 border-blue-400';
      default:
        return 'bg-gray-800 border-gray-700 hover:bg-gray-700';
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

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Graph Path Master</h1>

          <div className="w-32" />
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
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
              <Navigation className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Moves</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{moves}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Path Length</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{playerPath.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-gray-900 dark:text-white font-semibold mb-2">How to Play:</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
            Navigate from the green start to the red goal. Click adjacent cells to move (up, down, left, right).
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center"><span className="w-4 h-4 bg-green-500 rounded mr-1"></span> Start</span>
            <span className="flex items-center"><span className="w-4 h-4 bg-red-500 rounded mr-1"></span> Goal</span>
            <span className="flex items-center"><span className="w-4 h-4 bg-gray-700 rounded mr-1"></span> Wall</span>
            <span className="flex items-center"><span className="w-4 h-4 bg-blue-400 rounded mr-1"></span> Visited</span>
            <span className="flex items-center"><span className="w-4 h-4 bg-yellow-500 rounded mr-1"></span> Current</span>
          </div>
        </div>

        {/* Game Board */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  disabled={!isPlaying}
                  className={`aspect-square rounded border-2 transition-all ${getCellStyle(cell)} ${
                    !isPlaying ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                  }`}
                />
              ))
            )}
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-6 text-center">
          <button
            onClick={initializeGame}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            New Maze
          </button>
        </div>
      </div>
    </div>
  );
};

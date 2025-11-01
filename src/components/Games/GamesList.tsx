import React, { useState } from 'react';
import { Trophy, Clock, Star, Play, ArrowLeft } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { SortingGame } from './SortingGame';
import { SearchingGame } from './SearchingGame';
import { PathfindingGame } from './PathfindingGame';
import { DPGame } from './DPGame';
import { MLGame } from './MLGame';

export const GamesList: React.FC = () => {
  const { games, completeGame } = useStore();
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const handleGameComplete = (gameId: string, score: number) => {
    completeGame(gameId, score);
    setActiveGame(null);
  };

  const handlePlayGame = (gameId: string) => {
    setActiveGame(gameId);
  };

  const difficultyColors = {
    easy: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20',
    medium: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20',
    hard: 'text-red-600 bg-red-50 dark:bg-red-900/20',
  };

  // Render active game
  if (activeGame === 'sort-race') {
    return (
      <SortingGame
        onComplete={(score) => handleGameComplete('sort-race', score)}
        onBack={() => setActiveGame(null)}
      />
    );
  }

  if (activeGame === 'binary-hunt') {
    return (
      <SearchingGame
        onComplete={(score) => handleGameComplete('binary-hunt', score)}
        onBack={() => setActiveGame(null)}
      />
    );
  }

  if (activeGame === 'graph-explorer') {
    return (
      <PathfindingGame
        onComplete={(score) => handleGameComplete('graph-explorer', score)}
        onBack={() => setActiveGame(null)}
      />
    );
  }

  if (activeGame === 'dp-puzzle') {
    return (
      <DPGame
        onComplete={(score) => handleGameComplete('dp-puzzle', score)}
        onBack={() => setActiveGame(null)}
      />
    );
  }

  if (activeGame === 'ml-predictor') {
    return (
      <MLGame
        onComplete={(score) => handleGameComplete('ml-predictor', score)}
        onBack={() => setActiveGame(null)}
      />
    );
  }

  // Game selection view
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Algorithm Games
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Learn algorithms through interactive challenges and compete with others
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {games.filter(g => g.completed).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Games Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-purple-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.floor(games.filter(g => g.completed).reduce((sum, g) => sum + (g.score || 0), 0) / games.filter(g => g.completed).length) || 0}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {games.length - games.filter(g => g.completed).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Challenges Left</p>
              </div>
            </div>
          </div>
        </div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {game.title}
                </h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyColors[game.difficulty]}`}>
                  {game.difficulty}
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {game.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  Algorithm: {game.algorithm.replace('-', ' ')}
                </span>
                {game.completed && (
                  <div className="flex items-center text-emerald-600">
                    <Trophy className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{game.score}%</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => handlePlayGame(game.id)}
                className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                  game.completed
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                <Play className="w-4 h-4 mr-2" />
                {game.completed ? 'Play Again' : 'Start Challenge'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

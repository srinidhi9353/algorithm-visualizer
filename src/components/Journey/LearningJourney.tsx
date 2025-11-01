import React, { useState } from 'react';
import { Lock, CheckCircle, Play, Star, Award, Trophy, ClipboardCheck } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Assessment } from './Assessment';

interface LearningPath {
  id: string;
  title: string;
  level: number;
  description: string;
  algorithms: string[];
  unlocked: boolean;
  completed: boolean;
  progress: number;
}

export const LearningJourney: React.FC = () => {
  const { user, setCurrentView, setSelectedAlgorithm } = useStore();
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentLevel, setAssessmentLevel] = useState(1);
  
  const learningPaths: LearningPath[] = [
    {
      id: 'foundations',
      title: 'Foundations',
      level: 1,
      description: 'Master the basics of algorithms and data structures',
      algorithms: ['linear-search', 'bubble-sort', 'insertion-sort'],
      unlocked: true,
      completed: user.progress.algorithmsCompleted.length >= 3,
      progress: Math.min(100, (user.progress.algorithmsCompleted.length / 3) * 100),
    },
    {
      id: 'efficient-algorithms',
      title: 'Efficient Algorithms',
      level: 2,
      description: 'Learn divide-and-conquer and advanced searching',
      algorithms: ['binary-search', 'merge-sort', 'quick-sort'],
      unlocked: user.progress.algorithmsCompleted.length >= 3,
      completed: user.progress.algorithmsCompleted.filter(id => 
        ['binary-search', 'merge-sort', 'quick-sort'].includes(id)
      ).length >= 2,
      progress: Math.min(100, (user.progress.algorithmsCompleted.filter(id => 
        ['binary-search', 'merge-sort', 'quick-sort'].includes(id)
      ).length / 3) * 100),
    },
    {
      id: 'graph-algorithms',
      title: 'Graph Algorithms',
      level: 3,
      description: 'Explore graph traversal and shortest path algorithms',
      algorithms: ['bfs', 'dfs', 'dijkstra'],
      unlocked: user.progress.algorithmsCompleted.length >= 5,
      completed: user.progress.algorithmsCompleted.filter(id => 
        ['bfs', 'dfs', 'dijkstra'].includes(id)
      ).length >= 2,
      progress: Math.min(100, (user.progress.algorithmsCompleted.filter(id => 
        ['bfs', 'dfs', 'dijkstra'].includes(id)
      ).length / 3) * 100),
    },
    {
      id: 'dynamic-programming',
      title: 'Dynamic Programming',
      level: 4,
      description: 'Master optimization through memorization',
      algorithms: ['knapsack'],
      unlocked: user.progress.algorithmsCompleted.length >= 7,
      completed: user.progress.algorithmsCompleted.includes('knapsack'),
      progress: user.progress.algorithmsCompleted.includes('knapsack') ? 100 : 0,
    },
    {
      id: 'advanced-topics',
      title: 'Advanced Topics',
      level: 5,
      description: 'Explore advanced algorithms and techniques',
      algorithms: ['tower-of-hanoi'],
      unlocked: user.progress.algorithmsCompleted.length >= 10,
      completed: user.progress.algorithmsCompleted.includes('tower-of-hanoi'),
      progress: user.progress.algorithmsCompleted.includes('tower-of-hanoi') ? 100 : 0,
    },
  ];

  const handleStartPath = (path: LearningPath) => {
    if (!path.unlocked) return;
    
    setCurrentView('algorithms');
    // Focus on the first incomplete algorithm in the path
    const incompleteAlgorithm = path.algorithms.find(id => 
      !user.progress.algorithmsCompleted.includes(id)
    );
    if (incompleteAlgorithm) {
      // Set selected algorithm based on ID
      setSelectedAlgorithm({
        id: incompleteAlgorithm,
        name: incompleteAlgorithm.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        category: 'Sorting',
        description: 'Algorithm description',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        implemented: true,
      });
    }
  };

  const handleStartAssessment = (level: number) => {
    setAssessmentLevel(level);
    setShowAssessment(true);
  };

  const handleAssessmentComplete = (score: number) => {
    console.log(`Assessment completed with score: ${score}%`);
    setShowAssessment(false);
  };

  if (showAssessment) {
    return (
      <Assessment
        level={assessmentLevel}
        onBack={() => setShowAssessment(false)}
        onComplete={handleAssessmentComplete}
      />
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Learning Journey 🗺️
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Follow a structured path to master algorithms step by step
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Your Progress</h3>
            <p className="opacity-90">
              Level {user.progress.currentLevel} • {user.progress.algorithmsCompleted.length} algorithms mastered
            </p>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
              <Trophy className="w-8 h-8" />
            </div>
            <p className="text-sm opacity-90">
              {Math.floor((user.progress.algorithmsCompleted.length / 15) * 100)}% Complete
            </p>
          </div>
        </div>
      </div>

      {/* Learning Paths */}
      <div className="space-y-6">
        {learningPaths.map((path, index) => {
          const isLocked = !path.unlocked;
          
          return (
            <div
              key={path.id}
              className={`relative bg-white dark:bg-gray-800 rounded-xl border-2 transition-all ${
                isLocked 
                  ? 'border-gray-200 dark:border-gray-700 opacity-60'
                  : path.completed
                  ? 'border-emerald-200 dark:border-emerald-800'
                  : 'border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              {/* Connection Line */}
              {index < learningPaths.length - 1 && (
                <div className="absolute left-1/2 -bottom-6 w-0.5 h-6 bg-gray-300 dark:bg-gray-600 transform -translate-x-1/2 z-0"></div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isLocked 
                        ? 'bg-gray-200 dark:bg-gray-700'
                        : path.completed
                        ? 'bg-emerald-500'
                        : 'bg-blue-500'
                    }`}>
                      {isLocked ? (
                        <Lock className="w-6 h-6 text-gray-500" />
                      ) : path.completed ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white" />
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {path.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Level {path.level} • {path.algorithms.length} algorithms
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      path.completed
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                    }`}>
                      {Math.round(path.progress)}% Complete
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {path.description}
                </p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      path.completed ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${path.progress}%` }}
                  />
                </div>

                {/* Algorithm Pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {path.algorithms.map((algorithmId) => {
                    const isCompleted = user.progress.algorithmsCompleted.includes(algorithmId);
                    return (
                      <span
                        key={algorithmId}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {isCompleted ? '✓ ' : ''}
                        {algorithmId.replace('-', ' ')}
                      </span>
                    );
                  })}
                </div>

                {/* Action Button */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleStartPath(path)}
                    disabled={isLocked}
                    className={`py-3 rounded-lg font-medium transition-all ${
                      isLocked
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                        : path.completed
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                        : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40'
                    }`}
                  >
                    {isLocked ? (
                      <>
                        <Lock className="w-4 h-4 inline mr-2" />
                        Locked
                      </>
                    ) : path.completed ? (
                      <>
                        <Award className="w-4 h-4 inline mr-2" />
                        Review
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 inline mr-2" />
                        {path.progress > 0 ? 'Continue' : 'Start'}
                      </>
                    )}
                  </button>
                  
                  {(path.level === 1 || path.level === 2) && (
                    <button
                      onClick={() => handleStartAssessment(path.level)}
                      disabled={isLocked}
                      className={`py-3 rounded-lg font-medium transition-all ${
                        isLocked
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40'
                      }`}
                    >
                      <ClipboardCheck className="w-4 h-4 inline mr-2" />
                      Assessment
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievement Showcase */}
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🏆 Achievements Unlocked
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'First Steps', desc: 'Complete your first algorithm', earned: user.progress.algorithmsCompleted.length > 0 },
            { name: 'Speed Demon', desc: 'Master Quick Sort', earned: user.progress.algorithmsCompleted.includes('quick-sort') },
            { name: 'Graph Explorer', desc: 'Complete all graph algorithms', earned: user.progress.algorithmsCompleted.filter(id => ['bfs', 'dfs', 'dijkstra'].includes(id)).length >= 3 },
            { name: 'Game Master', desc: 'Win 3 algorithm games', earned: user.progress.gamesCompleted.length >= 3 },
          ].map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 transition-all ${
                achievement.earned
                  ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
                  : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                achievement.earned ? 'bg-yellow-400' : 'bg-gray-300'
              }`}>
                <Trophy className={`w-4 h-4 ${achievement.earned ? 'text-white' : 'text-gray-500'}`} />
              </div>
              <h4 className={`text-sm font-semibold ${achievement.earned ? 'text-yellow-800 dark:text-yellow-400' : 'text-gray-500'}`}>
                {achievement.name}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {achievement.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
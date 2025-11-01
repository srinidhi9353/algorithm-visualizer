import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Clock, Target, Brain, Award } from 'lucide-react';
import toast from 'react-hot-toast';

interface MLGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface DataPoint {
  x: number;
  y: number;
  cluster: number;
  userCluster: number | null;
}

interface Centroid {
  x: number;
  y: number;
  color: string;
}

interface GameResult {
  score: number;
  accuracy: number;
  correctPredictions: number;
  totalPoints: number;
  timeBonus: number;
}

export const MLGame: React.FC<MLGameProps> = ({ onComplete, onBack }) => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [centroids, setCentroids] = useState<Centroid[]>([]);
  const [selectedCluster, setSelectedCluster] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [classified, setClassified] = useState(0);

  const clusterColors = ['#3b82f6', '#ef4444', '#10b981'];
  const clusterNames = ['Blue', 'Red', 'Green'];

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
    // Generate 3 centroids
    const newCentroids: Centroid[] = [
      { x: 25, y: 75, color: clusterColors[0] },
      { x: 75, y: 25, color: clusterColors[1] },
      { x: 75, y: 75, color: clusterColors[2] },
    ];
    setCentroids(newCentroids);

    // Generate data points around centroids
    const points: DataPoint[] = [];
    newCentroids.forEach((centroid, clusterIdx) => {
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 15 + 5;
        const x = Math.max(5, Math.min(95, centroid.x + Math.cos(angle) * distance));
        const y = Math.max(5, Math.min(95, centroid.y + Math.sin(angle) * distance));
        
        points.push({
          x,
          y,
          cluster: clusterIdx,
          userCluster: null,
        });
      }
    });

    // Shuffle points
    points.sort(() => Math.random() - 0.5);

    setDataPoints(points);
    setSelectedCluster(0);
    setTimeLeft(120);
    setIsPlaying(true);
    setGameResult(null);
    setClassified(0);
  };

  const handlePointClick = (index: number) => {
    if (!isPlaying) return;

    setDataPoints(prev => {
      const newPoints = [...prev];
      if (newPoints[index].userCluster === null) {
        setClassified(c => c + 1);
      }
      newPoints[index].userCluster = selectedCluster;
      return newPoints;
    });
  };

  const checkSolution = () => {
    const totalPoints = dataPoints.length;
    const correctPredictions = dataPoints.filter(
      point => point.userCluster === point.cluster
    ).length;

    const accuracy = Math.floor((correctPredictions / totalPoints) * 100);
    const timeBonus = Math.floor((timeLeft / 120) * 25);
    const accuracyPoints = Math.floor(accuracy * 0.65);
    const completionBonus = classified === totalPoints ? 10 : 0;
    const score = Math.min(100, accuracyPoints + timeBonus + completionBonus);

    const result: GameResult = {
      score,
      accuracy,
      correctPredictions,
      totalPoints,
      timeBonus,
    };

    setGameResult(result);
    setIsPlaying(false);
  };

  const submitSolution = () => {
    if (!isPlaying) return;
    
    const unclassified = dataPoints.filter(p => p.userCluster === null).length;
    if (unclassified > 0) {
      toast.error(`${unclassified} points still unclassified!`);
      return;
    }

    setIsPlaying(false);
    checkSolution();
  };

  // Result Modal
  if (gameResult) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Result Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
              <Brain className="w-20 h-20 text-yellow-300 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Analysis Complete!</h2>
              <p className="text-blue-100">K-Means Clustering Challenge</p>
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
                    <span className="text-gray-700 dark:text-gray-300">Accuracy:</span>
                    <span className="text-2xl font-bold text-green-400">{gameResult.accuracy}%</span>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Correct:</span>
                    <span className="text-2xl font-bold text-blue-400">{gameResult.correctPredictions}/{gameResult.totalPoints}</span>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Time Bonus:</span>
                    <span className="text-2xl font-bold text-yellow-400">+{gameResult.timeBonus} points</span>
                  </div>
                </div>
              </div>

              {/* Performance Message */}
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-center text-gray-900 dark:text-gray-200">
                  {gameResult.accuracy >= 90 && "🎉 Excellent! You're a natural at ML!"}
                  {gameResult.accuracy >= 75 && gameResult.accuracy < 90 && "🌟 Great clustering! Very impressive!"}
                  {gameResult.accuracy >= 60 && gameResult.accuracy < 75 && "👍 Good work! Keep practicing pattern recognition!"}
                  {gameResult.accuracy < 60 && "💪 Keep learning! ML pattern recognition improves with practice!"}
                </p>
              </div>

              {/* Cluster Breakdown */}
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <h4 className="text-gray-900 dark:text-white font-semibold mb-3">Cluster Analysis:</h4>
                <div className="space-y-2">
                  {clusterNames.map((name, idx) => {
                    const actualPoints = dataPoints.filter(p => p.cluster === idx).length;
                    const correctClassified = dataPoints.filter(
                      p => p.cluster === idx && p.userCluster === idx
                    ).length;
                    return (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <div 
                            className="w-4 h-4 rounded-full mr-2" 
                            style={{ backgroundColor: clusterColors[idx] }}
                          />
                          <span className="text-gray-700 dark:text-gray-300">{name} Cluster:</span>
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {correctClassified}/{actualPoints} correct
                        </span>
                      </div>
                    );
                  })}
                </div>
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Games</span>
          </button>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ML Pattern Recognition</h1>

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
              <Target className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Classified</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{classified}/{dataPoints.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Clusters</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">3</p>
              </div>
            </div>
          </div>

          <button
            onClick={submitSolution}
            disabled={!isPlaying || classified < dataPoints.length}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg font-medium transition-colors"
          >
            Submit
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-gray-900 dark:text-white font-semibold mb-2 flex items-center">
            <Award className="w-5 h-5 mr-2 text-blue-400" />
            K-Means Clustering Challenge:
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Classify each data point into one of the 3 clusters based on proximity to centroids (⭐). 
            Select a cluster color below, then click data points to assign them!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visualization Canvas */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Data Space:</h3>
            <div className="relative bg-gray-100 dark:bg-gray-900 rounded-lg" style={{ height: '500px' }}>
              {/* Centroids */}
              {centroids.map((centroid, idx) => (
                <div
                  key={`centroid-${idx}`}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{
                    left: `${centroid.x}%`,
                    top: `${centroid.y}%`,
                  }}
                >
                  <div 
                    className="w-8 h-8 flex items-center justify-center text-2xl"
                    title={`${clusterNames[idx]} Centroid`}
                  >
                    ⭐
                  </div>
                </div>
              ))}

              {/* Data Points */}
              {dataPoints.map((point, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePointClick(idx)}
                  disabled={!isPlaying}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full transition-all hover:scale-125 ${
                    !isPlaying ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                  }`}
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    width: '20px',
                    height: '20px',
                    backgroundColor: point.userCluster !== null 
                      ? clusterColors[point.userCluster] 
                      : '#6b7280',
                    border: '2px solid white',
                    boxShadow: point.userCluster !== null ? '0 0 10px rgba(255,255,255,0.3)' : 'none',
                  }}
                  title={`Point ${idx + 1}${point.userCluster !== null ? ` - ${clusterNames[point.userCluster]}` : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Cluster Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Select Cluster:</h3>
            <div className="space-y-3">
              {clusterNames.map((name, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCluster(idx)}
                  disabled={!isPlaying}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    selectedCluster === idx
                      ? 'border-white dark:border-white scale-105 shadow-lg'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400'
                  } ${!isPlaying ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  style={{ backgroundColor: clusterColors[idx] }}
                >
                  <div className="text-white font-bold text-lg">{name} Cluster</div>
                  <div className="text-white text-sm opacity-90 mt-1">
                    {dataPoints.filter(p => p.userCluster === idx).length} points assigned
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-gray-900 dark:text-white text-sm font-semibold mb-2">Legend:</h4>
              <div className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
                <div className="flex items-center">
                  <span className="mr-2">⭐</span>
                  <span>Cluster Centroid</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-500 border border-white mr-2" />
                  <span>Unclassified Point</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 border border-white mr-2" />
                  <span>Classified Point</span>
                </div>
              </div>
            </div>
          </div>
        </div>

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

import React, { useState } from 'react';
import { Search, Filter, ChevronRight, Clock, Activity, ArrowLeft, Code2, TrendingUp, Network, GitBranch, Binary, Database, Cpu, FileCode } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { algorithms } from '../../data/algorithms';

export const AlgorithmList: React.FC = () => {
  const { setSelectedAlgorithm, setCurrentView } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(algorithms.map(a => a.category))];

  // Category metadata with icons and colors
  const categoryMetadata: Record<string, { icon: React.ReactNode; color: string; gradient: string; description: string }> = {
    'Sorting': {
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'text-blue-600 dark:text-blue-400',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Organize data efficiently with various sorting techniques'
    },
    'Searching': {
      icon: <Search className="w-8 h-8" />,
      color: 'text-purple-600 dark:text-purple-400',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Find elements quickly using different search strategies'
    },
    'Graph Algorithms': {
      icon: <Network className="w-8 h-8" />,
      color: 'text-green-600 dark:text-green-400',
      gradient: 'from-green-500 to-emerald-500',
      description: 'Explore connections and paths in graph structures'
    },
    'Trees': {
      icon: <GitBranch className="w-8 h-8" />,
      color: 'text-orange-600 dark:text-orange-400',
      gradient: 'from-orange-500 to-amber-500',
      description: 'Navigate hierarchical data structures efficiently'
    },
    'Dynamic Programming': {
      icon: <Database className="w-8 h-8" />,
      color: 'text-indigo-600 dark:text-indigo-400',
      gradient: 'from-indigo-500 to-blue-500',
      description: 'Solve complex problems by breaking them into subproblems'
    },
    'Recursion & Backtracking': {
      icon: <Code2 className="w-8 h-8" />,
      color: 'text-red-600 dark:text-red-400',
      gradient: 'from-red-500 to-rose-500',
      description: 'Master the art of self-referential problem solving'
    },
    'Bit Manipulation': {
      icon: <Binary className="w-8 h-8" />,
      color: 'text-teal-600 dark:text-teal-400',
      gradient: 'from-teal-500 to-cyan-500',
      description: 'Optimize solutions using bitwise operations'
    },
    'Memory Management': {
      icon: <Cpu className="w-8 h-8" />,
      color: 'text-pink-600 dark:text-pink-400',
      gradient: 'from-pink-500 to-purple-500',
      description: 'Understand how programs manage and allocate memory'
    }
  };

  const filteredAlgorithms = algorithms.filter(algo => {
    const matchesSearch = algo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         algo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || algo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryCount = (category: string) => {
    return algorithms.filter(a => a.category === category).length;
  };

  const handleSelectAlgorithm = (algo: any) => {
    setSelectedAlgorithm(algo);
    setCurrentView('visualizer');
  };

  const difficultyColors = {
    Easy: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
    Medium: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    Hard: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Categories</span>
            </button>
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {selectedCategory ? selectedCategory : 'Algorithm Library'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {selectedCategory 
            ? categoryMetadata[selectedCategory]?.description || 'Explore algorithms in this category'
            : `Explore and visualize ${algorithms.length} algorithms across ${categories.length} categories`
          }
        </p>
      </div>

      {/* Search - Only show when viewing algorithms */}
      {selectedCategory && (
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search algorithms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Category Stats - Only show when viewing algorithms */}
      {selectedCategory && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Algorithms</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredAlgorithms.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">Easy</p>
            <p className="text-2xl font-bold text-emerald-600">{filteredAlgorithms.filter(a => a.difficulty === 'Easy').length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">Medium</p>
            <p className="text-2xl font-bold text-orange-600">{filteredAlgorithms.filter(a => a.difficulty === 'Medium').length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">Hard</p>
            <p className="text-2xl font-bold text-red-600">{filteredAlgorithms.filter(a => a.difficulty === 'Hard').length}</p>
          </div>
        </div>
      )}

      {/* Category Cards - Show when no category is selected */}
      {!selectedCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const metadata = categoryMetadata[category] || {
              icon: <FileCode className="w-8 h-8" />,
              color: 'text-gray-600 dark:text-gray-400',
              gradient: 'from-gray-500 to-gray-600',
              description: 'Explore algorithms in this category'
            };
            const count = getCategoryCount(category);
            
            return (
              <div
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all cursor-pointer group"
              >
                {/* Gradient Header */}
                <div className={`bg-gradient-to-br ${metadata.gradient} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                    <div className="text-white scale-[2.5]">{metadata.icon}</div>
                  </div>
                  <div className="relative z-10">
                    <div className="mb-3">{metadata.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{category}</h3>
                    <p className="text-sm opacity-90">{count} algorithm{count !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {metadata.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-500">
                      <Activity className="w-4 h-4" />
                      <span>Interactive visualizations</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Algorithm Cards - Show when category is selected */}
      {selectedCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlgorithms.map((algo) => (
            <div
              key={algo.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => handleSelectAlgorithm(algo)}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {algo.name}
                </h3>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {algo.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyColors[algo.difficulty]}`}>
                  {algo.difficulty}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-500">{algo.category}</span>
              </div>

              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-xs">{algo.timeComplexity}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Activity className="w-4 h-4 mr-1" />
                  <span className="text-xs">{algo.spaceComplexity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCategory && filteredAlgorithms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No algorithms found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

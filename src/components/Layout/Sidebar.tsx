import React from 'react';
import { Home, BookOpen, Code, Gamepad2, Map, BarChart3, MessageCircle, Brain, Layers, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, isAuthenticated, sidebarOpen, setSidebarOpen, user } = useStore();

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'algorithms', label: 'Algorithms', icon: BookOpen },
    { id: 'ai-recommender', label: 'AI Recommender', icon: Brain },
    { id: 'data-structures', label: 'Data Structures', icon: Layers },
    { id: 'code-visualizer', label: 'Code Lab', icon: Code },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'learning-journey', label: 'Journey', icon: Map },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'chat', label: 'AI Assistant', icon: MessageCircle },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Completely hidden by default, shows as overlay when opened */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">AlgoViz</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* User Progress Summary */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Your Progress</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Algorithms</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {user?.progress?.algorithmsCompleted?.length || 0}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Games</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {user?.progress?.gamesCompleted?.length || 0}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Level</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {user?.progress?.currentLevel || 1}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4">
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <IconComponent className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

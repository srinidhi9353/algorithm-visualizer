import React from 'react';
import { Brain, User, LogOut, Menu, Sun, Moon } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../hooks/useTheme';
import toast from 'react-hot-toast';

export const Header: React.FC = () => {
  const { currentView, logout, user, isAuthenticated, toggleSidebar } = useStore();
  const { theme, toggleTheme } = useTheme();

  const getViewTitle = () => {
    const titles: Record<string, string> = {
      'home': 'Home',
      'dashboard': 'Home',
      'algorithms': 'Algorithms',
      'visualizer': 'Algorithm Visualizer',
      'ai-recommender': 'AI Recommender',
      'data-structures': 'Data Structures',
      'code-visualizer': 'Code Lab',
      'games': 'Games',
      'learning-journey': 'Learning Journey',
      'analytics': 'Analytics',
      'chat': 'AI Assistant',
    };
    return titles[currentView] || 'AlgoVis AI';
  };

  const handleSignOut = () => {
    logout();
    toast.success('Signed out successfully');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Logo & Project Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  AlgoViz
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Learn, Visualize, Master
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - User Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-2 pl-3 border-l border-gray-200 dark:border-gray-700">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-600"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                {user.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { Play, Code, Gamepad2, Brain } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const QuickActions: React.FC = () => {
  const { setCurrentView, setSelectedAlgorithm } = useStore();

  const quickActions = [
    {
      title: 'Continue Learning',
      description: 'Resume your last algorithm session',
      icon: Play,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => setCurrentView('algorithms'),
    },
    {
      title: 'Track Code',
      description: 'Monitor and visualize code execution',
      icon: Code,
      color: 'bg-emerald-500 hover:bg-emerald-600',
      action: () => setCurrentView('code-visualizer'),
    },
    {
      title: 'Play Games',
      description: 'Challenge yourself with puzzles',
      icon: Gamepad2,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => setCurrentView('games'),
    },
    {
      title: 'Ask AI Assistant',
      description: 'Get help with any algorithm concept',
      icon: Brain,
      color: 'bg-orange-500 hover:bg-orange-600',
      action: () => setCurrentView('chat'),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <button
              key={index}
              onClick={action.action}
              className={`p-4 rounded-xl text-white text-left transition-all hover:scale-105 hover:shadow-lg ${action.color}`}
            >
              <IconComponent className="w-8 h-8 mb-3" />
              <h4 className="font-semibold text-sm">{action.title}</h4>
              <p className="text-xs opacity-90 mt-1">{action.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
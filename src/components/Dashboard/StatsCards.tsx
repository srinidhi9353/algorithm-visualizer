import React from 'react';
import { TrendingUp, Clock, Trophy, Zap } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const StatsCards: React.FC = () => {
  const { dashboardStats } = useStore();

  const stats = [
    {
      label: 'Algorithms Learned',
      value: dashboardStats.algorithmsLearned,
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      change: dashboardStats.algorithmsLearned > 0 ? `+${dashboardStats.algorithmsLearned}` : '0',
      changeColor: 'text-blue-600',
    },
    {
      label: 'Time Spent Today',
      value: `${dashboardStats.timeSpentToday}m`,
      icon: Clock,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      change: dashboardStats.timeSpentToday > 0 ? `+${Math.floor(dashboardStats.timeSpentToday/2)}m` : '0m',
      changeColor: 'text-emerald-600',
    },
    {
      label: 'Games Completed',
      value: dashboardStats.gamesCompleted,
      icon: Trophy,
      color: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      change: dashboardStats.gamesCompleted > 0 ? `+${dashboardStats.gamesCompleted}` : '0',
      changeColor: 'text-purple-600',
    },
    {
      label: 'Current Streak',
      value: `${dashboardStats.currentStreak} days`,
      icon: Zap,
      color: 'text-orange-600',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      change: dashboardStats.currentStreak > 0 ? '🔥' : '💤',
      changeColor: dashboardStats.currentStreak > 0 ? 'text-orange-600' : 'text-gray-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.value}
                </p>
                <p className={`text-sm mt-2 font-medium ${stat.changeColor || stat.color}`}>
                  {stat.change} {index < 3 ? 'this session' : ''}
                </p>
              </div>
              <div className={`w-16 h-16 rounded-xl ${stat.bg} flex items-center justify-center shadow-sm`}>
                <IconComponent className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
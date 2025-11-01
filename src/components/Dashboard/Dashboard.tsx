import React from 'react';
import { useStore } from '../../store/useStore';
import { StatsCards } from './StatsCards';
import { ActivityChart } from './ActivityChart';
import { RecentActivity } from './RecentActivity';
import { QuickActions } from './QuickActions';

export const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useStore();

  // Ensure user is authenticated before rendering dashboard
  if (!isAuthenticated || !user) {
    return (
      <div className="p-6 flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user.name}! 🚀
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Ready to continue your algorithm mastery journey?
        </p>
      </div>

      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      <QuickActions />
    </div>
  );
};
import React from 'react';
import { Clock, CheckCircle, Star } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const RecentActivity: React.FC = () => {
  const { user } = useStore();

  const recentActivities = [
    {
      id: 1,
      type: 'algorithm',
      title: 'Completed Quick Sort',
      description: 'Mastered divide-and-conquer technique',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-emerald-600',
    },
    {
      id: 2,
      type: 'game',
      title: 'Binary Search Hunt',
      description: 'Achieved 95% accuracy score',
      time: '5 hours ago',
      icon: Star,
      color: 'text-purple-600',
    },
    {
      id: 3,
      type: 'learning',
      title: 'Dijkstra\'s Algorithm',
      description: 'Learned shortest path concepts',
      time: '1 day ago',
      icon: CheckCircle,
      color: 'text-blue-600',
    },
    {
      id: 4,
      type: 'milestone',
      title: 'Reached Level 3',
      description: 'Unlocked advanced algorithms',
      time: '2 days ago',
      icon: Star,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h3>
      
      <div className="space-y-4">
        {recentActivities.map((activity) => {
          const IconComponent = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-center`}>
                <IconComponent className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {activity.description}
                </p>
                <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="w-full mt-4 py-2 px-4 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
        View All Activity
      </button>
    </div>
  );
};
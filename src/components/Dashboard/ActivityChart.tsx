import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '../../store/useStore';

export const ActivityChart: React.FC = () => {
  const { dashboardStats, theme } = useStore();

  const data = [
    { day: 'Mon', algorithms: dashboardStats.weeklyProgress[0], time: 45 },
    { day: 'Tue', algorithms: dashboardStats.weeklyProgress[1], time: 67 },
    { day: 'Wed', algorithms: dashboardStats.weeklyProgress[2], time: 23 },
    { day: 'Thu', algorithms: dashboardStats.weeklyProgress[3], time: 89 },
    { day: 'Fri', algorithms: dashboardStats.weeklyProgress[4], time: 34 },
    { day: 'Sat', algorithms: dashboardStats.weeklyProgress[5], time: 76 },
    { day: 'Sun', algorithms: dashboardStats.weeklyProgress[6], time: 45 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Weekly Progress
        </h3>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">Algorithms</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">Time (min)</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
            <XAxis 
              dataKey="day" 
              stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
            />
            <YAxis 
              stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                border: `1px solid ${theme === 'dark' ? '#374151' : '#E5E7EB'}`,
                borderRadius: '8px',
                color: theme === 'dark' ? '#FFFFFF' : '#000000',
              }}
            />
            <Line
              type="monotone"
              dataKey="algorithms"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="time"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
import React from 'react';

interface MLVisualizerProps {
  data: any;
}

export const MLVisualizer: React.FC<MLVisualizerProps> = ({ data }) => {
  if (!data) {
    // Default data for demonstration
    const defaultPoints = Array.from({ length: 15 }, (_, i) => ({
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 50,
      cluster: Math.floor(Math.random() * 3),
    }));

    return (
      <div className="h-full flex items-center justify-center">
        <svg width="500" height="400" className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900">
          {defaultPoints.map((point, index) => {
            const colors = ['#3B82F6', '#10B981', '#F59E0B'];
            return (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="6"
                fill={colors[point.cluster]}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
      </div>
    );
  }

  if (data.points) {
    // K-Means visualization
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
    
    return (
      <div className="h-full flex items-center justify-center space-y-4">
        <svg width="600" height="400" className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900">
          {/* Data points */}
          {data.points.map((point: any, index: number) => (
            <circle
              key={`point-${index}`}
              cx={point.x * 5 + 50}
              cy={point.y * 3 + 50}
              r="5"
              fill={point.cluster !== undefined ? colors[point.cluster] : '#6B7280'}
              className="transition-all duration-500"
            />
          ))}
          
          {/* Centroids */}
          {data.centroids && data.centroids.map((centroid: any, index: number) => (
            <g key={`centroid-${index}`}>
              <circle
                cx={centroid.x * 5 + 50}
                cy={centroid.y * 3 + 50}
                r="10"
                fill={colors[centroid.cluster]}
                stroke="#000000"
                strokeWidth="2"
                className="transition-all duration-500"
              />
              <text
                x={centroid.x * 5 + 50}
                y={centroid.y * 3 + 55}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                fontWeight="bold"
              >
                C{centroid.cluster}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (data.linePoints) {
    // Linear regression visualization
    return (
      <div className="h-full flex items-center justify-center">
        <svg width="600" height="400" className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900">
          {/* Data points */}
          {data.points.map((point: any, index: number) => (
            <circle
              key={index}
              cx={point.x * 5 + 50}
              cy={350 - point.y * 3}
              r="5"
              fill="#3B82F6"
              className="transition-all duration-300"
            />
          ))}
          
          {/* Regression line */}
          {data.linePoints && (
            <line
              x1={data.linePoints[0].x * 5 + 50}
              y1={350 - data.linePoints[0].y * 3}
              x2={data.linePoints[1].x * 5 + 50}
              y2={350 - data.linePoints[1].y * 3}
              stroke="#EF4444"
              strokeWidth="3"
              className="transition-all duration-500"
            />
          )}
        </svg>
        
        {data.equation && (
          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
              {data.equation}
            </span>
          </div>
        )}
      </div>
    );
  }

  return null;
};
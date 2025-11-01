import React from 'react';

interface RecursionVisualizerProps {
  data: any;
  highlighted: number[];
  algorithm?: string;
  currentStep?: number;
  variables?: any;
}

export const RecursionVisualizer: React.FC<RecursionVisualizerProps> = ({ 
  data, 
  highlighted, 
  algorithm = 'tower-of-hanoi',
  currentStep = 0,
  variables = {}
}) => {
  const renderTowerOfHanoi = () => {
    const n = parseInt(data) || 3;
    const towers = variables.towers || [
      Array.from({ length: n }, (_, i) => n - i),
      [],
      []
    ];
    
    // Calculate max disk width based on number of disks - generous sizing
    const maxDiskWidth = Math.min(30 + n * 15, 150);
    const baseWidth = maxDiskWidth + 20;
    
    return (
      <div className="flex justify-around items-end min-h-[400px] w-full px-8 py-6">
        {towers.map((tower: number[], towerIndex: number) => (
          <div key={towerIndex} className="flex flex-col items-center">
            {/* Tower label */}
            <div className="mb-4 text-base md:text-lg font-bold text-gray-700 dark:text-gray-300">
              {['Source', 'Auxiliary', 'Destination'][towerIndex]}
            </div>
            
            {/* Tower pole and disks container */}
            <div className="relative flex flex-col items-center">
              {/* Tower pole */}
              <div className="w-3 h-80 bg-gray-600 dark:bg-gray-400 rounded-t-full relative z-0"></div>
              
              {/* Base */}
              <div 
                className="h-5 bg-gray-800 dark:bg-gray-600 rounded -mt-2 relative z-0"
                style={{ width: `${baseWidth}px` }}
              ></div>
              
              {/* Disks */}
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col-reverse items-center z-10">
                {tower.map((diskSize: number, diskIndex: number) => {
                  const width = Math.min(30 + diskSize * 15, maxDiskWidth);
                  const colors = [
                    'bg-red-500',
                    'bg-blue-500', 
                    'bg-green-500',
                    'bg-yellow-500',
                    'bg-purple-500',
                    'bg-pink-500'
                  ];
                  
                  return (
                    <div
                      key={`${towerIndex}-${diskIndex}`}
                      className={`h-7 ${colors[diskSize - 1]} rounded shadow-lg border-2 border-white transition-all duration-500`}
                      style={{ width: `${width}px`, marginBottom: '3px' }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCallStack = () => {
    const callStack = variables.callStack || [];
    
    return (
      <div className="flex flex-col items-center space-y-2">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recursion Call Stack
        </h4>
        
        {callStack.map((call: any, index: number) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              index === callStack.length - 1
                ? 'bg-yellow-100 border-yellow-500 dark:bg-yellow-900/20 dark:border-yellow-400'
                : 'bg-blue-100 border-blue-300 dark:bg-blue-900/20 dark:border-blue-600'
            }`}
            style={{ marginLeft: `${index * 20}px` }}
          >
            <div className="font-mono text-sm">
              hanoi({call.n}, {call.source}, {call.dest}, {call.aux})
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Algorithm Info */}
      <div className="mb-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">🗼</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Tower of Hanoi
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Step {currentStep + 1}: Moving disks following the rules - larger disk cannot be on smaller disk
            </p>
          </div>
        </div>
      </div>

      {/* Current Move Info */}
      {variables.currentMove && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-blue-800 dark:text-blue-300 font-medium">
            {variables.currentMove}
          </p>
        </div>
      )}

      {/* Main Visualization */}
      <div className="flex-1 flex flex-col">
        {/* Tower Visualization - Takes full width */}
        <div className="bg-gradient-to-b from-slate-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-4">
          {renderTowerOfHanoi()}
        </div>
        
        {/* Call Stack Visualization - Below towers */}
        <div className="bg-gradient-to-b from-slate-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-4">
          {renderCallStack()}
        </div>
      </div>
      
      {/* Statistics */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {variables.moves || 0}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Moves Made</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {Math.pow(2, parseInt(data) || 3) - 1}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Moves</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {variables.callStack?.length || 0}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Call Depth</p>
        </div>
      </div>
    </div>
  );
};
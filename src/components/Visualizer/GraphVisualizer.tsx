import React from 'react';

interface GraphVisualizerProps {
  data: any;
  highlighted: number[];
  algorithm?: string;
  currentStep?: number;
}

export const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ 
  data, 
  highlighted, 
  algorithm = 'bfs',
  currentStep = 0 
}) => {
  if (!data || !data.nodes) {
    // Default graph for demonstration
    const defaultNodes = [
      { id: 0, x: 150, y: 100, visited: false },
      { id: 1, x: 300, y: 80, visited: false },
      { id: 2, x: 100, y: 200, visited: false },
      { id: 3, x: 350, y: 180, visited: false },
      { id: 4, x: 450, y: 120, visited: false },
      { id: 5, x: 400, y: 250, visited: false },
    ];
    
    const defaultEdges = [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 3, to: 5 },
      { from: 4, to: 5 },
    ];

    data = { nodes: defaultNodes, edges: defaultEdges };
  }

  const { nodes, edges, queue, stack } = data;
  
  // Get metaphor-based styling
  const getNodeStyle = (node: any, isHighlighted: boolean) => {
    if (algorithm === 'bfs') {
      // Ripple effect metaphor
      if (isHighlighted) return { fill: '#3B82F6', stroke: '#1E40AF', strokeWidth: 4, r: 30 };
      if (node.visited) return { fill: '#10B981', stroke: '#059669', strokeWidth: 3, r: 25 };
      return { fill: '#E5E7EB', stroke: '#9CA3AF', strokeWidth: 2, r: 25 };
    } else if (algorithm === 'dfs') {
      // Cave exploration metaphor
      if (isHighlighted) return { fill: '#F59E0B', stroke: '#D97706', strokeWidth: 4, r: 30 };
      if (node.visited) return { fill: '#8B5CF6', stroke: '#7C3AED', strokeWidth: 3, r: 25 };
      return { fill: '#F3F4F6', stroke: '#6B7280', strokeWidth: 2, r: 25 };
    } else if (algorithm === 'dijkstra') {
      // GPS route optimization metaphor
      if (isHighlighted) return { fill: '#EF4444', stroke: '#DC2626', strokeWidth: 4, r: 30 };
      if (node.visited) return { fill: '#06B6D4', stroke: '#0891B2', strokeWidth: 3, r: 25 };
      return { fill: '#F9FAFB', stroke: '#4B5563', strokeWidth: 2, r: 25 };
    }
    
    // Default styling
    if (isHighlighted) return { fill: '#EF4444', stroke: '#DC2626', strokeWidth: 4, r: 30 };
    if (node.visited) return { fill: '#10B981', stroke: '#059669', strokeWidth: 3, r: 25 };
    return { fill: '#3B82F6', stroke: '#1E40AF', strokeWidth: 2, r: 25 };
  };

  return (
    <div className="h-full flex flex-col">
      {/* Algorithm Metaphor Header */}
      <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {algorithm === 'bfs' ? '🌊' : 
               algorithm === 'dfs' ? '🕳️' :
               algorithm === 'dijkstra' ? '🗺️' : '🔍'}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {algorithm === 'bfs' ? 'Ripples Expanding in Pond' :
               algorithm === 'dfs' ? 'Exploring Cave Tunnels' :
               algorithm === 'dijkstra' ? 'GPS Route Optimization' : 'Graph Exploration'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Step {currentStep + 1}: {
                algorithm === 'bfs' ? 'Waves spread to all neighbors at current level' :
                algorithm === 'dfs' ? 'Dive deep into unexplored tunnels' :
                algorithm === 'dijkstra' ? 'Always visit the closest unvisited location' : 'Exploring nodes systematically'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Main Graph Visualization */}
      <div className="flex-1 flex items-center justify-center">
        <svg width="600" height="400" className="border border-gray-300 dark:border-gray-600 rounded-lg bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 shadow-inner">
          {/* Background effects for metaphors */}
          <defs>
            <radialGradient id="rippleGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
             refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
            </marker>
          </defs>
          
          {/* Ripple effects for BFS */}
          {algorithm === 'bfs' && highlighted.map((nodeId, index) => (
            <circle
              key={`ripple-${nodeId}`}
              cx={nodes[nodeId]?.x || 0}
              cy={nodes[nodeId]?.y || 0}
              r="50"
              fill="url(#rippleGradient)"
              className="animate-ping"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
          
        {/* Edges */}
        {edges.map((edge: any, index: number) => {
          const fromNode = nodes[edge.from];
          const toNode = nodes[edge.to];
          
          // Check if edge is part of traversal path
          const isFromVisited = fromNode?.visited || false;
          const isToVisited = toNode?.visited || false;
          const isInPath = isFromVisited && isToVisited;
          const isActive = highlighted.includes(edge.from) && highlighted.includes(edge.to);
          
          // Different colors for different algorithms
          let strokeColor = "#D1D5DB"; // default gray
          let strokeWidth = "2";
          
          if (isActive) {
            strokeColor = algorithm === 'bfs' ? '#3B82F6' : 
                         algorithm === 'dfs' ? '#F59E0B' : 
                         '#EF4444';
            strokeWidth = "4";
          } else if (isInPath) {
            strokeColor = algorithm === 'bfs' ? '#60A5FA' : 
                         algorithm === 'dfs' ? '#FBBF24' : 
                         '#F87171';
            strokeWidth = "3";
          }
          
          return (
            <g key={index}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={algorithm === 'dfs' && isInPath ? "5,5" : "none"}
                className="transition-all duration-500"
                filter={isActive ? "url(#glow)" : "none"}
                opacity={isInPath || isActive ? 1 : 0.4}
                markerEnd={isActive ? "url(#arrowhead)" : ""}
              />
              
              {/* Weight label for Dijkstra */}
              {edge.weight && algorithm === 'dijkstra' && (
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2 - 5}
                  textAnchor="middle"
                  fill="#1F2937"
                  fontSize="11"
                  fontWeight="bold"
                  className="bg-white dark:bg-gray-800 px-1 rounded"
                >
                  {edge.weight}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Nodes */}
        {nodes.map((node: any) => {
          const isHighlighted = highlighted.includes(node.id);
          const nodeStyle = getNodeStyle(node, isHighlighted);
          
          return (
            <g key={node.id}>
              {/* Node shadow */}
              <circle
                cx={node.x + 2}
                cy={node.y + 2}
                r={nodeStyle.r}
                fill="rgba(0,0,0,0.1)"
              />
              
              {/* Main node */}
              <circle
                cx={node.x}
                cy={node.y}
                r={nodeStyle.r}
                fill={nodeStyle.fill}
                stroke={nodeStyle.stroke}
                strokeWidth={nodeStyle.strokeWidth}
                className="transition-all duration-500"
                filter={isHighlighted ? "url(#glow)" : "none"}
              />
              
              {/* Node label */}
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
                className="pointer-events-none"
              >
                {node.id}
              </text>
              
              {/* Distance label for Dijkstra */}
              {node.distance !== undefined && node.distance !== Infinity && (
                <g>
                  <rect
                    x={node.x - 25}
                    y={node.y - 50}
                    width="50"
                    height="20"
                    fill="white"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    rx="4"
                    className="shadow-lg"
                  />
                  <text
                    x={node.x}
                    y={node.y - 36}
                    textAnchor="middle"
                    fill="#1F2937"
                    fontSize="13"
                    fontWeight="bold"
                  >
                    d:{node.distance}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
      </div>
      
      {/* Algorithm State Display */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {(queue || stack) && ((queue && queue.length > 0) || (stack && stack.length > 0)) && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {algorithm === 'bfs' ? 'Queue (Next to Visit):' : 
                 algorithm === 'dfs' ? 'Stack (Next to Visit):' : 'Queue:'}
              </span>
            </div>
            <div className="text-blue-600 dark:text-blue-400 font-mono text-sm bg-blue-50 dark:bg-blue-900/20 rounded px-3 py-2">
              [{(queue || stack || []).join(', ')}]
            </div>
          </div>
        )}
        
        {/* Visited nodes */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {algorithm === 'bfs' ? 'Ripple Reached:' : 
               algorithm === 'dfs' ? 'Tunnels Explored:' : 
               'Visited Nodes:'}
            </span>
          </div>
          <div className="text-green-600 dark:text-green-400 font-mono text-sm bg-green-50 dark:bg-green-900/20 rounded px-3 py-2">
            [{nodes.filter((n: any) => n.visited).map((n: any) => n.id).join(', ')}]
          </div>
        </div>
      </div>
      
      {/* Dijkstra Results - Shortest Path Distances */}
      {algorithm === 'dijkstra' && nodes.some((n: any) => n.distance !== undefined && n.distance !== Infinity) && (
        <div className="mt-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-5 border-2 border-cyan-300 dark:border-cyan-700">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">🗺</span>
            </div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
              Shortest Path Results from Node 0
            </h4>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {nodes
              .filter((n: any) => n.distance !== undefined && n.distance !== Infinity)
              .sort((a: any, b: any) => a.id - b.id)
              .map((node: any) => (
                <div 
                  key={node.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-cyan-200 dark:border-cyan-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Node</div>
                    <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                      {node.id}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Distance</div>
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {node.distance}
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          
          <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-300 dark:border-blue-700">
            <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
              💡 <strong>Result Summary:</strong> These are the shortest distances from the starting node (0) to each reachable node in the graph.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
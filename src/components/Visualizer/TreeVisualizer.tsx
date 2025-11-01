import React from 'react';

interface TreeNode {
  val: number;
  left?: TreeNode;
  right?: TreeNode;
  x?: number;
  y?: number;
}

interface TreeVisualizerProps {
  data: any;
  highlighted: number[];
  algorithm?: string;
  currentStep?: number;
  variables?: any;
}

export const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ 
  data, 
  highlighted, 
  algorithm = 'binary-tree-traversal',
  currentStep = 0,
  variables = {}
}) => {
  // Convert array to tree structure
  const arrayToTree = (arr: (number | null)[]): TreeNode | null => {
    if (!arr.length || arr[0] === null) return null;
    
    const root: TreeNode = { val: arr[0] };
    const queue: TreeNode[] = [root];
    let i = 1;
    
    while (queue.length && i < arr.length) {
      const node = queue.shift()!;
      
      if (i < arr.length && arr[i] !== null) {
        node.left = { val: arr[i] as number };
        queue.push(node.left);
      }
      i++;
      
      if (i < arr.length && arr[i] !== null) {
        node.right = { val: arr[i] as number };
        queue.push(node.right);
      }
      i++;
    }
    
    return root;
  };

  // Calculate node positions
  const calculatePositions = (root: TreeNode | null, width: number, height: number) => {
    if (!root) return;
    
    const levels: TreeNode[][] = [];
    const queue: { node: TreeNode; level: number }[] = [{ node: root, level: 0 }];
    
    while (queue.length) {
      const { node, level } = queue.shift()!;
      
      if (!levels[level]) levels[level] = [];
      levels[level].push(node);
      
      if (node.left) queue.push({ node: node.left, level: level + 1 });
      if (node.right) queue.push({ node: node.right, level: level + 1 });
    }
    
    // Position nodes
    levels.forEach((levelNodes, level) => {
      const y = 80 + level * 80;
      const levelWidth = width - 100;
      const spacing = levelWidth / (levelNodes.length + 1);
      
      levelNodes.forEach((node, index) => {
        node.x = 50 + spacing * (index + 1);
        node.y = y;
      });
    });
  };

  // Render tree edges
  const renderEdges = (root: TreeNode | null): JSX.Element[] => {
    if (!root) return [];
    
    const edges: JSX.Element[] = [];
    const queue: TreeNode[] = [root];
    
    while (queue.length) {
      const node = queue.shift()!;
      
      if (node.left && node.x !== undefined && node.y !== undefined) {
        edges.push(
          <line
            key={`edge-${node.val}-${node.left.val}`}
            x1={node.x}
            y1={node.y}
            x2={node.left.x}
            y2={node.left.y}
            stroke="#9CA3AF"
            strokeWidth="2"
            className="transition-all duration-300"
          />
        );
        queue.push(node.left);
      }
      
      if (node.right && node.x !== undefined && node.y !== undefined) {
        edges.push(
          <line
            key={`edge-${node.val}-${node.right.val}`}
            x1={node.x}
            y1={node.y}
            x2={node.right.x}
            y2={node.right.y}
            stroke="#9CA3AF"
            strokeWidth="2"
            className="transition-all duration-300"
          />
        );
        queue.push(node.right);
      }
    }
    
    return edges;
  };

  // Render tree nodes
  const renderNodes = (root: TreeNode | null): JSX.Element[] => {
    if (!root) return [];
    
    const nodes: JSX.Element[] = [];
    const queue: TreeNode[] = [root];
    
    while (queue.length) {
      const node = queue.shift()!;
      const isHighlighted = highlighted.includes(node.val);
      const isVisited = variables.visited && variables.visited.includes(node.val);
      
      if (node.x !== undefined && node.y !== undefined) {
        nodes.push(
          <g key={`node-${node.val}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r="25"
              fill={
                isHighlighted ? '#EF4444' :
                isVisited ? '#10B981' :
                '#3B82F6'
              }
              stroke={
                isHighlighted ? '#DC2626' :
                isVisited ? '#059669' :
                '#1E40AF'
              }
              strokeWidth="3"
              className="transition-all duration-500"
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fill="white"
              fontSize="14"
              fontWeight="bold"
              className="pointer-events-none"
            >
              {node.val}
            </text>
          </g>
        );
      }
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    return nodes;
  };

  // Parse input data
  let treeData: (number | null)[] = [];
  if (typeof data === 'string') {
    treeData = data.split(',').map(val => val.trim() === 'null' ? null : parseInt(val.trim()));
  } else if (Array.isArray(data)) {
    treeData = data;
  }

  const root = arrayToTree(treeData);
  if (root) {
    calculatePositions(root, 600, 400);
  }

  return (
    <div className="h-full flex flex-col">
      {/* Algorithm Info */}
      <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">🌳</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Binary Tree Traversal
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Step {currentStep + 1}: Visiting nodes in {algorithm.includes('inorder') ? 'inorder' : 'preorder'} sequence
            </p>
          </div>
        </div>
      </div>

      {/* Traversal Info */}
      {variables && Object.keys(variables).length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Traversal State:</h4>
          <div className="flex flex-wrap gap-3 text-xs">
            {Object.entries(variables).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-1">
                <span className="text-gray-500 dark:text-gray-400">{key}:</span>
                <span className="font-mono bg-white dark:bg-gray-700 px-2 py-1 rounded border">
                  {Array.isArray(value) ? `[${value.join(', ')}]` : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tree Visualization */}
      <div className="flex-1 flex items-center justify-center">
        {root ? (
          <svg width="600" height="400" className="border border-gray-300 dark:border-gray-600 rounded-lg bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 shadow-inner">
            {/* Render edges first */}
            {renderEdges(root)}
            
            {/* Render nodes on top */}
            {renderNodes(root)}
          </svg>
        ) : (
          <div className="text-center py-8">
            <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl mx-auto mb-6 flex items-center justify-center shadow-lg">
              <span className="text-4xl">🌳</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Enter tree data to visualize traversal
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              Format: 1,2,3,4,5,null,6
            </p>
          </div>
        )}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex justify-center space-x-6 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-400">Current Node</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-400">Visited</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-400">Unvisited</span>
        </div>
      </div>
    </div>
  );
};
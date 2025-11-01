export interface Algorithm {
  id: string;
  name: string;
  category: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  code: string;
  pseudocode: string[];
  visualizationType: 'sorting' | 'searching' | 'graph' | 'tree' | 'recursion' | 'dp' | 'bit' | 'memory';
  defaultInput: string;
  inputType: 'array' | 'graph' | 'string' | 'number' | 'matrix';
}

export const algorithms: Algorithm[] = [
  // SORTING ALGORITHMS
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    difficulty: 'Easy',
    visualizationType: 'sorting',
    defaultInput: '64,34,25,12,22,11,90',
    inputType: 'array',
    code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    pseudocode: [
      'for i = 0 to n-1:',
      '  for j = 0 to n-i-2:',
      '    if arr[j] > arr[j+1]:',
      '      swap(arr[j], arr[j+1])',
      'return arr'
    ]
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'Sorting',
    description: 'Finds the minimum element and places it at the beginning, then repeats for the remaining array.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    difficulty: 'Easy',
    visualizationType: 'sorting',
    defaultInput: '64,34,25,12,22,11,90',
    inputType: 'array',
    code: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
    pseudocode: [
      'for i = 0 to n-2:',
      '  minIdx = i',
      '  for j = i+1 to n-1:',
      '    if arr[j] < arr[minIdx]:',
      '      minIdx = j',
      '  swap(arr[i], arr[minIdx])'
    ]
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'Sorting',
    description: 'Builds the final sorted array one item at a time, inserting each element into its correct position.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    difficulty: 'Easy',
    visualizationType: 'sorting',
    defaultInput: '64,34,25,12,22,11,90',
    inputType: 'array',
    code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    pseudocode: [
      'for i = 1 to n-1:',
      '  key = arr[i]',
      '  j = i - 1',
      '  while j >= 0 and arr[j] > key:',
      '    arr[j+1] = arr[j]',
      '    j = j - 1',
      '  arr[j+1] = key'
    ]
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'Sorting',
    description: 'Divides the array into halves, sorts them separately, then merges them back together.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    difficulty: 'Medium',
    visualizationType: 'sorting',
    defaultInput: '64,34,25,12,22,11,90',
    inputType: 'array',
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    pseudocode: [
      'if length <= 1: return arr',
      'mid = length / 2',
      'left = mergeSort(arr[0...mid])',
      'right = mergeSort(arr[mid...end])',
      'return merge(left, right)'
    ]
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'Sorting',
    description: 'Picks a pivot element and partitions the array around it, then recursively sorts the partitions.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    difficulty: 'Medium',
    visualizationType: 'sorting',
    defaultInput: '64,34,25,12,22,11,90',
    inputType: 'array',
    code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    pseudocode: [
      'if low < high:',
      '  pi = partition(arr, low, high)',
      '  quickSort(arr, low, pi-1)',
      '  quickSort(arr, pi+1, high)'
    ]
  },
  {
    id: 'heap-sort',
    name: 'Heap Sort',
    category: 'Sorting',
    description: 'Builds a max heap from the array, then repeatedly extracts the maximum element.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Hard',
    visualizationType: 'sorting',
    defaultInput: '64,34,25,12,22,11,90',
    inputType: 'array',
    code: `function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
    pseudocode: [
      'buildMaxHeap(arr)',
      'for i = n-1 to 1:',
      '  swap(arr[0], arr[i])',
      '  heapify(arr, i, 0)'
    ]
  },

  // SEARCHING ALGORITHMS
  {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'Searching',
    description: 'Sequentially checks each element until the target is found or the list ends.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Easy',
    visualizationType: 'searching',
    defaultInput: '64,34,25,12,22,11,90',
    inputType: 'array',
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Found at index i
    }
  }
  return -1; // Not found
}`,
    pseudocode: [
      'for i = 0 to n-1:',
      '  if arr[i] == target:',
      '    return i',
      'return -1'
    ]
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Searching',
    description: 'Efficiently searches a sorted array by repeatedly dividing the search interval in half.',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    visualizationType: 'searching',
    defaultInput: '11,12,22,25,34,64,90',
    inputType: 'array',
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1; // Not found
}`,
    pseudocode: [
      'left = 0, right = n-1',
      'while left <= right:',
      '  mid = (left + right) / 2',
      '  if arr[mid] == target: return mid',
      '  if arr[mid] < target: left = mid + 1',
      '  else: right = mid - 1',
      'return -1'
    ]
  },

  // GRAPH ALGORITHMS
  {
    id: 'bfs',
    name: 'Breadth-First Search',
    category: 'Graph Algorithms',
    description: 'Explores nodes level by level, visiting all neighbors before moving to the next level.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    difficulty: 'Medium',
    visualizationType: 'graph',
    defaultInput: '0-1,0-2,1-3,2-4,3-5,4-5',
    inputType: 'graph',
    code: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];
  
  while (queue.length > 0) {
    const node = queue.shift();
    
    if (!visited.has(node)) {
      visited.add(node);
      result.push(node);
      
      for (const neighbor of graph[node] || []) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }
  }
  
  return result;
}`,
    pseudocode: [
      'queue = [start]',
      'visited = set()',
      'while queue not empty:',
      '  node = queue.pop()',
      '  if node not visited:',
      '    visit(node)',
      '    add neighbors to queue'
    ]
  },
  {
    id: 'dfs',
    name: 'Depth-First Search',
    category: 'Graph Algorithms',
    description: 'Explores as far as possible along each branch before backtracking.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    difficulty: 'Medium',
    visualizationType: 'graph',
    defaultInput: '0-1,0-2,1-3,2-4,3-5,4-5',
    inputType: 'graph',
    code: `function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  const result = [start];
  
  for (const neighbor of graph[start] || []) {
    if (!visited.has(neighbor)) {
      result.push(...dfs(graph, neighbor, visited));
    }
  }
  
  return result;
}`,
    pseudocode: [
      'visit(node)',
      'for each neighbor of node:',
      '  if neighbor not visited:',
      '    dfs(neighbor)'
    ]
  },
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'Graph Algorithms',
    description: 'Finds the shortest path from a source vertex to all other vertices in a weighted graph.',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
    difficulty: 'Hard',
    visualizationType: 'graph',
    defaultInput: '0-1:4,0-2:2,1-3:1,2-4:3,3-5:2,4-5:1',
    inputType: 'graph',
    code: `function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  const pq = new PriorityQueue();
  
  // Initialize distances
  for (const node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;
  pq.enqueue(start, 0);
  
  while (!pq.isEmpty()) {
    const current = pq.dequeue().element;
    
    if (visited.has(current)) continue;
    visited.add(current);
    
    for (const neighbor of graph[current] || []) {
      const newDist = distances[current] + neighbor.weight;
      
      if (newDist < distances[neighbor.node]) {
        distances[neighbor.node] = newDist;
        pq.enqueue(neighbor.node, newDist);
      }
    }
  }
  
  return distances;
}`,
    pseudocode: [
      'distances[start] = 0',
      'pq.add(start, 0)',
      'while pq not empty:',
      '  current = pq.extractMin()',
      '  for each neighbor:',
      '    if newDist < distances[neighbor]:',
      '      distances[neighbor] = newDist'
    ]
  },

  // RECURSION & BACKTRACKING
  {
    id: 'tower-of-hanoi',
    name: 'Tower of Hanoi',
    category: 'Recursion & Backtracking',
    description: 'Classic recursive problem of moving disks between three rods following specific rules.',
    timeComplexity: 'O(2^n)',
    spaceComplexity: 'O(n)',
    difficulty: 'Medium',
    visualizationType: 'recursion',
    defaultInput: '3',
    inputType: 'number',
    code: `function towerOfHanoi(n, source, destination, auxiliary) {
  if (n === 1) {
    console.log(\`Move disk 1 from \${source} to \${destination}\`);
    return;
  }
  
  // Move n-1 disks to auxiliary rod
  towerOfHanoi(n - 1, source, auxiliary, destination);
  
  // Move the largest disk to destination
  console.log(\`Move disk \${n} from \${source} to \${destination}\`);
  
  // Move n-1 disks from auxiliary to destination
  towerOfHanoi(n - 1, auxiliary, destination, source);
}`,
    pseudocode: [
      'if n == 1:',
      '  move disk from source to dest',
      'else:',
      '  hanoi(n-1, source, aux, dest)',
      '  move disk n from source to dest',
      '  hanoi(n-1, aux, dest, source)'
    ]
  },

  // DYNAMIC PROGRAMMING
  {
    id: 'knapsack',
    name: '0/1 Knapsack',
    category: 'Dynamic Programming',
    description: 'Finds the maximum value that can be obtained with a given weight capacity.',
    timeComplexity: 'O(nW)',
    spaceComplexity: 'O(nW)',
    difficulty: 'Hard',
    visualizationType: 'dp',
    defaultInput: 'weights:1,3,4,5;values:1,4,5,7;capacity:7',
    inputType: 'matrix',
    code: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  
  return dp[n][capacity];
}`,
    pseudocode: [
      'dp[i][w] = max value with i items, weight w',
      'for i = 1 to n:',
      '  for w = 1 to capacity:',
      '    if weight[i] <= w:',
      '      dp[i][w] = max(include, exclude)',
      '    else:',
      '      dp[i][w] = dp[i-1][w]'
    ]
  },

  // TREE ALGORITHMS
  {
    id: 'binary-tree-traversal',
    name: 'Binary Tree Traversal',
    category: 'Trees',
    description: 'Visits all nodes in a binary tree using inorder, preorder, or postorder traversal.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    difficulty: 'Medium',
    visualizationType: 'tree',
    defaultInput: '1,2,3,4,5,null,6',
    inputType: 'array',
    code: `function inorderTraversal(root) {
  const result = [];
  
  function inorder(node) {
    if (node !== null) {
      inorder(node.left);   // Visit left subtree
      result.push(node.val); // Visit root
      inorder(node.right);  // Visit right subtree
    }
  }
  
  inorder(root);
  return result;
}`,
    pseudocode: [
      'inorder(node):',
      '  if node is not null:',
      '    inorder(node.left)',
      '    visit(node)',
      '    inorder(node.right)'
    ]
  },
  {
    id: 'bst-search',
    name: 'Binary Search Tree Search',
    category: 'Trees',
    description: 'Searches for a value in a Binary Search Tree by comparing with nodes and traversing left or right.',
    timeComplexity: 'O(h)',
    spaceComplexity: 'O(h)',
    difficulty: 'Medium',
    visualizationType: 'tree',
    defaultInput: '8,3,10,1,6,null,14,null,null,4,7,13',
    inputType: 'array',
    code: `function searchBST(root, target) {
  if (root === null) {
    return null;
  }
  
  if (root.val === target) {
    return root; // Found!
  }
  
  if (target < root.val) {
    return searchBST(root.left, target);  // Search left
  } else {
    return searchBST(root.right, target); // Search right
  }
}`,
    pseudocode: [
      'searchBST(node, target):',
      '  if node is null: return null',
      '  if node.val == target: return node',
      '  if target < node.val:',
      '    return searchBST(node.left, target)',
      '  else:',
      '    return searchBST(node.right, target)'
    ]
  }
];

export const algorithmCategories = [
  'All',
  'Sorting',
  'Searching', 
  'Recursion & Backtracking',
  'Graph Algorithms',
  'Trees',
  'Dynamic Programming',
  'Bit Manipulation',
  'Memory Models'
];
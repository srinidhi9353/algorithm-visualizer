import React, { useState } from 'react';
import { Play, Info, Layers } from 'lucide-react';

interface DataStructure {
  id: string;
  name: string;
  description: string;
  operations: string[];
  timeComplexity: { [key: string]: string };
  useCase: string;
}

export const DataStructuresList: React.FC = () => {
  const [selectedStructure, setSelectedStructure] = useState<string>('');
  
  const dataStructures: DataStructure[] = [
    {
      id: 'array',
      name: 'Array',
      description: 'A collection of elements stored in contiguous memory locations.',
      operations: ['Access', 'Insert', 'Delete', 'Search'],
      timeComplexity: {
        'Access': 'O(1)',
        'Insert': 'O(n)',
        'Delete': 'O(n)',
        'Search': 'O(n)',
      },
      useCase: 'When you need fast random access to elements by index.',
    },
    {
      id: 'linked-list',
      name: 'Linked List',
      description: 'Linear data structure where elements point to the next element.',
      operations: ['Insert', 'Delete', 'Search', 'Traverse'],
      timeComplexity: {
        'Insert': 'O(1)',
        'Delete': 'O(1)',
        'Search': 'O(n)',
        'Traverse': 'O(n)',
      },
      useCase: 'When you need efficient insertion and deletion at any position.',
    },
    {
      id: 'stack',
      name: 'Stack',
      description: 'LIFO (Last In, First Out) data structure.',
      operations: ['Push', 'Pop', 'Peek', 'Empty'],
      timeComplexity: {
        'Push': 'O(1)',
        'Pop': 'O(1)',
        'Peek': 'O(1)',
        'Empty': 'O(1)',
      },
      useCase: 'Function calls, expression evaluation, undo operations.',
    },
    {
      id: 'queue',
      name: 'Queue',
      description: 'FIFO (First In, First Out) data structure.',
      operations: ['Enqueue', 'Dequeue', 'Front', 'Empty'],
      timeComplexity: {
        'Enqueue': 'O(1)',
        'Dequeue': 'O(1)',
        'Front': 'O(1)',
        'Empty': 'O(1)',
      },
      useCase: 'BFS traversal, task scheduling, buffer for data streams.',
    },
    {
      id: 'tree',
      name: 'Tree',
      description: 'Hierarchical structure where each node has at most two children.',
      operations: ['Insert', 'Delete', 'Search', 'Traverse'],
      timeComplexity: {
        'Insert': 'O(log n)',
        'Delete': 'O(log n)',
        'Search': 'O(log n)',
        'Traverse': 'O(n)',
      },
      useCase: 'Hierarchical data representation, decision trees, BST operations.',
    },
    {
      id: 'hash-table',
      name: 'Hash Table',
      description: 'Data structure that maps keys to values using a hash function.',
      operations: ['Insert', 'Delete', 'Search', 'Update'],
      timeComplexity: {
        'Insert': 'O(1)',
        'Delete': 'O(1)',
        'Search': 'O(1)',
        'Update': 'O(1)',
      },
      useCase: 'Fast lookup, caching, database indexing.',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Data Structures 🧱
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Interactive exploration of fundamental data structures
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Structure List */}
        <div className="lg:col-span-1 space-y-4">
          {dataStructures.map((structure) => (
            <div
              key={structure.id}
              onClick={() => setSelectedStructure(structure.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedStructure === structure.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {structure.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {structure.description}
              </p>
            </div>
          ))}
        </div>

        {/* Visualization & Details */}
        <div className="lg:col-span-2">
          {selectedStructure ? (
            <DataStructureVisualization 
              structure={dataStructures.find(s => s.id === selectedStructure)!}
            />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
              <Layers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Select a Data Structure
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose a data structure from the list to see its visualization and operations
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DataStructureVisualization: React.FC<{ structure: DataStructure }> = ({ structure }) => {
  const [elements, setElements] = useState<string[]>(
    structure.id === 'hash-table' 
      ? Array(8).fill('') 
      : ['A', 'B', 'C']
  );
  const [newElement, setNewElement] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [operation, setOperation] = useState<string>('');
  const [searchElement, setSearchElement] = useState('');
  const [traversalOrder, setTraversalOrder] = useState<'inorder' | 'preorder' | 'postorder'>('inorder');
  const [bulkInput, setBulkInput] = useState('');

  // Array operations
  const handleArrayAccess = (index: number) => {
    if (index >= 0 && index < elements.length) {
      setHighlightedIndex(index);
      setOperation(`Access: Retrieved "${elements[index]}" at index ${index} - O(1)`);
      setTimeout(() => setHighlightedIndex(-1), 2000);
    }
  };

  const handleArrayInsert = () => {
    if (newElement) {
      const newElements = [...elements, newElement];
      setElements(newElements);
      setHighlightedIndex(newElements.length - 1);
      setOperation(`Insert: Added "${newElement}" at end - O(n) for shifting`);
      setNewElement('');
      setTimeout(() => setHighlightedIndex(-1), 2000);
    }
  };

  const handleArrayDelete = () => {
    if (searchElement) {
      const index = elements.indexOf(searchElement);
      if (index !== -1) {
        const deletedElement = elements[index];
        setElements(elements.filter((_, i) => i !== index));
        setOperation(`Delete: Removed "${deletedElement}" from index ${index} - O(n)`);
        setSearchElement('');
      } else {
        setOperation(`Delete: "${searchElement}" not found in array`);
      }
      setTimeout(() => setOperation(''), 3000);
    } else {
      setOperation('Delete: Please enter element to delete in search field');
      setTimeout(() => setOperation(''), 3000);
    }
  };

  const handleArraySearch = () => {
    if (searchElement) {
      const index = elements.indexOf(searchElement);
      if (index !== -1) {
        setHighlightedIndex(index);
        setOperation(`Search: Found "${searchElement}" at index ${index} - O(n)`);
        setTimeout(() => setHighlightedIndex(-1), 3000);
      } else {
        setOperation(`Search: "${searchElement}" not found - O(n)`);
        setTimeout(() => setOperation(''), 3000);
      }
    }
  };

  // Linked List operations
  const handleLinkedListInsert = () => {
    if (newElement) {
      const newElements = [...elements, newElement];
      setElements(newElements);
      setHighlightedIndex(newElements.length - 1);
      setOperation(`Insert: Added "${newElement}" at end - O(1)`);
      setNewElement('');
      setTimeout(() => setHighlightedIndex(-1), 2000);
    }
  };

  const handleLinkedListDelete = () => {
    if (elements.length > 0) {
      const deleted = elements[elements.length - 1];
      setElements(elements.slice(0, -1));
      setOperation(`Delete: Removed "${deleted}" from end - O(1)`);
      setTimeout(() => setOperation(''), 3000);
    }
  };

  const handleLinkedListSearch = () => {
    if (searchElement) {
      const index = elements.indexOf(searchElement);
      if (index !== -1) {
        setHighlightedIndex(index);
        setOperation(`Search: Found "${searchElement}" - O(n)`);
        setTimeout(() => setHighlightedIndex(-1), 3000);
      } else {
        setOperation(`Search: "${searchElement}" not found`);
        setTimeout(() => setOperation(''), 3000);
      }
    }
  };

  const handleLinkedListTraverse = () => {
    let index = 0;
    const traverseNext = () => {
      if (index < elements.length) {
        setHighlightedIndex(index);
        setOperation(`Traverse: Visiting node ${index} - "${elements[index]}"`);
        index++;
        setTimeout(traverseNext, 800);
      } else {
        setHighlightedIndex(-1);
        setOperation('Traverse: Completed - O(n)');
        setTimeout(() => setOperation(''), 2000);
      }
    };
    traverseNext();
  };

  // Stack operations (LIFO - Last In First Out)
  const handleStackPush = () => {
    if (newElement) {
      const newElements = [...elements, newElement]; // Add to end (top)
      setElements(newElements);
      setHighlightedIndex(newElements.length - 1);
      setOperation(`Push: Added "${newElement}" to top - O(1)`);
      setNewElement('');
      setTimeout(() => setHighlightedIndex(-1), 2000);
    }
  };

  const handleStackPop = () => {
    if (elements.length > 0) {
      const popped = elements[elements.length - 1]; // Remove from end (top)
      setElements(elements.slice(0, -1));
      setOperation(`Pop: Removed "${popped}" from top - O(1)`);
      setTimeout(() => setOperation(''), 2000);
    } else {
      setOperation('Pop: Stack is empty!');
      setTimeout(() => setOperation(''), 2000);
    }
  };

  const handleStackPeek = () => {
    if (elements.length > 0) {
      setHighlightedIndex(elements.length - 1);
      setOperation(`Peek: Top element is "${elements[elements.length - 1]}" - O(1)`);
      setTimeout(() => setHighlightedIndex(-1), 2000);
    } else {
      setOperation('Peek: Stack is empty!');
      setTimeout(() => setOperation(''), 2000);
    }
  };

  const handleStackEmpty = () => {
    const isEmpty = elements.length === 0;
    setOperation(`Empty: Stack is ${isEmpty ? 'empty' : 'not empty'} - O(1)`);
    setTimeout(() => setOperation(''), 2000);
  };

  // Queue operations
  const handleQueueEnqueue = () => {
    if (newElement) {
      const newElements = [...elements, newElement];
      setElements(newElements);
      setHighlightedIndex(newElements.length - 1);
      setOperation(`Enqueue: Added "${newElement}" to rear - O(1)`);
      setNewElement('');
      setTimeout(() => setHighlightedIndex(-1), 2000);
    }
  };

  const handleQueueDequeue = () => {
    if (elements.length > 0) {
      const dequeued = elements[0];
      setElements(elements.slice(1));
      setOperation(`Dequeue: Removed "${dequeued}" from front - O(1)`);
      setTimeout(() => setOperation(''), 2000);
    } else {
      setOperation('Dequeue: Queue is empty!');
      setTimeout(() => setOperation(''), 2000);
    }
  };

  const handleQueueFront = () => {
    if (elements.length > 0) {
      setHighlightedIndex(0);
      setOperation(`Front: Front element is "${elements[0]}" - O(1)`);
      setTimeout(() => setHighlightedIndex(-1), 2000);
    } else {
      setOperation('Front: Queue is empty!');
      setTimeout(() => setOperation(''), 2000);
    }
  };

  const handleQueueEmpty = () => {
    const isEmpty = elements.length === 0;
    setOperation(`Empty: Queue is ${isEmpty ? 'empty' : 'not empty'} - O(1)`);
    setTimeout(() => setOperation(''), 2000);
  };

  // Tree operations with traversal order support
  const getInorderPosition = (elements: string[], newElement: string): number => {
    // For BST-like insertion: find correct position based on value comparison
    if (elements.length === 0) return 0;
    // Simple implementation: insert in next available position
    return elements.length;
  };

  const getPreorderPosition = (elements: string[]): number => {
    // Preorder: Root -> Left -> Right
    // Insert in breadth-first order
    return elements.length;
  };

  const getPostorderPosition = (elements: string[]): number => {
    // Postorder: Left -> Right -> Root
    // Insert in breadth-first order
    return elements.length;
  };

  const handleTreeInsert = () => {
    if (newElement && elements.length < 7) {
      let position;
      let orderName = '';
      
      switch (traversalOrder) {
        case 'inorder':
          position = getInorderPosition(elements, newElement);
          orderName = 'Inorder';
          break;
        case 'preorder':
          position = getPreorderPosition(elements);
          orderName = 'Preorder';
          break;
        case 'postorder':
          position = getPostorderPosition(elements);
          orderName = 'Postorder';
          break;
      }
      
      const newElements = [...elements, newElement];
      setElements(newElements);
      setHighlightedIndex(newElements.length - 1);
      setOperation(`Insert (${orderName}): Added "${newElement}" at position ${newElements.length - 1} - O(log n)`);
      setNewElement('');
      setTimeout(() => setHighlightedIndex(-1), 2000);
    } else if (elements.length >= 7) {
      setOperation('Tree is full (max 7 nodes for visualization)');
      setTimeout(() => setOperation(''), 2000);
    }
  };

  const handleTreeDelete = () => {
    if (elements.length > 0) {
      const deleted = elements[elements.length - 1];
      setElements(elements.slice(0, -1));
      setOperation(`Delete: Removed "${deleted}" from position ${elements.length - 1} - O(log n)`);
      setTimeout(() => setOperation(''), 2000);
    }
  };

  const handleTreeSearch = () => {
    if (searchElement) {
      const index = elements.indexOf(searchElement);
      if (index !== -1) {
        setHighlightedIndex(index);
        setOperation(`Search: Found "${searchElement}" in tree - O(log n)`);
        setTimeout(() => setHighlightedIndex(-1), 3000);
      } else {
        setOperation(`Search: "${searchElement}" not found`);
        setTimeout(() => setOperation(''), 3000);
      }
    }
  };

  // Build complete tree from bulk input
  const handleBuildTree = () => {
    if (!bulkInput.trim()) {
      setOperation('Please enter values separated by commas');
      setTimeout(() => setOperation(''), 2000);
      return;
    }

    const values = bulkInput.split(',').map(v => v.trim()).filter(v => v);
    if (values.length > 7) {
      setOperation('Maximum 7 nodes. Using first 7 values.');
      setTimeout(() => setOperation(''), 3000);
    }

    const treeValues = values.slice(0, 7);
    setElements(treeValues);
    setBulkInput('');
    setOperation(`Built tree with ${treeValues.length} node(s): ${treeValues.join(', ')}`);
    setTimeout(() => setOperation(''), 3000);
  };

  const handleTreeTraverse = () => {
    if (elements.length === 0) {
      setOperation('Tree is empty!');
      setTimeout(() => setOperation(''), 2000);
      return;
    }

    let traversalSequence: number[] = [];
    
    // Generate traversal sequence based on selected order
    const inorderTraverse = (index: number) => {
      if (index >= elements.length || !elements[index]) return;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      
      if (leftChild < elements.length && elements[leftChild]) {
        inorderTraverse(leftChild);   // Left
      }
      traversalSequence.push(index); // Root
      if (rightChild < elements.length && elements[rightChild]) {
        inorderTraverse(rightChild);   // Right
      }
    };

    const preorderTraverse = (index: number) => {
      if (index >= elements.length || !elements[index]) return;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      
      traversalSequence.push(index);  // Root
      if (leftChild < elements.length && elements[leftChild]) {
        preorderTraverse(leftChild);    // Left
      }
      if (rightChild < elements.length && elements[rightChild]) {
        preorderTraverse(rightChild);   // Right
      }
    };

    const postorderTraverse = (index: number) => {
      if (index >= elements.length || !elements[index]) return;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      
      if (leftChild < elements.length && elements[leftChild]) {
        postorderTraverse(leftChild);   // Left
      }
      if (rightChild < elements.length && elements[rightChild]) {
        postorderTraverse(rightChild);  // Right
      }
      traversalSequence.push(index);  // Root
    };

    // Execute the selected traversal
    switch (traversalOrder) {
      case 'inorder':
        inorderTraverse(0);
        break;
      case 'preorder':
        preorderTraverse(0);
        break;
      case 'postorder':
        postorderTraverse(0);
        break;
    }

    // Animate the traversal
    let seqIndex = 0;
    const traverseNext = () => {
      if (seqIndex < traversalSequence.length) {
        const nodeIndex = traversalSequence[seqIndex];
        setHighlightedIndex(nodeIndex);
        setOperation(`${traversalOrder.charAt(0).toUpperCase() + traversalOrder.slice(1)} Traverse: Visiting "${elements[nodeIndex]}" (position ${nodeIndex})`);
        seqIndex++;
        setTimeout(traverseNext, 800);
      } else {
        setHighlightedIndex(-1);
        const sequence = traversalSequence.map(i => elements[i]).join(' → ');
        setOperation(`${traversalOrder.charAt(0).toUpperCase() + traversalOrder.slice(1)} Traversal Complete: ${sequence} - O(n)`);
        setTimeout(() => setOperation(''), 3000);
      }
    };
    traverseNext();
  };

  // Hash Table operations
  const hashFunction = (value: string): number => {
    // Simple hash function: sum of character codes modulo 8
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash += value.charCodeAt(i);
    }
    return hash % 8;
  };

  const handleHashInsert = () => {
    if (newElement) {
      const hashIndex = hashFunction(newElement);
      const newElements = [...elements];
      
      // Find next available slot (linear probing)
      let actualIndex = hashIndex;
      for (let i = 0; i < 8; i++) {
        const checkIndex = (hashIndex + i) % 8;
        if (!newElements[checkIndex]) {
          actualIndex = checkIndex;
          break;
        }
      }
      
      if (newElements.filter(e => e).length >= 8) {
        setOperation('Hash table is full (8 buckets)');
        setTimeout(() => setOperation(''), 2000);
        return;
      }
      
      newElements[actualIndex] = newElement;
      setElements(newElements);
      setHighlightedIndex(actualIndex);
      setOperation(`Insert: Hash("${newElement}") = ${hashIndex}, stored at bucket ${actualIndex} - O(1)`);
      setNewElement('');
      setTimeout(() => setHighlightedIndex(-1), 2000);
    }
  };

  const handleHashDelete = () => {
    if (searchElement) {
      const newElements = [...elements];
      const index = newElements.indexOf(searchElement);
      if (index !== -1) {
        const deleted = newElements[index];
        newElements[index] = '';
        setElements(newElements);
        setOperation(`Delete: Removed "${deleted}" from bucket ${index} - O(1)`);
        setTimeout(() => setOperation(''), 2000);
      } else {
        setOperation(`Delete: "${searchElement}" not found`);
        setTimeout(() => setOperation(''), 2000);
      }
    }
  };

  const handleHashSearch = () => {
    if (searchElement) {
      const hashIndex = hashFunction(searchElement);
      const index = elements.indexOf(searchElement);
      if (index !== -1) {
        setHighlightedIndex(index);
        setOperation(`Search: Hash("${searchElement}") = ${hashIndex}, found at bucket ${index} - O(1)`);
        setTimeout(() => setHighlightedIndex(-1), 3000);
      } else {
        setOperation(`Search: Hash("${searchElement}") = ${hashIndex}, not found`);
        setTimeout(() => setOperation(''), 3000);
      }
    }
  };

  const handleHashUpdate = () => {
    if (searchElement && newElement) {
      const newElements = [...elements];
      const index = newElements.indexOf(searchElement);
      if (index !== -1) {
        newElements[index] = newElement;
        setElements(newElements);
        setHighlightedIndex(index);
        setOperation(`Update: Changed "${searchElement}" to "${newElement}" in bucket ${index} - O(1)`);
        setNewElement('');
        setSearchElement('');
        setTimeout(() => setHighlightedIndex(-1), 2000);
      } else {
        setOperation(`Update: "${searchElement}" not found`);
        setTimeout(() => setOperation(''), 2000);
      }
    }
  };

  const renderVisualization = () => {
    switch (structure.id) {
      case 'array':
        return (
          <div className="flex space-x-3 justify-center items-end flex-wrap">
            {elements.map((element, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-xs text-gray-500 mb-1">[{index}]</span>
                <div
                  className={`w-14 h-14 rounded-lg flex items-center justify-center font-mono cursor-pointer transition-all duration-300 ${
                    highlightedIndex === index
                      ? 'bg-yellow-500 text-white scale-110 shadow-lg'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                  onClick={() => handleArrayAccess(index)}
                  title="Click to access"
                >
                  {element}
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'linked-list':
        return (
          <div className="flex items-center justify-center space-x-6">
            {elements.map((element, index) => (
              <div key={index} className="flex items-center">
              <div className={`flex items-center rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                  highlightedIndex === index
                    ? 'bg-yellow-500 text-white scale-110 shadow-lg'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                onClick={() => setHighlightedIndex(index)}
                title="Click to highlight"
              >
                  <span className="font-mono mr-3 text-lg">{element}</span>
                  <div className="w-8 h-8 border-2 border-white rounded-sm flex items-center justify-center">
                    →
                  </div>
                </div>
                {index < elements.length - 1 && (
                  <div className="w-12 h-1 bg-gray-400 mx-3 rounded"></div>
                )}
              </div>
            ))}
            <div className="text-gray-400 font-mono text-lg bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded">
              NULL
            </div>
          </div>
        );
        
      case 'stack':
        return (
          <div className="flex flex-col-reverse items-center space-y-reverse space-y-2">
            <div className="text-gray-500 text-sm mt-4 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
              ↑ Bottom
            </div>
            {elements.map((element, index) => (
              <div
                key={index}
                className={`w-32 h-16 rounded-lg flex items-center justify-center font-mono border-2 cursor-pointer transition-all duration-300 ${
                  highlightedIndex === index
                    ? 'bg-yellow-500 text-white border-yellow-600 scale-105 shadow-lg'
                    : index === elements.length - 1
                    ? 'bg-green-500 text-white border-green-600 hover:bg-green-600'
                    : 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600'
                }`}
                onClick={() => index === elements.length - 1 && handleStackPop()}
                title={index === elements.length - 1 ? 'Click to Pop (Top)' : ''}
              >
                <span className="text-lg">{element}</span>
              </div>
            ))}
            <div className="text-gray-500 text-sm mb-4 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded font-semibold">
              ↓ Top (LIFO)
            </div>
          </div>
        );
        
      case 'queue':
        return (
          <div className="flex items-center justify-center space-x-4">
            <div className="text-gray-500 text-sm bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded">
              Front →
            </div>
            {elements.map((element, index) => (
              <div
                key={index}
                className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono cursor-pointer transition-all duration-300 ${
                  highlightedIndex === index
                    ? 'bg-yellow-500 text-white scale-110 shadow-lg'
                    : index === 0
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                onClick={() => index === 0 && handleQueueDequeue()}
                title={index === 0 ? 'Click to Dequeue' : ''}
              >
                <span className="text-lg">{element}</span>
              </div>
            ))}
            <div className="text-gray-500 text-sm bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded">
              ← Rear
            </div>
          </div>
        );
        
      case 'tree':
        return (
          <div className="relative w-full" style={{ height: '350px' }}>
            {/* SVG for connection lines - positioned absolutely to match nodes */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              {/* Root to Level 2 connections */}
              {elements.length > 1 && elements[1] && (
                <line 
                  x1="50%" y1="40" 
                  x2="30%" y2="130" 
                  stroke="#94a3b8" 
                  strokeWidth="2.5"
                />
              )}
              {elements.length > 2 && elements[2] && (
                <line 
                  x1="50%" y1="40" 
                  x2="70%" y2="130" 
                  stroke="#94a3b8" 
                  strokeWidth="2.5"
                />
              )}
              
              {/* Left child (index 1) to its children */}
              {elements.length > 3 && elements[3] && (
                <line 
                  x1="30%" y1="130" 
                  x2="15%" y2="240" 
                  stroke="#94a3b8" 
                  strokeWidth="2.5"
                />
              )}
              {elements.length > 4 && elements[4] && (
                <line 
                  x1="30%" y1="130" 
                  x2="45%" y2="240" 
                  stroke="#94a3b8" 
                  strokeWidth="2.5"
                />
              )}
              
              {/* Right child (index 2) to its children */}
              {elements.length > 5 && elements[5] && (
                <line 
                  x1="70%" y1="130" 
                  x2="55%" y2="240" 
                  stroke="#94a3b8" 
                  strokeWidth="2.5"
                />
              )}
              {elements.length > 6 && elements[6] && (
                <line 
                  x1="70%" y1="130" 
                  x2="85%" y2="240" 
                  stroke="#94a3b8" 
                  strokeWidth="2.5"
                />
              )}
            </svg>
            
            {/* Nodes - absolutely positioned */}
            <div className="absolute w-full h-full" style={{ zIndex: 1 }}>
              {/* Root - Level 1 (index 0) */}
              {elements.length > 0 && elements[0] && (
                <div 
                  className="absolute" 
                  style={{ left: '50%', top: '10px', transform: 'translateX(-50%)' }}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center font-mono text-lg font-bold transition-all duration-300 shadow-lg ${
                    highlightedIndex === 0
                      ? 'bg-yellow-500 text-white scale-110 shadow-xl ring-4 ring-yellow-300'
                      : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                  }`}>
                    {elements[0]}
                  </div>
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 font-semibold whitespace-nowrap">
                    Root[0]
                  </div>
                </div>
              )}
              
              {/* Level 2 - Left child (index 1) */}
              {elements.length > 1 && elements[1] && (
                <div 
                  className="absolute" 
                  style={{ left: '30%', top: '100px', transform: 'translateX(-50%)' }}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-mono font-semibold transition-all duration-300 shadow-lg ${
                    highlightedIndex === 1
                      ? 'bg-yellow-500 text-white scale-110 shadow-xl ring-4 ring-yellow-300'
                      : 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                  }`}>
                    {elements[1]}
                  </div>
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 font-semibold whitespace-nowrap">
                    Left[1]
                  </div>
                </div>
              )}
              
              {/* Level 2 - Right child (index 2) */}
              {elements.length > 2 && elements[2] && (
                <div 
                  className="absolute" 
                  style={{ left: '70%', top: '100px', transform: 'translateX(-50%)' }}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-mono font-semibold transition-all duration-300 shadow-lg ${
                    highlightedIndex === 2
                      ? 'bg-yellow-500 text-white scale-110 shadow-xl ring-4 ring-yellow-300'
                      : 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                  }`}>
                    {elements[2]}
                  </div>
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 font-semibold whitespace-nowrap">
                    Right[2]
                  </div>
                </div>
              )}
              
              {/* Level 3 - index 3 (left-left) */}
              {elements.length > 3 && elements[3] && (
                <div 
                  className="absolute" 
                  style={{ left: '15%', top: '210px', transform: 'translateX(-50%)' }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-semibold transition-all duration-300 shadow-md ${
                    highlightedIndex === 3
                      ? 'bg-yellow-500 text-white scale-110 shadow-xl ring-4 ring-yellow-300'
                      : 'bg-gradient-to-br from-purple-500 to-purple-600 text-white'
                  }`}>
                    {elements[3]}
                  </div>
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 font-semibold">
                    [3]
                  </div>
                </div>
              )}
              
              {/* Level 3 - index 4 (left-right) */}
              {elements.length > 4 && elements[4] && (
                <div 
                  className="absolute" 
                  style={{ left: '45%', top: '210px', transform: 'translateX(-50%)' }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-semibold transition-all duration-300 shadow-md ${
                    highlightedIndex === 4
                      ? 'bg-yellow-500 text-white scale-110 shadow-xl ring-4 ring-yellow-300'
                      : 'bg-gradient-to-br from-purple-500 to-purple-600 text-white'
                  }`}>
                    {elements[4]}
                  </div>
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 font-semibold">
                    [4]
                  </div>
                </div>
              )}
              
              {/* Level 3 - index 5 (right-left) */}
              {elements.length > 5 && elements[5] && (
                <div 
                  className="absolute" 
                  style={{ left: '55%', top: '210px', transform: 'translateX(-50%)' }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-semibold transition-all duration-300 shadow-md ${
                    highlightedIndex === 5
                      ? 'bg-yellow-500 text-white scale-110 shadow-xl ring-4 ring-yellow-300'
                      : 'bg-gradient-to-br from-purple-500 to-purple-600 text-white'
                  }`}>
                    {elements[5]}
                  </div>
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 font-semibold">
                    [5]
                  </div>
                </div>
              )}
              
              {/* Level 3 - index 6 (right-right) */}
              {elements.length > 6 && elements[6] && (
                <div 
                  className="absolute" 
                  style={{ left: '85%', top: '210px', transform: 'translateX(-50%)' }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-semibold transition-all duration-300 shadow-md ${
                    highlightedIndex === 6
                      ? 'bg-yellow-500 text-white scale-110 shadow-xl ring-4 ring-yellow-300'
                      : 'bg-gradient-to-br from-purple-500 to-purple-600 text-white'
                  }`}>
                    {elements[6]}
                  </div>
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 font-semibold">
                    [6]
                  </div>
                </div>
              )}
            </div>
            
            {/* Empty slots indicator */}
            {elements.length < 7 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full z-10">
                {7 - elements.length} slot{7 - elements.length !== 1 ? 's' : ''} available
              </div>
            )}
          </div>
        );
        
      case 'hash-table':
        return (
          <div className="space-y-4">
            {/* Hash Function Explanation */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
              <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-2 flex items-center">
                <span className="text-lg mr-2">🧮</span>
                Hash Function: sum(char codes) % 8
              </h4>
              <p className="text-sm text-indigo-700 dark:text-indigo-400">
                Each value is converted to a number (hash) to determine which bucket to store it in.
              </p>
            </div>
            
            {/* Hash Table Buckets */}
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 8 }, (_, index) => {
                const element = elements[index] || '';
                const hashValue = element ? hashFunction(element) : null;
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold">
                      Bucket {index}
                    </div>
                    <div className={`w-full h-20 border-2 rounded-lg flex flex-col items-center justify-center font-mono transition-all duration-300 relative ${
                      element
                        ? highlightedIndex === index
                          ? 'bg-yellow-400 text-gray-900 border-yellow-500 scale-105 shadow-lg ring-2 ring-yellow-300'
                          : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-600 shadow-md'
                        : 'border-dashed border-gray-300 dark:border-gray-600 text-gray-400 bg-gray-50 dark:bg-gray-800'
                    }`}>
                      {element ? (
                        <>
                          <span className="font-bold text-lg">{element}</span>
                          {hashValue !== null && hashValue !== index && (
                            <span className="text-xs mt-1 opacity-75">
                              (hash:{hashValue})
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-2xl">∅</span>
                      )}
                    </div>
                    {element && hashValue !== null && (
                      <div className="text-xs mt-1 text-center">
                        {hashValue === index ? (
                          <span className="text-green-600 dark:text-green-400 font-semibold">✓ Perfect hash</span>
                        ) : (
                          <span className="text-orange-600 dark:text-orange-400 font-semibold">⚠ Collision</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Hash Table Info */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {elements.filter(e => e).length}/8
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Filled</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {8 - elements.filter(e => e).length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Empty</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {(() => {
                      let collisions = 0;
                      elements.forEach((el, idx) => {
                        if (el && hashFunction(el) !== idx) collisions++;
                      });
                      return collisions;
                    })()}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Collisions</div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center py-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-6 flex items-center justify-center shadow-lg">
              <Layers className="w-12 h-12 text-white" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Interactive visualization for {structure.name}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {structure.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">{structure.description}</p>
      </div>

      {/* Visualization Area */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 mb-6 min-h-64 flex items-center border border-gray-200 dark:border-gray-700">
        {renderVisualization()}
      </div>

      {/* Operation Status */}
      {operation && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-800 dark:text-green-400 text-sm font-medium">
            {operation}
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="space-y-4 mb-6">
        {/* Input fields */}
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            value={newElement}
            onChange={(e) => setNewElement(e.target.value)}
            placeholder="Enter element..."
            className="flex-1 min-w-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                if (structure.id === 'array') handleArrayInsert();
                else if (structure.id === 'linked-list') handleLinkedListInsert();
                else if (structure.id === 'stack') handleStackPush();
                else if (structure.id === 'queue') handleQueueEnqueue();
                else if (structure.id === 'tree') handleTreeInsert();
                else if (structure.id === 'hash-table') handleHashInsert();
              }
            }}
          />
          {(structure.id === 'array' || structure.id === 'linked-list' || structure.id === 'tree' || structure.id === 'hash-table') && (
            <input
              type="text"
              value={searchElement}
              onChange={(e) => setSearchElement(e.target.value)}
              placeholder="Search element..."
              className="flex-1 min-w-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          )}
        </div>

        {/* Operation-specific buttons */}
        <div className="flex flex-wrap gap-2">
          {structure.id === 'array' && (
            <>
              <button
                onClick={handleArrayInsert}
                disabled={!newElement.trim()}
                className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                ➕ Insert
              </button>
              <button
                onClick={handleArrayDelete}
                disabled={!searchElement.trim()}
                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                ❌ Delete
              </button>
              <button
                onClick={handleArraySearch}
                disabled={!searchElement.trim()}
                className="px-5 py-2.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                🔍 Search
              </button>
              <button
                onClick={() => setElements([])}
                className="px-5 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium text-sm"
              >
                🗑️ Clear
              </button>
            </>
          )}

          {structure.id === 'linked-list' && (
            <>
              <button
                onClick={handleLinkedListInsert}
                disabled={!newElement.trim()}
                className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                ➕ Insert
              </button>
              <button
                onClick={handleLinkedListDelete}
                disabled={elements.length === 0}
                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                ❌ Delete
              </button>
              <button
                onClick={handleLinkedListSearch}
                disabled={!searchElement.trim()}
                className="px-5 py-2.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                🔍 Search
              </button>
              <button
                onClick={handleLinkedListTraverse}
                disabled={elements.length === 0}
                className="px-5 py-2.5 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                🚶 Traverse
              </button>
              <button
                onClick={() => setElements([])}
                className="px-5 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium text-sm"
              >
                🗑️ Clear
              </button>
            </>
          )}

          {structure.id === 'stack' && (
            <>
              <button
                onClick={handleStackPush}
                disabled={!newElement.trim()}
                className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                ⬆️ Push
              </button>
              <button
                onClick={handleStackPop}
                disabled={elements.length === 0}
                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                ⬇️ Pop
              </button>
              <button
                onClick={handleStackPeek}
                disabled={elements.length === 0}
                className="px-5 py-2.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                👁️ Peek
              </button>
              <button
                onClick={handleStackEmpty}
                className="px-5 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors font-medium text-sm"
              >
                ❓ Empty
              </button>
              <button
                onClick={() => setElements([])}
                className="px-5 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium text-sm"
              >
                🗑️ Clear
              </button>
            </>
          )}

          {structure.id === 'queue' && (
            <>
              <button
                onClick={handleQueueEnqueue}
                disabled={!newElement.trim()}
                className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                ➡️ Enqueue
              </button>
              <button
                onClick={handleQueueDequeue}
                disabled={elements.length === 0}
                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                ⬅️ Dequeue
              </button>
              <button
                onClick={handleQueueFront}
                disabled={elements.length === 0}
                className="px-5 py-2.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                👁️ Front
              </button>
              <button
                onClick={handleQueueEmpty}
                className="px-5 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors font-medium text-sm"
              >
                ❓ Empty
              </button>
              <button
                onClick={() => setElements([])}
                className="px-5 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium text-sm"
              >
                🗑️ Clear
              </button>
            </>
          )}

          {structure.id === 'tree' && (
            <>
              {/* Traversal Order Selector */}
              <div className="col-span-full bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
                <label className="block text-sm font-semibold text-purple-900 dark:text-purple-300 mb-2">
                  🔄 Traversal Order:
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTraversalOrder('inorder')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      traversalOrder === 'inorder'
                        ? 'bg-purple-500 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                    }`}
                  >
                    Inorder (L-Root-R)
                  </button>
                  <button
                    onClick={() => setTraversalOrder('preorder')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      traversalOrder === 'preorder'
                        ? 'bg-purple-500 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                    }`}
                  >
                    Preorder (Root-L-R)
                  </button>
                  <button
                    onClick={() => setTraversalOrder('postorder')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      traversalOrder === 'postorder'
                        ? 'bg-purple-500 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                    }`}
                  >
                    Postorder (L-R-Root)
                  </button>
                </div>
              </div>

              {/* Build Complete Tree Input */}
              <div className="col-span-full bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <label className="block text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  🌳 Build Complete Tree (Recommended):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={bulkInput}
                    onChange={(e) => setBulkInput(e.target.value)}
                    placeholder="Enter up to 7 values separated by commas (e.g., A,B,C,D,E,F,G)"
                    className="flex-1 px-4 py-3 border-2 border-blue-300 dark:border-blue-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    onKeyPress={(e) => e.key === 'Enter' && handleBuildTree()}
                  />
                  <button
                    onClick={handleBuildTree}
                    disabled={!bulkInput.trim()}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    🏗️ Build Tree
                  </button>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-2">
                  💡 Format: Enter values separated by commas. Tree will be built in level-order (breadth-first). Maximum 7 nodes for clear visualization.
                </p>
              </div>

              <button
                onClick={handleTreeInsert}
                disabled={!newElement.trim() || elements.length >= 7}
                className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                + Add Node
              </button>
              <button
                onClick={handleTreeDelete}
                disabled={elements.length === 0}
                className="px-4 py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                - Remove Last
              </button>
              <button
                onClick={handleTreeSearch}
                disabled={!searchElement.trim()}
                className="px-5 py-2.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                🔍 Search
              </button>
              <button
                onClick={handleTreeTraverse}
                disabled={elements.length === 0}
                className="px-5 py-2.5 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                🚶 Traverse
              </button>
              <button
                onClick={() => setElements([])}
                className="px-5 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium text-sm"
              >
                🗑️ Clear
              </button>
            </>
          )}

          {structure.id === 'hash-table' && (
            <>
              <button
                onClick={handleHashInsert}
                disabled={!newElement.trim() || elements.filter(e => e).length >= 8}
                className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                ➕ Insert
              </button>
              <button
                onClick={handleHashDelete}
                disabled={!searchElement.trim()}
                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                ❌ Delete
              </button>
              <button
                onClick={handleHashSearch}
                disabled={!searchElement.trim()}
                className="px-5 py-2.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                🔍 Search
              </button>
              <button
                onClick={handleHashUpdate}
                disabled={!searchElement.trim() || !newElement.trim()}
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed text-sm"
              >
                🔄 Update
              </button>
              <button
                onClick={() => setElements(Array(8).fill(''))}
                className="px-5 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium text-sm"
              >
                🗑️ Clear
              </button>
            </>
          )}
        </div>
      </div>

      {/* Operations & Complexity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            Operations
          </h4>
          <div className="space-y-2">
            {structure.operations.map((op) => (
              <div key={op} className="flex justify-between items-center py-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">{op}:</span>
                <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {structure.timeComplexity[op] || 'N/A'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            Use Case
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
            {structure.useCase}
          </p>
        </div>
      </div>
    </div>
  );
};
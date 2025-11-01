import React, { useState } from 'react';
import { Brain, Search, Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

export const AIRecommender: React.FC = () => {
  const { setLastRecommendation, setCurrentView, setSelectedAlgorithm } = useStore();
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!query.trim()) {
      toast.error('Please enter a problem description');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockRecommendations = generateRecommendations(query);
      setRecommendations(mockRecommendations);
      setLastRecommendation(query);
      setIsAnalyzing(false);
      toast.success('Analysis complete!');
    }, 2000);
  };

  const handleSelectAlgorithm = (algorithmId: string) => {
    const algorithm = {
      id: algorithmId,
      name: algorithmId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      category: getAlgorithmCategory(algorithmId),
      description: 'AI recommended algorithm',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      implemented: true,
    };
    
    setSelectedAlgorithm(algorithm);
    setCurrentView('visualizer');
    toast.success(`Visualizing ${algorithm.name}!`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          AI Algorithm Recommender 🤖
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Describe your problem in natural language and get intelligent algorithm recommendations
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-center mb-4">
          <Brain className="w-6 h-6 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Problem Description
          </h3>
        </div>
        
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your problem here... For example:
• 'Find the shortest path between two cities'
• 'Group similar customer profiles for marketing'
• 'Sort a large dataset efficiently'
• 'Detect patterns in time series data'
• 'Optimize resource allocation in a network'"
          className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        />
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            {['Shortest path', 'Data clustering', 'Efficient sorting', 'Pattern matching'].map((example) => (
              <button
                key={example}
                onClick={() => setQuery(example)}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !query.trim()}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Get Recommendations
              </>
            )}
          </button>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              AI Recommendations
            </h3>
          </div>
          
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${rec.color}`}>
                    <rec.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {rec.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {rec.category} • {rec.complexity}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    rec.match >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                    rec.match >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {rec.match}% match
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {rec.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Why it fits:</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {rec.reasons.map((reason: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Use cases:</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {rec.useCases.map((useCase: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-4 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    <strong>Time:</strong> {rec.timeComplexity}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    <strong>Space:</strong> {rec.spaceComplexity}
                  </span>
                </div>
                
                <button
                  onClick={() => handleSelectAlgorithm(rec.id)}
                  className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
                >
                  Visualize
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function generateRecommendations(query: string) {
  const lowerQuery = query.toLowerCase();
  
  // Enhanced pattern matching for more complex queries
  if (lowerQuery.includes('shortest path') || lowerQuery.includes('navigation') || lowerQuery.includes('route') || 
      lowerQuery.includes('minimum distance') || lowerQuery.includes('optimal path') || lowerQuery.includes('gps')) {
    return [
      {
        id: 'dijkstra',
        name: "Dijkstra's Algorithm",
        category: 'Graph Algorithm',
        complexity: 'O((V + E) log V)',
        timeComplexity: 'O((V + E) log V)',
        spaceComplexity: 'O(V)',
        match: 95,
        color: 'bg-blue-500',
        icon: Search,
        description: 'The gold standard for single-source shortest path problems in weighted graphs with non-negative edges. Guarantees optimal solutions.',
        reasons: [
          'Optimal for single-source shortest path problems',
          'Handles weighted graphs with guaranteed optimality',
          'Widely used in GPS navigation systems',
          'Efficient priority queue implementation'
        ],
        useCases: [
          'GPS navigation systems',
          'Network routing protocols',
          'Social network analysis and recommendations',
          'Game pathfinding with terrain costs'
        ]
      },
      {
        id: 'bfs',
        name: 'Breadth-First Search',
        category: 'Graph Algorithm',
        complexity: 'O(V + E)',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        match: 85,
        color: 'bg-green-500',
        icon: Brain,
        description: 'Perfect for unweighted graphs and finding shortest paths in terms of number of edges.',
        reasons: [
          'Optimal for unweighted graphs',
          'Simpler implementation than Dijkstra',
          'Explores nodes level by level',
          'Guaranteed shortest path in unweighted scenarios'
        ],
        useCases: [
          'Social network friend suggestions',
          'Web crawling and site mapping',
          'Puzzle solving (shortest moves)',
          'Network broadcast protocols'
        ]
      },
      {
        id: 'floyd-warshall',
        name: 'A* Search Algorithm',
        category: 'Graph Algorithm',
        complexity: 'O(V³)',
        timeComplexity: 'O(V³)',
        spaceComplexity: 'O(V²)',
        match: 78,
        color: 'bg-purple-500',
        icon: Lightbulb,
        description: 'All-pairs shortest path algorithm that finds shortest paths between every pair of vertices.',
        reasons: [
          'Finds all shortest paths at once',
          'Handles negative edge weights',
          'Simple dynamic programming approach',
          'Good for dense graphs'
        ],
        useCases: [
          'Network analysis and optimization',
          'Transportation planning',
          'Game world connectivity analysis',
          'Social network distance metrics'
        ]
      }
    ];
  }
  
  if (lowerQuery.includes('cluster') || lowerQuery.includes('group') || lowerQuery.includes('similar') ||
      lowerQuery.includes('segment') || lowerQuery.includes('categorize') || lowerQuery.includes('classify')) {
    return [
      {
        id: 'k-means',
        name: 'K-Means Clustering',
        category: 'Machine Learning',
        complexity: 'O(nkt)',
        timeComplexity: 'O(nkt)',
        spaceComplexity: 'O(nk)',
        match: 92,
        color: 'bg-green-500',
        icon: Lightbulb,
        description: 'The most popular unsupervised learning algorithm that partitions data into k clusters by minimizing within-cluster variance.',
        reasons: [
          'Simple and efficient clustering algorithm',
          'Works excellently with spherical, well-separated clusters',
          'Highly scalable to large datasets',
          'Easy to implement and interpret results'
        ],
        useCases: [
          'Customer segmentation for targeted marketing',
          'Image segmentation and compression',
          'Market research and demographic analysis',
          'Data preprocessing for other ML algorithms'
        ]
      },
      {
        id: 'hierarchical-clustering',
        name: 'Hierarchical Clustering',
        category: 'Machine Learning',
        complexity: 'O(n³)',
        timeComplexity: 'O(n³)',
        spaceComplexity: 'O(n²)',
        match: 85,
        color: 'bg-orange-500',
        icon: Brain,
        description: 'Creates a tree of clusters, allowing you to choose the optimal number of clusters after analysis.',
        reasons: [
          'No need to specify number of clusters beforehand',
          'Creates interpretable dendrogram visualization',
          'Works with any distance metric',
          'Deterministic results (no random initialization)'
        ],
        useCases: [
          'Phylogenetic analysis in biology',
          'Social network community detection',
          'Product recommendation systems',
          'Gene expression analysis'
        ]
      },
      {
        id: 'dbscan',
        name: 'DBSCAN Clustering',
        category: 'Machine Learning',
        complexity: 'O(n log n)',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        match: 88,
        color: 'bg-red-500',
        icon: Search,
        description: 'Density-based clustering that can find clusters of arbitrary shape and automatically detects outliers.',
        reasons: [
          'Finds clusters of arbitrary shape',
          'Automatically determines number of clusters',
          'Robust to outliers and noise',
          'No assumption about cluster shape'
        ],
        useCases: [
          'Anomaly detection in cybersecurity',
          'Image processing and computer vision',
          'Geolocation data analysis',
          'Fraud detection in financial data'
        ]
      }
    ];
  }
  
  if (lowerQuery.includes('sort') || lowerQuery.includes('order') || lowerQuery.includes('arrange') ||
      lowerQuery.includes('rank') || lowerQuery.includes('organize') || lowerQuery.includes('sequence')) {
    return [
      {
        id: 'quick-sort',
        name: 'Quick Sort',
        category: 'Sorting Algorithm',
        complexity: 'O(n log n)',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(log n)',
        match: 90,
        color: 'bg-orange-500',
        icon: ArrowRight,
        description: 'The fastest general-purpose sorting algorithm with excellent average-case performance and in-place sorting capability.',
        reasons: [
          'Fastest average-case performance O(n log n)',
          'In-place sorting with minimal memory overhead',
          'Cache-efficient due to good locality of reference',
          'Widely used in standard libraries'
        ],
        useCases: [
          'General-purpose sorting in programming languages',
          'Database indexing and query optimization',
          'Data preprocessing for machine learning',
          'Real-time systems requiring fast sorting'
        ]
      },
      {
        id: 'merge-sort',
        name: 'Merge Sort',
        category: 'Sorting Algorithm',
        complexity: 'O(n log n)',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        match: 88,
        color: 'bg-blue-500',
        icon: Lightbulb,
        description: 'Stable, predictable sorting algorithm with guaranteed O(n log n) performance in all cases.',
        reasons: [
          'Guaranteed O(n log n) in worst case',
          'Stable sorting preserves relative order',
          'Predictable performance characteristics',
          'Excellent for linked lists'
        ],
        useCases: [
          'External sorting for large datasets',
          'Stable sorting requirements',
          'Linked list sorting',
          'Parallel processing applications'
        ]
      },
      {
        id: 'heap-sort',
        name: 'Heap Sort',
        category: 'Sorting Algorithm',
        complexity: 'O(n log n)',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1)',
        match: 82,
        color: 'bg-purple-500',
        icon: Brain,
        description: 'In-place sorting algorithm with guaranteed O(n log n) performance and constant space complexity.',
        reasons: [
          'Guaranteed O(n log n) worst-case performance',
          'In-place sorting with O(1) space complexity',
          'Not affected by input distribution',
          'Useful for priority queue operations'
        ],
        useCases: [
          'Memory-constrained environments',
          'Real-time systems with strict memory limits',
          'Priority queue implementations',
          'Systems requiring predictable performance'
        ]
      }
    ];
  }
  
  if (lowerQuery.includes('search') || lowerQuery.includes('find') || lowerQuery.includes('locate') ||
      lowerQuery.includes('lookup') || lowerQuery.includes('retrieve')) {
    return [
      {
        id: 'binary-search',
        name: 'Binary Search',
        category: 'Search Algorithm',
        complexity: 'O(log n)',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        match: 90,
        color: 'bg-indigo-500',
        icon: Search,
        description: 'The most efficient search algorithm for sorted arrays, eliminating half the search space in each step.',
        reasons: [
          'Extremely efficient O(log n) time complexity',
          'Minimal space requirements O(1)',
          'Simple to implement and understand',
          'Fundamental divide-and-conquer approach'
        ],
        useCases: [
          'Database indexing and queries',
          'Dictionary and phone book lookups',
          'Finding elements in sorted arrays',
          'Debugging and troubleshooting (bisection method)'
        ]
      },
      {
        id: 'hash-table-search',
        name: 'Hash Table Search',
        category: 'Search Algorithm',
        complexity: 'O(1)',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(n)',
        match: 95,
        color: 'bg-green-500',
        icon: Lightbulb,
        description: 'Fastest average-case search with O(1) lookup time using hash functions for direct access.',
        reasons: [
          'Fastest average-case search O(1)',
          'Direct access through hash function',
          'Excellent for frequent lookups',
          'Foundation of modern databases'
        ],
        useCases: [
          'Database indexing and caching',
          'Symbol tables in compilers',
          'Web application session management',
          'Implementing sets and maps'
        ]
      }
    ];
  }

  if (lowerQuery.includes('predict') || lowerQuery.includes('forecast') || lowerQuery.includes('regression') ||
      lowerQuery.includes('trend') || lowerQuery.includes('estimate')) {
    return [
      {
        id: 'linear-regression',
        name: 'Linear Regression',
        category: 'Machine Learning',
        complexity: 'O(n³)',
        timeComplexity: 'O(n³)',
        spaceComplexity: 'O(n²)',
        match: 92,
        color: 'bg-blue-500',
        icon: Brain,
        description: 'Fundamental supervised learning algorithm for predicting continuous values by finding the best linear relationship.',
        reasons: [
          'Simple and interpretable model',
          'Fast training and prediction',
          'Good baseline for regression problems',
          'Provides statistical significance measures'
        ],
        useCases: [
          'Sales forecasting and business analytics',
          'Stock price prediction',
          'Medical diagnosis and treatment planning',
          'Economic modeling and policy analysis'
        ]
      },
      {
        id: 'polynomial-regression',
        name: 'Polynomial Regression',
        category: 'Machine Learning',
        complexity: 'O(n³)',
        timeComplexity: 'O(n³)',
        spaceComplexity: 'O(n²)',
        match: 85,
        color: 'bg-purple-500',
        icon: Lightbulb,
        description: 'Extension of linear regression that can capture non-linear relationships using polynomial features.',
        reasons: [
          'Captures non-linear relationships',
          'Flexible model complexity',
          'Still interpretable with proper degree',
          'Good for curved data patterns'
        ],
        useCases: [
          'Growth curve modeling',
          'Physical phenomena simulation',
          'Market trend analysis',
          'Engineering optimization problems'
        ]
      }
    ];
  }
  return [
    {
      id: 'dynamic-programming',
      name: 'Dynamic Programming',
      category: 'Optimization Technique',
      complexity: 'O(n²)',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n)',
      match: 75,
      color: 'bg-indigo-500',
      icon: Brain,
      description: 'Powerful optimization technique for problems with overlapping subproblems and optimal substructure.',
      reasons: [
        'Solves complex optimization problems efficiently',
        'Avoids redundant calculations through memoization',
        'Applicable to many real-world scenarios',
        'Foundation for advanced algorithms'
      ],
      useCases: [
        'Resource allocation and scheduling',
        'Bioinformatics sequence alignment',
        'Game theory and decision making',
        'Financial portfolio optimization'
      ]
    },
    {
      id: 'greedy-algorithm',
      name: 'Greedy Algorithm',
      category: 'Optimization Technique',
      complexity: 'O(n log n)',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      match: 70,
      color: 'bg-green-500',
      icon: Search,
      description: 'Makes locally optimal choices at each step, hoping to find a global optimum for certain problem types.',
      reasons: [
        'Simple and intuitive approach',
        'Often provides good approximate solutions',
        'Efficient implementation',
        'Works optimally for specific problem classes'
      ],
      useCases: [
        'Activity selection and scheduling',
        'Minimum spanning tree construction',
        'Huffman coding for data compression',
        'Coin change problems (specific denominations)'
      ]
    },
    {
      id: 'backtracking',
      name: 'Backtracking',
      category: 'Search Technique',
      complexity: 'O(2ⁿ)',
      timeComplexity: 'O(2ⁿ)',
      spaceComplexity: 'O(n)',
      match: 68,
      color: 'bg-red-500',
      icon: ArrowRight,
      description: 'Systematic method for solving constraint satisfaction problems by exploring all possible solutions.',
      reasons: [
        'Finds all possible solutions',
        'Prunes invalid paths early',
        'Systematic exploration approach',
        'Guaranteed to find solution if exists'
      ],
      useCases: [
        'Sudoku and puzzle solving',
        'N-Queens problem',
        'Graph coloring problems',
        'Constraint satisfaction in AI'
      ]
    }
  ];
}

  // Enhanced default recommendations with more sophisticated analysis
function getAlgorithmCategory(algorithmId: string): string {
  if (algorithmId.includes('sort')) return 'Sorting';
  if (algorithmId.includes('search')) return 'Searching';
  if (algorithmId.includes('dijkstra') || algorithmId.includes('bfs') || algorithmId.includes('dfs')) return 'Graph';
  if (algorithmId.includes('means') || algorithmId.includes('regression')) return 'Machine Learning';
  return 'Algorithm';
}
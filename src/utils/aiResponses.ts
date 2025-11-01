export function generateAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  // Merge sort
  if (lowerMessage.includes('merge sort') || lowerMessage.includes('mergesort')) {
    return `🔀 **Merge Sort - The Reliable Divide & Conquer Algorithm**

**🔧 How It Works:**
1. **Divide**: Split array into two halves recursively
2. **Conquer**: Sort each half recursively
3. **Merge**: Combine two sorted halves into one sorted array
4. **Base Case**: Single element (already sorted)

**📊 Performance:**
• **All Cases**: O(n log n) - Guaranteed!
• **Space**: O(n) - Requires auxiliary array
• **Stable**: Yes - maintains relative order of equal elements

**🏆 Key Advantages:**
✅ **Predictable**: Always O(n log n), no worst case surprises
✅ **Stable Sort**: Preserves order of equal elements
✅ **Parallelizable**: Easy to implement in parallel
✅ **External Sorting**: Great for sorting data that doesn't fit in memory

**⚠️ Disadvantages:**
❌ Extra space needed (O(n))
❌ Not in-place sorting
❌ Slower than Quick Sort on average for arrays

**💡 When to Use:**
- Need guaranteed O(n log n) performance
- Stability is important
- Sorting linked lists (no extra space needed)
- External sorting of large datasets
- Parallel processing environments

**🎯 Real-World Usage:**
- Java's Collections.sort() for objects
- Python's sorted() and list.sort()
- Sorting large files that don't fit in RAM
- Database systems

🎮 See the merge process visually in our Merge Sort visualizer!`;
  }
  
  // Heap sort
  if (lowerMessage.includes('heap sort') || lowerMessage.includes('heapsort')) {
    return `🏔️ **Heap Sort - In-Place with Guaranteed Performance**

**🔧 How It Works:**
1. **Build Max Heap**: Transform array into max heap structure
2. **Extract Max**: Swap root (max) with last element
3. **Heapify**: Restore heap property for remaining elements
4. **Repeat**: Until all elements are sorted

**📊 Performance:**
• **All Cases**: O(n log n) - Guaranteed!
• **Space**: O(1) - In-place sorting
• **Stable**: No - doesn't preserve equal element order

**🏆 Advantages:**
✅ **Guaranteed O(n log n)**: No worst-case degradation
✅ **In-Place**: No extra memory needed
✅ **No Recursion Overhead**: Iterative implementation possible
✅ **Good for Priority Queues**: Natural fit

**⚠️ Disadvantages:**
❌ Not stable
❌ Slower than Quick Sort on average
❌ Poor cache locality

**💡 When to Use:**
- Need guaranteed O(n log n) without extra space
- Memory is constrained
- Don't need stability
- Implementing priority queues

**🎯 Heap Property:**
- **Max Heap**: Parent ≥ Children
- **Min Heap**: Parent ≤ Children

🎮 Watch heap building and sorting in our visualizer!`;
  }
  
  // Bubble sort
  if (lowerMessage.includes('bubble sort') || lowerMessage.includes('bubblesort')) {
    return `🫧 **Bubble Sort - The Teaching Algorithm**

**🔧 How It Works:**
1. Compare adjacent elements
2. Swap if they're in wrong order
3. Repeat until no swaps needed
4. Largest element "bubbles up" each pass

**📊 Performance:**
• **Best Case**: O(n) - Already sorted (with optimization)
• **Average**: O(n²) - Random order
• **Worst Case**: O(n²) - Reverse sorted
• **Space**: O(1) - In-place
• **Stable**: Yes

**✅ Advantages:**
- Simple to understand and implement
- Detects already sorted arrays efficiently (optimized version)
- Stable sort
- In-place

**❌ Disadvantages:**
- Very slow for large datasets
- O(n²) makes it impractical for real use
- Many unnecessary comparisons

**💡 When to Use:**
- Teaching purposes ONLY
- Tiny datasets (< 10 elements)
- Nearly sorted data with optimized version
- Educational demonstrations

**🎯 Optimization:**
Add flag to detect if any swaps occurred. If no swaps in a pass, array is sorted!

**Real Talk:** Almost never used in production. Learn it to understand sorting concepts, then use better algorithms!

🎮 Perfect for visualizing how sorting works!`;
  }
  
  // Insertion sort  
  if (lowerMessage.includes('insertion sort') || lowerMessage.includes('insertionsort')) {
    return `📌 **Insertion Sort - Simple & Efficient for Small Data**

**🔧 How It Works:**
1. Start with first element (considered sorted)
2. Take next element
3. Insert it into correct position in sorted portion
4. Shift larger elements right
5. Repeat for all elements

**📊 Performance:**
• **Best Case**: O(n) - Already sorted
• **Average**: O(n²) - Random order  
• **Worst Case**: O(n²) - Reverse sorted
• **Space**: O(1) - In-place
• **Stable**: Yes

**🏆 Advantages:**
✅ **Adaptive**: O(n) for nearly sorted data
✅ **Online**: Can sort data as it arrives
✅ **Stable**: Preserves equal element order
✅ **In-Place**: No extra memory
✅ **Simple**: Easy to implement
✅ **Low Overhead**: Fast for small arrays

**💡 When to Use:**
- Small datasets (< 50 elements)
- Nearly sorted data
- Online sorting (streaming data)
- As part of hybrid algorithms (like Timsort)
- When simplicity matters

**🎯 Real-World Usage:**
- Quicksort switches to insertion sort for small subarrays
- Timsort (Python's default) uses it for small runs
- Shell sort is advanced version of insertion sort

**Fun Fact:** Like sorting playing cards in your hand!

🎮 See the insertion process step-by-step!`;
  }
  
  // Selection sort
  if (lowerMessage.includes('selection sort') || lowerMessage.includes('selectionsort')) {
    return `🎯 **Selection Sort - Find Minimum, Repeat**

**🔧 How It Works:**
1. Find minimum element in unsorted portion
2. Swap it with first unsorted element
3. Move boundary of sorted portion forward
4. Repeat until array is sorted

**📊 Performance:**
• **All Cases**: O(n²) - Always the same!
• **Space**: O(1) - In-place
• **Stable**: No (can be made stable with modifications)
• **Swaps**: O(n) - Minimal swaps

**✅ Advantages:**
- Minimal number of swaps: O(n)
- Good when write operations are expensive
- Simple implementation
- In-place sorting

**❌ Disadvantages:**
- Always O(n²) - doesn't adapt to sorted data
- Not stable in standard form
- Slow for large datasets

**💡 When to Use:**
- Write operations are very expensive
- Small datasets
- Memory is extremely limited
- Teaching sorting concepts

**🎯 Special Use Case:**
Flash memory/EEPROM where writes are expensive but reads are cheap.

**Comparison with Bubble Sort:**
- Selection: Fewer swaps, always O(n²)
- Bubble: More swaps, can be O(n) for sorted data

Both are mainly educational algorithms!

🎮 Watch minimum selection in action!`;
  }
  
  // Binary search
  if (lowerMessage.includes('binary search') && !lowerMessage.includes('tree')) {
    return `🎯 **Binary Search - The Logarithmic Power**

**🔧 How It Works:**
1. **Prerequisite**: Array MUST be sorted
2. **Compare**: Check middle element
3. **Decide**: Target < middle? Search left half
4. **Decide**: Target > middle? Search right half
5. **Found**: Target == middle? Done!
6. **Repeat**: Until found or no elements left

**📊 Performance:**
• **All Cases**: O(log n) - Extremely fast!
• **Space**: O(1) iterative, O(log n) recursive
• **Requires**: Sorted array

**🏆 Why It's Amazing:**
✅ **Speed**: Log n means 1 billion items → 30 comparisons max!
✅ **Efficient**: Eliminates half the search space each step
✅ **Scalable**: Works great for large datasets

**💡 When to Use:**
- Searching in sorted array/list
- Finding insertion position
- Finding first/last occurrence
- Range queries in sorted data

**🎯 Variations:**
- **Lower Bound**: First element ≥ target
- **Upper Bound**: First element > target
- **Exact Match**: Find specific element
- **Rotated Array**: Modified binary search

**⚠️ Common Mistakes:**
1. Forgetting array must be sorted
2. Infinite loop: Use mid = left + (right - left) / 2
3. Integer overflow: Avoid (left + right) / 2
4. Off-by-one errors in boundaries

**📚 Real-World:**
- Dictionary lookup
- Database indexing  
- Version control (git bisect)
- Finding bugs in code history

**🎮 Interactive Demo:**
See how search space halves with each comparison!

**Pro Tip:** Master binary search - it's in 50%+ of coding interviews!`;
  }
  
  // Linear search
  if (lowerMessage.includes('linear search')) {
    return `🔍 **Linear Search - The Simple Sequential Approach**

**🔧 How It Works:**
1. Start at first element
2. Check if it matches target
3. If yes, return index
4. If no, move to next element
5. Repeat until found or end of array

**📊 Performance:**
• **Best Case**: O(1) - Target is first element
• **Average**: O(n/2) = O(n) - Target in middle
• **Worst Case**: O(n) - Target at end or not present
• **Space**: O(1)

**✅ Advantages:**
- Works on unsorted data
- Simple to implement
- No preprocessing needed
- Works on any data structure (arrays, linked lists)

**❌ Disadvantages:**
- Slow for large datasets
- Doesn't take advantage of sorted data

**💡 When to Use:**
- Small datasets (< 100 elements)
- Unsorted data
- Searching linked lists
- One-time searches
- When simplicity is priority

**🎯 Comparison:**
| Feature | Linear | Binary |
|---------|--------|--------|
| Sorted? | No | Yes |
| Time | O(n) | O(log n) |
| Simple? | Very | Moderate |

**Real-World:**
- Finding item in shopping cart
- Checking if user exists in small list
- Validating input against small whitelist

**Optimization:** Use sentinels to eliminate boundary checks!

🎮 Watch sequential search in action!`;
  }
  
  // Hash table / HashMap
  if (lowerMessage.includes('hash') && (lowerMessage.includes('table') || lowerMessage.includes('map'))) {
    return `#️⃣ **Hash Tables - O(1) Lookup Magic**

**🔧 How It Works:**
1. **Hash Function**: Converts key → index
2. **Store**: Place value at computed index
3. **Retrieve**: Hash key again to find value
4. **Handle Collisions**: When two keys hash to same index

**📊 Performance:**
• **Average**: O(1) - Insert, Delete, Search
• **Worst Case**: O(n) - All keys hash to same slot
• **Space**: O(n)

**🔑 Collision Resolution:**

**1. Chaining:**
- Each slot contains linked list
- Multiple values can share same slot
- Simple and flexible

**2. Open Addressing:**
- Find next available slot
- Linear probing: Check next slot
- Quadratic probing: Check i² slots away
- Double hashing: Use second hash function

**🏆 Advantages:**
✅ **Fast Average**: O(1) for all operations
✅ **Flexible Keys**: Any hashable type
✅ **Constant Time**: Regardless of size

**⚠️ Disadvantages:**
❌ No ordering maintained
❌ Space overhead
❌ Worst case can be O(n)
❌ Hash function quality critical

**💡 Good Hash Function Properties:**
- Deterministic: Same input → Same output
- Uniform distribution: Minimize collisions
- Fast to compute
- Minimize patterns

**🎯 When to Use:**
- Need fast lookup/insert/delete
- Key-value storage
- Caching
- Counting frequencies
- Detecting duplicates
- Implementing sets

**📚 Real-World:**
- Database indexing
- Caching (LRU cache)
- Symbol tables in compilers
- Browser history
- DNS resolution
- Password storage (with cryptographic hash)

**⚡ Load Factor:**
λ = n / m (items / slots)
- Keep λ < 0.7 for good performance
- Rehash when load factor gets high

**Common Implementations:**
- JavaScript: Object, Map
- Python: dict
- Java: HashMap
- C++: unordered_map

🎮 Visualize hashing and collision resolution!`;
  }
  
  // Time Complexity
  if (lowerMessage.includes('time complexity') || lowerMessage.includes('big o')) {
    return `🕒 **Time Complexity Analysis**

Time complexity describes how runtime grows as input size increases!

**📊 Common Complexities (Best to Worst):**

• **O(1)** - Constant: Array access, hash lookup
• **O(log n)** - Logarithmic: Binary search, balanced trees
• **O(n)** - Linear: Single loop, linear search
• **O(n log n)** - Linearithmic: Merge sort, heap sort
• **O(n²)** - Quadratic: Nested loops, bubble sort
• **O(2ⁿ)** - Exponential: Recursive Fibonacci, subset generation

**🎯 Pro Tips:**
- Always consider worst-case scenarios
- Nested loops often indicate O(n²)
- Divide-and-conquer usually gives O(n log n)
- DP can reduce exponential to polynomial

🔍 Want specifics? Ask about a particular algorithm!`;
  }
  
  // BFS vs DFS
  if (lowerMessage.includes('bfs') && lowerMessage.includes('dfs')) {
    return `🌳 **BFS vs DFS Comparison**

**BFS (Breadth-First Search):**
🔄 Strategy: Explores level by level
📦 Uses: Queue (FIFO)
🎯 Best For: Shortest path in unweighted graphs
⚡ Space: O(V) - can use more memory
✅ Finds minimum distance

**DFS (Depth-First Search):**
🔄 Strategy: Goes as deep as possible first
📦 Uses: Stack (LIFO) or recursion
🎯 Best For: Exploring all paths, detecting cycles
⚡ Space: O(h) - more memory efficient
✅ Better for "existence" problems

**🎮 Real Applications:**
- BFS: Social media connections, GPS routes, web crawling
- DFS: Maze solving, topological sorting, cycle detection

🚀 Try our graph visualizer to see both in action!`;
  }
  
  // Quick Sort
  if (lowerMessage.includes('quick sort') || lowerMessage.includes('quicksort')) {
    return `⚡ **Quick Sort - The Speed Demon!**

**🔧 How It Works:**
1. Choose a pivot element
2. Partition: smaller left, larger right
3. Recursively sort left and right subarrays
4. No merge needed - sorts in place!

**📊 Performance:**
• Best/Average: O(n log n)
• Worst: O(n²) - poor pivot choice
• Space: O(log n) - recursion stack

**🏆 Why It's Amazing:**
✅ In-place sorting
✅ Cache-friendly
✅ Used in most standard libraries
✅ Parallelizable

**💡 Optimization Tricks:**
- Random pivot avoids worst-case
- 3-way partitioning handles duplicates
- Switch to insertion sort for small arrays

🎮 See it in action with our visualizer!`;
  }

  // Dynamic Programming
  if (lowerMessage.includes('dynamic programming') || lowerMessage.includes(' dp ') || lowerMessage.includes('when') && lowerMessage.includes('dp')) {
    return `🧠 **Dynamic Programming Guide**

**🎯 When to Use DP:**
✅ Optimal substructure - optimal solution contains optimal subsolutions
✅ Overlapping subproblems - same problems solved multiple times
✅ Optimization problems - finding max/min or counting

**🔄 Two Approaches:**

**Memoization (Top-Down):**
- Start with original problem
- Break into subproblems recursively
- Cache results
- More intuitive

**Tabulation (Bottom-Up):**
- Start with smallest subproblems
- Build up to original
- Fill table systematically
- More space-efficient

**🏆 Classic Problems:**
- Fibonacci: O(2ⁿ) → O(n)
- 0/1 Knapsack: Max value within weight
- LCS: Longest Common Subsequence
- Edit Distance: String transformation
- Coin Change: Minimum coins needed

**💡 Problem-Solving Steps:**
1. Identify optimal substructure
2. Define recurrence relation
3. Choose memoization or tabulation
4. Implement solution
5. Optimize space if possible

🚀 Try our DP visualizer to see subproblems build up!`;
  }

  // Machine Learning
  if (lowerMessage.includes('machine learning') || lowerMessage.includes(' ml ') || lowerMessage.includes(' ai ')) {
    return `🤖 **Machine Learning Basics**

**🎯 Three Main Types:**

**1. Supervised Learning** 📚
- Learn from labeled examples
- Examples: Classification, regression
- Algorithms: Linear regression, decision trees, neural networks

**2. Unsupervised Learning** 🔍
- Find patterns in unlabeled data
- Examples: Clustering, dimensionality reduction
- Algorithms: K-means, PCA, autoencoders

**3. Reinforcement Learning** 🎮
- Learn through trial and error with rewards
- Examples: Game playing, robotics
- Algorithms: Q-learning, policy gradients

**🔧 Essential Algorithms:**
- Linear Regression: Predict continuous values
- Decision Trees: Easy to interpret
- Neural Networks: Complex pattern recognition
- K-Means: Group similar data points

**🎯 ML Workflow:**
1. Data Collection
2. Preprocessing
3. Model Selection
4. Training
5. Evaluation
6. Deployment
7. Monitoring

**💡 Key Concepts:**
- Overfitting vs Underfitting
- Cross-Validation
- Feature Engineering
- Bias-Variance Tradeoff

🎮 Explore our ML visualizers!`;
  }

  // Recursion
  if (lowerMessage.includes('recursion') || lowerMessage.includes('recursive')) {
    return `🔄 **Recursion Explained**

A function calling itself with smaller inputs!

**🏗️ Anatomy:**
1. **Base Case** 🛑 - Stopping condition
2. **Recursive Case** 🔄 - Function calls itself with smaller input

**📚 Classic Examples:**
- Factorial: n × factorial(n-1)
- Fibonacci: fib(n-1) + fib(n-2)
- Tree Traversal: Natural recursive structure

**💡 When to Use:**
✅ Tree/Graph problems
✅ Divide & Conquer
✅ Mathematical sequences
✅ Backtracking
✅ Parsing nested structures

**⚠️ Pitfalls:**
❌ Stack overflow - too many calls
❌ Inefficiency - repeated calculations
❌ Memory usage - stack space per call

**🚀 Optimizations:**
- Memoization: Cache results
- Tail Recursion: Last operation is recursive call
- Convert to Iteration: Use explicit stack

**🧠 Thinking Recursively:**
1. Identify the pattern
2. Find the base case
3. Define recursive relation
4. Trust the recursion!

🎮 Watch recursion visualizers to see call stack!`;
  }

  // Sorting algorithms
  if (lowerMessage.includes('sorting') || lowerMessage.includes('sort algorithm')) {
    return `🔄 **Sorting Algorithms Overview**

**🎯 Main Categories:**

**Simple Sorts (O(n²)):**
- **Bubble Sort**: Swap adjacent, largest bubbles up
- **Selection Sort**: Find minimum, place at front
- **Insertion Sort**: Insert each into sorted portion
- ✅ Good for: Small arrays, nearly sorted data

**Efficient Sorts (O(n log n)):**
- **Merge Sort**: Divide, sort, merge - stable & predictable
- **Quick Sort**: Pivot partition - fast average case
- **Heap Sort**: Binary heap - in-place & O(n log n) guarantee
- ✅ Good for: Large datasets, general purpose

**Specialized Sorts:**
- **Counting Sort**: O(n+k) for integers in range
- **Radix Sort**: O(d×n) for fixed-length numbers
- **Bucket Sort**: O(n) average for uniform distribution

**📊 Comparison:**
| Algorithm | Time | Space | Stable |
|-----------|------|-------|--------|
| Bubble    | O(n²)| O(1)  | Yes    |
| Merge     | O(n log n)| O(n) | Yes |
| Quick     | O(n log n)| O(log n) | No |
| Heap      | O(n log n)| O(1) | No |

**💡 Choosing the Right One:**
- **Need stability?** → Merge Sort
- **Memory constrained?** → Heap Sort
- **General purpose?** → Quick Sort
- **Nearly sorted?** → Insertion Sort
- **Small array?** → Insertion Sort

🎮 Use our visualizers to compare them side-by-side!`;
  }

  // Searching algorithms
  if (lowerMessage.includes('search') && (lowerMessage.includes('algorithm') || lowerMessage.includes('binary') || lowerMessage.includes('linear'))) {
    return `🔍 **Searching Algorithms**

**🎯 Common Search Methods:**

**Linear Search:**
- Check each element sequentially
- Time: O(n)
- Space: O(1)
- ✅ Works on unsorted data
- ✅ Simple to implement
- Use when: Small dataset or unsorted

**Binary Search:**
- Divide and conquer on sorted data
- Time: O(log n)
- Space: O(1) iterative, O(log n) recursive
- ✅ Very fast for large datasets
- ❌ Requires sorted array
- Use when: Large sorted dataset

**Jump Search:**
- Jump ahead by √n steps
- Time: O(√n)
- Between linear and binary
- Use when: Binary search is complex to implement

**Interpolation Search:**
- Smart guessing based on value
- Time: O(log log n) for uniform data
- Use when: Data uniformly distributed

**Hash-Based Search:**
- Direct access via hash function
- Time: O(1) average
- Space: O(n) for hash table
- Use when: Need fastest possible lookup

**🌳 Tree-Based Search:**
- Binary Search Trees: O(log n) balanced
- B-Trees: Efficient for databases
- Tries: Great for string prefix matching

**💡 Selection Guide:**
- **Unsorted data?** → Linear Search
- **Sorted array?** → Binary Search
- **Need O(1)?** → Hash Table
- **Prefix matching?** → Trie
- **Range queries?** → Binary Search Tree

🎮 Try our search visualizers!`;
  }

  // Graph algorithms
  if (lowerMessage.includes('graph') || lowerMessage.includes('dijkstra') || lowerMessage.includes('shortest path')) {
    return `🌐 **Graph Algorithms**

**🎯 Essential Graph Algorithms:**

**Traversal:**
- **BFS**: Level-order, shortest path (unweighted)
- **DFS**: Explore deep, cycle detection

**Shortest Path:**
- **Dijkstra's**: Weighted graphs, non-negative weights
- **Bellman-Ford**: Handles negative weights
- **A***: Heuristic-guided, optimal & efficient
- **Floyd-Warshall**: All pairs shortest path

**Minimum Spanning Tree:**
- **Prim's**: Grow tree from single vertex
- **Kruskal's**: Sort edges, add if no cycle

**Advanced:**
- **Topological Sort**: Order with dependencies
- **Strongly Connected Components**: Tarjan's/Kosaraju's
- **Network Flow**: Max flow problems

**📊 Complexity Comparison:**
| Algorithm | Time | Use Case |
|-----------|------|----------|
| BFS | O(V+E) | Unweighted shortest path |
| DFS | O(V+E) | Cycle detection, paths |
| Dijkstra | O((V+E)log V) | Weighted shortest path |
| Bellman-Ford | O(VE) | Negative weights |
| A* | O(E) | Optimal heuristic search |

**🎯 When to Use:**
- **Unweighted shortest path?** → BFS
- **Weighted shortest path?** → Dijkstra's or A*
- **Negative weights?** → Bellman-Ford
- **Detect cycles?** → DFS
- **All pairs?** → Floyd-Warshall

🗺️ Explore with our graph visualizer!`;
  }

  // Arrays and strings
  if (lowerMessage.includes('array') || lowerMessage.includes('string')) {
    return `📊 **Arrays & Strings**

**🎯 Common Operations:**

**Array Basics:**
- Access: O(1)
- Search: O(n) unsorted, O(log n) sorted
- Insert: O(n) middle, O(1) end
- Delete: O(n) middle, O(1) end

**Classic Array Problems:**
- Two Sum / Two Pointers
- Sliding Window technique
- Kadane's Algorithm (max subarray)
- Dutch National Flag (3-way partition)
- Rotate array
- Find duplicates

**String Operations:**
- Palindrome checking
- Anagram detection
- String matching (KMP, Rabin-Karp)
- Longest substring problems
- String reversal

**💡 Common Patterns:**

**Two Pointers:**
- One slow, one fast
- Both ends moving inward
- Use for: Pairs, palindromes, partitioning

**Sliding Window:**
- Maintain window of elements
- Expand/contract as needed
- Use for: Subarray problems, longest/shortest substring

**Hash Map:**
- Track frequencies, indices
- O(1) lookup
- Use for: Duplicates, pairs summing to target

**Prefix Sum:**
- Precompute cumulative sums
- O(1) range queries
- Use for: Subarray sum problems

**🚀 Optimization Tips:**
- Use sets for O(1) lookups
- Sort first if order doesn't matter
- Consider space-time tradeoffs
- In-place modifications when possible

🎯 Practice these patterns on our platform!`;
  }

  // Data structures
  if (lowerMessage.includes('data structure') || lowerMessage.includes('stack') || lowerMessage.includes('queue') || lowerMessage.includes('tree') || lowerMessage.includes('heap')) {
    return `📦 **Data Structures Guide**

**🎯 Fundamental Structures:**

**Linear Structures:**
- **Array**: O(1) access, fixed size
- **Linked List**: O(1) insert/delete at head, dynamic
- **Stack** (LIFO): Push/pop O(1), undo mechanisms
- **Queue** (FIFO): Enqueue/dequeue O(1), task scheduling

**Hierarchical:**
- **Binary Tree**: Hierarchical data, O(log n) operations (balanced)
- **BST**: Sorted tree, efficient search/insert
- **Heap**: Priority queue, O(log n) insert/extract
- **Trie**: Prefix tree, string operations

**Hash-Based:**
- **Hash Table**: O(1) average lookup/insert
- **Hash Set**: Unique elements, O(1) contains

**Advanced:**
- **Graph**: Vertices & edges, networks/relationships
- **Disjoint Set**: Union-find, connected components
- **Segment Tree**: Range queries, O(log n) updates

**📊 Selection Guide:**

**Need LIFO?** → Stack
**Need FIFO?** → Queue  
**Fast lookup?** → Hash Table
**Sorted data?** → BST or Heap
**Priority handling?** → Heap
**Hierarchical?** → Tree
**Networks?** → Graph
**Prefix matching?** → Trie

**💡 Trade-offs:**
- Arrays: Fast access, fixed size
- Linked Lists: Dynamic, slower access
- Trees: Balanced operations, complex
- Hash Tables: Fast average, no order

🎮 Build and explore structures interactively!`;
  }

  // Complexity analysis
  if (lowerMessage.includes('complexity') || lowerMessage.includes('analyze')) {
    return `📈 **Complexity Analysis**

**⏱️ Time Complexity:**
Measures how runtime grows with input size

**Common Classes:**
- O(1): Constant - hash lookup
- O(log n): Logarithmic - binary search
- O(n): Linear - loop through all
- O(n log n): Efficient sort - merge/quick sort
- O(n²): Quadratic - nested loops
- O(2ⁿ): Exponential - recursive Fibonacci

**💾 Space Complexity:**
Measures memory usage growth

**Common Cases:**
- O(1): Constant - few variables
- O(log n): Recursion depth - binary search
- O(n): Linear - extra array
- O(n²): Matrix - 2D array

**🔍 How to Analyze:**

**1. Identify Operations:**
- Count significant operations
- Ignore constants

**2. Look for Loops:**
- Single loop: O(n)
- Nested loops: Multiply complexities
- Sequential loops: Add complexities

**3. Recursion:**
- Draw recursion tree
- Count nodes and work per node
- T(n) = branches × T(n/divisor) + work

**4. Amortized Analysis:**
- Average over sequence of operations
- Dynamic array resize: O(1) amortized

**💡 Master Theorem:**
For T(n) = aT(n/b) + O(n^d):
- If a > b^d: O(n^log_b(a))
- If a = b^d: O(n^d × log n)
- If a < b^d: O(n^d)

**🎯 Practical Tips:**
- Focus on worst-case usually
- Constants matter in practice
- Consider both time AND space
- Optimization: Lower complexity first, then constants

📊 Practice analyzing with our algorithm visualizers!`;
  }

  // Binary Search Tree
  if (lowerMessage.includes('bst') || lowerMessage.includes('binary search tree')) {
    return `🌳 **Binary Search Tree (BST) - Ordered Tree Structure**

**🔧 BST Property:**
For every node:
- **Left subtree**: All values < node value
- **Right subtree**: All values > node value
- This property holds recursively

**📊 Performance:**
• **Balanced Tree**: O(log n) - Search, Insert, Delete
• **Unbalanced Tree**: O(n) - Worst case (becomes linked list)
• **Space**: O(n)

**🔍 Operations:**

**Search**: Compare, go left if smaller, right if larger - O(log n) balanced
**Insert**: Find position, add as leaf - O(log n) balanced
**Delete**: 3 cases - leaf, one child, two children - O(log n) balanced

**🎯 Traversals:**
- **Inorder**: Gives sorted order!
- **Preorder**: Root first, good for copying tree
- **Postorder**: Root last, good for deleting tree
- **Level-order**: BFS, level by level

**💡 When to Use:**
Dynamic sorted data, range queries, finding predecessor/successor

🎮 Build and traverse BSTs interactively!`;
  }
  
  // Stack
  if (lowerMessage.includes('stack') && !lowerMessage.includes('call stack')) {
    return `🪬 **Stack - LIFO (Last In, First Out)**

**🔧 Core Operations:**
- **Push**: Add to top - O(1)
- **Pop**: Remove from top - O(1)
- **Peek**: View top - O(1)
- **IsEmpty**: Check if empty - O(1)

**🎯 Real-World Uses:**
1. **Function Call Stack**: Stores function calls and local variables
2. **Undo/Redo**: Text editors, Photoshop
3. **Expression Evaluation**: Postfix, infix to postfix
4. **Backtracking**: DFS, maze solving, puzzle solving
5. **Syntax Parsing**: Balanced parentheses, compilers

**📝 Classic Problems:**
- Balanced parentheses: Push '(', pop and match ')'
- Reverse string: Push all, pop all
- Next greater element: Stack-based O(n) solution

**💡 When to Use:**
LIFO order, recursion to iteration, backtracking, expression parsing

🎮 Watch stack operations visually!`;
  }
  
  // Queue  
  if (lowerMessage.includes('queue') && !lowerMessage.includes('priority')) {
    return `🚦 **Queue - FIFO (First In, First Out)**

**🔧 Core Operations:**
- **Enqueue**: Add to rear - O(1)
- **Dequeue**: Remove from front - O(1)
- **Front/Peek**: View front - O(1)
- **IsEmpty**: Check if empty - O(1)

**🎯 Real-World Uses:**
1. **Task Scheduling**: CPU, print queue, thread pools
2. **BFS Traversal**: Level-order, shortest path
3. **Buffering**: IO buffers, streaming, message queues
4. **Async Processing**: Event handling, callbacks
5. **Resource Sharing**: Printer queue, downloads

**🌟 Variants:**
- **Deque**: Insert/remove both ends
- **Circular Queue**: Efficient space usage
- **Priority Queue**: Serve by priority (heap)

**📝 Classic Problems:**
- Generate binary numbers 1 to n
- Sliding window maximum (deque)
- Level order tree traversal

**💡 When to Use:**
FIFO order, BFS, scheduling, buffering, producer-consumer

🎮 See queue operations in action!`;
  }
  
  // Linked List
  if (lowerMessage.includes('linked list')) {
    return `🔗 **Linked List - Dynamic Linear Structure**

**📚 Types:**
1. **Singly**: One pointer (next) - forward only
2. **Doubly**: Two pointers (next, prev) - both directions
3. **Circular**: Last points to first - no null end

**📊 Operations:**
- **Insert at head**: O(1)
- **Insert at tail**: O(1) with tail pointer, O(n) without
- **Delete**: O(1) if node given, O(n) if searching
- **Search**: O(n) - must traverse

**✅ Advantages:**
Dynamic size, efficient insert/delete at known position, no wasted space

**❌ Disadvantages:**
No random access, extra memory for pointers, cache unfriendly

**📝 Classic Problems:**
- **Reverse list**: 3 pointers or recursive
- **Detect cycle**: Floyd's algorithm (tortoise & hare)
- **Find middle**: Slow/fast pointers
- **Merge sorted lists**: Compare and link
- **Remove Nth from end**: Two pointers n apart

**🎯 Array vs List:**
- Array: O(1) access, O(n) insert/delete, contiguous
- List: O(n) access, O(1) insert/delete*, scattered
*At known position

**💡 When to Use:**
Frequent insertions/deletions, unknown size, implement stacks/queues

🎮 Visualize node connections!`;
  }
  
  // Priority Queue / Heap
  if (lowerMessage.includes('priority queue') || (lowerMessage.includes('heap') && !lowerMessage.includes('sort'))) {
    return `🏆 **Priority Queue - Serve by Priority**

**📚 Concept:**
Elements have priority - highest priority served first!
Usually implemented with **Binary Heap**.

**🔧 Heap Operations:**
- **Insert**: Add element, bubble up - O(log n)
- **Extract-Max/Min**: Remove root, bubble down - O(log n)
- **Peek**: View root - O(1)
- **Build Heap**: From array - O(n)

**🎯 Heap Property:**
- **Max Heap**: Parent ≥ all children
- **Min Heap**: Parent ≤ all children

**📊 Performance:**
All operations O(log n) except peek O(1) and build O(n)

**💡 When to Use:**
- Find kth largest/smallest element
- Merge k sorted arrays
- Task scheduling by priority
- Dijkstra's shortest path
- Huffman coding
- Median of stream

**📝 Classic Problems:**
- **Top K elements**: Use min heap of size k
- **Median of stream**: Two heaps (max for lower, min for upper)
- **Merge k sorted lists**: Min heap with heads

**🎯 Heap vs BST:**
- Heap: Fast min/max, not fully sorted
- BST: Fully sorted, slower min/max

**Real Applications:**
- OS task scheduling
- Event simulation
- Network packet routing
- Load balancing

🎮 Watch heap operations live!`;
  }
  
  // Trie
  if (lowerMessage.includes('trie') || lowerMessage.includes('prefix tree')) {
    return `🌳 **Trie - Prefix Tree for Strings**

**📚 Concept:**
Tree where each path represents a string.
Each node has children for each character.

**🔧 Operations:**
- **Insert**: Add word character by character - O(m) where m = word length
- **Search**: Follow path for word - O(m)
- **StartsWith**: Check if prefix exists - O(m)
- **Delete**: Remove word, clean up unused nodes - O(m)

**🏆 Advantages:**
✅ **Prefix matching**: Very fast
✅ **Autocomplete**: Natural fit
✅ **Spell checking**: Find similar words
✅ **No collisions**: Unlike hash tables

**❌ Disadvantages:**
❌ Space intensive: O(ALPHABET_SIZE × N × M)
❌ More complex than hash table

**💡 When to Use:**
- Autocomplete features
- Spell checkers
- IP routing (longest prefix match)
- Dictionary implementations
- Word games (Boggle solver)

**🎯 Real Applications:**
- Search engine autocomplete
- T9 predictive text
- Browser URL suggestions
- Contact name search
- Network routing tables

**📝 Trie vs Hash Table:**
| Feature | Trie | Hash |
|---------|------|------|
| Prefix search | O(m) | O(n×m) |
| Space | More | Less |
| Collisions | No | Yes |
| Ordered | Yes | No |

**🔥 Compressed Trie:**
Radix tree - compress chains of single-child nodes to save space!

🎮 Build tries and search prefixes!`;
  }
  
  // Graph representations
  if (lowerMessage.includes('graph') && (lowerMessage.includes('represent') || lowerMessage.includes('adjacency'))) {
    return `🗺️ **Graph Representations**

**🎯 Two Main Ways:**

**1. Adjacency Matrix:**
A 2D array where matrix[i][j] = 1 if edge exists from i to j, else 0

**Performance:**
- Space: O(V²)
- Check edge: O(1)
- Find neighbors: O(V)
- Add edge: O(1)
- Add vertex: O(V²) - resize matrix

**Best for:**
✅ Dense graphs (many edges)
✅ Frequent edge lookups
✅ Small graphs

**2. Adjacency List:**
Array of lists where list[i] contains all neighbors of vertex i

**Performance:**
- Space: O(V + E)
- Check edge: O(degree)
- Find neighbors: O(degree)
- Add edge: O(1)
- Add vertex: O(1)

**Best for:**
✅ Sparse graphs (few edges)
✅ Most real-world graphs
✅ Large graphs
✅ Dynamic graphs

**📊 Comparison:**

| Operation | Matrix | List |
|-----------|--------|------|
| Space | O(V²) | O(V+E) |
| Add edge | O(1) | O(1) |
| Check edge | O(1) | O(V) |
| Neighbors | O(V) | O(1) |

**💡 When to Use:**

**Matrix if:**
- Dense graph (E close to V²)
- Frequent edge existence checks
- Small graph
- Matrix operations needed

**List if:**
- Sparse graph (E much less than V²)
- Iterate over neighbors often
- Large graph
- Dynamic (add/remove edges)

**🌟 For Weighted Graphs:**
- Matrix: store weight instead of 1
- List: store (neighbor, weight) pairs

**Real Usage:**
Most algorithms use adjacency lists - real graphs are usually sparse!

🎮 See both representations side by side!`;
  }

  // Default intelligent responses
  const intelligentResponses = [
    `🤔 **Interesting Question!**

I'd love to help! Could you provide more details?

**For better assistance, tell me:**
- What specific algorithm or concept?
- Are you looking for explanation, implementation, or comparison?
- Any particular use case or problem you're solving?
- What programming language do you prefer?

**💡 I can help with:**
- Algorithm explanations (BFS, DFS, Quick Sort, etc.)
- Data structure operations
- Complexity analysis
- Problem-solving strategies
- Code debugging
- Interview preparation

**🎯 Example questions:**
- "Explain how binary search works"
- "When should I use a heap vs BST?"
- "Compare merge sort and quick sort"
- "Help me optimize this O(n²) solution"

What would you like to learn about?`,

    `🎯 **Great Topic!**

I can provide detailed explanations! To give you the best answer:

**📚 Choose what you need:**
- **Concept Explanation**: How does it work?
- **Implementation**: Show me the code
- **Comparison**: vs other approaches
- **Use Cases**: When to use it?
- **Complexity**: Time and space analysis

**🔧 Available Topics:**
- Sorting (Quick, Merge, Heap, Bubble, etc.)
- Searching (Binary, Linear, etc.)
- Graphs (BFS, DFS, Dijkstra, A*)
- Trees (BST, AVL, Heap, Trie)
- Dynamic Programming
- Data Structures (Stack, Queue, etc.)
- Machine Learning basics

**💡 Pro Tip:** Be specific! Instead of "tell me about sorting", try "explain why quick sort is O(n²) worst case"

What specific aspect interests you?`,

    `🚀 **Excellent Question!**

**🎓 Let me guide your learning:**

**For Concepts:**
- Ask: "Explain [algorithm/concept]"
- Example: "Explain breadth-first search"

**For Comparisons:**
- Ask: "Compare X vs Y"
- Example: "Compare stack vs queue"

**For Problems:**
- Describe your scenario
- Example: "Find duplicates in array efficiently"

**For Code:**
- Ask for implementation
- Specify language preference

**🔥 Popular Topics:**
- Time complexity & Big O
- Graph algorithms
- Sorting techniques
- Dynamic programming
- Data structure selection

**🎮 Interactive Learning:**
- Use our visualizers
- Try algorithm games
- Take level assessments
- Track code execution

**💡 Current Page:** You're on the ${lowerMessage.includes('current') ? 'chat page' : 'platform'}. Click "Explain Current Page" for context-specific help!

What would you like to explore?`,
  ];

  const randomResponse = intelligentResponses[Math.floor(Math.random() * intelligentResponses.length)];
  return randomResponse;
}

export function generatePageExplanation(viewName: string): string {
  const pageExplanations: Record<string, string> = {
    'home': `🏠 **Welcome to Your Dashboard!**

This is your command center for algorithm mastery!

**📊 What You'll Find Here:**
• Quick Stats: Track algorithms completed, streak, time, and level
• Quick Actions: Continue learning, track code, play games, ask AI
• Activity Chart: Weekly progress visualization
• Recent Activity: Latest achievements and work

**💡 Pro Tips:**
- Maintain your learning streak with daily goals
- Try different algorithm categories each week
- Use visualizers for better understanding
- Challenge yourself with games

**🚀 Ready to continue?** Pick a quick action or explore the sidebar!`,

    'dashboard': `🏠 **Dashboard Overview**

Your central hub for tracking progress and quick access to all features!

**Key Sections:**
• Performance metrics and statistics
• Weekly activity visualization  
• Quick action buttons for common tasks
• Recent activity feed

**What to do here:** Monitor your progress, jump into learning, or start a game!`,

    'algorithms': `🎯 **Algorithms Library**

Explore comprehensive collection organized by category!

**Categories Available:**
• **Sorting**: Bubble, Insertion, Merge, Quick, Heap Sort
• **Searching**: Linear, Binary, Jump, Interpolation
• **Graph**: BFS, DFS, Dijkstra's, A*
• **Dynamic Programming**: Fibonacci, Knapsack, LCS
• **Machine Learning**: Regression, K-Means, Neural Networks

**How to Use:**
1. Browse categories
2. Select an algorithm
3. Watch interactive visualization
4. Study complexity analysis
5. Practice with code!

**🎮 Each algorithm has an interactive visualizer!**`,

    'visualizer': `🎨 **Algorithm Visualizer**

See algorithms in action with step-by-step animation!

**Features:**
• **Visual Representation**: Bars, colors, animations
• **Code Highlighting**: Current line execution
• **Playback Controls**: Play, pause, step, reset
• **Speed Control**: 0.5x to 3x speed
• **Statistics**: Comparisons, swaps, time tracking

**Color Coding:**
🔵 Blue = Being compared
🟢 Green = Correctly positioned  
🔴 Red = Being moved
🟡 Yellow = Pivot/special element

**💡 Tips:** Start slow, pause often, follow highlighted code!`,

    'data-structures': `📦 **Data Structures Playground**

Interactive visualization of fundamental structures!

**Available:**
1️⃣ **Stack** (LIFO): Push, Pop, Peek
2️⃣ **Queue** (FIFO): Enqueue, Dequeue, Front
3️⃣ **Linked List**: Insert, Delete, Search, Traverse
4️⃣ **Binary Tree**: Insert, Delete, Search, Traversals

**Features:**
• Add/remove elements visually
• See structure reorganization
• Watch traversals animate
• Compare operation speeds

**🎮 Interactive Mode:** Build structures, manipulate, observe!`,

    'code-visualizer': `💻 **Code Lab - Track Execution**

Watch your code execute step-by-step!

**Supports:**
🐍 Python | ☕ Java | 📜 JavaScript | ⚙️ C | ➕ C++

**Features:**
• Write/edit code in multiple languages
• Step-by-step execution tracking
• Real-time variable monitoring
• Visual output display
• Debug mode with breakpoints

**Controls:**
▶️ Run & Visualize | ⏭️ Step Over | 🔄 Reset | ⚡ Speed adjust

**💡 Perfect for:** Understanding algorithm flow and debugging!`,

    'games': `🎮 **Algorithm Games**

Master algorithms through fun challenges!

**Available Games:**
1. **Sort Race** 🏃: Beat the AI at sorting
2. **Binary Hunt** 🎯: Find targets efficiently  
3. **Graph Explorer** 🗺️: Navigate mazes
4. **DP Puzzle** 🧩: Solve optimization problems
5. **ML Predictor** 🤖: Classify data points

**Scoring:**
⭐ Accuracy + ⏱️ Time Bonus + 🎯 Efficiency = 🏅 Total Score

**Why Games Work:**
✅ Active learning beats passive reading
✅ Immediate feedback reinforces concepts
✅ Motivation through achievements
✅ Practical application of theory

**🎯 Perfect for coding interview prep!**`,

    'learning-journey': `🗺️ **Learning Journey**

Structured path from beginner to expert!

**Levels:**
📚 Level 1: Foundations (Basics)
⚡ Level 2: Efficient Algorithms  
🌳 Level 3: Graph Algorithms
🧠 Level 4: Dynamic Programming
🤖 Level 5: Machine Learning

**Assessments:**
• **Level 1**: MCQ Quiz (10 questions)
• **Level 2+**: Coding Challenges (5 problems)
• **Pass Requirement**: 70% score
• **Languages**: Python, Java, C, C++, JavaScript

**Progress:**
🔒 Locked → 🔵 In Progress → ✅ Completed

**🎯 Complete levels to unlock next challenges!**`,

    'chat': `💬 **AI Assistant**

Your 24/7 algorithm mentor - that's me! 👋

**What I Can Help With:**
• Explain algorithms and concepts
• Compare different approaches
• Debug code and logic
• Provide problem-solving strategies
• Suggest best algorithms for your needs
• Interview preparation tips

**Special Features:**
✨ Context-aware responses
🎯 Multi-format explanations
💡 Step-by-step guidance
🔗 Related topic suggestions

**Pro Tips:**
• Be specific in your questions
• Ask follow-ups for clarity
• Request code examples
• Use "Explain Current Page" button

**🚀 Ask me anything about algorithms!**`,

    'ai-recommender': `🎯 **AI Recommender**

Get personalized algorithm suggestions!

**How It Works:**
1. Describe your problem or requirement
2. AI analyzes and considers your context
3. Get tailored algorithm recommendations
4. See why each is suggested
5. Learn implementation guidance

**What to Ask:**
• "Find shortest path in network"
• "Sort million records efficiently"
• "Need O(log n) search"
• "Best for social network analysis"

**Recommendations Include:**
📋 Algorithm name and category
⏱️ Time/space complexity
✅ Best use cases
⚠️ Limitations
🔄 Alternative options

**💡 Get smart, context-aware suggestions!**`,
  };

  return pageExplanations[viewName] || `📍 **Current Page: ${viewName}**

You're viewing the ${viewName} section.

**💡 What You Can Do:**
• Explore interactive features
• Navigate using sidebar
• Ask me specific questions

**🎯 Need Help?** Ask me:
"What features are on this page?"
"How do I use this tool?"
"What should I learn here?"`;
}

# Algorithm Learning Platform

An interactive educational platform for learning computer science algorithms and data structures through visualization, games, and AI-powered guidance.

## 🚀 Features

- **Algorithm Visualizers**: Interactive step-by-step visualizations for sorting, searching, graph algorithms, dynamic programming, and more
- **Data Structures**: Hands-on exploration of arrays, linked lists, stacks, queues, trees, and hash tables
- **Educational Games**: Gamified learning experience with challenges for sorting, searching, pathfinding, and machine learning
- **AI Integration**: Chat interface with intelligent algorithm recommendations
- **Learning Journey**: Guided path with assessments and progress tracking
- **Code Lab**: Multi-language code visualization with execution tracking
- **Dark/Light Mode**: Full theme support for comfortable learning

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM v7
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React, Heroicons
- **AI**: DeepSeek API for enhanced question answering

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd project-main
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### DeepSeek API Configuration (Optional)

To enable enhanced AI capabilities for answering questions outside the predefined algorithm knowledge:

1. Sign up for a DeepSeek API key at [DeepSeek](https://www.deepseek.com/)
2. Create a `.env` file in the project root
3. Add your API key:
   ```
   VITE_DEEPSEEK_API_KEY=your_actual_api_key_here
   ```
4. Restart the development server

With this configuration, the AI assistant will use DeepSeek's powerful models for general questions while still using the fast, built-in responses for algorithm and data structure questions.

## 🏗️ Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🌐 Deployment

This project can be deployed to any static hosting service that supports modern JavaScript applications.

For example, you can deploy to Vercel, GitHub Pages, or any similar service by:

1. Building the project with `npm run build`
2. Uploading the contents of the `dist` folder to your hosting provider

## 📚 Project Structure

```
project-main/
├── src/
│   ├── algorithms/       # Algorithm implementations
│   ├── components/       # React components
│   │   ├── AI/          # AI chat and recommender
│   │   ├── Algorithms/  # Algorithm list
│   │   ├── CodeLab/     # Code visualization
│   │   ├── Dashboard/   # User dashboard
│   │   ├── DataStructures/ # Data structure visualizations
│   │   ├── Games/       # Educational games
│   │   ├── Journey/     # Learning journey
│   │   ├── Layout/      # Header and sidebar
│   │   └── Visualizer/  # Algorithm visualizers
│   ├── data/            # Static data
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Zustand state management
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   └── App.tsx          # Main app component
├── public/              # Static assets
└── package.json         # Dependencies and scripts
```

## 🎓 Learning Modules

1. **Algorithms**: Sorting, Searching, Graph, Dynamic Programming, Greedy, Divide & Conquer
2. **Data Structures**: Arrays, Linked Lists, Stacks, Queues, Trees, Hash Tables
3. **Visualizations**: Step-by-step algorithm execution with highlighting
4. **Games**: Interactive challenges for hands-on learning
5. **AI Assistance**: Context-aware help and recommendations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Built with modern web technologies to make computer science education more interactive and engaging.

---

Made with ❤️ for learners and educators

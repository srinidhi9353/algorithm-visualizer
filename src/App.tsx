import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useStore } from './store/useStore';
import { useTheme } from './hooks/useTheme';
import { LoginPage } from './components/Auth/LoginPage';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { AlgorithmList } from './components/Algorithms/AlgorithmList';
import AlgorithmVisualizer from './components/Visualizer/AlgorithmVisualizer';
import { AIRecommender } from './components/AI/AIRecommender';
import { DataStructuresList } from './components/DataStructures/DataStructuresList';
import { CodeVisualizer } from './components/CodeLab/CodeVisualizer';
import { GamesList } from './components/Games/GamesList';
import { LearningJourney } from './components/Journey/LearningJourney';
import { ChatInterface } from './components/AI/ChatInterface';
import { FloatingChatButton } from './components/AI/FloatingChatButton';

function App() {
  const { currentView, updateStats, isAuthenticated, initializeSession, user } = useStore();
  useTheme(); // Initialize theme hook

  useEffect(() => {
    // Initialize session on app load
    const sessionInitialized = initializeSession();
    if (sessionInitialized) {
      updateStats();
    }
  }, [initializeSession, updateStats]);

  // Update stats when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      updateStats();
    }
  }, [isAuthenticated, user, updateStats]);

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <LoginPage />
        <Toaster position="top-right" />
      </>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <Dashboard />;
      case 'dashboard':
        return <Dashboard />;
      case 'algorithms':
        return <AlgorithmList />;
      case 'visualizer':
        return <AlgorithmVisualizer />;
      case 'ai-recommender':
        return <AIRecommender />;
      case 'data-structures':
        return <DataStructuresList />;
      case 'code-visualizer':
        return <CodeVisualizer />;
      case 'games':
        return <GamesList />;
      case 'learning-journey':
        return <LearningJourney />;
      case 'chat':
        return <ChatInterface />;
      case 'analytics':
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 overflow-x-hidden">
            {renderCurrentView()}
          </main>
        </div>
        <FloatingChatButton />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
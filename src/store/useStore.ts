import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Algorithm, User, GameChallenge, ChatMessage, DashboardStats, CodeExecution } from '../types';
import { gameChallenges } from '../data/games';

interface AppState {
  // Authentication
  isAuthenticated: boolean;
  user: User;
  setAuthenticated: (authenticated: boolean) => void;
  setUser: (user: User) => void;
  logout: () => void;
  initializeSession: () => void;
  
  // Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;

  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Current view
  currentView: string;
  setCurrentView: (view: string) => void;
  
  // Selected algorithm
  selectedAlgorithm: Algorithm | null;
  setSelectedAlgorithm: (algorithm: Algorithm | null) => void;
  
  // Visualization
  isPlaying: boolean;
  currentStep: number;
  animationSpeed: number;
  setIsPlaying: (playing: boolean) => void;
  setCurrentStep: (step: number) => void;
  setAnimationSpeed: (speed: number) => void;
  
  updateUserProgress: (algorithmId: string) => void;
  loadUserFromStorage: () => void;
  
  // Games
  games: GameChallenge[];
  completeGame: (gameId: string, score: number) => void;
  
  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;
  
  // Dashboard
  dashboardStats: DashboardStats;
  updateStats: () => void;
  
  // Code Execution
  codeExecutions: CodeExecution[];
  addCodeExecution: (execution: CodeExecution) => void;
  
  // AI Recommendations
  lastRecommendation: string;
  setLastRecommendation: (recommendation: string) => void;
}

const defaultUser: User = {
  id: '1',
  name: 'Learning Enthusiast',
  email: 'learner@example.com',
  provider: 'email',
  createdAt: new Date(),
  progress: {
    algorithmsCompleted: [],
    gamesCompleted: [],
    totalTimeSpent: 0,
    currentLevel: 1,
    streak: 0,
    lastLoginDate: new Date().toISOString(),
  },
  preferences: {
    theme: 'dark',
    animationSpeed: 1,
    language: 'python',
  },
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: defaultUser,
      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
      setUser: (user) => {
        set({ user });
        // Store user in localStorage for persistence
        // Update stats after setting user
        setTimeout(function() { get().updateStats(); }, 100);
        localStorage.setItem('algovis_current_user', JSON.stringify(user));
      },
      logout: () => {
        localStorage.removeItem('algovis_current_user');
        localStorage.removeItem('algovis_users');
        set({ 
          isAuthenticated: false, 
          user: defaultUser,
          chatMessages: [],
          codeExecutions: [],
          currentView: 'dashboard',
        });
      },
      
      initializeSession: () => {
        try {
          const storedUser = localStorage.getItem('algovis_current_user');
          if (storedUser) {
            const user = JSON.parse(storedUser);
            set({ user, isAuthenticated: true });
            get().updateStats();
            return true;
          }
        } catch (error) {
          console.error('Error initializing session:', error);
          localStorage.removeItem('algovis_current_user');
        }
        return false;
      },

      theme: 'dark',
      setTheme: (theme) => set({ theme }),

      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      currentView: 'home',
      setCurrentView: (view) => set({ currentView: view }),
      
      selectedAlgorithm: null,
      setSelectedAlgorithm: (algorithm) => set({ selectedAlgorithm: algorithm }),
      
      isPlaying: false,
      currentStep: 0,
      animationSpeed: 1,
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      setCurrentStep: (step) => set({ currentStep: step }),
      setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
      
      loadUserFromStorage: () => {
        return get().initializeSession();
      },
      updateUserProgress: (algorithmId) => {
        const state = get();
        const updatedAlgorithms = [...state.user.progress.algorithmsCompleted];
        if (!updatedAlgorithms.includes(algorithmId)) {
          updatedAlgorithms.push(algorithmId);
        }
        
        const updatedUser = {
          ...state.user,
          progress: {
            ...state.user.progress,
            algorithmsCompleted: updatedAlgorithms,
            totalTimeSpent: state.user.progress.totalTimeSpent + 5,
          },
        };
        
        set({
          user: updatedUser,
        });
        
        // Update localStorage
        localStorage.setItem('algovis_current_user', JSON.stringify(updatedUser));
        get().updateStats();
      },
      
      games: gameChallenges,
      completeGame: (gameId, score) => {
        const state = get();
        const updatedGames = state.games.map(game =>
          game.id === gameId ? { ...game, completed: true, score } : game
        );
        
        const updatedUser = {
          ...state.user,
          progress: {
            ...state.user.progress,
            gamesCompleted: [...state.user.progress.gamesCompleted, gameId],
          },
        };
        
        set({ games: updatedGames, user: updatedUser });
        
        // Update localStorage
        localStorage.setItem('algovis_current_user', JSON.stringify(updatedUser));
        get().updateStats();
      },
      
      chatMessages: [],
      addChatMessage: (message) => {
        set(state => ({
          chatMessages: [...state.chatMessages, message],
        }));
      },
      clearChat: () => set({ chatMessages: [] }),
      
      dashboardStats: {
        algorithmsLearned: 0,
        timeSpentToday: 0,
        gamesCompleted: 0,
        currentStreak: 0,
        weeklyProgress: [0, 0, 0, 0, 0, 0, 0],
        totalScore: 0,
        rank: 1,
        achievements: [],
      },
      updateStats: () => {
        const state = get();
        const algorithmsCompleted = state.user.progress.algorithmsCompleted.length;
        const gamesCompleted = state.user.progress.gamesCompleted.length;
        
        set({
          dashboardStats: {
            algorithmsLearned: algorithmsCompleted,
            timeSpentToday: Math.floor(state.user.progress.totalTimeSpent / 60),
            gamesCompleted: gamesCompleted,
            currentStreak: Math.min(algorithmsCompleted, 7),
            weeklyProgress: [2, 3, 1, 4, 2, 5, 3],
            totalScore: algorithmsCompleted * 100 + gamesCompleted * 50,
            rank: Math.max(1, 100 - algorithmsCompleted * 5),
            achievements: [],
          },
        });
      },
      
      codeExecutions: [],
      addCodeExecution: (execution) => {
        set(state => ({
          codeExecutions: [execution, ...state.codeExecutions.slice(0, 9)],
        }));
      },
      
      lastRecommendation: '',
      setLastRecommendation: (recommendation) => set({ lastRecommendation: recommendation }),
    }),
    {
      name: 'algorithm-visualizer-storage',
      partialize: (state) => ({
        theme: state.theme,
        currentView: state.currentView,
        animationSpeed: state.animationSpeed,
      }),
    }
  )
);
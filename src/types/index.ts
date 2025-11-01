export interface Algorithm {
  id: string;
  name: string;
  category: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  implemented: boolean;
  metaphor?: string;
  steps?: string[];
}

export interface VisualizationStep {
  step: number;
  description: string;
  data: any[];
  highlighted: number[];
  code: string;
  variables: { [key: string]: any };
}

export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  provider: 'email' | 'google';
  createdAt: Date;
  progress: {
    algorithmsCompleted: string[];
    gamesCompleted: string[];
    totalTimeSpent: number;
    currentLevel: number;
    streak: number;
    lastLoginDate: string;
  };
  preferences: {
    theme: 'light' | 'dark';
    animationSpeed: number;
    language: 'python' | 'javascript' | 'java' | 'cpp';
  };
}

export interface GameChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  algorithm: string;
  completed: boolean;
  score?: number;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface DashboardStats {
  algorithmsLearned: number;
  timeSpentToday: number;
  gamesCompleted: number;
  currentStreak: number;
  weeklyProgress: number[];
  totalScore: number;
  rank: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
}

export interface CodeExecution {
  id: string;
  code: string;
  language: string;
  input: string;
  output: string;
  steps: ExecutionStep[];
  errors: string[];
  timestamp: Date;
}

export interface ExecutionStep {
  line: number;
  variables: { [key: string]: any };
  output: string;
  description: string;
}
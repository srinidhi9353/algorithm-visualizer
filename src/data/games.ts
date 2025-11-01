import { GameChallenge } from '../types';

export const gameChallenges: GameChallenge[] = [
  {
    id: 'sort-race',
    title: 'Sorting Speed Challenge',
    description: 'Sort the array faster than the computer using bubble sort!',
    difficulty: 'easy',
    algorithm: 'bubble-sort',
    completed: false,
  },
  {
    id: 'binary-hunt',
    title: 'Binary Search Hunt',
    description: 'Find the target number using minimal comparisons.',
    difficulty: 'medium',
    algorithm: 'binary-search',
    completed: false,
  },
  {
    id: 'graph-explorer',
    title: 'Graph Path Master',
    description: 'Navigate the maze using BFS to find the shortest path.',
    difficulty: 'hard',
    algorithm: 'bfs',
    completed: false,
  },
  {
    id: 'dp-puzzle',
    title: 'Dynamic Programming Puzzle',
    description: 'Solve the knapsack problem with optimal strategy.',
    difficulty: 'hard',
    algorithm: 'knapsack',
    completed: false,
  },
  {
    id: 'ml-predictor',
    title: 'ML Pattern Recognition',
    description: 'Train a model to classify data points correctly.',
    difficulty: 'medium',
    algorithm: 'k-means',
    completed: false,
  },
];
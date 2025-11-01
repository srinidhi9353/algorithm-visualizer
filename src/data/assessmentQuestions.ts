// MCQ Questions for Level 1 (Foundations)
export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
}

export interface CodingQuestion {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  testCases: {
    input: string;
    expectedOutput: string;
    description: string;
  }[];
  starterCode: {
    python: string;
    javascript: string;
    java: string;
    c: string;
    cpp: string;
  };
}

export const level1MCQs: MCQQuestion[] = [
  {
    id: 'mcq-1',
    question: 'What is the time complexity of Linear Search in the worst case?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 2,
    explanation: 'Linear search may need to check every element in the worst case, making it O(n).',
    topic: 'Searching',
  },
  {
    id: 'mcq-2',
    question: 'Which sorting algorithm has the best average-case time complexity?',
    options: ['Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Selection Sort'],
    correctAnswer: 2,
    explanation: 'Merge Sort has O(n log n) average-case complexity, which is better than the O(n²) of the others.',
    topic: 'Sorting',
  },
  {
    id: 'mcq-3',
    question: 'What data structure uses LIFO (Last In First Out) principle?',
    options: ['Queue', 'Stack', 'Array', 'Tree'],
    correctAnswer: 1,
    explanation: 'Stack follows LIFO principle where the last element added is the first one removed.',
    topic: 'Data Structures',
  },
  {
    id: 'mcq-4',
    question: 'In Bubble Sort, what happens in each pass?',
    options: [
      'The smallest element moves to the front',
      'The largest element moves to its correct position',
      'Elements are divided into two halves',
      'A pivot element is selected'
    ],
    correctAnswer: 1,
    explanation: 'Bubble Sort compares adjacent elements and the largest element "bubbles up" to its correct position.',
    topic: 'Sorting',
  },
  {
    id: 'mcq-5',
    question: 'What is the space complexity of an array of size n?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 2,
    explanation: 'An array of size n requires O(n) space to store n elements.',
    topic: 'Data Structures',
  },
  {
    id: 'mcq-6',
    question: 'Which operation is NOT typically performed on a queue?',
    options: ['Enqueue', 'Dequeue', 'Push', 'Front'],
    correctAnswer: 2,
    explanation: 'Push is a stack operation. Queues use Enqueue (add) and Dequeue (remove).',
    topic: 'Data Structures',
  },
  {
    id: 'mcq-7',
    question: 'What is the main advantage of Insertion Sort?',
    options: [
      'Best worst-case complexity',
      'Efficient for small or nearly sorted data',
      'Uses divide and conquer',
      'Always O(n log n)'
    ],
    correctAnswer: 1,
    explanation: 'Insertion Sort performs well on small datasets and nearly sorted data.',
    topic: 'Sorting',
  },
  {
    id: 'mcq-8',
    question: 'In a linked list, what does each node typically contain?',
    options: [
      'Only data',
      'Data and pointer to next node',
      'Index and data',
      'Only pointer'
    ],
    correctAnswer: 1,
    explanation: 'Each node in a linked list contains data and a reference (pointer) to the next node.',
    topic: 'Data Structures',
  },
  {
    id: 'mcq-9',
    question: 'What is the worst-case time complexity of Bubble Sort?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'],
    correctAnswer: 2,
    explanation: 'Bubble Sort has nested loops, resulting in O(n²) worst-case complexity.',
    topic: 'Sorting',
  },
  {
    id: 'mcq-10',
    question: 'Which data structure would you use to implement recursion?',
    options: ['Array', 'Queue', 'Stack', 'Tree'],
    correctAnswer: 2,
    explanation: 'The call stack (a stack data structure) is used to manage recursive function calls.',
    topic: 'Data Structures',
  },
];

export const level2CodingQuestions: CodingQuestion[] = [
  {
    id: 'code-1',
    title: 'Binary Search Implementation',
    description: 'Implement binary search to find the index of a target element in a sorted array. Return -1 if not found.',
    difficulty: 'medium',
    topic: 'Searching',
    testCases: [
      {
        input: 'arr = [1, 2, 3, 4, 5, 6, 7], target = 4',
        expectedOutput: '3',
        description: 'Target found at index 3',
      },
      {
        input: 'arr = [1, 3, 5, 7, 9], target = 6',
        expectedOutput: '-1',
        description: 'Target not in array',
      },
      {
        input: 'arr = [10, 20, 30, 40, 50], target = 10',
        expectedOutput: '0',
        description: 'Target at first index',
      },
    ],
    starterCode: {
      python: `def binary_search(arr, target):
    # Write your code here
    left, right = 0, len(arr) - 1
    
    pass`,
      javascript: `function binarySearch(arr, target) {
    // Write your code here
    let left = 0, right = arr.length - 1;
    
}`,
      java: `public static int binarySearch(int[] arr, int target) {
    // Write your code here
    int left = 0, right = arr.length - 1;
    
}`,
      c: `int binary_search(int arr[], int n, int target) {
    // Write your code here
    int left = 0, right = n - 1;
    
}`,
      cpp: `int binarySearch(vector<int>& arr, int target) {
    // Write your code here
    int left = 0, right = arr.size() - 1;
    
}`,
    },
  },
  {
    id: 'code-2',
    title: 'Reverse a Linked List',
    description: 'Given the head of a singly linked list, reverse the list and return the new head.',
    difficulty: 'medium',
    topic: 'Data Structures',
    testCases: [
      {
        input: 'head = [1, 2, 3, 4, 5]',
        expectedOutput: '[5, 4, 3, 2, 1]',
        description: 'Reverse a 5-node list',
      },
      {
        input: 'head = [1, 2]',
        expectedOutput: '[2, 1]',
        description: 'Reverse a 2-node list',
      },
      {
        input: 'head = [1]',
        expectedOutput: '[1]',
        description: 'Single node remains same',
      },
    ],
    starterCode: {
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    # Write your code here
    
    pass`,
      javascript: `class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function reverseList(head) {
    // Write your code here
    
}`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

public static ListNode reverseList(ListNode head) {
    // Write your code here
    
}`,
      c: `struct ListNode {
    int val;
    struct ListNode* next;
};

struct ListNode* reverse_list(struct ListNode* head) {
    // Write your code here
    
}`,
      cpp: `struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) {
    // Write your code here
    
}`,
    },
  },
  {
    id: 'code-3',
    title: 'Find Maximum in Array',
    description: 'Write a function to find the maximum element in an array of integers.',
    difficulty: 'easy',
    topic: 'Arrays',
    testCases: [
      {
        input: 'arr = [3, 7, 2, 9, 1]',
        expectedOutput: '9',
        description: 'Maximum is 9',
      },
      {
        input: 'arr = [-5, -2, -10, -1]',
        expectedOutput: '-1',
        description: 'Maximum among negatives',
      },
      {
        input: 'arr = [42]',
        expectedOutput: '42',
        description: 'Single element',
      },
    ],
    starterCode: {
      python: `def find_maximum(arr):
    # Write your code here
    
    pass`,
      javascript: `function findMaximum(arr) {
    // Write your code here
    
}`,
      java: `public static int findMaximum(int[] arr) {
    // Write your code here
    
}`,
      c: `int find_maximum(int arr[], int n) {
    // Write your code here
    
}`,
      cpp: `int findMaximum(vector<int>& arr) {
    // Write your code here
    
}`,
    },
  },
  {
    id: 'code-4',
    title: 'Check Palindrome String',
    description: 'Determine if a given string is a palindrome (reads the same forwards and backwards). Ignore case and non-alphanumeric characters.',
    difficulty: 'easy',
    topic: 'Strings',
    testCases: [
      {
        input: 's = "racecar"',
        expectedOutput: 'true',
        description: 'Classic palindrome',
      },
      {
        input: 's = "A man, a plan, a canal: Panama"',
        expectedOutput: 'true',
        description: 'Palindrome with punctuation',
      },
      {
        input: 's = "hello"',
        expectedOutput: 'false',
        description: 'Not a palindrome',
      },
    ],
    starterCode: {
      python: `def is_palindrome(s):
    # Write your code here
    
    pass`,
      javascript: `function isPalindrome(s) {
    // Write your code here
    
}`,
      java: `public static boolean isPalindrome(String s) {
    // Write your code here
    
}`,
      c: `#include <stdbool.h>
bool is_palindrome(char* s) {
    // Write your code here
    
}`,
      cpp: `bool isPalindrome(string s) {
    // Write your code here
    
}`,
    },
  },
  {
    id: 'code-5',
    title: 'Merge Sorted Arrays',
    description: 'Merge two sorted arrays into one sorted array.',
    difficulty: 'medium',
    topic: 'Arrays',
    testCases: [
      {
        input: 'arr1 = [1, 3, 5], arr2 = [2, 4, 6]',
        expectedOutput: '[1, 2, 3, 4, 5, 6]',
        description: 'Merge two equal-length arrays',
      },
      {
        input: 'arr1 = [1, 2, 3], arr2 = [4, 5]',
        expectedOutput: '[1, 2, 3, 4, 5]',
        description: 'Different lengths',
      },
      {
        input: 'arr1 = [], arr2 = [1, 2]',
        expectedOutput: '[1, 2]',
        description: 'Empty first array',
      },
    ],
    starterCode: {
      python: `def merge_sorted_arrays(arr1, arr2):
    # Write your code here
    
    pass`,
      javascript: `function mergeSortedArrays(arr1, arr2) {
    // Write your code here
    
}`,
      java: `public static int[] mergeSortedArrays(int[] arr1, int[] arr2) {
    // Write your code here
    
}`,
      c: `int* merge_sorted_arrays(int arr1[], int n1, int arr2[], int n2, int* resultSize) {
    // Write your code here
    
}`,
      cpp: `vector<int> mergeSortedArrays(vector<int>& arr1, vector<int>& arr2) {
    // Write your code here
    
}`,
    },
  },
];

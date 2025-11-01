import { VisualizationStep } from '../types';

export const bubbleSort = (arr: number[]): VisualizationStep[] => {
  const steps: VisualizationStep[] = [];
  const array = [...arr];
  const n = array.length;

  steps.push({
    step: 0,
    description: 'Starting Bubble Sort with initial array',
    data: [...array],
    highlighted: [],
    code: 'function bubbleSort(arr) {',
    variables: { n, i: 0, j: 0 },
  });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        step: steps.length,
        description: `Comparing elements at positions ${j} and ${j + 1}`,
        data: [...array],
        highlighted: [j, j + 1],
        code: `if (arr[${j}] > arr[${j + 1}]) {`,
        variables: { n, i, j, comparing: [array[j], array[j + 1]] },
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        steps.push({
          step: steps.length,
          description: `Swapped ${array[j + 1]} and ${array[j]}`,
          data: [...array],
          highlighted: [j, j + 1],
          code: `  swap(arr, ${j}, ${j + 1});`,
          variables: { n, i, j, swapped: true },
        });
      }
    }
  }

  steps.push({
    step: steps.length,
    description: 'Sorting completed!',
    data: [...array],
    highlighted: [],
    code: 'return arr;',
    variables: { n, sorted: true },
  });

  return steps;
};

export const quickSort = (arr: number[]): VisualizationStep[] => {
  const steps: VisualizationStep[] = [];
  const array = [...arr];

  const partition = (low: number, high: number): number => {
    const pivot = array[high];
    let i = low - 1;

    steps.push({
      step: steps.length,
      description: `Partitioning with pivot ${pivot}`,
      data: [...array],
      highlighted: [high],
      code: `pivot = arr[${high}]; // ${pivot}`,
      variables: { pivot, low, high, i },
    });

    for (let j = low; j < high; j++) {
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        steps.push({
          step: steps.length,
          description: `Swapped ${array[j]} and ${array[i]}`,
          data: [...array],
          highlighted: [i, j],
          code: `swap(arr, ${i}, ${j});`,
          variables: { pivot, low, high, i, j },
        });
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    steps.push({
      step: steps.length,
      description: `Placed pivot ${pivot} in correct position`,
      data: [...array],
      highlighted: [i + 1],
      code: `swap(arr, ${i + 1}, ${high});`,
      variables: { pivot, low, high, pivotIndex: i + 1 },
    });

    return i + 1;
  };

  const quickSortRecursive = (low: number, high: number) => {
    if (low < high) {
      const pi = partition(low, high);
      quickSortRecursive(low, pi - 1);
      quickSortRecursive(pi + 1, high);
    }
  };

  steps.push({
    step: 0,
    description: 'Starting Quick Sort',
    data: [...array],
    highlighted: [],
    code: 'function quickSort(arr, low, high) {',
    variables: { low: 0, high: array.length - 1 },
  });

  quickSortRecursive(0, array.length - 1);

  steps.push({
    step: steps.length,
    description: 'Quick Sort completed!',
    data: [...array],
    highlighted: [],
    code: 'return arr;',
    variables: { sorted: true },
  });

  return steps;
};
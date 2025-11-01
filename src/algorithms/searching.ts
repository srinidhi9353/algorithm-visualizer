import { VisualizationStep } from '../types';

export const linearSearch = (arr: number[], target: number): VisualizationStep[] => {
  const steps: VisualizationStep[] = [];

  steps.push({
    step: 0,
    description: `Starting linear search for target: ${target}`,
    data: [...arr],
    highlighted: [],
    code: `function linearSearch(arr, target) { // target: ${target}`,
    variables: { target, length: arr.length },
  });

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      step: steps.length,
      description: `Checking element at index ${i}: ${arr[i]}`,
      data: [...arr],
      highlighted: [i],
      code: `if (arr[${i}] === ${target}) {`,
      variables: { target, i, current: arr[i] },
    });

    if (arr[i] === target) {
      steps.push({
        step: steps.length,
        description: `Found target ${target} at index ${i}!`,
        data: [...arr],
        highlighted: [i],
        code: `return ${i}; // Found!`,
        variables: { target, i, found: true },
      });
      return steps;
    }
  }

  steps.push({
    step: steps.length,
    description: `Target ${target} not found in array`,
    data: [...arr],
    highlighted: [],
    code: 'return -1; // Not found',
    variables: { target, found: false },
  });

  return steps;
};

export const binarySearch = (arr: number[], target: number): VisualizationStep[] => {
  const steps: VisualizationStep[] = [];
  let left = 0;
  let right = arr.length - 1;

  steps.push({
    step: 0,
    description: `Starting binary search for target: ${target}`,
    data: [...arr],
    highlighted: [],
    code: `function binarySearch(arr, target) { // target: ${target}`,
    variables: { target, left, right, length: arr.length },
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    steps.push({
      step: steps.length,
      description: `Checking middle element at index ${mid}: ${arr[mid]}`,
      data: [...arr],
      highlighted: [mid],
      code: `mid = ${mid}; // arr[mid] = ${arr[mid]}`,
      variables: { target, left, right, mid, current: arr[mid] },
    });

    if (arr[mid] === target) {
      steps.push({
        step: steps.length,
        description: `Found target ${target} at index ${mid}!`,
        data: [...arr],
        highlighted: [mid],
        code: `return ${mid}; // Found!`,
        variables: { target, mid, found: true },
      });
      return steps;
    } else if (arr[mid] < target) {
      left = mid + 1;
      steps.push({
        step: steps.length,
        description: `Target is greater, search right half`,
        data: [...arr],
        highlighted: Array.from({ length: right - left + 1 }, (_, i) => left + i),
        code: `left = ${left};`,
        variables: { target, left, right, mid },
      });
    } else {
      right = mid - 1;
      steps.push({
        step: steps.length,
        description: `Target is smaller, search left half`,
        data: [...arr],
        highlighted: Array.from({ length: right - left + 1 }, (_, i) => left + i),
        code: `right = ${right};`,
        variables: { target, left, right, mid },
      });
    }
  }

  steps.push({
    step: steps.length,
    description: `Target ${target} not found in array`,
    data: [...arr],
    highlighted: [],
    code: 'return -1; // Not found',
    variables: { target, found: false },
  });

  return steps;
};
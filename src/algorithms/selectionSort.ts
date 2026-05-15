import type { SortStep } from './types';

export function selectionSort(input: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...input];
  const n = arr.length;
  const sorted: number[] = [];

  // line map (1-based)
  // 1:  function selectionSort(arr) {
  // 2:    for (let i = 0; i < arr.length - 1; i++) {
  // 3:      let minIdx = i;
  // 4:      for (let j = i + 1; j < arr.length; j++) {
  // 5:        if (arr[j] < arr[minIdx]) {
  // 6:          minIdx = j;
  // 7:        }
  // 8:      }
  // 9:      if (minIdx !== i) {
  // 10:       [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  // 11:     }
  // 12:   }
  // 13:   return arr;
  // 14: }

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: [...sorted],
      overwriting: [],
      codeLine: 3,
      description: `Starting pass ${i + 1}. Assuming position ${i} (value ${arr[i]}) holds the minimum.`,
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, minIdx],
        swapping: [],
        sorted: [...sorted],
        overwriting: [],
        codeLine: 5,
        description: `Comparing ${arr[j]} at position ${j} with current minimum ${arr[minIdx]} at position ${minIdx}.`,
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...arr],
          comparing: [minIdx],
          swapping: [],
          sorted: [...sorted],
          overwriting: [],
          codeLine: 6,
          description: `New minimum found: ${arr[minIdx]} at position ${minIdx}.`,
        });
      }
    }

    if (minIdx !== i) {
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, minIdx],
        sorted: [...sorted],
        overwriting: [],
        codeLine: 10,
        description: `Swapping minimum value ${arr[minIdx]} into position ${i}.`,
      });
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, minIdx],
        sorted: [...sorted],
        overwriting: [],
        codeLine: 10,
        description: `${arr[i]} is now in its correct position at index ${i}.`,
      });
    } else {
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [...sorted],
        overwriting: [],
        codeLine: 9,
        description: `${arr[i]} is already in the correct position — no swap needed.`,
      });
    }

    sorted.push(i);
  }

  sorted.push(n - 1);
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    overwriting: [],
    codeLine: 13,
    description: 'Array is fully sorted!',
  });

  return steps;
}

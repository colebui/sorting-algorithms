import type { SortStep } from './types';

export function bubbleSort(input: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...input];
  const n = arr.length;
  const sorted: number[] = [];

  // line map (1-based, matching codeLines in metadata)
  // 1: function bubbleSort(arr) {
  // 2:   for (let i = 0; i < arr.length - 1; i++) {
  // 3:     for (let j = 0; j < arr.length - 1 - i; j++) {
  // 4:       if (arr[j] > arr[j + 1]) {
  // 5:         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
  // 6:       }
  // 7:     }
  // 8:     // largest element bubbled to end
  // 9:   }
  // 10:  return arr;
  // 11: }

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      // comparing step
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        overwriting: [],
        codeLine: 4,
        description: `Comparing ${arr[j]} and ${arr[j + 1]} at positions ${j} and ${j + 1}.`,
      });

      if (arr[j] > arr[j + 1]) {
        // swap step
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted],
          overwriting: [],
          codeLine: 5,
          description: `Swapping ${arr[j + 1]} and ${arr[j]} — the larger value moves right.`,
        });
      }
    }

    // mark the largest as sorted
    sorted.unshift(n - 1 - i);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      overwriting: [],
      codeLine: 8,
      description: `Pass ${i + 1} complete. ${arr[n - 1 - i]} is now in its final position.`,
    });
  }

  // mark remaining element sorted
  if (!sorted.includes(0)) sorted.unshift(0);
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    overwriting: [],
    codeLine: 10,
    description: 'Array is fully sorted!',
  });

  return steps;
}

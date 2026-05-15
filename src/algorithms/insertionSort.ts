import type { SortStep } from './types';

export function insertionSort(input: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...input];
  const n = arr.length;

  // line map (1-based)
  // 1:  function insertionSort(arr) {
  // 2:    for (let i = 1; i < arr.length; i++) {
  // 3:      const key = arr[i];
  // 4:      let j = i - 1;
  // 5:      while (j >= 0 && arr[j] > key) {
  // 6:        arr[j + 1] = arr[j];
  // 7:        j--;
  // 8:      }
  // 9:      arr[j + 1] = key;
  // 10:   }
  // 11:   return arr;
  // 12: }

  const getSorted = (upTo: number) =>
    Array.from({ length: upTo }, (_, k) => k);

  steps.push({
    array: [...arr],
    comparing: [0],
    swapping: [],
    sorted: [0],
    overwriting: [],
    codeLine: 2,
    description: 'First element is trivially sorted. Beginning with index 1.',
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: getSorted(i),
      overwriting: [],
      codeLine: 3,
      description: `Picking up element ${key} at index ${i} to insert into the sorted portion.`,
    });

    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: getSorted(i),
        overwriting: [],
        codeLine: 5,
        description: `${arr[j]} > ${key} — shifting ${arr[j]} one position right.`,
      });

      arr[j + 1] = arr[j];

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: getSorted(i),
        overwriting: [j + 1],
        codeLine: 6,
        description: `Shifted ${arr[j + 1]} from index ${j} to index ${j + 1}.`,
      });

      j--;
    }

    arr[j + 1] = key;
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: getSorted(i + 1),
      overwriting: [j + 1],
      codeLine: 9,
      description: `Inserted ${key} at index ${j + 1}. Sorted portion now covers 0–${i}.`,
    });
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    overwriting: [],
    codeLine: 11,
    description: 'Array is fully sorted!',
  });

  return steps;
}

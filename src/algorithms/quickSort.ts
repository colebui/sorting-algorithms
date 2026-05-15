import type { SortStep } from './types';

export function quickSort(input: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...input];
  const n = arr.length;

  // line map (1-based)
  // 1:  function quickSort(arr, lo = 0, hi = arr.length - 1) {
  // 2:    if (lo >= hi) return;
  // 3:    const p = partition(arr, lo, hi);
  // 4:    quickSort(arr, lo, p - 1);
  // 5:    quickSort(arr, p + 1, hi);
  // 6:  }
  // 7:  function partition(arr, lo, hi) {
  // 8:    const pivot = arr[hi];
  // 9:    let i = lo - 1;
  // 10:   for (let j = lo; j < hi; j++) {
  // 11:     if (arr[j] <= pivot) {
  // 12:       i++;
  // 13:       [arr[i], arr[j]] = [arr[j], arr[i]];
  // 14:     }
  // 15:   }
  // 16:   [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
  // 17:   return i + 1;
  // 18: }

  const placedPivots: number[] = [];

  function partition(lo: number, hi: number): number {
    const pivot = arr[hi];

    steps.push({
      array: [...arr],
      comparing: [hi],
      swapping: [],
      sorted: [...placedPivots],
      overwriting: [],
      codeLine: 8,
      description: `Pivot chosen: ${pivot} at index ${hi}.`,
    });

    let i = lo - 1;

    for (let j = lo; j < hi; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, hi],
        swapping: [],
        sorted: [...placedPivots],
        overwriting: [],
        codeLine: 11,
        description: `Comparing ${arr[j]} at index ${j} with pivot ${pivot}.`,
      });

      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          steps.push({
            array: [...arr],
            comparing: [],
            swapping: [i, j],
            sorted: [...placedPivots],
            overwriting: [],
            codeLine: 13,
            description: `${arr[j]} ≤ pivot ${pivot} — swapping ${arr[i]} and ${arr[j]}.`,
          });
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({
            array: [...arr],
            comparing: [],
            swapping: [i, j],
            sorted: [...placedPivots],
            overwriting: [],
            codeLine: 13,
            description: `Swapped: ${arr[i]} moved left, ${arr[j]} moved right.`,
          });
        } else {
          steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [...placedPivots],
            overwriting: [i],
            codeLine: 12,
            description: `${arr[j]} ≤ pivot ${pivot} — extending the partition boundary to index ${i}.`,
          });
        }
      }
    }

    // place pivot
    const pivotFinalIdx = i + 1;
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [pivotFinalIdx, hi],
      sorted: [...placedPivots],
      overwriting: [],
      codeLine: 16,
      description: `Placing pivot ${pivot} in its final position at index ${pivotFinalIdx}.`,
    });
    [arr[pivotFinalIdx], arr[hi]] = [arr[hi], arr[pivotFinalIdx]];
    placedPivots.push(pivotFinalIdx);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...placedPivots],
      overwriting: [],
      codeLine: 17,
      description: `Pivot ${pivot} is now at index ${pivotFinalIdx} — its final sorted position.`,
    });

    return pivotFinalIdx;
  }

  function sort(lo: number, hi: number) {
    if (lo >= hi) {
      if (lo === hi && !placedPivots.includes(lo)) {
        placedPivots.push(lo);
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [],
          sorted: [...placedPivots],
          overwriting: [],
          codeLine: 2,
          description: `Single element ${arr[lo]} at index ${lo} — already in sorted position.`,
        });
      }
      return;
    }

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...placedPivots],
      overwriting: [],
      codeLine: 1,
      description: `Quick Sort called on subarray [${lo}–${hi}].`,
    });

    const p = partition(lo, hi);

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...placedPivots],
      overwriting: [],
      codeLine: 4,
      description: `Recursing into left partition [${lo}–${p - 1}].`,
    });
    sort(lo, p - 1);

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...placedPivots],
      overwriting: [],
      codeLine: 5,
      description: `Recursing into right partition [${p + 1}–${hi}].`,
    });
    sort(p + 1, hi);
  }

  sort(0, n - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    overwriting: [],
    codeLine: 1,
    description: 'Quick Sort complete — array is fully sorted!',
  });

  return steps;
}

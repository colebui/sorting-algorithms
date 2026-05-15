import type { SortStep } from './types';

export function mergeSort(input: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...input];
  const n = arr.length;

  // line map (1-based)
  // 1:  function mergeSort(arr, l = 0, r = arr.length - 1) {
  // 2:    if (l >= r) return;
  // 3:    const mid = Math.floor((l + r) / 2);
  // 4:    mergeSort(arr, l, mid);
  // 5:    mergeSort(arr, mid + 1, r);
  // 6:    merge(arr, l, mid, r);
  // 7:  }
  // 8:  function merge(arr, l, mid, r) {
  // 9:    const left = arr.slice(l, mid + 1);
  // 10:   const right = arr.slice(mid + 1, r + 1);
  // 11:   let i = 0, j = 0, k = l;
  // 12:   while (i < left.length && j < right.length) {
  // 13:     if (left[i] <= right[j]) { arr[k++] = left[i++]; }
  // 14:     else { arr[k++] = right[j++]; }
  // 15:   }
  // 16:   while (i < left.length) arr[k++] = left[i++];
  // 17:   while (j < right.length) arr[k++] = right[j++];
  // 18: }

  function merge(l: number, mid: number, r: number) {
    const left = arr.slice(l, mid + 1);
    const right = arr.slice(mid + 1, r + 1);

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      overwriting: Array.from({ length: r - l + 1 }, (_, k) => l + k),
      codeLine: 8,
      description: `Merging subarrays [${l}–${mid}] and [${mid + 1}–${r}].`,
    });

    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
      steps.push({
        array: [...arr],
        comparing: [l + i, mid + 1 + j],
        swapping: [],
        sorted: [],
        overwriting: [],
        codeLine: 12,
        description: `Comparing ${left[i]} (left) and ${right[j]} (right).`,
      });

      if (left[i] <= right[j]) {
        arr[k] = left[i];
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [],
          sorted: [],
          overwriting: [k],
          codeLine: 13,
          description: `Placing ${left[i]} at index ${k} (from left half).`,
        });
        i++; k++;
      } else {
        arr[k] = right[j];
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [],
          sorted: [],
          overwriting: [k],
          codeLine: 14,
          description: `Placing ${right[j]} at index ${k} (from right half).`,
        });
        j++; k++;
      }
    }

    while (i < left.length) {
      arr[k] = left[i];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [],
        overwriting: [k],
        codeLine: 16,
        description: `Copying remaining left element ${left[i]} to index ${k}.`,
      });
      i++; k++;
    }

    while (j < right.length) {
      arr[k] = right[j];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [],
        overwriting: [k],
        codeLine: 17,
        description: `Copying remaining right element ${right[j]} to index ${k}.`,
      });
      j++; k++;
    }
  }

  function sort(l: number, r: number) {
    if (l >= r) {
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [],
        overwriting: [],
        codeLine: 2,
        description:
          l === r
            ? `Single element ${arr[l]} at index ${l} — already sorted.`
            : 'Empty subarray — base case reached.',
      });
      return;
    }

    const mid = Math.floor((l + r) / 2);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      overwriting: [],
      codeLine: 3,
      description: `Dividing [${l}–${r}] at midpoint ${mid}.`,
    });

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      overwriting: [],
      codeLine: 4,
      description: `Recursing into left half [${l}–${mid}].`,
    });
    sort(l, mid);

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      overwriting: [],
      codeLine: 5,
      description: `Recursing into right half [${mid + 1}–${r}].`,
    });
    sort(mid + 1, r);

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      overwriting: [],
      codeLine: 6,
      description: `Merging halves [${l}–${mid}] and [${mid + 1}–${r}].`,
    });
    merge(l, mid, r);
  }

  sort(0, n - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    overwriting: [],
    codeLine: 1,
    description: 'Merge Sort complete — array is fully sorted!',
  });

  return steps;
}

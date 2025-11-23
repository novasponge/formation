import { Trace, SortingAlgorithm } from './types';
import Stick from '../stick';

const swap = (arr: Stick[], i: number, j: number, traces: Trace[]): void => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  traces.push(["swap", arr[i].pos!, arr[j].pos!, "Sorting"]);
};

export const mergeSort: SortingAlgorithm = (arr) => {
  const traces: Trace[] = [];
  sort(arr, traces);
  return traces;
};

function perm_to_swaps(perm: number[]): [number, number][] {
  let n = perm.length;
  let used: boolean[] = [];
  for (let i = 0; i < n; i++) {
    used.push(false);
  }

  let swaps: [number, number][] = [];

  for (let i = 0; i < n; i++) {
    if (used[i]) {
      continue;
    }
    let current = i;
    if (perm[i] == i) {
      used[i] = true;
    }
    while (!used[perm[current]]) {
      swaps.push([current, perm[current]]);
      used[current] = true;
      current = perm[current];
    }
  }

  return swaps;
}

function sort(arr: Stick[], traces: Trace[], left?: number, right?: number): void {
  if (!left) {
    left = 0;
  }

  if (!right) {
    right = arr.length - 1;
  }

  let mid = Math.floor((left + right) / 2);

  if (left >= right) {
    return;
  }

  if (right - left > 1) {
    sort(arr, traces, left, mid);
    sort(arr, traces, mid + 1, right);
  }

  let next_left = left;
  let next_right = mid + 1;
  const perm: number[] = [];
  for (let i = left; i <= right; i++) {
    let choice: 'L' | 'R' | undefined;
    if (next_left <= mid && next_right <= right) {
      traces.push(["compare", arr[next_left].pos!, arr[next_right].pos!, "Sorting"]);
      if (arr[next_left].pos! < arr[next_right].pos!) {
        choice = 'L';
      } else {
        choice = 'R';
      }
    } else if (next_left > mid) {
      choice = 'R';
    } else if (next_right > right) {
      choice = 'L';
    }

    if (choice === 'L') {
      perm.push(next_left - left);
      next_left++;
    } else if (choice === 'R') {
      perm.push(next_right - left);
      next_right++;
    }
  }
  let swaps = perm_to_swaps(perm);
  for (let i = 0; i < swaps.length; i++) {
    swap(arr, swaps[i][0] + left, swaps[i][1] + left, traces);
  }
}

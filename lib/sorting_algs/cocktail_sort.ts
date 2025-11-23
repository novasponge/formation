import { Trace, SortingAlgorithm } from './types';
import Stick from '../stick';

const swap = (arr: Stick[], i: number, j: number, traces: Trace[]): void => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  traces.push(["swap", arr[i].pos!, arr[j].pos!, "Sorting"]);
};

export const cocktailSort: SortingAlgorithm = (arr) => {
  const traces: Trace[] = [];
  sort(arr, traces);
  return traces;
};

function sort(arr: Stick[], traces: Trace[]): void {
  let n = arr.length;
  let left = 0;
  let right = n - 1;
  while (left < right) {
    let new_right = right - 1;
    for (let i = left; i + 1 <= right; i++) {
      traces.push(["compare", arr[i].pos!, arr[i + 1].pos!, "Sorting"]);
      if (arr[i + 1].pos! < arr[i].pos!) {
        swap(arr, i + 1, i, traces);
        new_right = i;
      }
    }
    right = new_right;
    let new_left = left + 1;
    for (let i = right; i - 1 >= left; i--) {
      traces.push(["compare", arr[i].pos!, arr[i - 1].pos!, "Sorting"]);
      if (arr[i].pos! < arr[i - 1].pos!) {
        swap(arr, i, i - 1, traces);
        new_left = i;
      }
    }
    left = new_left;
  }
}

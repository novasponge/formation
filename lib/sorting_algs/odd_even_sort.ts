import { Trace, SortingAlgorithm } from './types';
import Stick from '../stick';

const swap = (arr: Stick[], i: number, j: number, traces: Trace[]): void => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  traces.push(["swap", arr[i].pos!, arr[j].pos!, "Sorting"]);
};

export const oddEvenSort: SortingAlgorithm = (arr) => {
  const traces: Trace[] = [];
  sort(arr, traces);
  return traces;
};

function sort(arr: Stick[], traces: Trace[]): void {
  let len = arr.length;
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let p = 0; p <= 1; p++) {
      for (let i = p; i + 1 < len; i += 2) {
        traces.push(["compare", arr[i].pos!, arr[i + 1].pos!, "Sorting"]);
        if (arr[i + 1].pos! < arr[i].pos!) {
          swap(arr, i + 1, i, traces);
          sorted = false;
        }
      }
    }
  }
}

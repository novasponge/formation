import { Trace, SortingAlgorithm } from './types';
import Stick from '../stick';

const swap = (arr: Stick[], i: number, j: number, traces: Trace[]): void => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  traces.push(["swap", arr[i].pos!, arr[j].pos!, "Sorting"]);
};

export const insertionSort: SortingAlgorithm = (arr) => {
  const traces: Trace[] = [];
  sort(arr, traces);
  return traces;
};

function sort(arr: Stick[], traces: Trace[]): void {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      traces.push(["compare", arr[j].pos!, arr[j - 1].pos!, "Sorting"]);
      if (arr[j].pos! < arr[j - 1].pos!) {
        swap(arr, j, j - 1, traces);
      } else {
        break;
      }
    }
  }
}

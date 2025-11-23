import { Trace, SortingAlgorithm } from './types';
import Stick from '../stick';

const swap = (arr: Stick[], i: number, j: number, traces: Trace[]): void => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  traces.push(["swap", arr[i].pos!, arr[j].pos!, "Sorting"]);
};

export const bitonicSort: SortingAlgorithm = (arr) => {
  const traces: Trace[] = [];
  const ASC = true;
  sort(arr, 0, arr.length, ASC, traces);
  return traces;
};

function sort(arr: Stick[], lo: number, hi: number, dir: boolean, traces: Trace[]): void {
  if (hi > 1) {
    let m = Math.floor(hi / 2);
    sort(arr, lo, m, !dir, traces);
    sort(arr, lo + m, hi - m, dir, traces);
    bitonicMerge(arr, lo, hi, dir, traces);
  }
}

function bitonicMerge(arr: Stick[], lo: number, hi: number, dir: boolean, traces: Trace[]): void {
  if (hi > 1) {
    let m = greatestPowerOfTwoLessThan(hi);
    for (let i = lo; i < lo + hi - m; i++) {
      compare(arr, i, i + m, dir, traces);
    }
    bitonicMerge(arr, lo, m, dir, traces);
    bitonicMerge(arr, lo + m, hi - m, dir, traces);
  }
}

function compare(arr: Stick[], i: number, j: number, dir: boolean, traces: Trace[]): void {
  if (dir === (arr[i].pos! > arr[j].pos!)) {
    traces.push(["compare", arr[i].pos!, arr[j].pos!, "Sorting"]);
    swap(arr, i, j, traces);
  }
}

function greatestPowerOfTwoLessThan(n: number): number {
  let k = 1;
  while (k < n) {
    k = k << 1;
  }
  return k >> 1;
}

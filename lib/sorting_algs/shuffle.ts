import { Trace, SortingAlgorithm } from './types';

export const shuffle: SortingAlgorithm = (arr) => {
  let n = arr.length, t, i;
  let traces: Trace[] = [];
  while (n) {
    i = Math.random() * n-- | 0;
    t = arr[n];
    arr[n] = arr[i];
    arr[i] = t;
    traces.push(["swap", arr[n].pos!, arr[i].pos!, "Shuffling"]);
  }
  traces[traces.length - 1][3] = "Shuffled";
  return traces;
};

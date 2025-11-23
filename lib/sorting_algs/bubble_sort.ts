import { Trace, SortingAlgorithm } from './types';

export const bubbleSort: SortingAlgorithm = (arr) => {
  let traces: Trace[] = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      traces.push(["compare", arr[i].pos!, arr[j].pos!, "Sorting"]);
      if (arr[i].pos! > arr[j].pos!) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        traces.push(["swap", arr[i].pos!, arr[j].pos!, "Sorting"]);
      }
    }
  }
  return traces;
};

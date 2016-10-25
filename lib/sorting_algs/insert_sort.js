const swap = (arr, i, j, traces) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  traces.push(["swap", i, j]);
};

export const insertionSort = (arr) => {
  const traces = [];
  sort(arr, traces);
  return traces;
};

function sort(arr, traces) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      traces.push(["compare", j, j-1]);
      if (arr[j].pos < arr[j-1].pos) {
        swap(arr, j, j-1, traces);
      } else {
        break;
      }
    }
  }
}

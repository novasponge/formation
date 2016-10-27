const swap = (arr, i, j, traces) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  traces.push(["swap", i, j, "Sorting"]);
};

export const cockTailSort = (arr) => {
  const traces = [];
  sort(arr, traces);
  return traces;
};


function sort(arr, traces) {
  let n = arr.length;
  let left = 0;
  let right = n - 1;
  while (left < right) {
    let new_right = right - 1;
    for (let i = left; i + 1 <= right; i++) {
      traces.push(["compare", i, i + 1, "Sorting"]);
      if (arr[i + 1].pos < arr[i].pos) {
        swap(arr, i + 1, i, traces);
        new_right = i;
      }
    }
    right = new_right;
    let new_left = left + 1;
    for (let i = right; i - 1 >= left; i--)  {
      traces.push(["compare", i, i - 1, "Sorting"]);
      if (arr[i].pos < arr[i - 1].pos) {
        swap(arr, i, i - 1, traces);
        new_left = i;
      }
    }
    left = new_left;
  }
}

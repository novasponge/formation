const swap = (arr, i, j, traces) => {
  const temp = arr[i-1];
  arr[i-1] = arr[j-1];
  arr[j-1] = temp;
  traces.push(["swap", i-1, j-1, "Sorting"]);
};

export const heapSort = (arr) => {
  const traces = [];
  sort(arr, traces);
  return traces;
};

function sort(arr, traces) {
  let len = arr.length;
  for (let k = Math.floor(len/2); k >= 1; k--) {
    sink(arr, k, len, traces);
  }
  while (len > 1) {
    swap(arr, 1, len--, traces);
    sink(arr, 1, len, traces);
  }
}

function sink(arr, k, n, traces) {
  while (2*k <= n) {
    let j= 2*k;
    if (j < n && less(arr, j, j+1, traces)) {
      j++;
    }
    if (!less(arr, k, j, traces)) {
      break;
    }
    swap(arr, k, j, traces);
    k = j;
  }
}

function less(arr, i, j, traces) {
  traces.push(["compare", i-1, j-1, "Sorting"]);
  return arr[i-1].pos < arr[j-1].pos;
}

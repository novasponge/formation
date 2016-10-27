const swap = (arr, i, j, traces) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  traces.push(["swap", i, j, "Sorting"]);
};

export const bitonicSort = (arr) => {
  const traces = [];
  const ASC = true;
  sort(arr, 0, arr.length, ASC, traces);
  return traces;
};

function sort(arr, lo, hi, dir, traces) {
  if (hi > 1) {
    let m = Math.floor(hi/2);
    sort(arr, lo, m, !dir, traces);
    sort(arr, lo+m, hi-m, dir, traces);
    bitonicMerge(arr, lo, hi, dir, traces);
  }

}

function bitonicMerge(arr, lo, hi, dir, traces) {
  if (hi > 1) {
    let m = greatestPowerOfTwoLessThan(hi);
    for (let i = lo; i < lo+hi-m; i++) {
      compare(arr, i, i+m, dir, traces);
    }
    bitonicMerge(arr, lo, m, dir, traces);
    bitonicMerge(arr, lo+m, hi-m, dir, traces);
  }
}

function compare(arr, i, j, dir, traces) {
  if (dir === (arr[i].pos > arr[j].pos)) {
    traces.push(["compare", i, j, "Sorting"]);
    swap(arr, i, j, traces);
  }
}

function greatestPowerOfTwoLessThan(n) {
  let k = 1;
  while (k < n) {
    k=k<<1;
  }
  return k>>1;
}

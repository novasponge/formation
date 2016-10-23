const swap = (arr, i, j, swapPos) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  swapPos.push([i,j]);
};

export const bitonicSort = (arr) => {
  const swapPos = [];
  const ASC = true;
  sort(arr, 0, arr.length, ASC, swapPos);
  return swapPos;
};

function sort(arr, lo, hi, dir, swapPos) {
  if (hi > 1) {
    let m = Math.floor(hi/2);
    sort(arr, lo, m, !dir, swapPos);
    sort(arr, lo+m, hi-m, dir, swapPos);
    bitonicMerge(arr, lo, hi, dir, swapPos);
  }

}

function bitonicMerge(arr, lo, hi, dir, swapPos) {
  if (hi > 1) {
    let m = greatestPowerOfTwoLessThan(hi);
    for (let i = lo; i < lo+hi-m; i++) {
      compare(arr, i, i+m, dir, swapPos);
    }
    bitonicMerge(arr, lo, m, dir, swapPos);
    bitonicMerge(arr, lo+m, hi-m, dir, swapPos);
  }
}

function compare(arr, i, j, dir, swapPos) {
  if (dir === (arr[i].pos > arr[j].pos)) {
    swap(arr, i, j, swapPos);
  }
}

function greatestPowerOfTwoLessThan(n) {
  let k = 1;
  while (k < n) {
    k=k<<1;
  }
  return k>>1;
}

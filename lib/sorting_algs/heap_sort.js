const swap = (arr, i, j, swapPos) => {
  const temp = arr[i-1];
  arr[i-1] = arr[j-1];
  arr[j-1] = temp;
  swapPos.push([i-1,j-1]);
};

export const heapSort = (arr) => {
  const swapPos = [];
  sort(arr, swapPos);
  return swapPos;
};

function sort(arr, swapPos) {
  let len = arr.length;
  for (let k = Math.floor(len/2); k >= 1; k--) {
    sink(arr, k, len, swapPos);
  }
  while (len > 1) {
    swap(arr, 1, len--, swapPos);
    sink(arr, 1, len, swapPos);
  }
}

function sink(arr, k, n, swapPos) {
  while (2*k <= n) {
    let j= 2*k;
    if (j < n && less(arr, j, j+1)) {
      j++;
    }
    if (!less(arr,k,j)) {
      break;
    }
    swap(arr, k, j, swapPos);
    k = j;
  }
}

function less(arr, i, j) {
  return arr[i-1].pos < arr[j-1].pos;
}

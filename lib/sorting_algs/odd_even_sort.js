const swap = (arr, i, j, swapPos) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  swapPos.push([i,j]);
};

export const oddEvenSort = (arr) => {
  const swapPos = [];
  sort(arr, swapPos);
  return swapPos;
};


function sort(arr, swapPos) {
  let len = arr.length;
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let p = 0; p <= 1; p++) {
      for (let i = p; i + 1 < len; i += 2) {
        if (arr[i+1].pos < arr[i].pos) {
          swap(arr, i + 1, i, swapPos);
          sorted = false;
        }
      }
    }
  }
}

const swap = (arr, i, j, swapPos) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  swapPos.push([i,j]);
};

export const selectionSort = (arr) => {
  const swapPos = [];
  sort(arr, swapPos);
  return swapPos;
};

function sort(arr, swapPos) {
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    let min = i;
    for (let j = i+1; j < length; j++) {
      if (arr[j].pos < arr[min].pos) {
        min = j;
      }
    }
    swap(arr, i, min, swapPos);
  }
}

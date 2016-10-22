const swap = (arr, i, j, swapPos) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  swapPos.push([i,j]);
};

export const insertionSort = (arr) => {
  const swapPos = [];
  sort(arr, swapPos);
  console.log(arr);
  return swapPos;
};

function sort(arr, swapPos) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j].pos < arr[j-1].pos) {
        swap(arr, j, j-1, swapPos);
      } else {
        break;
      }
    }
  }
}

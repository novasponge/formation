const swap = (arr, i, j, swapPos) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  swapPos.push([i,j]);
};

export const cockTailSort = (arr) => {
  const swapPos = [];
  sort(arr, swapPos);
  return swapPos;
};


function sort(arr, swapPos) {
  let n = arr.length;
  let left = 0;
  let right = n - 1;
  while (left < right) {
    let new_right = right - 1;
    for (let i = left; i + 1 <= right; i++) {
      if (arr[i + 1].pos < arr[i].pos) {
        swap(arr, i + 1, i, swapPos);
        new_right = i;
      }
    }
    right = new_right;
    let new_left = left + 1;
    for (let i = right; i - 1 >= left; i--)  {
      if (arr[i].pos < arr[i - 1].pos) {
        swap(arr, i, i - 1, swapPos);
        new_left = i;
      }
    }
    left = new_left;
  }
}

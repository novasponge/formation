const swap = (arr, i, j, swapPos) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  swapPos.push([i,j]);
};

export const quickSort = (arr) => {
  const swapPos = [];
  sort(arr, 0, arr.length - 1, swapPos);
  return swapPos;
};

const sort = (arr, left, right, swapPos) => {
  let pivotIdx;

  if (arr.length > 1) {
    pivotIdx = partition(arr, left, right, swapPos);
    if (left < pivotIdx - 1) {
      sort(arr, left, pivotIdx - 1, swapPos);
    }
    if (right > pivotIdx + 1) {
      sort(arr, pivotIdx + 1, right, swapPos);
    }
  }
  console.log(arr);
};

const partition = (arr, left, right, swapPos) => {
  let pivotIdx = Math.floor((right + left) / 2);

  const pivot = arr[pivotIdx];
  let i = left,
      j = right;

  while(i < j) {
    while(arr[i].pos < pivot.pos) {
      i++;
    }

    while(arr[j].pos > pivot.pos) {
      j--;
    }
    if (i < j) {
      swap(arr, i, j, swapPos);
      if (i === pivotIdx) {
        pivotIdx = j;
      } else if (j === pivotIdx) {
        pivotIdx = i;
      }

      i++;
      j--;
    }
  }
  return pivotIdx;
};

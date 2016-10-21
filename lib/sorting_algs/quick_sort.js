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
 if (left >= right) return;

 swap(arr, left, Math.floor((left + right) / 2), swapPos);

 let last = left;
 for(let i = left +  1; i <= right; i++) {
   if (arr[i].pos < arr[left].pos) {
     last++;
     swap(arr, last, i, swapPos);
   }
 }

 swap(arr, left, last, swapPos);
 sort(arr, left, last - 1, swapPos);
 sort(arr, last + 1, right, swapPos);
};

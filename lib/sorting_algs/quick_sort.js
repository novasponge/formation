const swap = (arr, i, j, traces) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  traces.push(["swap", arr[i].pos, arr[j].pos, "Sorting"]);
};

export const quickSort = (arr) => {
  const traces = [];
  sort(arr, 0, arr.length - 1, traces);
  return traces;
};

const sort = (arr, left, right, traces) => {
 if (left >= right) return;

 swap(arr, left, Math.floor((left + right) / 2), traces);

 let last = left;
 for(let i = left +  1; i <= right; i++) {
   traces.push(["compare", arr[i].pos, arr[left].pos, "Sorting"]);
   if (arr[i].pos < arr[left].pos) {
     last++;
     swap(arr, last, i, traces);
   }
 }

 swap(arr, left, last, traces);
 sort(arr, left, last - 1, traces);
 sort(arr, last + 1, right, traces);
};

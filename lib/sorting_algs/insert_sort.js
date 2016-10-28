const swap = (arr, i, j, traces) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  traces.push(["swap", arr[i].pos, arr[j].pos, "Sorting"]);
};

export const insertionSort = (arr) => {
  const traces = [];
  sort(arr, traces);
  return traces;
};

function sort(arr, traces) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      traces.push(["compare", arr[j].pos, arr[j-1].pos, "Sorting"]);
      if (arr[j].pos < arr[j-1].pos) {
        swap(arr, j, j-1, traces);
      } else {
        break;
      }
    }
  }
}

// function sort(arr, traces) {
//   for (let i = 1; i < arr.length; i++) {
//     let key = arr[i];
//     let prePos = i - 1;
//     while(prePos > 0 && arr[prePos].pos > key.pos) {
//       arr[prePos + 1] = arr[prePos];
//       prePos--;
//     }
//     arr[prePos + 1] = key;
//   }
// }

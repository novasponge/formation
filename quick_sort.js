export default quickSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  const pivot = arr[0];
  const left = [];
  const right = [];
  const swapPos = [];
  for (var i = 1; i < arr.length; i++) {
    if (pivot.pos > arr[i].pos) {
      left.push(arr[i]);
      swapPos.push([i,0]);
    } else {
      right.push(arr[i]);
      swapPos.push([0,i]);
    }
  }
  quickSort(left).concat([pivot]).concat(quickSort(right));
};

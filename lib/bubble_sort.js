export const bubbleSort = (arr) => {
  let swapPos = [];
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i+1; j < arr.length; j++) {
      if (arr[i].pos > arr[j].pos) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swapPos.push([i, j]);
      }
    }
  }
  return swapPos;
};

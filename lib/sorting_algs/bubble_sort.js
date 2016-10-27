export const bubbleSort = (arr) => {
  let traces = [];
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i+1; j < arr.length; j++) {
      traces.push(["compare", i, j, "Sorting"]);
      if (arr[i].pos > arr[j].pos) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        traces.push(["swap", i, j, "Sorting"]);
      }
    }
  }
  return traces;
};

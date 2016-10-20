export const shuffle = (arr) => {
  let n = arr.length, t, i;
  let swapPos = [];
  while(n) {
    i = Math.random() * n-- | 0;
    t = arr[n];
    arr[n] = arr[i];
    arr[i] = t;
    if (n !== i) {
      arr[n].getEndpos(t);
      arr[i].getEndpos(arr[n]);
    }
    // debugger
    swapPos.push([n,i]);
  }
  return swapPos;
};

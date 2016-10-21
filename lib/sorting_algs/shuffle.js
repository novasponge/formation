export const shuffle = (arr) => {
  let n = arr.length, t, i;
  let swapPos = [];
  while(n) {
    i = Math.random() * n-- | 0;
    t = arr[n];
    arr[n] = arr[i];
    arr[i] = t;
    swapPos.push([n,i]);
  }
  return swapPos;
};

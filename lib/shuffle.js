export const shuffle = (arr, swapCallBack) => {
  let n = arr.length, t, i;
  while(n) {
    i = Math.random() * n-- | 0;
    t = arr[n];
    arr[n] = arr[i];
    arr[i] = t;
    arr[i].getEndpos(arr[n]);
    arr[n].getEndpos(arr[i]);
    swapCallBack(arr[i], arr[n]);
  }
  return arr;
};

import Stick from "../stick";
import { merge } from 'lodash';

export const mergeSort = (arr, aux) => {
  const swapPos = [];
  // debugger
  const temp = new Array(arr.length);

  sort(arr, aux, 0, arr.length - 1, swapPos);
  console.log(arr);
  // debugger
  aux = temp;
  console.log(aux);
  return swapPos;
};

function sort(arr, aux, lo, hi, swapPos){
  let len = hi || arr.length;
  if (hi <= lo) return;

  let mid = lo + Math.floor((hi-lo)/2);

  sort(arr, aux, lo, mid, swapPos);
  sort(arr, aux, mid+1, hi, swapPos);
  _merge(arr, aux, lo, mid, hi, swapPos);
  // debugger
}


function _merge(arr, aux, lo, mid, hi, swapPos){
  for (let k = lo; k <= hi; k++) {
    let options = merge({}, arr[k], {isFake: true});
    aux[k] = arr[k];
    arr[k] = new Stick(options);
  }
  let i = lo,
      j = mid + 1,
      n,
      temp;

  for (let k = lo; k <= hi; k++) {
    if (i > mid ) {
      n = j++;
      arr[k] = aux[n];
      swapPos.push([n, k]);
    } else if (j > hi) {
      n = i++;
      arr[k] = aux[n];
      swapPos.push([n, k]);
    } else if (aux[j].pos < aux[i].pos) {
      n = j++;
      arr[k] = aux[n];
      swapPos.push([n, k]);
    } else {
      n = i++;
      arr[k] = aux[n];
      swapPos.push([n, k]);
    }
  }
}

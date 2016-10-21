export const quickSort = (arr) => {
  const swapPos = [];
  sort(arr, 0, arr.length-1, swapPos);
  return swapPos;
};

function sort(arr, oLeft , oRight, swapPos) {

  let swapped = false;

  //If you make any swaps the resulting sub arrays are of smaller length than the original
  //so you just need to handle the case where no swaps are made.

  let left = oLeft;
  let right = oRight;

  //I am not sure but you might need a check for right - left > -1.
  if (right-left <= 1 && right >= left){
    if (arr[right].pos < arr[left].pos) {
      let mix = arr[right];
      arr[right] = arr[left];
      arr[left] = mix;
      swapPos.push([left, right]);
    }
  } else {
    let plnd = Math.floor((left + right)/2);
    let pivot =arr[plnd];
    while(left <= right) {
      if (arr[left].pos > pivot.pos) {
        let temp = arr[right];
        arr[right] = arr[left];
        arr[left] = temp;
        swapPos.push([left, right]);
        right = right-1;
        swapped = true;
      } else {
        left = left + 1;
      }
    }

    if(swapped) {
      sort(arr, oLeft, right, swapPos);
      sort(arr, left, oRight, swapPos);
    } else {
      let temp = arr[oRight];
      arr[oRight] = arr[plnd];
      arr[plnd] = temp;
      swapPos.push([plnd, oRight]);
      sort(arr, oLeft, oRight-1, swapPos);
    }
  }
  console.log(arr);
}

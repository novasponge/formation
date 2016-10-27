export const mergeSort = (arr) => {
  const traces = [];
  sort(arr, traces);
  return traces;
};

function perm_to_swaps(perm) {
  let n = perm.length;
  let used = [];
  for (let i = 0; i < n; i++) {
    used.push(false);
  }

  let swaps = [];

  for (let i = 0; i < n; i++) {
    if (used[i]) {
      continue;
    }
    let current = i;
    if (perm[i] == i) {
      used[i] = true;
    }
    while (!used[perm[current]]) {
      swaps.push([current, perm[current]]);
      used[current] = true;
      current = perm[current];
    }
  }

  return swaps;
}

function sort(arr, traces, left, right) {

  if (!left) {
    left = 0;
  }

  if (!right) {
    right = arr.length - 1;
  }

  let mid = Math.floor((left + right) / 2);

  if (left >= right) {
    return;
  }

  if (right - left > 1) {
    sort(arr, traces, left, mid);
    sort(arr, traces, mid + 1, right);
  }

  let next_left = left;
  let next_right = mid + 1;
  const perm = [];
  for (let i = left; i <= right; i++) {
    let choice;
    if (next_left <= mid && next_right <= right) {
      traces.push(["compare", next_left, next_right, "Sorting"]);
      if (arr[next_left].pos < arr[next_right].pos) {
        choice = 'L';
      } else {
        choice = 'R';
      }
    } else if (next_left > mid) {
      choice = 'R';
    } else if (next_right > right) {
      choice = 'L';
    }

    if (choice === 'L') {
      perm.push(next_left - left);
      next_left++;
    } else if (choice === 'R') {
      perm.push(next_right - left);
      next_right++;
    }
  }
  let swaps = perm_to_swaps(perm);
  for (let i = 0; i < swaps.length; i++) {
    swap(arr, swaps[i][0] + left, swaps[i][1] + left, traces);
  }
}

const swap = (arr, i, j, traces) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  traces.push(["swap", i, j, "Sorting"]);
};

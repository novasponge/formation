export const mergeSort = (arr) => {
  const traces = [];
  sort(arr, traces);
  return traces;
};

function check_perm(perm) {
  var n = perm.length;
  var used = {};
  for (var i = 0; i < n; i++) {
    if (used[perm[i]]) return false;
    used[perm[i]] = true;
  }
  for (var i = 0; i < n; i++) {
    if (!used[i]) {
      return false;
    }
  }
  return true;
}

function perm_to_swaps(perm) {

  if (!check_perm(perm)) {
    console.log(perm);
    throw "Invalid permutation";
  }
  var n = perm.length;
  var used = [];
  for (var i = 0; i < n; i++) used.push(false);
  var transpositions = [];

  for (var i = 0; i < n; i++) {
    if (used[i]) continue;
    var cur = i;
    if (perm[i] == i) used[i] = true;
    while (!used[perm[cur]]) {
      transpositions.push([cur, perm[cur]]);
      used[cur] = true;
      cur = perm[cur];
    }
  }

  return transpositions;
}

function sort(arr, trace, left = 0, right = arr.length - 1) {

  if (left >= right) {
    return;
  }

  var mid = Math.floor((left + right) / 2);

  if (right - left > 1) {
    sort(arr, left, mid);
    sort(arr, mid + 1, right);
  }

  var next_left = left;
  var next_right = mid + 1;
  var perm = [];
  for (var i = left; i <= right; i++) {
    var choice = null;
    if (next_left <= mid && next_right <= right) {
      if (arr.lessThan(next_left, next_right)) {
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
    } else {
      throw 'Should not get here'
    }
  }

  var swaps = perm_to_swaps(perm);
  for (var i = 0; i < swaps.length; i++) {
    arr.swap(swaps[i][0] + left, swaps[i][1] + left);
  }
}

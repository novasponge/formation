# Formation

![Sorting(./asset/sortingv.gif)
[Live] (http://www.zhuolizhang.com/formation/)

### Overview  

Sorting Algorithm Visualization built using Javascript, React.js and HTML canvas to create interactive visualizations of Sorting algorithms including: quick sort,  bubble sort, insertion sort, selection sort, cocktail sort, heap sort, odd even sort, and bitonic sort. It helps people to understand how different sorting algorithms behave in a swapping context.

### Features

Foramtion will allow users to:

* visualize different sorting algorithms.
* compare speed among sorting algorithms.

### Instructions

* Click shuffle all to shuffle all demos.
* Click shuffle demo to see how shuffle works.
* Lines are sorted by their slope, from negative slope to positive slope.
* When line color is black, it means that two lines are comparing with each other.
* When line color is red, it means that two lines are being swapped.
* Use speed multiplier to change the visualization speed.

### Interesting Snippets

Merge Sort was by far the most difficult part of this visualization, because merge sort by nature is not sorted in swapping context.

So the traces of sorting has to be transformed to fit the visualization engine.

```JavaScript
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
```

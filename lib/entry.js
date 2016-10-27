import SticksView from './stick_view';
import { shuffle } from './sorting_algs/shuffle';
import { bubbleSort } from './sorting_algs/bubble_sort';
import { quickSort } from './sorting_algs/quick_sort';
import { insertionSort } from "./sorting_algs/insert_sort";
import { selectionSort } from './sorting_algs/select_sort';
import { heapSort } from './sorting_algs/heap_sort';
import { oddEvenSort } from './sorting_algs/odd_even_sort';
import { cockTailSort } from './sorting_algs/cocktail_sort';
import { bitonicSort } from './sorting_algs/bitonic_sort';
import { mergeSort } from './sorting_algs/merge_sort';

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas-shuffle");
  canvasEl.width = 1024;
  canvasEl.height = 100;
  const ctx = canvasEl.getContext("2d");
  const sticksView = new SticksView(ctx);
  sticksView.sticks.adopAlgorithm(shuffle, true);
  sticksView.start();
});

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas-bubblesort");
  canvasEl.width = 1024;
  canvasEl.height = 100;
  const ctx = canvasEl.getContext("2d");
  const sticksView = new SticksView(ctx);
  sticksView.sticks.adopAlgorithm(shuffle);
  sticksView.sticks.adopAlgorithm(bubbleSort);
  sticksView.start();
});

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas-quicksort");
  canvasEl.width = 1024;
  canvasEl.height = 100;
  const ctx = canvasEl.getContext("2d");
  const sticksView = new SticksView(ctx);
  sticksView.sticks.adopAlgorithm(shuffle);
  sticksView.sticks.adopAlgorithm(quickSort);
  sticksView.start();
});

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas-insertsort");
  canvasEl.width = 1024;
  canvasEl.height = 100;
  const ctx = canvasEl.getContext("2d");
  const sticksView = new SticksView(ctx);
  sticksView.sticks.adopAlgorithm(shuffle);
  sticksView.sticks.adopAlgorithm(insertionSort);
  sticksView.start();
});

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas-selectsort");
  canvasEl.width = 1024;
  canvasEl.height = 100;
  const ctx = canvasEl.getContext("2d");
  const sticksView = new SticksView(ctx);
  sticksView.sticks.adopAlgorithm(shuffle);
  sticksView.sticks.adopAlgorithm(selectionSort);
  sticksView.start();
});

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas-heapsort");
  canvasEl.width = 1024;
  canvasEl.height = 100;
  const ctx = canvasEl.getContext("2d");
  const sticksView = new SticksView(ctx);
  sticksView.sticks.adopAlgorithm(shuffle);
  sticksView.sticks.adopAlgorithm(heapSort);
  sticksView.start();
});

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas-oddevensort");
  canvasEl.width = 1024;
  canvasEl.height = 100;
  const ctx = canvasEl.getContext("2d");
  const sticksView = new SticksView(ctx);
  sticksView.sticks.adopAlgorithm(shuffle);
  sticksView.sticks.adopAlgorithm(oddEvenSort);
  sticksView.start();
});

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas-cocktailsort");
  canvasEl.width = 1024;
  canvasEl.height = 100;
  const ctx = canvasEl.getContext("2d");
  const sticksView = new SticksView(ctx);
  sticksView.sticks.adopAlgorithm(shuffle);
  sticksView.sticks.adopAlgorithm(cockTailSort);
  sticksView.start();
});

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas-bitonicsort");
  canvasEl.width = 1024;
  canvasEl.height = 100;
  const ctx = canvasEl.getContext("2d");
  const sticksView = new SticksView(ctx);
  sticksView.sticks.adopAlgorithm(shuffle);
  sticksView.sticks.adopAlgorithm(bitonicSort);
  sticksView.start();
});

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas-mergesort");
  canvasEl.width = 1024;
  canvasEl.height = 100;
  const ctx = canvasEl.getContext("2d");
  const sticksView = new SticksView(ctx);
  sticksView.sticks.adopAlgorithm(shuffle);
  sticksView.sticks.adopAlgorithm(mergeSort);
  sticksView.start();
});

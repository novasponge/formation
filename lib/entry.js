import SticksView from './stick_view';
import { shuffle } from './shuffle';
import { bubbleSort } from './bubble_sort';
import { quickSort } from './quick_sort_revised';


document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas-shuffle");
  canvasEl.width = 1024;
  canvasEl.height = 200;
  const ctx = canvasEl.getContext("2d");
  const sticksView = new SticksView(ctx);
  sticksView.sticks.adopAlgorithm(shuffle);
  sticksView.start();
});


document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas-bubblesort");
  canvasEl.width = 1024;
  canvasEl.height = 200;
  const ctx = canvasEl.getContext("2d");
  const sticksView = new SticksView(ctx);
  sticksView.sticks.adopAlgorithm(shuffle);
  sticksView.sticks.adopAlgorithm(bubbleSort);
  sticksView.start();
});

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas-quicksort");
  canvasEl.width = 1024;
  canvasEl.height = 200;
  const ctx = canvasEl.getContext("2d");
  const sticksView = new SticksView(ctx);
  sticksView.sticks.adopAlgorithm(shuffle);
  sticksView.sticks.adopAlgorithm(quickSort);
  sticksView.start();
});

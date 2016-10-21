import SticksView from './stick_view';
import { shuffle } from './shuffle';
import { bubbleSort } from './bubble_sort';
import { quickSort } from './quick_sort';


document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 1024;
  canvasEl.height = 480;
  const ctx = canvasEl.getContext("2d");
  const sticksView = new SticksView(ctx);
  sticksView.sticks.adopAlgorithm(shuffle);
  sticksView.sticks.adopAlgorithm(quickSort);
  sticksView.start();
});

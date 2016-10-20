import SticksView from './stick_view';
import { shuffle } from './shuffle';


document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 1024;
  canvasEl.height = 480;
  const stg = new createjs.Stage(canvasEl);
  const sticksView = new SticksView(stg);
  sticksView.sticks.adopAlgorithm(shuffle);
  sticksView.start();
});

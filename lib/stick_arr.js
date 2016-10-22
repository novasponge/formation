import Stick from './stick';
import { Util } from './util';
import { merge } from 'lodash';

class Sticks {
  constructor () {
    this.DIM_X = 1024;
    this.DIM_Y = 200;
    this.sticks = [];
    this.NUM_STICK = 99;
    this.MID_NUM = (this.NUM_STICK - 1) / 2;
    this.dangle = Math.PI/180;
    this.addSticks(this.ctx);
    this.cons = 0;
    this.swapPos = [];
    this.mergesort = null;
    this.isMergeSort = null;
    this.shuffle = null;
  }

  addSticks (){
    const mid_stick = new Stick({lineHead:[512, 100], lineTail:[512,40]});
    this.sticks.push(mid_stick);

    for (let i = 1; i < this.MID_NUM+1; i++) {
      let leftOne = merge({},this.sticks[0]);
      let leftAngle = Math.PI/2 - (this.dangle * i);
      let rightOne =  merge({}, this.sticks[this.sticks.length-1]);
      let rightAngle = Math.PI/2 + (this.dangle * i);

      leftOne.lineHead = [leftOne.lineHead[0] - 8, leftOne.lineHead[1]];
      leftOne.lineTail = Util.findLineTail(leftOne.lineHead, leftAngle);
      this.sticks.unshift(new Stick(leftOne));

      rightOne.lineHead = [rightOne.lineHead[0] + 8, rightOne.lineHead[1]];
      rightOne.lineTail = Util.findLineTail(rightOne.lineHead, rightAngle);
      this.sticks.push(new Stick(rightOne));
    }

    for (var i = 0; i < this.sticks.length; i++) {
      this.sticks[i].pos = i;
    }

    this.aux = new Array(this.sticks.length);
  }

  step(timeDelta){
    this.updateSticks(timeDelta);
  }

  updateSticks (timeDelta) {
    let stick1;
    let stick2;

    let swapPos = this.swapPos;
    if (this.cons < swapPos.length) {
      const swaps = swapPos[this.cons];
      if (this.mergeSort) {
        stick1 = this.sticks[swaps[0]];
        stick2 = this.aux[swaps[1]];
      } else {
        stick1 = this.sticks[swaps[0]];
        stick2 = this.sticks[swaps[1]];
      }

      if (stick1 !== stick2) {
        stick1.getEndpos(stick2);
        stick2.getEndpos(stick1);
        this.swap(stick1, stick2, timeDelta, this.mergeSort);
      } else {
        this.cons++;
        return;
      }
    } else {
      return;
    }
  }

  adopAlgorithm (algorithm, isMergeSort) {
    let swapPos;
    if (!isMergeSort) {
      swapPos = algorithm(this.sticks);
      this.shuffle = swapPos.length;
    } else {
      swapPos = algorithm(this.sticks, this.aux);
      this.isMergeSort = isMergeSort;
    }
    this.swapPos = this.swapPos.concat(swapPos);
  }

  checkFinishShuffle() {
    if (this.cons === this.shuffle - 1) {
      this.mergeSort = this.isMergeSort;
      for (var i = 0; i < this.sticks.length; i++) {
        this.sticks[i].color = "#909090";
      }
    }
  }

  checkFinishSwap (stick1, stick2) {
    if (stick1.checkFinishMove() && stick2.checkFinishMove()) {
      this.checkFinishShuffle();
      return true;
    } else {
      return false;
    }
  }

  swap (stick1, stick2, timeDelta) {
    if (this.checkFinishSwap(stick1, stick2)) {
      this.cons++;
    } else {
      stick1.moveTo(stick1.endPos, timeDelta);
      stick2.moveTo(stick2.endPos, timeDelta);
    }
  }

  draw (ctx) {
    ctx.clearRect(0,  0,  this.DIM_X, this.DIM_Y);

    this.sticks.forEach(stick => {
      stick.draw(ctx);
    });
  }
}

export default Sticks;

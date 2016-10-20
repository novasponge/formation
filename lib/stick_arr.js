import Stick from './stick';
import { Util } from './util';

class Sticks {
  constructor (ctx) {
    this.ctx = ctx;
    this.DIM_X = 1024;
    this.DIM_Y = 480;
    this.sticks = [];
    this.NUM_STICK = 100;
    this.MID_NUM = Math.floor(this.NUM_STICK/2);
    this.dangle = Math.PI/180;
    this.addSticks(this.ctx);
    this.cons = 0;
    this.swapPos = [];
  }

  addSticks (){
    const mid_stick = new Stick({lineHead:[512, 200], lineTail:[512,140], pos:this.MID_NUM});
    this.sticks.push(mid_stick);

    for (let i = 1; i < this.MID_NUM+1; i++) {
      let leftOne = Object.assign({},this.sticks[0]);
      let leftAngle = Math.PI/2 - (this.dangle * i);
      let rightOne = Object.assign({}, this.sticks[this.sticks.length-1]);
      let rightAngle = Math.PI/2 + (this.dangle * i);

      leftOne.lineHead = [leftOne.lineHead[0] - 9, leftOne.lineHead[1]];
      leftOne.lineTail = Util.findLineTail(leftOne.lineHead, leftAngle);
      leftOne.pos = leftOne.pos - 1;
      this.sticks.unshift(new Stick(leftOne));

      rightOne.lineHead = [rightOne.lineHead[0] + 9, rightOne.lineHead[1]];
      rightOne.lineTail = Util.findLineTail(rightOne.lineHead, rightAngle);
      rightOne.pos = rightOne.pos + 1;
      this.sticks.push(new Stick(rightOne));
    }
  }

  checkFinishSwap (stick1, stick2) {
    if (stick1 == stick2) {
      return true;
    }
    return (stick1.checkFinishMove() && stick2.checkFinishMove());
  }


  updateSticks () {
    let swapPos = this.swapPos;
    if (this.cons > swapPos.length - 1) {
      return;
    } else {
      const swaps = swapPos[this.cons];
      console.log(swaps);
      let stick1 = this.sticks[swaps[0]];
      let stick2 = this.sticks[swaps[1]];
      stick1.getEndpos(stick2);
      stick2.getEndpos(stick1);
      if (stick1 !== stick2) {
        this.swap(this.sticks[swaps[0]], this.sticks[swaps[1]]);
      }
      if (this.checkFinishSwap(this.sticks[swaps[0]], this.sticks[swaps[1]])) {
        this.cons++;
      }
    }
  }

  step(){
    this.updateSticks();
  }

  adopAlgorithm (algorithm) {
    this.swapPos = this.swapPos.concat(algorithm(this.sticks));
  }

  swap (stick1, stick2) {
    stick1.moveTo(stick1.endPos);
    stick2.moveTo(stick2.endPos);
  }

  draw (ctx) {
    ctx.clearRect(0,  0,  this.DIM_X, this.DIM_Y);

    this.sticks.forEach(stick => {
      stick.draw(ctx);
    });
  }
}

export default Sticks;

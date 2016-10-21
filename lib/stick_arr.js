import Stick from './stick';
import { Util } from './util';

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
  }

  addSticks (){
    const mid_stick = new Stick({lineHead:[512, 100], lineTail:[512,40]});
    this.sticks.push(mid_stick);

    for (let i = 1; i < this.MID_NUM+1; i++) {
      let leftOne = Object.assign({},this.sticks[0]);
      let leftAngle = Math.PI/2 - (this.dangle * i);
      let rightOne = Object.assign({}, this.sticks[this.sticks.length-1]);
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

  }

  checkFinishSwap (stick1, stick2) {
    return (stick1.checkFinishMove() && stick2.checkFinishMove());
  }


  updateSticks (timeDelta) {
    let swapPos = this.swapPos;
    if (this.cons < swapPos.length) {
      const swaps = swapPos[this.cons];
      let stick1 = this.sticks[swaps[0]];
      let stick2 = this.sticks[swaps[1]];
      if (stick1 !== stick2) {
        stick1.getEndpos(stick2);
        stick2.getEndpos(stick1);
        this.swap(stick1, stick2, timeDelta);
      } else {
        this.cons++;
        return;
      }
    } else {
      console.log(1+1);
      return;
    }
  }

  step(timeDelta){
    this.updateSticks(timeDelta);
  }

  adopAlgorithm (algorithm, isShuffle) {
    this.swapPos = this.swapPos.concat(algorithm(this.sticks));
  }

  swap (stick1, stick2, timeDelta) {
    if (this.checkFinishSwap(stick1, stick2)) {
      this.cons++;
      console.log(this.cons);
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

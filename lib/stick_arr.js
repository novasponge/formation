import Stick from './stick';
import { Util } from './util';

class Sticks {
  constructor (stg) {
    this.stg = stg;
    this.DIM_X = 1024;
    this.DIM_Y = 480;
    this.sticks = [];
    this.NUM_STICK = 100;
    this.MID_NUM = Math.floor(this.NUM_STICK/2);
    this.dangle = Math.PI/180;
    this.addSticks(this.stg);
  }

  addSticks (stg){
    const mid_stick = new Stick({lineHead:[512, 200], lineTail:[512,140], pos:this.MID_NUM, stg: this.stg});
    this.sticks.push(mid_stick);

    for (let i = 1; i < this.MID_NUM; i++) {
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

  checkFinishMove () {
    this.sticks.forEach(stick => {
      if (!stick.checkFinishMove) {
        return false;
      }
    });
    return true;
  }

  adopAlgorithm (algorithm) {
    this.algorithm = algorithm;
  }

  swap (stick1, stick2) {
    stick1.moveTo(stick1.endPos);
    stick2.moveTo(stick2.endPos);
  }

  draw (stg) {
    this.sticks.forEach(stick => {
      stick.draw(stg);
    });
  }
}

export default Sticks;

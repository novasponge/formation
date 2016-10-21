import { Util } from './util';

class Stick {
  constructor (options) {
    this.lineHead = options.lineHead;
    this.lineTail = options.lineTail;
    this.color = "#000";
    this.pos = options.pos;
    this.endPos = null;
    this.stg = options.stg;
  }

  getEndpos (anotherStick){
    if (!this.endPos) {
      this.endPos = anotherStick.lineHead[0];
    }
  }

  moveTo (endPos) {
    if (!this.checkFinishMove()) {
      const speed = Util.moveSpeed(this.lineHead[0], endPos);
      this.lineHead[0] = this.lineHead[0] + speed;
      this.lineTail[0] = this.lineTail[0] + speed;
    }
  }

  checkFinishMove () {
    if (this.lineHead[0] === this.endPos) {
      this.endPos = null;
      return true;
    } else {
      return false;
    }
  }

  draw (ctx) {
    // if (this.checkFinishMove()) {
    //   ctx.strokeStyle('black');
    // } else {
    //   ctx.strokeStyle("red");
    // }

    ctx.beginPath();
    ctx.moveTo(...this.lineHead);
    ctx.lineTo(...this.lineTail);
    ctx.stroke();
  }
}

export default Stick;

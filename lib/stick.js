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
    this.endPos = anotherStick.lineHead[0];
  }

  moveTo (endPos) {
    if (!this.checkFinishMove()) {
      const speed = Util.moveSpeed(this.lineHead[0], endPos);
      this.lineHead[0] = this.lineHead[0] + speed;
      this.lineTail[0] = this.lineTail[0] + speed;
    }
  }

  checkFinishMove () {
    return (this.lineHead === this.endPos);
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.moveTo(...this.lineHead);
    ctx.lineTo(...this.lineTail);
    ctx.stroke();
  }
}

export default Stick;

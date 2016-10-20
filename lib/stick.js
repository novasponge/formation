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
      this.draw(this.stg);
    }
  }

  checkFinishMove () {
    return (this.lineHead === this.endPos);
  }

  draw (stg) {
    const line = new createjs.Shape();
    line.graphics.setStrokeStyle(1).beginStroke(this.color);
    line.graphics.moveTo(...this.lineHead);
    line.graphics.lineTo(...this.lineTail);
    line.graphics.endStroke();
    stg.addChild(line);
  }
}

export default Stick;

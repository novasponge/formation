import Stick from './stick';
import { Util } from './util';
import { merge } from 'lodash';

class Sticks {
  constructor () {
    this.DIM_X = 1024;
    this.DIM_Y = 100;
    this.sticks = [];
    this.NUM_STICK = 9;
    this.MID_NUM = (this.NUM_STICK - 1) / 2;
    this.dangle = Math.PI/180;
    this.addSticks(this.ctx);
    this.cons = 0;
    this.traces = [];
    this.operationState = "";
    this.numComparison = 0;
    this.numSwap = 0;
  }

  addSticks () {
    const mid_stick = new Stick({lineHead:[512, 80], lineTail:[512,20]});
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
  }

  step (timeDelta) {
    this.updateSticks(timeDelta);
  }

  updateSticks (timeDelta) {
    let stick1;
    let stick2;
    let operation;

    let traces = this.traces;
    if (this.cons < traces.length) {
      const trace = traces[this.cons];
      operation = trace[0];
      stick1 = this.sticks[trace[1]];
      stick2 = this.sticks[trace[2]];
      this.operationState = trace[3];

      if (this.cons === traces.length - 1) {
        if (this.operationState === 'Sorting') {
          this.operationState = 'Sorted';
        } else {
          this.operationState = 'Shuffled';
        }
      }

      if (operation === 'compare') {
        this.compare(stick1, stick2, timeDelta);
        this.numComparison++;
      } else {
        if (stick1 !== stick2) {
          stick1.getEndpos(stick2);
          stick2.getEndpos(stick1);
          this.swap(stick1, stick2, timeDelta, this.mergeSort);
          this.numSwap++;
        } else {
          this.cons++;
        }
      }
    } else {
      return;
    }
  }

  adopAlgorithm (algorithm, isMergeSort) {
    const traces = algorithm(this.sticks, this.aux);
    this.traces = this.traces.concat(traces);
  }

  checkFinishSwap (stick1, stick2) {
    if (stick1.checkFinishMove() && stick2.checkFinishMove()) {
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

  checkFinishCompare (stick1, stick2) {
    if (stick1.checkFinishCompare() && stick2.checkFinishCompare()) {
      return true;
    } else {
      return false;
    }
  }

  compare (stick1, stick2, timeDelta) {
    if (this.checkFinishCompare(stick1, stick2)) {
      this.cons++;
    } else {
      stick1.compare(timeDelta);
      stick2.compare(timeDelta);
    }
  }

  draw (ctx) {
    ctx.clearRect(0,  0,  this.DIM_X, this.DIM_Y);

    ctx.font = "18px serif";
    ctx.fillStyle = "#000";
    ctx.fillText(`${this.operationState}`, 0, 50);


    this.sticks.forEach(stick => {
      stick.draw(ctx);
    });
  }
}

export default Sticks;

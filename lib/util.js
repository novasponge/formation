export const Util = {

  findLineTail (lineHead, angle) {
    const dy = Math.sin(angle) * 60;
    const dx = Math.cos(angle) * 60;
    return [lineHead[0]-dx, lineHead[1]-dy];
  },

  moveSpeed (linePos, endPos, timeDelta) {
    let distance = Math.abs(endPos - linePos);
    if (distance === 0) {
      return 0;
    }

    let direction = distance / (endPos - linePos);
    let vel;

    if (distance > 20) {
      vel = distance / timeDelta;
    } else if (distance > 1) {
      vel = 1;
    } else {
      vel = distance;
    }
    return vel * direction;
  },

  wait (waitTime, timeDelta) {
    if (waitTime > 20) {
      return waitTime - timeDelta;
    } else {
      return 0;
    }
  }
};

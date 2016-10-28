export const Util = {

  findLineTail (lineHead, angle) {
    const dy = Math.sin(angle) * 60;
    const dx = Math.cos(angle) * 60;
    return [lineHead[0]-dx, lineHead[1]-dy];
  },

  moveSpeed (linePos, endPos, timeDelta) {
    let distance = Math.abs(endPos - linePos);

    let direction = distance / (endPos - linePos);
    let vel;

    if (distance > 20) {
      vel = distance * 19 / timeDelta;
    } else if (distance > 1) {
      vel = 1;
    } else {
      vel = distance;
    }
    return vel * direction;
  },

  wait (waitTime, timeDelta) {
    if (waitTime > 5) {
      return waitTime - timeDelta;
    } else {
      return 0;
    }
  }
};

export const Util = {

  findLineTail (lineHead, angle) {
    const dy = Math.sin(angle) * 60;
    const dx = Math.cos(angle) * 60;
    return [lineHead[0]-dx, lineHead[1]-dy];
  },

  moveSpeed (linePos, endPos, timeDelta, speedAmplifier) {
    let distance = Math.abs(endPos - linePos);

    let direction = distance / (endPos - linePos);
    let vel;

    if (distance > 20) {
      vel = (distance / timeDelta) * speedAmplifier;
    } else if (distance > 1) {
      vel = 1;
    } else {
      vel = distance;
    }
    return vel * direction;
  },

  wait (waitTime, timeDelta, speedAmplifier) {
      const nextWaitTime = (waitTime - timeDelta * speedAmplifier);
    if (nextWaitTime > 0) {
      return nextWaitTime;
    } else {
      return 0;
    }
  }
};

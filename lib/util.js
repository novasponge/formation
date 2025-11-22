export const Util = {

  findLineTail(lineHead, angle) {
    const dy = Math.sin(angle) * 60;
    const dx = Math.cos(angle) * 60;
    return [lineHead[0] - dx, lineHead[1] - dy];
  },

  moveSpeed(linePos, endPos, timeDelta, speedAmplifier) {
    const distance = Math.abs(endPos - linePos);
    const direction = distance === 0 ? 0 : (endPos - linePos) / distance;

    // Base speed: 0.5 pixels per millisecond
    const baseSpeed = 0.5;
    let moveAmount = baseSpeed * speedAmplifier * timeDelta;

    if (moveAmount > distance) {
      moveAmount = distance;
    } else if (moveAmount < 1 && distance > 0) {
      // Ensure minimum movement to prevent getting stuck
      moveAmount = 1;
    }

    return moveAmount * direction;
  },

  wait(waitTime, timeDelta, speedAmplifier) {
    const nextWaitTime = (waitTime - timeDelta * speedAmplifier);
    if (nextWaitTime > 0) {
      return nextWaitTime;
    } else {
      return 0;
    }
  }
};

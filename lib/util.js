export const Util = {

  findLineTail(lineHead, angle) {
    const dy = Math.sin(angle) * 60;
    const dx = Math.cos(angle) * 60;
    return [lineHead[0]-dx, lineHead[1]-dy];
  },

  moveSpeed(linePos, endPos) {
    let distance = Math.abs(endPos - linePos);
    let direction = distance / (endPos - linePos);
    let vel;
    if (distance > 20) {
      vel = 5;
    } else if (distance > 10) {
      vel = 3;
    } else if (distance > 0) {
      vel = 1;
    }
    return vel * direction;
  }
};

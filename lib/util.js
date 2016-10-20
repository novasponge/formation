export const Util = {

  findLineTail(lineHead, angle) {
    const dy = Math.sin(angle) * 60;
    const dx = Math.cos(angle) * 60;
    return [lineHead[0]-dx, lineHead[1]-dy];
  },

  moveSpeed(linePos, endPos) {
    let distance = Math.abs(linePos - endPos);
    let direction = distance / (linePos - endPos);
    let vel;
    if (distance > 20) {
      vel = 3;
    } else if (distance > 10) {
      vel = 2;
    } else {
      vel = 1;
    }
    return vel * direction;
  }
};

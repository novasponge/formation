import Sticks from "./stick_arr";

class SticksView {
  constructor(ctx) {
    this.sticks = new Sticks(ctx);
    this.ctx = ctx;
  }

  start() {
    this.lastTime = Date.now();
    this.sticks.draw(this.ctx);
    window.requestAnimationFrame(this.render.bind(this));
  }

  render() {
    const time = Date.now();
    const timeDelta = time - this.lastTime;
    this.sticks.step(timeDelta);
    this.sticks.draw(this.ctx);
    this.lastTime = time;

    window.requestAnimationFrame(this.render.bind(this));
  }
}

export default SticksView;

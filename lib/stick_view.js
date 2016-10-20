import Sticks from "./stick_arr";

class SticksView {
  constructor(ctx) {
    this.sticks = new Sticks(ctx);
    this.ctx = ctx;
  }

  start() {
    this.lastTime = 0;
    this.sticks.draw(this.ctx);

    this.interval = window.setInterval(()=>{
      this.render();
    }, 30);
  }

  render() {
    this.sticks.step();
    this.sticks.draw(this.ctx);
  }
}

export default SticksView;

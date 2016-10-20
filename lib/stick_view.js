import Sticks from "./stick_arr";

class SticksView {
  constructor(stg) {
    this.sticks = new Sticks(stg);
    this.stg = stg;
  }

  start() {
    const sticksview = this;
    const sticks = this.sticks.sticks;
    sticks.forEach(stick => {
      stick.draw(this.stg);
    });

    this.interval = window.setInterval(()=>{
      this.sticks.algorithm(sticks, this.sticks.swap);
      sticksview.render();
    });
  }

  render() {
    this.stg.update();
  }
}

export default SticksView;

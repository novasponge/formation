import Sticks from "./stick_arr";

class SticksView {
    sticks: Sticks;
    ctx: CanvasRenderingContext2D;
    speedAmplifier: number;
    algorithm: any[];
    lastTime: number;

    constructor(ctx: CanvasRenderingContext2D) {
        this.sticks = new Sticks();
        this.ctx = ctx;
        this.speedAmplifier = 1;
        this.algorithm = [];
        this.lastTime = 0;
    }

    getSpeedAmplifier(speedAmplifier: number, pauseState: boolean): void {
        this.speedAmplifier = pauseState ? 0 : speedAmplifier;
    }

    start(): void {
        this.lastTime = Date.now();
        this.sticks.draw(this.ctx);
        window.requestAnimationFrame(this.render.bind(this));
    }

    render(): void {
        const time = Date.now();
        const timeDelta = time - this.lastTime;
        this.sticks.step(timeDelta, this.speedAmplifier);
        this.sticks.draw(this.ctx);
        this.lastTime = time;
        window.requestAnimationFrame(this.render.bind(this));
    }
}

export default SticksView;

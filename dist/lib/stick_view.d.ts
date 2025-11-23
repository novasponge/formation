import Sticks from "./stick_arr";
declare class SticksView {
    sticks: Sticks;
    ctx: CanvasRenderingContext2D;
    speedAmplifier: number;
    algorithm: any[];
    lastTime: number;
    constructor(ctx: CanvasRenderingContext2D);
    getSpeedAmplifier(speedAmplifier: number, pauseState: boolean): void;
    start(): void;
    render(): void;
}
export default SticksView;
//# sourceMappingURL=stick_view.d.ts.map
interface StickOptions {
    lineHead: [number, number];
    lineTail: [number, number];
}
declare class Stick {
    lineHead: [number, number];
    lineTail: [number, number];
    color: string;
    width: number;
    pos: number | null;
    prePos: number | null;
    endPos: number | null;
    waitTime: number;
    value?: number;
    constructor(options: StickOptions);
    compare(timeDelta: number, speedAmplifier: number): void;
    checkFinishCompare(): boolean;
    getEndpos(anotherStick: Stick): void;
    moveTo(timeDelta: number, speedAmplifier: number): void;
    checkFinishMove(): boolean;
    draw(ctx: CanvasRenderingContext2D): void;
}
export default Stick;
//# sourceMappingURL=stick.d.ts.map
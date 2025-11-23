import Stick from './stick';
type Trace = [string, number, number, string];
type AlgorithmFunction = (sticks: Stick[]) => Trace[];
type ShuffleFunction = (sticks: Stick[]) => void;
type Callback = (success: boolean) => void;
declare class Sticks {
    DIM_X: number;
    DIM_Y: number;
    sticks: Stick[];
    NUM_STICK: number;
    MID_NUM: number;
    dangle: number;
    cons: number;
    traces: Trace[];
    operationState: string;
    numComparisons: number;
    numSwaps: number;
    shuffle: boolean;
    sortingCallback?: Callback;
    quickShuffleCallback?: Callback;
    constructor();
    getNumComparisons(): number;
    getNumSwaps(): number;
    addSticks(): void;
    step(timeDelta: number, speedAmplifier: number): void;
    updateSticks(timeDelta: number, speedAmplifier: number): void;
    quickShuffle(): void;
    checkAllFinishMove(): boolean;
    quickVersion(timeDelta: number, speedAmplifier: number): void;
    stepVersion(timeDelta: number, speedAmplifier: number): void;
    adopAlgorithm(algorithm: AlgorithmFunction | null, shuffle?: ShuffleFunction, quickShuffle?: boolean, quickShuffleCallback?: Callback, sortingCallback?: Callback): void;
    checkFinishSwap(stick1: Stick, stick2: Stick): boolean;
    swap(stick1: Stick, stick2: Stick, timeDelta: number, speedAmplifier: number): void;
    checkFinishCompare(stick1: Stick, stick2: Stick): boolean;
    compare(stick1: Stick, stick2: Stick, timeDelta: number, speedAmplifier: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
}
export default Sticks;
//# sourceMappingURL=stick_arr.d.ts.map
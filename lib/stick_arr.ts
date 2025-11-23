import Stick from './stick';
import { Util } from './util';
import { merge } from 'lodash';

type Trace = [string, number, number, string];
type AlgorithmFunction = (sticks: Stick[]) => Trace[];
type ShuffleFunction = (sticks: Stick[]) => void;
type Callback = (success: boolean) => void;

class Sticks {
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

    constructor() {
        this.DIM_X = 1024;
        this.DIM_Y = 110;
        this.sticks = [];
        this.NUM_STICK = 99;
        this.MID_NUM = (this.NUM_STICK - 1) / 2;
        this.dangle = Math.PI / 180;
        this.addSticks();
        this.cons = 0;
        this.traces = [];
        this.operationState = "";
        this.numComparisons = 0;
        this.numSwaps = 0;
        this.shuffle = false;
    }

    getNumComparisons(): number {
        return this.numComparisons;
    }

    getNumSwaps(): number {
        return this.numSwaps;
    }

    addSticks(): void {
        const mid_stick = new Stick({ lineHead: [512, 80], lineTail: [512, 20] });
        this.sticks.push(mid_stick);

        for (let i = 1; i < this.MID_NUM + 1; i++) {
            let leftOne = merge({}, this.sticks[0]);
            let leftAngle = Math.PI / 2 - (this.dangle * i);
            let rightOne = merge({}, this.sticks[this.sticks.length - 1]);
            let rightAngle = Math.PI / 2 + (this.dangle * i);

            leftOne.lineHead = [leftOne.lineHead[0] - 8, leftOne.lineHead[1]];
            leftOne.lineTail = Util.findLineTail(leftOne.lineHead, leftAngle);
            this.sticks.unshift(new Stick(leftOne));

            rightOne.lineHead = [rightOne.lineHead[0] + 8, rightOne.lineHead[1]];
            rightOne.lineTail = Util.findLineTail(rightOne.lineHead, rightAngle);
            this.sticks.push(new Stick(rightOne));
        }

        for (let i = 0; i < this.sticks.length; i++) {
            this.sticks[i].pos = i;
            this.sticks[i].prePos = i;
        }
    }

    step(timeDelta: number, speedAmplifier: number): void {
        this.updateSticks(timeDelta, speedAmplifier);
    }

    updateSticks(timeDelta: number, speedAmplifier: number): void {
        if (this.shuffle) {
            this.quickVersion(timeDelta, speedAmplifier);
        } else {
            this.stepVersion(timeDelta, speedAmplifier);
        }
    }

    quickShuffle(): void {
        const sticksMap: Record<number, Stick> = {};
        let stick: Stick;

        for (let i = 0; i < this.sticks.length; i++) {
            stick = this.sticks[i];
            if (stick.prePos !== null) {
                sticksMap[stick.prePos] = stick;
            }
        }

        for (let j = 0; j < this.sticks.length; j++) {
            stick = this.sticks[j];
            stick.getEndpos(sticksMap[j]);
            this.sticks[j].prePos = j;
        }
    }

    checkAllFinishMove(): boolean {
        for (let i = 0; i < this.sticks.length; i++) {
            if (this.sticks[i].endPos) {
                return false;
            }
        }
        return true;
    }

    quickVersion(timeDelta: number, speedAmplifier: number): void {
        this.operationState = "shuffling";
        for (let i = 0; i < this.sticks.length; i++) {
            if (this.sticks[i].endPos) {
                this.sticks[i].moveTo(timeDelta, speedAmplifier);
            }
        }
        if (this.checkAllFinishMove()) {
            this.operationState = "shuffled";
            this.numSwaps = 0;
            this.numComparisons = 0;

            if (this.sortingCallback) {
                this.sortingCallback(true);
            }
        }
    }

    stepVersion(timeDelta: number, speedAmplifier: number): void {
        let stick1: Stick | undefined;
        let stick2: Stick | undefined;
        let operation: string;

        let traces = this.traces;
        if (this.cons < traces.length) {
            const trace = traces[this.cons];
            operation = trace[0];
            for (let i = 0; i < this.sticks.length; i++) {
                if (this.sticks[i].pos === trace[1]) {
                    stick1 = this.sticks[i];
                }
                if (this.sticks[i].pos === trace[2]) {
                    stick2 = this.sticks[i];
                }
            }

            this.operationState = trace[3];
            if (this.operationState === 'Shuffling') {
                this.numSwaps = 0;
                this.numComparisons = 0;
            }

            if (this.cons === traces.length - 1) {
                if (this.operationState === 'Sorting') {
                    this.operationState = 'Sorted';
                    // Update prePos to match current positions after sorting
                    for (let i = 0; i < this.sticks.length; i++) {
                        this.sticks[i].prePos = i;
                    }
                } else {
                    this.operationState = 'Shuffled';
                }
            }

            if (operation === 'compare' && stick1 && stick2) {
                this.compare(stick1, stick2, timeDelta, speedAmplifier);
            } else if (operation === 'swap' && stick1 && stick2) {
                if (stick1 !== stick2) {
                    stick1.getEndpos(stick2);
                    stick2.getEndpos(stick1);
                    this.swap(stick1, stick2, timeDelta, speedAmplifier);
                } else {
                    this.cons++;
                    if (this.operationState !== 'Shuffling' && this.operationState !== 'Shuffled') {
                        this.numSwaps++;
                    }
                }
            }
        } else {
            if (this.quickShuffleCallback) {
                this.quickShuffleCallback(true);
            }
            return;
        }
    }

    adopAlgorithm(
        algorithm: AlgorithmFunction | null,
        shuffle?: ShuffleFunction,
        quickShuffle: boolean = false,
        quickShuffleCallback?: Callback,
        sortingCallback?: Callback
    ): void {
        this.shuffle = quickShuffle;
        if (quickShuffle && shuffle) {
            if (this.checkAllFinishMove()) {
                this.sortingCallback = sortingCallback;
                shuffle(this.sticks);
                this.quickShuffle();
            } else {
                return;
            }
        } else if (algorithm) {
            this.quickShuffleCallback = quickShuffleCallback;
            const traces = algorithm(this.sticks);
            this.traces = this.traces.concat(traces);
        }
    }

    checkFinishSwap(stick1: Stick, stick2: Stick): boolean {
        if (stick1.checkFinishMove() && stick2.checkFinishMove()) {
            this.cons++;
            if (this.operationState !== 'Shuffling' && this.operationState !== 'Shuffled') {
                this.numSwaps++;
            }
            return true;
        } else {
            return false;
        }
    }

    swap(stick1: Stick, stick2: Stick, timeDelta: number, speedAmplifier: number): void {
        if (!this.checkFinishSwap(stick1, stick2)) {
            stick1.moveTo(timeDelta, speedAmplifier);
            stick2.moveTo(timeDelta, speedAmplifier);
        }
    }

    checkFinishCompare(stick1: Stick, stick2: Stick): boolean {
        if (stick1.checkFinishCompare() && stick2.checkFinishCompare()) {
            this.cons++;
            this.numComparisons++;
            return true;
        } else {
            return false;
        }
    }

    compare(stick1: Stick, stick2: Stick, timeDelta: number, speedAmplifier: number): void {
        if (!this.checkFinishCompare(stick1, stick2)) {
            stick1.compare(timeDelta, speedAmplifier);
            stick2.compare(timeDelta, speedAmplifier);
        }
    }

    getOperationState(): string {
        return this.operationState;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

        this.sticks.forEach(stick => {
            stick.draw(ctx);
        });
    }
}

export default Sticks;

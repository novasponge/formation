import Stick from './stick';
import { createMagicHandler, Trace, TraceType, MagicArrayContext } from './magic_proxy_handler';

export { Trace, TraceType };

class MagicArray implements MagicArrayContext {
    sticks: Stick[];
    traces: Trace[];
    compareBuffer: number[];
    swapBuffer: Record<string, boolean>;
    proxy: Stick[];

    constructor(sticks: Stick[]) {
        this.sticks = sticks;
        this.traces = [];
        this.compareBuffer = [];
        this.swapBuffer = {};

        // Bind methods to avoid 'this' issues
        this.recordAccess = this.recordAccess.bind(this);

        // Create the proxy
        this.proxy = new Proxy(this.sticks, createMagicHandler(this)) as Stick[];
    }

    getTraces(): Trace[] {
        return this.traces;
    }

    recordAccess(id: number): void {
        this.compareBuffer.push(id);
        if (this.compareBuffer.length === 2) {
            this.traces.push(["compare", this.compareBuffer[0], this.compareBuffer[1], "Sorting"]);
            this.compareBuffer = [];
        }
    }
}

export default MagicArray;

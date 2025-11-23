import Stick from './stick';

type TraceType = 'compare' | 'swap';
type Trace = [TraceType, number, number, string];

interface ValueProxy {
    value: number;
    valueOf(): number;
    toString(): string;
}

class MagicArray {
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
        this.proxy = new Proxy(this.sticks, this.arrayHandler()) as Stick[];
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

    arrayHandler(): ProxyHandler<Stick[]> {
        const self = this;
        return {
            get: function (target: Stick[], prop: string | symbol): any {
                // Array methods
                if (prop === 'length') return target.length;
                if (prop === 'toString') return target.toString;
                if (prop === 'slice') return target.slice.bind(target);

                // Index access
                if (typeof prop === 'string' && !isNaN(Number(prop))) {
                    const index = parseInt(prop);
                    const stick = target[index];

                    if (!stick) return stick;

                    // Return a wrapper that tracks the source index
                    // and intercepts .pos access
                    return new Proxy(stick, {
                        get: function (stickTarget: Stick, stickProp: string | symbol): any {
                            if (stickProp === 'pos') {
                                // Return a ValueProxy that triggers recordAccess on valueOf
                                const valueProxy: ValueProxy = {
                                    value: stickTarget.pos!,
                                    valueOf: function () {
                                        self.recordAccess(stickTarget.pos!);
                                        return this.value;
                                    },
                                    toString: function () {
                                        self.recordAccess(stickTarget.pos!);
                                        return this.value.toString();
                                    }
                                };
                                return valueProxy;
                            }
                            // Allow access to internal property for swap detection
                            if (stickProp === '_sourceIndex') return index;
                            if (stickProp === '_raw') return stickTarget;

                            return (stickTarget as any)[stickProp];
                        }
                    });
                }

                return (target as any)[prop];
            },

            set: function (target: Stick[], prop: string | symbol, value: any): boolean {
                if (typeof prop === 'string' && !isNaN(Number(prop))) {
                    const targetIndex = parseInt(prop);

                    let sourceIndex: number = -1;
                    let realValue: Stick = value;

                    // Check if we are assigning a stick wrapper
                    if (value && typeof value === 'object') {
                        // Try to get _sourceIndex from the proxy
                        try {
                            if ((value as any)._sourceIndex !== undefined) {
                                sourceIndex = (value as any)._sourceIndex;
                            }
                        } catch (e) { }

                        // Try to get _raw to store the real object
                        try {
                            if ((value as any)._raw !== undefined) {
                                realValue = (value as any)._raw;
                            }
                        } catch (e) { }
                    }

                    target[targetIndex] = realValue;

                    // Swap Detection
                    if (sourceIndex !== undefined && sourceIndex !== -1 && sourceIndex !== targetIndex) {
                        const key = sourceIndex + "->" + targetIndex;
                        const reverseKey = targetIndex + "->" + sourceIndex;

                        self.swapBuffer[key] = true;

                        if (self.swapBuffer[reverseKey]) {
                            // Cycle detected! It's a swap.
                            const stickA = target[sourceIndex];
                            const stickB = target[targetIndex];

                            if (stickA && stickB && stickA.pos !== null && stickB.pos !== null) {
                                self.traces.push(["swap", stickA.pos, stickB.pos, "Sorting"]);
                            }

                            delete self.swapBuffer[key];
                            delete self.swapBuffer[reverseKey];
                        }
                    }

                    return true;
                }

                (target as any)[prop] = value;
                return true;
            }
        };
    }
}

export default MagicArray;

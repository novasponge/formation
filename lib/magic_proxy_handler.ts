import Stick from './stick';

export type TraceType = 'compare' | 'swap';
export type Trace = [TraceType, number, number, string];

export interface MagicArrayContext {
    sticks: Stick[];
    traces: Trace[];
    compareBuffer: number[];
    swapBuffer: Record<string, boolean>;
    recordAccess(id: number): void;
}

interface ValueProxy {
    value: number;
    valueOf(): number;
    toString(): string;
}

export function createMagicHandler(context: MagicArrayContext): ProxyHandler<Stick[]> {
    return {
        get: function (target: Stick[], prop: string | symbol): any {
            return handleGet(target, prop, context);
        },

        set: function (target: Stick[], prop: string | symbol, value: any): boolean {
            return handleSet(target, prop, value, context);
        }
    };
}

function handleGet(target: Stick[], prop: string | symbol, context: MagicArrayContext): any {
    // Array methods
    if (prop === 'length') return target.length;
    if (prop === 'toString') return target.toString;
    if (prop === 'slice') return target.slice.bind(target);

    // Index access
    if (typeof prop === 'string' && !isNaN(Number(prop))) {
        return handleIndexAccess(target, prop, context);
    }

    return (target as any)[prop];
}

function handleIndexAccess(target: Stick[], prop: string, context: MagicArrayContext): any {
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
                        context.recordAccess(stickTarget.pos!);
                        return this.value;
                    },
                    toString: function () {
                        context.recordAccess(stickTarget.pos!);
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

function handleSet(target: Stick[], prop: string | symbol, value: any, context: MagicArrayContext): boolean {
    if (typeof prop === 'string' && !isNaN(Number(prop))) {
        const targetIndex = parseInt(prop);
        const { realValue, sourceIndex } = resolveValue(value);

        target[targetIndex] = realValue;

        detectSwap(target, targetIndex, sourceIndex, context);

        return true;
    }

    (target as any)[prop] = value;
    return true;
}

function resolveValue(value: any): { realValue: Stick, sourceIndex: number } {
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
    return { realValue, sourceIndex };
}

function detectSwap(target: Stick[], targetIndex: number, sourceIndex: number, context: MagicArrayContext): void {
    if (sourceIndex !== undefined && sourceIndex !== -1 && sourceIndex !== targetIndex) {
        const key = sourceIndex + "->" + targetIndex;
        const reverseKey = targetIndex + "->" + sourceIndex;

        context.swapBuffer[key] = true;

        if (context.swapBuffer[reverseKey]) {
            // Cycle detected! It's a swap.
            const stickA = target[sourceIndex];
            const stickB = target[targetIndex];

            if (stickA && stickB && stickA.pos !== null && stickB.pos !== null) {
                context.traces.push(["swap", stickA.pos, stickB.pos, "Sorting"]);
            }

            delete context.swapBuffer[key];
            delete context.swapBuffer[reverseKey];
        }
    }
}


class MagicArray {
    constructor(sticks) {
        this.sticks = sticks;
        this.traces = [];
        this.compareBuffer = [];
        this.swapBuffer = {}; // Map<targetIndex, sourceIndex>

        // Bind methods to avoid 'this' issues
        this.recordAccess = this.recordAccess.bind(this);

        // Create the proxy
        this.proxy = new Proxy(this.sticks, this.arrayHandler());
    }

    getTraces() {
        return this.traces;
    }

    recordAccess(id) {
        this.compareBuffer.push(id);
        if (this.compareBuffer.length === 2) {
            this.traces.push(["compare", this.compareBuffer[0], this.compareBuffer[1], "Sorting"]);
            this.compareBuffer = [];
        }
    }

    arrayHandler() {
        const self = this;
        return {
            get: function (target, prop) {
                // Array methods
                if (prop === 'length') return target.length;
                if (prop === 'toString') return target.toString;
                if (prop === 'slice') return target.slice.bind(target); // Needed for some algos?

                // Index access
                if (typeof prop === 'string' && !isNaN(prop)) {
                    const index = parseInt(prop);
                    const stick = target[index];

                    if (!stick) return stick;

                    // Return a wrapper that tracks the source index
                    // and intercepts .pos access
                    return new Proxy(stick, {
                        get: function (stickTarget, stickProp) {
                            if (stickProp === 'pos') {
                                // Return a ValueProxy that triggers recordAccess on valueOf
                                return {
                                    value: stickTarget.pos,
                                    valueOf: function () {
                                        self.recordAccess(stickTarget.pos);
                                        return this.value;
                                    },
                                    toString: function () {
                                        self.recordAccess(stickTarget.pos);
                                        return this.value.toString();
                                    }
                                };
                            }
                            // Allow access to internal property for swap detection
                            if (stickProp === '_sourceIndex') return index;
                            if (stickProp === '_raw') return stickTarget;

                            return stickTarget[stickProp];
                        }
                    });
                }

                return target[prop];
            },

            set: function (target, prop, value) {
                if (typeof prop === 'string' && !isNaN(prop)) {
                    const targetIndex = parseInt(prop);

                    let sourceIndex = -1;
                    let realValue = value;

                    // Check if we are assigning a stick wrapper
                    if (value && typeof value === 'object') {
                        // Try to get _sourceIndex from the proxy
                        // Note: accessing _sourceIndex on the proxy triggers the get trap of the stick proxy
                        try {
                            if (value._sourceIndex !== undefined) {
                                sourceIndex = value._sourceIndex;
                            }
                        } catch (e) { }

                        // Try to get _raw to store the real object
                        try {
                            if (value._raw !== undefined) {
                                realValue = value._raw;
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

                            if (stickA && stickB) {
                                self.traces.push(["swap", stickA.pos, stickB.pos, "Sorting"]);
                            }

                            delete self.swapBuffer[key];
                            delete self.swapBuffer[reverseKey];
                        }
                    }

                    return true;
                }

                target[prop] = value;
                return true;
            }
        };
    }
}

export default MagicArray;

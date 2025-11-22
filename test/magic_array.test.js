import MagicArray from '../lib/magic_array';

describe('MagicArray', () => {
    let sticks;
    let magicArray;
    let proxy;

    beforeEach(() => {
        sticks = [
            { pos: 10, value: 100 },
            { pos: 20, value: 200 },
            { pos: 30, value: 300 }
        ];
        magicArray = new MagicArray(sticks);
        proxy = magicArray.proxy;
    });

    describe('initialization', () => {
        test('creates a proxy with correct length', () => {
            expect(proxy.length).toBe(3);
        });

        test('proxy elements have correct pos values', () => {
            expect(Number(proxy[0].pos)).toBe(10);
            expect(Number(proxy[1].pos)).toBe(20);
            expect(Number(proxy[2].pos)).toBe(30);
        });

        test('starts with empty traces', () => {
            expect(magicArray.getTraces()).toEqual([]);
        });
    });

    describe('comparison detection', () => {
        test('detects comparison when accessing pos in conditional', () => {
            if (proxy[0].pos > proxy[1].pos) {
                // comparison happens
            }

            const traces = magicArray.getTraces();
            expect(traces.length).toBe(1);
            expect(traces[0]).toEqual(['compare', 10, 20, 'Sorting']);
        });

        test('detects multiple comparisons', () => {
            if (proxy[0].pos > proxy[1].pos) { }
            if (proxy[1].pos < proxy[2].pos) { }

            const traces = magicArray.getTraces();
            expect(traces.length).toBe(2);
            expect(traces[0]).toEqual(['compare', 10, 20, 'Sorting']);
            expect(traces[1]).toEqual(['compare', 20, 30, 'Sorting']);
        });

        test('does not record comparison for toString', () => {
            // Clear any existing state
            magicArray.compareBuffer = [];
            magicArray.traces = [];

            String(proxy[0].pos);

            if (proxy[1].pos > proxy[2].pos) { }

            const traces = magicArray.getTraces();
            // The String() call adds to buffer but doesn't flush
            // The comparison flushes with the buffered value
            expect(traces.length).toBe(1);
            // Should be the comparison we explicitly made
            expect(traces[0][0]).toBe('compare');
        });
    });

    describe('swap detection', () => {
        test('detects swap with destructuring assignment', () => {
            [proxy[0], proxy[1]] = [proxy[1], proxy[0]];

            const traces = magicArray.getTraces();
            const swapTrace = traces.find(t => t[0] === 'swap');

            expect(swapTrace).toBeDefined();
            expect(swapTrace[1]).not.toBe(swapTrace[2]);
            expect([10, 20]).toContain(swapTrace[1]);
            expect([10, 20]).toContain(swapTrace[2]);
        });

        test('swap actually modifies the underlying array', () => {
            [proxy[0], proxy[1]] = [proxy[1], proxy[0]];

            expect(sticks[0].pos).toBe(20);
            expect(sticks[1].pos).toBe(10);
        });

        test('detects multiple swaps', () => {
            [proxy[0], proxy[1]] = [proxy[1], proxy[0]];
            [proxy[1], proxy[2]] = [proxy[2], proxy[1]];

            const traces = magicArray.getTraces();
            const swapTraces = traces.filter(t => t[0] === 'swap');

            expect(swapTraces.length).toBe(2);
        });
    });

    describe('sorting algorithm integration', () => {
        test('bubble sort generates correct traces', () => {
            const n = proxy.length;
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - i - 1; j++) {
                    if (proxy[j].pos > proxy[j + 1].pos) {
                        [proxy[j], proxy[j + 1]] = [proxy[j + 1], proxy[j]];
                    }
                }
            }

            const traces = magicArray.getTraces();
            expect(traces.length).toBeGreaterThan(0);

            const compareTraces = traces.filter(t => t[0] === 'compare');
            const swapTraces = traces.filter(t => t[0] === 'swap');

            expect(compareTraces.length).toBeGreaterThan(0);
            expect(swapTraces.length).toBeGreaterThan(0);

            // Verify array is sorted
            expect(sticks[0].pos).toBe(10);
            expect(sticks[1].pos).toBe(20);
            expect(sticks[2].pos).toBe(30);
        });
    });

    describe('edge cases', () => {
        test('handles single element array', () => {
            const singleStick = [{ pos: 10, value: 100 }];
            const singleArray = new MagicArray(singleStick);
            const singleProxy = singleArray.proxy;

            expect(singleProxy.length).toBe(1);
            expect(singleArray.getTraces()).toEqual([]);
        });

        test('handles empty comparisons (same element)', () => {
            if (proxy[0].pos > proxy[0].pos) { }

            const traces = magicArray.getTraces();
            expect(traces.length).toBe(1);
        });
    });
});

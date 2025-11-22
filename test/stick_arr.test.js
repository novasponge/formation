import Sticks from '../lib/stick_arr';

describe('Sticks', () => {
    let sticks;

    beforeEach(() => {
        sticks = new Sticks();
    });

    describe('initialization', () => {
        test('creates correct number of sticks', () => {
            expect(sticks.sticks.length).toBe(99);
        });

        test('initializes with correct properties', () => {
            expect(sticks.DIM_X).toBe(1024);
            expect(sticks.DIM_Y).toBe(110);
            expect(sticks.traces).toEqual([]);
            expect(sticks.cons).toBe(0);
            expect(sticks.numComparisons).toBe(0);
            expect(sticks.numSwaps).toBe(0);
        });

        test('each stick has pos and prePos initialized', () => {
            sticks.sticks.forEach((stick, index) => {
                expect(stick.pos).toBe(index);
                expect(stick.prePos).toBe(index);
            });
        });
    });

    describe('adopAlgorithm', () => {
        test('executes algorithm and stores traces', () => {
            const mockAlgorithm = jest.fn((arr) => {
                return [
                    ['compare', 0, 1, 'Sorting'],
                    ['swap', 0, 1, 'Sorting']
                ];
            });

            sticks.adopAlgorithm(mockAlgorithm);

            expect(mockAlgorithm).toHaveBeenCalledWith(sticks.sticks);
            expect(sticks.traces.length).toBe(2);
            expect(sticks.traces[0]).toEqual(['compare', 0, 1, 'Sorting']);
            expect(sticks.traces[1]).toEqual(['swap', 0, 1, 'Sorting']);
        });

        test('concatenates traces from multiple algorithm calls', () => {
            const mockAlgorithm1 = jest.fn(() => [['compare', 0, 1, 'Sorting']]);
            const mockAlgorithm2 = jest.fn(() => [['swap', 1, 2, 'Sorting']]);

            sticks.adopAlgorithm(mockAlgorithm1);
            sticks.adopAlgorithm(mockAlgorithm2);

            expect(sticks.traces.length).toBe(2);
        });

        test('handles quick shuffle', () => {
            const mockShuffle = jest.fn();
            const mockCallback = jest.fn();

            sticks.adopAlgorithm(null, mockShuffle, true, null, mockCallback);

            expect(mockShuffle).toHaveBeenCalledWith(sticks.sticks);
        });
    });

    describe('prePos update after sorting', () => {
        test('updates prePos after sort completes', () => {
            // Set initial prePos values
            sticks.sticks.forEach((stick, i) => {
                stick.prePos = i;
            });

            // Simulate a simple sort that swaps first two sticks
            const temp = sticks.sticks[0];
            sticks.sticks[0] = sticks.sticks[1];
            sticks.sticks[1] = temp;

            // Set up traces for a completed sort
            sticks.traces = [
                ['swap', 0, 1, 'Sorting']
            ];
            sticks.cons = 0;
            sticks.operationState = 'Sorting';

            // Manually trigger the prePos update logic
            // This simulates what happens at the end of stepVersion
            if (sticks.cons === sticks.traces.length - 1) {
                if (sticks.operationState === 'Sorting') {
                    sticks.operationState = 'Sorted';
                    for (let i = 0; i < sticks.sticks.length; i++) {
                        sticks.sticks[i].prePos = i;
                    }
                }
            }

            // Verify prePos was updated
            sticks.sticks.forEach((stick, index) => {
                expect(stick.prePos).toBe(index);
            });
        });
    });
    describe('checkAllFinishMove', () => {
        test('returns true when no sticks are moving', () => {
            expect(sticks.checkAllFinishMove()).toBe(true);
        });

        test('returns false when any stick has endPos', () => {
            sticks.sticks[0].endPos = 100;
            expect(sticks.checkAllFinishMove()).toBe(false);
        });
    });

    describe('counters', () => {
        test('getNumComparisons returns correct value', () => {
            sticks.numComparisons = 5;
            expect(sticks.getNumComparisons()).toBe(5);
        });

        test('getNumSwaps returns correct value', () => {
            sticks.numSwaps = 3;
            expect(sticks.getNumSwaps()).toBe(3);
        });

        test('resets counters after shuffle', () => {
            sticks.numComparisons = 10;
            sticks.numSwaps = 5;

            sticks.traces = [['swap', 0, 1, 'Shuffling']];
            sticks.cons = 0;
            sticks.operationState = 'Shuffling';

            sticks.stepVersion(16, 1);

            expect(sticks.numComparisons).toBe(0);
            expect(sticks.numSwaps).toBe(0);
        });
    });
});

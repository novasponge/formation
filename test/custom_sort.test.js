import MagicArray from '../lib/magic_array';

describe('Custom Sort Integration', () => {
    let sticks;

    beforeEach(() => {
        sticks = [
            { pos: 30, value: 300 },
            { pos: 10, value: 100 },
            { pos: 20, value: 200 }
        ];
    });

    test('executes user code string and generates traces', () => {
        // Simulate the user code string from the editor
        const userCode = `
            (arr) => {
                for (let i = 0; i < arr.length - 1; i++) {
                    for (let j = 0; j < arr.length - i - 1; j++) {
                        if (arr[j].pos > arr[j+1].pos) {
                            let temp = arr[j];
                            arr[j] = arr[j+1];
                            arr[j+1] = temp;
                        }
                    }
                }
            }
        `;

        // Simulate the execution logic in CustomSortModal
        const createAlgo = new Function(`return (${userCode})`);
        const userAlgo = createAlgo();

        expect(typeof userAlgo).toBe('function');

        // Wrap with MagicArray
        const magicArray = new MagicArray(sticks);
        userAlgo(magicArray.proxy);
        const traces = magicArray.getTraces();

        // Verify traces
        expect(traces.length).toBeGreaterThan(0);
        
        const swapTraces = traces.filter(t => t[0] === 'swap');
        expect(swapTraces.length).toBeGreaterThan(0);

        // Verify sorting result
        expect(sticks[0].pos).toBe(10);
        expect(sticks[1].pos).toBe(20);
        expect(sticks[2].pos).toBe(30);
    });

    test('handles comments in user code', () => {
        const userCode = `
            // This is a comment
            (arr) => {
                // Another comment
                if (arr[0].pos > arr[1].pos) {
                    let temp = arr[0];
                    arr[0] = arr[1];
                    arr[1] = temp;
                }
            }
        `;

        const createAlgo = new Function(`return (
${userCode}
)`);
        const userAlgo = createAlgo();
        
        const magicArray = new MagicArray(sticks);
        userAlgo(magicArray.proxy);
        
        // Should execute without error
        expect(magicArray.getTraces().length).toBeGreaterThan(0);
    });

    test('handles invalid code gracefully', () => {
        const invalidCode = `(arr) => { throw new Error("User Error"); }`;
        
        const createAlgo = new Function(`return (${invalidCode})`);
        const userAlgo = createAlgo();
        const magicArray = new MagicArray(sticks);

        expect(() => {
            userAlgo(magicArray.proxy);
        }).toThrow("User Error");
    });
});

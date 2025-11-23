import Stick from './stick';
type TraceType = 'compare' | 'swap';
type Trace = [TraceType, number, number, string];
declare class MagicArray {
    sticks: Stick[];
    traces: Trace[];
    compareBuffer: number[];
    swapBuffer: Record<string, boolean>;
    proxy: Stick[];
    constructor(sticks: Stick[]);
    getTraces(): Trace[];
    recordAccess(id: number): void;
    arrayHandler(): ProxyHandler<Stick[]>;
}
export default MagicArray;
//# sourceMappingURL=magic_array.d.ts.map
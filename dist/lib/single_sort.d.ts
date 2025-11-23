import React from 'react';
import SticksView from './stick_view';
interface SingleSortProps {
    algorithm: SticksView;
    handleAlgorithm: (callback: (value: boolean) => void) => void;
    speed: number;
    loaded: boolean;
    name: string;
}
interface SingleSortState {
    pause: boolean;
    quickShuffleDisabled: boolean;
    shuffling: boolean;
}
declare class SingleSort extends React.Component<SingleSortProps, SingleSortState> {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    constructor(props: SingleSortProps);
    handlePause(): void;
    quickShuffle(): void;
    checkAvailabilityCB(value: boolean): void;
    handleAlgorithm(): void;
    checkSortAvailability(value: boolean): void;
    render(): React.ReactElement;
}
export default SingleSort;
//# sourceMappingURL=single_sort.d.ts.map
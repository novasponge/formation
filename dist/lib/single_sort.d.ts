import React from "react";
import SticksView from "./stick_view";
interface SingleSortProps {
    algorithm: SticksView;
    handleAlgorithm: (callback: (value: boolean) => void) => void;
    speed: number;
    loaded: boolean;
    name: string;
}
export interface SingleSortHandle {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    quickShuffle: () => void;
    checkSortAvailability: (value: boolean) => void;
    checkAvailabilityCB: (value: boolean) => void;
    setShuffling: (shuffling: boolean) => void;
    setQuickShuffleDisabled: (disabled: boolean) => void;
    isQuickShuffleDisabled: () => boolean;
    isShuffling: () => boolean;
    algorithm: SticksView;
    name: string;
}
declare const SingleSort: React.ForwardRefExoticComponent<SingleSortProps & React.RefAttributes<SingleSortHandle>>;
export default SingleSort;
//# sourceMappingURL=single_sort.d.ts.map
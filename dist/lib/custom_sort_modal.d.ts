import React from 'react';
import SingleSort from './single_sort';
import { SortingAlgorithm } from './sorting_algs/types';
import SticksView from './stick_view';
import "react-input-range/lib/css/index.css";
interface CustomSortModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    value: number;
    onSpeedChange: (value: number) => void;
}
interface CustomSortModalState {
    code: string;
    error: string | null;
    customAlgorithm: SortingAlgorithm | null;
    sticksView: SticksView | null;
    loaded: boolean;
}
declare class CustomSortModal extends React.Component<CustomSortModalProps, CustomSortModalState> {
    private singleSortRef;
    constructor(props: CustomSortModalProps);
    handleEditorChange(value: string | undefined): void;
    handleRun(): void;
    handleCustomSort(checkAvailabilityCB?: (value: boolean) => void): void;
    onSingleSortMount(): void;
    initSticksView: (element: SingleSort | null) => void;
    render(): React.JSX.Element;
}
export default CustomSortModal;
//# sourceMappingURL=custom_sort_modal.d.ts.map
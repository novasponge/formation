import React from "react";
import "react-input-range/lib/css/index.css";
interface CustomSortModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    value: number;
    onSpeedChange: (value: number) => void;
}
declare const CustomSortModal: React.FC<CustomSortModalProps>;
export default CustomSortModal;
//# sourceMappingURL=custom_sort_modal.d.ts.map
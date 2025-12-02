import React, { useState, useRef, useCallback } from "react";
import Modal from "react-modal";
import Editor from "@monaco-editor/react";
import SingleSort, { SingleSortHandle } from "./single_sort";
import { modalStyle } from "./modal_style";
import { SortingAlgorithm } from "./sorting_algs/types";
import Stick from "./stick";
import SticksView from "./stick_view";
import MagicArray from "./magic_array";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

interface CustomSortModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  value: number;
  onSpeedChange: (value: number) => void;
}

const DEFAULT_CODE = `// Write your sorting algorithm here.
// The function takes an array of sticks.
// Just perform comparisons and swaps on the array.
// Traces are automatically generated!
//
// Example (Quick Sort):
(arr) => {
  function partition(low, high) {
    let pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      // Accessing .pos triggers comparison trace
      if (arr[j].pos < pivot.pos) {
        i++;
        // Swap arr[i] and arr[j]
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
    // Swap arr[i+1] and arr[high] (or pivot)
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    return i + 1;
  }

  function quickSort(low, high) {
    if (low < high) {
      let pi = partition(low, high);
      
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  }

  quickSort(0, arr.length - 1);
}`;

const CustomSortModal: React.FC<CustomSortModalProps> = (props) => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [error, setError] = useState<string | null>(null);
  const [customAlgorithm, setCustomAlgorithm] =
    useState<SortingAlgorithm | null>(null);
  const [sticksView, setSticksView] = useState<SticksView | null>(null);
  const [loaded, setLoaded] = useState(false);

  const singleSortRef = useRef<SingleSortHandle>(null);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleRun = () => {
    try {
      const createAlgo = new Function(`return (${code})`);
      const userAlgo = createAlgo();

      if (typeof userAlgo !== "function") {
        throw new Error("Code must return a function.");
      }

      const wrappedAlgorithm: SortingAlgorithm = (sticks: Stick[]) => {
        const magicArray = new MagicArray(sticks);
        userAlgo(magicArray.proxy);
        return magicArray.getTraces();
      };

      setCustomAlgorithm(() => wrappedAlgorithm);
      setError(null);

      // If view is already initialized, just run the shuffle to reset
      if (sticksView && singleSortRef.current) {
        singleSortRef.current.quickShuffle();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCustomSort = (checkAvailabilityCB?: (value: boolean) => void) => {
    if (customAlgorithm && sticksView) {
      sticksView.sticks.adopAlgorithm(
        customAlgorithm,
        undefined,
        false,
        checkAvailabilityCB
      );
    }
  };

  const initSticksView = useCallback(
    (element: SingleSortHandle | null) => {
      if (element && !sticksView) {
        // Element is mounted
        // We need to access the canvas ref from the SingleSort instance
        const canvas = element.canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const view = new SticksView(ctx);
            view.start();
            setSticksView(view);
            setLoaded(true);

            // Also set the ref manually since we are using this callback
            (singleSortRef as any).current = element;
          }
        }
      }
    },
    [sticksView]
  );

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      style={{
        overlay: modalStyle.overlay,
        content: {
          ...modalStyle.content,
          width: "95%",
          height: "95%",
          maxWidth: "none",
          maxHeight: "none",
          padding: "20px",
        },
      }}
      contentLabel="Custom Sort Editor"
      onAfterOpen={() => {
        // Reset state if needed, or keep it to preserve code
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h2>Custom Sorting Algorithm</h2>
          <button onClick={props.onRequestClose}>Close</button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: "400px",
          }}
        >
          <div
            style={{
              flex: 1,
              marginBottom: "10px",
              border: "1px solid #ccc",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={handleEditorChange}
              theme="vs-dark"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <button
                onClick={handleRun}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Update & Run
              </button>
              <div
                style={{
                  display: "inline-block",
                  width: "300px",
                  marginLeft: "20px",
                  verticalAlign: "middle",
                }}
              >
                <span style={{ marginRight: "10px", fontWeight: "bold" }}>
                  Speed:
                </span>
                <div style={{ display: "inline-block", width: "200px" }}>
                  <InputRange
                    maxValue={20}
                    minValue={0}
                    value={props.value}
                    step={0.1}
                    onChange={(value) => props.onSpeedChange(value as number)}
                  />
                </div>
              </div>
              {error && (
                <div style={{ color: "red", marginTop: "10px" }}>
                  <strong>Error:</strong> {error}
                </div>
              )}
            </div>

            {/* Visualization Area */}
            <div
              style={{
                border: "1px solid #eee",
                position: "relative",
                minHeight: "150px",
              }}
            >
              <SingleSort
                ref={initSticksView}
                handleAlgorithm={handleCustomSort}
                algorithm={sticksView as any}
                speed={props.value}
                loaded={loaded}
                name="Custom Sort"
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CustomSortModal;

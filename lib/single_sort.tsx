import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { shuffle } from "./sorting_algs/shuffle";
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

const SingleSort = forwardRef<SingleSortHandle, SingleSortProps>(
  (props, ref) => {
    const [pause, setPause] = useState(false);
    const [quickShuffleDisabled, setQuickShuffleDisabledState] =
      useState(false);
    const [shuffling, setShufflingState] = useState(false);
    const [swaps, setSwaps] = useState(0);
    const [comparisons, setComparisons] = useState(0);
    const [state, setState] = useState("");

    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Refs to keep track of state for imperative access without stale closures if needed,
    // though for simple getters/setters in useImperativeHandle, direct state access might be tricky due to closures.
    // We'll use refs to hold the latest state values for the imperative getters.
    const quickShuffleDisabledRef = useRef(quickShuffleDisabled);
    const shufflingRef = useRef(shuffling);

    useEffect(() => {
      quickShuffleDisabledRef.current = quickShuffleDisabled;
    }, [quickShuffleDisabled]);

    useEffect(() => {
      shufflingRef.current = shuffling;
    }, [shuffling]);

    const updateStats = (stats: {
      swaps: number;
      comparisons: number;
      state: string;
    }) => {
      setSwaps((prev) => {
        if (prev !== stats.swaps) return stats.swaps;
        return prev;
      });
      setComparisons((prev) => {
        if (prev !== stats.comparisons) return stats.comparisons;
        return prev;
      });
      setState((prev) => {
        if (prev !== stats.state) return stats.state;
        return prev;
      });
    };

    useEffect(() => {
      if (props.algorithm) {
        props.algorithm.setOnUpdate(updateStats);
      }
    }, [props.algorithm]);

    const handlePause = () => {
      setPause((prev) => !prev);
    };

    const checkSortAvailability = (value: boolean) => {
      if (value) {
        setShufflingState(false);
      }
    };

    const quickShuffle = () => {
      props.algorithm.sticks.adopAlgorithm(
        null,
        shuffle,
        true,
        undefined,
        checkSortAvailability
      );
      setShufflingState(true);
    };

    const checkAvailabilityCB = (value: boolean) => {
      if (value) {
        setQuickShuffleDisabledState(false);
      }
    };

    const handleAlgorithmClick = () => {
      props.handleAlgorithm(checkAvailabilityCB);
      setQuickShuffleDisabledState(true);
    };

    useImperativeHandle(ref, () => ({
      canvasRef,
      quickShuffle,
      checkSortAvailability,
      checkAvailabilityCB,
      setShuffling: (val: boolean) => setShufflingState(val),
      setQuickShuffleDisabled: (val: boolean) =>
        setQuickShuffleDisabledState(val),
      isQuickShuffleDisabled: () => quickShuffleDisabledRef.current,
      isShuffling: () => shufflingRef.current,
      algorithm: props.algorithm,
      name: props.name,
    }));

    const pauseState = pause ? "Resume" : "Pause";

    // This side effect was in render()
    if (props.loaded && props.algorithm) {
      props.algorithm.getSpeedAmplifier(props.speed, pause);
    }

    return (
      <div className="canvas-container">
        <div className="button-holder">
          <button
            className="quickShuffle"
            onClick={quickShuffle}
            disabled={quickShuffleDisabled}
          >
            Quick Shuffle
          </button>
          <button
            className="sorting"
            onClick={handleAlgorithmClick}
            disabled={shuffling}
          >
            {props.name}
          </button>
          <button onClick={handlePause}>{pauseState}</button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            marginBottom: "5px",
            fontFamily: "Varela Round",
            fontSize: "13px",
          }}
        >
          <span style={{ color: "#dd6417" }}>Number of Swaps: {swaps}</span>
          <span style={{ color: "#000" }}>State: {state}</span>
          <span style={{ color: "#147ee0" }}>
            Number of Comparisons: {comparisons}
          </span>
        </div>
        <canvas
          ref={canvasRef}
          width={1024}
          height={110}
          style={{ width: "100%" }}
        />
      </div>
    );
  }
);

export default SingleSort;

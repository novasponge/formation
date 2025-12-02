import SticksView from "./stick_view";
import { shuffle } from "./sorting_algs/shuffle";
import { bubbleSort } from "./sorting_algs/bubble_sort";
import { quickSort } from "./sorting_algs/quick_sort";
import { insertionSort } from "./sorting_algs/insert_sort";
import { selectionSort } from "./sorting_algs/select_sort";
import { heapSort } from "./sorting_algs/heap_sort";
import { oddEvenSort } from "./sorting_algs/odd_even_sort";
import { cocktailSort } from "./sorting_algs/cocktail_sort";
import { bitonicSort } from "./sorting_algs/bitonic_sort";
import { mergeSort } from "./sorting_algs/merge_sort";
import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import InputRange from "react-input-range";
import { modalStyle } from "./modal_style";
import "react-input-range/lib/css/index.css";
import SingleSort, { SingleSortHandle } from "./single_sort";

import CustomSortModal from "./custom_sort_modal";

import { createRoot } from "react-dom/client";

const SortingVisualization: React.FC = () => {
  const [instructionOpen, setInstructionOpen] = useState(false);
  const [customSortOpen, setCustomSortOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [checkAvailability, setCheckAvailability] = useState(true);
  const [pause, setPause] = useState(false);
  const [shufflePause, setShufflePause] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [shuffleView, setShuffleView] = useState<SticksView>();
  const [quickSortView, setQuickSortView] = useState<SticksView>();
  const [bubbleSortView, setBubbleSortView] = useState<SticksView>();
  const [mergeSortView, setMergeSortView] = useState<SticksView>();
  const [bitonicSortView, setBitonicSortView] = useState<SticksView>();
  const [heapSortView, setHeapSortView] = useState<SticksView>();
  const [selectionSortView, setSelectionSortView] = useState<SticksView>();
  const [insertionSortView, setInsertionSortView] = useState<SticksView>();
  const [oddEvenSortView, setOddEvenSortView] = useState<SticksView>();
  const [cocktailSortView, setCocktailSortView] = useState<SticksView>();

  const shuffleRef = useRef<SingleSortHandle>(null);
  const quickSortRef = useRef<SingleSortHandle>(null);
  const bubbleSortRef = useRef<SingleSortHandle>(null);
  const mergeSortRef = useRef<SingleSortHandle>(null);
  const bitonicSortRef = useRef<SingleSortHandle>(null);
  const heapSortRef = useRef<SingleSortHandle>(null);
  const selectionSortRef = useRef<SingleSortHandle>(null);
  const insertionSortRef = useRef<SingleSortHandle>(null);
  const oddEvenSortRef = useRef<SingleSortHandle>(null);
  const cocktailSortRef = useRef<SingleSortHandle>(null);

  useEffect(() => {
    const getCanvas = () => {
      if (!shuffleRef.current?.canvasRef.current) return;

      const shuffleCtx = shuffleRef.current.canvasRef.current.getContext("2d")!;
      const sView = new SticksView(shuffleCtx);

      const quickSortCtx =
        quickSortRef.current!.canvasRef.current!.getContext("2d")!;
      const qView = new SticksView(quickSortCtx);

      const bubbleSortCtx =
        bubbleSortRef.current!.canvasRef.current!.getContext("2d")!;
      const bView = new SticksView(bubbleSortCtx);

      const mergeSortCtx =
        mergeSortRef.current!.canvasRef.current!.getContext("2d")!;
      const mView = new SticksView(mergeSortCtx);

      const bitonicSortCtx =
        bitonicSortRef.current!.canvasRef.current!.getContext("2d")!;
      const biView = new SticksView(bitonicSortCtx);

      const heapSortCtx =
        heapSortRef.current!.canvasRef.current!.getContext("2d")!;
      const hView = new SticksView(heapSortCtx);

      const selectionSortCtx =
        selectionSortRef.current!.canvasRef.current!.getContext("2d")!;
      const seView = new SticksView(selectionSortCtx);

      const insertionSortCtx =
        insertionSortRef.current!.canvasRef.current!.getContext("2d")!;
      const iView = new SticksView(insertionSortCtx);

      const oddEvenSortCtx =
        oddEvenSortRef.current!.canvasRef.current!.getContext("2d")!;
      const oView = new SticksView(oddEvenSortCtx);

      const cocktailSortCtx =
        cocktailSortRef.current!.canvasRef.current!.getContext("2d")!;
      const cView = new SticksView(cocktailSortCtx);

      setShuffleView(sView);
      setQuickSortView(qView);
      setBubbleSortView(bView);
      setMergeSortView(mView);
      setBitonicSortView(biView);
      setHeapSortView(hView);
      setSelectionSortView(seView);
      setInsertionSortView(iView);
      setOddEvenSortView(oView);
      setCocktailSortView(cView);
      setLoaded(true);

      sView.start();
      qView.start();
      bView.start();
      mView.start();
      biView.start();
      hView.start();
      seView.start();
      iView.start();
      oView.start();
      cView.start();
    };

    getCanvas();
  }, []);

  const handleShuffle = useCallback(() => {
    const refs = [
      shuffleRef,
      quickSortRef,
      bubbleSortRef,
      mergeSortRef,
      bitonicSortRef,
      heapSortRef,
      selectionSortRef,
      insertionSortRef,
      oddEvenSortRef,
      cocktailSortRef,
    ];

    refs.forEach((ref) => {
      const current = ref.current;
      if (
        current &&
        !current.isQuickShuffleDisabled() &&
        current.name !== "Shuffle Demo"
      ) {
        let checkSortAvailability = current.checkSortAvailability;
        // Access algorithm from state or ref?
        // The original code used current.props.algorithm.
        // We exposed algorithm in the handle.
        current.algorithm.sticks.adopAlgorithm(
          null,
          shuffle,
          true,
          undefined,
          checkSortAvailability
        );
        current.setShuffling(true);
      }
    });
  }, []);

  const handleShuffleDemo = useCallback(
    (checkAvailabilityCB?: (value: boolean) => void) => {
      shuffleView!.sticks.adopAlgorithm(shuffle);
    },
    [shuffleView]
  );

  const handleQuickSort = useCallback(
    (checkAvailabilityCB?: (value: boolean) => void) => {
      quickSortView!.sticks.adopAlgorithm(
        quickSort,
        undefined,
        false,
        checkAvailabilityCB
      );
    },
    [quickSortView]
  );

  const handleBubbleSort = useCallback(
    (checkAvailabilityCB?: (value: boolean) => void) => {
      bubbleSortView!.sticks.adopAlgorithm(
        bubbleSort,
        undefined,
        false,
        checkAvailabilityCB
      );
    },
    [bubbleSortView]
  );

  const handleMergeSort = useCallback(
    (checkAvailabilityCB?: (value: boolean) => void) => {
      mergeSortView!.sticks.adopAlgorithm(
        mergeSort,
        undefined,
        false,
        checkAvailabilityCB
      );
    },
    [mergeSortView]
  );

  const handleBitonicSort = useCallback(
    (checkAvailabilityCB?: (value: boolean) => void) => {
      bitonicSortView!.sticks.adopAlgorithm(
        bitonicSort,
        undefined,
        false,
        checkAvailabilityCB
      );
    },
    [bitonicSortView]
  );

  const handleHeapSort = useCallback(
    (checkAvailabilityCB?: (value: boolean) => void) => {
      heapSortView!.sticks.adopAlgorithm(
        heapSort,
        undefined,
        false,
        checkAvailabilityCB
      );
    },
    [heapSortView]
  );

  const handleSelectionSort = useCallback(
    (checkAvailabilityCB?: (value: boolean) => void) => {
      selectionSortView!.sticks.adopAlgorithm(
        selectionSort,
        undefined,
        false,
        checkAvailabilityCB
      );
    },
    [selectionSortView]
  );

  const handleInsertionSort = useCallback(
    (checkAvailabilityCB?: (value: boolean) => void) => {
      insertionSortView!.sticks.adopAlgorithm(
        insertionSort,
        undefined,
        false,
        checkAvailabilityCB
      );
    },
    [insertionSortView]
  );

  const handleOddEvenSort = useCallback(
    (checkAvailabilityCB?: (value: boolean) => void) => {
      oddEvenSortView!.sticks.adopAlgorithm(
        oddEvenSort,
        undefined,
        false,
        checkAvailabilityCB
      );
    },
    [oddEvenSortView]
  );

  const handleCocktailSort = useCallback(
    (checkAvailabilityCB?: (value: boolean) => void) => {
      cocktailSortView!.sticks.adopAlgorithm(
        cocktailSort,
        undefined,
        false,
        checkAvailabilityCB
      );
    },
    [cocktailSortView]
  );

  const handleSortAll = useCallback(() => {
    const refs = [
      quickSortRef,
      mergeSortRef,
      bitonicSortRef,
      heapSortRef,
      selectionSortRef,
      insertionSortRef,
      bubbleSortRef,
      oddEvenSortRef,
      cocktailSortRef,
    ];

    refs.forEach((ref) => {
      const current = ref.current;
      if (current && !current.isShuffling()) {
        let checkAvailabilityCB = current.checkAvailabilityCB;
        switch (current.name) {
          case "Quick Sort":
            current.algorithm.sticks.adopAlgorithm(
              quickSort,
              undefined,
              false,
              checkAvailabilityCB
            );
            current.setQuickShuffleDisabled(true);
            break;
          case "Merge Sort":
            current.algorithm.sticks.adopAlgorithm(
              mergeSort,
              undefined,
              false,
              checkAvailabilityCB
            );
            current.setQuickShuffleDisabled(true);
            break;
          case "Bintonic Sort":
            current.algorithm.sticks.adopAlgorithm(
              bitonicSort,
              undefined,
              false,
              checkAvailabilityCB
            );
            current.setQuickShuffleDisabled(true);
            break;
          case "Heap Sort-Bottom Up":
            current.algorithm.sticks.adopAlgorithm(
              heapSort,
              undefined,
              false,
              checkAvailabilityCB
            );
            current.setQuickShuffleDisabled(true);
            break;
          case "Selection Sort":
            current.algorithm.sticks.adopAlgorithm(
              selectionSort,
              undefined,
              false,
              checkAvailabilityCB
            );
            current.setQuickShuffleDisabled(true);
            break;
          case "Insertion Sort":
            current.algorithm.sticks.adopAlgorithm(
              insertionSort,
              undefined,
              false,
              checkAvailabilityCB
            );
            current.setQuickShuffleDisabled(true);
            break;
          case "Bubble Sort":
            current.algorithm.sticks.adopAlgorithm(
              bubbleSort,
              undefined,
              false,
              checkAvailabilityCB
            );
            current.setQuickShuffleDisabled(true);
            break;
          case "Odd Even Sort":
            current.algorithm.sticks.adopAlgorithm(
              oddEvenSort,
              undefined,
              false,
              checkAvailabilityCB
            );
            current.setQuickShuffleDisabled(true);
            break;
          case "Cocktail Sort":
            current.algorithm.sticks.adopAlgorithm(
              cocktailSort,
              undefined,
              false,
              checkAvailabilityCB
            );
            current.setQuickShuffleDisabled(true);
            break;
          default:
            break;
        }
      }
    });
  }, []);

  const closeModal = () => {
    setInstructionOpen(false);
  };

  const openModal = () => {
    setInstructionOpen(true);
  };

  const openCustomSort = () => {
    setCustomSortOpen(true);
  };

  const closeCustomSort = () => {
    setCustomSortOpen(false);
  };

  const handleValuesChange = (newValue: number) => {
    setValue(newValue);
  };

  const handlePauseToggle = () => {
    if (pause) {
      setShufflePause(false);
    } else {
      setShufflePause(true);
    }
  };

  const formatLabel = (labelValue: number | undefined): string => {
    if (labelValue === undefined || labelValue === null) return "";
    return labelValue.toFixed(1);
  };

  return (
    <div className="visualization-body">
      <header>
        <div className="header-content">
          <button className="open-instruction" onClick={openModal}>
            Instructions
          </button>
          <button
            className="open-instruction"
            onClick={openCustomSort}
            style={{ marginLeft: "10px" }}
          >
            Custom Sort
          </button>
          <div className="title-container">
            <h1>FORMATION</h1>
            <h6>
              created by <a href="http://www.zhuolizhang.com">Zhuoli Zhang</a>
            </h6>
          </div>
          <a href="https://github.com/novasponge/formation" className="github">
            <i className="fa fa-github" aria-hidden="true"></i>
          </a>
        </div>
        <div className="shuffle-sort-button-container">
          <button
            className="shuffle-all-button"
            onClick={handleShuffle}
            disabled={!checkAvailability}
          >
            Shuffle All
          </button>
          <button onClick={handleSortAll}>Sort All</button>
          <h3>Speed Multiplier</h3>
          <InputRange
            maxValue={20}
            minValue={0}
            value={value}
            step={0.1}
            formatLabel={formatLabel}
            onChange={handleValuesChange as any}
          />
        </div>
        <Modal
          className="instruction"
          isOpen={instructionOpen}
          onRequestClose={closeModal}
          style={modalStyle}
        >
          <h3>Formation is the visualization of sorting algorithms.</h3>
          <p>Click shuffle all to shuffle all demos at once.</p>
          <p>
            Click sort all button to perform all sorting algorithms at once.
          </p>
          <p>Click algorithms name to perform specific sorting algorithm.</p>
          <p>Lines are shuffled first, then sorted by slope.</p>

          <h3>Custom Sort</h3>
          <p>
            Click "Custom Sort" to write your own sorting algorithm in
            JavaScript!
          </p>
          <p>
            Just write the sorting logic (comparisons and swaps), and the
            visualization will be generated automatically.
          </p>

          <h3 className="red">Red</h3>
          <p>
            Red lines are swapping for either shuffling or sorting purposes.
          </p>
          <h3>Black</h3>
          <p>Black lines are comparing between two slopes.</p>

          <h3>Statistics</h3>
          <p>
            Real-time statistics (Swaps, Comparisons, State) are displayed above
            each visualization.
          </p>

          <h3 className="speedAmplifier">Speed Multiplier</h3>
          <p>Drag the blue circle to change the speed.</p>
          <button className="close-instruction" onClick={closeModal}>
            Close
          </button>
        </Modal>
        <CustomSortModal
          isOpen={customSortOpen}
          onRequestClose={closeCustomSort}
          value={value}
          onSpeedChange={handleValuesChange}
        />
      </header>
      <div className="main-content">
        <SingleSort
          ref={shuffleRef}
          handleAlgorithm={handleShuffleDemo}
          algorithm={shuffleView!}
          speed={value}
          loaded={loaded}
          name="Shuffle Demo"
        />
        <SingleSort
          ref={quickSortRef}
          handleAlgorithm={handleQuickSort}
          algorithm={quickSortView!}
          speed={value}
          loaded={loaded}
          name="Quick Sort"
        />
        <SingleSort
          ref={mergeSortRef}
          handleAlgorithm={handleMergeSort}
          algorithm={mergeSortView!}
          speed={value}
          loaded={loaded}
          name="Merge Sort"
        />
        <SingleSort
          ref={bitonicSortRef}
          handleAlgorithm={handleBitonicSort}
          algorithm={bitonicSortView!}
          speed={value}
          loaded={loaded}
          name="Bintonic Sort"
        />
        <SingleSort
          ref={heapSortRef}
          handleAlgorithm={handleHeapSort}
          algorithm={heapSortView!}
          speed={value}
          loaded={loaded}
          name="Heap Sort-Bottom Up"
        />
        <SingleSort
          ref={selectionSortRef}
          handleAlgorithm={handleSelectionSort}
          algorithm={selectionSortView!}
          speed={value}
          loaded={loaded}
          name="Selection Sort"
        />
        <SingleSort
          ref={insertionSortRef}
          handleAlgorithm={handleInsertionSort}
          algorithm={insertionSortView!}
          speed={value}
          loaded={loaded}
          name="Insertion Sort"
        />
        <SingleSort
          ref={bubbleSortRef}
          handleAlgorithm={handleBubbleSort}
          algorithm={bubbleSortView!}
          speed={value}
          loaded={loaded}
          name="Bubble Sort"
        />
        <SingleSort
          ref={oddEvenSortRef}
          handleAlgorithm={handleOddEvenSort}
          algorithm={oddEvenSortView!}
          speed={value}
          loaded={loaded}
          name="Odd Even Sort"
        />
        <SingleSort
          ref={cocktailSortRef}
          handleAlgorithm={handleCocktailSort}
          algorithm={cocktailSortView!}
          speed={value}
          loaded={loaded}
          name="Cocktail Sort"
        />
      </div>
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root");
  if (!container) {
    throw new Error("Root element not found");
  }
  Modal.setAppElement(document.body);
  const root = createRoot(container);
  root.render(<SortingVisualization />);
});

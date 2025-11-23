import SticksView from './stick_view';
import { shuffle } from './sorting_algs/shuffle';
import { bubbleSort } from './sorting_algs/bubble_sort';
import { quickSort } from './sorting_algs/quick_sort';
import { insertionSort } from "./sorting_algs/insert_sort";
import { selectionSort } from './sorting_algs/select_sort';
import { heapSort } from './sorting_algs/heap_sort';
import { oddEvenSort } from './sorting_algs/odd_even_sort';
import { cocktailSort } from './sorting_algs/cocktail_sort';
import { bitonicSort } from './sorting_algs/bitonic_sort';
import { mergeSort } from './sorting_algs/merge_sort';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import InputRange from 'react-input-range';
import { modalStyle } from "./modal_style";
import "react-input-range/lib/css/index.css";
import SingleSort from "./single_sort";

interface SortingVisualizationState {
  instructionOpen: boolean;
  value: number;
  checkAvailability: boolean;
  pause?: boolean;
  shufflePause?: boolean;
  loaded?: boolean;
  shuffle?: SticksView;
  quickSort?: SticksView;
  bubbleSort?: SticksView;
  mergeSort?: SticksView;
  bitonicSort?: SticksView;
  heapSort?: SticksView;
  selectionSort?: SticksView;
  insertionSort?: SticksView;
  oddEvenSort?: SticksView;
  cocktailSort?: SticksView;
}

class SortingVisualization extends React.Component<{}, SortingVisualizationState> {
  private shuffleRef = React.createRef<SingleSort>();
  private quickSortRef = React.createRef<SingleSort>();
  private bubbleSortRef = React.createRef<SingleSort>();
  private mergeSortRef = React.createRef<SingleSort>();
  private bitonicSortRef = React.createRef<SingleSort>();
  private heapSortRef = React.createRef<SingleSort>();
  private selectionSortRef = React.createRef<SingleSort>();
  private insertionSortRef = React.createRef<SingleSort>();
  private oddEvenSortRef = React.createRef<SingleSort>();
  private cocktailSortRef = React.createRef<SingleSort>();

  constructor(props: {}) {
    super(props);
    this.state = {
      instructionOpen: false,
      value: 1,
      checkAvailability: true
    };

    this.handleShuffle = this.handleShuffle.bind(this);
    this.handleQuickSort = this.handleQuickSort.bind(this);
    this.handleBubbleSort = this.handleBubbleSort.bind(this);
    this.handleMergeSort = this.handleMergeSort.bind(this);
    this.handleBitonicSort = this.handleBitonicSort.bind(this);
    this.handleHeapSort = this.handleHeapSort.bind(this);
    this.handleSelectionSort = this.handleSelectionSort.bind(this);
    this.handleInsertionSort = this.handleInsertionSort.bind(this);
    this.handleOddEvenSort = this.handleOddEvenSort.bind(this);
    this.handleCocktailSort = this.handleCocktailSort.bind(this);
    this.handleSortAll = this.handleSortAll.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleShuffleDemo = this.handleShuffleDemo.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

  componentDidMount() {
    this.getCanvas();
  }

  getCanvas() {
    const shuffleCtx = this.shuffleRef.current!.canvasRef.current!.getContext('2d')!;
    const shuffleView = new SticksView(shuffleCtx);

    const quickSortCtx = this.quickSortRef.current!.canvasRef.current!.getContext('2d')!;
    const quickSortView = new SticksView(quickSortCtx);

    const bubbleSortCtx = this.bubbleSortRef.current!.canvasRef.current!.getContext('2d')!;
    const bubbleSortView = new SticksView(bubbleSortCtx);

    const mergeSortCtx = this.mergeSortRef.current!.canvasRef.current!.getContext('2d')!;
    const mergeSortView = new SticksView(mergeSortCtx);

    const bitonicSortCtx = this.bitonicSortRef.current!.canvasRef.current!.getContext('2d')!;
    const bitonicSortView = new SticksView(bitonicSortCtx);

    const heapSortCtx = this.heapSortRef.current!.canvasRef.current!.getContext('2d')!;
    const heapSortView = new SticksView(heapSortCtx);

    const selectionSortCtx = this.selectionSortRef.current!.canvasRef.current!.getContext('2d')!;
    const selectionSortView = new SticksView(selectionSortCtx);

    const insertionSortCtx = this.insertionSortRef.current!.canvasRef.current!.getContext('2d')!;
    const insertionSortView = new SticksView(insertionSortCtx);

    const oddEvenSortCtx = this.oddEvenSortRef.current!.canvasRef.current!.getContext('2d')!;
    const oddEvenSortView = new SticksView(oddEvenSortCtx);

    const cocktailSortCtx = this.cocktailSortRef.current!.canvasRef.current!.getContext('2d')!;
    const cocktailSortView = new SticksView(cocktailSortCtx);

    this.setState({
      shuffle: shuffleView,
      quickSort: quickSortView,
      bubbleSort: bubbleSortView,
      mergeSort: mergeSortView,
      bitonicSort: bitonicSortView,
      heapSort: heapSortView,
      selectionSort: selectionSortView,
      insertionSort: insertionSortView,
      oddEvenSort: oddEvenSortView,
      cocktailSort: cocktailSortView,
      loaded: true
    });

    shuffleView.start();
    quickSortView.start();
    bubbleSortView.start();
    mergeSortView.start();
    bitonicSortView.start();
    heapSortView.start();
    selectionSortView.start();
    insertionSortView.start();
    oddEvenSortView.start();
    cocktailSortView.start();
  }

  handleShuffle(): void {
    const refs = [
      this.shuffleRef, this.quickSortRef, this.bubbleSortRef, this.mergeSortRef,
      this.bitonicSortRef, this.heapSortRef, this.selectionSortRef,
      this.insertionSortRef, this.oddEvenSortRef, this.cocktailSortRef
    ];

    refs.forEach(ref => {
      const current = ref.current;
      if (current && !current.state.quickShuffleDisabled && current.props.name !== "Shuffle Demo") {
        let checkSortAvailability = current.checkSortAvailability;
        current.props.algorithm.sticks.adopAlgorithm(null, shuffle, true, undefined, checkSortAvailability);
        current.setState({ shuffling: true });
      }
    });
  }

  handleShuffleDemo(checkAvailabilityCB?: (value: boolean) => void): void {
    this.state.shuffle!.sticks.adopAlgorithm(shuffle);
  }

  handleQuickSort(checkAvailabilityCB?: (value: boolean) => void): void {
    this.state.quickSort!.sticks.adopAlgorithm(quickSort, undefined, false, checkAvailabilityCB);
  }

  handleBubbleSort(checkAvailabilityCB?: (value: boolean) => void): void {
    this.state.bubbleSort!.sticks.adopAlgorithm(bubbleSort, undefined, false, checkAvailabilityCB);
  }

  handleMergeSort(checkAvailabilityCB?: (value: boolean) => void): void {
    this.state.mergeSort!.sticks.adopAlgorithm(mergeSort, undefined, false, checkAvailabilityCB);
  }

  handleBitonicSort(checkAvailabilityCB?: (value: boolean) => void): void {
    this.state.bitonicSort!.sticks.adopAlgorithm(bitonicSort, undefined, false, checkAvailabilityCB);
  }

  handleHeapSort(checkAvailabilityCB?: (value: boolean) => void): void {
    this.state.heapSort!.sticks.adopAlgorithm(heapSort, undefined, false, checkAvailabilityCB);
  }

  handleSelectionSort(checkAvailabilityCB?: (value: boolean) => void): void {
    this.state.selectionSort!.sticks.adopAlgorithm(selectionSort, undefined, false, checkAvailabilityCB);
  }

  handleInsertionSort(checkAvailabilityCB?: (value: boolean) => void): void {
    this.state.insertionSort!.sticks.adopAlgorithm(insertionSort, undefined, false, checkAvailabilityCB);
  }

  handleOddEvenSort(checkAvailabilityCB?: (value: boolean) => void): void {
    this.state.oddEvenSort!.sticks.adopAlgorithm(oddEvenSort, undefined, false, checkAvailabilityCB);
  }

  handleCocktailSort(checkAvailabilityCB?: (value: boolean) => void): void {
    this.state.cocktailSort!.sticks.adopAlgorithm(cocktailSort, undefined, false, checkAvailabilityCB);
  }

  handleSortAll() {
    const refs = [
      this.quickSortRef, this.mergeSortRef, this.bitonicSortRef, this.heapSortRef,
      this.selectionSortRef, this.insertionSortRef, this.bubbleSortRef,
      this.oddEvenSortRef, this.cocktailSortRef
    ];

    refs.forEach(ref => {
      const current = ref.current;
      if (current && !current.state.shuffling) {
        let checkAvailabilityCB = current.checkAvailabilityCB;
        switch (current.props.name) {
          case "Quick Sort":
            current.props.algorithm.sticks.adopAlgorithm(quickSort, undefined, false, checkAvailabilityCB);
            current.setState({ quickShuffleDisabled: true });
            break;
          case "Merge Sort":
            current.props.algorithm.sticks.adopAlgorithm(mergeSort, undefined, false, checkAvailabilityCB);
            current.setState({ quickShuffleDisabled: true });
            break;
          case "Bintonic Sort":
            current.props.algorithm.sticks.adopAlgorithm(bitonicSort, undefined, false, checkAvailabilityCB);
            current.setState({ quickShuffleDisabled: true });
            break;
          case "Heap Sort-Bottom Up":
            current.props.algorithm.sticks.adopAlgorithm(heapSort, undefined, false, checkAvailabilityCB);
            current.setState({ quickShuffleDisabled: true });
            break;
          case "Selection Sort":
            current.props.algorithm.sticks.adopAlgorithm(selectionSort, undefined, false, checkAvailabilityCB);
            current.setState({ quickShuffleDisabled: true });
            break;
          case "Insertion Sort":
            current.props.algorithm.sticks.adopAlgorithm(insertionSort, undefined, false, checkAvailabilityCB);
            current.setState({ quickShuffleDisabled: true });
            break;
          case "Bubble Sort":
            current.props.algorithm.sticks.adopAlgorithm(bubbleSort, undefined, false, checkAvailabilityCB);
            current.setState({ quickShuffleDisabled: true });
            break;
          case "Odd Even Sort":
            current.props.algorithm.sticks.adopAlgorithm(oddEvenSort, undefined, false, checkAvailabilityCB);
            current.setState({ quickShuffleDisabled: true });
            break;
          case "Cocktail Sort":
            current.props.algorithm.sticks.adopAlgorithm(cocktailSort, undefined, false, checkAvailabilityCB);
            current.setState({ quickShuffleDisabled: true });
            break;
          default:
            break;
        }
      }
    });
  }

  closeModal(): void {
    this.setState({ instructionOpen: false });
  }

  openModal(): void {
    this.setState({ instructionOpen: true });
  }

  handleValuesChange(value: number): void {
    this.setState({
      value: value,
    });
  }

  handlePause(): void {
    if (this.state.pause) {
      this.setState({ shufflePause: false });
    } else {
      this.setState({ shufflePause: true });
    }
  }

  formatLabel(labelValue: number | undefined): string {
    if (labelValue === undefined || labelValue === null) return '';
    return labelValue.toFixed(1);
  }

  render() {

    return (
      <div className="visualization-body">
        <header>
          <div className="header-content">
            <button className='open-instruction' onClick={this.openModal}>Instructions</button>
            <div className='title-container'>
              <h1>FORMATION</h1>
              <h6>created by <a href="http://www.zhuolizhang.com">Zhuoli Zhang</a></h6>
            </div>
            <a href='https://github.com/novasponge/formation' className="github">
              <i className="fa fa-github" aria-hidden="true"></i>
            </a>
          </div>
          <div className="shuffle-sort-button-container">
            <button className="shuffle-all-button" onClick={this.handleShuffle} disabled={!this.state.checkAvailability}>Shuffle All</button>
            <button onClick={this.handleSortAll}>Sort All</button>
            <h3>Speed Multiplier</h3>
            <InputRange maxValue={20}
              minValue={0}
              value={this.state.value}
              step={0.1}
              formatLabel={this.formatLabel.bind(this)}
              onChange={this.handleValuesChange.bind(this)} />
          </div>
          <Modal className="instruction"
            isOpen={this.state.instructionOpen}
            onRequestClose={this.closeModal}
            style={modalStyle}>
            <h3>Formation is the visualization of sorting algorithms.</h3>
            <p>Click shuffle all to shuffle all demos at once.</p>
            <p>Click sort all button to perform all sorting algorithms at once.</p>
            <p>Click algorithms name to perform specific sorting algorithm.</p>
            <p>Lines are shuffled first, then sorted by slope.</p>
            <h3 className='red'>Red</h3>
            <p>Red lines are swapping for either shuffling or sorting purposes.</p>
            <h3>Black</h3>
            <p>Black lines are comparing between two slopes.</p>
            <h3 className='speedAmplifier'>Speed Multiplier</h3>
            <p>Drag the blue circle to change the speed.</p>
            <button className='close-instruction' onClick={this.closeModal}>Close</button>
          </Modal>
        </header>
        <div className="main-content">
          <SingleSort ref={this.shuffleRef}
            handleAlgorithm={this.handleShuffleDemo}
            algorithm={this.state.shuffle!}
            speed={this.state.value}
            loaded={this.state.loaded!}
            name="Shuffle Demo"
          />
          <SingleSort ref={this.quickSortRef}
            handleAlgorithm={this.handleQuickSort}
            algorithm={this.state.quickSort!}
            speed={this.state.value}
            loaded={this.state.loaded!}
            name="Quick Sort"
          />
          <SingleSort ref={this.mergeSortRef}
            handleAlgorithm={this.handleMergeSort}
            algorithm={this.state.mergeSort!}
            speed={this.state.value}
            loaded={this.state.loaded!}
            name="Merge Sort"
          />
          <SingleSort ref={this.bitonicSortRef}
            handleAlgorithm={this.handleBitonicSort}
            algorithm={this.state.bitonicSort!}
            speed={this.state.value}
            loaded={this.state.loaded!}
            name="Bintonic Sort"
          />
          <SingleSort ref={this.heapSortRef}
            handleAlgorithm={this.handleHeapSort}
            algorithm={this.state.heapSort!}
            speed={this.state.value}
            loaded={this.state.loaded!}
            name="Heap Sort-Bottom Up"
          />
          <SingleSort ref={this.selectionSortRef}
            handleAlgorithm={this.handleSelectionSort}
            algorithm={this.state.selectionSort!}
            speed={this.state.value}
            loaded={this.state.loaded!}
            name="Selection Sort"
          />
          <SingleSort ref={this.insertionSortRef}
            handleAlgorithm={this.handleInsertionSort}
            algorithm={this.state.insertionSort!}
            speed={this.state.value}
            loaded={this.state.loaded!}
            name="Insertion Sort"
          />
          <SingleSort ref={this.bubbleSortRef}
            handleAlgorithm={this.handleBubbleSort}
            algorithm={this.state.bubbleSort!}
            speed={this.state.value}
            loaded={this.state.loaded!}
            name="Bubble Sort"
          />
          <SingleSort ref={this.oddEvenSortRef}
            handleAlgorithm={this.handleOddEvenSort}
            algorithm={this.state.oddEvenSort!}
            speed={this.state.value}
            loaded={this.state.loaded!}
            name="Odd Even Sort"
          />
          <SingleSort ref={this.cocktailSortRef}
            handleAlgorithm={this.handleCocktailSort}
            algorithm={this.state.cocktailSort!}
            speed={this.state.value}
            loaded={this.state.loaded!}
            name="Cocktail Sort"
          />
        </div>
      </div>
    );
  }
}

import { createRoot } from 'react-dom/client';

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root");
  if (!container) {
    throw new Error("Root element not found");
  }
  Modal.setAppElement(document.body);
  const root = createRoot(container);
  root.render(<SortingVisualization />);
});

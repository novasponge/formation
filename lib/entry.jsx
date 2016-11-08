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
import "react-input-range/dist/react-input-range.css";
import SingleSort from "./single_sort";

class SortingVisualization extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      instructionOpen: false,
      value: 1,
      shufflePause: false,
      quickSortPause: false
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

  componentDidMount () {
    this.getCanvas();
  }

  getCanvas () {
    const shuffleCtx = this.refs.canvasShuffle.refs.canvas.getContext('2d');
    const shuffleView = new SticksView(shuffleCtx);

    const quickSortCtx = this.refs.canvasQuicksort.refs.canvas.getContext('2d');
    const quickSortView = new SticksView(quickSortCtx);

    const bubbleSortCtx = this.refs.canvasBubblesort.refs.canvas.getContext('2d');
    const bubbleSortView = new SticksView(bubbleSortCtx);

    const mergeSortCtx = this.refs.canvasMergesort.refs.canvas.getContext('2d');
    const mergeSortView = new SticksView(mergeSortCtx);

    const bitonicSortCtx = this.refs.canvasBitonicsort.refs.canvas.getContext('2d');
    const bitonicSortView = new SticksView(bitonicSortCtx);

    const heapSortCtx = this.refs.canvasHeapsort.refs.canvas.getContext('2d');
    const heapSortView = new SticksView(heapSortCtx);

    const selectionSortCtx = this.refs.canvasSelectsort.refs.canvas.getContext('2d');
    const selectionSortView = new SticksView(selectionSortCtx);

    const insertionSortCtx = this.refs.canvasInsertsort.refs.canvas.getContext('2d');
    const insertionSortView = new SticksView(insertionSortCtx);

    const oddEvenSortCtx = this.refs.canvasOddevensort.refs.canvas.getContext('2d');
    const oddEvenSortView = new SticksView(oddEvenSortCtx);

    const cocktailSortCtx = this.refs.canvasCocktailsort.refs.canvas.getContext('2d');
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

  handleShuffle () {
    this.state.shuffle.sticks.adopAlgorithm(shuffle);
    this.state.quickSort.sticks.adopAlgorithm(shuffle);
    this.state.bubbleSort.sticks.adopAlgorithm(shuffle);
    this.state.mergeSort.sticks.adopAlgorithm(shuffle);
    this.state.bitonicSort.sticks.adopAlgorithm(shuffle);
    this.state.heapSort.sticks.adopAlgorithm(shuffle);
    this.state.selectionSort.sticks.adopAlgorithm(shuffle);
    this.state.insertionSort.sticks.adopAlgorithm(shuffle);
    this.state.oddEvenSort.sticks.adopAlgorithm(shuffle);
    this.state.cocktailSort.sticks.adopAlgorithm(shuffle);
  }

  handleShuffleDemo () {
    this.state.shuffle.sticks.adopAlgorithm(shuffle);
  }

  handleQuickSort () {
    this.state.quickSort.sticks.adopAlgorithm(quickSort);
  }

  handleBubbleSort () {
    this.state.bubbleSort.sticks.adopAlgorithm(bubbleSort);
  }

  handleMergeSort () {
    this.state.mergeSort.sticks.adopAlgorithm(mergeSort);
  }

  handleBitonicSort () {
    this.state.bitonicSort.sticks.adopAlgorithm(bitonicSort);
  }

  handleHeapSort () {
    this.state.heapSort.sticks.adopAlgorithm(heapSort);
  }

  handleSelectionSort () {
    this.state.selectionSort.sticks.adopAlgorithm(selectionSort);
  }

  handleInsertionSort () {
    this.state.insertionSort.sticks.adopAlgorithm(insertionSort);
  }

  handleOddEvenSort () {
    this.state.oddEvenSort.sticks.adopAlgorithm(oddEvenSort);
  }

  handleCocktailSort () {
    this.state.cocktailSort.sticks.adopAlgorithm(cocktailSort);
  }

  handleSortAll () {
    this.state.quickSort.sticks.adopAlgorithm(quickSort);
    this.state.bubbleSort.sticks.adopAlgorithm(bubbleSort);
    this.state.mergeSort.sticks.adopAlgorithm(mergeSort);
    this.state.bitonicSort.sticks.adopAlgorithm(bitonicSort);
    this.state.heapSort.sticks.adopAlgorithm(heapSort);
    this.state.selectionSort.sticks.adopAlgorithm(selectionSort);
    this.state.insertionSort.sticks.adopAlgorithm(insertionSort);
    this.state.oddEvenSort.sticks.adopAlgorithm(oddEvenSort);
    this.state.cocktailSort.sticks.adopAlgorithm(cocktailSort);
  }

  closeModal () {
    this.setState({instructionOpen: false});
  }

  openModal () {
    this.setState({instructionOpen: true});
  }

  handleValuesChange(component, value) {
    this.setState({
      value: value,
    });
  }

  handlePause () {
    if (this.state.pause) {
      this.setState({shufflePause: false});
    } else {
      this.setState({shufflePause: true});
    }
  }

  formatLabel(labelValue) {
    return labelValue.toFixed(1);
  }

  render () {
    // let shufflePauseState;
    let pauseState;
    //
    // if (this.state.loaded) {
    //   this.state.shuffle.getSpeedAmplifier(this.state.value, this.state.pause);
    //   this.state.quickSort.getSpeedAmplifier(this.state.value, this.state.pause);
    //   this.state.bubbleSort.getSpeedAmplifier(this.state.value, this.state.pause);
    //   this.state.mergeSort.getSpeedAmplifier(this.state.value, this.state.pause);
    //   this.state.bitonicSort.getSpeedAmplifier(this.state.value, this.state.pause);
    //   this.state.heapSort.getSpeedAmplifier(this.state.value, this.state.pause);
    //   this.state.selectionSort.getSpeedAmplifier(this.state.value, this.state.pause);
    //   this.state.insertionSort.getSpeedAmplifier(this.state.value, this.state.pause);
    //   this.state.oddEvenSort.getSpeedAmplifier(this.state.value, this.state.pause);
    //   this.state.cocktailSort.getSpeedAmplifier(this.state.value, this.state.pause);
    // }

    // shufflePauseState = this.state.shufflePause ? "Resume" : 'Pause';

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
            <button onClick={this.handleShuffle}>Shuffle All</button>
            <button onClick={this.handleSortAll}>Sort All</button>
            <h3>Speed Multiplier</h3>
            <InputRange maxValue={20}
              minValue={0}
              value={this.state.value}
              step={0.1}
              formatLabel={this.formatLabel.bind(this)}
              onChange={this.handleValuesChange.bind(this)}/>
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
          <SingleSort ref="canvasShuffle"
                      handleAlgorithm={this.handleShuffleDemo}
                      algorithm={this.state.shuffle}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Shuffle Demo"
          />
          <SingleSort ref="canvasQuicksort"
                      handleAlgorithm={this.handleQuickSort}
                      algorithm={this.state.quickSort}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Quick Sort"
          />
          <SingleSort ref="canvasMergesort"
                      handleAlgorithm={this.handleMergeSort}
                      algorithm={this.state.mergeSort}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Merge Sort"
          />
          <SingleSort ref="canvasBitonicsort"
                      handleAlgorithm={this.handleBitonicSort}
                      algorithm={this.state.bitonicSort}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Bintonic Sort"
          />
          <SingleSort ref="canvasHeapsort"
                      handleAlgorithm={this.handleHeapSort}
                      algorithm={this.state.heapSort}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Heap Sort-Bottom Up"
          />
          <SingleSort ref="canvasSelectsort"
                      handleAlgorithm={this.handleSelectionSort}
                      algorithm={this.state.selectionSort}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Selection Sort"
          />
          <SingleSort ref="canvasInsertsort"
                      handleAlgorithm={this.handleInsertionSort}
                      algorithm={this.state.insertionSort}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Insertion Sort"
          />
          <SingleSort ref="canvasBubblesort"
                      handleAlgorithm={this.handleBubbleSort}
                      algorithm={this.state.bubbleSort}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Bubble Sort"
          />
          <SingleSort ref="canvasOddevensort"
                      handleAlgorithm={this.handleOddEvenSort}
                      algorithm={this.state.oddEvenSort}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Odd Even Sort"
          />
          <SingleSort ref="canvasCocktailsort"
                      handleAlgorithm={this.handleCocktailSort}
                      algorithm={this.state.cocktailSort}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Cocktail Sort"
          />
        </div>
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  const root = document.getElementById("root");
  Modal.setAppElement(document.body);
  ReactDOM.render(<SortingVisualization />, root);
});

// <div className="canvas-container">
//   <div className='button-holder'>
//     <button onClick={this.handleShuffleDemo}>Shuffle demo</button>
//     <button onClick={this.handlePause}>{shufflePauseState}</button>
//   </div>
//   <canvas ref="canvasShuffle" width={1024} height={110} />
// </div>
// <div className="canvas-container">
//   <div className='button-holder'>
//     <button onClick={this.handleQuickSort}>Quick Sort</button>
//     <button onClick={this.handlePause}>{pauseState}</button>
//   </div>
//   <canvas ref="canvasQuicksort" width={1024} height={110} />
// </div>
// <div className="canvas-container">
//   <div className='button-holder'>
//     <button onClick={this.handlePause}>{pauseState}</button>
//     <button onClick={this.handleMergeSort}>Merge Sort</button>
//   </div>
//   <canvas ref="canvasMergesort" width={1024} height={110} />
// </div>
// <div className="canvas-container">
//   <div className='button-holder'>
//     <button onClick={this.handlePause}>{pauseState}</button>
//     <button onClick={this.handleBitonicSort}>Bitonic Sort</button>
//   </div>
//   <canvas ref="canvasBitonicsort" width={1024} height={110} />
// </div>
// <div className="canvas-container">
//   <div className='button-holder'>
//     <button onClick={this.handlePause}>{pauseState}</button>
//     <button className="heapsort-button" onClick={this.handleHeapSort}>Heap Sort-Bottom Top</button>
//   </div>
//   <canvas ref="canvasHeapsort" width={1024} height={110} />
// </div>
// <div className="canvas-container">
//   <div className='button-holder'>
//     <button onClick={this.handlePause}>{pauseState}</button>
//     <button onClick={this.handleSelectionSort}>Selection Sort</button>
//   </div>
//   <canvas ref="canvasSelectsort" width={1024} height={110} />
// </div>
// <div className="canvas-container">
//   <div className='button-holder'>
//     <button onClick={this.handlePause}>{pauseState}</button>
//     <button onClick={this.handleInsertionSort}>Insertion Sort</button>
//   </div>
//   <canvas ref="canvasInsertsort" width={1024} height={110} />
// </div>
// <div className="canvas-container">
//   <div className='button-holder'>
//     <button onClick={this.handlePause}>{pauseState}</button>
//     <button onClick={this.handleBubbleSort}>Bubble Sort</button>
//   </div>
//   <canvas ref="canvasBubblesort" width={1024} height={110} />
// </div>
// <div className="canvas-container">
//   <div className='button-holder'>
//     <button onClick={this.handlePause}>{pauseState}</button>
//     <button onClick={this.handleOddEvenSort}>Odd Even Sort</button>
//   </div>
//   <canvas ref="canvasOddevensort" width={1024} height={100} />
// </div>
// <div className="canvas-container">
//   <div className='button-holder'>
//     <button onClick={this.handlePause}>{pauseState}</button>
//     <button onClick={this.handleCocktailSort}>Cocktail Sort</button>
//   </div>
//   <canvas ref="canvasCocktailsort" width={1024} height={100} />
// </div>

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

const modalStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    display: "block",
    position : 'fixed',
    top : "50%",
    left : "50%",
    width : "500px",
    border : '1px solid #ccc',
    background : '#fff',
    overflow : 'auto',
    WebkitOverflowScrolling : 'touch',
    borderRadius : '4px',
    transform: 'translate(-50%, -50%)',
  }
};

class SortingVisualization extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      instructionOpen: false
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
  }

  componentDidMount () {
    this.getCanvas();
  }

  getCanvas () {
    const shuffleCtx = this.refs.canvasShuffle.getContext('2d');
    const shuffleView = new SticksView(shuffleCtx);

    const quickSortCtx = this.refs.canvasQuicksort.getContext('2d');
    const quickSortView = new SticksView(quickSortCtx);

    const bubbleSortCtx = this.refs.canvasBubblesort.getContext('2d');
    const bubbleSortView = new SticksView(bubbleSortCtx);

    const mergeSortCtx = this.refs.canvasMergesort.getContext('2d');
    const mergeSortView = new SticksView(mergeSortCtx);

    const bitonicSortCtx = this.refs.canvasBitonicsort.getContext('2d');
    const bitonicSortView = new SticksView(bitonicSortCtx);

    const heapSortCtx = this.refs.canvasHeapsort.getContext('2d');
    const heapSortView = new SticksView(heapSortCtx);

    const selectionSortCtx = this.refs.canvasSelectsort.getContext('2d');
    const selectionSortView = new SticksView(selectionSortCtx);

    const insertionSortCtx = this.refs.canvasInsertsort.getContext('2d');
    const insertionSortView = new SticksView(insertionSortCtx);

    const oddEvenSortCtx = this.refs.canvasOddevensort.getContext('2d');
    const oddEvenSortView = new SticksView(oddEvenSortCtx);

    const cocktailSortCtx = this.refs.canvasCocktailsort.getContext('2d');
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
      cocktailSort: cocktailSortView
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

  render () {
    return (
      <div className="visualization-body">
        <header>
          <button className='open-instruction' onClick={this.openModal}>Instruction</button>
          <div className='title-container'>
            <h1>Sorting Visualization</h1>
            <h6>created by Zhuoli Zhang</h6>
          </div>
          <a href='https://github.com/novasponge/formation' className="github">
            <i className="fa fa-github" aria-hidden="true"></i>
          </a>
          <Modal className="instruction"
            isOpen={this.state.instructionOpen}
            onRequestClose={this.closeModal}
            style={modalStyle}>
            <h2>Lines are shuffled first, then sorted by slope.</h2>
            <h3 className='red'>Red</h3>
            <p>Red indicates line switch.</p>
            <h3>Black</h3>
            <p>Black indicates slope comparison between two lines.</p>
            <button className='close-instruction' onClick={this.closeModal}>Close</button>
          </Modal>
        </header>
        <div className="canvas-container">
          <div className="shuffle-sort-button-container">
            <button onClick={this.handleShuffle}>Shuffle All</button>
            <button onClick={this.handleSortAll}>Sort All</button>
          </div>
          <h2>Shuffle demo</h2>
          <canvas ref="canvasShuffle" width={1024} height={110} />
        </div>
        <div className="canvas-container">
          <button onClick={this.handleQuickSort}>Quick Sort</button>
          <canvas ref="canvasQuicksort" width={1024} height={110} />
        </div>
        <div className="canvas-container">
          <button onClick={this.handleMergeSort}>Merge Sort</button>
          <canvas ref="canvasMergesort" width={1024} height={110} />
        </div>
        <div className="canvas-container">
          <button onClick={this.handleBitonicSort}>Bitonic Sort</button>
          <canvas ref="canvasBitonicsort" width={1024} height={110} />
        </div>
        <div className="canvas-container">
          <button className="heapsort-button" onClick={this.handleHeapSort}>Heap Sort-Bottom Top</button>
          <canvas ref="canvasHeapsort" width={1024} height={110} />
        </div>
        <div className="canvas-container">
          <button onClick={this.handleSelectionSort}>Selection Sort</button>
          <canvas ref="canvasSelectsort" width={1024} height={110} />
        </div>
        <div className="canvas-container">
          <button onClick={this.handleInsertionSort}>Insertion Sort</button>
          <canvas ref="canvasInsertsort" width={1024} height={110} />
        </div>
        <div className="canvas-container">
          <button onClick={this.handleBubbleSort}>Bubble Sort</button>
          <canvas ref="canvasBubblesort" width={1024} height={110} />
        </div>
        <div className="canvas-container">
          <button onClick={this.handleOddEvenSort}>Odd Even Sort</button>
          <canvas ref="canvasOddevensort" width={1024} height={100} />
        </div>
        <div className="canvas-container">
          <button onClick={this.handleCocktailSort}>Cocktail Sort</button>
          <canvas ref="canvasCocktailsort" width={1024} height={100} />
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

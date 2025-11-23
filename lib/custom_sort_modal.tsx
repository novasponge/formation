import React from 'react';
import Modal from 'react-modal';
import Editor from '@monaco-editor/react';
import SingleSort from './single_sort';
import { modalStyle } from './modal_style';
import { SortingAlgorithm } from './sorting_algs/types';
import Stick from './stick';
import SticksView from './stick_view';
import MagicArray from './magic_array';
import InputRange from 'react-input-range';
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

class CustomSortModal extends React.Component<CustomSortModalProps, CustomSortModalState> {
  private singleSortRef = React.createRef<SingleSort>();

  constructor(props: CustomSortModalProps) {
    super(props);
    this.state = {
      code: DEFAULT_CODE,
      error: null,
      customAlgorithm: null,
      sticksView: null,
      loaded: false
    };

    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleRun = this.handleRun.bind(this);
    this.handleCustomSort = this.handleCustomSort.bind(this);
    this.onSingleSortMount = this.onSingleSortMount.bind(this);
  }

  handleEditorChange(value: string | undefined) {
    if (value !== undefined) {
      this.setState({ code: value });
    }
  }

  handleRun() {
    try {
      const createAlgo = new Function(`return (
${this.state.code}
)`);
      const userAlgo = createAlgo();

      if (typeof userAlgo !== 'function') {
        throw new Error("Code must return a function.");
      }

      const wrappedAlgorithm: SortingAlgorithm = (sticks: Stick[]) => {
        const magicArray = new MagicArray(sticks);
        userAlgo(magicArray.proxy);
        return magicArray.getTraces();
      };

      this.setState({ 
        customAlgorithm: wrappedAlgorithm, 
        error: null 
      }, () => {
        // If view is already initialized, just run the shuffle to reset
        if (this.state.sticksView && this.singleSortRef.current) {
            this.singleSortRef.current.quickShuffle();
        }
      });
    } catch (err: any) {
      this.setState({ error: err.message });
    }
  }

  handleCustomSort(checkAvailabilityCB?: (value: boolean) => void) {
    if (this.state.customAlgorithm && this.state.sticksView) {
       this.state.sticksView.sticks.adopAlgorithm(
           this.state.customAlgorithm, 
           undefined, 
           false, 
           checkAvailabilityCB
       );
    }
  }

  onSingleSortMount() {
      // This function is called when SingleSort is mounted and ref is set
      // But we can't rely on callback ref easily with React.createRef in this class component structure 
      // if we are conditionally rendering.
      // Instead, we'll check in componentDidUpdate or use a callback ref in render.
  }

  initSticksView = (element: SingleSort | null) => {
      if (element && !this.state.sticksView) {
          // Element is mounted
          // We need to access the canvas ref from the SingleSort instance
          // We exposed canvasRef in SingleSort!
          const canvas = element.canvasRef.current;
          if (canvas) {
              const ctx = canvas.getContext('2d');
              if (ctx) {
                  const view = new SticksView(ctx);
                  view.start();
                  this.setState({ sticksView: view, loaded: true });
                  
                  // Also set the ref manually since we are using this callback
                  (this.singleSortRef as any).current = element;
              }
          }
      }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        style={{
          overlay: modalStyle.overlay,
          content: {
            ...modalStyle.content,
            width: '95%',
            height: '95%',
            maxWidth: 'none',
            maxHeight: 'none',
            padding: '20px'
          }
        }}
        contentLabel="Custom Sort Editor"
        onAfterOpen={() => {
            // Reset state if needed, or keep it to preserve code
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h2>Custom Sorting Algorithm</h2>
            <button onClick={this.props.onRequestClose}>Close</button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '400px' }}>
            <div style={{ flex: 1, marginBottom: '10px', border: '1px solid #ccc', overflow: 'hidden', position: 'relative' }}>
              <Editor
                height="100%"
                defaultLanguage="javascript"
                value={this.state.code}
                onChange={this.handleEditorChange}
                theme="vs-dark"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
               <div style={{ marginBottom: '10px' }}>
                 <button onClick={this.handleRun} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                   Update & Run
                 </button>
                 <div style={{ display: 'inline-block', width: '300px', marginLeft: '20px', verticalAlign: 'middle' }}>
                    <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Speed:</span>
                    <div style={{ display: 'inline-block', width: '200px' }}>
                        <InputRange
                            maxValue={20}
                            minValue={0}
                            value={this.props.value}
                            step={0.1}
                            onChange={(value) => this.props.onSpeedChange(value as number)}
                        />
                    </div>
                 </div>
                 {this.state.error && (
                   <div style={{ color: 'red', marginTop: '10px' }}>
                     <strong>Error:</strong> {this.state.error}
                   </div>
                 )}
               </div>
               
               {/* Visualization Area */}
               <div style={{ border: '1px solid #eee', position: 'relative', minHeight: '150px' }}>
                    {/* We render SingleSort always, but we need to handle the case where sticksView is null.
                        SingleSort props require algorithm to be SticksView.
                        We can cast null to any to bypass TS for the initial render, 
                        or we can conditionally render.
                        If we conditionally render, we can't get the ref to initialize!
                        Catch-22.
                        
                        Solution: Render a dummy div to get the ref? No.
                        
                        Actually, SingleSort renders a canvas. It doesn't use `algorithm` prop in render() except for `getSpeedAmplifier` which is guarded by `loaded`.
                        So we can pass null/undefined as algorithm if loaded is false.
                    */}
                    <SingleSort
                        ref={this.initSticksView}
                        handleAlgorithm={this.handleCustomSort}
                        algorithm={this.state.sticksView as any} 
                        speed={this.props.value}
                        loaded={this.state.loaded}
                        name="Custom Sort"
                    />
               </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default CustomSortModal;

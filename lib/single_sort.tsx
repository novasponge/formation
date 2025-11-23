import React from 'react';
import { shuffle } from './sorting_algs/shuffle';
import SticksView from './stick_view';

interface SingleSortProps {
  algorithm: SticksView;
  handleAlgorithm: (callback: (value: boolean) => void) => void;
  speed: number;
  loaded: boolean;
  name: string;
}

interface SingleSortState {
  pause: boolean;
  quickShuffleDisabled: boolean;
  shuffling: boolean;
  swaps: number;
  comparisons: number;
  state: string;
}

class SingleSort extends React.Component<SingleSortProps, SingleSortState> {
  public canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: SingleSortProps) {
    super(props);
    this.state = {
      pause: false,
      quickShuffleDisabled: false,
      shuffling: false,
      swaps: 0,
      comparisons: 0,
      state: ''
    };

    this.canvasRef = React.createRef();

    this.handlePause = this.handlePause.bind(this);
    this.quickShuffle = this.quickShuffle.bind(this);
    this.handleAlgorithm = this.handleAlgorithm.bind(this);
    this.checkAvailabilityCB = this.checkAvailabilityCB.bind(this);
    this.checkSortAvailability = this.checkSortAvailability.bind(this);
    this.updateStats = this.updateStats.bind(this);
  }

  componentDidMount() {
    if (this.props.algorithm) {
      this.props.algorithm.setOnUpdate(this.updateStats);
    }
  }

  componentDidUpdate(prevProps: SingleSortProps) {
    if (prevProps.algorithm !== this.props.algorithm && this.props.algorithm) {
      this.props.algorithm.setOnUpdate(this.updateStats);
    }
  }

  updateStats(stats: { swaps: number, comparisons: number, state: string }) {
    // Only update state if values changed to avoid unnecessary re-renders
    if (stats.swaps !== this.state.swaps || 
        stats.comparisons !== this.state.comparisons || 
        stats.state !== this.state.state) {
      this.setState(stats);
    }
  }

  handlePause(): void {
    if (this.state.pause) {
      this.setState({ pause: false });
    } else {
      this.setState({ pause: true });
    }
  }

  quickShuffle(): void {
    this.props.algorithm.sticks.adopAlgorithm(null, shuffle, true, undefined, this.checkSortAvailability);
    this.setState({ shuffling: true });
  }

  checkAvailabilityCB(value: boolean): void {
    if (value) {
      this.setState({ quickShuffleDisabled: false });
    }
  }

  handleAlgorithm(): void {
    this.props.handleAlgorithm(this.checkAvailabilityCB);
    this.setState({ quickShuffleDisabled: true });
  }

  checkSortAvailability(value: boolean): void {
    if (value) {
      this.setState({ shuffling: false });
    }
  }

  render(): React.ReactElement {
    let pauseState: string;

    pauseState = this.state.pause ? "Resume" : 'Pause';
    if (this.props.loaded) {
      this.props.algorithm.getSpeedAmplifier(this.props.speed, this.state.pause);
    }

    return (
      <div className="canvas-container">
        <div className='button-holder'>
          <button className="quickShuffle" onClick={this.quickShuffle} disabled={this.state.quickShuffleDisabled}>Quick Shuffle</button>
          <button className="sorting" onClick={this.handleAlgorithm} disabled={this.state.shuffling}>{this.props.name}</button>
          <button onClick={this.handlePause}>{pauseState}</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginBottom: '5px', fontFamily: 'Varela Round', fontSize: '13px' }}>
            <span style={{ color: '#dd6417' }}>Number of Swaps: {this.state.swaps}</span>
            <span style={{ color: '#000' }}>State: {this.state.state}</span>
            <span style={{ color: '#147ee0' }}>Number of Comparisons: {this.state.comparisons}</span>
        </div>
        <canvas ref={this.canvasRef} width={1024} height={110} style={{ width: '100%' }} />
      </div>
    );
  }
}

export default SingleSort;

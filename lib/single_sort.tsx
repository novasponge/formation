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
}

class SingleSort extends React.Component<SingleSortProps, SingleSortState> {
  public canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: SingleSortProps) {
    super(props);
    this.state = {
      pause: false,
      quickShuffleDisabled: false,
      shuffling: false
    };

    this.canvasRef = React.createRef();

    this.handlePause = this.handlePause.bind(this);
    this.quickShuffle = this.quickShuffle.bind(this);
    this.handleAlgorithm = this.handleAlgorithm.bind(this);
    this.checkAvailabilityCB = this.checkAvailabilityCB.bind(this);
    this.checkSortAvailability = this.checkSortAvailability.bind(this);
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
        <canvas ref={this.canvasRef} width={1024} height={110} style={{ width: '100%' }} />
      </div>
    );
  }
}

export default SingleSort;

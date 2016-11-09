import React from 'react';
import { shuffle } from './sorting_algs/shuffle';

class SingleSort extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      pause: false,
      quickShuffleDisabled: false,
      shuffling: false
    };

    this.handlePause = this.handlePause.bind(this);
    this.quickShuffle = this.quickShuffle.bind(this);
    this.handleAlgorithm = this.handleAlgorithm.bind(this);
    this.checkAvailabilityCB = this.checkAvailabilityCB.bind(this);
    this.checkSortAvailability = this.checkSortAvailability.bind(this);
  }

  handlePause () {
    if (this.state.pause) {
      this.setState({pause: false});
    } else {
      this.setState({pause: true});
    }
  }

  quickShuffle () {
    this.props.algorithm.sticks.adopAlgorithm(null, shuffle, true, null, this.checkSortAvailability);
    this.setState({shuffling : true});
  }

  checkAvailabilityCB(value) {
    if (value) {
      this.setState({quickShuffleDisabled : false});
    }
  }

  handleAlgorithm () {
    this.props.handleAlgorithm(this.checkAvailabilityCB);
    this.setState({quickShuffleDisabled: true});
  }

  checkSortAvailability(value) {
    if (value) {
      this.setState({shuffling: false});
    }
  }

  render () {
    let pauseState;

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
        <canvas ref="canvas" width={1024} height={110} />
      </div>
    );
  }
}

export default SingleSort;

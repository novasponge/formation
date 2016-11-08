import React from 'react';

class SingleSort extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      pause: false,
    };

    this.handlePause = this.handlePause.bind(this);
  }

  handlePause () {
    if (this.state.pause) {
      this.setState({pause: false});
    } else {
      this.setState({pause: true});
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
          <button onClick={this.props.handleAlgorithm}>{this.props.name}</button>
          <button onClick={this.handlePause}>{pauseState}</button>
        </div>
        <canvas ref="canvas" width={1024} height={110} />
      </div>
    );
  }
}

export default SingleSort;

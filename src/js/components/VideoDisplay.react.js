import React from 'react';

// this component
class MainVideo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <video src={this.props.src}/>
      </div>
    )
  }
}

class ReactionVideoColumns extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {mappedVideosLeft}
        {mappedVideosRight}
      </div>
    )
  }
}


class VideoDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainVideo />
      <ReactionVideoColumns />
    )
  }
}

export default VideoDisplay;
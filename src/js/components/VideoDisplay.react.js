import React from 'react';

class MainVideo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <video src=/>
      </div>
    )
  }
}

class ReactionVideoColumns extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

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
import React, { Component } from 'react';

export class SplitScreenSlidingPane extends Component {
  state = {
    isOpen: true,
  };

  toggle = e => {
    e.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render () {
    return (
      <div className="sliding-pane" open={this.state.isOpen}>
        <div className="sliding-pane-toggle-button" onClick={this.toggle}>
          ☰
        </div>
        {this.props.children}
      </div>
    );
  }
}

import React, { Component } from 'react';

import { SlidingPaneWrapper, SlidingPaneToggle } from './SplitScreenSlidingPaneLayout';

export class SplitScreenSlidingPane extends Component {
  state = {
    isOpen: true,
  }

  toggle = (e) => {
    e.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <SlidingPaneWrapper open={this.state.isOpen}>
        <SlidingPaneToggle onClick={this.toggle}>☰</SlidingPaneToggle>
        { this.props.children }
      </SlidingPaneWrapper>
    );
  }
}



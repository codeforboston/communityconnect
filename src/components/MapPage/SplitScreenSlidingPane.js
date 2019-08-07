import React, { Component } from "react";
import cx from "classnames";

export class SplitScreenSlidingPane extends Component {
  state = {
    isOpen: true
  };

  toggle = e => {
    e.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const slidingPaneClassNames = cx("sliding-pane", {
      open: this.state.isOpen
    });
    return (
      <div className={slidingPaneClassNames}>
        <div className="sliding-pane-toggle-button" onClick={this.toggle}>
          ☰
        </div>
        {this.props.children}
      </div>
    );
  }
}

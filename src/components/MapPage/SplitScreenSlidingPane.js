/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class SplitScreenSlidingPane extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  state = {
    isOpen: true,
  };

  toggle = (e) => {
    e.preventDefault();

    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const slidingPaneClassNames = cx('sliding-pane', {
      open: this.state.isOpen,
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


export default SplitScreenSlidingPane;

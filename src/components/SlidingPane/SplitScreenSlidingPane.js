import React, { Component } from 'react';
import styles from './SplitScreen.module.css';

class SplitScreenSlidingPane extends Component {
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
    const classNames = [styles.slidingPane];


    if (this.state.isOpen) {
      classNames.push(styles.open);
    }

    return (
      <div className={classNames.join(' ')}>
        <button className={styles.slidingPaneToggle} onClick={this.toggle}>☰</button>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
export default SplitScreenSlidingPane;

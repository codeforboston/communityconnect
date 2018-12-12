import React, { Component } from 'react';
import styles from './SplitScreen.module.css';

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

export class SplitScreenTogglePane extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div style={{display: this.props.isOpen == true ? 'block' : 'none'}} className={styles.togglePane}>{this.props.children}</div>
    );
  }
}

// export default SplitScreenSlidingPane = SplitScreenSlidingPane;

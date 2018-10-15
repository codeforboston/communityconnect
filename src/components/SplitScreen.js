import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SplitScreen.module.css';

const ChildrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

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

SplitScreenSlidingPane.propTypes = {
  children: ChildrenPropType.isRequired,
};

export const SplitScreenStaticPane = ({ children }) => (
  <div className={styles.staticPane}>{children}</div>
);

SplitScreenStaticPane.propTypes = {
  children: ChildrenPropType.isRequired,
};

export const SplitScreen = ({ children, ...other }) => (
  <div className={styles.viewport} {...other}>{children}</div>
);

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

// export const SplitScreenTogglePane = ({ children }) => (
//   <div className={styles.togglePane}>{children}</div>
// );

SplitScreenTogglePane.propTypes = {
  children: ChildrenPropType.isRequired,
};

SplitScreen.TogglePane = SplitScreenTogglePane;
SplitScreen.StaticPane = SplitScreenStaticPane;
SplitScreen.SlidingPane = SplitScreenSlidingPane;

SplitScreen.propTypes = {
  children: ChildrenPropType.isRequired,
};
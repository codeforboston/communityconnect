import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './SplitScreen.module.css';

/**
 * SplitScreenSlidingPane component class
 */
export class SplitScreenSlidingPane extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
  }

  state = {
    isOpen: true,
  }

  /**
   * Toggles the pane.
   *
   * @param {event} e the event
   */
  toggle = (e) => {
    e.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  /**
   * Renders the component.
   *
   * @return {React.ReactElement}
   */
  render() {
    const classNames = [styles.slidingPane];

    if (this.state.isOpen) {
      classNames.push(styles.open);
    }

    return (
      <div className={classNames.join(' ')}>
        <button
          className={styles.slidingPaneToggle}
          onClick={this.toggle}
        >
          ☰
        </button>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

/**
 * SplitScreenTogglePane component class
 */
export class SplitScreenTogglePane extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
  }

  /**
   * Renders the component.
   *
   * @return {React.ReactElement}
   */
  render() {
    return (
      <div
        style={{
          display: this.props.isOpen === true ? 'block' : 'none',
        }}
        className={styles.togglePane}
      >
        {this.props.children}
      </div>
    );
  }
}

// export default SplitScreenSlidingPane = SplitScreenSlidingPane;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './OrganizationCard.module.css';

class SaveButton extends Component {
  static propTypes = {
    saveItem: PropTypes.func.isRequired,
    saveExist: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      animateButtonInside: '',
      animateButtonOutside: [''],
    };
    this.buttonSign = this.buttonSign.bind(this);

    this.cardRef = React.createRef();
  }

    handleClick = () => {
      this.props.saveItem();
      const classes = [
        styles['cbutton--effect-radomir__after'],
        styles['cbutton--effect-radomir__cbutton--click__after'],
        styles['cbutton__after'],
      ];

      this.setState({
        animateButtonInside: styles['animate-button-click'],
        animateButtonOutside: classes,
      });
      setTimeout(() => {
        this.setState({
          animateButtonInside: '',
          animateButtonOutside: [''],
        });
      },
      500
      );
    }

    buttonSign() {
      if (this.props.saveExist) {
        return String.fromCharCode(0x2713);
      } else {
        return '+';
      }
    }

    render() {
      return (
        <span onClick={this.handleClick}>
          <button
            className={[
              styles['cbutton--effect-radomir'],
              styles['cbutton'],
            ].join(' ')}
          >
            <span
              title='Add item to Saved Resources'
              aria-label='Add item to Saved Resources'
              className={[
                this.state.animateButtonInside,
                styles['save-item'],
              ].join(' ')}>
              { this.buttonSign() }
            </span>
            <span
              className={this.state.animateButtonOutside.join(' ')}
            >
            </span>
          </button>
        </span>
      );
    }
}

export default SaveButton;

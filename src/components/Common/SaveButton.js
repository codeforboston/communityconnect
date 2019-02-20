import React, { Component } from 'react';
import styles from './OrganizationCard.module.css'

class SaveButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            animateButtonInside: '',
            animateButtonOutside: [''],
            buttonToggle: false
        };
        this.buttonSign = this.buttonSign.bind(this);

        this.cardRef = React.createRef();
    }

    handleClick = () => {
        this.props.saveItem();
        let classes = [
            styles['cbutton--effect-radomir__after'],
            styles['cbutton--effect-radomir__cbutton--click__after'],
            styles['cbutton__after'],
        ];

        this.setState({
            animateButtonInside: styles['animate-button-click'],
            animateButtonOutside: classes,
            buttonToggle: !this.state.buttonToggle
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
      if (this.state.buttonToggle)
        return '-'
      else
        return '+'
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

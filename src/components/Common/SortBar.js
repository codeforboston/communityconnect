import React from 'react';
import PropTypes from 'prop-types';
import {ButtonGroup} from 'reactstrap';
import styles from './SortBar.module.css';

class SortBar extends React.Component {
  static propTypes = {
    onSortChange: PropTypes.func.isRequired,
    sortOptions: PropTypes.array.isRequired,
  }

  handleClick = (e) => {
    // Get new sort based on index of sortOption array
    const newSort = this.props.sortOptions[e.target.value].sort;
    this.props.onSortChange(newSort);
  }

  render() {
    return (
      <div>
        <div className={styles.result}>
          <p>Sort By:</p>
        </div>

        <div className={styles.result}>
          <ButtonGroup>
            <select onChange={this.handleClick}>
              {this.props.sortOptions.map((sortOption, i) =>
                <option
                  key={sortOption.key}
                  value={i}
                  disabled={sortOption.disabled}
                >
                  {sortOption.key}
                </option>
              )}
            </select>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export default SortBar;

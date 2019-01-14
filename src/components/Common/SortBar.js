import React from 'react';
import {ButtonGroup} from 'reactstrap';
import styles from './SortBar.module.css';

class SortBar extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  handleClick = (e) => {
    // Get new sort based on index of sortOption array
    let newSort = this.props.sortOptions[e.target.value].sort;
    this.props.onSortChange(newSort);
  }

  render(){
    return (
        <div align="right">
          <div className={styles.result}>
              <p>Sort By:</p>
          </div>

          <div className={styles.result}>
              <ButtonGroup>
                <select onChange={this.handleClick}>
                {this.props.sortOptions.map((sortOption, i) =>
                  <option key={sortOption.key} value={i} disabled={sortOption.disabled}>
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

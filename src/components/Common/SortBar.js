import React from "react";
import PropTypes from "prop-types";

class SortBar extends React.Component {
  handleClick = e => {
    // Get new sort based on index of sortOption array
    if (this.props.sortOptions[e.target.value]) {
      const newSort = this.props.sortOptions[e.target.value].sort;
      this.props.onSortChange(newSort);
    }
  };

  render() {
    return (
      <span>
        <b>Sort by: </b>
        <select name="cardSort" onChange={this.handleClick}>
          {this.props.sortOptions.map((sortOption, i) => (
            <option
              key={sortOption.key}
              value={i}
              disabled={sortOption.disabled}
            >
              {sortOption.key}
            </option>
          ))}
        </select>
      </span>
    );
  }
}

SortBar.propTypes = {
  sortOptions: PropTypes.array.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default SortBar;

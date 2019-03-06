import React from 'react';

class SortBar extends React.Component {
    handleClick = (e) => {
        // Get new sort based on index of sortOption array
        let newSort = this.props.sortOptions[e.target.value].sort;
        this.props.onSortChange(newSort);
    }

    render() {
        return (
            <div>
                <label htmlFor="cardSort">Sort By: </label>
                <select name="cardSort" onChange={this.handleClick}>
                    {this.props.sortOptions.map((sortOption, i) =>
                        <option key={sortOption.key} value={i} disabled={sortOption.disabled}>
                            {sortOption.key}
                        </option>
                    )}
                </select>
            </div>
        );
    }
}

export default SortBar;

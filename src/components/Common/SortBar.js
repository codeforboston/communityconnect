import React from 'react';

/**
 * @param sortOptions
 */
class SortBar extends React.Component {
    handleClick = (e) => {
        // Get new sort based on index of sortOption array
        if (this.props.sortOptions[e.target.value]) {
            const newSort = this.props.sortOptions[e.target.value].sort;
            this.props.onSortChange(newSort);
        }
    }

    render() {
        return (
            <span><b>Sort by: </b>
                <select name="cardSort" onChange={this.handleClick}>
                    {this.props.sortOptions.map((sortOption, i) =>
                        <option key={sortOption.key} value={i} disabled={sortOption.disabled}>
                            {sortOption.key}
                        </option>
                    )}
                </select>
            </span>
        );
    }
}

export default SortBar;

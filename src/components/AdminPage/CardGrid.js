import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OrganizationCard from "../Common/OrganizationCard";
import SortBar from "../Common/SortBar";
import SearchBar from "../Header/SearchBar";
import getDistance from "../../utils/distance";

class CardGrid extends Component {
  state = {
    sortFunction: this.getCloserName,
  };

  getCloserResource = (a, b) => {
    if (
      getDistance(a, this.props.currentPos) >
      getDistance(b, this.props.currentPos)
    ) {
      return 1;
    }

    return -1;
  };

  getCloserName = (a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;

    return 0;
  };

  sortData = () => this.props.resources.slice().sort(this.state.sortFunction);

  handleSortChange = newSort => {
    if (this.state.sortFunction !== newSort) {
      this.setState({
        sortFunction: newSort,
      });
    }
  };

  render() {
    const sortOptions = [
      { key: "A-Z", sort: this.getCloserName, disabled: false },
      {
        key: "Distance",
        sort: this.getCloserResource,
        disabled: !this.props.currentPos,
      },
    ];

    // Render will be called every time this.props.data is updated, and every time handleSortChange
    // updates the this.state.dataSort variable.
    // this.state.dataSort() sorts data to feed into the OrganizationCards without modifying the
    // source of data
    const sortedData = this.sortData();

    return (
      <div className="card-grid">
        <div className="search-and-sort">
          <SearchBar type="text" handleFilter={this.props.handleFilter} />
          <SortBar
            onSortChange={this.handleSortChange}
            sortOptions={sortOptions}
          />
        </div>
        <div className="card-list">
          {sortedData.map(resource => (
            <OrganizationCard
              key={resource.id}
              index={resource.id}
              organization={resource}
              currentPos={this.props.currentPos}
              saveItem={() => this.props.saveItem(resource)}
              saveable
            />
          ))}
        </div>
      </div>
    );
  }
}

CardGrid.propTypes = {
  currentPos: PropTypes.object.isRequired,
  resources: PropTypes.array.isRequired,
  handleFilter: PropTypes.func,
  saveItem: PropTypes.func,
};

CardGrid.defaultProps = {
  handleFilter: null,
  saveItem: null,
};

function mapStateToProps(state) {
  const filteredResourcesSet = new Set(state.filteredResources.map(x => x.id));

  const resources = state.searchedResources.filter(x =>
    filteredResourcesSet.has(x.id)
  );

  return { resources };
}

export default connect(mapStateToProps)(CardGrid);

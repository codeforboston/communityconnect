import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OrganizationCard from "../Common/OrganizationCard";
import SortBar from "../Common/SortBar";
import SearchBar from "../Header/SearchBar";
import getDistance from "../../utils/distance";

class CardGrid extends Component {
  static propTypes = {
    currentPos: PropTypes.object.isRequired,
    resource: PropTypes.array.isRequired,
    handleFilter: PropTypes.func.isRequired,
    saveItem: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      dataSort: this.sortByAlphabet
    };
  }

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

  sortByAlphabet = () => this.props.resource.slice().sort(this.getCloserName);

  sortByDistance = () =>
    this.props.resource.slice().sort(this.getCloserResource);

  handleSortChange = newSort => {
    if (this.state.dataSort !== newSort) {
      this.setState({
        // Set the dataSort variable to whichever sort function is chosen
        dataSort: newSort
      });
    }
  };

  render() {
    const sortOptions = [
      { key: "A-Z", sort: this.sortByAlphabet, disabled: false },
      {
        key: "Distance",
        sort: this.sortByDistance,
        disabled: !this.props.currentPos
      }
    ];

    // Render will be called every time this.props.data is updated, and every time handleSortChange
    // updates the this.state.dataSort variable.
    // this.state.dataSort() sorts data to feed into the OrganizationCards without modifying the
    // source of data
    const sortedData = this.state.dataSort();

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

function mapStateToProps(state) {
  const filteredResourceSet = new Set(state.filteredResource.map(x => x.id));

  const resource = state.searchedResource.filter(x =>
    filteredResourceSet.has(x.id)
  );

  return { resource };
}

export default connect(mapStateToProps)(CardGrid);

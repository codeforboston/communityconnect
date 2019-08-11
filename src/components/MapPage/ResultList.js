import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OrganizationCard from "../Common/OrganizationCard";
import SortBar from "../Common/SortBar";
import getDistance from "../../utils/distance";
import * as resourceAction from "../../action/resourceDataAction";

class ResultList extends Component {
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

  sortByAlphabet = () =>
    this.props.savedResources.slice().sort(this.getCloserName);

  sortByDistance = () =>
    this.props.savedResources.slice().sort(this.getCloserResource);

  handleSortChange = newSort => {
    if (this.state.dataSort !== newSort) {
      this.setState({
        // Set the dataSort variable to whichever sort function is chosen
        dataSort: newSort,
      });
    }
  };

  cardClick = id => {
    this.props.savedResources.findIndex(resource => resource.id === id);
  };

  saveResource = resource => {
    if (!this.props.savedResources.some(r => r.id === resource.id)) {
      this.props.actions.addSavedResource(this.props.savedResources.slice());
    }
  };

  render() {
    const sortOptions = [
      { key: "A-Z", sort: this.sortByAlphabet, disabled: false },
      {
        key: "Distance",
        sort: this.sortByDistance,
        disabled: !this.props.currentPos,
      },
    ];

    // Render will be called every time this.props.data is updated, and every time handleSortChange
    // updates the this.state.dataSort variable.
    // this.state.dataSort() sorts data to feed into the OrganizationCards without modifying the
    // source of data
    const sortedData = this.sortByAlphabet();

    return (
      <div>
        <SortBar
          onSortChange={this.handleSortChange}
          sortOptions={sortOptions}
        />
        <div className="results" ref={this.listRef}>
          {sortedData.map(resource => (
            <OrganizationCard
              key={resource.id}
              index={resource.id}
              cardClick={this.cardClick}
              organization={resource}
              currentPos={this.props.currentPos}
              saveItem={() => this.props.saveItem(resource)}
            />
          ))}
        </div>
      </div>
    );
  }
}

ResultList.propTypes = {
  currentPos: PropTypes.object.isRequired,
  savedResources: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  saveItem: PropTypes.func,
};

ResultList.defaultProps = {
  saveItem: null,
};

function mapStateToProps(state) {
  return {
    savedResources:
      state.savedResources.length > 0 ? state.savedResources : state.resources,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(resourceAction, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultList);

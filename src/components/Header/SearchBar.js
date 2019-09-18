import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as resourceAction from "../../action/resourceDataAction";

class SearchBar extends Component {
  state = {
    searchString: "",
  };

  handleFilter = e => {
    this.setState({ searchString: e.target.value });
    const searchedResource = this.props.resources.filter(i =>
      i.name.toLowerCase().match(e.target.value.toLowerCase())
    );

    this.props.actions.filterBySearch(
      e.target.value.length > 0 ? searchedResource : this.props.resources
    );
  };

  render() {
    return (
      <input
        className="search-bar-input"
        type="text"
        value={this.state.searchString}
        onChange={this.handleFilter}
        placeholder="Search Resources"
      />
    );
  }
}

SearchBar.propTypes = {
  resources: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    resources:
      state.filteredResources.length > 0
        ? state.filteredResources
        : state.resources,
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
)(SearchBar);

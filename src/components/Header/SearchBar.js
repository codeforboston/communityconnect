import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as resourceAction from '../../action/resourceDataAction';

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
    };
  }

  handleFilter = (e) => {
    this.setState({ searchString: e.target.value });
    const searchedResource = this.props.resource.filter(i => i.name.toLowerCase().match(e.target.value.toLowerCase()));

    this.props.actions.filterBySearch(
      e.target.value.length > 0 ? searchedResource : this.props.resource,
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

function mapStateToProps(state, ownProps) {
  return {
    resource:
      state.filteredResource.length > 0
        ? state.filteredResource
        : state.resource,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(resourceAction, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);

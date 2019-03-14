import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as resourceAction from '../../action/resourceDataAction';

export class SearchBar extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      filterBySearch: PropTypes.func.isRequired,
    }),
    resource: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
    this.state = {
      searchString: '',
    };
  }

  handleFilter(e) {
    this.setState({searchString: e.target.value});
    const searchedResource = this.props.resource.filter(function(i) {
      return i.name.toLowerCase().match(e.target.value.toLowerCase());
    });
    this.props.actions.filterBySearch(
      e.target.value.length > 0 ?
        searchedResource :
        this.props.resource
    );
  }


  render() {
    return (
      <input
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
    resource: state.filteredResource.length > 0 ?
      state.filteredResource :
      state.resource,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(resourceAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

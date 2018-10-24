import React, { Component } from 'react';
import {
  NavItem} from 'reactstrap';
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
    this.state = {
      searchString: ''
    };
  }


  handleSubmit(txt){
    this.props.handleFilter(txt, "name");
  }

  handleFilter (e) {
    this.setState({searchString : e.target.value});
    this.handleSubmit(e.target.value);
  }


  render() {
    return (
      <NavItem>
      <input type="text" value={this.state.searchString} onChange={this.handleFilter} placeholder="Search Resources"/>
      </NavItem>
    );
  }
}

export default SearchBar;

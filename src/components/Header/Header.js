import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,} from 'reactstrap';

import DropdownCategory from '../Header/DropdownCategory.js';
import SearchBar from '../Header/SearchBar.js';



class Header extends Component {
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Community Connect - Revere</NavbarBrand>
          <SearchBar type="text" handleFilter={this.props.handleFilter} />
            <Nav className="ml-auto" navbar>
              <DropdownCategory category={this.props.categories} handleEvent={this.props.handleEvent}/>
            </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;

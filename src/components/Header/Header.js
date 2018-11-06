import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  DropdownItem,
  Button,
  } from 'reactstrap';

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
              <Button 
                color="secondary" 
                onClick={() => this.props.toggleSavedResourcesPane()}>
                Saved Resources
              </Button>
            </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;

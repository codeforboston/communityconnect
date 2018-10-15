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
            </Nav>
            <Button 
              color="primary" 
              onClick={() => this.props.toggleSavedResourcesPane()} 
              style={{ marginBottom: '1rem' }}>
              Saved Resources
            </Button>
        </Navbar>
      </div>
    );
  }
}

export default Header;

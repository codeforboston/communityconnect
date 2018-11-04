import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from 'reactstrap';

import DropdownCategory from '../Header/DropdownCategory.js';
import SearchBar from '../Header/SearchBar.js';


class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
        <NavbarBrand >Community Connect - Revere</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar}  />
<<<<<<< HEAD
        <Collapse isOpen={this.state.collapsed} navbar>        
=======
        <Collapse isOpen={!this.state.collapsed} navbar>
>>>>>>> a6ff26710256b7e1133d98f3ac9a9733c9c19b3c
            <Nav className="ml-auto" navbar>
              <SearchBar type="text" handleFilter={this.props.handleFilter} />
              <DropdownCategory category={this.props.categories} handleEvent={this.props.handleEvent}/>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;

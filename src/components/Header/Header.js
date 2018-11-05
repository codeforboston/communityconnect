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
import styles from '../Header/Header.module.css';


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
      <div className='styles.header'>
        <Navbar color="light" light expand="md">
        <NavbarBrand >Community Connect - Revere</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar}  />
        <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              <SearchBar type="text" handleFilter={this.props.handleFilter} />
              </NavItem>
              <NavItem>
              <DropdownCategory category={this.props.categories} handleEvent={this.props.handleEvent}/>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;

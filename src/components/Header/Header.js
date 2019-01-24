import React, { Component } from 'react';
import { Route } from 'react-router';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button} from 'reactstrap';

import SearchBar from '../Header/SearchBar.js';
import CClargelogo from '../Header/Images/CClargelogo.png';

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
        <NavbarBrand className="Logo-icon" href="/">
          <img src={CClargelogo} alt="Community Connect logo"/>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar}  />
        <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              <Route exact path='/' render={props => (
                <SearchBar
                  routerLocation={props.location} 
                  type="text" 
                  handleFilter={this.props.handleFilter} />
              )} />              
              </NavItem>
              <NavItem>
              <Button
                color="secondary"
                onClick={() => this.props.toggleSavedResourcesPane()}>
                Saved Resources
              </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;

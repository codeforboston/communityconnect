import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      activeItem: -1,
      value : "Categories"
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleClick(cat, index) {
    console.log(index);
    this.props.handleEvent(cat);
    this.setState(state => ({
      value : cat,
      activeItem: index
    }));
  }

  categoryMenuItems() {
    return this.props.categories.map((cat, index) =><DropdownItem onClick = {() => this.handleClick(cat, index)} key={cat}>
    {this.state.activeItem === index ? <span>&#10004; {cat}</span>: cat}</DropdownItem>);
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Revere Resource Mapping - netlify test</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>{this.state.value}</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick = {() => this.handleClick("All", -1)} key="all">All</DropdownItem>
                  { this.categoryMenuItems() }
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;

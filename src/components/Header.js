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
      value : 'Categories'
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
    console.log('Toggle this is : ', this);
  }

  handleClick= (e) => {

    console.log('this is : ', e.target.value);
    this.props.handleEvent(e.target.value);
  }

  handleClick(e) {
    var current = e.currentTarget.innerText;
    this.props.handleEvent(e.target.value);
    this.setState(state => ({
      value : current
    }));
  }

  categoryMenuItems() {
    return this.props.categories.map(cat => <DropdownItem value = {cat} onClick = {this.handleClick} key={cat}>{cat}</DropdownItem>);
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Revere Resource Mapping</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown
              setActiveFromChild
               nav inNavbar>
                <DropdownToggle nav caret>{this.state.value}</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem value="all" onClick = {this.handleClick} key="all">All</DropdownItem>
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

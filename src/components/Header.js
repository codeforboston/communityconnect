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

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
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
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>Categories</DropdownToggle>
                <DropdownMenu right>{ this.categoryMenuItems() }</DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;

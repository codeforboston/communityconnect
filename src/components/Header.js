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
  }

  categoryMenuItems() {
    let categorySet = new Set();
    for(let i = 0; i < this.props.categories.length; i++){
      var current = this.props.categories[i];
      if(current.indexOf(", ") > 1){
        var array = current.split(", ");
        for(var j = 0; j < array.length; j++){
          categorySet.add(array[j]);
          console.log(categorySet);
        }
      }
      else{
        categorySet.add(current);
      }
    }
    let category = Array.from(categorySet);
    return category.map(cat => <DropdownItem key={cat}>{cat}</DropdownItem>);
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

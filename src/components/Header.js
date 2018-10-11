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
    this.handleFilter = this.handleFilter.bind(this);
    this.state = {
      isOpen: false,
      value : "Categories",
      searchString: '',
      activeItem: []
    };
  }
 

  handleSubmit(txt){
    this.props.handleFilter(txt, "name");
  }


  handleFilter (e) {
    this.setState({searchString : e.target.value});
    this.handleSubmit(e.target.value);       
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleClick(cat, index) {
    console.log(index);
    this.props.handleEvent(cat, "cat");    
    //his.props.handleEvent(cat);
    if(index === -1) this.setState({activeItem:[]});
    this.state.activeItem.includes(index) ?  this.setState({
      activeItem : this.state.activeItem.filter( selected => selected !== index)
    })
    : this.state.activeItem.push(index);
  }

  categoryMenuItems() {
    return this.props.categories.map((cat, index) =><DropdownItem onClick = {() => this.handleClick(cat, index)} key={cat}>
    {this.state.activeItem.includes(index) ? <span>&#10004; {cat}</span>: cat}</DropdownItem>);
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Community Connect - Revere</NavbarBrand>
          <input type="text" value={this.state.searchString} onChange={this.handleFilter} placeholder="Search Resources"/>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>Category</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick = {() => this.handleClick("Clear", -1)} key={"Clear"}>Clear</DropdownItem>
                  <DropdownItem divider/>
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

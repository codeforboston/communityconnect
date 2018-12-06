import React, { Component } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';



class DropdownCategory extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      value : "Categories",
      activeItem: []
    };
  }


  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleClick(cat, index) {
    this.props.handleEvent(cat, "category");
    if(index === -1) this.setState({
      activeItem:[]
    });
    this.state.activeItem.includes(index) ?  this.setState({
      activeItem : this.state.activeItem.filter( selected => selected !== index)
    })
    : this.state.activeItem.push(index);
  }

  categoryMenuItems() {
    return this.props.category.map((cat, index) =>
    <DropdownItem onClick = {() => this.handleClick(cat, index)} key={cat}>
    {this.state.activeItem.includes(index) ? <span>&#10004; {cat}</span>: cat}</DropdownItem>);
  }

  render() {
    return (
      <div>
        <Dropdown toggle = {this.toggle} isOpen={this.state.dropdownOpen} inNavbar>
          <DropdownToggle nav caret >Category</DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick = {() => this.handleClick("Clear", -1)} key={"Clear"}>Clear</DropdownItem>
            <DropdownItem divider/>
            { this.categoryMenuItems() }
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default DropdownCategory;

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

    this.selectedCategories = []
  }


  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleClick(cat, index) {

    if(index === -1) {
        this.setState({
            activeItem: []
        });

        // If the categories list is cleared this will send an empty array to tell
        // App.js that there are no categories selected and to apply the original list.
        this.props.handleCategorySelection([]);
        this.selectedCategories = []

        return
    }
    this.state.activeItem.includes(index) ? this.setState({
      activeItem : this.state.activeItem.filter( selected => selected !== index)
    })
    : this.state.activeItem.push(index);

    this.selectedCategories.includes(cat) ?
        this.selectedCategories = this.selectedCategories.filter( selected => selected !== cat)
        : this.selectedCategories.push(cat);

    // This sends a list to App.js of which categories are currently selected.
      this.props.handleCategorySelection(this.selectedCategories);
  }

  categoryMenuItems() {
    return this.props.category.map((cat, index) =>
    <DropdownItem toggle={true} toggle={false} onClick = {() => this.handleClick(cat, index)} key={cat}>
    {this.state.activeItem.includes(index) ? <span>&#10004; {cat}</span>: cat}</DropdownItem>);
  }

  render() {
    return (
      <div>
        <Dropdown toggle = {this.toggle} isOpen={this.state.dropdownOpen} nav inNavbar>
          <DropdownToggle nav caret >Category</DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick = {() => this.handleClick([], -1)} key={"Clear"}>Clear</DropdownItem>
            <DropdownItem divider/>
            { this.categoryMenuItems() }
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default DropdownCategory;

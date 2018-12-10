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
        walkwayDropDownOpen: false,
      value : "Categories",
      activeItem: [],
        activeWalkWayItems: {
          arlington: false,
            chelsea: false,
            charlestown: false
        }
    };
  }


  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

    walkWayToggle = () => {
        this.setState({
            walkwayDropDownOpen: !this.state.walkwayDropDownOpen
        });
    }

    handleWalkWayClick = (e) => {

        const value = e.target.value;

        this.props.handleWalkWayClick(value);

        this.setState((prevState) => {

            let activeWalkWayItemsCopy = prevState.activeWalkWayItems;

            activeWalkWayItemsCopy[value] = !activeWalkWayItemsCopy[value];

            return ({activeWalkWayItems: activeWalkWayItemsCopy })
        })
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
    <DropdownItem toggle={true} toggle={false} onClick = {() => this.handleClick(cat, index)} key={cat}>
    {this.state.activeItem.includes(index) ? <span>&#10004; {cat}</span>: cat}</DropdownItem>);
  }

  render() {
    return (
      <div>
          <Dropdown toggle = {this.walkWayToggle} isOpen={this.state.walkwayDropDownOpen} nav inNavbar>
              <DropdownToggle nav caret >Walk Way</DropdownToggle>
              <DropdownMenu right>
                  <DropdownItem
                      active={this.state.activeWalkWayItems.arlington}
                      onClick={this.handleWalkWayClick}
                      value="arlington">
                        Arlington
                  </DropdownItem>
                  <DropdownItem
                      active={this.state.activeWalkWayItems.chelsea}
                      onClick={this.handleWalkWayClick}
                      value="chelsea">
                        Chelsea
                  </DropdownItem>
                  <DropdownItem
                      active={this.state.activeWalkWayItems.charlestown}
                      onClick={this.handleWalkWayClick}
                      value="charlestown">
                        Charlestown
                  </DropdownItem>
              </DropdownMenu>
          </Dropdown>
        <Dropdown toggle = {this.toggle} isOpen={this.state.dropdownOpen} nav inNavbar>
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

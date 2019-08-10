import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// import { DropdownCategory } from './HeaderLayout';

class DropdownCategory extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    handleEvent: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      activeItem: [],
    };
  }

  toggle = () => {
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
  };

  handleClick = (cat, index) => {
    this.props.handleEvent(cat, "categories");
    if (index === -1)
      this.setState({
        activeItem: [],
      });
    const includesIndex = this.state.activeItem.includes(index);

    if (includesIndex) {
      return this.setState(prevState => ({
        activeItem: prevState.activeItem.filter(selected => selected !== index),
      }));
    }

    return this.state.activeItem.push(index);
  };

  categoryMenuItems() {
    return this.props.categories.map((cat, index) => (
      <DropdownItem
        toggle={false}
        onClick={() => this.handleClick(cat, index)}
        key={cat}
      >
        {this.state.activeItem.includes(index) ? (
          <span>&#10004; {cat}</span>
        ) : (
          cat
        )}
      </DropdownItem>
    ));
  }

  render() {
    return (
      <div>
        <Dropdown
          toggle={this.toggle}
          isOpen={this.state.dropdownOpen}
          inNavbar
        >
          <DropdownToggle nav caret>
            Category
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              onClick={() => this.handleClick("Clear", -1)}
              key="Clear"
            >
              Clear
            </DropdownItem>
            <DropdownItem divider />
            <DropdownCategory>{this.categoryMenuItems()}</DropdownCategory>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default DropdownCategory;

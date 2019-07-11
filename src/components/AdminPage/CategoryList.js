import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as resourceAction from '../../action/resourceDataAction';
import { Form, FormGroup, Label, Input } from 'reactstrap';

export class CategoryList extends Component {

  constructor(props) {
    super(props);
    this.myFormRef = 0
    this.state = {
      selectedCategory: [],
      refresh: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selected) {
    let { selectedCategory } = this.state;
    // console.log(selectedCategory)
    let index = selectedCategory.indexOf(selected);
    index !== -1 ? selectedCategory.splice(index, 1) : selectedCategory.push(selected);
    let filteredResource = this.props.resource.filter(resource => {
      return this.state.selectedCategory.some(searchCategory => resource.categories.split(',').map(item => item.trim()).includes(searchCategory));
    });
    this.props.actions.filterByCategories(selectedCategory.length > 0 ? filteredResource : this.props.resource);
  }

  clearCategoryMenuItems() {
    // this.categoryMenuItems().map
  }

  categoryMenuItems() {
    return this.props.categories.map((cat) =>
      <FormGroup key={cat} check>
        <Input type="checkbox" key={cat} onChange={() => this.handleChange(cat)} />{cat}
      </FormGroup>);
  }

  handleClick = (event) => {
    event.preventDefault();
    console.log('hi');
    // window.location.href = "/revere/admin";
    this.setState(prevState => {
      return {
        selectedCategory: [],
        refresh: !prevState.refresh
      }
    });
    console.log('refresh', this.state.refresh)
    console.log('selected categories', this.state.selectedCategory)
  }

  render() {
    return (
      <>
        <Form>
          <Label>Filter by Category</Label>
          {this.state.refresh ? this.categoryMenuItems() : this.categoryMenuItems()}
          <button onClick={this.handleClick}>Clear Categories</button>
        </Form>

      </>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories,
    resource: state.resource
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(resourceAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, FormGroup, Label, Input } from "reactstrap";
import * as resourceAction from "../../action/resourceDataAction";

class CategoryList extends Component {
  static propTypes = {
    resource: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: []
    };
  }

  handleChange = selected => {
    const { selectedCategory } = this.state;
    const index = selectedCategory.indexOf(selected);

    // eslint-disable-next-line no-unused-expressions
    index !== -1
      ? selectedCategory.splice(index, 1)
      : selectedCategory.push(selected);

    const filteredResource = this.props.resource.filter(resource =>
      this.state.selectedCategory.some(searchCategory =>
        resource.categories
          .split(",")
          .map(item => item.trim())
          .includes(searchCategory)
      )
    );

    this.props.actions.filterByCategories(
      selectedCategory.length > 0 ? filteredResource : this.props.resource
    );
  };

  render() {
    const categoryMenuItems = this.props.categories.map(cat => (
      <FormGroup key={cat} check>
        <Input
          type="checkbox"
          key={cat}
          onChange={() => this.handleChange(cat)}
        />
        {cat}
      </FormGroup>
    ));

    return (
      <Form>
        <Label>Filter by Category</Label>
        {categoryMenuItems}
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    resource: state.resource
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(resourceAction, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);

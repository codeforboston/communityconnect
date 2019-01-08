import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

export class CategoryList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
  }


  componentWillReceiveProps(nextProps) {
    this.setState({ categories: Object.assign({}, nextProps.categories) });
  }

  categoryMenuItems() {
    return this.props.categories.map((cat, index) =>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" />{cat}
        </Label>
      </FormGroup>);
  }
  render() {
    return (
      <Form>
        {this.categoryMenuItems()}
      </Form>
    )
  }
}

function mapStateToProps(state, ownProps) {
  console.log("State categories: ", state.categories);
  return {
    categories: state.categories
  }
}


export default connect(mapStateToProps)(CategoryList);

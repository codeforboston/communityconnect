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
      <FormGroup key={cat} check>
          <Input type="checkbox" key={cat}/>{cat}
      </FormGroup>);
  }
  render() {
    return (
      <Form>
        <Label>Category</Label>
        {this.categoryMenuItems()}
        <Button>Submit</Button>
      </Form>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories
  }
}


export default connect(mapStateToProps)(CategoryList);

import React, { Component } from 'react';
import { CustomInput, Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
    <CustomInput type="checkbox" key={index} id={index} label={cat} />);
  }
  render() {
    return (
      <Form>
        <FormGroup check>
          <div>
            {this.categoryMenuItems()}
          </div>
        </FormGroup>
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

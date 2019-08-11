import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as resourceAction from '../../action/resourceDataAction';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export class CategoryList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedCategory: [],
      isChecked: {}
    };
  }

  componentDidMount () {
    const { categories } = this.props
    categories.sort()
    categories.forEach((curr, index) => {
      this.setState((prevState) => ({
        isChecked: {
          ...prevState.isChecked, [curr]: false
        }
      }));
    });
};

filteredResource = () => {
  const { selectedCategory } = this.state;
  this.props.resource.filter(resource => {
    return selectedCategory.some(searchCategory =>
      resource.categories
        .split(',')
        .map(item => item.trim())
        .includes(searchCategory),
    );
  });
}

  handleChange = event => {
    event.persist()
    console.log(event.target.checked)
    const { selectedCategory } = this.state;
    // const index = selectedCategory.indexOf(selected);
    // index !== -1
    //   ? selectedCategory.splice(index, 1)
    //   : selectedCategory.push(selected);
    // const filteredResource = this.props.resource.filter(resource => {
    //   return selectedCategory.some(searchCategory =>
    //     resource.categories
    //       .split(',')
    //       .map(item => item.trim())
    //       .includes(searchCategory),
    //   );
    // });
    const filtered = this.filteredResource()
    this.props.actions.filterByCategories(
      selectedCategory.length > 0 ? filtered : this.props.resource,
    );
    this.setState((prevState) => ({
      selectedCategory: [...prevState.selectedCategory, event.target.name],
      isChecked: {
        ...prevState.isChecked, [event.target.name]: !prevState.isChecked[event.target.name]
      }})
    );
  };

  clearChecks = event => {
  event.preventDefault()
  const { categories } = this.props
  categories.sort()
  categories.forEach((curr, index) => {
    this.setState((prevState) => ({
      selectedCategory: [],
      isChecked: {
        ...prevState.isChecked, [curr]: false
      }
    }))
  })
  this.props.actions.filterByCategories(this.props.resource);
};

  render () {
    const { isChecked, selectedCategory } = this.state
    const { categories } = this.props
    const categoryMenuItems = categories.map((curr, index) => (
      <FormGroup key={curr} check>
        <Input
          key = {index.toString()}
          type = "checkbox"
          name = {curr}
          checked = {isChecked[curr]}
          onChange = {this.handleChange}
        />
        {curr}
      </FormGroup>
    ));

    return (
      <Form>
        <Label>Filter by Category</Label>
        <Button onClick={this.clearChecks}>Clear</Button>
        {categoryMenuItems}
      </Form>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    categories: state.categories,
    resource: state.resource,
  };
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(resourceAction, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryList);

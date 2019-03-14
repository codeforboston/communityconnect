import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as resourceAction from '../../action/resourceDataAction';
import {Form, FormGroup, Label, Input} from 'reactstrap';
import styles from './CategoryList.module.css';

export class CategoryList extends Component {
  static propTypes = {
    resource: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      filterByCategories: PropTypes.func.isRequired,
    }).isRequired,
    categories: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selected) {
    const {selectedCategory} = this.state;
    const index = selectedCategory.indexOf(selected);
    index !== -1 ?
      selectedCategory.splice(index, 1) :
      selectedCategory.push(selected);
    const filteredResource = this.props.resource.filter((resource) => {
      return this.state.selectedCategory.some(
        (searchCategory) => resource.categoryautosortscript
          .split(',')
          .map((item) => item.trim())
          .includes(searchCategory)
      );
    });
    this.props.actions.filterByCategories(
      selectedCategory.length > 0 ? filteredResource : this.props.resource
    );
  }

  categoryMenuItems() {
    return this.props.categories.map((cat) =>
      <FormGroup className={styles.FormGroup} key={cat} check>
        <Input
          type="checkbox"
          key={cat}
          onChange={() => this.handleChange(cat)}
        />{cat}
      </FormGroup>);
  }
  render() {
    return (
      <Form className={styles.Form}>
        <Label>Filter by Category</Label>
        {this.categoryMenuItems()}
      </Form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories,
    resource: state.resource,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(resourceAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import Collapsible from "react-collapsible";
import _ from "lodash";
import * as resourceAction from "../../action/resourceDataAction";

class CategoryList extends Component {
  state = {
    selectedCategory: [],
  };

  componentDidUpdate() {
    const { selectedCategory } = this.state;
    const { resources } = this.props;

    if (selectedCategory.length === 0) {
      return this.props.actions.filterByCategories(resources);
    }

    const filteredResources = resources.filter(resource =>
      selectedCategory.some(cat => resource.categories === cat)
    );

    return this.props.actions.filterByCategories(filteredResources);
  }

  handleClick = async event => {
    event.persist();
    const isContains = event.target.classList.contains(
      "list-group-item-success"
    );

    const selectedCategoryLength = this.state.selectedCategory.length;

    if (isContains && selectedCategoryLength === 1) {
      this.setState({
        selectedCategory: [],
      });
    } else if (isContains) {
      this.setState(prevState => {
        const selectedCategoryCopy = prevState.selectedCategory.slice();
        _.remove(selectedCategoryCopy, cat => cat === event.target.innerHTML);

        return {
          selectedCategory: selectedCategoryCopy,
        };
      });
    } else {
      this.setState(prevState => ({
        selectedCategory: [
          ...prevState.selectedCategory,
          event.target.innerHTML,
        ],
      }));
    }
  };

  clearChecks = () => {
    this.setState({
      selectedCategory: [],
    });
  };

  render() {
    const { selectedCategory } = this.state;
    const { categories } = this.props;

    const categoryMenuItems = [...categories].sort().map((curr, index) => (
      <ListGroupItem
        key={index.toString()}
        className="category-group-item"
        color={_.indexOf(selectedCategory, curr) !== -1 ? "success" : ""}
        onClick={this.handleClick}
      >
        {curr}
      </ListGroupItem>
    ));

    return (
      <div className="category-parent-container">
        <Collapsible
          triggerTagName="label"
          trigger="Filter by Category"
          open
          transitionTime={100}
        >
          <div className="category-container">
            <ListGroup className="category-group">
              {categoryMenuItems}
            </ListGroup>
          </div>
          <Button
            color="info"
            className="w-100 mt-2"
            onClick={this.clearChecks}
          >
            Clear
          </Button>
        </Collapsible>
      </div>
    );
  }
}

CategoryList.propTypes = {
  resources: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  filterByCategories: PropTypes.func,
  categories: PropTypes.array.isRequired,
};

CategoryList.defaultProps = {
  filterByCategories: undefined,
};

function mapStateToProps(state) {
  return {
    categories: state.categories,
    resources: state.resources,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(resourceAction, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);

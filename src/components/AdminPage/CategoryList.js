import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ListGroup, ListGroupItem, Label, Button } from "reactstrap";
import _ from "lodash";
import * as resourceAction from "../../action/resourceDataAction";

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: [],
    };
  }

  componentDidUpdate() {
    const { selectedCategory } = this.state;
    const { resource } = this.props;
    const filteredResource = [];

    if (selectedCategory.length === 0) {
      this.props.actions.filterByCategories(resource);
    } else {
      resource.forEach(res => {
        const isMatch = selectedCategory.some(cat => res.categories === cat);

        if (isMatch) {
          filteredResource.push(res);
        }
      });
      this.props.actions.filterByCategories(filteredResource);
    }
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
    categories.sort();
    const categoryMenuItems = categories.map((curr, index) => (
      <ListGroupItem
        key={index.toString()}
        color={_.indexOf(selectedCategory, curr) !== -1 ? "success" : ""}
        onClick={this.handleClick}
      >
        {curr}
      </ListGroupItem>
    ));

    return (
      <div>
        <Label>Filter by Category</Label>
        <Button color="info" className="w-100" onClick={this.clearChecks}>
          Clear
        </Button>
        <div style={{ height: "400px", overflow: "auto", cursor: "pointer" }}>
          <ListGroup>{categoryMenuItems}</ListGroup>
        </div>
      </div>
    );
  }
}

CategoryList.propTypes = {
  resource: PropTypes.array.isRequired,
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
    resource: state.resource,
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

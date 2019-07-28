import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrganizationCard from '../Common/OrganizationCard';
import SearchBar from '../Header/SearchBar';
import { CardGridWrapper, SearchAndSortWrapper, CardListWrapper } from "./AdminPageLayout";

export class CardGrid extends Component {
  constructor(props){
    super(props)

    this.state = {
      dataSort: this.props.sort,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.sort !== prevProps.sort){
      this.setState({
        dataSort: this.props.sort
      })
    }
  }

  render() {
    // Render will be called every time this.props.data is updated, and every time handleSortChange
    // updates the this.state.dataSort variable.
    // this.state.dataSort() sorts data to feed into the OrganizationCards without modifying the
    // source of data
    const sortedData = this.state.dataSort();

    return (
      <CardGridWrapper>
        <SearchAndSortWrapper>
          <SearchBar
            type="text"
            handleFilter={this.props.handleFilter}
          />
        </SearchAndSortWrapper>
        <CardListWrapper>
          {
            sortedData.map((resource, index) => (
                <OrganizationCard
                  key={resource.id}
                  index={resource.id}
                  organization={resource}
                  currentPos={this.props.currentPos}
                  saveItem={() => this.props.saveItem(resource)}
                  saveable={true}
                />
            ))
          }
        </CardListWrapper>
      </CardGridWrapper>
    );
    }
  };

  function mapStateToProps(state, ownProps) {
      let res = [];
      //Not the most efficient logic, but it works. Will have to optimize this later
      for (let i = 0, len1 = state.searchedResource.length; i < len1; i++) {
          for (let j = 0, len2 = state.filteredResource.length; j < len2; j++) {
              if (state.searchedResource[i].id === state.filteredResource[j].id) {
                  res.push(state.searchedResource[i])
              }
          }
      }

    return {
        resource: res
    }
}


export default connect(mapStateToProps)(CardGrid);

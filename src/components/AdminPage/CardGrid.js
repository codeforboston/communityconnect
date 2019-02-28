import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { connect } from 'react-redux';
import OrganizationCard from '../Common/OrganizationCard';
import SortBar from '../Common/SortBar.js';
import SearchBar from '../Header/SearchBar';
import { getDistance } from '../../utils/distance.js';

export class CardGrid extends Component {
  constructor(props){
    super(props)

    this.state = {
      dataSort: this.sortByAlphabet,
    }
  }

  getCloserResource = (a , b) => {
    if(getDistance(a,this.props.currentPos)
    > getDistance(b,this.props.currentPos)){
      return 1;
    }

    return -1;
  }

  getCloserName = (a, b) => {
    if(a.name > b.name) return 1
    else if(a.name < b.name ) return -1
    else return 0
  }


  sortByAlphabet = () => {
    return this.props.resource.slice().sort(this.getCloserName);
  }

  sortByDistance = () => {
    return this.props.resource.slice().sort(this.getCloserResource);
  }

  handleSortChange = (newSort) => {
    if(this.state.dataSort !== newSort)
      this.setState({
        // Set the dataSort variable to whichever sort function is chosen
        dataSort: newSort,
      })
  }

  render() {
    const sortOptions = [
      {key: 'Alphabetically', sort: this.sortByAlphabet, disabled: false}
      ,{key: 'Distance', sort: this.sortByDistance, disabled: !this.props.currentPos}
    ];

    // Render will be called every time this.props.data is updated, and every time handleSortChange
    // updates the this.state.dataSort variable.
    // this.state.dataSort() sorts data to feed into the OrganizationCards without modifying the
    // source of data
    const sortedData = this.state.dataSort();

    return (
      <Container>
        <Row>
          <Col>
            <SearchBar
              type="text"
              handleFilter={this.props.handleFilter}
            />
          </Col>
          <Col>
            <SortBar
              onSortChange={this.handleSortChange}
              sortOptions={sortOptions}
            />
          </Col>
        </Row>
        <Row>
          {
            sortedData.map((resource, index) => (
              // classes are bootstrap helper classes, see: https://getbootstrap.com/docs/4.0/utilities/flex/
              <Col key={resource.id} xs="12" lg="6" className="d-flex my-2 align-content-stretch justify-content-stretch">
                <OrganizationCard
                  key={resource.id}
                  index={resource.id}
                  organization={resource}
                  currentPos={this.props.currentPos}
                  saveItem={() => this.props.saveItem(resource)}
                  saveable={true}
                />
              </Col>
            ))
          }
        </Row>
      </Container>
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

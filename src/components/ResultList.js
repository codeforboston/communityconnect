import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import OrganizationCard from './Common/OrganizationCard';
import styles from './ResultList.module.css';
import SortBar from './Common/SortBar.js';
import { getDistance } from '../utils/distance.js';
import * as resourceAction from '../action/resourceDataAction';

export class ResultList extends Component {

  constructor(props){
    super(props)

    this.state = {
      dataSort: this.sortByAlphabet,
    }
    
    this.sortByAlphabet = this.sortByAlphabet.bind(this);
    this.sortByDistance = this.sortByDistance.bind(this);
    this.getCloserName = this.getCloserName.bind(this);
    this.getCloserResource = this.getCloserResource.bind(this);
    this.listRef = React.createRef()
  }

  scrollToElement = (index) => {
    this.refs[parseInt(index) + 1].getRef()
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
    return this.props.savedResource.slice().sort(this.getCloserName);
  }

  sortByDistance = () => {
    return this.props.savedResource.slice().sort(this.getCloserResource);
  }

  handleSortChange = (newSort) => {
    if(this.state.dataSort !== newSort)
      this.setState({
        // Set the dataSort variable to whichever sort function is chosen
        dataSort: newSort,
      })
  }

  cardClick = (id) => {
    this.props.savedResource.findIndex( resource => {
      return resource.id === id;
    })

  }
  saveResource = (resource) => {
    if (!this.props.savedResource.some(r => r.id === resource.id)) {
      this.props.actions.addSavedResource(this.props.savedResource.slice())
    }
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
    return(
      <div >
        <div
          className={[
            styles.results, (this.props.fullWidth ? styles.resultsFullWidth : styles.resultsPartialWidth)].join(' ')}
          ref={this.listRef}>
        <SortBar
          onSortChange={this.handleSortChange}
          sortOptions={sortOptions}
        />
        {
          sortedData.map((resource, index) =>

          <OrganizationCard
            key={resource.id}
            ref={resource.id}
            index={resource.id}
            cardClick={this.cardClick}
            organization={resource}
            currentPos={this.props.currentPos}
            saveItem={() => this.props.saveItem(resource)}
          />
        )}
        </div>
      </div>
    );

  }
}

function mapStateToProps(state, ownProps) {
  return {
    savedResource: state.savedResource.length > 0 ? state.savedResource : state.resource
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(resourceAction, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ResultList);
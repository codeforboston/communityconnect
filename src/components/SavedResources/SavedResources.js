import React, { Component } from 'react';
// import OrganizationCard from '../OrganizationCard';
import SavedResource from '../SavedResource/SavedResource';
import styles from './SavedResources.module.css';
import SortBar from '../SortBar.js';
import { getDistance } from '../../utils/distance.js';

export class ResultList extends Component {

  constructor(props){
    super(props)

    // this.state = {
    //   dataSort: this.sortByAlphabet,
    // }

    // this.sortByAlphabet = this.sortByAlphabet.bind(this);
    // this.sortByDistance = this.sortByDistance.bind(this);
    // this.getCloserName = this.getCloserName.bind(this);
    // this.getCloserResource = this.getCloserResource.bind(this);
    // this.listRef = React.createRef()
  }

  // scrollToElement = (id) => {
  //   this.refs[id].getRef()
  // }

  // getCloserResource = (a , b) => {
  //   if(getDistance(a,this.props.currentPos)
  //   > getDistance(b,this.props.currentPos)){
  //     return 1;
  //   }

  //   return -1;
  // }

  // getCloserName = (a, b) => {
  //   if(a.organizationname > b.organizationname) return 1
  //   else if(a.organizationname < b.organizationname ) return -1
  //   else return 0
  // }

  // sortByAlphabet = () => {
  //   return this.props.data.sort(this.getCloserName);
  // }

  // sortByDistance = () => {
  //   return this.props.data.sort(this.getCloserResource);
  // }

  // handleSortChange = (newSort) => {
  //   if(this.state.dataSort != newSort)
  //     this.setState({
  //       // Set the dataSort variable to whichever sort function is chosen
  //       dataSort: newSort,
  //     })
  // }

  render() {

    // const sortOptions = [
    //     { 
    //       key: 'Alphabetically', 
    //       sort: this.sortByAlphabet, 
    //       disabled: false
    //     }
    //    ,{
    //       key: 'Distance', 
    //       sort: this.sortByDistance, 
    //       disabled: !this.props.haveCoords
    //     }
    // ];

    // Render will be called every time this.props.data is updated, and every time handleSortChange
    // updates the this.state.dataSort variable.
    // this.state.dataSort() sorts data to feed into the OrganizationCards without modifying the
    // source of data
    const sortedData = this.props.data; //this.state.dataSort();

    return(
      <div>
        <div 
          className={[
            styles['saved-resources'], 
            styles['saved-resources-full-width']].join(' ')}  
        >
        {sortedData.map((item, i) => 
          <SavedResource 
            key={item.id} 
            ref={item.id} 
            // cardClick={this.props.cardClick} 
            organization={item} 
            currentPos={this.props.currentPos}
            removeItem={() => this.props.removeItem(item)}
          />
        )}
        </div>
      </div>
    );

  }
}

export default SavedResources;

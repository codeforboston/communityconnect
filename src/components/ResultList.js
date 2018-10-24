import React, { Component } from 'react';
import OrganizationCard from './OrganizationCard';

import styles from './ResultList.module.css';
import SortBar from './SortBar.js';


export class ResultList extends Component {

  constructor(props){
    super(props)

    this.listRef = React.createRef()
  }

  scrollToElement = (id) => {
    this.refs[id].getRef()


  }


  render() {

    return(
      <div >
        <div className={styles.results} ref={this.listRef}>
        <SortBar 
              sortByDistance={this.props.sortByDistance} 
              sortByAlphabet={this.props.sortByAlphabet} 
              haveCoords={this.props.haveCoords}
            />
          { this.props.data.map((org, i) => <OrganizationCard key={org.id} ref={org.id} cardClick={this.props.cardClick} organization={org} haveCoords={this.props.haveCoords} currentPos={this.props.currentPos}/> ) }
        </div>

      </div>
    );

  }
}

export default ResultList;

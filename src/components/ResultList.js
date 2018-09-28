import React, { Component } from 'react';
import OrganizationCard from './OrganizationCard';

import styles from './ResultList.module.css';


export class ResultList extends Component {

  scrollToElement = id => {
    React.Children.forEach(this.props.children,
      child => { 
        console.log(child)
      })
  }

  render() {
    return(
      <div>
        <div className={styles.results}>

          { this.props.data.map(org => <OrganizationCard key={org.id} cardClick={this.props.cardClick} organization={org} haveCoords={this.props.haveCoords} currentPos={this.props.currentPos}/> ) }
          </div>

      </div>
    );
  }
}

export default ResultList;

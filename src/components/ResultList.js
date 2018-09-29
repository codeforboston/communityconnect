import React, { Component } from 'react';
import OrganizationCard from './OrganizationCard';

import styles from './ResultList.module.css';


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

          { this.props.data.map((org, i) => <OrganizationCard key={org.id} ref={i} cardClick={this.props.cardClick} organization={org} haveCoords={this.props.haveCoords} currentPos={this.props.currentPos}/> ) }
        </div>

      </div>
    );

  }
}

export default ResultList;

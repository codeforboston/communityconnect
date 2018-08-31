import React, { Component } from 'react';
import OrganizationCard from './OrganizationCard';

import styles from './ResultList.module.css';

export class ResultList extends Component {
  render() {
    return(
      <div className={styles.results}>
        { this.props.data.map(org => <OrganizationCard key={org.id} organization={org} /> ) }
      </div>
    );
  }
}

export default ResultList;

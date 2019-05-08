import React, {Component} from 'react';

import ResultList from './ResultList';
import OrganizationMap from './OrganizationMap';
import styles from './MapPage.module.css';
import { SplitScreenSlidingPane } from './SplitScreenSlidingPane';


class MapPage extends Component {
 render() {
    return (
        <div id={styles.container}>
          <SplitScreenSlidingPane>
              <ResultList
                ref={instance => { this.resultListItem = instance }}
                cardClick={this.cardClick}
                currentPos={this.props.currentPosition}
                fullWidth={true}
              />
          </SplitScreenSlidingPane>
          <div className={styles.staticPane}>
              <OrganizationMap
                center={this.props.currentPosition ? this.props.currentPosition.coordinates : null}
              />
          </div>
        </div>
    );
 }
}

export default MapPage;

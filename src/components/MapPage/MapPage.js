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
                className="print"
                ref={instance => { this.resultListItem = instance }}
                cardClick={this.cardClick}
                currentPos={this.props.currentPosition}
                fullWidth={true}
              />
          </SplitScreenSlidingPane>
          <div id="map" className={styles.staticPane}>
              <OrganizationMap/>
          </div>
        </div>
    );
 }
}

export default MapPage;

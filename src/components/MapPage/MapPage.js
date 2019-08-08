import React, { Component } from 'react';

import cx from 'classnames';
import ResultList from './ResultList';
import OrganizationMap from './OrganizationMap';
import { SplitScreenSlidingPane } from './SplitScreenSlidingPane';

class MapPage extends Component {
  render() {
    const mapClassName = cx('map-container');
    return (
      <div className={mapClassName}>
        <SplitScreenSlidingPane>
          <ResultList
            ref={(instance) => {
              this.resultListItem = instance;
            }}
            cardClick={this.cardClick}
            currentPos={this.props.currentPosition}
            fullWidth
          />
        </SplitScreenSlidingPane>
        <div className="static-pane">
          <OrganizationMap />
        </div>
      </div>
    );
  }
}

export default MapPage;

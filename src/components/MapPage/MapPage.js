import React from 'react';
import PropTypes from 'prop-types';

import ResultList from './Map/ResultList';
import OrganizationMap from './Map/OrganizationMap';
import styles from './MapPage.module.css';
import {SplitScreenSlidingPane} from '../SlidingPane/SplitScreenSlidingPane';


const MapPage = ({currentPosition}) => {
  return (
    <div id={styles.container}>
      <SplitScreenSlidingPane>
        <ResultList
          ref={(instance) => {
            this.resultListItem = instance;
          }}
          cardClick={this.cardClick}
          currentPos={currentPosition}
          fullWidth={true}
        />
      </SplitScreenSlidingPane>
      <div className={styles.staticPane}>
        <OrganizationMap
          center={currentPosition ? currentPosition.coordinates : null}
        />
      </div>
    </div>
  );
};

MapPage.propTypes = {
  currentPosition: PropTypes.shape({
    coordinates: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  }),
};

export default MapPage;

import React, { Component } from 'react';

import ResultList from './Map/ResultList';
import OrganizationMap from './Map/OrganizationMap';
import styles from './MapPage.module.css';
import { SplitScreenSlidingPane } from '../SlidingPane/SplitScreenSlidingPane';


class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: {}
    }
  }

  getLocation = () => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            position: {
              coordinates: {
                lat: parseFloat(position.coords.latitude),
                lng: parseFloat(position.coords.longitude)
              }
            }
          })
        },
        error => {
        });
    } else {
    }
  }
  componentDidMount() {
    this.getLocation();
  }
  render() {
    return (
        <div id={styles.container}>
          <SplitScreenSlidingPane>
              <ResultList
                routerLocation={this.props.location}
                ref={instance => { this.resultListItem = instance }}
                cardClick={this.cardClick}
                currentPos={this.state.position}
                fullWidth={true}
              />
          </SplitScreenSlidingPane>
          <div className={styles.staticPane}>
              <OrganizationMap
                routerLocation={this.props.location}
                center={this.state.position ? this.state.position.coordinates : null}
                scrollToElement={this.scrollToElement}
                ref={instance => { this.mapItem = instance }}
              />
          </div>
        </div>
    );
  }
}

export default AdminPage;

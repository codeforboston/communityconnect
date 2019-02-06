import React, { Component } from 'react';

import ResultList from './Map/ResultList';
import OrganizationMap from './Map/OrganizationMap';
import styles from './MapPage.module.css';
import { SplitScreenSlidingPane } from '../SlidingPane/SplitScreenSlidingPane';


class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardClickedIndex: null,
      isSavedResourcePaneOpen: false,
    }
    this.toggleSavedResourcesPane = this.toggleSavedResourcesPane.bind(this);
    this.orderResources = this.orderResources.bind(this);
    this.uploadResources = this.uploadResources.bind(this);
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

  //Remove deep linking until more details are made
  /* cardClick = (index) => {
     this.props.history.push({
       pathname: '/',
       search: '?id=' + index
     });
     this.mapItem.setOpenMarker(index);
   }*/


  scrollToElement = index => {
    this.resultListItem.scrollToElement(index);
  }

  toggleSavedResourcesPane = () => {
    this.setState({
      isSavedResourcePaneOpen: !this.state.isSavedResourcePaneOpen
    });
  }

  orderResources = (sourceIndex, destinationIndex) => {
    let savedResources = this.state.savedResources.slice();

    let movedResource = savedResources[sourceIndex];
    savedResources.splice(sourceIndex, 1);
    savedResources.splice(destinationIndex, 0, movedResource);

    this.setState({
      savedResources: savedResources,
    })
  }

  uploadResources = (resources) => {
    this.setState({
      savedResources: resources.slice(),
    })
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

export default Homepage;

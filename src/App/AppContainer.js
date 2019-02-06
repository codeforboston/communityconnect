import React, { Component } from 'react';
import { Route } from 'react-router';

import Header from '../components/Header/Header';
import MapPage from '../components/MapPage/MapPage';
import HomePage from '../components/HomePage/HomePage';
import {SplitScreenTogglePane} from '../components/SlidingPane/SplitScreenSlidingPane';
import ShoppingCart from '../components/SavedResources/ShoppingCart';
import styles from './App.module.css';


class AppContainer extends Component {
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
      <div className={styles.viewport}>
        <div className={styles.header}>
          <Header
            toggleSavedResourcesPane={this.toggleSavedResourcesPane}
          />
        </div>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/map' component={MapPage} />
            <SplitScreenTogglePane isOpen={this.state.isSavedResourcePaneOpen}>
            <ShoppingCart
              reOrder={this.orderResources}
              addItem={this.saveResource}
              removeItem={this.removeResource}
              uploadItems={this.uploadResources}>
            </ShoppingCart>
          </SplitScreenTogglePane>
      </div>
    );
  }
}

export default AppContainer;

import React, { Component } from 'react';
import { Route } from 'react-router';

import Header from '../components/Header/Header';
import MapPage from '../components/MapPage/MapPage';
import AdminPage from '../components/AdminPage/AdminPage';
import {SplitScreenTogglePane} from '../components/SlidingPane/SplitScreenSlidingPane';
import ShoppingCart from '../components/SavedResources/ShoppingCart';
import styles from './App.module.css';


class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isSavedResourcePaneOpen: false,
    }
    this.toggleSavedResourcesPane = this.toggleSavedResourcesPane.bind(this);
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

  toggleSavedResourcesPane = () => {
    this.setState({
      isSavedResourcePaneOpen: !this.state.isSavedResourcePaneOpen
    });
  }

  render() {
    return (
      <div className={styles.viewport}>
        <div className={styles.header}>
          <Header
            toggleSavedResourcesPane={this.toggleSavedResourcesPane}
          />
        </div>
            <Route exact path='/admin' component={AdminPage} />
            <Route exact path='/' component={MapPage} />
            <SplitScreenTogglePane isOpen={this.state.isSavedResourcePaneOpen} className={styles.togglePane}>
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

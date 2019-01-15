import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import Header from '../components/Header/Header';
import CategoryList from '../components/CategoryList';
import ResultList from '../components/ResultList';
import CardGrid from '../components/CardGrid';
import Map from '../components/Map/Map';
import { callSheets } from '../data/sheetLoadingHelpers';
import styles from './App.module.css';
import { SplitScreenSlidingPane, SplitScreenTogglePane } from '../components/SlidingPane/SplitScreenSlidingPane.js';
import ShoppingCart from '../components/ShoppingCart';


class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgs: [],
      categories: [],
      tags: [],
      haveCoords: false,
      locationAddressHashTable: [],
      cardClickedIndex: null,
      isSavedResourcePaneOpen: false,
      data: []
    }
    this.callSheets = callSheets.bind(this);
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
          this.setState({ haveCoords: true })
        },
        error => {
          this.setState({ haveCoords: false })
        });
    } else {
      this.setState({ haveCoords: false })
    }
  }
  componentDidMount() {
    this.callSheets("");
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
      <div className={styles.viewport}>
        <div className={styles.header}>
          <Header
            toggleSavedResourcesPane={this.toggleSavedResourcesPane}
          />
        </div>
        <div id={styles.container}>
          <SplitScreenSlidingPane>
            <Route exact path='/' component={CategoryList} />
            <Route path='/map' render={props => (
              <ResultList
                routerLocation={props.location}
                ref={instance => { this.resultListItem = instance }}
                cardClick={this.cardClick}
                currentPos={this.state.position}
                fullWidth={true}
              />
            )} />
          </SplitScreenSlidingPane>
          <div className={styles.staticPane}>
            <Route exact path='/' render={props => (
              <CardGrid
                routerLocation={props.location}
                currentPos={this.state.position}
              />
            )} />
            <Route path='/map' render={props => (
              <Map
                routerLocation={props.location}
                center={this.state.position ? this.state.position.coordinates : null}
                organizations={this.state.orgs}
                scrollToElement={this.scrollToElement}
                ref={instance => { this.mapItem = instance }}
                locationAddressHashTable={this.state.locationAddressHashTable}
              />
            )} />
          </div>
          <SplitScreenTogglePane isOpen={this.state.isSavedResourcePaneOpen}>
            <ShoppingCart
              reOrder={this.orderResources}
              addItem={this.saveResource}
              removeItem={this.removeResource}
              uploadItems={this.uploadResources}>
            </ShoppingCart>
          </SplitScreenTogglePane>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    resource: state.savedResource.length > 0 ? state.savedResource : state.resource
  }
}

export default connect(mapStateToProps)(Homepage)
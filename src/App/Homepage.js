import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import Header from '../components/Header/Header';
import ResultList from '../components/ResultList';
import Map from '../components/Map/Map';
import { callSheets } from '../data/sheetLoadingHelpers';
import * as resourceAction from '../action/resourceDataAction';
import styles from './App.module.css';
import { Route } from 'react-router';
import { SplitScreenSlidingPane, SplitScreenTogglePane } from '../components/SlidingPane/SplitScreenSlidingPane.js';
import ShoppingCart from '../components/ShoppingCart';
import {connect} from 'react-redux';

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
      savedResources: [],
      resourceData: Object.assign({}, this.props.resourceData)
    }
    this.props.actions.loadResources();
    this.callSheets = callSheets.bind(this);
    this.toggleSavedResourcesPane = this.toggleSavedResourcesPane.bind(this);
    this.orderResources = this.orderResources.bind(this);
    this.saveResource = this.saveResource.bind(this);
    this.removeResource = this.removeResource.bind(this);
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
    this.getLocation();
    console.log("Homepage data: ", this.props.resource);
  }

  cardClick = (index) => {
    this.props.history.push({
      pathname: '/',
      search: '?id=' + index
    });
    this.mapItem.setOpenMarker(index);
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

  saveResource = (resource) => {
    let savedResources = null;
    if(!this.state.savedResources.some(r => r.id === resource.id)) {
      savedResources = this.state.savedResources.slice();
      savedResources.push(resource);
      this.setState({
        savedResources: savedResources,
      })
    }
  }

  removeResource = (resource) => {
    let savedResources = null;
    if(this.state.savedResources.some(r => r.id === resource.id)){
      savedResources = this.state.savedResources.slice();
      savedResources.splice(savedResources.indexOf(resource), 1);
    }
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
            categories={this.state.categories}
            handleEvent={this.callSheets}
            handleFilter={this.callSheets}
            toggleSavedResourcesPane={this.toggleSavedResourcesPane}
          />
        </div>
        <div id={styles.container}>
          <SplitScreenSlidingPane>
            <Route path='/' render={props => (
              <ResultList
                routerLocation = {props.location}
                haveCoords={this.state.haveCoords}
                ref={instance => { this.resultListItem = instance }}
                cardClick={this.cardClick}
                data={this.state.orgs}
                currentPos={this.state.position}
                saveItem={this.saveResource}
                fullWidth={true}
              />
            )} />
          </SplitScreenSlidingPane>
          <div className={styles.staticPane}>
            <Route path='/' render={props => (
              <Map
                routerLocation = {props.location}
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
              data={this.state.savedResources}
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
    resource: state.resource
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(resourceAction, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
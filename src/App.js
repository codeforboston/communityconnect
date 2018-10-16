import React, { Component } from 'react';
import Header from './components/Header/Header';
import { SplitScreen } from './components/SplitScreen';
import ResultList from './components/ResultList';
import Map from './components/Map/Map';
import { callSheets } from './data/sheetLoadingHelpers.js';
import ShoppingCart from './components/ShoppingCart';
import SortBar from './components/SortBar.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgs: [],
      categories: [],
      tags: [],
      haveCoords: false,
      isSavedResourcePaneOpen: false,
      savedResources: [],
    }
    this.callSheets = callSheets.bind(this);
    this.toggleSavedResourcesPane = this.toggleSavedResourcesPane.bind(this);
    this.saveResource = this.saveResource.bind(this);
    this.removeResource = this.removeResource.bind(this);
  }

  getLocation = () => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position)
          this.setState({ 
            position : {
              coordinates : {
                lat: parseFloat(position.coords.latitude), 
                lng: parseFloat(position.coords.longitude)
              }
            }
          })
          this.setState({haveCoords : true})
        },
        error => {
          console.log('Unable to get Coordinates');
          this.setState({ haveCoords: false })
        });
    } else {
      console.log('no geolocation');
      this.setState({haveCoords: false})
    }
  }

  componentDidMount() {
    this.callSheets("");
    this.getLocation();
  }

  cardClick = (id) => {
    this.mapItem.setOpenMarker(id);
  }

  clickedMarker = id => {
    this.resultListItem.scrollToElement(id);
  }

  toggleSavedResourcesPane = () => {
    this.setState({
      isSavedResourcePaneOpen: !this.state.isSavedResourcePaneOpen
    });
  }

  saveResource = (resource) => {
    let savedResources = null;
    if(!this.state.savedResources.includes(resource)){
      savedResources = this.state.savedResources.slice();
      savedResources.push(resource);
      this.setState({
        savedResources: savedResources,
      })
    }
  }

  removeResource = (resource) => {
    let savedResources = null;
    if(this.state.savedResources.includes(resource)){
      savedResources = this.state.savedResources.slice();
      savedResources.splice(savedResources.indexOf(resource, 1));
    }
    this.setState({
      savedResources: savedResources,
    })
  }

  render() {
    const navbarHeight = 56;

    let map = 
      <Map
        center={this.state.position ? this.state.position.coordinates : null}
        organizations={this.state.orgs}
        clickedMarker={this.clickedMarker}
        ref={instance => { this.mapItem = instance }}
      />

    return (
      <div>
        <Header 
          categories={this.state.categories} 
          handleEvent={this.callSheets} 
          handleFilter={this.callSheets}
          toggleSavedResourcesPane={this.toggleSavedResourcesPane}
        />
        <SplitScreen style={{ top: navbarHeight }}>
          <SplitScreen.StaticPane>
            {map}
          </SplitScreen.StaticPane>
          <SplitScreen.SlidingPane>
            <ResultList
              haveCoords={this.state.haveCoords} 
              ref={instance => { this.resultListItem = instance }} 
              cardClick={this.cardClick} 
              data={this.state.orgs} 
              haveCoords={this.state.haveCoords} 
              currentPos={this.state.position}
              fullWidth={false}
              addItem={this.saveResource}
            />
          </SplitScreen.SlidingPane>
          <SplitScreen.TogglePane 
            isOpen={this.state.isSavedResourcePaneOpen}>
            <ShoppingCart 
              instance={instance => { this.resultListItem = instance }} 
              orgs={this.state.savedResources}
              addItem={this.addItem}
              removeItem={this.removeResource}>
            </ShoppingCart>
          </SplitScreen.TogglePane>
        </SplitScreen>
      </div>
    );
  }
}

export default App;

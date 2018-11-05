import React, { Component } from 'react';
import Header from './components/Header/Header';
import { SplitScreen } from './components/SplitScreen';
import ResultList from './components/ResultList';
import Map from './components/Map/Map';
import { callSheets } from './data/sheetLoadingHelpers.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgs: [],
      categories: [],
      tags: [],
      haveCoords: false,
      locationAddressHashTable: []
    }


    this.callSheets = callSheets.bind(this);
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

  cardClick = (index) => {
    this.mapItem.setOpenMarker(index);
  }

  scrollToElement = index => {
    this.resultListItem.scrollToElement(index);
  }

  render() {
    const navbarHeight = 56;

    let map =
      <Map
        center={this.state.position ? this.state.position.coordinates : null}
        organizations={this.state.orgs}
        scrollToElement={this.scrollToElement}
        ref={instance => { this.mapItem = instance }}
        locationAddressHashTable={this.state.locationAddressHashTable}
      />


    return (

      <div>
        <Header
          categories={this.state.categories}
          handleEvent={this.callSheets}
          handleFilter={this.callSheets}
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
            />
          </SplitScreen.SlidingPane>
        </SplitScreen>
      </div>
    );
  }
}

export default App;

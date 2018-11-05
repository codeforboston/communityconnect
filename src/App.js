import React, { Component } from 'react';
import Header from './components/Header/Header';
import ResultList from './components/ResultList';
import Map from './components/Map/Map';
import { callSheets } from './data/sheetLoadingHelpers.js';
import styles from './components/SplitScreen.module.css';
import SplitScreenSlidingPane from './components/SplitScreenSlidingPane.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgs: [],
      categories: [],
      tags: [],
      haveCoords: false
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

  cardClick = (id) => {
    this.mapItem.setOpenMarker(id);
  }

  clickedMarker = id => {
    this.resultListItem.scrollToElement(id);
  }

  render() {
    const navbarHeight = 56;

    let map =
      <Map
        center={this.state.position ? this.state.position.coordinates : null}
        organizations={this.state.orgs}
        clickedMarker={this.clickedMarker}
      />

    return (
      <div className={styles.viewport} >
        <div className={styles.header}>
        <Header
          categories={this.state.categories}
          handleEvent={this.callSheets}
          handleFilter={this.callSheets}
        />
        </div>
        <div id={styles.container}>
          <SplitScreenSlidingPane>
            <ResultList
              haveCoords={this.state.haveCoords}
              ref={instance => { this.resultListItem = instance }}
              cardClick={this.cardClick}
              data={this.state.orgs}
              haveCoords={this.state.haveCoords}
              currentPos={this.state.position}
            />
          </SplitScreenSlidingPane>
          <div className={styles.staticPane}>{map}</div>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import queryString from 'query-string'

import Header from '../components/Header/Header';
import ResultList from '../components/ResultList';
import Map from '../components/Map/Map';
import { callSheets } from '../data/sheetLoadingHelpers';
import styles from './App.module.css';
import { Route } from 'react-router';
import SplitScreenSlidingPane from '../components/SlidingPane/SplitScreenSlidingPane.js';

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

        isBostonVisible: false,
      isWalkArlingtonVisible: false,
      isWalkCharlesTownVisible: false,
        isWalkRevereVisible: false
    }

    this.callSheets = callSheets.bind(this);
    console.log("Homepage props: ", this.props);
  }

  getLocation = () => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position)
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
          console.log('Unable to get Coordinates');
          this.setState({ haveCoords: false })
        });
    } else {
      console.log('no geolocation');
      this.setState({ haveCoords: false })
    }
  }

  componentDidMount() {
    const orgId = queryString.parse(this.props.location.search);
    this.callSheets("");
    this.getLocation();
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

    handleWalkWayClick = (value) => {
      if(value === "chelsea"){
        this.setState((prevState) => {
            return ({isChelseaVisible : !prevState.isChelseaVisible})
        })
      }

      if(value === "arlington"){
          this.setState((prevState) =>{
              return ({isWalkArlingtonVisible : !prevState.isWalkArlingtonVisible})
          })
      }

      if(value === "charlestown"){
          this.setState((prevState) => {
              return ({isWalkCharlesTownVisible : !prevState.isWalkCharlesTownVisible})
          })
      }

        if(value === "revere"){
            this.setState((prevState) => {
                return ({isWalkRevereVisible : !prevState.isWalkRevereVisible})
            })
        }
    }

  render() {

    const navbarHeight = 56;

    return (
      <div className={styles.viewport}>
        <div className={styles.header}>
          <Header
            categories={this.state.categories}
            handleEvent={this.callSheets}
            handleFilter={this.callSheets}
            handleWalkWayClick={this.handleWalkWayClick}
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
                haveCoords={this.state.haveCoords}
                currentPos={this.state.position}
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
                isBostonVisible={this.state.isBostonVisible}
                isWalkArlingtonVisible={this.state.isWalkArlingtonVisible}
                isWalkCharlesTownVisible={this.state.isWalkCharlesTownVisible}
                isWalkRevereVisible={this.state.isWalkRevereVisible}
              />
            )} />
          </div>
        </div>
        )} />
      </div>
    );
  }
}


export default Homepage;

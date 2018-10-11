import React, { Component } from 'react';

import Tabletop from 'tabletop';

import Header from './components/Header';
import { SplitScreen } from './components/SplitScreen';
import ResultList from './components/ResultList';
import Map from './components/Map';
import SortBar from './components/SortBar.js';
import {getDistance} from './utils/distance.js';
import {find_in_object, update_criteria, criteria_list} from './utils/FilterHelper.js';

const defaultZoom = 6;
const defaultCenter = { lat: 42.3731, lng: -71.0162 };


function normalizeHeaders(element) {
  element["name"] = element["name"];
  element["id"] = element["rowNumber"];
  element["tags"] = String(element["serviceprovided"]).split(", ");
  element["twitterUrl"] = element["twitterurl"];
  element["facebookUrl"] = element["facebookurl"];
  element["instagramUrl"] = element["instagramurl"];
  if (element["latitude"] && element["longitude"]) {
    element["coordinates"] = { lat: parseFloat(element["latitude"]), lng: parseFloat(element["longitude"]) }
  }

  if (element.city || element.address || element.state || element.zipcode) {
    // element.location = element.address+ " " + element.city + ", " + element.state + " " + element.zipcode;
    element.location = element["combinedaddress"];
  } else {
    element.location = "";
  }

}


var filter_criteria_list = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgs: [],
      categories: [],
      tags: [],
      center: defaultCenter,
      zoom: defaultZoom,
      haveCoords: false
    }
    this.callSheets = this.callSheets.bind(this);
    this.sortByDistance = this.sortByDistance.bind(this);
    this.getCloserResource = this.getCloserResource.bind(this);
  }

  callSheets(selected) {
    var revere_key = '1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA';
    Tabletop.init({
      key: revere_key,
      simpleSheet: true,
      prettyColumnNames: false,
      postProcess: normalizeHeaders,
      callback: (_data, tabletop) => {
        const categories = {};
        const tags = {};
        var data = tabletop.sheets("Data").elements;

        for(let project of data) {
          let category = project.categoryautosortscript.split(',');
          category.forEach(cat => categories[cat] = cat.trim());
          for(let tag of project.tags) { tags[tag] = "" };
        }
        const categoryList = [...(new Set(Object.values(categories)))];

        filter_criteria_list = update_criteria(selected, filter_criteria_list);
        var my_json = JSON.stringify(data);
        var filtered_json = filter_criteria_list.length <= 1 ? data : find_in_object(JSON.parse(my_json), {categoryautosortscript : filter_criteria_list});

        filtered_json = filtered_json.filter(function(org){ return org.truefalsevetting === 'TRUE' });

        this.setState({
          orgs: filtered_json,
          categories: categoryList,
          tags: Object.keys(tags)
        });

        this.sortByAlphabet()


      }
    });
  }

  getLocation = () => {
    if(window.navigator.geolocation){
      window.navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position)

          this.setState({position : {coordinates : {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)}}})
          this.setState({haveCoords : true})
        },
        error => {
          console.log('Unable to get Coordinates');
          this.setState({haveCoords: false})
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

  onMouseEnter = (key) => {
    this.setState({
      hoveredItem: key
    });
  }

  onMouseLeave = () => {
    this.setState({
      hoveredItem: ''
    });
  }

  getCloserResource = (a , b) => {
    if(getDistance(a,this.state.position)
    > getDistance(b,this.state.position)){
      return 1;
    }

    return -1;
  }

  getCloserName = (a, b) => {
    if(a.organizationname > b.organizationname) return 1
    else if(a.organizationname < b.organizationname ) return -1
    else return 0

  }

  sortByAlphabet = () => {

    this.setState({orgs:
      this.state.orgs.sort(this.getCloserName)})
  }

  sortByDistance = () => {
    console.log(this.state.orgs);
    this.setState({orgs:
      this.state.orgs.sort(this.getCloserResource)
    });

  }

  onOrganizationClick = (longitude, latitude, organizationZoom) => {
    this.setState({
      center: [longitude, latitude],
      zoom: [organizationZoom]
    });
  }

  render() {
    const navbarHeight = 56;

    let map = 
      <Map
        center={this.state.haveCoords ? this.state.position.coordinates : this.state.center}
        zoom={this.state.zoom}
        organizations={this.state.orgs}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onOrganizationClick={this.onOrganizationClick}
      />

    return (
      <div>
        <Header 
          categories={this.state.categories} 
          handleEvent={this.callSheets} 
        />
        <SplitScreen style={{ top: navbarHeight }}>
          <SplitScreen.StaticPane>
            {map}
          </SplitScreen.StaticPane>
          <SplitScreen.SlidingPane>
            <SortBar 
              sortByDistance={this.sortByDistance} 
              sortByAlphabet={this.sortByAlphabet} 
              haveCoords={this.state.haveCoords}
            />
            <ResultList 
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

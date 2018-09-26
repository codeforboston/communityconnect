import React, { Component } from 'react';

import Tabletop from 'tabletop';

import Header from './components/Header';
import { SplitScreen } from './components/SplitScreen';
import ResultList from './components/ResultList';
import Map from './components/Map';

const defaultZoom = 6;
const defaultCenter = { lat: 42.3731, lng: -71.0162 };

function normalizeHeaders(element) {
  element["name"] = element["organizationname"];
  element["id"] = element["rowNumber"];
  element["tags"] = String(element["tags"]).split(", ");
  element["twitterUrl"] = element["twitterurl"];
  element["facebookUrl"] = element["facebookurl"];
  element["instagramUrl"] = element["instagramurl"];
  element["open"] = coerceToBool(element["open"]);
  if (element["latitude"] && element["longitude"]) {
    element["coordinates"] = { lat: parseFloat(element["latitude"]), lng: parseFloat(element["longitude"]) }
  }

  if (element.city || element.address || element.state || element.zipcode) {
    element.location = element.address+ " " + element.city + ", " + element.state + " " + element.zipcode;
  } else {
    element.location = "";
  }

}

function coerceToBool(obj) {
  return String(obj).toLowerCase() === "TRUE";
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgs: [],
      categories: [],
      tags: [],
      center: defaultCenter,
      zoom: defaultZoom,
    }
    this.callSheets = this.callSheets.bind(this);
  }

  find_in_object(my_object, my_criteria) {

    return my_object.filter(function (obj) {
      return Object.keys(my_criteria).every(function (c) {
        return obj[c] == my_criteria[c];
      });
    });

  }

  callSheets(selected) {
    var revere_key = '108aVfUjdRr_je1Pzx-axkOZTMMtdug7iyVH1m3BsnRw'
    var shelter_key = '1D0-5_phzq-mrXojcIgQlsNrUr0hGH8gWYRZlTMcLacM';
    Tabletop.init({
      key: revere_key,
      simpleSheet: true,
      prettyColumnNames: false,
      postProcess: normalizeHeaders,
      callback: (data) => {
        const categories = {};
        const tags = {};

        for (let project of data) {
          categories[project.category] = "";
          for (let tag of project.tags) { tags[tag] = "" };
        }

        var my_json = JSON.stringify(data);
        if(selected == "" || selected == "All")
          var filtered_json = data;
        else
          var filtered_json = this.find_in_object(JSON.parse(my_json), { category: selected });

        this.setState({
          orgs: filtered_json,
          categories: Object.keys(categories),
          tags: Object.keys(tags)
        });
      }
    });
  }
  componentDidMount() {
    this.callSheets("");
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


  onOrganizationClick = (key) => {
    const org = this.state.orgs.find(o => o.id == key);

    this.setState({
      center: [org.longitude, org.latitude],
      zoom: [11]
    });
  }

  render() {
    return (
      <div>
        <Header categories={this.state.categories} handleEvent={this.callSheets} />
        <SplitScreen style={{ top: 56 }}>
          <SplitScreen.StaticPane>
            <Map
              center={this.state.center}
              zoom={this.state.zoom}
              organizations={this.state.orgs}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              onOrganizationClick={this.onOrganizationClick}
            />
          </SplitScreen.StaticPane>
          <SplitScreen.SlidingPane>
            <ResultList data={this.state.orgs} />
          </SplitScreen.SlidingPane>
        </SplitScreen>
      </div>
    );
  }
}

export default App;

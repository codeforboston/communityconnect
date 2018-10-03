import React, { Component } from 'react';

import Tabletop from 'tabletop';

import Header from './components/Header';
import { SplitScreen } from './components/SplitScreen';
import ResultList from './components/ResultList';
import Map from './components/Map';
import SortBar from './components/SortBar.js';
import {getDistance} from './utils/distance.js';

const defaultZoom = 6;
const defaultCenter = { lat: 42.3731, lng: -71.0162 };


var category_obj = {};
var category_list = [];

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


      find_in_object(my_object, my_criteria) {
    /*  my_object.filter(o => Object.keys(my_criteria)
        .every(k => my_criteria[k]
          .some(f => o[k] === f)));*/
      return my_object.filter(function (o) {
          return Object.keys(my_criteria).every(function (k){
            return my_criteria[k].some(function (f) {
              return o[k] === f;
            });
          });
        });

      }


  filter_category_by(cat_item){
    console.log(category_list.includes(cat_item))
    category_list.includes(cat_item) ?  category_list.filter( item => item !== cat_item) : category_list.push(cat_item);
    Object.assign(category_obj, {categoryautosortscript : category_list});
    console.log(category_list);
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

        var my_json = JSON.stringify(data);
        if(selected == "" || selected == "All")
          var filtered_json = data;
        else
          this.filter_category_by(selected);
          var filtered_json = this.find_in_object(JSON.parse(my_json), category_obj);

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

  getLocation =  () => {
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
    //console.log(this);
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


  onOrganizationClick = (key) => {
    const org = this.state.orgs.find(o => o.id == key);

    this.setState({
      center: [org.longitude, org.latitude],
      zoom: [11]
    });
  }

  render() {
    let map;

    if(this.state.haveCoords === false){
     map = <Map
       center={this.state.center}
       zoom={this.state.zoom}
       organizations={this.state.orgs}
       onMouseEnter={this.onMouseEnter}
       onMouseLeave={this.onMouseLeave}
       onOrganizationClick={this.onOrganizationClick}
     />
   } else if(this.state.haveCoords === true){
     map = <Map
       center={this.state.position.coordinates}
       zoom={this.state.zoom}
       organizations={this.state.orgs}
       onMouseEnter={this.onMouseEnter}
       onMouseLeave={this.onMouseLeave}
       onOrganizationClick={this.onOrganizationClick}
     />
   }

    return (
      <div>
        <Header categories={this.state.categories} handleEvent={this.callSheets} />
        <SplitScreen style={{ top: 56 }}>
          <SplitScreen.StaticPane>

              {map}
          </SplitScreen.StaticPane>
          <SplitScreen.SlidingPane>
              <SortBar sortByDistance={this.sortByDistance} sortByAlphabet={this.sortByAlphabet} haveCoords={this.state.haveCoords}/>
              <ResultList data={this.state.orgs} haveCoords={this.state.haveCoords} currentPos={this.state.position}/>
          </SplitScreen.SlidingPane>
        </SplitScreen>
      </div>
    );
  }
}

export default App;

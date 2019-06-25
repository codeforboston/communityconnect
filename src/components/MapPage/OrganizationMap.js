import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from './Map';

const googleMapKey = 'AIzaSyAwKdrqS2GfCt9b2K1wAopDc9Ga0N1BVUM';
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&v=3.exp&libraries=geometry,drawing,places`;

class OrganizationMap extends Component {

  markerHover = (key, event) => {
    event.map.getCanvas().style.cursor = 'pointer';
    this.setState({
      hoveredItem: key
    });
  }

  markerEndHover = (key, event) => {
    event.map.getCanvas().style.cursor = '';
    this.setState({
      hoveredItem: ''
    });
  }

  render() {
    return (
      <Map
        googleMapURL={googleMapURL}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        loadingElement={<div style={{ height: `100%` }} />}
        resource={this.props.mapResource}
      />
    );
  }
}

function mapStateToProps(state) {
  let currentResource = state.savedResource.length > 0 ? state.savedResource : state.resource;
  var locationArray = [];
  currentResource.forEach(function (resource) {
    if (!locationArray[resource.hashCoordinates]) {
      locationArray[resource.hashCoordinates] = {
        coordinates: resource.coordinates,
        groupedResource: [],
        showInfo: false
      }
    }
    locationArray[resource.hashCoordinates].groupedResource.push(resource);
  });
  let resource = Object.values(locationArray);
  return {
    mapResource: resource
  }
}
export default connect(mapStateToProps)(OrganizationMap)

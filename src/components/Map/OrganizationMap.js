import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from './Map';

const googleMapKey = 'AIzaSyAwKdrqS2GfCt9b2K1wAopDc9Ga0N1BVUM';
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&v=3.exp&libraries=geometry,drawing,places`;

const defaultZoom = 12;
const defaultCenter = { lat: 42.3731, lng: -71.0162 };

class OrganizationMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      center: this.props.center ? this.props.center : defaultCenter,
      zoom: defaultZoom
    }
  }


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

  onOrganizationClick = (key, event) => {
    const organizationZoom = 11;
    const org = this.props.organizations.find(o => o.id === key);

    this.setState({
      center: [org.position.longitude, org.position.latitude],
      zoom: [organizationZoom]
    });
  }

  setOpenMarker = index => {

    Object.entries(this.props.locationAddressHashTable).forEach(([index2, orgRef]) => {

      for (var i of orgRef.orgs) {
        if (Number(i) !== index && orgRef.isOpen) {
          orgRef.isOpen = false;
        }

        if (Number(i) === index) {
          orgRef.isOpen = true
          this.setState({
            center: this.props.organizations[orgRef.orgs[0]].coordinates,
            zoom: 17,
          });
          break;
        }
      }

    });
    this.forceUpdate();
  }

  onZoomChanged = ref => {

    this.setState({
      zoom: this.mapReference.getZoom()
    })

  }

  mapRef = ref => {
    this.mapReference = ref
  }

  render() {
    return (
      <Map
        mapRef={this.mapRef}
        onZoomChanged={this.onZoomChanged}
        scrollToElement={this.props.scrollToElement}
        setOpenMarker={this.setOpenMarker}
        googleMapURL={googleMapURL}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        loadingElement={<div style={{ height: `100%` }} />}
        zoom={this.state.zoom}
        center={this.state.center}
        resource={this.props.mapResource}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
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

import React, { Component, Props } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import OrganizationMarker from './OrganizationMarker';
import styles from './Map.module.css';

const googleMapKey = 'AIzaSyAwKdrqS2GfCt9b2K1wAopDc9Ga0N1BVUM';
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&v=3.exp&libraries=geometry,drawing,places`;

const organizationLayout = {
  'icon-image': 'nature'
};

const mapStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

const Map = withScriptjs(withGoogleMap(props => (

  <GoogleMap
    ref={props.onMapLoad}
    {...props}
    ref={props.mapRef}
  >
    <MarkerClusterer
      averageCenter={true}
      enableRetinaIcons={true}
      gridSize={60}
      ref={props.onMarkerClick}
    >
      () => {
        props.organizations.filter(org => org.coordinates).map(org =>
          <OrganizationMarker
            handleClick={props.clickedMarker}
            setOpenMarker={props.setOpenMarker}
            key={org.id}
            id={org.id}
            organization={org}
            open={org.isMarkerOpen}
          />
        )}
      )
    }
    </MarkerClusterer>
  </GoogleMap>
)));

const defaultZoom = 12;
const defaultCenter = { lat: 42.3731, lng: -71.0162 };

class OrganizationMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      center: this.props.center ? this.props.center : defaultCenter,
      zoom: defaultZoom,
    }
    console.log(this.state)
  }

  handleClick = (e) => {
    console.log(e.currentTarget)
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
    const org = this.props.organizations.find(o => o.id == key);

    this.setState({
      center: [org.position.longitude, org.position.latitude],
      zoom: [organizationZoom]
    });
  }

  clickedMarker = id => {

    this.props.clickedMarker(id)
  }

  setOpenMarker = id => {

    this.props.organizations.forEach(org => {

      if (org != org.id && org.isMarkerOpen) {
        org.isMarkerOpen = false
      }

      if (id == org.id) {

        org.isMarkerOpen = true;
        this.setState({
          center: org.coordinates,
          zoom: 17
        })
      }
    });
    this.forceUpdate();
  }

  onZoomChanged = ref => {

    this.setState({
      zoom: this.mapReference.getZoom()
    })

    console.log("Map Zoom", this.mapReference.getZoom())
    console.log("Sate zoom", this.state.zoom)
  }

  mapRef = ref => {
    this.mapReference = ref
  }

  markerClick = event => {
    console.log(event)
  }


  render() {

    return (
      <Map
        onMarkerClick={this.markerClick}
        mapRef={this.mapRef}
        onZoomChanged={this.onZoomChanged}
        clickedMarker={this.clickedMarker}
        setOpenMarker={this.setOpenMarker}
        googleMapURL={googleMapURL}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        loadingElement={<div style={{ height: `100%` }} />}
        zoom={this.state.zoom}
        center={this.state.center}
        organizations={this.props.organizations}
      />
    );
  }
}

export default OrganizationMap;

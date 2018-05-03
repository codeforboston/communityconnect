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

export const Map = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    {...props}
  >
    <MarkerClusterer
        averageCenter={true}
        enableRetinaIcons={true}
        gridSize={60}
    >
      { 
        props.organizations.filter(org => org.coordinates).map(org =>
          <OrganizationMarker
            key={org.id}
            organization={org}
            open={org.showInfo}
          />
        )
      }
    </MarkerClusterer>
  </GoogleMap>
)));

class OrganizationMap extends Component {
  markerHover = (key, event) => {
    event.map.getCanvas().style.cursor = 'pointer';
    this.props.onMouseEnter(key);
  }

  markerEndHover = (key, event) => {
    event.map.getCanvas().style.cursor = '';
    this.props.onMouseLeave();
  }

  onOrganizationClick = (key, event) => {
    this.props.onOrganizationClick(key);
  }

  render() {
      return (
        <Map
          googleMapURL={googleMapURL}
          containerElement={ <div style={{ height: '100%' }} /> }
          mapElement={ <div style={{ height: '100%' }} /> }
          loadingElement={<div style={{ height: `100%` }} />}
          zoom={this.props.zoom}
          center={this.props.center}
          organizations={this.props.organizations}
        />
      );
  }
}

export default OrganizationMap;
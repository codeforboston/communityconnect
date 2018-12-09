import React, { Component, Props } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import OrganizationMarker from './../OrganizationMarker';
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
      defaultMaxZoom={16}
    >
      () = > {
        this.orgMarkers = []
      }

      () => {
        Object.entries(props.locationAddressHashTable).forEach( ([hashIndex,  orgRefs]) => {

          this.orgMarkers.push(<OrganizationMarker
            scrollToElement={props.scrollToElement}
            setOpenMarker={props.setOpenMarker}
            key={hashIndex}
            open={orgRefs.isOpen}
            organizations={props.organizations}
            orgIndexes={orgRefs.orgs}
          />)
        })}

        () => {
          this.orgMarkers
        }


        }
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

  setOpenMarker = index => {

    Object.entries(this.props.locationAddressHashTable).forEach(([index2, orgRef])  => {

      for(var i of orgRef.orgs){
        if(i != index && orgRef.isOpen){
          orgRef.isOpen = false;
        }

        //if(this.props.organizations[orgRef.orgs[0]].coordinates){
          if(i == index){
          orgRef.isOpen = true
          this.setState({
                 center: this.props.organizations[orgRef.orgs[0]].coordinates,
                 zoom: 17,
               });

          break;
        }
      //}



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
        organizations={this.props.organizations}
        locationAddressHashTable={this.props.locationAddressHashTable}
      />
    );
  }
}

export default OrganizationMap;

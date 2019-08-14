import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import { compose, lifecycle } from "recompose";
import OrganizationMarker from "./OrganizationMarker";

const Map = compose(
  lifecycle({
    componentWillMount() {
      this.setState({
        zoomToMarkers: map => {
          const bounds = new window.google.maps.LatLngBounds();

          map.props.children.props.children.forEach(child => {
            bounds.extend(
              new window.google.maps.LatLng(
                child.props.resource.coordinates.lat,
                child.props.resource.coordinates.lng
              )
            );
          });
          map.fitBounds(bounds);
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap {...props} ref={props.zoomToMarkers} defaultZoom={5}>
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
      ref={props.onMarkerClick}
      defaultMaxZoom={16}
    >
      {props.resource
        .filter(resource => resource.coordinates)
        .map((resource, index) => (
          <OrganizationMarker
            key={index}
            open={resource.showInfo}
            resource={resource}
          />
        ))}
    </MarkerClusterer>
  </GoogleMap>
));
export default Map;

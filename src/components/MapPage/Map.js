import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import MarkerClusterer from "@googlemaps/markerclustererplus";
import PropTypes from "prop-types";
import computeInfoWindowContent from "./OrganizationMarker";

class GoogleMapContainer extends Component {
  componentDidMount() {
    // script set up for google maps clusters
    const script = document.createElement("script");

    script.src =
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
    script.async = true;
    document.body.appendChild(script);
  }

  setGoogleMapRef(map, maps) {
    this.googleMapRef = map;
    this.googleRef = maps;

    // only locations with coordinates can be shown
    const validLocations = this.props.resources.filter(
      resource => resource.coordinates
    );

    // set of markers with infowindows
    const markers =
      validLocations &&
      validLocations.map(resource => {
        const marker = new this.googleRef.Marker({
          position: resource.coordinates,
        });

        const infWindowContent = computeInfoWindowContent(resource);

        const infowindow = new this.googleRef.InfoWindow({
          content: infWindowContent,
        });

        // Add the event listeners (need to figure out a better way to do this)
        this.googleRef.event.addListener(infowindow, "domready", () => {
          resource.groupedResources.forEach(subResource => {
            const infoWinId = `infoWindow${subResource.id}`;
            const infWinElement = document.getElementById(infoWinId);

            infWinElement.addEventListener("click", () => {
              const element = document.getElementById(subResource.id);
              element.scrollIntoView();
            });
          });
        });

        marker.addListener("click", () => {
          infowindow.open(this.googleMapRef, marker);
        });

        return marker;
      });

    // Add a marker clusterer to manage the markers.
    const markerCluster = new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      gridSize: 60,
      minimumClusterSize: 2,
      defaultMaxZoom: 16,
    });

    const numMarkers = markerCluster.getTotalMarkers();

    // Fit the bounds to the resources
    if (numMarkers <= 0) {
      return;
    }

    const bounds = new this.googleRef.LatLngBounds();
    const locations = validLocations.map(resource => resource.coordinates);

    locations.forEach(location => {
      bounds.extend(new this.googleRef.LatLng(location));
    });
    map.fitBounds(bounds);
  }

  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: this.props.googleMapKey }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => this.setGoogleMapRef(map, maps)}
        defaultZoom={5}
        options={{ streetViewControl: false }}
        defaultCenter={{ lat: 42.3601, lng: -71.0589 }} // Arbitrary center on Boston (fitbounds makes this irrelevant)
      />
    );
  }
}

GoogleMapContainer.propTypes = {
  googleMapKey: PropTypes.string.isRequired,
  resources: PropTypes.array.isRequired,
};

export default GoogleMapContainer;

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Map from "./Map";

const googleMapKey = "AIzaSyAwKdrqS2GfCt9b2K1wAopDc9Ga0N1BVUM";
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&v=3.exp&libraries=geometry,drawing,places`;

const OrganizationMap = ({ mapResource }) => (
  <Map
    googleMapURL={googleMapURL}
    containerElement={<div style={{ height: "100%" }} />}
    mapElement={<div style={{ height: "100%" }} />}
    loadingElement={<div style={{ height: "100%" }} />}
    resource={mapResource}
  />
);

OrganizationMap.propTypes = {
  mapResource: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const currentResource =
    state.savedResource.length > 0 ? state.savedResource : state.resource;

  const locationArray = [];

  currentResource.forEach(resource => {
    if (!locationArray[resource.hashCoordinates]) {
      locationArray[resource.hashCoordinates] = {
        coordinates: resource.coordinates,
        groupedResource: [],
        showInfo: false
      };
    }

    locationArray[resource.hashCoordinates].groupedResource.push(resource);
  });

  const resource = Object.values(locationArray);

  return {
    mapResource: resource
  };
}

export default connect(mapStateToProps)(OrganizationMap);

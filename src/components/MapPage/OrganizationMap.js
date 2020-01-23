import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Map from "./Map";

const googleMapKey = "AIzaSyAwKdrqS2GfCt9b2K1wAopDc9Ga0N1BVUM";
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&v=3.exp&libraries=geometry,drawing,places`;

const OrganizationMap = ({ mapResources }) => (
  <Map
    googleMapURL={googleMapURL}
    containerElement={<div style={{ height: "100%" }} />}
    mapElement={<div style={{ height: "100%" }} />}
    loadingElement={<div style={{ height: "100%" }} />}
    resources={mapResources}
  />
);

OrganizationMap.propTypes = {
  mapResources: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const currentResources =
    state.savedResources.length > 0 ? state.savedResources : state.resources;

  const locations = {};

  currentResources.forEach(resource => {
    if (!locations[resource.hashCoordinates]) {
      locations[resource.hashCoordinates] = {
        coordinates: resource.coordinates,
        groupedResources: [],
        showInfo: false,
      };
    }

    locations[resource.hashCoordinates].groupedResources.push(resource);
  });

  const resources = Object.values(locations);

  return {
    mapResources: resources,
  };
}

export default connect(mapStateToProps)(OrganizationMap);

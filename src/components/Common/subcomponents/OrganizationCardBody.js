import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrganizationCardBody = ({
  categories,
  distance,
  location,
  directionUrl,
  phone,
  url
}) => (
  <div className="organization-card-body">
    <div className="organization-card-body-subtitle">{categories}</div>
    {distance && (
      <p>
        Distance from your location:
        {distance} miles
      </p>
    )}
    {location && (
      <span>
        <FontAwesomeIcon icon="map-marker-alt" className="text-danger" />{" "}
        <span>{location}</span>
      </span>
    )}
    {directionUrl && (
      <a href={directionUrl} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon="map-marked-alt" /> Get directions
      </a>
    )}
    {url && (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon="external-link-alt" /> Go to website
      </a>
    )}
    {phone && (
      <a
        href={`tel:${phone
          .replace("(", "")
          .replace(")", "")
          .replace(" ", "-")}`}
      >
        <FontAwesomeIcon icon="phone" size="1x" /> {phone}
      </a>
    )}
  </div>
);

OrganizationCardBody.propTypes = {
  categories: PropTypes.string,
  distance: PropTypes.number,
  location: PropTypes.string,
  directionUrl: PropTypes.string,
  url: PropTypes.string,
  phone: PropTypes.string
};

OrganizationCardBody.defaultProps = {
  categories: null,
  distance: null,
  location: null,
  directionUrl: null,
  url: null,
  phone: null
};
export default OrganizationCardBody;

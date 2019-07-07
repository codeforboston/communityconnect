import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const OrganizationCardBody = ({
  categories,
  distance,
  location,
  directionUrl,
  phone,
  url,
  children,
}) => (
  <div className="organization-card-body">
    <div className="organization-card-body-subtitle">{categories}</div>
    {distance && <p>Distance from your location: {distance} miles</p>}
    {location && (
      <div>
        <FontAwesomeIcon icon="map-marker-alt" className="text-danger" />{' '}
        <p>{location}</p>
      </div>
    )}
    {directionUrl && (
      <a href={directionUrl} target="_blank">
        <FontAwesomeIcon icon="map-marked-alt" /> Get directions
      </a>
    )}
    {url && (
      <a href={url} target="_blank">
        <FontAwesomeIcon icon="external-link-alt" /> Go to website
      </a>
    )}
    {phone && (
      <a href="tel">
        <FontAwesomeIcon icon="phone" size="1x" /> {phone}
      </a>
    )}
  </div>
);

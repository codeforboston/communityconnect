import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrganizationCardSocialMedia = ({ url, icon, title }) =>
  url ? (
    <a
      className="organization-card-social-media"
      data-type="social" 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer">
        <FontAwesomeIcon icon={["fab", icon]} size="2x" title={title} />
    </a>
  ) : null;

OrganizationCardSocialMedia.propTypes = {
  url: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
};

OrganizationCardSocialMedia.defaultProps = {
  url: null,
  icon: null,
  title: null,
};
export default OrganizationCardSocialMedia;

import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrganizationCardSocialMedia = ({ url, icon, title }) =>
  url ? (
    <div
      className="organization-card-social-media"
      href={url}
      data-type="social"
    >
      <FontAwesomeIcon icon={["fab", icon]} size="2x" title={title} />
    </div>
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

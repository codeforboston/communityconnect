import React from "react";
import PropTypes from "prop-types";
import ReadMoreAndLess from "react-read-more-less";

const OrganizationCardOverview = ({ overview }) =>
  overview ? (
    <div className="organization-card">
      <ReadMoreAndLess
        className="read-more-content"
        charLimit={250}
        readMoreText="Read more"
        readLessText="Read less"
      >
        {overview}
      </ReadMoreAndLess>
    </div>
  ) : null;

OrganizationCardOverview.propTypes = {
  overview: PropTypes.string
};

OrganizationCardOverview.defaultProps = {
  overview: null
};
export default OrganizationCardOverview;

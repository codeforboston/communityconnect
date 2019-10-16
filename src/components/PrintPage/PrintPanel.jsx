import React from "react";
import PropTypes from "prop-types";

const PrintPanel = ({ resource }) => (
  <div className="print-card-body">
    <div className="organization-card-body-subtitle">
      <b>{resource.name}</b>
    </div>
    {resource.location && (
      <span>
        <span>Address: </span>
        <span>{resource.location}</span>
      </span>
    )}
    {resource.url && (
      <span>
        <span>Url: </span>
        <span>{resource.url}</span>
      </span>
    )}
    {resource.phone && (
      <div>
        <span>Phone: </span>
        <span>
          {resource.phone
            .replace("(", "")
            .replace(")", "")
            .replace(" ", "-")}
        </span>
      </div>
    )}
    <hr />
  </div>
);

PrintPanel.propTypes = {
  resource: PropTypes.object.isRequired,
};

export default PrintPanel;

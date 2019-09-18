import React from "react";
import { Link, Route } from "react-router-dom";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getQueryResources, encodeResources } from "../../utils/resourcesQuery";
import SavedResources from "./SavedResourcesContainer";

const ToShareButton = ({ resourcePath }) => {
  const resources = getQueryResources();
  const query = encodeResources(resources);
  const url = query && `/${resourcePath}/?${query}`;

  return (
    <Button
      className="share-button"
      tag={Link}
      type="Map"
      to={url}
      target="_blank"
      color="info"
    >
      <FontAwesomeIcon icon={faShare} />
    </Button>
  );
};

ToShareButton.propTypes = {
  resourcePath: PropTypes.string.isRequired,
};

const SavedResourcePanel = () => (
  <div className="saved-resource-panel">
    <div className="saved-resource-panel-header">
      <span style={{ fontSize: "22.4px" }}>Saved Resources</span>
      <span>
        <Route
          exact
          path="/:resource/admin"
          render={({ match }) => (
            <ToShareButton resourcePath={match.params.resource} />
          )}
        />
      </span>
    </div>
    <SavedResources />
  </div>
);

export default SavedResourcePanel;

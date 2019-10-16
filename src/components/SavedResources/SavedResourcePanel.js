import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import { faShare, faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
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

const CopyButton = () => {
  // TODO: button should revert to original version (Copy icon) when resources change
  const [btnTitle, setBtnTitle] = useState("Copy Resource URL to Clipboard");
  const [btnIcon, setBtnIcon] = useState(faCopy);
  const tmpUrl = window.location.href.toString().replace("/admin", "/");

  return (
    <Button
      className="copy-button"
      title={btnTitle}
      aria-label={btnTitle}
      color="info"
      onClick={() => {
        navigator.clipboard.writeText(tmpUrl);
        setBtnTitle("Resource URL Copied to Clipboard");
        setBtnIcon(faCheck);
      }}
    >
      <FontAwesomeIcon icon={btnIcon} />
    </Button>
  );
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
            <div className="resource-buttons">
              <CopyButton />
              <ToShareButton resourcePath={match.params.resource} />
            </div>
          )}
        />
      </span>
    </div>
    <SavedResources />
  </div>
);

export default SavedResourcePanel;

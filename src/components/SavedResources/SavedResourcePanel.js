import React from "react";
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
  const btnTitle = "Copy Resource URL to Clipboard"

  let tmpUrl = window.location.href;
  tmpUrl.replace("/admin", "");
  console.log('new url: ', tmpUrl);

  return (
    <Button
      className="copy-button"
      title={btnTitle}
      aria-label={btnTitle}
      color="info"
      onClick={() => {
        navigator.clipboard.writeText(tmpUrl);
      }}
    >
      <FontAwesomeIcon icon={faCopy} />
    </Button>
  );
}

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

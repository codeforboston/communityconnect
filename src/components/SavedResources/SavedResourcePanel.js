import React from 'react';
import qs from 'qs-lite';
import { Link, Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SavedResources from './SavedResourcesContainer';

const ToShareButton = ({ resourcePath }) => {
  const query = qs.parse(window.location.search.replace('?', ''));
  let resources = [];
  let tempUrl = '';
  if (query.resources) {
    resources = query.resources.split(',');
    tempUrl = `/${resourcePath}/?resources=${resources.join(',')}`;
  }

  return (
    <Button
      className="share-button"
      tag={Link}
      type="Map"
      to={tempUrl}
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
      <span style={{ fontSize: '22.4px' }}>Saved Resources</span>
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

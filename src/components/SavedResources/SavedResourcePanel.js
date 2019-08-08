import React from 'react';
import qs from 'qs-lite';
import { Link, Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SavedResources from './SavedResourcesContainer';

const ToShareButton = (props) => {
  const query = qs.parse(window.location.search.replace('?', ''));
  let resources = [];
  let tempUrl = '';
  if (query.resources) {
    resources = query.resources.split(',');
    tempUrl = `/${props.resourcePath}/?resources=${resources.join(',')}`;
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

const SavedResourcePanel = () => (
  <div className="saved-resource-panel">
    <div className="saved-resource-panel-header">
      <span style={{ fontSize: '22.4px' }}>Saved Resources</span>
      <span>
        <Route
          exact
          path="/:resource/admin"
          render={props => (
            <ToShareButton resourcePath={props.match.params.resource} />
          )}
        />
      </span>
    </div>
    <SavedResources />
  </div>
);

export default SavedResourcePanel;

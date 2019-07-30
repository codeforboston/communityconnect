import React from 'react';
import qs from 'qs-lite';
import { Link, Route } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import shareIcon from '../../share-symbol.svg';
import SavedResources from './SavedResourcesContainer';

const ToShareButton = props => {
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
    >
      <img className="share-button-icon" src={shareIcon} alt="" />
    </Button>
  );
};

const SavedResourcePanel = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          Saved Resources
          <span>
            <Route
              exact
              path="/:resource/admin"
              render={props => (
                <ToShareButton resourcePath={props.match.params.resource} />
              )}
            />
          </span>
        </CardHeader>
        <CardBody className="shopping-cart-card">
          <SavedResources />
        </CardBody>
      </Card>
    </div>
  );
};

export default SavedResourcePanel;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import qs from 'qs-lite';
import { getDistance } from '../../utils/distance.js';
import * as resourceAction from '../../action/resourceDataAction';
import {
  Alert,
  Card,
  CardBody,
  CardSubtitle,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

class SavedResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      visible: false,
    };

    this.confirmationModalToggle = this.confirmationModalToggle.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.removalConfirmed = this.removalConfirmed.bind(this);
  }

  confirmationAlertToggle = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  removeItem = () => {
    this.confirmationAlertToggle();
  };

  removalConfirmed = () => {
    const query = qs.parse(window.location.search.replace('?', ''));
    let resources = [];
    if (query.resources) {
      resources = query.resources.split(',');
    }
    const indexOfResource = resources.indexOf(this.props.organization.id);

    if (
      this.props.savedResource.some(
        resource => resource.id === this.props.organization.id,
      )
    ) {
      this.props.actions.removeSavedResource(this.props.organization.id);
      resources.splice(indexOfResource, 1);
    }
    this.props.history.push({
      pathname: window.location.pathname,
      search: `?resources=${resources.join(',')}`,
    });
    this.removeItem();
  };

  render() {
    const {
      id,
      name,
      categories,
      overview,
      location,
      website,
      facebookUrl,
      instagramUrl,
      twitterUrl,
      phone,
    } = this.props.organization;

    let distance, distanceElement;
    if (this.props.currentPos && this.props.currentPos.coordinates) {
      distance = getDistance(
        { coordinates: this.props.organization.coordinates },
        this.props.currentPos,
      );
      if (distance) {
        distanceElement = (
          <p>Distance from your Location: {distance.toPrecision(4)} miles</p>
        );
      }
    }

    return (
      <div>
        <Card className="reactstrap-card" id={id}>
          <CardBody>
            {website && (
              <span>
                <a href={website}>
                  <span role={'img'} aria-label={'Link to website'}>
                    &#128279;
                  </span>
                </a>
              </span>
            )}
            <div className="d-flex">
              <h3 className="reactstrap-card-headline">{name}</h3>
              <span
                title="Remove item from Saved Resources"
                aria-label="Remove item from Saved Resources"
                className="remove-item"
                onClick={this.removalConfirmed}
              >
                -
              </span>
            </div>
            <CardSubtitle className=".reactstrap-card-body-card-subtitle">
              {categories}
            </CardSubtitle>
            {distance && <div>{distanceElement}</div>}
            {location && (
              <p>
                <span className="fa fa-map-o" />
                {location}
              </p>
            )}
            {overview && <p>{overview}</p>}
            {phone && (
              <p>
                {' '}
                <span role={'img'} aria-label={'Phone number'}>
                  {' '}
                  &#128222;
                </span>{' '}
                {phone}
              </p>
            )}
            {(facebookUrl || instagramUrl || twitterUrl) && (
              <ul className="list-inline">
                {facebookUrl && (
                  <li>
                    <a href={facebookUrl} data-type="social">
                      <FontAwesomeIcon
                        icon={['fab', 'facebook-square']}
                        className="text-black-50 mr-1"
                        size="2x"
                        title="Facebook Page"
                      />
                    </a>
                  </li>
                )}
                {instagramUrl && (
                  <li>
                    <a href={instagramUrl} data-type="social">
                      <FontAwesomeIcon
                        icon={['fab', 'instagram']}
                        className="text-black-50 mr-1"
                        size="2x"
                        title="Instagram Page"
                      />
                    </a>
                  </li>
                )}
                {twitterUrl && (
                  <li>
                    <a href={twitterUrl} data-type="social">
                      <FontAwesomeIcon
                        icon={['fab', 'twitter']}
                        className="text-black-50 mr-1"
                        size="2x"
                        title="Twitter Page"
                      />
                    </a>
                  </li>
                )}
              </ul>
            )}
          </CardBody>
        </Card>
        <Alert isOpen={this.state.visible} toggle={this.removalConfirmed}>
          <ModalHeader>Are you sure?</ModalHeader> {name} closed
          <ModalBody>
            Would you like to remove '{name}'' from your saved resources?
          </ModalBody>{' '}
        </Alert>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { savedResource: state.savedResource };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(resourceAction, dispatch),
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRouter,
)(SavedResource);

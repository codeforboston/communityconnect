import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router';
import qs from 'qs-lite';
import { getDistance } from '../../utils/distance.js';
import * as resourceAction from '../../action/resourceDataAction';
import isUrl from 'is-url';

import {
  OrganizationCardBody,
  OrganizationCardOverview,
  OrganizationCardSocialMedia,
  OrganizationCardSaveButton,
} from './subcomponents';

class OrganizationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveExist: false,
    };
  }

  static getDerivedStateFromProps(props) {
    if (!props.savedResource.some(r => r.id === props.organization.id)) {
      return { saveExist: false };
    }
    return { saveExist: true };
  }

  saveItem = () => {
    this.props.actions.addSavedResource(this.props.organization);

    const query = qs.parse(window.location.search.replace('?', ''));
    let resources = [];

    if (query.resources) {
      resources = query.resources.split(',');
    }

    const indexOfResource = resources.indexOf(this.props.organization.id);
    if (indexOfResource < 0) {
      resources.push(this.props.organization.id);
    }

    this.props.history.push({
      pathname: window.location.pathname,
      search: `?resources=${resources.join(',')}`,
    });
  };

  removeItem = () => {
    // code copied verbatim from SavedResource.removalConfirmed()
    // should probably refactor for cleanliness
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
  };

  toggleItem = () => {
    // if saved, remove. otherwise, save
    if (this.state.saveExist) {
      this.removeItem();
    } else {
      this.saveItem();
    }
  };

  render() {
    const {
      name,
      categories,
      overview,
      location,
      website,
      facebookUrl,
      instagramUrl,
      twitterUrl,
      phone,
      latitude,
      longitude,
    } = this.props.organization;

    const websiteUrl = isUrl(website) ? website : '';
    let distance, directionUrl, encodedCoordinates;

    if (this.props.currentPos && this.props.organization.coordinates) {
      distance = getDistance(
        { coordinates: this.props.organization.coordinates },
        this.props.currentPos,
      );
    }

    encodedCoordinates = encodeURIComponent(latitude + ',' + longitude);
    directionUrl =
      'https://www.google.com/maps?saddr=My+Location&daddr=' +
      encodedCoordinates;

    return (
      <div className="organization-card" id={this.props.index}>
        <div className="organization-card-header">
          <div className="organization-card-header-text">{name}</div>
          {this.props.saveable ? (
            <OrganizationCardSaveButton
              onClick={this.toggleItem}
              saveExist={this.state.saveExist}
            />
          ) : null}
        </div>
        <OrganizationCardBody
          categories={categories}
          distance={distance}
          location={location}
          directionUrl={directionUrl}
          overview={overview}
          phone={phone}
          url={websiteUrl}
        />
        <OrganizationCardOverview overview={overview} />
        <OrganizationCardSocialMedia
          url={facebookUrl}
          icon="facebook-square"
          title="Facebook Page"
        />
        <OrganizationCardSocialMedia
          url={instagramUrl}
          icon="instagram"
          title="Instagram Page"
        />
        <OrganizationCardSocialMedia
          url={twitterUrl}
          icon="twitter"
          title="Twitter Page"
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    savedResource: state.savedResource,
  };
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
)(OrganizationCard);

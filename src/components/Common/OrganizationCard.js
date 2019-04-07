import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router';
import qs from 'qs-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDistance } from '../../utils/distance.js';
import * as resourceAction from '../../action/resourceDataAction';
import isUrl from "is-url";

import {
    OrganizationCardWrapper,
    OrganizationCardBodyWrapper,
    OrganizationCardHeader,
    OrganizationCardHeaderText,
    OrganizationCardLink,
    OrganizationCardSubtitle,
    OrganizationCardSaveButton
} from "../Common";

class OrganizationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveExist: false
        }
        console.log(this.state.saveExist)
    }

    static getDerivedStateFromProps(props) {
        if (!props.savedResource.some(r => r.id === props.organization.id)) {
            return { saveExist: false }
        }
        else {
            return { saveExist: true }
        }
    }

    cardClick = (e) => {
        if (this.props.cardClick) {
            this.props.cardClick(e.currentTarget.id);
        }
    }

    saveItem = () => {
        if (!this.state.saveExist) {
            this.props.actions.addSavedResource(this.props.organization);
        }
        const query = qs.parse(window.location.search.replace('?', ''));
        let resources = [];

        if (query.resources) {
            resources = query.resources.split(',');
        }

        const indexOfResource = resources.indexOf(this.props.organization.id);
        if (indexOfResource >= 0) {
            //resources.splice(indexOfResource, 1);
        } else {
            resources.push(this.props.organization.id);
        }

        this.props.history.push({
            pathname: window.location.pathname,
            search: `?resources=${resources.join(',')}`,
        });
    }

    saveButton() {
        if (this.props.saveable) {
            return <OrganizationCardSaveButton saveItem={this.saveItem} saveExist={this.state.saveExist} />;
        }
        return;
    }

    render() {
        const {
            name,
            categoryautosortscript,
            overview,
            location,
            website,
            facebookUrl,
            instagramUrl,
            twitterUrl,
            phone,
            latitude,
            longitude
        } = this.props.organization;
        let distance, directionUrl, encodedCoordinates;
        const url = isUrl(website) ? website : "";
        if (this.props.currentPos && this.props.organization.coordinates) {
            distance = getDistance({ coordinates: this.props.organization.coordinates }, this.props.currentPos);
        }
        encodedCoordinates = encodeURIComponent(latitude + "," + longitude);
        directionUrl = "https://www.google.com/maps?saddr=My+Location&daddr=" + encodedCoordinates;

        return (
            <OrganizationCardWrapper ref="cardRef" id={this.props.index} onClick={this.cardClick}>
                <OrganizationCardHeader>
                    {this.saveButton()}
                    <OrganizationCardHeaderText>{name}</OrganizationCardHeaderText>
                </OrganizationCardHeader>
                <OrganizationCardBody
                    categoryautosortscript={categoryautosortscript}
                    distance={distance}
                    location={location}
                    directionUrl={directionUrl}
                    overview={overview}
                    phone={phone}
                    url={url}
                />
                <OrganizationCardSocialMediaLink
                    url={facebookUrl}
                    icon="facebook-square"
                    title="Facebook Page"
                />
                <OrganizationCardSocialMediaLink
                    url={instagramUrl}
                    icon="instagram"
                    title="Instagram Page"
                />
                <OrganizationCardSocialMediaLink
                    url={twitterUrl}
                    icon="twitter"
                    title="Twitter Page"
                />
            </OrganizationCardWrapper>
        );
    }
}

const OrganizationCardSocialMediaLink = ({ url, icon, title }) => (
    url
        ? (
            <OrganizationCardLink
                href={url}
                data-type="social" >
                <FontAwesomeIcon
                    icon={['fab', icon]}
                    size='2x'
                    title={title}
                />
            </OrganizationCardLink>
        )
        : null
);

const OrganizationCardBody = ({
    categoryautosortscript,
    distance,
    location,
    directionUrl,
    overview,
    phone,
    url,
    children
}) => (
    <OrganizationCardBodyWrapper>
        <OrganizationCardSubtitle>{categoryautosortscript}</OrganizationCardSubtitle>
        {
            distance && <p>Distance from your Location: {distance} miles</p>
        }
        {
            location &&
            <p>
                <FontAwesomeIcon icon='map-marker-alt' className='text-danger' />
                {location}
            </p>
        }
        {directionUrl &&
            <a href={directionUrl}
                target="_blank" >
                <FontAwesomeIcon icon="map-marked-alt" /> Get Directions
            </a>
        }
        {overview && <p>{overview}</p>}
        {url &&
            <a href={url} target="_blank" >
                <FontAwesomeIcon icon="external-link-alt" /> Go to website
            </a>
        }

        {phone && <p><span><FontAwesomeIcon icon='phone' size='1x' /></span> {phone}</p>}

    </OrganizationCardBodyWrapper>
);

function mapStateToProps(state, ownProps) {
    return {
        savedResource: state.savedResource
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(resourceAction, dispatch)
    };
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(OrganizationCard);

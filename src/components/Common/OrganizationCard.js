import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router';
import qs from 'qs-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDistance } from '../../utils/distance.js';
import * as resourceAction from '../../action/resourceDataAction';
import isUrl from "is-url";
import ReadMoreAndLess from 'react-read-more-less';

import {
    OrganizationCardWrapper,
    OrganizationCardBodyWrapper,
    OrganizationCardHeader,
    OrganizationCardHeaderText,
    OrganizationSocialMediaLinkWrapper,
    OrganizationCardSubtitle,
    OrganizationCardSaveButton
} from "../Common";

class OrganizationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveExist: false
        }
    }

    static getDerivedStateFromProps(props) {
        if (!props.savedResource.some(r => r.id === props.organization.id)) {
            return { saveExist: false }
        }
        return { saveExist: true }
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
        if (indexOfResource < 0) {
            resources.push(this.props.organization.id);
        }

        this.props.history.push({
            pathname: window.location.pathname,
            search: `?resources=${resources.join(',')}`,
        });
    }

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
            longitude
        } = this.props.organization;
        const websiteUrl = isUrl(website) ? website : "";
        let distance, directionUrl, encodedCoordinates;
        if (this.props.currentPos && this.props.organization.coordinates) {
            distance = getDistance({ coordinates: this.props.organization.coordinates }, this.props.currentPos);
        }
        encodedCoordinates = encodeURIComponent(latitude + "," + longitude);
        directionUrl = "https://www.google.com/maps?saddr=My+Location&daddr=" + encodedCoordinates;

        return (
            <OrganizationCardWrapper id={this.props.index}>
                <OrganizationCardHeader>
                    {

                        this.props.saveable
                            ? <OrganizationCardSaveButton saveItem={this.saveItem} saveExist={this.state.saveExist} />
                            : null
                    }
                    <OrganizationCardHeaderText>{name}</OrganizationCardHeaderText>
                </OrganizationCardHeader>
                <OrganizationCardBody
                    categories={categories}
                    distance={distance}
                    location={location}
                    directionUrl={directionUrl}
                    overview={overview}
                    phone={phone}
                    url={websiteUrl}
                />
                <OrganizationCardOverview
                    overview={overview}
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
            <OrganizationSocialMediaLinkWrapper
                href={url}
                data-type="social" >
                <FontAwesomeIcon
                    icon={['fab', icon]}
                    size='2x'
                    title={title}
                />
            </OrganizationSocialMediaLinkWrapper>
        )
        : null
);

//part of OC that handles overview, current limit is 250 char for readme

const OrganizationCardOverview = ({ overview }) => (
    overview
        ? (
            <OrganizationCardBodyWrapper>
                <ReadMoreAndLess
                ref={this.ReadMore}
                className="read-more-content"
                charLimit={250}
                readMoreText="Read more"
                readLessText="Read less"
                >
                {overview}
                </ReadMoreAndLess>
            </OrganizationCardBodyWrapper>
        )
        : null
);


const OrganizationCardBody = ({
    categories,
    distance,
    location,
    directionUrl,
    phone,
    url,
    children
}) => (
    <OrganizationCardBodyWrapper>
        <OrganizationCardSubtitle>{categories}</OrganizationCardSubtitle>
        {
            distance && <p>Distance from your location: {distance} miles</p>
        }
        {
            location &&
            <p>
                <FontAwesomeIcon icon='map-marker-alt' className='text-danger' /> {location}
            </p>
        }
        {
            directionUrl &&
            <a href={directionUrl}
                target="_blank" >
                <FontAwesomeIcon icon="map-marked-alt" /> Get directions
            </a>
        }
        {
            url &&
            <a href={url} target="_blank" >
                <FontAwesomeIcon icon="external-link-alt" /> Go to website
            </a>
        }
        {
            phone &&
            <a href={`tel:${phone}`}><FontAwesomeIcon icon='phone' size='1x' />{phone}</a>
        }
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

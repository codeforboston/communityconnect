import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import {withRouter} from 'react-router';
import qs from 'qs-lite';

import {getDistance} from '../../utils/distance.js';
import {Card, CardBody, CardSubtitle} from 'reactstrap';
import * as resourceAction from '../../action/resourceDataAction';
import SaveButton from './SaveButton';

import styles from './OrganizationCard.module.css'


class OrganizationCard extends Component {

    constructor(props) {
        super(props);
        this.cardRef = React.createRef();
    }

    getRef = () => {
        this.refs.cardRef.parentNode.scrollTop = this.refs.cardRef.offsetTop - ((1.5) * this.refs.cardRef.offsetHeight);
        // Using scrollIntoView shifted the page, hiding the header bar in mobile view
        // this.refs.cardRef.scrollIntoView({block: "end", inline: "center"})
    };

    cardClick = (e) => {
        if (this.props.cardClick) {
            this.props.cardClick(e.currentTarget.id);
        }
    }
    saveItem = () => {
        if (!this.props.savedResource.some(r => r.id === this.props.organization.id)) {
            this.props.actions.addSavedResource(this.props.organization);
        }
        const query = qs.parse(window.location.search.replace('?', ''));
        let resources = [];

        if (query.resources) {
            resources = query.resources.split(',');
        }

        const indexOfResource = resources.indexOf(this.props.organization.id);
        if (indexOfResource >= 0) {
            resources.splice(indexOfResource, 1);
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
            return <SaveButton saveItem={this.saveItem}/>;
        }
        return;
    }

    validatedUrl(website) {
        if (website === "")
            return website;

        let http = website.substr(0, 7);
        let https = website.substr(0, 8);
        const scheme = "http://";
        const tlsScheme = "https://";
        if (http === scheme) {
            return website;
        }
        if (https === tlsScheme) {
            return website;
        }
        return scheme + website;
    }

    render() {
        const {
            name, categoryautosortscript, overview, location, website, facebookUrl,
            instagramUrl, twitterUrl, phone, latitude, longitude
        } = this.props.organization;
        let distance, distanceElement, directionUrl, encodedCoordinates;
        let url = this.validatedUrl(website);
        if (this.props.currentPos && this.props.organization.coordinates) {
            distance = getDistance({coordinates: this.props.organization.coordinates}, this.props.currentPos);
            if (distance) {
                distanceElement = <p>Distance from your Location: {distance} miles</p>
            }
            encodedCoordinates = encodeURIComponent(latitude+","+longitude);   
            directionUrl = "https://www.google.com/maps?saddr=My+Location&daddr="+
                encodedCoordinates;
                     
        }        

        return (
            <div ref="cardRef">
                <Card className={styles.Card} id={this.props.index} onClick={this.cardClick}>
                    <CardBody>
                        {this.saveButton()}
                        {website && <a href={url} target="_blank"><span role="img"
                                                                        aria-label="Link to website">&#128279;</span></a>}
                        <h3 className={styles.CardBody_headline}>{name}</h3>
                        <CardSubtitle className={styles.CardBody_CardSubtitle}>{categoryautosortscript}</CardSubtitle>
                        {distance && <div>{distanceElement}</div>}
                        {location && <p><span className="fa fa-map-o"></span> {location}</p>}
                        {directionUrl && <a href={directionUrl} target="_blank"><span>Get Directions</span></a>}
                        {overview && <p>{overview}</p>}
                        {phone && <p><span role="img" aria-label="Phone number">&#128222;</span> {phone}</p>}
                        {(facebookUrl || instagramUrl || twitterUrl) && <ul className="list-inline">
                            {facebookUrl && <li><a href={facebookUrl} data-type="social"><i
                                className="fa fa-2x fa-facebook-square">{facebookUrl}</i></a></li>}
                            {instagramUrl && <li><a href={instagramUrl} data-type="social"><i
                                className="fa fa-2x fa-facebook-square">{instagramUrl}</i></a></li>}
                            {twitterUrl && <li><a href={twitterUrl} data-type="social"><i
                                className="fa fa-2x fa-facebook-square">{twitterUrl}</i></a></li>}
                        </ul>}
                    </CardBody>
                </Card>
            </div>
        );
    }
}

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

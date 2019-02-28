import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import {withRouter} from 'react-router';
import qs from 'qs-lite';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {getDistance} from '../../utils/distance.js';
import {Card, CardBody, CardSubtitle, CardFooter, CardHeader} from 'reactstrap';
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

    // Takes a ref to the links that change color when hovered over.
    changeColor(link) {
        console.log(link);
        return link.childNodes[0].classList.toggle('text-black-50');
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
        }
        // vars to hold refs to social icons and external link to the website
        let socialFb, socialIg, socialTw, link, mapUrl;

        encodedCoordinates = encodeURIComponent(latitude + "," + longitude);
        directionUrl = "https://www.google.com/maps?saddr=My+Location&daddr=" +
            encodedCoordinates;

        return (
            <React.Fragment ref="cardRef">
                <Card className={styles.Card} id={this.props.index} onClick={this.cardClick}>
                    <CardHeader>
                        {this.saveButton()}
                        <div className="container">
                            <div className="row">
                                <div className="col-sm m-auto px-2">
                                    <h3 className={styles.CardBody_headline}>{name}</h3>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <CardSubtitle className={styles.CardBody_CardSubtitle}>{categoryautosortscript}</CardSubtitle>
                        {distance && <div>{distanceElement}</div>}
                        {location &&
                        <p><span><FontAwesomeIcon icon='map-marker-alt'
                                                  className='text-danger'/></span> {location}</p>}
                        <div className='row'>
                            {directionUrl &&
                            <div className='col-sm-6'><p><span><a href={directionUrl}
                                                                  target="_blank" ref={node => {
                                mapUrl = node
                            }} onMouseEnter={() => {
                                this.changeColor(mapUrl)
                            }} onMouseLeave={() => {
                                this.changeColor(mapUrl)
                            }}>
                                <FontAwesomeIcon icon="map-marked-alt" className="text-black-50 mr-1"/>
                                Get Directions</a></span></p>
                            </div>}
                            {overview && <p>{overview}</p>}

                            {website && <div className='col-sm-6'><p><span>
                                        <a href={url} target="_blank" ref={node => {
                                            link = node
                                        }} onMouseEnter={() => {
                                            this.changeColor(link)
                                        }} onMouseLeave={() => {
                                            this.changeColor(link)
                                        }}>
                                        <FontAwesomeIcon icon="external-link-alt" className="text-black-50 mr-1"/>Go to website</a>
                                    </span></p></div>}
                        </div>
                        {phone && <p><span><FontAwesomeIcon icon='phone' size='1x'/></span> {phone}</p>}
                    </CardBody>
                    {(facebookUrl || instagramUrl || twitterUrl) &&
                    <CardFooter>

                        <div className="list-group list-group-horizontal">
                            {facebookUrl &&
                            <a className="list-group-item border-0 m-0 p-1 bg-light" href={facebookUrl}
                               data-type="social" ref={node => {
                                socialFb = node
                            }} onMouseEnter={() => {
                                this.changeColor(socialFb)
                            }} onMouseLeave={() => {
                                this.changeColor(socialFb)
                            }} alt="Facebook Page">
                                <FontAwesomeIcon icon={['fab', 'facebook-square']}
                                                 className="text-black-50 mr-1" size='2x' title="Facebook Page"/>
                            </a>}
                            {instagramUrl &&
                            <a className="list-group-item border-0 m-0 p-1 bg-light" href={instagramUrl}
                               data-type="social" ref={node => {
                                socialIg = node
                            }} onMouseEnter={() => {
                                this.changeColor(socialIg)
                            }} onMouseLeave={() => {
                                this.changeColor(socialIg)
                            }}>
                                <FontAwesomeIcon icon={['fab', 'instagram']} className="text-black-50 mr-1" size='2x'
                                                 title="Instagram Page"/>
                            </a>}
                            {twitterUrl &&
                            <a className="list-group-item border-0 m-0 p-1 bg-light" href={twitterUrl}
                               data-type="social" ref={node => {
                                socialTw = node
                            }} onMouseEnter={() => {
                                this.changeColor(socialTw)
                            }} onMouseLeave={() => {
                                this.changeColor(socialTw)
                            }} aria-label="Twitter Page">
                                <FontAwesomeIcon icon={['fab', 'twitter']} className="text-black-50 mr-1" size='2x'
                                                 title="Twitter Page"/>
                            </a>}
                        </div>
                    </CardFooter>}
                </Card>
            </React.Fragment>
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

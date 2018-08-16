import React, { Component } from 'react';
import { Card } from 'reactstrap';

class OrganizationCard extends Component {
    render() {
        return (
            <Card>
                <h3>{this.props.organization.name}</h3>
                <p className="lead">{this.props.organization.category}</p>
                <p>{this.props.organization.overview}</p>
                <p><span className="fa fa-map-o"></span> {this.props.organization.location}</p>
                {this.props.organization.website? <p><span className="fa fa-link"></span> <a href={this.props.organization.website}>Website</a></p>: <div/>}
                <ul className="list-inline">
                    {this.props.organization.facebookUrl && <li><a href="{this.props.organization.facebookUrl}" data-type="social"><i className="fa fa-2x fa-facebook-square"></i></a></li>}
                    {this.props.organization.instagramUrl && <li><a href="{this.props.organization.instagramUrl}" data-type="social"><i className="fa fa-2x fa-facebook-square"></i></a></li>}
                    {this.props.organization.twitterUrl && <li><a href="{this.props.organization.twitterUrl}" data-type="social"><i className="fa fa-2x fa-facebook-square"></i></a></li>}
                </ul>
            </Card>
        );
    }
}

export default OrganizationCard;
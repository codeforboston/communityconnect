import React, { Component } from 'react';
import { Card } from 'reactstrap';
import { getDistance } from '../utils/distance.js';

class OrganizationCard extends Component {
  render() {
    const { name, category, overview, location, website, facebookUrl,
      instagramUrl, twitterUrl } = this.props.organization;


    let distance;
    if(this.props.haveCoords){
      distance = <p>Distance from your Location: {getDistance({coordinates: this.props.organization.coordinates}, this.props.currentPos ).toPrecision(4)} miles</p>
    }

    return (
      <Card>
        <div>
          <h3>{name}</h3>
          <p className="lead">{category}</p>
        </div>
        <div>
          {distance}
        </div>
        <p>{overview}</p>
        <p><span className="fa fa-map-o"></span> {location}</p>
        {website ? <p><span className="fa fa-link"></span> <a href={website}>Website</a></p> : <div />}
        <ul className="list-inline">
          {facebookUrl && <li><a href="{facebookUrl}" data-type="social"><i className="fa fa-2x fa-facebook-square"></i></a></li>}
          {instagramUrl && <li><a href="{instagramUrl}" data-type="social"><i className="fa fa-2x fa-facebook-square"></i></a></li>}
          {twitterUrl && <li><a href="{twitterUrl}" data-type="social"><i className="fa fa-2x fa-facebook-square"></i></a></li>}
        </ul>
      </Card>
    );
  }
}

export default OrganizationCard;

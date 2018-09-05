import React, { Component } from 'react';
import { Card } from 'reactstrap';

class OrganizationCard extends Component {
  render() {
    const { name, category, overview, location, website, facebookUrl,
      instagramUrl, twitterUrl } = this.props.organization;

    return (
      <Card>
        <h3>{name}</h3>
        <p className="lead">{category}</p>
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

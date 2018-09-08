import React, { Component } from 'react';
import { Card } from 'reactstrap';

class OrganizationCard extends Component {
  render() {
    let { name, category, overview, location, website, facebookUrl,
      instagramUrl, twitterUrl, phone } = this.props.organization;

    return (
      <Card>
        <h3>{name}</h3>
        <p className="lead">{category}</p>
        {overview && <p>{overview}</p>}
        <p><span className="fa fa-map-o"></span> {location}</p>
        {phone && <p>{phone}</p>}
        {website ? <p><span className="fa fa-link"></span> <a href={website}>Website</a></p> : <div />}
        {(facebookUrl || instagramUrl || twitterUrl) && <ul className="list-inline">
          {facebookUrl && <li><a href="{facebookUrl}" data-type="social"><i className="fa fa-2x fa-facebook-square">{facebookUrl}</i></a></li>}
          {instagramUrl && <li><a href="{instagramUrl}"data-type="social"><i className="fa fa-2x fa-facebook-square">{instagramUrl}</i></a></li>}
          {twitterUrl && <li><a href="{twitterUrl}" data-type="social"><i className="fa fa-2x fa-facebook-square">{twitterUrl}</i></a></li>}
        </ul>}
      </Card>
    );
  }
}

export default OrganizationCard;

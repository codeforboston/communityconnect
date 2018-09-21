import React, { Component } from 'react';
import { Card } from 'reactstrap';

class OrganizationCard extends Component {
  render() {
<<<<<<< HEAD
    const { name, category, overview, location, website, facebookUrl,
      instagramUrl, twitterUrl, phone } = this.props.organization;
=======
    const { name, categoryautosortscript, overview, location, website, facebookUrl,
      instagramUrl, twitterUrl } = this.props.organization;
>>>>>>> 5c717b0760b8cc7e7c48c4a07f89659e393e7247

    return (
      <Card>
        <h3>{name}</h3>
<<<<<<< HEAD
        <p className="lead">{category}</p>
        {overview && <p>{overview}</p>}
        {location && <p><span className="fa fa-map-o"></span> {location}</p>}
        {phone && <p>{phone}</p>}
        {website && <p><span className="fa fa-link"></span> <a href={website}>Website</a></p>}
        {(facebookUrl || instagramUrl || twitterUrl) && <ul className="list-inline">
          {facebookUrl && <li><a href="{facebookUrl}" data-type="social"><i className="fa fa-2x fa-facebook-square">{facebookUrl}</i></a></li>}
          {instagramUrl && <li><a href="{instagramUrl}" data-type="social"><i className="fa fa-2x fa-facebook-square">{instagramUrl}</i></a></li>}
          {twitterUrl && <li><a href="{twitterUrl}" data-type="social"><i className="fa fa-2x fa-facebook-square">{twitterUrl}</i></a></li>}
        </ul>}
=======
        <p className="lead">{categoryautosortscript}</p>
        <p>{overview}</p>
        <p><span className="fa fa-map-o"></span> {location}</p>
        {website ? <p><span className="fa fa-link"></span> <a href={website}>Website Link</a></p> : <div />}
        <ul className="list-inline">
          {facebookUrl && <li><a href="{facebookUrl}" data-type="social"><i className="fa fa-2x fa-facebook-square"></i></a></li>}
          {instagramUrl && <li><a href="{instagramUrl}" data-type="social"><i className="fa fa-2x fa-facebook-square"></i></a></li>}
          {twitterUrl && <li><a href="{twitterUrl}" data-type="social"><i className="fa fa-2x fa-facebook-square"></i></a></li>}
        </ul>
>>>>>>> 5c717b0760b8cc7e7c48c4a07f89659e393e7247
      </Card>
    );
  }
}

export default OrganizationCard;

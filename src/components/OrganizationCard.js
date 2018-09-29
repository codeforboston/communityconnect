import React, { Component } from 'react';
import { Card, CardBody, CardSubtitle } from 'reactstrap';
import styles from './OrganizationCard.module.css'
import { getDistance } from '../utils/distance.js';

class OrganizationCard extends Component {

  constructor (props) {
    super(props)

    this.cardRef = React.createRef();

  }

  getRef = () => {
    this.refs.cardRef.scrollIntoView({block: "end", inline: "center"})
  }

  cardClick= (e) => {
    this.props.cardClick(e.currentTarget.id);
  }

  render() {
    const { id , name, categoryautosortscript, overview, location, website, facebookUrl,
      instagramUrl, twitterUrl, phone } = this.props.organization;


    let distance, distanceElement;
    if(this.props.haveCoords){
      distance = getDistance({coordinates: this.props.organization.coordinates}, this.props.currentPos )
      if(distance){
        distanceElement = <p>Distance from your Location: {distance.toPrecision(4)} miles</p>
      }
    }


    return (
      <div ref="cardRef" >
      <Card id={id} onClick={this.cardClick}>

        <div>
          <h3>{name}</h3>
          <p className="lead">{categoryautosortscript}</p>
        </div>
        {distance && <div>{distanceElement}</div>}
        {overview && <p>{overview}</p>}
        {location && <p><span className="fa fa-map-o"></span> {location}</p>}
        {phone && <p>{phone}</p>}
        {website && <p><span className="fa fa-link"></span> <a href={website}>Website</a></p>}
        {(facebookUrl || instagramUrl || twitterUrl) && <ul className="list-inline">
          {facebookUrl && <li><a href="{facebookUrl}" data-type="social"><i className="fa fa-2x fa-facebook-square">{facebookUrl}</i></a></li>}
          {instagramUrl && <li><a href="{instagramUrl}" data-type="social"><i className="fa fa-2x fa-facebook-square">{instagramUrl}</i></a></li>}
          {twitterUrl && <li><a href="{twitterUrl}" data-type="social"><i className="fa fa-2x fa-facebook-square">{twitterUrl}</i></a></li>}
        </ul>}

      </Card>
      </div>
    );
  }
}

export default OrganizationCard;

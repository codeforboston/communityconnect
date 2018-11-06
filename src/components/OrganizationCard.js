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
    this.refs.cardRef.scrollIntoView({block: "center", inline: "center"})
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
      <div ref="cardRef">
        <Card className={styles.Card} id={this.props.index} onClick={this.cardClick}>
          <CardBody>
            <span onClick={(e)=> e.stopPropagation()}>
              <span title='Add item to Saved Resources' aria-label='Add item to Saved Resources' className={styles['save-item']} onClick={this.props.saveItem}>+</span>
            </span>
            {website && <span><a href={website}>&#128279;</a></span>}
            <h3 className={styles.CardBody_headline}>{name}</h3>
            <CardSubtitle className={styles.CardBody_CardSubtitle}>{categoryautosortscript}</CardSubtitle>
            {distance && <div>{distanceElement}</div>}
            {location && <p><span className="fa fa-map-o"></span> {location}</p>}
            {overview && <p>{overview}</p>}
            {phone && <p> &#128222; {phone}</p>}
            {(facebookUrl || instagramUrl || twitterUrl) && <ul className="list-inline">
              {facebookUrl && <li><a href={facebookUrl} data-type="social"><i className="fa fa-2x fa-facebook-square">{facebookUrl}</i></a></li>}
              {instagramUrl && <li><a href={instagramUrl} data-type="social"><i className="fa fa-2x fa-facebook-square">{instagramUrl}</i></a></li>}
              {twitterUrl && <li><a href={twitterUrl} data-type="social"><i className="fa fa-2x fa-facebook-square">{twitterUrl}</i></a></li>}
            </ul>}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default OrganizationCard;

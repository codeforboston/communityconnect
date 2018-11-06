import React, { Component } from 'react';
import { Card, CardBody, CardSubtitle } from 'reactstrap';
import styles from './SavedResource.module.css';
import { getDistance } from '../../utils/distance.js';

class SavedResource extends Component {

  constructor (props) {
    super(props)

    // this.cardRef = React.createRef();
  }

  // getRef = () => {
  //   this.refs.cardRef.scrollIntoView({block: "center", inline: "center"})
  // }

  // cardClick= (e) => {
  //   console.log("Click");
  //   this.props.cardClick(e.currentTarget.id);
  // }

  render() {
    const { 
        id, 
        name, 
        categoryautosortscript, 
        overview, 
        location, 
        website, 
        facebookUrl,
        instagramUrl, 
        twitterUrl, 
        phone 
      } = this.props.organization;

    let distance, distanceElement;
    if(this.props.currentPos && this.props.currentPos.coordinates){
      distance = getDistance(
        {coordinates: this.props.organization.coordinates}, 
        this.props.currentPos )
      if(distance){
        distanceElement = <p>Distance from your Location: {distance.toPrecision(4)} miles</p>
      }
    }

    return (
      <div>
        <Card className={styles.Card} id={id}>
          <CardBody>
            {website && 
            <span>
              <a href={website}>&#128279;</a>
            </span>}
            <h3 className={styles.CardBody_headline}>{name}</h3>
            <span className={styles['remove-item']} onClick={this.props.removeItem}>
              -
            </span>
            <CardSubtitle className={styles.CardBody_CardSubtitle}>
              {categoryautosortscript}
            </CardSubtitle>
            {distance && 
              <div>{distanceElement}</div>}
            {location && 
              <p>
                <span className="fa fa-map-o"></span> 
                {location}
              </p>}
            {overview && 
              <p>{overview}</p>}
            {phone && 
              <p> &#128222; {phone}</p>}
            {(facebookUrl || instagramUrl || twitterUrl) && 
            <ul className="list-inline">
              {facebookUrl && 
                <li>
                  <a href={facebookUrl} data-type="social">
                    <i className="fa fa-2x fa-facebook-square">{facebookUrl}</i>
                  </a>
                </li>}
              {instagramUrl && 
                <li>
                  <a href={instagramUrl} data-type="social">
                    <i className="fa fa-2x fa-facebook-square">{instagramUrl}</i>
                  </a>
                </li>}
              {twitterUrl && 
                <li>
                  <a href={twitterUrl} data-type="social">
                    <i className="fa fa-2x fa-facebook-square">{twitterUrl}</i>
                  </a>
                </li>}
            </ul>}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SavedResource;

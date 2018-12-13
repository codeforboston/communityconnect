import React, { Component } from 'react';
import { Card, CardBody, CardSubtitle } from 'reactstrap';
import styles from './OrganizationCard.module.css'
import { getDistance } from '../utils/distance.js';

class OrganizationCard extends Component {

  constructor (props) {
    super(props)
    this.state = {
      animateButtonInside: '',
      animateButtonOutside: [''],
    }

    this.cardRef = React.createRef();
  }

  getRef = () => {
    this.refs.cardRef.parentNode.scrollTop = this.refs.cardRef.offsetTop - ((1.5) * this.refs.cardRef.offsetHeight);
    // Using scrollIntoView shifted the page, hiding the header bar in mobile view
    // this.refs.cardRef.scrollIntoView({block: "end", inline: "center"})
  }

  cardClick= (e) => {
    this.props.cardClick(e.currentTarget.id);
  }

  saveItem = () => {
    this.props.saveItem();

    let classes = [
                    styles['cbutton--effect-radomir__after'],
                    styles['cbutton--effect-radomir__cbutton--click__after'],
                    styles['cbutton__after'],
                  ];

    this.setState({
      animateButtonInside: styles['animate-button-click'],
      animateButtonOutside: classes,
    });
    setTimeout(() => {
        this.setState({
          animateButtonInside: '',
          animateButtonOutside: [''],
        });
      },
      500
    );
  }

  render() {
    const { name, categoryautosortscript, overview, location, website, facebookUrl,
      instagramUrl, twitterUrl, phone } = this.props.organization;

    let distance, distanceElement;
    if(this.props.haveCoords){
      distance = getDistance({coordinates: this.props.organization.coordinates}, this.props.currentPos )
      if(distance){
        distanceElement = <p>Distance from your Location: {distance} miles</p>
      }
    }


    return (
      <div ref="cardRef">
        <Card className={styles.Card} id={this.props.index} onClick={this.cardClick}>
          <CardBody>
            <span onClick={(e)=> e.stopPropagation()}>
              <button
                className={[
                            styles['cbutton--effect-radomir'],
                            styles['cbutton'],
                          ].join(' ')}
              >
              <span
                title='Add item to Saved Resources'
                aria-label='Add item to Saved Resources'
                className={[
                            this.state.animateButtonInside,
                            styles['save-item'],
                          ].join(' ')}
                onClick={this.saveItem}>
              +
              </span>
                <span
                  className={this.state.animateButtonOutside.join(' ')}
                >
                </span>
              </button>
            </span>
            {website && <a href={website} target="_blank"><span role="img" aria-label="Link to website">&#128279;</span></a>}
            <h3 className={styles.CardBody_headline}>{name}</h3>
            <CardSubtitle className={styles.CardBody_CardSubtitle}>{categoryautosortscript}</CardSubtitle>
            {distance && <div>{distanceElement}</div>}
            {location && <p><span className="fa fa-map-o"></span> {location}</p>}
            {overview && <p>{overview}</p>}
            {phone && <p><span role="img" aria-label="Phone number">&#128222;</span> {phone}</p>}
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './OrganizationCard.module.css'
import { getDistance } from '../../utils/distance.js';
import { Card, CardBody, CardSubtitle } from 'reactstrap';
import * as resourceAction from '../../action/resourceDataAction';
import SaveButton from './SaveButton';

class OrganizationCard extends Component {

  constructor (props) {
    super(props);
    this.cardRef = React.createRef();
  }

  getRef = () => {
    this.refs.cardRef.parentNode.scrollTop = this.refs.cardRef.offsetTop - ((1.5) * this.refs.cardRef.offsetHeight);
    // Using scrollIntoView shifted the page, hiding the header bar in mobile view
    // this.refs.cardRef.scrollIntoView({block: "end", inline: "center"})
  };

  cardClick= (e) => {
    if(this.props.cardClick){
    this.props.cardClick(e.currentTarget.id);
    }
  }
  saveItem = () => {
    if (!this.props.savedResource.some(r => r.id === this.props.organization.id)) {
        this.props.actions.addSavedResource(this.props.organization);
    }
  }
  saveButton(){
    if(this.props.saveable){
      return <SaveButton saveItem ={this.saveItem}/>;
    }
    return;
  }
  render() {
    const { name, categoryautosortscript, overview, location, website, facebookUrl,
      instagramUrl, twitterUrl, phone } = this.props.organization;
    let distance, distanceElement;
    if(this.props.currentPos) {
      distance = getDistance({coordinates: this.props.organization.coordinates}, this.props.currentPos );
      if(distance){
        distanceElement = <p>Distance from your Location: {distance} miles</p>
      }
    }


    return (
      <div ref="cardRef">
        <Card className={styles.Card} id={this.props.index} onClick={this.cardClick}>
          <CardBody>
            {this.saveButton()}
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


export default connect(mapStateToProps, mapDispatchToProps)(OrganizationCard);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Card,
  CardBody,
  CardSubtitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import styles from './SavedResource.module.css';
import { getDistance } from '../../utils/distance.js';
import * as resourceAction from '../../action/resourceDataAction';

class SavedResource extends Component {

  constructor (props) {
    super(props)

    this.state = {
      modal: false
    }

    this.confirmationModalToggle = this.confirmationModalToggle.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.removalConfirmed = this.removalConfirmed.bind(this);
    // this.cardRef = React.createRef();
  }

  confirmationModalToggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  removeItem = () => {
    this.confirmationModalToggle();
  }

  removalConfirmed = () => {
    if (this.props.savedResource.some(resource => resource.id === this.props.organization.id)) {
      this.props.actions.removeSavedResource(this.props.organization.id);
    }
    this.confirmationModalToggle();
  }

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
            <span title='Remove item from Saved Resources' aria-label='Remove item from Saved Resources'
                  className={styles['remove-item']} onClick={this.removeItem}>
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
        <Modal isOpen={this.state.modal} toggle={this.confirmationModalToggle} onClosed={this.toggle}>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalBody>Would you like to remove '{name}'' from your saved resources?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.removalConfirmed}>Yes</Button>{' '}
            <Button color="secondary" onClick={this.confirmationModalToggle}>No</Button>
          </ModalFooter>
        </Modal>
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


export default connect(mapStateToProps, mapDispatchToProps)(SavedResource);

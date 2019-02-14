import React from 'react';
import { connect } from 'react-redux';
import qs from 'qs-lite';
import { Link, Route } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Button
} from 'reactstrap';
import styles from './SavedResourcePanel.module.css';
import shareIcon from '../../share-symbol.svg';
import SavedResources from './SavedResourcesContainer';

/*
const ToHomeButton = () => {
  return (
    <Button tag={Link} to="/" type="Map">To Home</Button>
  )
}*/

let buttonStyle = {
  float: 'right',
  backgroundColor: 'rgba(0,0,0,.001)',
  border: 'none',
  padding: '0'
};

const ToMapButton = () => {
  return (
    <Button tag={Link} to="/" type="Map">To Map</Button>
  )
}

const ToShareButton = () => {
  //console.log(this.props.savedResource)
  /*if (!this.props.savedResource.some(r => r.id === this.props.organization.id)) {
    this.props.actions.addSavedResource(this.props.organization);
  }

  const query = qs.parse(window.location.search.replace('?', ''));
  let resources = [];

  if (query.resources) {
    resources = query.resources.split(',');
  }

  const indexOfResource = resources.indexOf(this.props.savedResource.id);
  if (indexOfResource >= 0) {
    resources.splice(indexOfResource, 1);
  } else {
    resources.push(this.props.organization.id);
  }

  this.props.history.push({
    pathname: window.location.pathname,
    search: `?resources=${resources.join(',')}`,
  });*/

  return (
    <Button
      style={buttonStyle}
      tag={Link} 
      to="/" 
      type="Admin"
      target="_blank">
        <img className={styles['share-button']} src={shareIcon} alt=""/>
    </Button>    
  )
}
const SavedResourcePanel = () => {

    return (
      <div>
        <Card>
          <CardHeader>Saved Resources
          <span> 
            <Route exact path='/admin' component={ToShareButton} />  
          </span>
          </CardHeader>
          <CardBody className={styles['shopping-cart-card']}>
            <SavedResources />
            <Route exact path='/admin' component={ToMapButton} />            
          </CardBody>
        </Card>
      </div>
    )
}

function mapStateToProps(state, ownProps) {
  return {
    savedResource: state.savedResource
  }
}

export default connect(mapStateToProps)(SavedResourcePanel);
